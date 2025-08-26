// Enable static generation with ISR
export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'force-static';

import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../../../../components/Footer';
import Link from 'next/link';
import { getProductByCode, getAllAluminumContainerProductImages, type ProductImage } from '@/utils/product-images';
import { getAvailableWebPImages } from '@/utils/server-image-detection';
import { getProductSpecification } from '@/utils/aluminum-product-specs';
import { getProductBySku, getProducts, type AdaptedProduct } from '@/lib/supabase-service-adapted';
import { supabase } from '@/lib/supabase';
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

// Helper function to get product category from SKU
function getProductCategoryFromSku(sku: string): 'smoothwall' | 'wrinklewall' {
  if (sku.startsWith('C')) return 'smoothwall';
  if (sku.startsWith('Y')) return 'wrinklewall';
  return 'smoothwall'; // default
}

// Helper function to get product shape from SKU
function getProductShapeFromSku(sku: string): 'rectangle' | 'round' | 'square' {
  if (sku.includes('-R')) return 'round';
  if (sku.includes('-S')) return 'square';
  return 'rectangle'; // default
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

// Helper function to convert AdaptedProduct to ProductImage
function adaptedProductToProductImage(dbProduct: AdaptedProduct): ProductImage {
  const category = dbProduct.sku ? getProductCategoryFromSku(dbProduct.sku) : 'smoothwall';
  const shape = dbProduct.sku ? getProductShapeFromSku(dbProduct.sku) : 'rectangle';
  const imageUrl = getDbProductImageUrl(dbProduct);
  
  return {
    code: dbProduct.sku || '',
    name: dbProduct.name || dbProduct.sku || '',
    category,
    shape,
    path: imageUrl,
    images: [imageUrl],
    type: 'aluminum-foil-container'
  };
}

async function getProductData(category: string, productCode: string): Promise<ProductWithImages | null> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const isPlaceholder = !url || !key || url.includes('placeholder.supabase.co') || key === 'placeholder-key';
    const isDev = process.env.NODE_ENV !== 'production';

    // In dev or when Supabase envs are placeholders, avoid any server DB calls completely and use local fallback
    if (isDev || isPlaceholder) {
      const product = getProductByCode(productCode);
      if (!product || product.category !== category) {
        return null;
      }
      const imageInfo = getAvailableWebPImages(product.category, product.shape, product.code);
      const specifications = getProductSpecification(product.code);
      const allProducts = getAllAluminumContainerProductImages();
      const relatedProducts = allProducts
        .filter(p => p.category === product.category && p.shape === product.shape && p.code !== product.code)
        .slice(0, 4);

      return {
        ...product,
        serverDetectedImages: imageInfo.availableImages,
        specifications,
        relatedProducts
      };
    }

    // First try to get product from database
    const dbProduct = await getProductBySku(productCode);
    
    if (dbProduct && dbProduct.images) {
      // Parse images from database
      const images = typeof dbProduct.images === 'string' ? JSON.parse(dbProduct.images) : dbProduct.images;
      const serverDetectedImages = [] as string[];
      
      // Add thumbnail if exists
      if (images.thumbnail) {
        serverDetectedImages.push(images.thumbnail);
      }
      
      // Add additional images if exist
      if (images.additional && Array.isArray(images.additional)) {
        serverDetectedImages.push(...images.additional);
      }
      
      // Get product specifications (fallback to local specs)
      const specifications = getProductSpecification(productCode);
      
      // Get related products from database (limit to prevent memory issues)
       const allDbProducts = await getProducts(100);
       const relatedDbProducts = allDbProducts
         .filter(p => 
           p.sku && 
           (p.sku.startsWith('C') || p.sku.startsWith('Y')) && // aluminum foil containers
           getProductCategoryFromSku(p.sku) === category && 
           p.sku !== productCode
         )
         .slice(0, 4);
      
      const relatedProducts = relatedDbProducts.map(adaptedProductToProductImage);
      
      // Create a compatible product object
        const productImage: ProductImage = {
          code: dbProduct.sku || productCode,
          name: dbProduct.name || productCode,
          category: category as 'smoothwall' | 'wrinklewall',
          shape: 'rectangle', // Default, could be enhanced later
          path: serverDetectedImages[0] || '/product_img/placeholder.svg',
          images: serverDetectedImages,
          type: 'aluminum-foil-container'
        };
      
      return {
        ...productImage,
        serverDetectedImages,
        specifications,
        relatedProducts
      };
    }
    
    // Fallback to local product data
    const product = getProductByCode(productCode);
    
    // Verify that the product exists and matches the category
    if (!product || product.category !== category) {
      return null;
    }
    
    // Get server-side detected images (fallback)
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

// Generate static params for all aluminum-foil-containers products
export async function generateStaticParams() {
  try {
    const makeFallbackPaths = () => {
      const all = getAllAluminumContainerProductImages();
      return all.map((p) => ({ category: p.category, product: p.code }));
    };

    // Avoid DB calls in development or when Supabase envs are placeholders
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const isPlaceholder = !url || !key || url.includes('placeholder.supabase.co') || key === 'placeholder-key';
    const isDev = process.env.NODE_ENV !== 'production';
    if (isDev || isPlaceholder) {
      return makeFallbackPaths();
    }

    // First get the main aluminum-foil-containers category
    const { data: mainCategory, error: mainCategoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', 'aluminum-foil-containers')
      .single();

    if (mainCategoryError || !mainCategory) {
      console.error('Error fetching main aluminum-foil-containers category:', mainCategoryError);
      return makeFallbackPaths();
    }

    // Get all subcategories of aluminum-foil-containers
    const { data: subcategories, error: subcategoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('parent_id', mainCategory.id);

    if (subcategoryError) {
      console.error('Error fetching subcategories:', subcategoryError);
    }

    // Combine main category and subcategory IDs
    const categoryIds = [mainCategory.id, ...(subcategories?.map(cat => cat.id) || [])];

    const { data: products } = await supabase
      .from('products')
      .select('slug, sku')
      .in('category_id', categoryIds);

    const paths = products?.map((product) => {
      const sku = product.sku || product.slug;
      const category = sku?.startsWith('C') ? 'smoothwall' : 'wrinklewall';
      
      return {
        category,
        product: sku,
      };
    }).filter(p => p.product) || [];

    return paths.length > 0 ? paths : makeFallbackPaths();
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}