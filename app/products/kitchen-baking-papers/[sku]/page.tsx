// Enable static generation with ISR
export const revalidate = 3600; // Revalidate every hour

import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../../../components/Footer';
import Link from 'next/link';
import { getProductBySku, getProducts, type AdaptedProduct } from '@/lib/supabase-service-adapted';
import { notFound } from 'next/navigation';
import ProductDetailClient from './product-detail-client';

interface ProductPageProps {
  params: {
    sku: string;
  };
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

async function getProductData(sku: string): Promise<AdaptedProduct | null> {
  try {
    const product = await getProductBySku(sku);
    return product;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductData(params.sku);
  
  if (!product) {
    notFound();
  }

  return (
    <ProductDetailClient 
      product={product}
    />
  );
}

// Generate static paths for kitchen baking papers products
export async function generateStaticParams() {
  try {
    const products = await getProducts(200);
    const kitchenBakingProducts = products.filter(p => p.category_slug === 'baking-paper');
    
    return kitchenBakingProducts.map((product) => ({
      sku: product.sku,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}