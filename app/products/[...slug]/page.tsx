'use client';

import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'

type Props = {
  params: { slug: string[] }
}

interface Product {
  id: string
  slug: string
  name_i18n?: { [key: string]: string }
  description_i18n?: { [key: string]: string }
  introduction?: { [key: string]: string }
  images?: string[] | { gallery?: string[]; thumbnail?: string }
  technical_specs?: any
}

interface Category {
  id: string
  slug: string
  name_i18n?: { [key: string]: string }
  parent_id?: string
}

// Helper function to extract images
function getProductImages(images: any): string[] {
  if (!images) return [];
  
  if (Array.isArray(images)) {
    return images;
  }
  
  if (typeof images === 'object') {
    if (images.gallery && Array.isArray(images.gallery)) {
      return images.gallery;
    }
    if (images.thumbnail) {
      return [images.thumbnail];
    }
  }
  
  return [];
}

// Image Carousel Component
function ImageCarousel({ images }: { images: string[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center border border-gray-300">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-gray-500 font-medium text-lg">No image available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="aspect-square relative overflow-hidden rounded-2xl shadow-lg">
        <Image
          src={images[currentImageIndex]}
          alt={`Product image ${currentImageIndex + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {images.length > 1 && (
        <>
          {/* Navigation buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Client component wrapper
function ProductPageContent({ directProduct, breadcrumbItems, slugPath, locale }: {
  directProduct: Product;
  breadcrumbItems: { label: string; href?: string }[];
  slugPath: string[];
  locale: string;
}) {
  const productImages = getProductImages(directProduct.images);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mt-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {directProduct.name_i18n?.[locale] || directProduct.slug}
            </h1>
            {directProduct.introduction?.[locale] && (
              <p className="text-lg text-gray-600 max-w-2xl">
                {directProduct.introduction[locale]}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Product Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <ImageCarousel images={productImages} />
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              {directProduct.description_i18n?.[locale] && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Technical Specifications
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
                      {directProduct.description_i18n[locale]}
                    </div>
                  </div>
                </div>
              )}

              {directProduct.technical_specs && Object.keys(directProduct.technical_specs).length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Additional Details
                  </h3>
                  <div className="grid gap-4">
                    {Object.entries(directProduct.technical_specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                        <span className="font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}:</span>
                        <span className="text-gray-900 font-semibold bg-white px-3 py-1 rounded-lg shadow-sm">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Products
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-medium rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default async function DynamicProductPage({ params }: Props) {
  const locale = 'en'
  const slugPath = params.slug || []
  
  if (slugPath.length === 0) {
    return notFound()
  }

  try {
    // Try to find the final slug as a product first
    const finalSlug = slugPath[slugPath.length - 1]
    
    // Check if this is a direct product slug
    const { data: directProduct, error: directProductError } = await supabase
      .from('products')
      .select('id, slug, name_i18n, description_i18n, introduction, images, technical_specs')
      .eq('slug', finalSlug)
      .single()

    if (!directProductError && directProduct) {
      // Generate breadcrumbs based on slug path
      const breadcrumbItems: { label: string; href?: string }[] = [
        { label: 'Products', href: '/products' }
      ];

      // Add category breadcrumb if we can determine it
      if (slugPath.length > 1) {
        const categorySlug = slugPath[0];
        const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        breadcrumbItems.push({ label: categoryName, href: `/products/${categorySlug}` });
      }

      // Add current product (no href as it's the current page)
      breadcrumbItems.push({
        label: directProduct.name_i18n?.[locale] || directProduct.slug
      });

      return (
        <ProductPageContent
          directProduct={directProduct}
          breadcrumbItems={breadcrumbItems}
          slugPath={slugPath}
          locale={locale}
        />
      )
    }

    // If not a direct product, try to resolve as category path
    let currentCategory: Category | null = null
    let parentId: string | null = null

    for (const slug of slugPath) {
      let query = supabase
        .from('categories')
        .select('id, slug, name_i18n, parent_id')
        .eq('slug', slug)

      if (parentId === null) {
        query = query.is('parent_id', null)
      } else {
        query = query.eq('parent_id', parentId)
      }

      const { data, error } = await query.single()

      if (error || !data) {
        return notFound()
      }

      currentCategory = data
      parentId = data.id
    }

    if (!currentCategory) {
      return notFound()
    }

    // Get subcategories for this category
    const subcategoriesResult = await supabase
        .from('categories')
        .select('id, slug, name_i18n')
      .eq('parent_id', currentCategory.id)

    const subcategories = subcategoriesResult.data || []
    
    // Recursively get all descendant category IDs
    const getAllDescendantIds = async (categoryId: string): Promise<string[]> => {
      const { data: children } = await supabase
        .from('categories')
        .select('id')
        .eq('parent_id', categoryId)
      
      if (!children || children.length === 0) {
        return [categoryId]
      }
      
      const allIds = [categoryId]
      for (const child of children) {
        const descendantIds = await getAllDescendantIds(child.id)
        allIds.push(...descendantIds)
      }
      return allIds
    }
    
    // Get all category IDs including nested subcategories
    const allCategoryIds = await getAllDescendantIds(currentCategory.id)
    
    // Get products from this category and all nested subcategories
    const productsResult = await supabase
      .from('products')
      .select('id, slug, name_i18n, images, description_i18n')
      .in('category_id', allCategoryIds)

    const products = productsResult.data || []

    // Generate breadcrumbs for category page
    const categoryBreadcrumbs = [
      { label: 'Products', href: '/products' }
    ];

    // Add parent categories if any
    if (slugPath.length > 1) {
      for (let i = 0; i < slugPath.length - 1; i++) {
        const path = slugPath.slice(0, i + 1).join('/');
        const label = slugPath[i].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        categoryBreadcrumbs.push({ label, href: `/products/${path}` });
      }
    }

    // Add current category
    categoryBreadcrumbs.push({ 
      label: currentCategory.name_i18n?.[locale] || currentCategory.slug,
      href: `/products/${slugPath.join('/')}`
    });

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with gradient background */}
        <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative container mx-auto px-4">
            <Breadcrumbs items={categoryBreadcrumbs} />
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {currentCategory.name_i18n?.[locale] || currentCategory.slug}
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                Browse our premium {currentCategory.name_i18n?.[locale] || currentCategory.slug} collection
              </p>
            </div>
          </div>
        </section>

        <main className="container mx-auto px-4 -mt-8 relative z-10">
          {/* Subcategories */}
          {subcategories.length > 0 && (
            <section className="mb-12">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Categories</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/products/${slugPath.join('/')}/${sub.slug}`}
                      className="group bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
                  >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {sub.name_i18n?.[locale] || sub.slug}
                    </h3>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Explore products →</p>
                  </Link>
                ))}
                </div>
              </div>
            </section>
          )}

          {/* Products */}
          {products.length > 0 && (
            <section>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Products</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${slugPath.join('/')}/${product.slug}`}
                      className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-200"
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
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <span className="text-xs text-gray-500">No image</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name_i18n?.[locale] || product.slug}
                      </h3>
                      {product.description_i18n?.[locale] && (
                          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                            {product.description_i18n[locale].split('\n')[0]} {/* Show only first line */}
                        </p>
                      )}
                        <div className="mt-3 text-blue-600 text-sm font-medium group-hover:text-blue-700">
                          View Details →
                        </div>
                    </div>
                  </Link>
                ))}
                </div>
              </div>
            </section>
          )}

          {subcategories.length === 0 && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products or categories found in this section.</p>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    )

  } catch (error) {
    console.error('Error loading product page:', error)
    return notFound()
  }
}