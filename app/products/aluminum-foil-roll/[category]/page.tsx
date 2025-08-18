// Enable static generation with ISR
export const revalidate = 3600; // Revalidate every hour

import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../../../components/Footer';
import Link from 'next/link';
import { getProducts, type AdaptedProduct } from '@/lib/supabase-service-adapted';
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
    if (images.main) return images.main;
    if (images.gallery && Array.isArray(images.gallery) && images.gallery.length > 0) {
      return images.gallery[0];
    }
  }
  return '/product_img/placeholder.webp';
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
    const products = await getProducts(200);
    const aluminumFoilRollProducts = products.filter(p => 
      p.category_slug === 'aluminum-foil-roll' || 
      (p.category_id && ['13194b42-ebdd-4696-8851-afc26748badb', 'ceec4c30-31f2-4067-a527-876a6fe92062', 'fd74437a-3d37-4c3b-89f2-5a461c2fb805'].includes(p.category_id))
    );
    
    return aluminumFoilRollProducts.map(product => ({
      category: product.slug
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}