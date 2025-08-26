import { notFound } from 'next/navigation';
import { getProductBySku } from '@/lib/supabase-service-adapted';
import ProductDetailClient from './product-detail-client';
import Footer from '../../../../components/Footer';
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

// Helper function to get image URL from database product
function getDbProductImageUrl(product: Product): string {
  if (product.images) {
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
    if (images.thumbnail) return images.thumbnail;
    if (images.gallery && Array.isArray(images.gallery) && images.gallery.length > 0) {
      return images.gallery[0];
    }
  }
  return '/product_img/placeholder.svg';
}

// Function to get product by slug or SKU
async function getProduct(productSlug: string): Promise<Product | null> {
  try {
    // First get all sugarcane-tableware related category IDs
    const { data: sugarcaneTablewareCategories, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .or('slug.eq.sugarcane-tableware,parent_id.in.(select id from categories where slug = \'sugarcane-tableware\')');

    if (categoryError) {
      console.error('Error fetching sugarcane tableware categories:', categoryError);
      return null;
    }

    const categoryIds = sugarcaneTablewareCategories?.map(cat => cat.id) || [];
    
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

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return product;
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
    <div className="min-h-screen bg-gray-50">
      <ProductDetailClient product={product} />
      <Footer />
    </div>
  );
}

// Generate static paths for all sugarcane products
export async function generateStaticParams() {
  try {
    // Get all sugarcane-tableware related category IDs
    const { data: sugarcaneTablewareCategories, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .or('slug.eq.sugarcane-tableware,parent_id.in.(select id from categories where slug = \'sugarcane-tableware\')');

    if (categoryError || !sugarcaneTablewareCategories) {
      console.error('Error fetching sugarcane tableware categories:', categoryError);
      return [];
    }

    const categoryIds = sugarcaneTablewareCategories.map(cat => cat.id);

    const { data: products, error } = await supabase
      .from('products')
      .select('slug, sku')
      .in('category_id', categoryIds);

    if (error) {
      console.error('Error generating static params:', error);
      return [];
    }

    return products?.map((product: { slug?: string; sku?: string }) => ({
      product: product.slug || product.sku,
    })) || [];
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}