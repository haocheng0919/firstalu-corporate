'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Product {
  id: string;
  slug: string;
  sku: string;
  status: string;
  images?: {
    thumbnail?: string;
    gallery?: string[];
  };
  specs?: any;
  technical_specs?: any;
  categories: {
    slug: string;
    name_i18n: {
      en: string;
      zh: string;
    };
  }[];
}

interface ProductI18n {
  locale: string;
  name: string;
  description?: string;
  intro?: string;
}

interface ProductDetailClientProps {
  product: Product;
  productI18n: ProductI18n[];
}

export default function ProductDetailClient({ product, productI18n }: ProductDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedLocale, setSelectedLocale] = useState<'en' | 'zh'>('en');

  // Get localized product data
  const productData = productI18n.find(i18n => i18n.locale === selectedLocale) || productI18n[0];
  const productName = productData?.name || product.sku;
  const productDescription = productData?.description || '';
  const productIntro = productData?.intro || '';

  // Get category name
  const categoryName = product.categories?.[0]?.name_i18n?.[selectedLocale] || product.categories?.[0]?.slug || 'Sugarcane Plates';

  // Prepare images
  const images = [];
  if (product.images?.thumbnail) {
    images.push(product.images.thumbnail);
  }
  if (product.images?.gallery) {
    images.push(...product.images.gallery.filter(img => img !== product.images?.thumbnail));
  }
  if (images.length === 0) {
    images.push('/product_img/placeholder.svg');
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gray-500">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <Link href="/products" className="ml-4 text-gray-400 hover:text-gray-500">
                    Products
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <Link href="/products/sugarcane-tableware" className="ml-4 text-gray-400 hover:text-gray-500">
                    Sugarcane Tableware
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <Link href="/products/sugarcane-plates" className="ml-4 text-gray-400 hover:text-gray-500">
                    {categoryName}
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <span className="ml-4 text-gray-500 font-medium">{productName}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            {/* Image selector */}
            {images.length > 1 && (
              <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <div className="grid grid-cols-4 gap-6">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50 ${
                        index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <span className="sr-only">Image {index + 1}</span>
                      <span className="absolute inset-0 rounded-md overflow-hidden">
                        <Image
                          src={image}
                          alt={`${productName} view ${index + 1}`}
                          fill
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Main image */}
            <div className="w-full aspect-w-1 aspect-h-1">
              <div className="relative w-full h-96 sm:h-[500px] bg-white rounded-lg overflow-hidden">
                <Image
                  src={images[currentImageIndex]}
                  alt={productName}
                  fill
                  className="w-full h-full object-center object-cover"
                  priority
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronRightIcon className="h-6 w-6 text-gray-600" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            {/* Language selector */}
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => setSelectedLocale('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedLocale === 'en'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setSelectedLocale('zh')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedLocale === 'zh'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                中文
              </button>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {productName}
            </h1>

            <div className="mt-3">
              <p className="text-xl text-gray-900">SKU: {product.sku}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                {productIntro && (
                  <p className="text-lg leading-relaxed">{productIntro}</p>
                )}
                {productDescription && (
                  <p className="leading-relaxed">{productDescription}</p>
                )}
              </div>
            </div>

            {/* Technical Specifications */}
            {product.technical_specs && Object.keys(product.technical_specs).length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Technical Specifications</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    {Object.entries(product.technical_specs).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-sm font-medium text-gray-500 capitalize">
                          {key.replace(/_/g, ' ')}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {/* Additional Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-sm font-medium text-gray-500 capitalize">
                          {key.replace(/_/g, ' ')}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div className="mt-10">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-green-900 mb-2">
                  Interested in this eco-friendly product?
                </h3>
                <p className="text-green-700 mb-4">
                  Contact us for pricing, customization options, and bulk orders of our sustainable sugarcane tableware.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}