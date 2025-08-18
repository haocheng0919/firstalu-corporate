'use client'

import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../../../../components/Footer';
import Link from 'next/link';
import { useState } from 'react';
import { type ProductImage } from '@/utils/product-images';
import { type ProductSpecification } from '@/utils/aluminum-product-specs';
import { useLanguage } from '@/lib/language-context';

interface ProductDetailClientProps {
  product: ProductImage;
  category: 'smoothwall' | 'wrinklewall';
  serverDetectedImages: string[];
  specifications?: ProductSpecification;
  relatedProducts?: ProductImage[];
}

export default function ProductDetailClient({ product, category, serverDetectedImages, specifications, relatedProducts }: ProductDetailClientProps) {
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Use server-detected images directly (no client-side detection needed)
  const availableImages = serverDetectedImages.length > 0 ? serverDetectedImages : [product.path];
  const loading = false; // No loading since we have server-side data

  const selectedImage = availableImages[selectedImageIndex] || product.path;

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title={product.name}
        description={`${product.category.charAt(0).toUpperCase() + product.category.slice(1)} ${product.shape} aluminum foil container - Code: ${product.code}`}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 text-sm">
          <Link href="/products" className="text-blue-600 hover:text-blue-800">
            Products
          </Link>
          <span className="mx-2 text-gray-500">›</span>
          <Link href="/products/aluminum-foil-containers" className="text-blue-600 hover:text-blue-800">
            Aluminum Foil Containers
          </Link>
          <span className="mx-2 text-gray-500">›</span>
          <Link 
            href={`/products/aluminum-foil-containers?category=${category}`} 
            className="text-blue-600 hover:text-blue-800 capitalize"
          >
            {category} Containers
          </Link>
          <span className="mx-2 text-gray-500">›</span>
          <span className="text-gray-700">{product.code}</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="mb-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <img
                      src={selectedImage}
                      alt={`${product.name} - View ${selectedImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </div>
              
              {/* Image Thumbnails */}
              {!loading && availableImages.length > 1 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Product Images ({availableImages.length} available)
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {availableImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImageIndex === index 
                            ? 'border-blue-600' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} - View ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Product Information */}
            <div>
              {/* Product Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Product Description</h2>
                <div className="prose text-gray-700">
                  {specifications ? (
                    <>
                      <p>{specifications.description}</p>
                      {specifications.additionalInfo && (
                        <p className="mt-2 text-gray-600 italic">{specifications.additionalInfo}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <p>
                        High-quality {product.category} aluminum foil container in {product.shape} shape. 
                        Perfect for food packaging, takeaway services, and catering applications.
                      </p>
                      <p>
                        This {product.code} model offers excellent heat conductivity, moisture resistance, 
                        and is fully recyclable, making it an eco-friendly choice for your packaging needs.
                      </p>
                      {product.category === 'smoothwall' && (
                        <p>
                          <strong>Smoothwall design</strong> provides a clean, modern appearance with easy stacking 
                          and efficient storage capabilities.
                        </p>
                      )}
                      {product.category === 'wrinklewall' && (
                        <p>
                          <strong>Wrinklewall design</strong> offers enhanced structural strength and improved 
                          grip for handling, ideal for heavy-duty applications.
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>



              {/* Technical Specifications */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Technical Specifications</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Product Code:</span>
                      <span className="ml-2 text-gray-900">{product.code}</span>
                    </div>
                    {specifications && (
                      <>
                        <div>
                          <span className="font-medium text-gray-600">Pieces per Carton:</span>
                          <span className="ml-2 text-gray-900">{specifications.pcsPerCarton}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Top Dimensions:</span>
                          <span className="ml-2 text-gray-900">{specifications.top}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Bottom Dimensions:</span>
                          <span className="ml-2 text-gray-900">{specifications.bottom}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Height:</span>
                          <span className="ml-2 text-gray-900">{specifications.height}</span>
                        </div>
                        {specifications.volume && (
                          <div>
                            <span className="font-medium text-gray-600">Volume:</span>
                            <span className="ml-2 text-gray-900">{specifications.volume}</span>
                          </div>
                        )}
                      </>
                    )}
                    <div>
                      <span className="font-medium text-gray-600">Material:</span>
                      <span className="ml-2 text-gray-900">Food-grade aluminum</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Shape:</span>
                      <span className="ml-2 text-gray-900 capitalize">{product.shape}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Wall Type:</span>
                      <span className="ml-2 text-gray-900 capitalize">{product.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact for Quote */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Get a Quote</h3>
                <p className="text-gray-700 mb-4">
                  Interested in this product? Contact us for bulk pricing, custom sizes, and OEM requirements.
                </p>
                <div className="space-y-2">
                  <Link
                    href="/contact"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Request Quote for {product.code}
                  </Link>
                  <div className="text-sm text-gray-600">
                    <p>📧 Email: info@firstaluminum.com</p>
                    <p>📞 Phone: +1 (555) 123-4567</p>
                    <p>💬 WhatsApp: +1 (555) 987-6543</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          {relatedProducts && relatedProducts.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.code}
                    href={`/products/aluminum-foil-containers/${relatedProduct.category}/${relatedProduct.code}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={relatedProduct.path}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/product_img/placeholder.webp';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{relatedProduct.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">Code: {relatedProduct.code}</p>
                      <p className="text-sm text-blue-600 hover:text-blue-800">View Details →</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center">
                <Link
                  href={`/products/aluminum-foil-containers`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All {category.charAt(0).toUpperCase() + category.slice(1)} {product.shape.charAt(0).toUpperCase() + product.shape.slice(1)} Products →
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-4">No related products in this category and shape.</p>
              <Link
                href={`/products/aluminum-foil-containers`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                ← View All Aluminum Foil Container Products
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}