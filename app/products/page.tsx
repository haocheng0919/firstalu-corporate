import { PageHeader } from '@/components/ui/page-header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Round Aluminum Foil Container",
      category: "Aluminum Foil Containers",
      sizes: ["6oz", "8oz", "12oz", "16oz"],
      description: "Perfect for individual portions, soups, and sauces",
      features: ["Heat resistant", "Microwave safe", "Recyclable", "Leak-proof"],
      emoji: "🥣"
    },
    {
      id: 2,
      name: "Rectangular Aluminum Foil Container",
      category: "Aluminum Foil Containers", 
      sizes: ["500ml", "750ml", "1000ml", "1500ml"],
      description: "Ideal for main dishes, casseroles, and family meals",
      features: ["Stackable design", "Oven safe", "Freezer safe", "Durable"],
      emoji: "🥡"
    },
    {
      id: 3,
      name: "Compartment Food Boxes",
      category: "Disposable Food Boxes",
      sizes: ["2-compartment", "3-compartment", "4-compartment"],
      description: "Multi-section boxes for complete meals",
      features: ["Eco-friendly", "Grease resistant", "Biodegradable", "Secure closure"],
      emoji: "📦"
    },
    {
      id: 4,
      name: "Kraft Paper Food Boxes",
      category: "Disposable Food Boxes",
      sizes: ["Small", "Medium", "Large", "Extra Large"],
      description: "Natural kraft paper boxes for eco-conscious businesses",
      features: ["100% recyclable", "Food grade", "Customizable", "Strong construction"],
      emoji: "📋"
    },
    {
      id: 5,
      name: "Bamboo Chopsticks",
      category: "Disposable Utensils",
      sizes: ["21cm", "23cm", "24cm"],
      description: "Premium bamboo chopsticks for authentic dining experience",
      features: ["Sustainable bamboo", "Smooth finish", "Splinter-free", "Individually wrapped"],
      emoji: "🥢"
    },
    {
      id: 6,
      name: "Wooden Chopsticks",
      category: "Disposable Utensils",
      sizes: ["20cm", "21cm", "23cm"],
      description: "Traditional wooden chopsticks for Asian cuisine",
      features: ["Natural wood", "Heat resistant", "Comfortable grip", "Bulk packaging"],
      emoji: "🍴"
    }
  ];

  const categories = [
    {
      name: "Aluminum Foil Containers",
      description: "Durable and heat-resistant containers perfect for takeaway and food delivery services.",
      icon: "🥡",
      count: products.filter(p => p.category === "Aluminum Foil Containers").length
    },
    {
      name: "Disposable Food Boxes", 
      description: "Eco-friendly food boxes available in various sizes for different food types.",
      icon: "📦",
      count: products.filter(p => p.category === "Disposable Food Boxes").length
    },
    {
      name: "Disposable Utensils",
      description: "High-quality wooden and bamboo chopsticks for Asian cuisine restaurants.",
      icon: "🥢", 
      count: products.filter(p => p.category === "Disposable Utensils").length
    }
  ];

  return (
    <>
      <PageHeader 
        title="Our Products"
        description="Premium Disposable Food Packaging Solutions - MOQ: 100 boxes per product"
        backgroundImage="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1920&h=1080&fit=crop&auto=format"
      />
      <main>

        {/* Categories Overview */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="mb-8">
                Product Categories
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Explore our comprehensive range of food packaging solutions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <div key={index} className="bg-secondary-50 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">{category.icon}</div>
                  <h3 className="mb-3">
                    {category.name}
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    {category.description}
                  </p>
                  <div className="text-primary-600 font-semibold">
                    {category.count} Products Available
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding bg-secondary-50">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="mb-8">
                Featured Products
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                High-quality packaging solutions for your business needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <div className="text-8xl">{product.emoji}</div>
                  </div>
                  
                  <div className="p-6">
                    <div className="text-sm text-primary-600 font-medium mb-2">
                      {product.category}
                    </div>
                    <h3 className="mb-3">
                      {product.name}
                    </h3>
                    <p className="text-secondary-600 mb-4">
                      {product.description}
                    </p>
                    
                    {/* Sizes */}
                    <div className="mb-4">
                      <div className="text-sm font-medium text-secondary-700 mb-2">Available Sizes:</div>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size, index) => (
                          <span key={index} className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="mb-6">
                      <div className="text-sm font-medium text-secondary-700 mb-2">Key Features:</div>
                      <ul className="text-sm text-secondary-600 space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <svg className="w-4 h-4 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link href="/contact" className="btn-primary w-full text-center">
                      Request Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-16">
              <h2 className="mb-8">
                Product Specifications
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Detailed information about our packaging solutions
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="mb-6">Quality Standards</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-medium text-secondary-900">FDA Approved</div>
                      <div className="text-secondary-600">All products meet FDA food safety standards</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-medium text-secondary-900">ISO Certified</div>
                      <div className="text-secondary-600">ISO 9001:2015 quality management certification</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-medium text-secondary-900">BRC Certified</div>
                      <div className="text-secondary-600">British Retail Consortium food safety standard</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="mb-6">Packaging & Shipping</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <div>
                      <div className="font-medium text-secondary-900">Secure Packaging</div>
                      <div className="text-secondary-600">Products packed in sturdy cartons for safe transport</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-medium text-secondary-900">Fast Delivery</div>
                      <div className="text-secondary-600">7-14 business days for international shipping</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <div className="font-medium text-secondary-900">Quality Guarantee</div>
                      <div className="text-secondary-600">100% satisfaction guarantee on all orders</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary-600">
          <div className="container-max text-center">
            <h2 className="text-white mb-8">
              Ready to Place Your Order?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Contact our sales team for custom quotes and bulk pricing. We're here to help you find the perfect packaging solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Get Custom Quote
              </Link>
              <Link href="/faq" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                View FAQ
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}