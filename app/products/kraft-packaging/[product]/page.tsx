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
  category_slug: string;
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
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        id,
        slug,
        sku,
        name,
        description,
        images,
        specs,
        technical_specs,
        category_slug
      `)
      .eq('category_slug', 'kraft-packaging')
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
  const { data: products } = await supabase
    .from('products')
    .select('slug, sku')
    .eq('category_slug', 'kraft-packaging');

  if (!products) return [];

  return products.map((product) => ({
    product: product.slug || product.sku,
  }));
}

// Enable static generation with ISR
export const revalidate = 3600; // Revalidate every hour