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



        {/* Products Grid */}
        <section className="section-padding bg-secondary-50">
          <div className="container-max">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                       src={`/disposablephoto/${
                         product.category === 'Aluminum Foil Containers' && product.name.includes('Round') ? 'Aluminum Foil Containers.webp' :
                         product.category === 'Aluminum Foil Containers' && product.name.includes('Rectangular') ? 'Aluminum Foil Products.webp' :
                         product.category === 'Disposable Food Boxes' && product.name.includes('Compartment') ? 'Disposable Food Boxes.webp' :
                         product.category === 'Disposable Food Boxes' && product.name.includes('Kraft') ? 'Baking Products.webp' :
                         product.category === 'Disposable Chopsticks' && product.name.includes('Bamboo') ? 'Disposable Chopsticks.webp' :
                         product.category === 'Disposable Chopsticks' && product.name.includes('Wooden') ? 'Disposable Chopsticks.webp' :
                         'Aluminum Foil Products.webp'
                       }`}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
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
              <Link href="/#contact" className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
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