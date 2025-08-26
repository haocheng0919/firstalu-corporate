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
  try {
    // Get all sugarcane-plates related category IDs
    const { data: sugarcanePlateCategories, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .or('slug.eq.sugarcane-plates,parent_id.in.(select id from categories where slug = \'sugarcane-plates\')');

    if (categoryError || !sugarcanePlateCategories) {
      console.error('Error fetching sugarcane plate categories:', categoryError);
      return [];
    }

    const categoryIds = sugarcanePlateCategories.map(cat => cat.id);

    const { data: products } = await supabase
      .from('products')
      .select('slug, sku')
      .in('category_id', categoryIds);

    return products?.map((product) => ({
      product: product.slug || product.sku,
    })) || [];
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
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