'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

interface Product {
  id: string;
  slug: string;
  sku?: string;
  name?: string;
  name_es?: string;
  name_de?: string;
  name_fr?: string;
  description?: string;
  description_es?: string;
  description_de?: string;
  description_fr?: string;
  intro?: string;
  intro_es?: string;
  intro_de?: string;
  intro_fr?: string;
  images?: any;
  specs?: any;
  technical_specs?: any;
  categories?: {
    id: string;
    slug: string;
    name?: string;
    name_es?: string;
    name_de?: string;
    name_fr?: string;
  };
}

interface ProductDetailClientProps {
  product: Product;
}

// Helper function to get image URL
function getImageUrl(product: Product): string {
  if (product.images) {
    const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
    if (images.thumbnail) return images.thumbnail;
    if (images.gallery && Array.isArray(images.gallery) && images.gallery.length > 0) {
      return images.gallery[0];
    }
  }
  return '/product_img/placeholder.svg';
}

// Helper function to get gallery images
function getGalleryImages(product: Product): string[] {
  if (product.images) {
    const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
    if (images.gallery && Array.isArray(images.gallery)) {
      return images.gallery;
    }
    if (images.thumbnail) {
      return [images.thumbnail];
    }
  }
  return ['/product_img/placeholder.svg'];
}

// Helper function to parse specs
function parseSpecs(specs: any): Record<string, string> {
  if (!specs) return {};
  if (typeof specs === 'string') {
    try {
      return JSON.parse(specs);
    } catch {
      return {};
    }
  }
  return specs;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryImages = getGalleryImages(product);
  const specs = parseSpecs(product.specs || product.technical_specs);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title={product.name || product.slug}
        description="Sugarcane Clamshells"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src={galleryImages[currentImageIndex]}
                alt={product.name || product.slug}
                fill
                className="object-contain p-4"
                priority
              />
              
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Navigation */}
            {galleryImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name || product.slug} ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-contain w-full h-full p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name || product.slug}
              </h1>
              {product.sku && (
                <p className="text-sm text-gray-500 mb-4">SKU: {product.sku}</p>
              )}
            </div>

            {/* Description */}
            {(product.description || product.intro) && (
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description || product.intro}
                </p>
              </div>
            )}

            {/* Product Features */}
            {specs.features && Array.isArray(specs.features) && specs.features.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {specs.features.map((feature, index) => (
                    <div key={index} className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 leading-relaxed group-hover:text-gray-900 transition-colors">
                            {feature}
                          </p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/0 via-emerald-50/20 to-emerald-50/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Specifications */}
            {Object.keys(specs).filter(key => key !== 'features').length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <dl className="divide-y divide-gray-200">
                    {Object.entries(specs).filter(([key]) => key !== 'features').map(([key, value]) => (
                      <div key={key} className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500 capitalize">
                          {key.replace(/_/g, ' ')}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {/* Category Information */}
            {product.categories && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-1">Category</h3>
                <p className="text-blue-700">
                  {product.categories.name || product.categories.slug}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}