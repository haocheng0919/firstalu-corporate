'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  slug: string
  name_i18n: Record<string, string>
  images: any
  description_i18n: Record<string, string>
  category_id: string
}

interface Category {
  id: string
  slug: string
  name_i18n: Record<string, string>
}

interface CategoryClientProps {
  products: Product[]
  subcategories: Category[]
  currentCategorySlug: string
  locale: string
  slugPath: string[]
}

function getProductImages(images: any): string[] {
  if (!images) return []
  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return Array.isArray(images) ? images : []
}

export default function CategoryClient({ 
  products, 
  subcategories, 
  currentCategorySlug, 
  locale, 
  slugPath 
}: CategoryClientProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  // Filter products based on selected subcategory
  const filteredProducts = useMemo(() => {
    if (selectedFilter === 'all') {
      return products
    }
    
    // Find the selected subcategory
    const selectedSubcategory = subcategories.find(sub => sub.slug === selectedFilter)
    if (!selectedSubcategory) {
      return products
    }
    
    // Filter products that belong to the selected subcategory
    return products.filter(product => product.category_id === selectedSubcategory.id)
  }, [products, subcategories, selectedFilter])

  // Only show specific subcategories for Sugarcane Tableware
  const allowedSubcategories = useMemo(() => {
    if (currentCategorySlug === 'sugarcane-tableware') {
      const allowed = ['bowls', 'chamshell', 'plate', 'tray']
      return subcategories.filter(sub => allowed.includes(sub.slug))
    }
    return subcategories
  }, [subcategories, currentCategorySlug])

  return (
    <>
      {/* Subcategories Filter */}
      {allowedSubcategories.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter-style category navigation */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {/* All products filter */}
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`inline-flex items-center px-6 py-3 border rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                    selectedFilter === 'all'
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                  }`}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  All Products
                </button>
                
                {/* Subcategory filters */}
                {allowedSubcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedFilter(sub.slug)}
                    className={`inline-flex items-center px-6 py-3 border rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                      selectedFilter === sub.slug
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
                    </svg>
                    {sub.name_i18n?.[locale] || sub.slug}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products */}
      {filteredProducts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {selectedFilter === 'all' ? 'All Products' : `${allowedSubcategories.find(sub => sub.slug === selectedFilter)?.name_i18n?.[locale] || selectedFilter} Products`}
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${slugPath.join('/')}/${product.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-square relative overflow-hidden">
                    {(() => {
                      const images = getProductImages(product.images);
                      const imageToShow = images.length > 0 ? images[0] : null;

                      return imageToShow ? (
                        <Image
                          src={imageToShow}
                          alt={product.name_i18n?.[locale] || product.slug}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="text-sm text-gray-500 font-medium">No image</span>
                          </div>
                        </div>
                      );
                    })()
                    }
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {product.name_i18n?.[locale] || product.slug}
                    </h3>
                    {product.description_i18n?.[locale] && (
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                        {product.description_i18n[locale].split('\n')[0]}
                      </p>
                    )}
                    <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                      <span>View Details</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {filteredProducts.length === 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">
              {selectedFilter === 'all' 
                ? 'This category is currently empty. Please check back later.'
                : `No products found in the ${allowedSubcategories.find(sub => sub.slug === selectedFilter)?.name_i18n?.[locale] || selectedFilter} category.`
              }
            </p>
          </div>
        </section>
      )}
    </>
  )
}