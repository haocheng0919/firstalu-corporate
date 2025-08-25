import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProductDetailClient from './product-detail-client';

interface PageProps {
  params: {
    product: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  
  // Fetch product data
  const { data: product, error: productError } = await supabase
    .from('products')
    .select(`
      *,
      categories!inner (
        slug,
        name_i18n
      )
    `)
    .eq('slug', params.product)
    .eq('categories.slug', 'sugarcane-plates')
    .single();

  if (productError || !product) {
    notFound();
  }

  // Fetch product i18n data
  const { data: productI18n } = await supabase
    .from('product_i18n')
    .select('*')
    .eq('product_id', product.id);

  // Transform category data to match expected format
  const transformedProduct = {
    ...product,
    categories: product.categories ? [product.categories] : []
  };

  return (
    <ProductDetailClient 
      product={transformedProduct}
      productI18n={productI18n || []}
    />
  );
}

export async function generateStaticParams() {
  
  const { data: products } = await supabase
    .from('products')
    .select('slug, categories!inner(slug)')
    .eq('categories.slug', 'sugarcane-plates');

  return products?.map((product) => ({
    product: product.slug,
  })) || [];
}

export async function generateMetadata({ params }: PageProps) {
  
  const { data: product } = await supabase
    .from('products')
    .select(`
      sku,
      product_i18n (
        locale,
        name,
        description
      )
    `)
    .eq('slug', params.product)
    .single();

  const productName = product?.product_i18n?.find((i18n: any) => i18n.locale === 'en')?.name || product?.sku || 'Product';
  const productDescription = product?.product_i18n?.find((i18n: any) => i18n.locale === 'en')?.description || '';

  return {
    title: `${productName} - Sugarcane Plates | FirstAlu`,
    description: productDescription || `Eco-friendly sugarcane plate ${productName} from FirstAlu.`,
  };
}