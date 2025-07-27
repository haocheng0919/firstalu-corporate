import Link from 'next/link';
import { HeroSection } from '@/components/blocks/hero-section-1';
import { ModernSection } from '@/components/ui/modern-section';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { Button } from '@/components/ui/button';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <HeroSection />
      <main className="overflow-hidden">
        {/* Features Section */}
        <ModernSection 
          className="py-24 md:py-36" 
          backgroundImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=1080&fit=crop&auto=format"
        >
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedGroup preset="blur-slide" className="text-center mb-16">
              <h2 className="mb-6">
                Why Choose Us
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                We provide premium quality packaging solutions with competitive pricing and reliable service.
              </p>
            </AnimatedGroup>
            
            <AnimatedGroup preset="slide" className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center p-8 bg-background/50 backdrop-blur-sm rounded-2xl border shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-4">Premium Quality</h3>
                <p>
                  All our products meet international food safety standards with superior materials.
                </p>
              </div>
              
              <div className="text-center p-8 bg-background/50 backdrop-blur-sm rounded-2xl border shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="mb-4">B2B Wholesale</h3>
                <p>
                  Competitive pricing for bulk orders with MOQ starting from 100 boxes.
                </p>
              </div>
              
              <div className="text-center p-8 bg-background/50 backdrop-blur-sm rounded-2xl border shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-4">Global Reach</h3>
                <p>
                  Serving customers worldwide with reliable shipping and logistics.
                </p>
              </div>
            </AnimatedGroup>
          </div>
        </ModernSection>

        {/* Products Preview Section */}
        <ModernSection 
          className="py-24 md:py-36" 
          backgroundImage="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1920&h=1080&fit=crop&auto=format"
        >
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedGroup preset="blur-slide" className="text-center mb-16">
              <h2 className="mb-6">
                Our Products
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Premium disposable food packaging solutions for your business needs.
              </p>
            </AnimatedGroup>
            
            <AnimatedGroup preset="scale" className="product-grid">
              <div className="product-card">
                <div className="product-card-icon">
                  <img src="/disposablephoto/Aluminum Foil Products.webp" alt="Aluminum Foil Products" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent"></div>
                </div>
                <div className="product-card-content">
                  <h3 className="product-card-title">
                    Aluminum Foil Products
                  </h3>
                  <p className="product-card-description">
                    Kitchen foil, pop-up foil sheets and aluminum containers for food packaging.
                  </p>
                  <Link href="/products" className="product-card-button group">
                    Learn More 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="product-card">
                <div className="product-card-icon">
                  <img src="/disposablephoto/Baking Products.webp" alt="Baking Products" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent"></div>
                </div>
                <div className="product-card-content">
                  <h3 className="product-card-title">
                    Baking Products
                  </h3>
                  <p className="product-card-description">
                    Professional baking paper and accessories for commercial kitchens.
                  </p>
                  <Link href="/products" className="product-card-button group">
                    Learn More 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="product-card">
                <div className="product-card-icon">
                  <img src="/disposablephoto/Aluminum Foil Containers.webp" alt="Aluminum Foil Containers" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent"></div>
                </div>
                <div className="product-card-content">
                  <h3 className="product-card-title">
                    Aluminum Foil Containers
                  </h3>
                  <p className="product-card-description">
                    Durable and heat-resistant containers perfect for takeaway and food delivery services.
                  </p>
                  <Link href="/products" className="product-card-button group">
                    Learn More 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </AnimatedGroup>
            
            <AnimatedGroup preset="scale" className="product-grid mt-12">
              <div className="product-card">
                <div className="product-card-icon">
                  <img src="/disposablephoto/Disposable Food Boxes.webp" alt="Disposable Food Boxes" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent"></div>
                </div>
                <div className="product-card-content">
                  <h3 className="product-card-title">
                    Disposable Food Boxes
                  </h3>
                  <p className="product-card-description">
                    Eco-friendly food boxes available in various sizes for different food types.
                  </p>
                  <Link href="/products" className="product-card-button group">
                    Learn More 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="product-card">
                <div className="product-card-icon">
                  <img src="/disposablephoto/Disposable Cups.webp" alt="Disposable Cups" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent"></div>
                </div>
                <div className="product-card-content">
                  <h3 className="product-card-title">
                    Disposable Cups
                  </h3>
                  <p className="product-card-description">
                    High-quality disposable cups for hot and cold beverages.
                  </p>
                  <Link href="/products" className="product-card-button group">
                    Learn More 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="product-card">
                <div className="product-card-icon">
                  <img src="/disposablephoto/Disposable Chopsticks.webp" alt="Disposable Utensils" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent"></div>
                </div>
                <div className="product-card-content">
                  <h3 className="product-card-title">
                    Disposable Utensils
                  </h3>
                  <p className="product-card-description">
                    High-quality wooden and bamboo chopsticks for Asian cuisine restaurants.
                  </p>
                  <Link href="/products" className="product-card-button group">
                    Learn More 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </ModernSection>

        {/* News Section */}
        <ModernSection 
          className="py-24 md:py-36" 
          backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=1080&fit=crop&auto=format"
        >
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedGroup preset="blur-slide" className="text-center mb-16">
              <h2 className="mb-6">
                Latest News & Updates
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Stay informed about our latest product launches, industry insights, and company updates.
              </p>
            </AnimatedGroup>
            
            <AnimatedGroup preset="scale" className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-border/20 hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="h-56 bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center relative overflow-hidden">
                  <img src="/disposablephoto/Screenshot 2025-07-27 at 1.02.08 PM.webp" alt="Eco-Friendly Products" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent"></div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-sm text-muted-foreground mb-2">December 15, 2024</div>
                  <h3 className="mb-4">
                    New Eco-Friendly Product Line Launch
                  </h3>
                  <p className="mb-6 flex-grow">
                    We're excited to announce our new sustainable packaging solutions made from recycled materials.
                  </p>
                  <Button asChild variant="ghost" className="group mt-auto">
                    <Link href="/news">
                      Read More 
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-border/20 hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="h-56 bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center relative overflow-hidden">
                  <img src="/disposablephoto/Screenshot 2025-07-27 at 1.04.17 PM.webp" alt="Factory Expansion" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent"></div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-sm text-muted-foreground mb-2">December 10, 2024</div>
                  <h3 className="mb-4">
                    Factory Expansion Completed
                  </h3>
                  <p className="mb-6 flex-grow">
                    Our new production facility is now operational, increasing our capacity by 50%.
                  </p>
                  <Button asChild variant="ghost" className="group mt-auto">
                    <Link href="/news">
                      Read More 
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-border/20 hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="h-56 bg-gradient-to-br from-primary-500/20 to-primary-700/20 flex items-center justify-center relative overflow-hidden">
                  <img src="/disposablephoto/Screenshot 2025-07-27 at 12.30.43 PM.webp" alt="Global Partnership" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent"></div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-sm text-muted-foreground mb-2">December 5, 2024</div>
                  <h3 className="mb-4">
                    Global Partnership Expansion
                  </h3>
                  <p className="mb-6 flex-grow">
                    We've established new partnerships in Europe and North America to better serve our global customers.
                  </p>
                  <Button asChild variant="ghost" className="group mt-auto">
                    <Link href="/news">
                      Read More 
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedGroup>
            
            <AnimatedGroup preset="blur-slide" className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="px-8 py-4 text-lg rounded-2xl bg-background/50 backdrop-blur-sm">
                <Link href="/news">
                  View All News
                </Link>
              </Button>
            </AnimatedGroup>
          </div>
        </ModernSection>

        {/* FAQ Section */}
        <ModernSection 
          id="faq"
          className="py-24 md:py-36" 
          backgroundImage="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&auto=format"
        >
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedGroup preset="blur-slide" className="text-center mb-16">
              <h2 className="mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Find answers to common questions about our products, services, and ordering process.
              </p>
            </AnimatedGroup>
            
            <AnimatedGroup preset="slide" className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl border border-border/20 p-8">
                  <h4 className="mb-4">
                    What is the minimum order quantity (MOQ)?
                  </h4>
                  <p>
                    Our minimum order quantity starts from 100 boxes for most products. However, MOQ may vary depending on the specific product and customization requirements.
                  </p>
                </div>
                
                <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl border border-border/20 p-8">
                  <h4 className="mb-4">
                    Do you offer custom packaging solutions?
                  </h4>
                  <p>
                    Yes, we provide custom packaging solutions including custom sizes, printing, and branding options. Contact our sales team to discuss your specific requirements.
                  </p>
                </div>
                
                <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl border border-border/20 p-8">
                  <h4 className="mb-4">
                    What are your shipping and delivery options?
                  </h4>
                  <p>
                    We offer worldwide shipping via sea freight, air freight, and express delivery. Delivery time varies from 7-30 days depending on your location and shipping method.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg rounded-2xl bg-background/50 backdrop-blur-sm">
                  View All FAQs
                </Button>
              </div>
            </AnimatedGroup>
          </div>
        </ModernSection>

        {/* Contact Section */}
        <ModernSection 
          id="contact"
          className="py-24 md:py-36" 
          backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop&auto=format"
        >
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedGroup preset="blur-slide" className="text-center mb-16">
              <h2 className="mb-6">
                Get in Touch
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Ready to discuss your packaging needs? Our team is here to help you find the perfect solution.
              </p>
            </AnimatedGroup>
            
            <AnimatedGroup preset="scale" className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl border border-border/20 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="mb-4">Email Us</h4>
                <p className="mb-6">
                  Send us your inquiry and we'll respond within 24 hours.
                </p>
                <p className="text-primary-600 font-semibold">sales@firstaluminum.com</p>
              </div>
              
              <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl border border-border/20 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="mb-4">Call Us</h4>
                <p className="mb-6">
                  Speak directly with our sales team for immediate assistance.
                </p>
                <p className="text-primary-600 font-semibold">+86 123 456 7891</p>
              </div>
              
              <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl border border-border/20 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="mb-4">Visit Us</h4>
                <p className="mb-6">
                  Schedule a visit to our manufacturing facility.
                </p>
                <p className="text-primary-600 font-semibold">Guangzhou, China</p>
              </div>
            </AnimatedGroup>
            
            <AnimatedGroup preset="blur-slide" className="text-center mt-12">
              <Button size="lg" className="px-8 py-4 text-lg rounded-2xl">
                Contact Us Now
              </Button>
            </AnimatedGroup>
          </div>
        </ModernSection>


      </main>
      <Footer />
    </>
  );
}