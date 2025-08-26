// Enable static generation with ISR
export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'force-static';

import Footer from '../../../../components/Footer';
import { getProducts, type AdaptedProduct } from '@/lib/supabase-service-adapted';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ProductDetailClient from './product-detail-client';

interface ProductPageProps {
  params: {
    product: string;
  };
}

interface ProductWithImages extends AdaptedProduct {
  serverDetectedImages: string[];
  specifications?: any;
  relatedProducts?: AdaptedProduct[];
}

// Lightweight static fallback when database is unavailable
const FALLBACK_PRODUCTS: AdaptedProduct[] = [
  {
    id: 'fallback-afr-001',
    slug: 'aluminum-foil-roll',
    sku: 'AFR-001',
    status: 'active',
    category_slug: 'aluminum-foil-roll',
    name: 'Aluminum Foil Roll',
    intro: 'High-quality aluminum foil rolls available in multiple sizes and thicknesses',
    description:
      'Professional aluminum foil rolls perfect for food packaging, cooking, and storage. Available in various sizes with detailed specifications. Details seen in E-catalogue from Download page.',
    specs: {
      sizes: [
        { size: '300mm×7.62m', thickness: '0.008mm-0.025mm', quantity: '24 rolls/case' },
        { size: '300mm×30m', thickness: '0.008mm-0.025mm', quantity: '24 rolls/case' },
        { size: '300mm×75m', thickness: '0.008mm-0.025mm', quantity: '6 rolls/case' },
        { size: '300mm×100m', thickness: '0.008mm-0.025mm', quantity: '6 rolls/case' },
        { size: '300mm×100m', thickness: '0.008mm-0.025mm', quantity: '4 rolls/case' },
        { size: '450mm×7.62m', thickness: '0.008mm-0.025mm', quantity: '24 rolls/case' },
        { size: '450mm×30m', thickness: '0.008mm-0.025mm', quantity: '24 rolls/case' },
        { size: '450mm×75m', thickness: '0.008mm-0.025mm', quantity: '6 rolls/case' },
        { size: '450mm×100m', thickness: '0.008mm-0.025mm', quantity: '6 rolls/case' },
        { size: '450mm×100m', thickness: '0.008mm-0.025mm', quantity: '4 rolls/case' },
      ],
    },
    technical_specs: { material: 'aluminum', type: 'foil_roll', application: 'food_packaging' },
  },
  {
    id: 'fallback-hfr-001',
    slug: 'hairdressing-foil-roll',
    sku: 'HFR-001',
    status: 'active',
    category_slug: 'hairdressing-foil-roll',
    name: 'Hairdressing Foil Roll',
    intro: 'Professional hairdressing foil rolls for salon use',
    description:
      'Specialized aluminum foil rolls designed for professional hairdressing applications. Available in various widths and lengths. Details seen in E-catalogue from Download page.',
    specs: {
      sizes: [
        { length: '100mm', width: '3-300m', thickness: '0.009mm-0.030mm' },
        { length: '120mm', width: '3-300m', thickness: '0.009mm-0.030mm' },
        { length: '150mm', width: '3-300m', thickness: '0.009mm-0.030mm' },
        { length: '200mm', width: '3-300m', thickness: '0.009mm-0.030mm' },
      ],
    },
    technical_specs: { material: 'aluminum', type: 'foil_roll', application: 'hairdressing' },
  },
  {
    id: 'fallback-pfs-001',
    slug: 'pop-up-foil-sheets',
    sku: 'PFS-001',
    status: 'active',
    category_slug: 'pop-up-foil-sheets',
    name: 'Pop-up Foil Sheets',
    intro: 'Convenient pop-up aluminum foil sheets for easy dispensing',
    description:
      'Pre-cut aluminum foil sheets in convenient pop-up dispensers. Perfect for food service and kitchen applications. Details seen in E-catalogue from Download page.',
    specs: {
      sizes: [
        { width: '22.8mm', quantity: '50-500', thickness: '0.009mm-0.030mm' },
        { width: '300mm', quantity: '50-500', thickness: '0.009mm-0.030mm' },
        { width: '380mm', quantity: '50-500', thickness: '0.009mm-0.030mm' },
        { width: '450mm', quantity: '50-500', thickness: '0.009mm-0.030mm' },
      ],
    },
    technical_specs: { material: 'aluminum', type: 'foil_sheets', application: 'food_service', format: 'pop_up' },
  },
];

