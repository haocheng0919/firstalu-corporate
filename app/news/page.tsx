import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function News() {
  const newsArticles = [
    {
      id: 1,
      title: "Sustainable Packaging: The Future of Food Service Industry",
      excerpt: "Exploring how eco-friendly packaging solutions are revolutionizing the food service industry and meeting consumer demands for sustainability.",
      date: "December 15, 2024",
      category: "Sustainability",
      readTime: "5 min read",
      image: "🌱"
    },
    {
      id: 2,
      title: "New Product Launch: Premium Bamboo Chopsticks Collection",
      excerpt: "We're excited to announce our latest addition to the chopsticks line - premium bamboo chopsticks with enhanced durability and finish.",
      date: "December 10, 2024",
      category: "Product Launch",
      readTime: "3 min read",
      image: "🥢"
    },
    {
      id: 3,
      title: "Food Safety Standards: What Every Restaurant Owner Should Know",
      excerpt: "A comprehensive guide to food safety standards and how choosing the right packaging can help maintain food quality and safety.",
      date: "December 5, 2024",
      category: "Food Safety",
      readTime: "7 min read",
      image: "🛡️"
    },
    {
      id: 4,
      title: "Global Expansion: Now Serving 50+ Countries Worldwide",
      excerpt: "First Aluminum Technology reaches a new milestone by expanding our services to over 50 countries, bringing quality packaging solutions globally.",
      date: "November 28, 2024",
      category: "Company News",
      readTime: "4 min read",
      image: "🌍"
    },
    {
      id: 5,
      title: "The Rise of Food Delivery: Packaging Solutions for Modern Needs",
      excerpt: "How the food delivery boom is changing packaging requirements and what businesses need to consider for optimal customer experience.",
      date: "November 20, 2024",
      category: "Industry Trends",
      readTime: "6 min read",
      image: "🚚"
    },
    {
      id: 6,
      title: "Quality Assurance: Our ISO 9001:2015 Certification Journey",
      excerpt: "Learn about our commitment to quality and the rigorous process behind achieving ISO 9001:2015 certification for our manufacturing processes.",
      date: "November 15, 2024",
      category: "Quality",
      readTime: "5 min read",
      image: "📋"
    }
  ];

  const categories = [
    "All",
    "Sustainability", 
    "Product Launch",
    "Food Safety",
    "Company News",
    "Industry Trends",
    "Quality"
  ];

  return (
    <>
      <PageHeader 
        title="Latest News & Updates"
        description="Stay informed about industry trends, company updates, and insights from the food packaging world"
        backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=1080&fit=crop&auto=format"
      />
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
                  <div className="text-primary-200 text-sm font-medium mb-2">FEATURED ARTICLE</div>
                  <h2 className="text-6xl md:text-7xl lg:text-6xl xl:text-[5.25rem] font-bold mb-8">
                    {newsArticles[0].title}
                  </h2>
                  <p className="text-lg text-primary-100 mb-6">
                    {newsArticles[0].excerpt}
                  </p>
                  <div className="flex items-center text-primary-200 text-sm mb-6">
                    <span>{newsArticles[0].date}</span>
                    <span className="mx-2">•</span>
                    <span>{newsArticles[0].readTime}</span>
                  </div>
                  <Link href={`/news/${newsArticles[0].id}`} className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-block">
                    Read Full Article
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
                Recent Articles
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the latest insights and updates from our industry experts
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
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>




      </main>
      <Footer />
    </>
  );
}