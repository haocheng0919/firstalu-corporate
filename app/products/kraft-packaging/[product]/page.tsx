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
  name_i18n: Record<string, string>;
  description_i18n: Record<string, string>;
  images: any;
  specs: any;
  technical_specs: any;
  categories: {
    slug: string;
    name_i18n: Record<string, string>;
  }[];
}

// Helper function to get image URL from product data
function getDbProductImageUrl(product: Product): string {
  if (product.images) {
    try {
      const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      
      // Check if images is an array (new format)
      if (Array.isArray(images) && images.length > 0) {
        // Find primary image first
        const primaryImage = images.find(img => img.isPrimary);
        if (primaryImage && primaryImage.url) {
          return primaryImage.url;
        }
        // If no primary image, use the first image
        if (images[0] && images[0].url) {
          return images[0].url;
        }
      }
      
      // Legacy format support
      // Try to get thumbnail first, then first gallery image
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
  
  return '/product_img/placeholder.webp';
}

// Function to get product by slug or SKU
async function getProduct(productSlug: string): Promise<Product | null> {
  try {
    // First get all kraft-packaging related category IDs
    const { data: kraftPackagingCategories, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .or('slug.eq.kraft-packaging,parent_id.in.(select id from categories where slug = \'kraft-packaging\')');

    if (categoryError) {
      console.error('Error fetching kraft packaging categories:', categoryError);
      return null;
    }

    const categoryIds = kraftPackagingCategories?.map(cat => cat.id) || [];
    
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

    const { data: product, error } = await supabase
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
      .in('category_id', allCategoryIds)
      .or(`slug.eq.${productSlug},sku.eq.${productSlug}`)
      .single();

    if (error || !product) {
      console.error('Error fetching product:', error);
      return null;
    }

    // Fetch category information separately
    const { data: category } = await supabase
      .from('categories')
      .select('slug, name_i18n')
      .eq('slug', 'kraft-packaging')
      .single();

    return {
      ...product,
      categories: category ? [category] : []
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
    <div>
      <ProductDetailClient product={product} />
      <Footer />
    </div>
  );
}

// Generate static params for all kraft-packaging products
export async function generateStaticParams() {
  try {
    // Get all kraft-packaging related category IDs
    const { data: kraftPackagingCategories, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .or('slug.eq.kraft-packaging,parent_id.in.(select id from categories where slug = \'kraft-packaging\')');

    if (categoryError || !kraftPackagingCategories) {
      console.error('Error fetching kraft packaging categories:', categoryError);
      return [];
    }

    const categoryIds = kraftPackagingCategories.map(cat => cat.id);

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

// Enable static generation with ISR
export const revalidate = 3600; // Revalidate every hour