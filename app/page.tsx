'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/ui/hero-section-1';
import { ModernSection } from '@/components/ui/modern-section';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { Button } from '@/components/ui/button';

import { useLanguage } from '@/lib/language-context';
import { getProductCategories, type AdaptedCategory } from '@/lib/supabase-service-adapted';

// Product Categories Component
function ProductCategories() {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<AdaptedCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getProductCategories();
        // Filter to only the 6 main categories that should be displayed
        const ALLOWED_CATEGORY_SLUGS = new Set([
          'aluminum-foil',
          'baking-paper', 
          'paper-cups',
          'kraft-packaging',
          'disposable-cutlery',
          'sugarcane-tableware'
        ]);
        
        const filteredCategories = data.filter(category => 
          ALLOWED_CATEGORY_SLUGS.has(category.slug)
        );
        
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-200 animate-pulse rounded-2xl h-96"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category) => {
        // Fallback images for categories without thumbnails
        const fallbackImages: { [key: string]: string } = {
          'aluminum-foil': '/product_cat/aluminum-foil.webp',
          'baking-paper': '/product_cat/baking-paper.webp',
          'kraft-packaging': '/product_cat/kraft-packaging.webp',
          'paper-cups': '/product_cat/paper-cups.webp',
          'disposable-cutlery': '/product_cat/disposable-cutlery.webp',
          'sugarcane-tableware': '/product_cat/sugarcane-tableware.webp'
        };

        const imageUrl = category.thumbnail_url || fallbackImages[category.slug] || '/placeholder.svg';
        
        return (
          <Link
            key={category.id}
            href={`/products/${category.slug}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={imageUrl}
                alt={category.name || category.slug}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = fallbackImages[category.slug] || '/placeholder.svg';
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {category.name || t(`categories.${category.slug}.title`)}
              </h3>

            </div>
          </Link>
        );
      })}
    </div>
  );
}

// FAQ Section Component
function FAQSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const categories = [
    { id: 'general', label: t('faq.categories.general') },
    { id: 'products', label: t('faq.categories.products') },
    { id: 'shipping', label: t('faq.categories.shipping') },
    { id: 'support', label: t('faq.categories.support') }
  ];

  const getFAQs = () => {
    return [
      {
        question: t('faq.question1'),
        answer: t('faq.answer1')
      },
      {
        question: t('faq.question2'),
        answer: t('faq.answer2')
      },
      {
        question: t('faq.question3'),
        answer: t('faq.answer3')
      }
    ]
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('home.faq.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('home.faq.subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ Items */}
          <div className="space-y-4">
            {getFAQs().map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
       <HeroSection />

      {/* Product Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.homeProducts.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.homeProducts.subtitle')}
            </p>
          </div>

          <ProductCategories />


        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.news.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.news.subtitle')}
            </p>
          </div>

          <AnimatedGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/disposablephoto/Aluminum Foil Products.webp"
                  alt={t('home.news.article1.title')}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{t('home.news.article1.date')}</span>
                  <span>•</span>
                  <span>{t('home.news.article1.category')}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('home.news.article1.title')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('home.news.article1.excerpt')}
                </p>
                <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  {t('home.news.readMore')} →
                </Link>
              </div>
            </article>

            <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/disposablephoto/Kraft Packaging.webp"
                  alt={t('home.news.article2.title')}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{t('home.news.article2.date')}</span>
                  <span>•</span>
                  <span>{t('home.news.article2.category')}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('home.news.article2.title')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('home.news.article2.excerpt')}
                </p>
                <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  {t('home.news.readMore')} →
                </Link>
              </div>
            </article>

            <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src="/disposablephoto/Disposable Cutlery.webp"
                  alt={t('home.news.article3.title')}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{t('home.news.article3.date')}</span>
                  <span>•</span>
                  <span>{t('home.news.article3.category')}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('home.news.article3.title')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('home.news.article3.excerpt')}
                </p>
                <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  {t('home.news.readMore')} →
                </Link>
              </div>
            </article>
          </AnimatedGroup>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.contact.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('home.contact.address.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('home.contact.address.details')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('home.contact.phone.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('home.contact.phone.details')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('home.contact.email.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('home.contact.email.details')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    {t('home.contact.getInTouch')}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="/disposablephoto/contact-image.webp"
                alt={t('home.contact.imageAlt')}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>
        </div>
      </section>

    </>
  );
}