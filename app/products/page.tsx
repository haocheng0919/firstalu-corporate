'use client'

// Force dynamic rendering to prevent static generation issues with Supabase
export const dynamic = 'force-dynamic'

import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCategories as getProductCategories, getProducts, type AdaptedCategory as ProductCategory, type AdaptedProduct as Product } from '@/lib/supabase-service-adapted';
import { useLanguage } from '@/lib/language-context';

export default function Products() {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          getProductCategories(),
          getProducts()
        ]);
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category: ProductCategory) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const getCategoryDescription = (categorySlug: string) => {
    switch (categorySlug) {
      case 'aluminum-foil-containers': 
        return t('products.categories.aluminumContainers.description');
      case 'kitchen-baking-papers': 
        return t('products.categories.kitchenBaking.description');
      case 'paper-cups-drink-cups': 
        return t('products.categories.paperCups.description');
      case 'kraft-packaging': 
        return t('products.categories.kraftPackaging.description');
      case 'wooden-disposable-tableware': 
        return t('products.categories.woodenTableware.description');
      case 'bamboo-disposable-tableware': 
        return t('products.categories.woodenTableware.description');
      default: 
        return t('products.subtitle');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('products.loading')}</p>
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    const categoryProducts = products.filter(product => product.category_id === selectedCategory.id);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title={selectedCategory.name || selectedCategory.slug} 
          description={getCategoryDescription(selectedCategory.slug)}
        />
        
        <main className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <div className="mb-8">
            <button 
              onClick={handleBackToCategories}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← {t('products.backToCategories')}
            </button>
          </div>

          {/* Products Grid */}
          <section>
            {categoryProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">{t('products.noProducts')}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map((product: Product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={(product.images?.main) || `/product_cat/${selectedCategory.slug}.webp`}
                        alt={product.name || product.slug}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{product.name || product.slug}</h3>
                        <p className="text-sm text-blue-600">{selectedCategory.name || selectedCategory.slug}</p>
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
                      
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                          {t('products.requestQuote')}
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-colors">
                          {t('products.viewDetails')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title={t('products.title')} 
        description={t('products.subtitle')}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Categories Overview */}
         <section className="mb-16">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
               <div 
                 key={category.id} 
                 className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                 onClick={() => handleCategoryClick(category)}
               >
                 <div className="h-48 relative overflow-hidden">
                   <img 
                     src={`/product_cat/${category.slug}.webp`}
                     alt={category.name}
                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                   />
                 </div>
                 <div className="p-6">
                   <div className="mb-2">
                     <h3 className="text-xl font-semibold text-gray-900">{category.name || category.slug}</h3>
                   </div>
                   <p className="text-gray-600 mb-4">{getCategoryDescription(category.slug)}</p>
                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-500">
                       {products.filter(product => product.category_id === category.id).length} products
                     </span>
                     <span className="text-blue-600 hover:text-blue-800 font-medium">
                       View Products →
                     </span>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}