// Helper function to get image URL from database product
function getDbProductImageUrl(product: AdaptedProduct): string {
  if (product.images) {
    try {
      const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      if (images?.thumbnail) return images.thumbnail;
      if (images?.additional && Array.isArray(images.additional) && images.additional.length > 0) {
        return images.additional[0];
      }
    } catch {
      // ignore parse error and fall through
    }
  }
  return '/product_img/placeholder.svg';
}

// Add a strict SSR timeout guard for product fetching to avoid 502s when DB is slow/unavailable
const SSR_FETCH_TIMEOUT_MS = 800;
async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallbackValue: T): Promise<T> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(fallbackValue), timeoutMs);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch(() => {
        clearTimeout(timer);
        resolve(fallbackValue);
      });
  });
}

async function getProductData(productParam: string): Promise<ProductWithImages | null> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const isPlaceholder = !url || !key || url.includes('placeholder.supabase.co') || key === 'placeholder-key';
    const isDev = process.env.NODE_ENV !== 'production';

    // In dev or when Supabase envs are placeholders, avoid any server DB calls completely
    const productsSourceBase: AdaptedProduct[] = (isDev || isPlaceholder)
      ? FALLBACK_PRODUCTS
      : await withTimeout<AdaptedProduct[]>(getProducts(200), SSR_FETCH_TIMEOUT_MS, FALLBACK_PRODUCTS);

    const productsSource = productsSourceBase || FALLBACK_PRODUCTS;

    console.log('[AFR Product Page] Param:', productParam, 'EnvDev:', isDev, 'PlaceholderEnv:', isPlaceholder, 'Source count:', productsSource.length);

    // Find the specific product by slug or SKU (case-insensitive)
    const lowered = productParam.toLowerCase();
    const product = productsSource.find(
      (p) => p.slug === productParam || (p.sku && p.sku.toLowerCase() === lowered)
    );

    if (!product) {
      console.warn('[AFR Product Page] Product not found for param:', productParam, 'Checked SKUs:', productsSource.map(p => p.sku).filter(Boolean));
      return null;
    }

    // Related products by category (support fallback without category_id)
    const relatedProducts = productsSource
      .filter((p) => {
        if (p.id === product.id) return false;
        if (product.category_id && p.category_id) return p.category_id === product.category_id;
        if (product.category_slug && p.category_slug) return p.category_slug === product.category_slug;
        return false;
      })
      .slice(0, 4);

    return {
      ...product,
      serverDetectedImages: [],
      relatedProducts,
    };
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const productData = await getProductData(params.product);

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
    const makeFallbackPaths = () =>
      FALLBACK_PRODUCTS.flatMap((p) => {
        const list = [{ product: p.slug }];
        if (p.sku) list.push({ product: p.sku });
        return list;
      });

    // In development, avoid any DB calls to prevent local proxy timeouts
    if (process.env.NODE_ENV !== 'production') {
      return makeFallbackPaths();
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const isPlaceholder = !url || !key || url.includes('placeholder.supabase.co') || key === 'placeholder-key';
    if (isPlaceholder) {
      return makeFallbackPaths();
    }

    // First get the main aluminum-foil-roll category
    const { data: mainCategory, error: mainCategoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', 'aluminum-foil-roll')
      .single();

    if (mainCategoryError || !mainCategory) {
      return makeFallbackPaths();
    }

    // Get all subcategories of aluminum-foil-roll
    const { data: subcategories, error: subcategoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('parent_id', mainCategory.id);

    if (subcategoryError) {
      console.error('Error fetching subcategories:', subcategoryError);
    }

    // Combine main category and subcategory IDs
    const categoryIds = [mainCategory.id, ...(subcategories?.map((cat) => cat.id) || [])];

    const { data: products } = await supabase
      .from('products')
      .select('slug, sku')
      .in('category_id', categoryIds)
      .not('slug', 'is', null);

    // Include both slug and SKU where available
    const paths = (products || []).flatMap((product) => {
      const list: { product: string }[] = [];
      if (product.slug) list.push({ product: product.slug });
      if (product.sku) list.push({ product: product.sku });
      return list;
    });

    return paths.length > 0 ? paths : makeFallbackPaths();
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return FALLBACK_PRODUCTS.flatMap((p) => {
      const list = [{ product: p.slug }];
      if (p.sku) list.push({ product: p.sku });
      return list;
    });
  }
}