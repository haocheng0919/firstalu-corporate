'use client'

import { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../../../components/Footer';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { type AdaptedProduct } from '@/lib/supabase-service-adapted';

interface ProductDetailClientProps {
  product: AdaptedProduct;
}

// Helper function to get image URL from database product
function getDbProductImageUrl(product: AdaptedProduct): string {
  if (product.images) {
    const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
    if (images.thumbnail) return images.thumbnail;
    if (images.additional && Array.isArray(images.additional) && images.additional.length > 0) {
      return images.additional[0];
    }
  }
  return '/product_img/Silicone-Baking-Paper/silicone-baking-paper.webp';
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Get available images
  const availableImages = [getDbProductImageUrl(product)];
  const selectedImage = availableImages[selectedImageIndex] || getDbProductImageUrl(product);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title={product.name || product.sku || 'Product Details'}
        description={`Kitchen & Baking Papers - SKU: ${product.sku}`}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 text-sm">
          <Link href="/products" className="text-blue-600 hover:text-blue-800">
            Products
          </Link>
          <span className="mx-2 text-gray-500">›</span>
          <Link href="/products/kitchen-baking-papers" className="text-blue-600 hover:text-blue-800">
            Kitchen & Baking Papers
          </Link>
          <span className="mx-2 text-gray-500">›</span>
          <span className="text-gray-700">{product.name || product.sku}</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={selectedImage}
                  alt={product.name || product.sku || 'Product'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/product_img/Silicone-Baking-Paper/silicone-baking-paper.webp';
                  }}
                />
              </div>
              
              {/* Thumbnail images if multiple available */}
              {availableImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {availableImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={image}
                        alt={`${product.name || product.sku} view ${index + 1}`}
                        className="w-full h-full object-cover"
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
                  {product.name || product.sku}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  SKU: {product.sku}
                </p>
                {product.description && (
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                )}
                {product.intro && (
                  <p className="text-gray-600 mt-4">
                    {product.intro}
                  </p>
                )}
              </div>

              {/* Technical Specifications */}
              {product.technical_specs && (
                <div className="border-t pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Technical Specifications
                  </h3>
                  <div className="space-y-2">
                    {(() => {
                      // Get current locale from URL or default to 'en'
                      const currentLocale = typeof window !== 'undefined' ? 
                        (window.location.pathname.includes('/de/') ? 'de' : 
                         window.location.pathname.includes('/es/') ? 'es' : 
                         window.location.pathname.includes('/fr/') ? 'fr' : 'en') : 'en';
                      const specs = product.technical_specs;
                      
                      // If technical_specs has locale-specific data
                      if (typeof specs === 'object' && specs[currentLocale]) {
                        const localeSpecs = specs[currentLocale];
                        
                        // Handle string format (size chart)
                        if (typeof localeSpecs === 'string') {
                          // Parse the size chart format
                          const lines = localeSpecs.split('\n');
                          const title = lines[0]; // e.g., "Size Chart:"
                          const headers = lines[1]?.split('\t') || [];
                          const rows = lines.slice(2).filter((line: string) => line.trim());
                          
                          return (
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3">{title}</h4>
                              <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-200">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      {headers.map((header: string, index: number) => (
                                        <th key={index} className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                                          {header}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {rows.map((row: string, index: number) => {
                                      const cells = row.split('\t');
                                      return (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                          {cells.map((cell: string, cellIndex: number) => (
                                            <td key={cellIndex} className="px-4 py-2 text-sm text-gray-600 border-b">
                                              {cell}
                                            </td>
                                          ))}
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          );
                        }
                        
                        // Handle object format (specifications)
                        if (typeof localeSpecs === 'object' && localeSpecs.specifications) {
                          return (
                            <div>
                              {localeSpecs.name && (
                                <h4 className="font-semibold text-gray-800 mb-3">{localeSpecs.name}</h4>
                              )}
                              {localeSpecs.description && (
                                <p className="text-gray-600 mb-4">{localeSpecs.description}</p>
                              )}
                              <div className="space-y-2">
                                {Object.entries(localeSpecs.specifications).map(([key, value]) => (
                                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="font-medium text-gray-700">
                                      {key}
                                    </span>
                                    <span className="text-gray-600">
                                      {String(value)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }
                      }
                      
                      // Fallback for other formats
                      return Object.entries(specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-700 capitalize">
                            {key.replace(/_/g, ' ')}
                          </span>
                          <span className="text-gray-600">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ));
                    })()} 
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-6">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Category */}
        <div className="mt-8">
          <Link 
            href="/products/kitchen-baking-papers"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Kitchen & Baking Papers
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}