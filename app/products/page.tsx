import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { getProducts, type AdaptedProduct as Product } from '@/lib/supabase-service-adapted';
import { supabase } from '@/lib/supabase';
import ProductsClient from './products-client';

async function getStaticData() {
  try {
    // Get the 6 main categories from Supabase
    const { data: mainCategories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, slug, name, name_i18n, thumbnail_url')
      .is('parent_id', null)
      .order('name');

    if (categoriesError) {
      console.error('Error fetching main categories:', categoriesError);
      return { categories: [] };
    }

    // Get all categories for product counting
    const { data: allCategories, error: allCategoriesError } = await supabase
      .from('categories')
      .select('id, parent_id');

    if (allCategoriesError) {
      console.error('Error fetching all categories:', allCategoriesError);
    }

    // Get products with a reasonable limit to prevent memory issues
    const products = await getProducts(1000);
    
    // Calculate product counts for each main category
    const categoriesWithCounts = (mainCategories || []).map(category => {
      // Get all subcategories of this parent category (level 2)
      const level2Categories = (allCategories || []).filter(cat => cat.parent_id === category.id);
      const level2Ids = level2Categories.map(cat => cat.id);
      
      // Get level 3 categories (grandchildren)
      const level3Categories = (allCategories || []).filter(cat => level2Ids.includes(cat.parent_id || ''));
      const level3Ids = level3Categories.map(cat => cat.id);
      
      // Count products in parent category, all level 2 subcategories, and all level 3 subcategories
      const allRelevantCategoryIds = [category.id, ...level2Ids, ...level3Ids];
      const productCount = products.filter(product => 
        allRelevantCategoryIds.includes(product.category_id || '')
      ).length;
      
      return {
        ...category,
        productCount
      };
    });
    
    return {
      categories: categoriesWithCounts
    };
  } catch (error) {
    console.error('Error fetching static data:', error);
    return {
      categories: []
    };
  }
}

export default async function Products() {
  const data = await getStaticData();
  
  return <ProductsClient categories={data.categories} />;
}