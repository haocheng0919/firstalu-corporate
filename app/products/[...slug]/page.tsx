import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
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
  sku?: string
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

// Helper function to get first image
function getFirstImage(images: any): string | null {
  const imageList = getProductImages(images);
  return imageList.length > 0 ? imageList[0] : null;
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
      .select('id, slug, sku, name_i18n, description_i18n, introduction, images, technical_specs')
      .eq('slug', finalSlug)
      .single()

    if (!directProductError && directProduct) {
      // Generate breadcrumbs based on slug path
      const breadcrumbItems = [
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

      // Render product detail page
      return (
        <div className="min-h-screen bg-gray-50">
          {/* Header with gradient background */}
          <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative container mx-auto px-4">
              <Breadcrumbs items={breadcrumbItems} />
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {directProduct.name_i18n?.[locale] || directProduct.slug}
                </h1>
                {directProduct.introduction?.[locale] && (
                  <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                    {directProduct.introduction[locale]}
                  </p>
                )}
              </div>
            </div>
          </section>

          <main className="container mx-auto px-4 -mt-8 relative z-10">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              {/* Product Images */}
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-gray-50 p-8">
                  <div className="space-y-4">
                    {(() => {
                      const imagesToShow = getProductImages(directProduct.images);

                      return imagesToShow.length > 0 ? (
                        imagesToShow.map((img: string, index: number) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                            <Image
                              src={img}
                              alt={`${directProduct.name_i18n?.[locale] || directProduct.slug} - Image ${index + 1}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                          </div>
                        ))
                      ) : (
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="text-gray-500 font-medium">No image available</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Product Information */}
                <div className="p-8 lg:p-12">
                  <div className="space-y-8">
                    {directProduct.description_i18n?.[locale] && (
                      <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
                        <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
                          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                            {directProduct.description_i18n[locale]}
                          </div>
                        </div>
                      </div>
                    )}

                    {directProduct.technical_specs && Object.keys(directProduct.technical_specs).length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Specifications</h3>
                        <div className="grid gap-3">
                          {Object.entries(directProduct.technical_specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                              <span className="font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}:</span>
                              <span className="text-gray-900 font-semibold">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                      <Link
                        href="/products"
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Products
                      </Link>
                      <Link
                        href={`#contact`}
                        className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200"
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
          </main>

          <Footer />
        </div>
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
    categoryBreadcrumbs.push({ label: currentCategory.name_i18n?.[locale] || currentCategory.slug });

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
                          const imageToShow = getFirstImage(product.images);

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