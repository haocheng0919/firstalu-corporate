'use client'

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

export default function News() {
  const { t } = useLanguage();
  
  const newsArticles = [
    {
      id: 1,
      title: t('news.articles.article1.title'),
      excerpt: t('news.articles.article1.excerpt'),
      date: t('news.articles.article1.date'),
      category: t('news.categories.sustainability'),
      readTime: t('news.articles.article1.readTime'),
      image: "/disposablephoto/news1.webp"
    },
    {
      id: 2,
      title: t('news.articles.article2.title'),
      excerpt: t('news.articles.article2.excerpt'),
      date: t('news.articles.article2.date'),
      category: t('news.categories.productLaunch'),
      readTime: t('news.articles.article2.readTime'),
      image: "/disposablephoto/news2.webp"
    },
    {
      id: 3,
      title: t('news.articles.article3.title'),
      excerpt: t('news.articles.article3.excerpt'),
      date: t('news.articles.article3.date'),
      category: t('news.categories.foodSafety'),
      readTime: t('news.articles.article3.readTime'),
      image: "/disposablephoto/news3.webp"
    },
    {
      id: 4,
      title: t('news.articles.article4.title'),
      excerpt: t('news.articles.article4.excerpt'),
      date: t('news.articles.article4.date'),
      category: t('news.categories.companyNews'),
      readTime: t('news.articles.article4.readTime'),
      image: "/disposablephoto/news4.webp"
    },
    {
      id: 5,
      title: t('news.articles.article5.title'),
      excerpt: t('news.articles.article5.excerpt'),
      date: t('news.articles.article5.date'),
      category: t('news.categories.industryTrends'),
      readTime: t('news.articles.article5.readTime'),
      image: "/disposablephoto/news5.webp"
    },
    {
      id: 6,
      title: t('news.articles.article6.title'),
      excerpt: t('news.articles.article6.excerpt'),
      date: t('news.articles.article6.date'),
      category: t('news.categories.quality'),
      readTime: t('news.articles.article6.readTime'),
      image: "/disposablephoto/news6.webp"
    }
  ];

  const categories = [
    t('news.categories.all'),
    t('news.categories.sustainability'),
    t('news.categories.productLaunch'),
    t('news.categories.foodSafety'),
    t('news.categories.companyNews'),
    t('news.categories.industryTrends'),
    t('news.categories.quality')
  ];

  return (
    <>
      {/* Page Title Section */}
      <section className="relative pt-24 md:pt-36 pb-16 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t('news.title')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('news.subtitle')}
            </p>
          </div>
        </div>
      </section>
      <main>
        {/* Categories Filter */}
        <section className="bg-white py-8 border-b">
          <div className="container-max">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    index === 0 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-secondary-100 text-secondary-700 hover:bg-primary-100 hover:text-primary-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl overflow-hidden text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="p-8 lg:p-12">
                  <div className="text-primary-200 text-sm font-medium mb-2">{t('news.featuredArticle')}</div>
                  <h2 className="text-6xl md:text-7xl lg:text-6xl xl:text-[5.25rem] font-bold mb-8">
                    {t('news.articles.article1.title')}
                  </h2>
                  <p className="text-lg text-primary-100 mb-6">
                    {t('news.articles.article1.excerpt')}
                  </p>
                  <div className="flex items-center text-primary-200 text-sm mb-6">
                    <span>{t('news.articles.article1.date')}</span>
                    <span className="mx-2">•</span>
                    <span>{t('news.articles.article1.readTime')}</span>
                  </div>
                  <Link href={`/news/${newsArticles[0].id}`} className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-block">
                    {t('news.readFullArticle')}
                  </Link>
                </div>
                <div className="h-64 lg:h-full bg-primary-500 flex items-center justify-center">
                  <div className="text-8xl">{newsArticles[0].image}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="section-padding bg-secondary-50">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-7xl lg:text-6xl xl:text-[5.25rem] font-bold text-foreground mb-8">
                {t('news.recentArticles')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('news.recentArticlesSubtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.slice(1).map((article) => (
                <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <div className="text-6xl">{article.image}</div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                      <span className="text-secondary-500 text-sm">{article.readTime}</span>
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-secondary-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-secondary-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-secondary-500 text-sm">{article.date}</span>
                      <Link 
                        href={`/news/${article.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        {t('news.readMore')} →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>




      </main>

    </>
  );
}