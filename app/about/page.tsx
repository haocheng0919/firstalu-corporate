import { PageHeader } from '@/components/ui/page-header';
import { ModernSection } from '@/components/ui/modern-section';
import { AnimatedGroup } from '@/components/ui/animated-group';
import Footer from '../../components/Footer';

export default function About() {
  return (
    <>
      <PageHeader 
        title="About First Aluminum Technology"
        description="Leading the Future of Food Packaging"
        backgroundImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=1080&fit=crop&auto=format"
      />
      <main className="overflow-hidden">

        {/* Company Story */}
        <ModernSection 
          className="py-24 md:py-36" 
          backgroundImage="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1920&h=1080&fit=crop&auto=format"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedGroup preset="blur-slide">
                <h2 className="mb-8">
                  Our Story
                </h2>
                <p className="mb-8">
                  First Aluminum Technology is a premier B2B supplier specializing in disposable food packaging solutions. With years of experience in the industry, we provide high-quality aluminum foil containers, disposable food boxes, and eco-friendly chopsticks to businesses worldwide.
                </p>
                <p className="mb-8">
                  Our commitment to excellence and customer satisfaction has made us a trusted partner for restaurants, catering services, and food delivery businesses across the globe.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-2xl border">
                    <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
                    <div className="text-muted-foreground">Happy Clients</div>
                  </div>
                  <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-2xl border">
                    <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
                    <div className="text-muted-foreground">Countries Served</div>
                  </div>
                </div>
              </AnimatedGroup>
              <AnimatedGroup preset="scale">
                <div className="relative">
                  <div className="bg-background/70 backdrop-blur-lg rounded-3xl p-12 text-center shadow-xl border border-border/20">
                    <div className="text-9xl mb-6">🏭</div>
                    <h3 className="mb-4">
                      Modern Manufacturing
                    </h3>
                    <p className="text-lead">
                      State-of-the-art facilities ensuring quality and efficiency
                    </p>
                  </div>
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </ModernSection>





        {/* Certifications Section */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="mb-8">
                Our Certifications
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Quality and safety standards that ensure our products meet international requirements
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification1.webp" 
                    alt="BRC Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">BRC</h5>
                <p className="text-caption text-secondary-600 mt-1">Food Safety</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification2.webp" 
                    alt="BSCI Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">BSCI</h5>
                <p className="text-caption text-secondary-600 mt-1">Social Compliance</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification3.webp" 
                    alt="LFGB Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">LFGB</h5>
                <p className="text-caption text-secondary-600 mt-1">German Standard</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification4.webp" 
                    alt="ISO 9001 Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">ISO 9001</h5>
                <p className="text-caption text-secondary-600 mt-1">Quality Management</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification5.webp" 
                    alt="ISO 14001 Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">ISO 14001</h5>
                <p className="text-caption text-secondary-600 mt-1">Environmental</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification6.webp" 
                    alt="ISO 45001 Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">ISO 45001</h5>
                <p className="text-caption text-secondary-600 mt-1">Health & Safety</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification7.webp" 
                    alt="SGS Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">SGS</h5>
                <p className="text-caption text-secondary-600 mt-1">Testing & Verification</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification8.webp" 
                    alt="SGS Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">SGS</h5>
                <p className="text-caption text-secondary-600 mt-1">Quality Control</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification9.webp" 
                    alt="FDA Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">FDA</h5>
                <p className="text-caption text-secondary-600 mt-1">US Food Safety</p>
              </div>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </>
  );
}