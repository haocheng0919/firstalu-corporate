// Enable static generation with ISR
export const revalidate = 3600; // Revalidate every hour

import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { getProducts, type AdaptedProduct } from '@/lib/supabase-service-adapted';
import { notFound } from 'next/navigation';

interface AluminumFoilRollPageProps {
  
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
  
  // Fallback to public images based on category (webp format)
  if (product.category_slug === 'aluminum-foil-roll') {
    return '/product_img/Aluminum Foil/Foil Sheets/Aluminum-Foil-Roll/aluminum-foil-roll.webp';
  } else if (product.category_slug === 'hairdressing-foil-roll') {
    return '/product_img/Aluminum Foil/Foil Sheets/Hairdressing-Foil-Roll/hairdressing-foil-roll.webp';
  } else if (product.category_slug === 'pop-up-foil-sheets') {
    return '/product_img/Aluminum Foil/Foil Sheets/Pop-up-Foil-Sheets/pop-up-foil-sheets.webp';
  }
  
  return '/product_img/placeholder.svg';
}

async function getAluminumFoilRollData() {
  try {
    // Get products with reasonable limit to prevent memory issues
    const allProducts = await getProducts(200);
    
    // Filter products by category IDs used for aluminum foil roll products
    const aluminumFoilRollProducts = allProducts.filter(p => 
      p.category_slug === 'aluminum-foil-roll' || 
      p.category_slug === 'hairdressing-foil-roll' ||
      p.category_slug === 'pop-up-foil-sheets' ||
      (p.category_id && ['13194b42-ebdd-4696-8851-afc26748badb', 'ceec4c30-31f2-4067-a527-876a6fe92062', 'fd74437a-3d37-4c3b-89f2-5a461c2fb805'].includes(p.category_id))
    );

    return {
      products: aluminumFoilRollProducts
    };
  } catch (error) {
    console.error('Error fetching aluminum foil roll data:', error);
    return null;
  }
}

export default async function AluminumFoilRollPage() {
  const data = await getAluminumFoilRollData();
  
  if (!data) {
    notFound();
  }

  const { products } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="Aluminum Foil Roll Products" 
        description="Premium aluminum foil rolls for professional and household use"
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/products"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to All Categories
          </Link>
        </div>

        {/* Products Grid */}
        <section>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">Products Coming Soon</h4>
              <p className="text-gray-500 text-lg">No products available at the moment</p>
              <p className="text-gray-400 mt-2">Contact us for current product availability</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(1).map((product) => {
                const productImage = getDbProductImageUrl(product);
                const productName = product.name || product.sku;
                const productDescription = product.description || product.intro || 'High-quality aluminum foil roll for your needs.';

                return (
                  <Link
                    key={product.id || product.sku}
                    href={`/products/aluminum-foil-roll/${product.slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={productImage}
                        alt={productName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{productName}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{productDescription}</p>
                      {product.sku && (
                        <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>
                      )}
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-blue-600 font-medium text-sm">View Details</span>
                        <span className="text-xs text-gray-400 capitalize">{product.category_slug?.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}