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
  sku?: string;
  name?: string;
  name_es?: string;
  name_de?: string;
  name_fr?: string;
  description?: string;
  description_es?: string;
  description_de?: string;
  description_fr?: string;
  intro?: string;
  intro_es?: string;
  intro_de?: string;
  intro_fr?: string;
  images?: any;
  specs?: any;
  technical_specs?: any;
  categories?: {
    id: string;
    slug: string;
    name?: string;
    name_es?: string;
    name_de?: string;
    name_fr?: string;
  };
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

// Fetch product data by slug or SKU
async function getProduct(productSlug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories!inner(
          id,
          slug,
          name,
          name_es,
          name_de,
          name_fr
        )
      `)
      .or(`slug.eq.${productSlug},sku.eq.${productSlug}`)
      .eq('categories.slug', 'sugarcane-tableware')
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return data;
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
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        slug,
        sku,
        categories!inner(
          slug
        )
      `)
      .eq('categories.slug', 'sugarcane-tableware');

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