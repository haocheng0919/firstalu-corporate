'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

// FilterDropdown Component
interface FilterDropdownProps {
  selectedFilter: string
  selectedSubFilter: string
  allowedSubcategories: Category[]
  locale: string
  onFilterChange: (filter: string) => void
  onSubFilterChange: (subFilter: string) => void
}

function FilterDropdown({ 
  selectedFilter, 
  selectedSubFilter, 
  allowedSubcategories, 
  locale, 
  onFilterChange, 
  onSubFilterChange 
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubOpen, setIsSubOpen] = useState(false)

  const getFilterDisplayName = (filter: string) => {
    if (filter === 'all') return 'All Products'
    const subcategory = allowedSubcategories.find(sub => sub.slug === filter)
    return subcategory?.name_i18n?.[locale] || filter
  }

  const getSubFilterOptions = () => {
    if (selectedFilter === 'double-wall') {
      return [
        { value: '', label: 'All Double Wall' },
        { value: 'paper-cups', label: 'Paper Cups' },
        { value: 'cold-drink-cups', label: 'Cold Drink Cups' }
      ]
    }
    if (selectedFilter === 'single-wall') {
      return [
        { value: '', label: 'All Single Wall' },
        { value: 'paper-cups', label: 'Paper Cups' },
        { value: 'paper-cups-hotels', label: 'Paper Cups for Hotels' },
        { value: 'printed-paper-cups-lids', label: 'Printed Paper Cups (lids)' }
      ]
    }
    if (selectedFilter === 'aluminum-foil-container-smoothwall' || selectedFilter === 'aluminum-foil-container-wrinklewall') {
      return [
        { value: '', label: 'All Containers' },
        { value: 'rectangular', label: 'Rectangular' },
        { value: 'round', label: 'Round' },
        { value: 'square', label: 'Square' }
      ]
    }
    return []
  }

  const subFilterOptions = getSubFilterOptions()
  const hasSubFilters = subFilterOptions.length > 0

  return (
    <div className="relative flex gap-3">
      {/* Main Filter Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center px-6 py-3 border rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 min-w-[160px] justify-between"
        >
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>{getFilterDisplayName(selectedFilter)}</span>
          </div>
          <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-2">
              <button
                onClick={() => {
                  onFilterChange('all')
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center ${
                  selectedFilter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                All Products
              </button>
              {allowedSubcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    onFilterChange(sub.slug)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center ${
                    selectedFilter === sub.slug ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
                  </svg>
                  {sub.name_i18n?.[locale] || sub.slug}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sub Filter Dropdown */}
      {hasSubFilters && (
        <div className="relative">
          <button
            onClick={() => setIsSubOpen(!isSubOpen)}
            className="inline-flex items-center px-6 py-3 border rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md bg-white border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700 min-w-[180px] justify-between"
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
              <span>{subFilterOptions.find(opt => opt.value === selectedSubFilter)?.label || subFilterOptions[0]?.label}</span>
            </div>
            <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${isSubOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isSubOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-2">
                {subFilterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSubFilterChange(option.value)
                      setIsSubOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center ${
                      selectedSubFilter === option.value ? 'bg-green-50 text-green-700' : 'text-gray-700'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

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
  breadcrumbs: { label: string; href: string }[]
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
  slugPath,
  breadcrumbs 
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
    
    // Apply sub-filter for Container products
    if ((selectedFilter === 'aluminum-foil-container-smoothwall' || selectedFilter === 'aluminum-foil-container-wrinklewall') && selectedSubFilter) {
      if (selectedSubFilter === 'rectangular') {
        // Filter for rectangular containers (C series)
        filtered = filtered.filter(product => 
          product.slug.includes('-c') || product.slug.match(/^c\d/) || product.slug.match(/aluminum-foil-container-c\d/)
        )
      } else if (selectedSubFilter === 'round') {
        // Filter for round containers (Y series)
        filtered = filtered.filter(product => 
          product.slug.includes('-y') || product.slug.match(/^y\d/) || product.slug.match(/aluminum-foil-container-y\d/)
        )
      } else if (selectedSubFilter === 'square') {
        // Filter for square containers (F series)
        filtered = filtered.filter(product => 
          product.slug.includes('-f') || product.slug.match(/^f\d/) || product.slug.match(/aluminum-foil-container-f\d/)
        )
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
      const allowed = ['aluminum-foil-container-smoothwall', 'aluminum-foil-container-wrinklewall', 'aluminum-foil-sheets']
      return subcategories.filter(sub => allowed.includes(sub.slug))
    }
    
    if (currentCategorySlug === 'container') {
      const allowed = ['container-smoothwall', 'container-wrinklewall']
      return subcategories.filter(sub => allowed.includes(sub.slug))
    }
    
    return subcategories
  }, [subcategories, currentCategorySlug, locale])

  return (
    <>
      {/* Hero Header with Navigation and Filters */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative">
          <section className="pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Breadcrumbs and Filters */}
               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                 {/* Breadcrumbs */}
                 <div className="flex-shrink-0">
                   <Breadcrumbs items={breadcrumbs} />
                 </div>
                 
                 {/* Filters */}
                 <div className="flex-grow flex justify-end">
                   <FilterDropdown
                     selectedFilter={selectedFilter}
                     selectedSubFilter={selectedSubFilter}
                     allowedSubcategories={allowedSubcategories}
                     locale={locale}
                     onFilterChange={handleFilterChange}
                     onSubFilterChange={handleSubFilterChange}
                   />
                 </div>
               </div>
            </div>
          </section>
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                    <h3 className="text-sm font-medium text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-relaxed">
                      {product.name_i18n?.[locale] || product.slug}
                    </h3>
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