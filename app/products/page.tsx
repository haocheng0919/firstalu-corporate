import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { getCategories as getProductCategories, getProducts, type AdaptedCategory as ProductCategory, type AdaptedProduct as Product } from '@/lib/supabase-service-adapted';
import { supabase } from '@/lib/supabase';
import ProductsClient from './products-client';

async function getStaticData() {
  try {
    // Get top-level categories
    const categories = await getProductCategories();
    
    // Get all categories (including subcategories) for product counting
    const { data: allCategories, error: allCategoriesError } = await supabase
      .from('categories')
      .select('*');

    if (allCategoriesError) {
      console.error('Error fetching all categories:', allCategoriesError);
    }

    // Get products with a reasonable limit to prevent memory issues
    const products = await getProducts(1000);
    
    // Calculate product counts for each parent category
    const categoriesWithCounts = categories.map(category => {
      // Get all subcategories of this parent category
      const subcategories = (allCategories || []).filter(cat => cat.parent_id === category.id);
      const subcategoryIds = subcategories.map(cat => cat.id);
      
      // Count products in all subcategories AND in the parent category itself
      const productCount = products.filter(product => 
        subcategoryIds.includes(product.category_id || '') || product.category_id === category.id
      ).length;
      
      return {
        ...category,
        name: category.name || category.slug,
        productCount
      };
    });

    // Restrict to the six top-level product categories only
    const ALLOWED_TOP_LEVEL_CATEGORY_SLUGS = new Set([
      'aluminum-foil',
      'baking-paper',
      'paper-cups',
      'kraft-packaging',
      'disposable-cutlery',
      'sugarcane-tableware',
    ]);

    const finalCategories = categoriesWithCounts.filter(cat => ALLOWED_TOP_LEVEL_CATEGORY_SLUGS.has(cat.slug));
    
    return {
      categories: finalCategories
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