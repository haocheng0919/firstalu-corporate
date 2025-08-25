'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { PageHeader } from '@/components/ui/page-header';

interface Product {
  id: string;
  slug: string;
  sku: string;
  name: Record<string, string>;
  description: Record<string, string>;
  images: any;
  specs: any;
  technical_specs: any;
  categories: {
    slug: string;
    name_i18n: Record<string, string>;
  } | null;
}

interface ProductDetailClientProps {
  product: Product;
}

// Helper function to get image URL
function getImageUrl(product: Product): string {
  if (product.images) {
    try {
      const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      
      if (images.thumbnail) {
        return images.thumbnail;
      }
      if (images.gallery && images.gallery.length > 0) {
        return images.gallery[0];
      }
    } catch (error) {
      console.error('Error parsing product images:', error);
    }
  }
  
  return '/product_img/placeholder.webp';
}

// Helper function to get gallery images
function getGalleryImages(product: Product): string[] {
  if (product.images) {
    try {
      const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      
      if (images.gallery && Array.isArray(images.gallery)) {
        return images.gallery;
      }
    } catch (error) {
      console.error('Error parsing gallery images:', error);
    }
  }
  
  return [getImageUrl(product)];
}

// Helper function to parse specifications
function parseSpecs(specs: any): Record<string, any> {
  if (!specs) return {};
  
  try {
    return typeof specs === 'string' ? JSON.parse(specs) : specs;
  } catch (error) {
    console.error('Error parsing specs:', error);
    return {};
  }
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { language, t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const galleryImages = getGalleryImages(product);
  const selectedImage = galleryImages[selectedImageIndex] || getImageUrl(product);
  
  const productName = product.name[language] || product.name['en'] || product.slug;
  const productDescription = product.description[language] || product.description['en'] || '';
  const specs = parseSpecs(product.specs);
  const technicalSpecs = parseSpecs(product.technical_specs);
  const categoryName = product.categories?.name_i18n[language] || product.categories?.name_i18n['en'] || 'Baking Paper';

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title={productName}
        description={productDescription || `High-quality baking paper product - ${productName}`}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 text-sm">
          <Link href="/products" className="text-blue-600 hover:text-blue-800">
            {t('products')}
          </Link>
          <span className="mx-2 text-gray-500">›</span>
          <Link href="/products/baking-paper" className="text-blue-600 hover:text-blue-800">
            {categoryName}
          </Link>
          <span className="mx-2 text-gray-500">›</span>
          <span className="text-gray-700">{productName}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={selectedImage}
                alt={productName}
                className="w-full h-full object-contain p-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/product_img/placeholder.webp';
                }}
              />
            </div>
            
            {/* Image Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${productName} ${index + 1}`}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/product_img/placeholder.webp';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
            
            {/* Navigation Arrows */}
            {galleryImages.length > 1 && (
              <div className="flex justify-between">
                <button
                  onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : galleryImages.length - 1)}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
                >
                  ←
                </button>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev < galleryImages.length - 1 ? prev + 1 : 0)}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{productName}</h1>
              <p className="text-lg text-gray-600 mb-2">SKU: {product.sku}</p>
              <p className="text-lg text-gray-600 mb-4">Category: {categoryName}</p>
              
              {productDescription && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{productDescription}</p>
                </div>
              )}
            </div>

            {/* Specifications */}
            {Object.keys(specs).length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(specs).map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-100 last:border-b-0">
                          <td className="py-3 pr-4 font-medium text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </td>
                          <td className="py-3 text-gray-600">
                            {Array.isArray(value) ? value.join(', ') : String(value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            {Object.keys(technicalSpecs).length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(technicalSpecs).map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-100 last:border-b-0">
                          <td className="py-3 pr-4 font-medium text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </td>
                          <td className="py-3 text-gray-600">
                            {Array.isArray(value) ? value.join(', ') : String(value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interested in this product?</h3>
              <p className="text-gray-600 mb-4">Contact us for pricing and availability.</p>
              <Link
                href="/contact"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}