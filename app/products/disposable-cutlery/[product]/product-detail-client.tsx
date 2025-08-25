'use client';

import { useState } from 'react';
import Image from 'next/image';
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
function getImageUrl(images: any, fallback: string = '/product_img/placeholder.webp'): string {
  if (!images) return fallback;
  
  try {
    const parsedImages = typeof images === 'string' ? JSON.parse(images) : images;
    
    if (parsedImages.thumbnail) {
      return parsedImages.thumbnail;
    }
    if (parsedImages.gallery && parsedImages.gallery.length > 0) {
      return parsedImages.gallery[0];
    }
  } catch (error) {
    console.error('Error parsing images:', error);
  }
  
  return fallback;
}

// Helper function to get gallery images
function getGalleryImages(images: any): string[] {
  if (!images) return [];
  
  try {
    const parsedImages = typeof images === 'string' ? JSON.parse(images) : images;
    
    if (parsedImages.gallery && Array.isArray(parsedImages.gallery)) {
      return parsedImages.gallery;
    }
  } catch (error) {
    console.error('Error parsing gallery images:', error);
  }
  
  return [];
}

// Helper function to parse specs
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
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const galleryImages = getGalleryImages(product.images);
  const mainImage = galleryImages.length > 0 ? galleryImages[currentImageIndex] : getImageUrl(product.images);
  const specs = parseSpecs(product.specs);
  const technicalSpecs = parseSpecs(product.technical_specs);
  
  const productName = product.name?.[language] || product.name?.['en'] || 'Product';
  const productDescription = product.description?.[language] || product.description?.['en'] || '';
  const categoryName = product.categories?.name_i18n?.[language] || product.categories?.name_i18n?.['en'] || 'Disposable Cutlery';

  const nextImage = () => {
    if (galleryImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (galleryImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title={productName}
        description={categoryName}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src={mainImage}
                alt={productName}
                fill
                className="object-contain p-4"
                priority
              />
              
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    →
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {galleryImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${productName} ${index + 1}`}
                      width={80}
                      height={80}
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{productName}</h1>
              <p className="text-gray-600 text-sm mb-4">
                SKU: {product.sku}
              </p>
            </div>
            
            {productDescription && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {language === 'en' ? 'Product Description' : 'Descripción del Producto'}
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">{productDescription}</p>
                </div>
              </div>
            )}
            
            {/* Specifications */}
            {Object.keys(specs).length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {language === 'en' ? 'Specifications' : 'Especificaciones'}
                </h2>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(specs).map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-100 last:border-b-0">
                          <td className="py-2 pr-4 font-medium text-gray-700 capitalize">
                            {key.replace(/_/g, ' ')}
                          </td>
                          <td className="py-2 text-gray-600">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
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
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {language === 'en' ? 'Technical Specifications' : 'Especificaciones Técnicas'}
                </h2>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(technicalSpecs).map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-100 last:border-b-0">
                          <td className="py-2 pr-4 font-medium text-gray-700 capitalize">
                            {key.replace(/_/g, ' ')}
                          </td>
                          <td className="py-2 text-gray-600">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Category Information */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                {language === 'en' ? 'Product Category' : 'Categoría del Producto'}
              </h3>
              <p className="text-blue-700">{categoryName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}