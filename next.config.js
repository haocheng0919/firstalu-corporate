/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental.appDir as it's now stable in Next.js 14
  
  // Image configuration for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'setmygkovqgthorwhvxd.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  
  // Additional configuration to handle static file serving
  async rewrites() {
    return [];
  },
  
  // Use the correct key for tracing excludes on Next.js 14.2+
  outputFileTracing: true,
  experimental: {
    outputFileTracingExcludes: {
      '/**/*': ['public/cutlery-images/**/*']
    }
  }
}

module.exports = nextConfig;