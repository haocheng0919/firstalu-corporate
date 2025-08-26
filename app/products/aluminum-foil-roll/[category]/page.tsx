// Enable static generation with ISR
export const revalidate = 3600; // Revalidate every hour

import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../../../components/Footer';
import Link from 'next/link';
import { getProducts, type AdaptedProduct } from '@/lib/supabase-service-adapted';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ProductDetailClient from './product-detail-client';

interface ProductPageProps {
  params: {
    category: string;
  };
}

interface ProductWithImages extends AdaptedProduct {
  serverDetectedImages: string[];
  specifications?: any;
  relatedProducts?: AdaptedProduct[];
}

// Helper function to get image URL from database product
function getDbProductImageUrl(product: AdaptedProduct): string {
  if (product.images) {
    const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
    if (images.thumbnail) return images.thumbnail;
    if (images.additional && Array.isArray(images.additional) && images.additional.length > 0) {
      return images.additional[0];
    }
  }
  return '/product_img/placeholder.svg';
}

async function getProductData(categorySlug: string): Promise<ProductWithImages | null> {
  try {
    // Get products with reasonable limit to prevent memory issues
    const allProducts = await getProducts(200);
    
    // Find the specific product by category slug
    const product = allProducts.find(p => p.slug === categorySlug);
    
    if (!product) {
      return null;
    }

    // Get related products from the same parent category, excluding AFR-001 SKU
    const relatedProducts = allProducts
      .filter(p => p.category_id === product.category_id && p.id !== product.id && p.sku !== 'AFR-001')
      .slice(0, 4);

    return {
      ...product,
      serverDetectedImages: [],
      relatedProducts
    };
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const productData = await getProductData(params.category);
  
  if (!productData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <ProductDetailClient product={productData} />
      <Footer />
    </div>
  );
}

// Generate static params for all aluminum foil roll products
export async function generateStaticParams() {
  try {
    // Get all aluminum foil roll related category IDs
    const { data: aluminumRollCategories, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .or('slug.eq.aluminum-foil-roll,parent_id.in.(select id from categories where slug = \'aluminum-foil-roll\')');

    if (categoryError || !aluminumRollCategories) {
      console.error('Error fetching aluminum foil roll categories:', categoryError);
      return [];
    }

    const categoryIds = aluminumRollCategories.map(cat => cat.id);

    const { data: products } = await supabase
      .from('products')
      .select('slug, sku')
      .in('category_id', categoryIds)
      .not('slug', 'is', null);

    return products?.map((product) => ({
      category: product.slug,
    })).filter(p => p.category) || [];
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}