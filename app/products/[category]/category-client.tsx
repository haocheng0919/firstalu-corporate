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
  
  // Fetch products from database
  useEffect(() => {
    if (categorySlug === 'aluminum-foil-containers' || categorySlug === 'kitchen-baking-papers') {
      setLoading(true);
      getProducts(300)
        .then(products => {
          let filteredProducts: AdaptedProduct[] = [];
          
          if (categorySlug === 'aluminum-foil-containers') {
            // Aluminum foil container products - filter by SKU pattern
            filteredProducts = products.filter(p => 
              p.sku && (p.sku.startsWith('C') || p.sku.startsWith('Y'))
            );
          } else if (categorySlug === 'kitchen-baking-papers') {
            // Kitchen & Baking Papers products - filter by category
            filteredProducts = products.filter(p => {
              // Check if product belongs to Kitchen & Baking Papers category
              return p.category_slug === 'kitchen-baking-papers' || 
                     (p.name && p.name.toLowerCase().includes('baking paper')) ||
                     (p.sku && p.sku.startsWith('SBP'));
            });
          }
          
          setDbProducts(filteredProducts);
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
  
  // Function to determine product category from category_slug
  const getProductCategoryFromProduct = (product: AdaptedProduct): 'smoothwall' | 'wrinklewall' => {
    if (product.category_slug?.includes('wrinklewall')) {
      return 'wrinklewall';
    }
    if (product.category_slug?.includes('smoothwall')) {
      return 'smoothwall';
    }
    // Fallback: use SKU pattern for products without proper category_slug
    if (product.sku?.startsWith('W')) {
      return 'wrinklewall';
    }
    return 'smoothwall';
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
        getProductCategoryFromProduct(p) === selectedCategory
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
           .filter(p => getProductCategoryFromProduct(p) === selectedCategory)
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
            
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Loading products...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayProducts.map((product, index) => {
                  const productCategory = getProductCategoryFromProduct(product);
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

  // Get sample products data for categories without database products
  const getSampleProducts = (categorySlug: string) => {
    const sampleProducts: { [key: string]: any[] } = {
      'paper-cups-drink-cups': [
        {
          id: 'pc-8oz',
          name: '8oz Paper Coffee Cups',
          slug: '8oz-paper-coffee-cups',
          description: 'Disposable paper coffee cups with heat-resistant coating.',
          image: '/disposablephoto/Disposable Cups.webp'
        },
        {
          id: 'pc-12oz',
          name: '12oz Paper Drink Cups', 
          slug: '12oz-paper-drink-cups',
          description: 'Large paper cups perfect for cold and hot beverages.',
          image: '/disposablephoto/Disposable Cups.webp'
        },
        {
          id: 'pc-16oz',
          name: '16oz Paper Cups with Lids',
          slug: '16oz-paper-cups-with-lids',
          description: 'Extra large paper cups with matching lids for takeaway drinks.',
          image: '/disposablephoto/Disposable Cups.webp'
        }
      ],
      'kraft-packaging': [
        {
          id: 'kpb-s',
          name: 'Kraft Paper Bags Small',
          slug: 'kraft-paper-bags-small',
          description: 'Eco-friendly kraft paper bags for food packaging.',
          image: '/disposablephoto/Disposable Food Boxes.webp'
        },
        {
          id: 'kpb-m',
          name: 'Kraft Paper Bags Medium',
          slug: 'kraft-paper-bags-medium', 
          description: 'Medium-sized kraft paper bags with handles.',
          image: '/disposablephoto/Disposable Food Boxes.webp'
        },
        {
          id: 'kfb-rect',
          name: 'Kraft Food Boxes Rectangle',
          slug: 'kraft-food-boxes-rectangle',
          description: 'Rectangular kraft food boxes for takeaway meals.',
          image: '/disposablephoto/Disposable Food Boxes.webp'
        }
      ],
      'wooden-disposable-tableware': [
        {
          id: 'wc-standard',
          name: 'Wooden Disposable Chopsticks',
          slug: 'wooden-disposable-chopsticks',
          description: 'Natural wooden chopsticks for restaurants and takeaway.',
          image: '/disposablephoto/Disposable Chopsticks.webp'
        },
        {
          id: 'wf-set',
          name: 'Wooden Fork and Spoon Set',
          slug: 'wooden-fork-spoon-set',
          description: 'Eco-friendly wooden cutlery set for sustainable dining.',
          image: '/disposablephoto/Disposable Chopsticks.webp'
        },
        {
          id: 'wk-eco',
          name: 'Wooden Knife Eco-Pack',
          slug: 'wooden-knife-eco-pack',
          description: 'Biodegradable wooden knives for environmental dining.',
          image: '/disposablephoto/Disposable Chopsticks.webp'
        }
      ],
      'bamboo-disposable-tableware': [
        {
          id: 'bc-premium',
          name: 'Bamboo Disposable Chopsticks',
          slug: 'bamboo-disposable-chopsticks',
          description: 'Premium bamboo chopsticks with smooth finish.',
          image: '/disposablephoto/Disposable Chopsticks.webp'
        },
        {
          id: 'bf-set',
          name: 'Bamboo Fork and Spoon Set',
          slug: 'bamboo-fork-spoon-set',
          description: 'Sustainable bamboo cutlery set for eco-conscious dining.',
          image: '/disposablephoto/Disposable Chopsticks.webp'
        },
        {
          id: 'bp-round',
          name: 'Bamboo Round Plates',
          slug: 'bamboo-round-plates',
          description: 'Disposable bamboo plates for parties and events.',
          image: '/disposablephoto/Disposable Chopsticks.webp'
        }
      ]
    };

    return sampleProducts[categorySlug] || [];
  };

  // For other categories, use enhanced display with sample products or database products
  let displayProducts;
  let sampleProducts = [];
  
  if (categorySlug === 'kitchen-baking-papers') {
    // Use database products for Kitchen & Baking Papers
    displayProducts = dbProducts;
  } else {
    // Use sample products for other categories
    sampleProducts = products.length === 0 ? getSampleProducts(categorySlug) : [];
    displayProducts = products.length > 0 ? products : sampleProducts;
  }
  
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
          
          {displayProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">Products Coming Soon</h4>
              <p className="text-gray-500 text-lg">{t('products.noProducts')}</p>
              <p className="text-gray-400 mt-2">Contact us for current product availability</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayProducts.map((product) => {
                // Check if this is a database product (AdaptedProduct) or sample product
                const isDbProduct = categorySlug === 'kitchen-baking-papers' || 'sku' in product;
                
                let productImage, productName, productDescription, productHref;
                
                if (categorySlug === 'kitchen-baking-papers' && 'sku' in product) {
                  // Database product for Kitchen & Baking Papers
                  const dbProduct = product as AdaptedProduct;
                  productImage = getDbProductImageUrl(dbProduct);
                  productName = dbProduct.name || dbProduct.sku;
                  productDescription = dbProduct.description || dbProduct.intro || 'High-quality baking paper for your kitchen needs.';
                  productHref = `/products/${categorySlug}/${dbProduct.sku}`;
                } else if ('id' in product) {
                  // Regular Product interface
                  const regularProduct = product as Product;
                  productImage = getProductImagePath(regularProduct);
                  productName = regularProduct.name || regularProduct.slug;
                  productDescription = regularProduct.description || regularProduct.intro || 'High-quality product for your business needs.';
                  productHref = `/products/${categorySlug}/${regularProduct.slug}`;
                } else {
                  // Sample product
                  productImage = product.image;
                  productName = product.name;
                  productDescription = product.description;
                  productHref = `/products/${categorySlug}/${product.slug}`;
                }

                return (
                  <Link
                    key={product.id || product.sku || product.slug}
                    href={productHref}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={productImage}
                        alt={productName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `/product_cat/${categorySlug}.webp`;
                        }}
                      />
                      {!isDbProduct && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          Preview
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{productName}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{productDescription}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-blue-600 font-medium text-sm">View Details</span>
                        {!isDbProduct && (
                          <span className="text-xs text-gray-400">Contact for specs</span>
                        )}
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