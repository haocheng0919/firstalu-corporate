// Enable static generation with ISR
export const revalidate = 3600; // Revalidate every hour

import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../../../../components/Footer';
import Link from 'next/link';
import { getProductByCode, getAllAluminumContainerProductImages, type ProductImage } from '@/utils/product-images';
import { getAvailableWebPImages } from '@/utils/server-image-detection';
import { getProductSpecification } from '@/utils/aluminum-product-specs';
import { notFound } from 'next/navigation';
import ProductDetailClient from './product-detail-client';

interface ProductPageProps {
  params: {
    category: 'smoothwall' | 'wrinklewall';
    product: string;
  };
}

interface ProductWithImages extends ProductImage {
  serverDetectedImages: string[];
  specifications?: any;
  relatedProducts?: ProductImage[];
}

async function getProductData(category: string, productCode: string): Promise<ProductWithImages | null> {
  try {
    const product = getProductByCode(productCode);
    
    // Verify that the product exists and matches the category
    if (!product || product.category !== category) {
      return null;
    }
    
    // Get server-side detected images
    const imageInfo = getAvailableWebPImages(
      product.category, 
      product.shape, 
      product.code
    );
    
    // Get product specifications
    const specifications = getProductSpecification(product.code);
    
    // Get related products (same category and shape, excluding current product)
    const allProducts = getAllAluminumContainerProductImages();
    const relatedProducts = allProducts
      .filter(p => 
        p.category === product.category && 
        p.shape === product.shape && 
        p.code !== product.code
      )
      .slice(0, 4); // Show up to 4 related products
    
    return {
      ...product,
      serverDetectedImages: imageInfo.availableImages,
      specifications,
      relatedProducts
    };
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductData(params.category, params.product);
  
  if (!product) {
    notFound();
  }

  return (
    <ProductDetailClient 
      product={product}
      category={params.category}
      serverDetectedImages={product.serverDetectedImages}
      specifications={product.specifications}
      relatedProducts={product.relatedProducts}
    />
  );
}

// Generate static paths for all aluminum foil container products
export async function generateStaticParams() {
  const { getAllAluminumContainerProductImages } = await import('@/utils/product-images');
  const allProducts = getAllAluminumContainerProductImages();
  
  return allProducts.map((product) => ({
    category: product.category,
    product: product.code,
  }));
}