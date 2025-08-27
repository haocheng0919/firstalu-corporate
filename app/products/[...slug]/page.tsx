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

// Helper function to check if product is aluminum foil related
function isAluminumFoilProduct(categoryId: string): boolean {
  const aluminumFoilCategoryIds = [
    '61534b79-37af-4bce-874a-560082a2b551', // aluminum-foil
    'abd42c08-1881-46b2-9af2-013290eba1ea', // aluminum-foil-container-smoothwall
    '26edbee4-03c8-4cb4-b0f7-1960609bea31', // aluminum-foil-container-wrinklewall
    'df0223b5-5faf-4f46-a2eb-f6ddd8a3055a', // aluminum-foil-sheets
    '461ab8a3-947f-4f3c-9be4-aa30ecdbafa1', // aluminum-foil-container-wrinklewall-rectangle
    '647e0041-8a35-421b-b87a-bfddbcf750c3', // aluminum-foil-container-wrinklewall-round
    '17e5051a-c761-4c65-93a2-17ae26cc38ee', // aluminum-foil-container-wrinklewall-square
    '9015e33c-fc0a-48bc-864b-d3ca428cff0a', // aluminum-foil-container-smoothwall-rectangle
    'c53e4d7f-bdfe-464e-b8fa-ce20e88c133a'  // aluminum-foil-container-smoothwall-round
  ];
  return aluminumFoilCategoryIds.includes(categoryId);
}

// Helper function to check if product is sugarcane tableware
function isSugarcaneProduct(categoryId: string): boolean {
  const sugarcaneCategoryId = 'df7abf38-1878-4bf4-a11f-a3da99788ab6'; // sugarcane-tableware
  return categoryId === sugarcaneCategoryId;
}

