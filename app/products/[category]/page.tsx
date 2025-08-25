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

    // Get all nested subcategories recursively
    let allCategoryLevels = [...(allSubcategories || [])];
    let currentLevelIds = allSubcategories?.map(sub => sub.id) || [];
    
    // Keep fetching deeper levels until no more subcategories are found
    while (currentLevelIds.length > 0) {
      const { data: nextLevelCategories, error: nextLevelError } = await supabase
        .from('categories')
        .select(`
          *,
          category_i18n(*)
        `)
        .in('parent_id', currentLevelIds);

      if (nextLevelError) {
        console.error('Error fetching next level categories:', nextLevelError);
        break;
      }

      if (!nextLevelCategories || nextLevelCategories.length === 0) {
        break;
      }

      allCategoryLevels = [...allCategoryLevels, ...nextLevelCategories];
      currentLevelIds = nextLevelCategories.map(cat => cat.id);
    }
    
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
      .in('category_id', allCategoryIds);

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
    
    // Add product counts to subcategories by querying each subcategory separately
    const subcategoriesWithCounts = await Promise.all(
      processedSubcategories.map(async (subcategory) => {
        const { count, error: countError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', subcategory.id);
        
        if (countError) {
          console.error(`Error counting products for subcategory ${subcategory.slug}:`, countError);
        }
        
        return {
          ...subcategory,
          productCount: count || 0
        };
      })
    );

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