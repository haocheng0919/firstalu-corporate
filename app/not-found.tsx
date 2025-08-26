import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image 
            src="/logo/firstalu_logo.webp" 
            alt="First Aluminum Technology" 
            width={120} 
            height={60}
            className="mx-auto"
          />
        </div>

        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-gray-200 select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                <svg 
                  className="w-12 h-12 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to exploring our premium packaging solutions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
            Back to Home
          </Link>
          
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 5l7 7-7 7" 
              />
            </svg>
            View Products
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Popular Categories</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: 'Aluminum Foil', href: '/products/aluminum-foil' },
              { name: 'Paper Cups', href: '/products/paper-cups' },
              { name: 'Kraft Packaging', href: '/products/kraft-packaging' },
              { name: 'Disposable Cutlery', href: '/products/disposable-cutlery' }
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gray-100 rounded-full opacity-30 animate-float-delayed"></div>
      </div>
    </div>
  )
}
