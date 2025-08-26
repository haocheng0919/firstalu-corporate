import { notFound } from 'next/navigation';
import ProductDetailClient from './product-detail-client';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

interface ProductPageProps {
  params: {
    product: string;
  };
}

interface Product {
  id: string;
  slug: string;
  sku: string;
  name: Record<string, string>;
  description: Record<string, string>;
  images: any;
  specs: any;
  technical_specs: any;
  categories: {
    slug: string;
    name_i18n: Record<string, string>;
  }[];
}

// Helper function to get product image URL from database
function getDbProductImageUrl(product: Product): string {
  if (product.images) {
    try {
      const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      
      // Try to get thumbnail first, then gallery[0], then fallback
      if (images.thumbnail) {
        return images.thumbnail;
      }
      if (images.gallery && images.gallery.length > 0) {
        return images.gallery[0];
      }
    } catch (error) {
      console.error('Error parsing product images:', error);
    }
  }
  
  // Fallback to placeholder
  return '/product_img/placeholder.webp';
}

// Get product data from database
async function getProduct(productSlug: string): Promise<Product | null> {
  try {
    // Get all aluminum-related categories
    const { data: aluminumCategories, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .or('slug.ilike.%aluminum%,slug.ilike.%foil%,slug.ilike.%smoothwall%,slug.ilike.%wrinklewall%');

    if (categoryError) {
      console.error('Error fetching aluminum categories:', categoryError);
      return null;
    }

    const categoryIds = aluminumCategories?.map(cat => cat.id) || [];
    
    // Get all subcategories recursively
    let allCategoryIds = [...categoryIds];
    let currentLevelIds = [...categoryIds];
    
    while (currentLevelIds.length > 0) {
      const { data: nextLevelCategories } = await supabase
        .from('categories')
        .select('id')
        .in('parent_id', currentLevelIds);

      if (!nextLevelCategories || nextLevelCategories.length === 0) {
        break;
      }

      const nextLevelIds = nextLevelCategories.map(cat => cat.id);
      allCategoryIds = [...allCategoryIds, ...nextLevelIds];
      currentLevelIds = nextLevelIds;
    }

    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        slug,
        sku,
        name_i18n,
        description_i18n,
        images,
        specs,
        technical_specs,
        categories!inner (
          slug,
          name_i18n
        )
      `)
      .or(`slug.eq.${productSlug},sku.eq.${productSlug}`)
      .in('category_id', allCategoryIds)
      .single();

    if (error || !data) {
      console.error('Error fetching product:', error);
      return null;
    }

    return {
      id: data.id,
      slug: data.slug,
      sku: data.sku,
      name: data.name_i18n || {},
      description: data.description_i18n || {},
      images: data.images,
      specs: data.specs,
      technical_specs: data.technical_specs,
      categories: data.categories
    };
  } catch (error) {
    console.error('Error in getProduct:', error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.product);
  
  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductDetailClient product={product} />
      <Footer />
    </>
  );
}

// Generate static params for all aluminum-foil products
export async function generateStaticParams() {
  try {
    // First get the main aluminum-foil category
    const { data: mainCategory, error: mainCategoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', 'aluminum-foil')
      .single();

    if (mainCategoryError || !mainCategory) {
      console.error('Error fetching main aluminum-foil category:', mainCategoryError);
      return [];
    }

    // Get all subcategories of aluminum-foil
    const { data: subcategories, error: subcategoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('parent_id', mainCategory.id);

    if (subcategoryError) {
      console.error('Error fetching subcategories:', subcategoryError);
    }

    // Combine main category and subcategory IDs
    const categoryIds = [mainCategory.id, ...(subcategories?.map(cat => cat.id) || [])];

    const { data: products } = await supabase
      .from('products')
      .select('slug, sku')
      .in('category_id', categoryIds);

    if (!products) return [];

    return products.map((product) => ({
      product: product.slug || product.sku,
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}