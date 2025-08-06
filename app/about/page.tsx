'use client';
import { PageHeader } from '@/components/ui/page-header';
import { ModernSection } from '@/components/ui/modern-section';
import { AnimatedGroup } from '@/components/ui/animated-group';
import Footer from '../../components/Footer';
import { useLanguage } from '@/lib/language-context';

export default function About() {
  const { t } = useLanguage();
  
  return (
    <>
      <PageHeader 
        title="About First Aluminum Technology"
        description={t('about.subtitle')}
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
                  {t('about.story.title')}
                </h2>
                <p className="mb-8">
                  {t('about.story.paragraph1')}
                </p>
                <p className="mb-8">
                  {t('about.story.paragraph2')}
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
                    <div className="text-9xl mb-6">🏭</div>
                    <h3 className="mb-4">
                      {t('about.manufacturing.title')}
                    </h3>
                    <p className="text-lead">
                      {t('about.manufacturing.description')}
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


      </main>
      <Footer />
    </>
  );
}