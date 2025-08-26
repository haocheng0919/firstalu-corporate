import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProductDetailClient from './product-detail-client';
import Footer from '../../../../components/Footer';

interface ProductPageProps {
  params: {
    product: string;
  };
}

interface Product {
  id: string;
  slug: string;
  sku: string;
  status: string;
  images?: {
    thumbnail?: string;
    gallery?: string[];
  };
  specs?: any;
  technical_specs?: any;
  categories: {
    slug: string;
    name_i18n: {
      en: string;
      zh: string;
    };
  }[];
}

interface ProductI18n {
  locale: string;
  name: string;
  description?: string;
  intro?: string;
}

async function getProductData(productSlug: string): Promise<{
  product: Product;
  productI18n: ProductI18n[];
} | null> {
  try {
    // Get product data
    const { data: product, error: productError } = await supabase
      .from('products')
      .select(`
        *,
        categories!inner(
          slug,
          name,
          category_i18n(*)
        )
      `)
      .eq('slug', productSlug)
      .single();

    if (productError || !product) {
      console.error('Product not found:', productError);
      return null;
    }

    // Get product i18n data
    const { data: productI18n, error: i18nError } = await supabase
      .from('product_i18n')
      .select('*')
      .eq('product_id', product.id);

    if (i18nError) {
      console.error('Error fetching product i18n:', i18nError);
    }

    // Process category data
    const category = product.categories;
    const categoryI18n = category?.category_i18n || [];
    const categoryNameI18n = {
      en: categoryI18n.find((i18n: any) => i18n.locale === 'en')?.name || category?.name || category?.slug,
      zh: categoryI18n.find((i18n: any) => i18n.locale === 'zh')?.name || category?.name || category?.slug
    };

    return {
      product: {
        ...product,
        categories: category ? [{
          slug: category.slug,
          name_i18n: categoryNameI18n
        }] : []
      },
      productI18n: productI18n || []
    };
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const data = await getProductData(params.product);
  
  if (!data) {
    notFound();
  }

  return (
    <>
      <ProductDetailClient 
        product={data.product}
        productI18n={data.productI18n}
      />
      <Footer />
    </>
  );
}

// Generate static params for all sugarcane-bowls products
export async function generateStaticParams() {
  try {
    // First get the main sugarcane-bowls category
    const { data: mainCategory, error: mainCategoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', 'sugarcane-bowls')
      .single();

    if (mainCategoryError || !mainCategory) {
      console.error('Error fetching main sugarcane-bowls category:', mainCategoryError);
      return [];
    }

    // Get all subcategories of sugarcane-bowls
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

    return products?.map((product) => ({
      product: product.slug || product.sku,
    })) || [];
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

// Enable static generation with ISR
export const revalidate = 3600; // Revalidate every hour