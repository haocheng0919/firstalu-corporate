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

    // Get all products
    const products = await getProducts();
    
    // Calculate product counts for each parent category
    const categoriesWithCounts = categories.map(category => {
      let productCount = 0;
      
      // Special handling for aluminum-foil-containers category
      if (category.slug === 'aluminum-foil-containers') {
        // Import aluminum container products dynamically
        const { getAllAluminumContainerProductImages } = require('@/utils/product-images');
        const aluminumProducts = getAllAluminumContainerProductImages();
        productCount = aluminumProducts.length;
      } else {
        // Get all subcategories of this parent category
        const subcategories = (allCategories || []).filter(cat => cat.parent_id === category.id);
        const subcategoryIds = subcategories.map(cat => cat.id);
        
        // Count products in all subcategories AND in the parent category itself
        productCount = products.filter(product => 
          subcategoryIds.includes(product.category_id || '') || product.category_id === category.id
        ).length;
      }
      
      return {
        ...category,
        productCount
      };
    });

    // Ensure Aluminum Foil Roll appears as a card even if it's not a top-level category
    const foilRollSlugs = ['aluminum-foil-roll', 'hairdressing-foil-roll', 'pop-up-foil-sheets'];
    const hasFoilRollTopLevel = categories.some(c => c.slug === 'aluminum-foil-roll');

    // Compute product count for the Aluminum Foil Roll family based on related subcategory slugs
    const foilRollProductCount = products.filter(p => foilRollSlugs.includes((p.category_slug || '').toLowerCase())).length;

    const finalCategories = hasFoilRollTopLevel
      ? categoriesWithCounts
      : [
          ...categoriesWithCounts,
          {
            id: 'synthetic:aluminum-foil-roll',
            slug: 'aluminum-foil-roll',
            name: 'Aluminum Foil Roll',
            productCount: foilRollProductCount,
          },
        ];
    
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