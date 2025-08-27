'use client'

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

interface CategoryWithCount {
  id: string;
  slug: string;
  name?: string;
  name_i18n?: {
    en: string;
    de: string;
    fr: string;
    es: string;
  };
  productCount: number;
  thumbnail_url?: string;
}

interface ProductsClientProps {
  categories: CategoryWithCount[];
}

export default function ProductsClient({ categories }: ProductsClientProps) {
  const { t, language } = useLanguage();

  const getCategoryName = (category: CategoryWithCount) => {
    if (category.name_i18n && category.name_i18n[language as keyof typeof category.name_i18n]) {
      return category.name_i18n[language as keyof typeof category.name_i18n];
    }
    return category.name || category.slug;
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Title Section */}
      <section className="relative pt-24 md:pt-36 pb-16 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t('products.title')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('products.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 py-12">
        {/* Categories Overview */}
         <section className="mb-16">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
               <Link
                 key={category.id} 
                 href={`/products/${category.slug}`}
                 className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
               >
                 <div className="h-48 relative overflow-hidden">
                   <img 
                     src={category.thumbnail_url || `/product_cat/${category.slug}.webp`}
                     alt={getCategoryName(category)}
                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                   />
                 </div>
                 <div className="p-6">
                   <div className="mb-2">
                     <h3 className="text-xl font-semibold text-gray-900">{getCategoryName(category)}</h3>
                   </div>

                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-500">
                       {category.productCount} products
                     </span>
                     <span className="text-blue-600 hover:text-blue-800 font-medium">
                       View Products →
                     </span>
                   </div>
                 </div>
               </Link>
             ))}
          </div>
        </section>
      </main>
      

    </div>
  );
}