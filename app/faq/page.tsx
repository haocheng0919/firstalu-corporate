import Footer from '@/components/Footer';
import { PageHeader } from '@/components/ui/page-header';

export default function FAQPage() {
  return (
    <>
      <PageHeader 
        title="Frequently Asked Questions"
        description="Find answers to common questions about our disposable food packaging products"
      />
      
      <main className="min-h-screen">
        {/* FAQ Section */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {/* FAQ Item 1 */}
                <div className="border border-secondary-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    What materials are your products made from?
                  </h3>
                  <p className="text-secondary-600">
                    Our products are made from high-quality aluminum foil, food-grade paper, and sustainable bamboo/wood materials. All materials are FDA approved and meet international food safety standards.
                  </p>
                </div>

                {/* FAQ Item 2 */}
                <div className="border border-secondary-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    What is your minimum order quantity?
                  </h3>
                  <p className="text-secondary-600">
                    Our minimum order quantity varies by product. For aluminum foil containers, the MOQ is typically 50,000 pieces. For disposable utensils, it's 100,000 pieces. Please contact us for specific product requirements.
                  </p>
                </div>

                {/* FAQ Item 3 */}
                <div className="border border-secondary-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    How long does shipping take?
                  </h3>
                  <p className="text-secondary-600">
                    International shipping typically takes 7-14 business days depending on your location. We work with reliable shipping partners to ensure your products arrive safely and on time.
                  </p>
                </div>

                {/* FAQ Item 4 */}
                <div className="border border-secondary-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Do you offer custom packaging solutions?
                  </h3>
                  <p className="text-secondary-600">
                    Yes, we offer custom packaging solutions including custom sizes, printing, and branding options. Our design team can work with you to create packaging that meets your specific needs.
                  </p>
                </div>

                {/* FAQ Item 5 */}
                <div className="border border-secondary-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    Are your products environmentally friendly?
                  </h3>
                  <p className="text-secondary-600">
                    We are committed to sustainability. Our aluminum products are recyclable, and our wooden/bamboo utensils are made from renewable resources. We continuously work to reduce our environmental impact.
                  </p>
                </div>

                {/* FAQ Item 6 */}
                <div className="border border-secondary-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    What certifications do you have?
                  </h3>
                  <p className="text-secondary-600">
                    We hold FDA approval, ISO 9001:2015 quality management certification, and BRC food safety certification. All our products meet international quality and safety standards.
                  </p>
                </div>

                {/* FAQ Item 7 */}
                <div className="border border-secondary-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    How can I get a quote for my order?
                  </h3>
                  <p className="text-secondary-600">
                    You can request a quote by contacting us through our contact form, email, or phone. Please provide details about the products you need, quantities, and any special requirements for an accurate quote.
                  </p>
                </div>

                {/* FAQ Item 8 */}
                <div className="border border-secondary-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-secondary-600">
                    We accept various payment methods including T/T (bank transfer), L/C (letter of credit), and other secure payment options. Payment terms can be discussed based on order size and customer relationship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="section-padding bg-secondary-50">
          <div className="container-max">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-secondary-600 mb-8">
                Can't find the answer you're looking for? Our team is here to help you with any questions about our products and services.
              </p>
              <a 
                href="/contact" 
                className="bg-primary-600 text-white hover:bg-primary-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}