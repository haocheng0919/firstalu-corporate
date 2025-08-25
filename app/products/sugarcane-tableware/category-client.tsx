'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { type AdaptedCategory as ProductCategory, type AdaptedProduct as Product } from '@/lib/supabase-service-adapted';

interface CategoryWithCount extends ProductCategory {
  productCount: number;
}

interface CategoryClientProps {
  parentCategory: ProductCategory;
  subcategories: CategoryWithCount[];
  products: Product[];
  categorySlug: string;
}

export default function CategoryClient({ 
  parentCategory, 
  subcategories, 
  products, 
  categorySlug 
}: CategoryClientProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');

  // Function to format product names by removing hyphens and capitalizing words
  const formatProductName = (name: string | undefined) => {
    if (!name) return 'Product';
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Function to get product image path
  const getProductImagePath = (product: Product, subcategory?: ProductCategory) => {
    // Check if product has images from database first
    if (product.images) {
      const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      if (images.main) return images.main;
      if (images.thumbnail) return images.thumbnail;
      if (images.additional && Array.isArray(images.additional) && images.additional.length > 0) {
        return images.additional[0];
      }
    }
    
    // For sugarcane tableware, try to construct image path based on category and product name
    if (categorySlug === 'sugarcane-tableware') {
      if (subcategory && product.name) {
        // Map category slugs to folder names
        const categoryFolderMap: { [key: string]: string } = {
          'sugarcane-plates': 'plate',
          'sugarcane-bowls': 'bowls',
          'sugarcane-clamshells': 'chamshell',
          'sugarcane-trays': 'tray'
        };
        const categoryFolder = categoryFolderMap[subcategory.slug];
        if (categoryFolder) {
          // Extract the product folder name from the product name (before ' - ')
          let productFolder = product.name.split(' - ')[0];
          // Handle special cases for folder names
          if (productFolder === '6 inch bow') {
            productFolder = '6 inch bow';
          }
          return `/product_img/Sugarcane Tableware/${categoryFolder}/${productFolder}/${productFolder} (1).webp`;
        }
      }
    }
    
    return '/product_img/placeholder.svg';
  };

  // Function to get category description
  const getCategoryDescription = (category: ProductCategory) => {
    if (category.slug === 'sugarcane-tableware') {
      return 'Eco-friendly sugarcane tableware products made from sustainable bagasse fiber. Our collection includes bowls, plates, clamshells, and trays perfect for food service and takeaway applications.';
    }
    return category.description || `Explore our ${category.name} collection`;
  };

  // Get all subcategories for filtering
  const availableSubcategories = subcategories.filter(sub => {
    const validSlugs = ['sugarcane-bowls', 'sugarcane-plates', 'sugarcane-clamshells', 'sugarcane-trays'];
    return validSlugs.includes(sub.slug);
  });

  // Filter products based on selected category
  useEffect(() => {
    let filtered = products;

    if (selectedSubcategory !== 'all') {
      const subcategory = subcategories.find(sub => sub.slug === selectedSubcategory);
      if (subcategory) {
        filtered = filtered.filter(product => product.category_id === subcategory.id);
      }
    }

    setFilteredProducts(filtered);
  }, [selectedSubcategory, products, subcategories]);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title={parentCategory.name || 'Sugarcane Tableware'}
        description={getCategoryDescription(parentCategory)}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/products">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedSubcategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedSubcategory('all')}
              className="mb-2"
            >
              All Products ({products.length})
            </Button>
            {availableSubcategories.map((subcategory: CategoryWithCount) => (
              <Button
                key={subcategory.id}
                variant={selectedSubcategory === subcategory.slug ? 'default' : 'outline'}
                onClick={() => setSelectedSubcategory(subcategory.slug)}
                className="mb-2"
              >
                {subcategory.name} ({subcategory.productCount})
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const productSubcategory = subcategories.find(sub => sub.id === product.category_id);
            const productImagePath = getProductImagePath(product, productSubcategory);
            
            // Construct the correct product link - point to subcategory's product page
            const productHref = productSubcategory 
              ? `/products/${productSubcategory.slug}/${product.slug}`
              : `/products/${categorySlug}/${product.slug}`;

            return (
              <Link key={product.id} href={productHref}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src={productImagePath}
                      alt={formatProductName(product.name || product.slug || 'Product')}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder-product.jpg';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {formatProductName(product.name || product.slug || 'Product')}
                    </h3>
                    {product.intro && (
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {product.intro}
                      </p>
                    )}
                    {productSubcategory && (
                      <div className="mt-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {productSubcategory.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}