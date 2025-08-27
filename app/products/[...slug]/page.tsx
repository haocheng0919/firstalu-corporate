import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/ui/breadcrumbs'
// import { HeroHeader } from '@/components/ui/hero-section-1' // Moved to client component
import ProductImageCarousel from '@/components/ui/product-image-carousel'
import CategoryClient from './category-client'

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

// Helper function to get related products
async function getRelatedProducts(currentProductId: string, subcategoryId?: string, categoryId?: string): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('id, slug, name_i18n, images')
    .neq('id', currentProductId)
    .limit(4);

  // First try to get products from the same subcategory
  if (subcategoryId) {
    const { data: subcategoryProducts } = await query.eq('subcategory_id', subcategoryId);
    if (subcategoryProducts && subcategoryProducts.length > 0) {
      return subcategoryProducts;
    }
  }

  // If no subcategory products, try same category
  if (categoryId) {
    const { data: categoryProducts } = await query.eq('category_id', categoryId);
    if (categoryProducts && categoryProducts.length > 0) {
      return categoryProducts;
    }
  }

  // If still no products, get any random products
  const { data: randomProducts } = await query;
  return randomProducts || [];
}

// Helper function to format product description
function formatProductDescription(description: string): JSX.Element {
  // Split by lines and process each line
  const lines = description.split('\n');
  const elements: JSX.Element[] = [];
  let currentBullets: string[] = [];
  
  const flushBullets = (index: number) => {
    if (currentBullets.length > 0) {
      elements.push(
        <div key={`bullets-section-${index}`} className="mb-6">
          <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
            <div className="space-y-3">
              {currentBullets.map((bullet, idx) => (
                <div key={`bullet-${idx}`} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 leading-relaxed font-medium">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      currentBullets = [];
    }
  };
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) {
      return; // Skip empty lines
    }
    
    // Handle section headers (bold text surrounded by **)
    if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**') && trimmedLine.length > 4) {
      flushBullets(index);
      const headerText = trimmedLine.slice(2, -2);
      elements.push(
        <div key={`header-${index}`} className="mb-4 mt-6 first:mt-0">
          <div className="flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-4"></div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">{headerText}</h3>
          </div>
          <div className="ml-6 mt-2 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
        </div>
      );
    }
    // Handle inline bold text
    else if (trimmedLine.includes('**')) {
      flushBullets(index);
      const parts = trimmedLine.split('**');
      const processedParts: (string | JSX.Element)[] = [];
      
      parts.forEach((part, partIndex) => {
        if (partIndex % 2 === 1 && part.trim()) {
          // This is bold text
          processedParts.push(
            <span key={`bold-${index}-${partIndex}`} className="font-bold text-gray-900 bg-blue-100 px-2 py-1 rounded">
              {part}
            </span>
          );
        } else if (part.trim()) {
          processedParts.push(part);
        }
      });
      
      elements.push(
        <div key={`line-${index}`} className="mb-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400">
          <p className="leading-relaxed text-gray-700 font-medium">
            {processedParts}
          </p>
        </div>
      );
    }
    // Handle bullet points
    else if (trimmedLine.startsWith('- ')) {
      currentBullets.push(trimmedLine.substring(2));
    }
    // Regular paragraph
    else {
      flushBullets(index);
      elements.push(
        <div key={`text-${index}`} className="mb-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <p className="leading-relaxed text-gray-700 font-medium">
            {trimmedLine}
          </p>
        </div>
      );
    }
  });
  
  // Flush any remaining bullets
  flushBullets(lines.length);
  
  return <div className="space-y-2">{elements}</div>;
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
      .select('id, slug, name_i18n, description_i18n, introduction, images, technical_specs, category_id, subcategory_id')
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

      const productImages = getProductImages(directProduct.images);
      
      // Get related products
      const relatedProducts = await getRelatedProducts(
        directProduct.id,
        directProduct.subcategory_id,
        directProduct.category_id
      );

      return (
        <>
          {/* Hero Header with Navigation */}
          <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <div className="relative">
              
              {/* Product Hero Section */}
              <section className="pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <Breadcrumbs items={breadcrumbItems} />
                  <div className="mt-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {directProduct.name_i18n?.[locale] || directProduct.slug}
                    </h1>
                    {directProduct.introduction?.[locale] && (
                      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {directProduct.introduction[locale]}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Product Content */}
          <section className="py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Product Images - Optimized Size */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8">
                    <ProductImageCarousel images={productImages} productName={directProduct.name_i18n?.[locale] || directProduct.slug} />
                  </div>
                </div>

                {/* Product Information */}
                <div className="lg:col-span-2 space-y-6">
                  {directProduct.description_i18n?.[locale] && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Additional Details
                      </h2>
                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                        {formatProductDescription(directProduct.description_i18n[locale])}
                      </div>
                    </div>
                  )}

                  {directProduct.technical_specs && Object.keys(directProduct.technical_specs).length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Technical Specifications
                      </h3>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                        <div className="grid gap-3">
                          {Object.entries(directProduct.technical_specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center py-3 px-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                              <span className="font-semibold text-gray-700 capitalize">{key.replace(/_/g, ' ')}:</span>
                              <span className="text-gray-900 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/products"
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Products
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Products</h2>
                  <p className="text-lg text-gray-600">Discover more products you might be interested in</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((product) => {
                    const productImages = getProductImages(product.images);
                    const productImage = productImages[0] || '/placeholder-product.jpg';
                    
                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <div className="aspect-square relative overflow-hidden bg-gray-100">
                          <Image
                            src={productImage}
                            alt={product.name_i18n?.[locale] || product.slug}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                            {product.name_i18n?.[locale] || product.slug}
                          </h3>
                          <div className="mt-2 flex items-center text-sm text-blue-600 font-medium">
                            <span>View Details</span>
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

        </>
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
      .order('slug')

    const subcategories = subcategoriesResult.data || []
    
    // For container category, only get products from direct subcategories
    // For other categories, get products from the category and all nested subcategories
    let allCategoryIds: string[]
    
    if (currentCategory.slug === 'container') {
      // Only get direct subcategories for container
      const directSubcategoryIds = subcategories.map(sub => sub.id)
      allCategoryIds = directSubcategoryIds
    } else {
      // Recursively get all descendant category IDs for other categories
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
      
      allCategoryIds = await getAllDescendantIds(currentCategory.id)
    }
    
    // Get products from the determined category IDs
    const productsResult = await supabase
      .from('products')
      .select('id, slug, name_i18n, images, description_i18n, category_id')
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
      <>
        {/* Category Client Component with Filtering */}
        <CategoryClient 
          products={products}
          subcategories={subcategories}
          currentCategorySlug={currentCategory.slug}
          locale={locale}
          slugPath={slugPath}
          breadcrumbs={categoryBreadcrumbs}
        />


      </>
    )

  } catch (error) {
    console.error('Error loading product page:', error)
    return notFound()
  }
}