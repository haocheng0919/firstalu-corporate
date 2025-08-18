// Enable static generation with ISR
export const revalidate = 3600; // Revalidate every hour

import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { getSubcategories, getProducts, type AdaptedCategory as ProductCategory, type AdaptedProduct as Product } from '@/lib/supabase-service-adapted';
import { supabase } from '@/lib/supabase';
import CategoryClient from './category-client';
import { notFound } from 'next/navigation';

async function getCategoryData(categorySlug: string) {
  try {
    // First, get the parent category by slug
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
      description: parentCategoryData.category_i18n?.find((i18n: any) => i18n.locale === 'en')?.description
    };

    // Get subcategories
    const subcategories = await getSubcategories(parentCategoryData.id);

    // Get products with reasonable limit to prevent memory issues
    const allProducts = await getProducts(1000);
    const subcategoryIds = subcategories.map(sub => sub.id);
    const categoryProducts = allProducts.filter(product => 
      subcategoryIds.includes(product.category_id || '')
    );
    
    // Add product counts to subcategories
    const subcategoriesWithCounts = subcategories.map(subcategory => ({
      ...subcategory,
      productCount: allProducts.filter(product => product.category_id === subcategory.id).length
    }));

    return {
      parentCategory,
      subcategories: subcategoriesWithCounts,
      products: categoryProducts
    };
  } catch (error) {
    console.error('Error fetching category data:', error);
    return null;
  }
}

export default async function CategorySubcategories({ 
  params 
}: { 
  params: { category: string } 
}) {
  const data = await getCategoryData(params.category);
  
  if (!data) {
    notFound();
  }

  return <CategoryClient 
    parentCategory={data.parentCategory}
    subcategories={data.subcategories}
    products={data.products}
    categorySlug={params.category}
  />;
}