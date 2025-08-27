'use client'

import { useState, useMemo, useEffect } from 'react'
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
  
  // If images is a string, try to parse it
  if (typeof images === 'string') {
    try {
      const parsed = JSON.parse(images)
      if (parsed.gallery && Array.isArray(parsed.gallery)) {
        return parsed.gallery
      }
      if (parsed.thumbnail) {
        return [parsed.thumbnail]
      }
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  // If images is an object with gallery or thumbnail
  if (typeof images === 'object') {
    if (images.gallery && Array.isArray(images.gallery)) {
      return images.gallery
    }
    if (images.thumbnail) {
      return [images.thumbnail]
    }
  }
  
  // If images is already an array
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
  const [selectedSubFilter, setSelectedSubFilter] = useState<string>('')

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
    // Reset sub-filter when main filter changes
    setSelectedSubFilter('')
  }

  const handleSubFilterChange = (subFilter: string) => {
    setSelectedSubFilter(subFilter)
  }

  // Filter products based on selected subcategory and sub-filter
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
    let filtered = products.filter(product => product.category_id === selectedSubcategory.id)
    
    // Apply sub-filter for Double Wall products
    if (selectedFilter === 'double-wall' && selectedSubFilter) {
      if (selectedSubFilter === 'paper-cups') {
         // Filter for double-wall-cup products
         filtered = filtered.filter(product => {
           const images = getProductImages(product.images)
           return images.some((img: string) => 
             img.includes('double-wall-cup') && !img.includes('cold-drink-cup')
           )
         })
       } else if (selectedSubFilter === 'cold-drink-cups') {
         // Filter for cold-drink-cup products
         filtered = filtered.filter(product => {
           const images = getProductImages(product.images)
           return images.some((img: string) => 
             img.includes('cold-drink-cup')
           )
         })
      }
    }
    
    // Apply sub-filter for Single Wall products
    if (selectedFilter === 'single-wall' && selectedSubFilter) {
      if (selectedSubFilter === 'paper-cups') {
         // Filter for single-wall-cup products
         filtered = filtered.filter(product => {
           const images = getProductImages(product.images)
           return images.some((img: string) => 
             img.includes('single-wall-cup')
           )
         })
       } else if (selectedSubFilter === 'paper-cups-hotels') {
         // Filter for hotel paper cups within Single Wall products
         filtered = filtered.filter(product => {
           const images = getProductImages(product.images)
           return images.some((img: string) => 
             img.includes('dome-lid-cup') || (img.includes('paper-cup') && img.includes('Paper Cups for Hotels'))
           )
         })
       } else if (selectedSubFilter === 'printed-paper-cups-lids') {
         // Filter for printed paper cups and lids
         filtered = filtered.filter(product => {
           const images = getProductImages(product.images)
           return images.some((img: string) => 
             (img.includes('lid-80mm') || img.includes('lid-90mm') || (img.includes('paper-cup') && img.includes('Printed')))
           )
         })
      }
    }
    
    return filtered
  }, [products, subcategories, selectedFilter, selectedSubFilter])

  // Only show specific subcategories for certain categories
  const allowedSubcategories = useMemo(() => {
    if (currentCategorySlug === 'sugarcane-tableware') {
      const allowed = ['sugarcane-bowls', 'sugarcane-clamshells', 'sugarcane-plates', 'sugarcane-trays']
      return subcategories.filter(sub => allowed.includes(sub.slug))
    }
    
    if (currentCategorySlug === 'paper-cups') {
      const allowed = ['single-wall', 'double-wall', 'ripple-wall']
      return subcategories.filter(sub => allowed.includes(sub.slug))
    }
    
    if (currentCategorySlug === 'kraft-packaging') {
      const allowed = ['round-kraft-soup-cups-lids', 'round-kraft-salad-bowls-lids', 'round-kraft-deli-bowls-lids', 'take-away-kraft-boxes-pe-lined', 'kraft-trays-pe-lined']
      return subcategories.filter(sub => allowed.includes(sub.slug))
    }
    
    if (currentCategorySlug === 'disposable-cutlery') {
      const allowed = ['bamboo-cutlery', 'wooden-cutlery']
      return subcategories.filter(sub => allowed.includes(sub.slug))
    }
    
    if (currentCategorySlug === 'aluminum-foil') {
      const allowed = ['aluminum-foil-container', 'aluminum-foil-sheets']
      return subcategories.filter(sub => allowed.includes(sub.slug))
    }
    
    return subcategories
  }, [subcategories, currentCategorySlug, locale])

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
                  onClick={() => handleFilterChange('all')}
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
                    onClick={() => handleFilterChange(sub.slug)}
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
                
                {/* Sub-filters for Double Wall */}
                {selectedFilter === 'double-wall' && (
                  <div className="w-full mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleSubFilterChange('paper-cups')}
                        className={`inline-flex items-center px-6 py-3 border rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                          selectedSubFilter === 'paper-cups'
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700'
                        }`}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Paper Cups
                      </button>
                      <button
                        onClick={() => handleSubFilterChange('cold-drink-cups')}
                        className={`inline-flex items-center px-6 py-3 border rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                          selectedSubFilter === 'cold-drink-cups'
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700'
                        }`}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        Cold Drink Cups
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Sub-filters for Single Wall */}
                {selectedFilter === 'single-wall' && (
                  <div className="w-full mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleSubFilterChange('paper-cups')}
                        className={`inline-flex items-center px-6 py-3 border rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                          selectedSubFilter === 'paper-cups'
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700'
                        }`}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Paper Cups
                      </button>
                      <button
                        onClick={() => handleSubFilterChange('paper-cups-hotels')}
                        className={`inline-flex items-center px-6 py-3 border rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                          selectedSubFilter === 'paper-cups-hotels'
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700'
                        }`}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Paper Cups for Hotels
                      </button>
                      <button
                        onClick={() => handleSubFilterChange('printed-paper-cups-lids')}
                        className={`inline-flex items-center px-6 py-3 border rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                          selectedSubFilter === 'printed-paper-cups-lids'
                            ? 'bg-green-600 border-green-600 text-white'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700'
                        }`}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
                        </svg>
                        Printed Paper Cups (lids)
                      </button>
                    </div>
                  </div>
                )}
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
                {selectedFilter === 'all' 
                  ? 'All Products' 
                  : selectedFilter === 'double-wall' && selectedSubFilter
                    ? `${allowedSubcategories.find(sub => sub.slug === selectedFilter)?.name_i18n?.[locale] || selectedFilter} - ${selectedSubFilter === 'paper-cups' ? 'Paper Cups' : 'Cold Drink Cups'} Products`
                    : `${allowedSubcategories.find(sub => sub.slug === selectedFilter)?.name_i18n?.[locale] || selectedFilter} Products`
                }
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