'use client'

import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../../../components/Footer';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

interface CategoryData {
  id: string;
  slug: string;
  name?: string;
}

interface Product {
  id: string;
  slug: string;
  name?: string;
  description?: string;
  intro?: string;
  images?: any;
  specs?: any;
}

interface SubcategoryClientProps {
  parentCategory: CategoryData;
  subcategory: CategoryData;
  products: Product[];
  categorySlug: string;
}

export default function SubcategoryClient({ 
  parentCategory, 
  subcategory, 
  products, 
  categorySlug 
}: SubcategoryClientProps) {
  const { t } = useLanguage();

  const getProductCardImage = (product: Product) => {
    const fallback = `/product_img/placeholder.svg`;
    if (!product.images) return fallback;

    try {
      const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      if (images?.thumbnail) return images.thumbnail;
      if (images?.main) return images.main;
      if (images?.additional && Array.isArray(images.additional) && images.additional.length > 0) {
        return images.additional[0];
      }
    } catch {
      // ignore parse errors and fallback
    }
    return fallback;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title={subcategory.name || subcategory.slug} 
        description={`${parentCategory.name} - ${subcategory.name}`}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/products" className="text-blue-600 hover:text-blue-800 font-medium">
                  {t('products.title')}
                </Link>
              </li>
              <li>
                <span className="text-gray-500 mx-2">›</span>
                <Link 
                  href={`/products/${categorySlug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {parentCategory.name}
                </Link>
              </li>
              <li>
                <span className="text-gray-500 mx-2">›</span>
                <span className="text-gray-900 font-medium">{subcategory.name}</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Products Grid */}
        <section>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t('products.noProducts')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${categorySlug}/${product.slug}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow block">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={getProductCardImage(product)}
                      alt={product.name || product.slug}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/product_img/placeholder.svg'; }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{product.name || product.slug}</h3>
                      <p className="text-sm text-blue-600">{subcategory.name}</p>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{product.description || product.intro || `High-quality ${(product.name || product.slug).toLowerCase()} for your business needs.`}</p>
                    
                    {product.specs?.features && product.specs.features.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.productFeatures')}:</h4>
                        <div className="text-gray-600 space-y-1">
                          {product.specs.features.map((feature: string, index: number) => (
                            <p key={index}>• {feature}</p>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {product.specs?.sizes && product.specs.sizes.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.availableSizes')}:</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.specs.sizes.map((size: string, index: number) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-blue-600 hover:text-blue-800 font-medium">
                      {t('products.viewDetails')} →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}