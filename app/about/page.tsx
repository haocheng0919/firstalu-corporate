'use client';
import { ModernSection } from '@/components/ui/modern-section';
import { AnimatedGroup } from '@/components/ui/animated-group';

import { useLanguage } from '@/lib/language-context';

export default function About() {
  const { t } = useLanguage();
  
  return (
    <>
      {/* Page Title Section */}
      <section className="relative pt-24 md:pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=1080&fit=crop&auto=format"
            alt="background"
            className="absolute inset-x-0 top-0 w-full h-full object-cover opacity-10"
          />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              About First Aluminum Technology
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>
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
                  {t('about.story.title')}
                </h2>
                <p className="mb-8">
                  {t('about.story.paragraph1')}
                </p>
                <p className="mb-8">
                  {t('about.story.paragraph2')}
                </p>
                <p className="mb-8">
                  {t('about.story.paragraph3')}
                </p>
                <p className="mb-8">
                  {t('about.story.paragraph4')}
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-2xl border">
                    <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
                    <div className="text-muted-foreground">{t('about.stats.clients')}</div>
                  </div>
                  <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-2xl border">
                    <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
                    <div className="text-muted-foreground">{t('about.stats.countries')}</div>
                  </div>
                </div>
              </AnimatedGroup>
              <AnimatedGroup preset="scale">
                <div className="relative">
                  <div className="bg-background/70 backdrop-blur-lg rounded-3xl p-12 text-center shadow-xl border border-border/20">
                    <div className="mb-6">
                      <img 
                        src="/about/factory.webp" 
                        alt="First Aluminum Technology Factory" 
                        className="w-full h-48 object-cover rounded-2xl mx-auto"
                      />
                    </div>
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
                {t('about.certifications.title')}
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                {t('about.certifications.description')}
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
                <h5 className="text-secondary-900 font-medium">{t('certifications.brc')}</h5>
                <p className="text-caption text-secondary-600 mt-1">{t('certifications.brcDesc')}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification2.webp" 
                    alt="BSCI Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">{t('certifications.bsci')}</h5>
                <p className="text-caption text-secondary-600 mt-1">{t('certifications.bsciDesc')}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification3.webp" 
                    alt="LFGB Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">{t('certifications.lfgb')}</h5>
                <p className="text-caption text-secondary-600 mt-1">{t('certifications.lfgbDesc')}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification4.webp" 
                    alt="ISO 9001 Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">{t('certifications.iso9001')}</h5>
                <p className="text-caption text-secondary-600 mt-1">{t('certifications.iso9001Desc')}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification5.webp" 
                    alt="ISO 14001 Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">{t('certifications.iso14001')}</h5>
                <p className="text-caption text-secondary-600 mt-1">{t('certifications.iso14001Desc')}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification6.webp" 
                    alt="ISO 45001 Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">{t('certifications.iso45001')}</h5>
                <p className="text-caption text-secondary-600 mt-1">{t('certifications.iso45001Desc')}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification7.webp" 
                    alt="SGS Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">{t('certifications.sgs')}</h5>
                <p className="text-caption text-secondary-600 mt-1">{t('certifications.sgsTestingDesc')}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification8.webp" 
                    alt="SGS Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">{t('certifications.sgs')}</h5>
                <p className="text-caption text-secondary-600 mt-1">{t('certifications.sgsQualityDesc')}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center group">
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img 
                    src="/disposablephoto/certification9.webp" 
                    alt="FDA Certification" 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h5 className="text-secondary-900 font-medium">{t('certifications.fda')}</h5>
                <p className="text-caption text-secondary-600 mt-1">{t('certifications.fdaDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="section-padding bg-secondary-50">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="mb-8">
                Get in Touch
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Ready to discuss your packaging needs? Contact us today for a customized solution.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">First Name</label>
                      <input className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Enter your first name" type="text" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">Last Name</label>
                      <input className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Enter your last name" type="text" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Email</label>
                    <input className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Enter your email address" type="email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Company</label>
                    <input className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Enter your company name" type="text" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Product Interest</label>
                    <select className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option>Select a product category</option>
                      <option>Aluminum Foil Containers</option>
                      <option>Disposable Food Boxes</option>
                      <option>Disposable Utensils</option>
                      <option>All Products</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Message</label>
                    <textarea rows={4} className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Tell us about your requirements..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>


      </main>

    </>
  );
}