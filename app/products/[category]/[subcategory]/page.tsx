// Enable static generation with ISR
export const revalidate = 3600; // Revalidate every hour

import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../../../components/Footer';
import Link from 'next/link';
import { getProducts, type AdaptedCategory as ProductCategory, type AdaptedProduct as Product } from '@/lib/supabase-service-adapted';
import { supabase } from '@/lib/supabase';
import SubcategoryClient from './subcategory-client';
import { notFound } from 'next/navigation';

async function getSubcategoryData(categorySlug: string, subcategorySlug: string) {
  try {
    // Get parent category
    const { data: parentCategoryData, error: parentError } = await supabase
      .from('categories')
      .select(`
        *,
        category_i18n(*)
      `)
      .eq('slug', categorySlug)
      .is('parent_id', null)
      .single();

    if (parentError || !parentCategoryData) {
      return null;
    }

    // Process parent category i18n data
    const parentCategory = {
      ...parentCategoryData,
      name: parentCategoryData.category_i18n?.find((i18n: any) => i18n.locale === 'en')?.name || parentCategoryData.slug,
    };

    // Get subcategory
    const { data: subcategoryData, error: subError } = await supabase
      .from('categories')
      .select(`
        *,
        category_i18n(*)
      `)
      .eq('slug', subcategorySlug)
      .eq('parent_id', parentCategoryData.id)
      .single();

    if (subError || !subcategoryData) {
      return null;
    }

    // Process subcategory i18n data
    const subcategory = {
      ...subcategoryData,
      name: subcategoryData.category_i18n?.find((i18n: any) => i18n.locale === 'en')?.name || subcategoryData.slug,
    };

    // Get products for this subcategory with reasonable limit
    const allProducts = await getProducts(300);
    const products = allProducts.filter(product => product.category_id === subcategoryData.id);

    return {
      parentCategory,
      subcategory,
      products
    };
  } catch (error) {
    console.error('Error fetching subcategory data:', error);
    return null;
  }
}

export default async function SubcategoryProducts({ 
  params 
}: { 
  params: { category: string; subcategory: string } 
}) {
  const data = await getSubcategoryData(params.category, params.subcategory);
  
  if (!data) {
    notFound();
  }

  return <SubcategoryClient 
    parentCategory={data.parentCategory}
    subcategory={data.subcategory}
    products={data.products}
    categorySlug={params.category}
  />;
}