'use client'

import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { getAllAluminumContainerProductImages, getProductsByCategory, getProductsByCategoryAndShape, getAvailableShapes, type ProductImage } from '@/utils/product-images';
import { getProducts, type AdaptedProduct } from '@/lib/supabase-service-adapted';
import { useState, useEffect } from 'react';

interface CategoryData {
  id: string;
  slug: string;
  name?: string;
  description?: string;
}

interface SubcategoryWithCount {
  id: string;
  slug: string;
  name?: string;
  productCount: number;
}

interface Product {
  id: string;
  slug: string;
  name?: string;
  description?: string;
  intro?: string;
  images?: any;
  specs?: any;
  category_id?: string;
}

interface CategoryClientProps {
  parentCategory: CategoryData;
  subcategories: SubcategoryWithCount[];
  products: Product[];
  categorySlug: string;
}

export default function CategoryClient({ 
  parentCategory, 
  subcategories,
  products,
  categorySlug 
}: CategoryClientProps) {
  const { t } = useLanguage();
  
  // State for aluminum foil containers three-level filtering
  const [selectedCategory, setSelectedCategory] = useState<'smoothwall' | 'wrinklewall' | null>(null);
  const [selectedShape, setSelectedShape] = useState<'rectangle' | 'round' | 'square' | null>(null);
  
  // State for database products
  const [dbProducts, setDbProducts] = useState<AdaptedProduct[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Fetch products from database for aluminum foil containers
  useEffect(() => {
    if (categorySlug === 'aluminum-foil-containers') {
      setLoading(true);
      getProducts()
        .then(products => {
          // For now, get all products since we need to identify aluminum products by SKU pattern
          // Aluminum foil container SKUs typically start with C, Y, etc.
          const aluminumProducts = products.filter(p => 
            p.sku && (p.sku.startsWith('C') || p.sku.startsWith('Y'))
          );
          setDbProducts(aluminumProducts);
        })
        .catch(error => {
          console.error('Failed to fetch products:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [categorySlug]);

  // Function to get product image path for non-aluminum categories
  const getProductImagePath = (product: Product) => {
    if (product.images?.main) {
      return product.images.main;
    }

    const categoryFolderMap: { [key: string]: string } = {
      'kitchen-baking-papers': 'Silicone-Baking-Paper',
      'paper-cups-drink-cups': 'Paper-Cups',
      'kraft-packaging': 'Kraft-Packaging',
      'wooden-disposable-tableware': 'Wooden-Disposable-Tableware',
      'bamboo-disposable-tableware': 'Bamboo-Disposable-Tableware'
    };

    const folderName = categoryFolderMap[categorySlug];
    if (!folderName) {
      return `/product_img/placeholder.webp`;
    }

    if (categorySlug === 'kitchen-baking-papers') {
      return `/product_img/Silicone-Baking-Paper/silicone-baking-paper.webp`;
    }

    return `/product_img/${folderName}/${product.slug?.toLowerCase()}.webp`;
  };
  
  // Function to get image URL from database product
  const getDbProductImageUrl = (product: AdaptedProduct) => {
    if (product.images?.thumbnail) {
      return product.images.thumbnail;
    }
    if (product.images?.additional && product.images.additional.length > 0) {
      return product.images.additional[0];
    }
    return '/product_img/placeholder.webp';
  };
  
  // Function to determine product category from SKU
  const getProductCategoryFromSku = (sku: string): 'smoothwall' | 'wrinklewall' => {
    // Smoothwall products typically start with C or Y
    // Wrinklewall products typically start with W
    if (sku.startsWith('W')) {
      return 'wrinklewall';
    }
    return 'smoothwall'; // Default to smoothwall for C and Y series
  };
  
  // Function to determine product shape from SKU
  const getProductShapeFromSku = (sku: string): 'rectangle' | 'round' | 'square' => {
    // Y series are typically round
    if (sku.startsWith('Y')) {
      return 'round';
    }
    // C series are typically rectangle
    return 'rectangle';
  };
  
  // Filter database products based on selected filters
  const getFilteredDbProducts = () => {
    let filtered = dbProducts;
    
    if (selectedCategory) {
      filtered = filtered.filter(p => 
        p.sku && getProductCategoryFromSku(p.sku) === selectedCategory
      );
    }
    
    if (selectedShape) {
      filtered = filtered.filter(p => 
        p.sku && getProductShapeFromSku(p.sku) === selectedShape
      );
    }
    
    return filtered;
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

  // For aluminum foil containers, use the new three-level system
  if (categorySlug === 'aluminum-foil-containers') {
    // Use database products instead of local ProductImage data
    const displayProducts = getFilteredDbProducts();
    
    // Get available shapes for the selected category
     const availableShapes = selectedCategory 
       ? Array.from(new Set(dbProducts
           .filter(p => p.sku && getProductCategoryFromSku(p.sku) === selectedCategory)
           .map(p => p.sku ? getProductShapeFromSku(p.sku) : 'rectangle')
         ))
       : [];

    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title={parentCategory.name || parentCategory.slug} 
          description={getCategoryDescription(parentCategory.slug)}
        />
        
        <main className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href="/products"
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← {t('products.backToCategories')}
            </Link>
          </div>

          {/* Category Filter (Smoothwall/Wrinklewall) */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Container Type</h2>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedShape(null);
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  !selectedCategory 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('smoothwall');
                  setSelectedShape(null);
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'smoothwall' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Smoothwall Aluminum Foil Container
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('wrinklewall');
                  setSelectedShape(null);
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'wrinklewall' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Wrinklewall Aluminum Foil Container
              </button>
            </div>
          </div>

          {/* Shape Filter (Rectangle/Round/Square) */}
          {selectedCategory && availableShapes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Select Shape</h3>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => setSelectedShape(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    !selectedShape 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Shapes
                </button>
                {availableShapes.map(shape => (
                  <button
                    key={shape}
                    onClick={() => setSelectedShape(shape as 'rectangle' | 'round' | 'square')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                      selectedShape === shape 
                        ? 'bg-green-600 text-white' 
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {selectedCategory && selectedShape 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} ${selectedShape.charAt(0).toUpperCase() + selectedShape.slice(1)} Products`
                : selectedCategory 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
                : `${parentCategory.name} Products`
              } ({displayProducts.length} items)
            </h2>
            
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Loading products...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayProducts.map((product, index) => {
                  const productCategory = product.sku ? getProductCategoryFromSku(product.sku) : 'smoothwall';
                  const productShape = product.sku ? getProductShapeFromSku(product.sku) : 'rectangle';
                  
                  return (
                    <Link 
                      key={`${product.sku}-${index}`}
                      href={`/products/aluminum-foil-containers/${productCategory}/${product.sku}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="h-48 relative overflow-hidden">
                        <img 
                          src={getDbProductImageUrl(product)}
                          alt={product.name || product.sku || 'Product'}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/product_img/placeholder.webp';
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name || product.sku}</h3>
                        <p className="text-sm text-gray-600">Code: {product.sku}</p>
                        <p className="text-xs text-gray-500 capitalize">{productCategory} {productShape}</p>
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

  // For other categories, use the original logic
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title={parentCategory.name || parentCategory.slug} 
        description={getCategoryDescription(parentCategory.slug)}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/products"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← {t('products.backToCategories')}
          </Link>
        </div>

        {/* Products Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {parentCategory.name} Products
          </h2>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t('products.noProducts')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${categorySlug}/${product.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={getProductImagePath(product)}
                      alt={product.name || product.slug}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/product_img/placeholder.webp';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name || product.slug}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description || product.intro || 'High-quality product for your business needs.'}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {/* Subcategories Section (Optional) */}
          {subcategories.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Browse by Subcategory</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    href={`/products/${categorySlug}/${subcategory.slug}`}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors block"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">{subcategory.name || subcategory.slug}</h4>
                    <span className="text-sm text-gray-500">{subcategory.productCount} products</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}