// Helper function to render product features
function renderProductFeatures(features: any[], locale: string): JSX.Element {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-emerald-200">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Product Features</h3>
        <p className="text-gray-600">Eco-friendly and sustainable product characteristics</p>
      </div>
      <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
        <div className="grid gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start py-4 px-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 mr-4">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-lg mb-2">
                  {feature.name?.[locale] || feature.name?.en || 'Feature'}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description?.[locale] || feature.description?.en || 'Description not available'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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
      .select('id, slug, name_i18n, description_i18n, introduction, images, technical_specs, category_id')
      .eq('slug', finalSlug)
      .single()

    if (!directProductError && directProduct) {
      // Verify that the category path matches the slug path
      // Get the full category hierarchy for this product
      const { data: categoryPath } = await supabase.rpc('get_category_path', {
        category_id: directProduct.category_id
      })
      
      // If we have category path, verify the path matches
      if (categoryPath && typeof categoryPath === 'string') {
        const expectedPath = categoryPath.split('/')
        const providedCategoryPath = slugPath.slice(0, -1) // Remove product slug
        
        // Check if the provided path matches the expected category path
        const pathMatches = expectedPath.length === providedCategoryPath.length &&
          expectedPath.every((slug: string, index: number) => slug === providedCategoryPath[index])
        
        if (!pathMatches) {
          return notFound()
        }
      }
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
        undefined,
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
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Product Images - Larger Size */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8">
                    <ProductImageCarousel images={productImages} productName={directProduct.name_i18n?.[locale] || directProduct.slug} />
                  </div>
                </div>

                {/* Product Information */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Product Features - For Sugarcane Products */}
                  {isSugarcaneProduct(directProduct.category_id) && (
                    renderProductFeatures([
                      {
                        name: { en: "Food-grade material", zh: "食品级材料", fr: "Matériau de qualité alimentaire", de: "Lebensmittelechtes Material", es: "Material de grado alimentario" },
                        description: { en: "Made from 100% natural sugarcane fiber, completely safe for food contact", zh: "采用100%天然甘蔗纤维制成，完全安全的食品接触材料", fr: "Fabriqué à partir de fibres de canne à sucre 100% naturelles, totalement sûr pour le contact alimentaire", de: "Hergestellt aus 100% natürlichen Zuckerrohfasern, völlig sicher für Lebensmittelkontakt", es: "Hecho de fibra de caña de azúcar 100% natural, completamente seguro para el contacto con alimentos" }
                      },
                      {
                        name: { en: "Refrigerable/Microwaveable", zh: "可冷藏/微波", fr: "Réfrigérable/Micro-ondable", de: "Kühlbar/Mikrowellengeeignet", es: "Refrigerable/Apto para microondas" },
                        description: { en: "Safe for refrigerator storage and microwave heating up to 120°C", zh: "可安全冷藏储存，微波加热温度可达120°C", fr: "Sûr pour le stockage au réfrigérateur et le chauffage au micro-ondes jusqu'à 120°C", de: "Sicher für Kühlschrankaufbewahrung und Mikrowellenerwärmung bis 120°C", es: "Seguro para almacenamiento en refrigerador y calentamiento en microondas hasta 120°C" }
                      },
                      {
                        name: { en: "Solid quality", zh: "坚固质量", fr: "Qualité solide", de: "Solide Qualität", es: "Calidad sólida" },
                        description: { en: "Durable construction that won't break or leak during normal use", zh: "坚固耐用的结构，正常使用时不会破裂或泄漏", fr: "Construction durable qui ne se cassera pas ou ne fuira pas lors d'une utilisation normale", de: "Langlebige Konstruktion, die bei normalem Gebrauch nicht bricht oder leckt", es: "Construcción duradera que no se romperá ni goteará durante el uso normal" }
                      },
                      {
                        name: { en: "Compostable degradation", zh: "可堆肥降解", fr: "Dégradation compostable", de: "Kompostierbare Zersetzung", es: "Degradación compostable" },
                        description: { en: "Fully biodegradable within 90 days in commercial composting facilities", zh: "在商业堆肥设施中90天内完全生物降解", fr: "Entièrement biodégradable en 90 jours dans les installations de compostage commercial", de: "Vollständig biologisch abbaubar innerhalb von 90 Tagen in kommerziellen Kompostieranlagen", es: "Completamente biodegradable en 90 días en instalaciones de compostaje comercial" }
                      }
                    ], locale)
                  )}

                  {/* Technical Specifications - Priority Section - Only for Aluminum Foil Products */}
                  {directProduct.technical_specs && Object.keys(directProduct.technical_specs).length > 0 && isAluminumFoilProduct(directProduct.category_id) && (
                    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Technical Specifications</h3>
                        <p className="text-gray-600">Detailed product specifications and measurements</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                        <div className="grid gap-4">
                          {Object.entries(directProduct.technical_specs).map(([key, value]) => {
                            // Skip features as they are displayed separately
                            if (key === 'features') return null;
                            
                            let displayValue = 'n/a';
                            
                            if (value !== null && value !== undefined) {
                              if (typeof value === 'object') {
                                if (key === 'packaging') {
                                  const pkg = value as any;
                                  if (pkg.carton_size && pkg.inner_package && pkg.outer_package) {
                                    displayValue = `${pkg.carton_size}, ${pkg.inner_package}, ${pkg.outer_package}`;
                                  }
                                } else if (key === 'dimensions') {
                                  const dims = [];
                                  const dim = value as any;
                                  if (dim.width) dims.push(`W: ${dim.width}`);
                                  if (dim.length) dims.push(`L: ${dim.length}`);
                                  if (dim.height) dims.push(`H: ${dim.height}`);
                                  if (dim.diameter) dims.push(`D: ${dim.diameter}`);
                                  displayValue = dims.length > 0 ? dims.join(', ') : 'n/a';
                                } else {
                                  displayValue = 'n/a';
                                }
                              } else {
                                displayValue = String(value);
                              }
                            }
                            
                            return (
                              <div key={key} className="flex justify-between items-center py-4 px-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <span className="font-bold text-gray-800 text-lg capitalize">{key.replace(/_/g, ' ')}:</span>
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{displayValue}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Technical Specifications - For Sugarcane Products */}
                  {directProduct.technical_specs && Object.keys(directProduct.technical_specs).length > 0 && isSugarcaneProduct(directProduct.category_id) && (
                    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Technical Specifications</h3>
                        <p className="text-gray-600">Detailed product specifications and measurements</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                        <div className="grid gap-4">
                          {Object.entries(directProduct.technical_specs).map(([key, value]) => {
                            // Skip features as they are displayed separately
                            if (key === 'features') return null;
                            
                            let displayValue = 'n/a';
                            
                            if (value !== null && value !== undefined) {
                              if (typeof value === 'object') {
                                if (key === 'packaging') {
                                  const pkg = value as any;
                                  const parts = [];
                                  if (pkg.carton_size) parts.push(`Carton: ${pkg.carton_size}`);
                                  if (pkg.inner_package) parts.push(`Inner: ${pkg.inner_package}`);
                                  if (pkg.outer_package) parts.push(`Outer: ${pkg.outer_package}`);
                                  displayValue = parts.length > 0 ? parts.join(', ') : 'n/a';
                                } else if (key === 'dimensions') {
                                  const dims = [];
                                  const dim = value as any;
                                  if (dim.width) dims.push(`W: ${dim.width}`);
                                  if (dim.length) dims.push(`L: ${dim.length}`);
                                  if (dim.height) dims.push(`H: ${dim.height}`);
                                  if (dim.diameter) dims.push(`D: ${dim.diameter}`);
                                  displayValue = dims.length > 0 ? dims.join(', ') : 'n/a';
                                } else {
                                  displayValue = 'n/a';
                                }
                              } else {
                                displayValue = String(value);
                              }
                            }
                            
                            return (
                              <div key={key} className="flex justify-between items-center py-4 px-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <span className="font-bold text-gray-800 text-lg capitalize">{key.replace(/_/g, ' ')}:</span>
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{displayValue}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {directProduct.description_i18n?.[locale] && isAluminumFoilProduct(directProduct.category_id) && (
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

                  {/* Additional Details - For Sugarcane Products */}
                  {directProduct.description_i18n?.[locale] && isSugarcaneProduct(directProduct.category_id) && (
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
                          <h3 className="text-sm font-medium text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-relaxed">
                            {product.name_i18n?.[locale] || product.slug}
                          </h3>

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