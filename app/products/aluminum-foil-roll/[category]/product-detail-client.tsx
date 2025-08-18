'use client'

import { PageHeader } from '@/components/ui/page-header';
import Link from 'next/link';
import { useState } from 'react';
import { type AdaptedProduct } from '@/lib/supabase-service-adapted';
import { useLanguage } from '@/lib/language-context';

interface ProductDetailClientProps {
  product: AdaptedProduct & {
    serverDetectedImages: string[];
    relatedProducts?: AdaptedProduct[];
  };
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { language: currentLanguage, t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Get product images
  const getProductImages = () => {
    if (product.images) {
      const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      if (images.gallery && Array.isArray(images.gallery)) {
        return images.gallery.filter((img: string) => img && !img.includes('placeholder.webp'));
      }
      if (images.main && !images.main.includes('placeholder.webp')) {
        return [images.main];
      }
    }
    
    // Fallback to category-specific default images
    if (product.category_slug === 'aluminum-foil-roll') {
      return ['/Aluminum-Foil-Roll/Aluminum-Foil-Roll/aluminum-foil-roll-1.jpg'];
    } else if (product.category_slug === 'hairdressing-foil-roll') {
      return ['/Aluminum-Foil-Roll/Hairdressing-Foil-Roll/hairdressing-foil-roll-1.jpg'];
    } else if (product.category_slug === 'pop-up-foil-sheets') {
      return ['/Aluminum-Foil-Roll/Pop-up-Foil-Sheets/pop-up-foil-sheets-1.jpg'];
    }
    
    return [];
  };

  const availableImages = getProductImages();
  const selectedImage = availableImages[selectedImageIndex] || availableImages[0];

  // Get product name in current language
  const getProductName = () => {
    if (currentLanguage === 'en') {
      return product.name || product.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    } else {
      const nameKey = `name_${currentLanguage}` as keyof AdaptedProduct;
      return (product[nameKey] as string) || product.name || product.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  // Get product description in current language
  const getProductDescription = () => {
    if (currentLanguage === 'en') {
      return product.description || '';
    } else {
      const descKey = `description_${currentLanguage}` as keyof AdaptedProduct;
      return (product[descKey] as string) || product.description || '';
    }
  };

  // Get product specifications
  const getProductSpecs = () => {
    if (product.specs && typeof product.specs === 'object') {
      return product.specs[currentLanguage] || product.specs['en'] || product.specs;
    }
    return null;
  };

  // Get technical specifications
  const getTechnicalSpecs = () => {
    if (product.technical_specs && typeof product.technical_specs === 'object') {
      return product.technical_specs[currentLanguage] || product.technical_specs['en'] || product.technical_specs;
    }
    return null;
  };

  const productName = getProductName();
  const productDescription = getProductDescription();
  const specs = getProductSpecs();
  const technicalSpecs = getTechnicalSpecs();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title={productName}
        description={productDescription || `High-quality aluminum foil roll product - ${productName}`}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 text-sm">
          <Link href="/products" className="text-blue-600 hover:text-blue-800">
            {t('products')}
          </Link>
          <span className="mx-2 text-gray-500">›</span>
          <Link href="/products/aluminum-foil-roll" className="text-blue-600 hover:text-blue-800">
            Aluminum Foil Roll
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
                  target.style.display = 'none';
                }}
              />
            </div>
            
            {/* Thumbnail Images */}
            {availableImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {availableImages.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${productName} ${index + 1}`}
                      className="w-full h-full object-contain p-1 bg-white"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              {productDescription && (
                <p className="text-lg text-gray-600 leading-relaxed">{productDescription}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">SKU: {product.sku}</p>
            </div>

            {/* Specifications */}
            {specs && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('specifications')}</h3>
                {specs.sizes && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-800">{t('availableSizes')}</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            {specs.sizes[0].size && <th className="border border-gray-300 px-4 py-2 text-left">{t('size')}</th>}
                            {specs.sizes[0].length && <th className="border border-gray-300 px-4 py-2 text-left">{t('length')}</th>}
                            {specs.sizes[0].width && <th className="border border-gray-300 px-4 py-2 text-left">{t('width')}</th>}
                            {specs.sizes[0].thickness && <th className="border border-gray-300 px-4 py-2 text-left">{t('thickness')}</th>}
                            {specs.sizes[0].quantity && <th className="border border-gray-300 px-4 py-2 text-left">{t('quantity')}</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {specs.sizes.map((size: any, index: number) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              {size.size && <td className="border border-gray-300 px-4 py-2">{size.size}</td>}
                              {size.length && <td className="border border-gray-300 px-4 py-2">{size.length}</td>}
                              {size.width && <td className="border border-gray-300 px-4 py-2">{size.width}</td>}
                              {size.thickness && <td className="border border-gray-300 px-4 py-2">{size.thickness}</td>}
                              {size.quantity && <td className="border border-gray-300 px-4 py-2">{size.quantity}</td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Technical Specifications */}
            {technicalSpecs && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('technicalSpecifications')}</h3>
                <div className="space-y-3">
                  {technicalSpecs.material && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">{t('material')}:</span>
                      <span className="text-gray-600">{technicalSpecs.material}</span>
                    </div>
                  )}
                  {technicalSpecs.application && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">{t('application')}:</span>
                      <span className="text-gray-600">{technicalSpecs.application}</span>
                    </div>
                  )}
                  {technicalSpecs.features && (
                    <div>
                      <span className="font-medium text-gray-700">{t('features')}:</span>
                      <ul className="mt-2 space-y-1">
                        {technicalSpecs.features.map((feature: string, index: number) => (
                          <li key={index} className="text-gray-600 ml-4">• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Get a Quote Section */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('getQuote')}</h3>
              <p className="text-gray-600 mb-4">
                {t('interestedInProduct')} {t('contactUsForPricing')}
              </p>
              <Link
                href="/contact"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {t('requestQuote')}
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('relatedProducts')}</h2>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {product.relatedProducts.map((relatedProduct) => {
                  const relatedImages = relatedProduct.images ? 
                    (typeof relatedProduct.images === 'string' ? JSON.parse(relatedProduct.images) : relatedProduct.images) : 
                    null;
                  const relatedImageUrl = relatedImages?.main || relatedImages?.gallery?.[0] || '/product_img/placeholder.webp';
                  const relatedName = currentLanguage === 'en' ? 
                    (relatedProduct.name || relatedProduct.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())) :
                    ((relatedProduct[`name_${currentLanguage}` as keyof AdaptedProduct] as string) || relatedProduct.name || relatedProduct.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
                  
                  return (
                    <Link
                      key={relatedProduct.id}
                      href={`/products/aluminum-foil-roll/${relatedProduct.slug}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
                    >
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        <img
                          src={relatedImageUrl}
                          alt={relatedName}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/product_img/placeholder.webp';
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-1">{relatedName}</h3>
                        <p className="text-sm text-gray-600 mb-2">SKU: {relatedProduct.sku}</p>
                        <p className="text-sm text-blue-600 hover:text-blue-800">View Details →</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="text-center">
                <Link
                  href={`/products/aluminum-foil-roll`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All Aluminum Foil Roll Products →
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}