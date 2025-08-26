import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import Footer from '@/components/Footer'

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
      // Render product detail page
      return (
        <div className="min-h-screen bg-gray-50">
          <PageHeader 
            title={directProduct.name_i18n?.[locale] || directProduct.slug}
            description={directProduct.introduction?.[locale] || directProduct.description_i18n?.[locale] || ''}
          />
          
          <main className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Product Images */}
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="space-y-4">
                  {(() => {
                    const imagesToShow = getProductImages(directProduct.images);
                    
                    return imagesToShow.length > 0 ? (
                      imagesToShow.map((img: string, index: number) => (
                        <div key={index} className="relative aspect-square">
                          <Image 
                            src={img} 
                            alt={`${directProduct.name_i18n?.[locale] || directProduct.slug} - Image ${index + 1}`}
                            fill
                            className="object-cover rounded-lg"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">No image available</span>
                      </div>
                    );
                  })()}
                </div>

                {/* Product Information */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {directProduct.name_i18n?.[locale] || directProduct.slug}
                    </h1>
                    {directProduct.sku && (
                      <p className="text-gray-600">SKU: {directProduct.sku}</p>
                    )}
                  </div>

                  {directProduct.introduction?.[locale] && (
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Introduction</h3>
                      <p className="text-gray-700">{directProduct.introduction[locale]}</p>
                    </div>
                  )}

                  {directProduct.description_i18n?.[locale] && (
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Description</h3>
                      <p className="text-gray-700">{directProduct.description_i18n[locale]}</p>
                    </div>
                  )}

                  {directProduct.technical_specs && (
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Technical Specifications</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        {Object.entries(directProduct.technical_specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-1">
                            <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span>
                            <span>{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
    
    // Get all subcategory IDs to include their products
    const subcategoryIds = subcategories.map(sub => sub.id)
    const allCategoryIds = [currentCategory.id, ...subcategoryIds]
    
    // Get products from this category and all subcategories
    const productsResult = await supabase
      .from('products')
      .select('id, slug, name_i18n, images, description_i18n')
      .in('category_id', allCategoryIds)

    const products = productsResult.data || []

    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title={currentCategory.name_i18n?.[locale] || currentCategory.slug}
          description={`Browse our ${currentCategory.name_i18n?.[locale] || currentCategory.slug} products`}
        />
        
        <main className="container mx-auto px-4 py-12">
          {/* Subcategories */}
          {subcategories.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Categories</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/products/${slugPath.join('/')}/${sub.slug}`}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {sub.name_i18n?.[locale] || sub.slug}
                    </h3>
                    <span className="text-blue-600 hover:text-blue-800 text-sm">
                      View Products →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Products */}
          {products.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Products</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${slugPath.join('/')}/${product.slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square relative">
                      {(() => {
                        const imageToShow = getFirstImage(product.images);
                        
                        return imageToShow ? (
                          <Image
                            src={imageToShow}
                            alt={product.name_i18n?.[locale] || product.slug}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No image</span>
                          </div>
                        );
                      })()}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {product.name_i18n?.[locale] || product.slug}
                      </h3>
                      {product.description_i18n?.[locale] && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {product.description_i18n[locale]}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
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