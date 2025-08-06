'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HeroSection } from '@/components/blocks/hero-section-1';
import { ModernSection } from '@/components/ui/modern-section';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { Button } from '@/components/ui/button';
import Footer from '../components/Footer';
import { useLanguage } from '@/lib/language-context';

// FAQ Section Component
function FAQSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('company');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // All FAQ data with user's new content
  const faqCategories: Record<string, { title: string; faqs: { question: string; answer: string; }[] }> = {
    company: {
      title: "Company & Manufacturing",
      faqs: [
        {
          question: "Are you a trading company or a factory?",
          answer: "We are a direct manufacturer with:\n• Main factory in China - Advanced production facilities\n• New factory in Malaysia - Strategic location for global markets\n\nThis dual-location setup allows us to offer:\n✓ Stable supply chain\n✓ Competitive pricing\n✓ Faster shipping to key markets (U.S., EU, Southeast Asia)\n✓ Flexible product origin options"
        },
        {
          question: "What certifications do your products have?",
          answer: "All products meet international food-grade standards with comprehensive certifications:\n\nFood Safety Certifications:\n• FDA (USA) - Food contact approval\n• LFGB (Germany) - European food safety standards\n• DGCCRF (France) - French food contact regulations\n\nQuality & Compliance:\n• SGS - International quality verification\n• ISO 9001/14001/45001 - Quality, environmental, and safety management\n• BRC, BSCI, SEDEX - Social responsibility and ethical compliance"
        },
        {
          question: "How do you control product quality?",
          answer: "5-Step Quality Management System:\n\n1. Incoming Material Inspection (IQC)\n• Raw material verification and testing\n• Supplier certification requirements\n\n2. In-Process Quality Control (IPQC)\n• Real-time production monitoring\n• Process parameter verification\n\n3. Final Quality Control (FQC)\n• Complete product inspection\n• Functional testing and verification\n\n4. Pre-shipment QC (OQC)\n• Final inspection before packaging\n• Documentation and certification\n\n5. Random Batch Inspection\n• AQL 1.0 standard compliance\n• Third-party inspection welcome\n• ISO 9001 certified facilities"
        }
      ]
    },
    products: {
      title: "Products & Specifications",
      faqs: [
        {
          question: "What products do you manufacture?",
          answer: "We specialize in:\n• Aluminum foil containers - For takeaway, catering, airline meals, baking\n• Household & catering aluminum foil rolls - Various sizes and specifications\n• Silicone baking paper - With or without custom print\n• Related custom packaging materials - Tailored to your needs\n\nWe support both OEM & ODM projects with comprehensive customization options."
        },
        {
          question: "Are your products food-grade?",
          answer: "Yes, 100% food-safe certified for all contact types:\n\nSafe for Contact With:\n• Hot foods (up to 220°C)\n• Cold foods (freezer safe to -20°C)\n• Acidic foods (citrus, tomatoes)\n• Oily/greasy foods\n\nCompliance Standards:\n• FDA, LFGB, DGCCRF approved\n• International food safety regulations\n• Regular third-party testing and verification"
        },
        {
          question: "Can I cook and freeze food in aluminum foil containers?",
          answer: "Yes. Aluminum foil containers are unaffected by extremes in temperature. They can go from freezer to oven and back to the freezer.\n\nTemperature Range:\n• Freezer safe: -20°C (-4°F)\n• Oven safe: Up to 220°C (428°F)\n• Microwave compatible: Remove lid first\n\nBenefits:\n• No thermal shock damage\n• Maintains food quality and freshness\n• Perfect for meal prep and batch cooking"
        },
        {
          question: "Can aluminum foil containers be used with all foods?",
          answer: "Yes. Aluminum foil containers are compatible with all foods and are odor and moisture proof.\n\nFood Safety Features:\n• Inert material - won't react with food\n• Odor proof - prevents flavor transfer\n• Moisture proof - maintains freshness\n• FDA approved for direct food contact\n\nSuitable for all food types:\n• Acidic foods (tomatoes, citrus)\n• Dairy products\n• Meat and poultry\n• Vegetables and grains\n• Ready-to-eat meals"
        },
        {
          question: "Do foods take longer to cook when using aluminum pans?",
          answer: "Aluminum pans do not affect the amount of cooking time, however cooking times may vary based on your oven.\n\nCooking Performance:\n• Excellent heat conduction - even cooking\n• No time adjustment needed - cook as normal\n• Consistent results across different ovens\n\nFactors affecting cooking time:\n• Individual oven calibration\n• Food thickness and density\n• Oven rack position\n• Whether lid is used or removed"
        },
        {
          question: "Is Aluminum an Ideal Material for Food Containers?",
          answer: "Absolutely! Aluminum stands out as an ideal choice for crafting food containers. It's remarkably lightweight, inherently robust, and boasts exceptional thermal conductivity, all of which effectively ensure your food remains fresh and perfectly preserved.\n\nKey Advantages:\n• Lightweight - easy handling and transport\n• Robust durability - won't crack or break\n• Exceptional thermal conductivity - even heating\n• Food preservation - maintains freshness\n• Recyclable - environmentally responsible\n\nProfessional Benefits:\n• Cost-effective for commercial use\n• Stackable design for efficient storage\n• Leak-proof construction\n• Professional presentation for catering"
        },
        {
          question: "Is Aluminum Food Packaging Safe to Use?",
          answer: "Yes, aluminum food packaging is unequivocally safe. Its inert nature means it won't react with your food, which is precisely why it's so widely adopted across the food industry. As your trusted manufacturer of aluminum food containers, we consistently adhere to the most stringent safety standards, giving you complete peace of mind.\n\nSafety Certifications:\n• FDA approved for direct food contact\n• LFGB certified (European food safety)\n• BRC Global Standard for packaging\n• ISO 9001 quality management\n\nSafety Features:\n• Inert material - no chemical reactions\n• Non-toxic coating and construction\n• Heat resistant - safe at cooking temperatures\n• Food-grade aluminum meeting international standards"
        },
        {
          question: "Are Aluminum Containers Recyclable?",
          answer: "Yes, aluminum foil containers are recyclable. This material is a highly recyclable material, and recycling these products helps conserve resources and reduce waste. To recycle make sure to clean them from any food residue and place them in the recycling bin.\n\nRecycling Benefits:\n• 100% recyclable - can be recycled indefinitely\n• Energy efficient - recycling uses 95% less energy than new production\n• Resource conservation - reduces raw material demand\n• Environmental impact - significantly lower carbon footprint\n\nHow to Recycle:\n• Clean containers - remove all food residue\n• Check local guidelines - recycling programs vary\n• Place in recycling bin - with other aluminum items\n• Support circular economy - aluminum-to-aluminum recycling"
        }
      ]
    },
    ordering: {
      title: "Ordering & Pricing",
      faqs: [
        {
          question: "What is your Minimum Order Quantity (MOQ)?",
          answer: "Standard MOQ by Product Type:\n• Aluminum foil containers: 10,000 pcs/SKU\n• Aluminum foil rolls: 3,000–5,000 rolls\n• Silicone baking paper: 3,000 rolls\n\nFlexible Options:\n• Trial orders with lower quantities accepted for market testing\n• Adjusted terms available for new customers\n• Mixed loading to optimize container utilization"
        },
        {
          question: "Can I get free samples?",
          answer: "Yes, samples are Free of Charge (FOC):\n\nSample Policy:\n• Free product samples for evaluation\n• Buyer covers shipping costs only\n• Use your courier account or we quote door-to-door rates\n\nSample Options:\n• Standard products - Available immediately\n• Custom samples - Small setup fee (deducted from order)\n• Delivery time: 5–7 business days worldwide"
        },
        {
          question: "What are your payment terms?",
          answer: "Flexible Payment Options:\n\nStandard Terms:\n• T/T: 30% deposit, balance before shipment\n• Secure bank transfer process\n\nExtended Terms (Qualified Clients):\n• Net 30–60 days (Sinosure credit approval required)\n• L/C (Letter of Credit) for qualified customers\n• Multiple currencies: USD, EUR, RMB accepted\n\nSecurity & Trust:\n• Sinosure credit insurance available\n• Transparent payment process\n• Regular customer credit reviews"
        },
        {
          question: "Can you offer Net 90 or a 10% discount?",
          answer: "Value-Focused Partnership Approach:\n\nWhile Net 90 and large discounts aren't standard, we offer strategic value:\n\nValue-Added Options:\n• Free packaging upgrades and improvements\n• Bundled product solutions\n• Comprehensive logistics support\n• Technical consultation services\n\nStrategic Advantages:\n• Malaysia-origin products for U.S. tariff savings\n• Flexible terms for long-term partnerships\n• Volume-based pricing optimization\n\nOur Philosophy: Creating win-win partnerships focused on long-term value, not just lowest price."
        }
      ]
    },
    shipping: {
      title: "Shipping & Logistics",
      faqs: [
        {
          question: "What is your typical lead time?",
          answer: "Production & Delivery Timeline:\n\nFirst Orders:\n• 25–30 days after sample/packaging approval\n• Includes tooling setup and quality verification\n\nRepeat Orders:\n• 15–20 days standard production time\n• Priority scheduling for established customers\n\nUrgent Projects:\n• Contact us for rush order solutions\n• Flexible scheduling based on capacity\n• Express shipping options available"
        },
        {
          question: "Can I combine multiple SKUs in one container?",
          answer: "Yes, mixed loading fully supported:\n\nBenefits:\n• Reduce shipping costs per unit\n• Simplify inventory management\n• Optimize container utilization\n• Single documentation process\n\nFlexible Options:\n• Multiple product types in one shipment\n• Different sizes and specifications\n• Custom palletization available\n• Detailed packing lists provided"
        },
        {
          question: "What kind of packaging do you use?",
          answer: "Export-Ready, Durable Packaging:\n\nPrimary Protection:\n• Double-corrugated cartons with load testing\n• Inner PE bags for moisture protection\n• Shrink wrap/bubble film for extra security\n\nShipping Options:\n• Palletized loads on request\n• Custom color boxes for retail-ready products\n• Eco-friendly packaging (biodegradable, recyclable)\n\nQuality Assurance:\n• Load testing for sea freight\n• Moisture-resistant materials\n• Clear labeling and documentation\n• Damage-free delivery guarantee"
        },
        {
          question: "Can you help with shipping and customs?",
          answer: "Complete Logistics Support:\n\nShipping Terms Available:\n• FOB - Free On Board\n• CIF - Cost, Insurance, and Freight\n• DDP - Delivered Duty Paid\n\nDocumentation & Customs:\n• Full document preparation and booking support\n• HS code classification and customs assistance\n• Certificate of origin and trade documentation\n• Customs clearance guidance\n\nFlexible Options:\n• Dual origin capability (China or Malaysia)\n• Support for your appointed freight forwarder\n• Third-party logistics coordination\n• Express shipping for urgent orders"
        }
      ]
    },
    customization: {
      title: "Customization & Branding",
      faqs: [
        {
          question: "Do you offer custom branding and packaging?",
          answer: "Yes! Comprehensive customization available:\n\nBranding Options:\n• Logo embossing on foil lids and containers\n• Branded boxes, sleeves, labels for retail packaging\n• Custom sizes and shapes to your specifications\n• Printed silicone paper (up to 4 colors)\n\nServices Included:\n• Full private label solutions\n• Free design support from our team\n• OEM/ODM project management\n• Retail-ready packaging solutions"
        },
        {
          question: "Can We Request Custom-Designed Aluminum Foil Products from Manufacturers?",
          answer: "Certainly! We specialize in providing bespoke packaging and storage solutions tailored to your unique requirements. Whether you need specific branding, custom dimensions, or distinctive packaging features, we are fully equipped to bring your vision to life.\n\nCustom Design Services:\n• Custom dimensions - any size specification\n• Branding & printing - logos and marketing\n• Unique shapes - specialized container designs\n• Custom lids - various sealing options\n\nProcess:\n• Initial consultation - understand your needs\n• Design development - create prototypes\n• Sample approval - test and refine\n• Production - manufacture to specification\n\nApplications:\n• Airline catering - specific size requirements\n• Retail packaging - branded consumer products\n• Industrial use - specialized applications"
        },
        {
          question: "Why choose FirstAlu as your supplier?",
          answer: "Your Strategic Advantage Partner:\n\n✅ Manufacturing Excellence\n• 100% factory direct with 10+ years export experience\n• BRC, BSCI, SEDEX, ISO certified operations\n• Dual-factory setup (China + Malaysia)\n\n✅ Customer-Centric Service\n• Dedicated communication team and quick response\n• Support for both large distributors and fast-growing brands\n• Flexible solutions tailored to your market needs\n\n✅ Strategic Benefits\n• U.S.-focused solutions via Malaysia plant for tariff optimization\n• Global logistics network for efficient delivery\n• Trusted by customers across EU, USA, LATAM, and ASEAN\n\n✅ Innovation & Quality\n• Continuous product development and improvement\n• Comprehensive customization capabilities\n• Sustainable packaging solutions for modern markets"
        },
        {
          question: "How Can We Reach Aluminum Foil Product Manufacturers for Inquiries or Orders?",
          answer: "Connecting with us is incredibly straightforward! You can either visit our official website or directly contact our dedicated customer support team. We are always on hand to assist with all your inquiries and to process your orders efficiently.\n\nContact Options:\n• Website: www.disposablefoilbox.com\n• Email: jcwang0919@gmail.com\n• Phone: +86 186 3886 1012\n• WhatsApp: Available for instant messaging\n\nResponse Time:\n• Email inquiries: Within 24 hours\n• Quote requests: Within 48 hours\n• Technical support: Same day response\n• Emergency orders: Immediate assistance available\n\nWhat to Include in Your Inquiry:\n• Product specifications - size, quantity, requirements\n• Timeline needs - when you need delivery\n• Custom requirements - any special features\n• Company information - for accurate quoting"
        }
      ]
    },
    markets: {
      title: "Markets & Industries",
      faqs: [
        {
          question: "What industries do you serve?",
          answer: "Diverse Industry Coverage:\n\nFood Service & Retail:\n• Foodservice distributors - Wholesale and distribution\n• Supermarkets and retail brands - Private label solutions\n• Takeaway & restaurant chains - Volume supply programs\n\nSpecialized Markets:\n• Airline & railway catering - Certified food service solutions\n• Bakeries & baking supply chains - Professional baking products\n• Household product importers - Consumer market solutions\n\nEmerging Sectors:\n• Sustainability-focused packaging startups - Eco-friendly solutions\n• E-commerce food delivery - Packaging for online orders"
        },
        {
          question: "Which countries do you export to?",
          answer: "Global Reach: 40+ Countries Served\n\nNorth America:\n• United States, Canada\n\nEurope:\n• United Kingdom, Germany, France, Spain, Poland\n• Netherlands, Belgium, Italy, Switzerland\n\nSoutheast Asia:\n• Malaysia, Thailand, Philippines, Vietnam\n• Singapore, Indonesia, Cambodia\n\nMiddle East:\n• UAE, Saudi Arabia, Kuwait, Qatar\n\nLatin America:\n• Chile, Brazil, Colombia, Peru, Mexico\n\nGrowing Markets:\n• Australia, New Zealand, South Africa\n• Expanding presence in emerging markets"
        },
        {
          question: "Do Aluminum Foil Product Manufacturers Offer Recycling Programs for Their Goods?",
          answer: "Yes, we place a strong emphasis on sustainability. Our commitment to environmental responsibility extends to the realm of recycling. While we may not operate specific in-house recycling programs, it's important to note that aluminum foil is broadly accepted at recycling facilities worldwide. We actively encourage the responsible disposal and recycling of our products, contributing together to a greener future.\n\nOur Sustainability Commitment:\n• Eco-friendly manufacturing processes\n• Recyclable materials - 100% aluminum content\n• Partner with recycling facilities worldwide\n• Environmental education for customers\n\nRecycling Support:\n• Guidance on recycling best practices\n• Information on local facilities when available\n• Sustainable packaging for shipments\n• Carbon footprint reduction initiatives\n\nIndustry Leadership:\n• Promoting circular economy principles\n• Supporting waste reduction initiatives\n• Partnering with environmental organizations"
        }
      ]
    }
  };

  const categories = [
    { key: 'company', label: 'Company & Manufacturing' },
    { key: 'products', label: 'Products & Specifications' },
    { key: 'ordering', label: 'Ordering & Pricing' },
    { key: 'shipping', label: 'Shipping & Logistics' },
    { key: 'customization', label: 'Customization & Branding' },
    { key: 'markets', label: 'Markets & Industries' }
  ];

  const formatAnswer = (answer: string) => {
    return answer.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={index} className="font-bold text-lg mt-4 mb-2 text-black">{line.slice(2, -2)}</div>;
      } else if (line.startsWith('• ')) {
        return <div key={index} className="ml-4 mb-1 text-black">• {line.slice(2)}</div>;
      } else if (line.startsWith('✓ ')) {
        return <div key={index} className="ml-4 mb-1 text-green-600">✓ {line.slice(2)}</div>;
      } else if (line.startsWith('✅ ')) {
        return <div key={index} className="ml-4 mb-2 text-green-600 font-semibold">{line}</div>;
      } else if (line.trim() === '') {
        return <div key={index} className="mb-2"></div>;
      } else {
        return <div key={index} className="mb-1 text-black">{line}</div>;
      }
    });
  };

  return (
    <AnimatedGroup preset="slide" className="max-w-6xl mx-auto">
      {/* Category Navigation */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 text-sm md:text-base ${
                activeCategory === category.key
                  ? 'bg-white text-primary-600 shadow-lg transform scale-105'
                  : 'bg-white/20 text-black hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="space-y-4">
        {faqCategories[activeCategory]?.faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden transition-all duration-300 hover:bg-white/15"
          >
            <button
              onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
              className="w-full p-6 text-left flex justify-between items-center"
            >
              <h4 className="text-lg md:text-xl font-semibold text-black pr-4">
                {faq.question}
              </h4>
              <svg 
                className={`w-6 h-6 text-black transition-transform duration-300 flex-shrink-0 ${
                  expandedFAQ === index ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedFAQ === index && (
              <div className="px-6 pb-6">
                <div className="border-t border-gray-300 pt-4">
                  <div className="text-black leading-relaxed">
                    {formatAnswer(faq.answer)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="text-center mt-16">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-black mb-4">{t('home.faq.stillHaveQuestions')}</h3>
          <p className="text-black mb-6">
            {t('home.faq.expertTeamReady')}
          </p>
          <Button size="lg" className="px-8 py-4 text-lg rounded-xl bg-white text-primary-600 hover:bg-white/90">
            {t('home.contact.contactUsNow')}
          </Button>
        </div>
      </div>
    </AnimatedGroup>
  );
}

export default function Home() {
  const { t } = useLanguage();
  
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
                {t('home.whyChooseUs.title')}
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                {t('home.whyChooseUs.subtitle')}
              </p>
            </AnimatedGroup>
            
            <AnimatedGroup preset="slide" className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center p-8 bg-background/50 backdrop-blur-sm rounded-2xl border shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-4">{t('home.whyChooseUs.features.quality.title')}</h3>
                <p>
                  {t('home.whyChooseUs.features.quality.description')}
                </p>
              </div>
              
              <div className="text-center p-8 bg-background/50 backdrop-blur-sm rounded-2xl border shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="mb-4">{t('home.whyChooseUs.features.wholesale.title')}</h3>
                <p>
                  {t('home.whyChooseUs.features.wholesale.description')}
                </p>
              </div>
              
              <div className="text-center p-8 bg-background/50 backdrop-blur-sm rounded-2xl border shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-4">{t('home.whyChooseUs.features.global.title')}</h3>
                <p>
                  {t('home.whyChooseUs.features.global.description')}
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
                {t('home.ourProducts.title')}
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                {t('home.ourProducts.subtitle')}
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
                    {t('home.products.items.aluminumFoil.title')}
                  </h3>
                  <p className="product-card-description">
                    {t('home.products.items.aluminumFoil.description')}
                  </p>
                  <Link href="/products" className="product-card-button group">
                    {t('home.products.learnMore')}
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
                    {t('home.products.items.kitchenPapers.title')}
                  </h3>
                  <p className="product-card-description">
                    {t('home.products.items.kitchenPapers.description')}
                  </p>
                  <Link href="/products" className="product-card-button group">
                    {t('home.products.learnMore')}
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
                    {t('home.products.items.aluminumContainers.title')}
                  </h3>
                  <p className="product-card-description">
                    {t('home.products.items.aluminumContainers.description')}
                  </p>
                  <Link href="/products" className="product-card-button group">
                    {t('home.products.learnMore')} 
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
                    {t('home.products.items.kraftPackaging.title')}
                  </h3>
                  <p className="product-card-description">
                    {t('home.products.items.kraftPackaging.description')}
                  </p>
                  <Link href="/products" className="product-card-button group">
                    {t('home.products.learnMore')}
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
                    {t('home.products.items.paperCups.title')}
                  </h3>
                  <p className="product-card-description">
                    {t('home.products.items.paperCups.description')}
                  </p>
                  <Link href="/products" className="product-card-button group">
                    {t('home.products.learnMore')}
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
                    {t('home.products.items.woodenBamboo.title')}
                  </h3>
                  <p className="product-card-description">
                    {t('home.products.items.woodenBamboo.description')}
                  </p>
                  <Link href="/products" className="product-card-button group">
                    {t('home.products.learnMore')}
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
                {t('home.news.title')}
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                {t('home.news.subtitle')}
              </p>
            </AnimatedGroup>
            
            <AnimatedGroup preset="scale" className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-border/20 hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="h-56 relative overflow-hidden">
                  <img src="/disposablephoto/Aluminum Foil Products.webp" alt="Eco-Friendly Products" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-sm text-muted-foreground mb-2">{t('home.news.articles.article1.date')}</div>
                  <h3 className="mb-4">
                    {t('home.news.articles.article1.title')}
                  </h3>
                  <p className="mb-6 flex-grow">
                    {t('home.news.articles.article1.excerpt')}
                  </p>
                  <Button asChild variant="ghost" className="group mt-auto">
                    <Link href="/news">
                      {t('home.news.readMore')}
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-border/20 hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="h-56 relative overflow-hidden">
                  <img src="/disposablephoto/Disposable Food Boxes.webp" alt="Factory Expansion" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-sm text-muted-foreground mb-2">{t('home.news.articles.article2.date')}</div>
                  <h3 className="mb-4">
                    {t('home.news.articles.article2.title')}
                  </h3>
                  <p className="mb-6 flex-grow">
                    {t('home.news.articles.article2.excerpt')}
                  </p>
                  <Button asChild variant="ghost" className="group mt-auto">
                    <Link href="/news">
                      {t('home.news.readMore')}
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-border/20 hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="h-56 relative overflow-hidden">
                  <img src="/disposablephoto/Baking Products.webp" alt="Global Partnership" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-sm text-muted-foreground mb-2">{t('home.news.articles.article3.date')}</div>
                  <h3 className="mb-4">
                    {t('home.news.articles.article3.title')}
                  </h3>
                  <p className="mb-6 flex-grow">
                    {t('home.news.articles.article3.excerpt')}
                  </p>
                  <Button asChild variant="ghost" className="group mt-auto">
                    <Link href="/news">
                      {t('home.news.readMore')}
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
                  {t('home.news.viewAllNews')}
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
              <h2 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold text-black">
                {t('home.faq.title')}
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                {t('home.faq.subtitle')}
              </p>
            </AnimatedGroup>
            
            <FAQSection />
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
                {t('home.contact.title')}
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                {t('home.contact.subtitle')}
              </p>
            </AnimatedGroup>
            
            <AnimatedGroup preset="scale" className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl border border-border/20 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="mb-4">{t('home.contact.email.title')}</h4>
                <p className="mb-6">
                  {t('home.contact.email.description')}
                </p>
                <p className="text-primary-600 font-semibold">info@firstalu.com</p>
              </div>
              
              <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl border border-border/20 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="mb-4">{t('home.contact.phone.title')}</h4>
                <p className="mb-6">
                  {t('home.contact.phone.description')}
                </p>
                <p className="text-primary-600 font-semibold">+86 379 6415 8188</p>
              </div>
              
              <div className="bg-background/70 backdrop-blur-lg rounded-2xl shadow-xl border border-border/20 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="mb-4">{t('home.contact.office.title')}</h4>
                <p className="mb-6">
                  {t('home.contact.office.description')}
                </p>
                <p className="text-primary-600 font-semibold">Luoyang, China</p>
              </div>
            </AnimatedGroup>
            
            <AnimatedGroup preset="blur-slide" className="text-center mt-12">
              <Button size="lg" className="px-8 py-4 text-lg rounded-2xl">
                {t('home.contact.contactUsNow')}
              </Button>
            </AnimatedGroup>
          </div>
        </ModernSection>


      </main>
      <Footer />
    </>
  );
}