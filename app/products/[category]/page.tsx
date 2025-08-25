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
      name: parentCategoryData.category_i18n?.find((i18n: any) => i18n.locale === 'en')?.name || parentCategoryData.name || parentCategoryData.slug,
      description: parentCategoryData.category_i18n?.find((i18n: any) => i18n.locale === 'en')?.description || parentCategoryData.description
    };

    // Get all subcategories (level 2 and level 3) for this parent category
    const { data: allSubcategories, error: subcategoriesError } = await supabase
      .from('categories')
      .select(`
        *,
        category_i18n(*)
      `)
      .eq('parent_id', parentCategoryData.id);

    if (subcategoriesError) {
      console.error('Error fetching subcategories:', subcategoriesError);
      return null;
    }

    // Get level 3 categories (grandchildren)
    const level2Ids = allSubcategories?.map(sub => sub.id) || [];
    const { data: level3Categories, error: level3Error } = await supabase
      .from('categories')
      .select(`
        *,
        category_i18n(*)
      `)
      .in('parent_id', level2Ids);

    if (level3Error) {
      console.error('Error fetching level 3 categories:', level3Error);
    }

    // Combine all subcategories
    const allCategoryLevels = [...(allSubcategories || []), ...(level3Categories || [])];
    
    // Process subcategories with i18n data
    const processedSubcategories = allCategoryLevels.map(subcategory => ({
      ...subcategory,
      name: subcategory.category_i18n?.find((i18n: any) => i18n.locale === 'en')?.name || subcategory.name || subcategory.slug,
      description: subcategory.category_i18n?.find((i18n: any) => i18n.locale === 'en')?.description || subcategory.description
    }));

    // Get products for this category and all its subcategories
    const allCategoryIds = [parentCategoryData.id, ...allCategoryLevels.map(sub => sub.id)];
    const { data: categoryProducts, error: productsError } = await supabase
      .from('products')
      .select(`
        *,
        product_i18n(*)
      `)
      .in('category_id', allCategoryIds)
      .limit(1000);

    if (productsError) {
      console.error('Error fetching products:', productsError);
    }

    // Process products with i18n data
    const processedProducts = (categoryProducts || []).map(product => ({
      ...product,
      name: product.product_i18n?.find((i18n: any) => i18n.locale === 'en')?.name || product.name,
      description: product.product_i18n?.find((i18n: any) => i18n.locale === 'en')?.description || product.description,
      intro: product.product_i18n?.find((i18n: any) => i18n.locale === 'en')?.intro || product.intro
    }));
    
    // Add product counts to subcategories
    const subcategoriesWithCounts = processedSubcategories.map(subcategory => ({
      ...subcategory,
      productCount: (categoryProducts || []).filter(product => product.category_id === subcategory.id).length
    }));

    return {
      parentCategory,
      subcategories: subcategoriesWithCounts,
      products: processedProducts
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