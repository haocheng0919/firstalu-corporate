'use client'

import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
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
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedThirdLevel, setSelectedThirdLevel] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Update filtered products when subcategory selection changes (only for non-sugarcane categories)
  useEffect(() => {
    if (categorySlug === 'sugarcane-tableware') {
      setFilteredProducts(products);
      return;
    }
    
    let filtered = products;
    
    if (selectedSubcategory) {
      // Filter products by selected subcategory
      const subcategoryObj = subcategories.find(sub => sub.slug === selectedSubcategory);
      if (subcategoryObj) {
        filtered = products.filter(product => product.category_id === subcategoryObj.id);
      }
    }
    
    if (selectedThirdLevel) {
      // Filter products by selected third level category
      const thirdLevelObj = subcategories.find(sub => sub.slug === selectedThirdLevel);
      if (thirdLevelObj) {
        filtered = products.filter(product => product.category_id === thirdLevelObj.id);
      }
    }
    
    setFilteredProducts(filtered);
  }, [selectedSubcategory, selectedThirdLevel, products, subcategories, categorySlug]);

  // Function to get product image path
  const getProductImagePath = (product: Product) => {
    if (product.images?.main) {
      return product.images.main;
    }
    if (product.images?.thumbnail) {
      return product.images.thumbnail;
    }
    // For sugarcane tableware, try to construct image path based on category and product name
    if (categorySlug === 'sugarcane-tableware') {
      const subcategory = subcategories.find(sub => sub.id === product.category_id);
      if (subcategory && product.name) {
        // Map category slugs to folder names
        const categoryFolderMap: { [key: string]: string } = {
          'sugarcane-plates': 'plate',
          'sugarcane-bowls': 'Bowls',
          'sugarcane-clamshells': 'chamshell',
          'sugarcane-trays': 'tray'
        };
        const categoryFolder = categoryFolderMap[subcategory.slug];
        if (categoryFolder) {
          // Extract the product folder name from the product name (before ' - ')
          const productFolder = product.name.split(' - ')[0];
          return `/product_img/Sugarcane Tableware/${categoryFolder}/${productFolder}/${productFolder} (1).webp`;
        }
      }
    }
    return '/product_img/placeholder.svg';
  };

  // Function to handle image load error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/product_img/placeholder.svg';
  };

  const getCategoryDescription = (categorySlug: string) => {
    switch (categorySlug) {
      case 'aluminum-foil': 
        return 'High-quality aluminum foil containers for food packaging and storage.';
      case 'baking-paper':
        return 'Premium baking papers for all your cooking and baking needs.';
      case 'paper-cups':
        return 'Eco-friendly paper cups for hot and cold beverages.';
      case 'kraft-packaging':
        return 'Sustainable kraft packaging solutions for food service.';
      case 'disposable-cutlery':
        return 'Convenient disposable cutlery for events and food service.';
      case 'sugarcane-tableware':
        return 'Biodegradable sugarcane tableware for eco-conscious dining.';
      default:
        return 'Explore our range of high-quality products.';
    }
  };

  // Separate subcategories by level
  const getSubcategoriesByLevel = () => {
    const level2 = subcategories.filter(sub => {
      // Level 2 categories (direct children of main categories)
      return ['aluminum-foil-containers', 'kitchen-baking-papers', 'hot-cups', 'cold-cups', 
              'kraft-food-boxes', 'kraft-bags', 'disposable-forks', 'disposable-knives', 
              'disposable-spoons', 'sugarcane-plates', 'sugarcane-bowls', 'sugarcane-clamshells', 
              'sugarcane-trays'].includes(sub.slug);
    });
    
    const level3 = subcategories.filter(sub => {
      // Level 3 categories (children of level 2)
      return !['aluminum-foil-containers', 'kitchen-baking-papers', 'hot-cups', 'cold-cups', 
              'kraft-food-boxes', 'kraft-bags', 'disposable-forks', 'disposable-knives', 
              'disposable-spoons', 'sugarcane-plates', 'sugarcane-bowls', 'sugarcane-clamshells', 
              'sugarcane-trays'].includes(sub.slug);
    });
    
    return { level2, level3 };
  };

  const { level2, level3 } = getSubcategoriesByLevel();

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

        {/* Subcategories Navigation */}
        {!selectedSubcategory && level2.length > 0 && categorySlug !== 'sugarcane-tableware' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {level2.map((subcategory) => (
                <div
                  key={subcategory.id}
                  onClick={() => setSelectedSubcategory(subcategory.slug)}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                >
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">Image</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {subcategory.name || subcategory.slug}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {subcategory.productCount} products
                    </p>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      View Products →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Third Level Categories (when subcategory is selected) */}
        {selectedSubcategory && level3.length > 0 && categorySlug !== 'sugarcane-tableware' && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Filter by Category</h2>
              <button
                onClick={() => setSelectedSubcategory(null)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Categories
              </button>
            </div>
            <div className="flex gap-4 flex-wrap mb-8">
              <button
                onClick={() => setSelectedThirdLevel(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  !selectedThirdLevel 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                All Products
              </button>
              {level3.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedThirdLevel(category.slug)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedThirdLevel === category.slug 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category.name || category.slug}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {categorySlug === 'sugarcane-tableware' ? 'All Products' : (selectedSubcategory ? 'Products' : 'All Products')}
          </h2>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={categorySlug === 'sugarcane-tableware' ? `/products/sugarcane-tableware/${product.slug}` : `/products/${categorySlug}/${product.slug}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <img
                      src={getProductImagePath(product)}
                      alt={product.name || product.slug}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name || product.slug}
                    </h3>
                    {product.description && (
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {product.description}
                      </p>
                    )}
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