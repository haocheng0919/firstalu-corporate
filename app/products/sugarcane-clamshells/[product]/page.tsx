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
    name_i18n?: any;
  };
}

// Helper function to get image URL from database product
function getDbProductImageUrl(product: Product): string {
  if (product.images) {
    const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
    if (images.thumbnail) return images.thumbnail;
    if (images.gallery && Array.isArray(images.gallery) && images.gallery.length > 0) {
      return images.gallery[0];
    }
  }
  return '/product_img/placeholder.webp';
}

// Get product by slug or SKU
async function getProduct(productSlug: string): Promise<Product | null> {
  try {
    // First try to get by slug
    const { data: productBySlug, error: slugError } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          slug,
          name,
          name_i18n
        )
      `)
      .eq('slug', productSlug)
      .eq('categories.slug', 'sugarcane-clamshells')
      .single();

    if (productBySlug && !slugError) {
      return productBySlug;
    }

    // If not found by slug, try by SKU
    const { data: productBySku, error: skuError } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          slug,
          name,
          name_i18n
        )
      `)
      .eq('sku', productSlug)
      .eq('categories.slug', 'sugarcane-clamshells')
      .single();

    return productBySku || null;
  } catch (error) {
    console.error('Error fetching product:', error);
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

// Generate static params for all products in this category
export async function generateStaticParams() {
  try {
    // Get all sugarcane-clamshells related category IDs
    const { data: sugarcaneClamshellCategories, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .or('slug.eq.sugarcane-clamshells,parent_id.in.(select id from categories where slug = \'sugarcane-clamshells\')');

    if (categoryError || !sugarcaneClamshellCategories) {
      console.error('Error fetching sugarcane clamshell categories:', categoryError);
      return [];
    }

    const categoryIds = sugarcaneClamshellCategories.map(cat => cat.id);

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

// Revalidate every hour
export const revalidate = 3600;