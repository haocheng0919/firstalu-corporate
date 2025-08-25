const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://setmygkovqgthorwhvxd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldG15Z2tvdnFndGhvcndodnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NDE0MTcsImV4cCI6MjA2OTExNzQxN30.F2v2fDlUDCrtRs0eDMl595M_FcUKwgaftsNYX9UL6t4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Paper cups category IDs and their specifications
const paperCupsCategories = [
  {
    id: '04c3504f-c6f0-49af-9361-178dd98b3173',
    slug: 'cold-drink-cups-double-pe',
    products: [
      { size: '8oz', capacity: '240ml', material: 'Double PE Coated Paper' },
      { size: '12oz', capacity: '360ml', material: 'Double PE Coated Paper' },
      { size: '16oz', capacity: '480ml', material: 'Double PE Coated Paper' }
    ]
  },
  {
    id: 'df7fda42-0608-4b54-bff8-daa52bc1e1a4',
    slug: 'cold-drink-cups-double-sides-pe-lined',
    products: [
      { size: '8oz', capacity: '240ml', material: 'Double Sides PE Lined Paper' },
      { size: '12oz', capacity: '360ml', material: 'Double Sides PE Lined Paper' },
      { size: '16oz', capacity: '480ml', material: 'Double Sides PE Lined Paper' }
    ]
  },
  {
    id: 'fae0fb17-0998-4575-9f6b-937f82e16065',
    slug: 'double-wall-cold-drink-cups',
    products: [
      { size: '8oz', capacity: '240ml', material: 'Double Wall Paper' },
      { size: '12oz', capacity: '360ml', material: 'Double Wall Paper' },
      { size: '16oz', capacity: '480ml', material: 'Double Wall Paper' }
    ]
  },
  {
    id: '4ee444b8-9670-47c1-b5fe-350283ed0d0b',
    slug: 'double-wall-cups',
    products: [
      { size: '4oz', capacity: '120ml', material: 'Double Wall Paper' },
      { size: '8oz', capacity: '240ml', material: 'Double Wall Paper' },
      { size: '12oz', capacity: '360ml', material: 'Double Wall Paper' },
      { size: '16oz', capacity: '480ml', material: 'Double Wall Paper' }
    ]
  },
  {
    id: '95238996-8109-487f-95ac-eb499dbd4d3d',
    slug: 'double-wall-paper-cups',
    products: [
      { size: '4oz', capacity: '120ml', material: 'Double Wall Paper' },
      { size: '8oz', capacity: '240ml', material: 'Double Wall Paper' },
      { size: '12oz', capacity: '360ml', material: 'Double Wall Paper' },
      { size: '16oz', capacity: '480ml', material: 'Double Wall Paper' }
    ]
  },
  {
    id: '2538378e-ad81-489f-884f-25189288a173',
    slug: 'paper-cups',
    products: [
      { size: '4oz', capacity: '120ml', material: 'Single Wall Paper' },
      { size: '6oz', capacity: '180ml', material: 'Single Wall Paper' },
      { size: '8oz', capacity: '240ml', material: 'Single Wall Paper' },
      { size: '12oz', capacity: '360ml', material: 'Single Wall Paper' },
      { size: '16oz', capacity: '480ml', material: 'Single Wall Paper' }
    ]
  },
  {
    id: 'a75388ff-bba8-43a7-937c-eec9c3228684',
    slug: 'paper-cups-double',
    products: [
      { size: '8oz', capacity: '240ml', material: 'Double Wall Paper' },
      { size: '12oz', capacity: '360ml', material: 'Double Wall Paper' },
      { size: '16oz', capacity: '480ml', material: 'Double Wall Paper' }
    ]
  },
  {
    id: '53993d78-062a-4bb8-9da6-19980a9017e6',
    slug: 'paper-cups-for-hotels',
    products: [
      { size: '6oz', capacity: '180ml', material: 'Hotel Grade Paper' },
      { size: '8oz', capacity: '240ml', material: 'Hotel Grade Paper' }
    ]
  },
  {
    id: 'be0732c6-2633-4f5b-a8d9-78722ed330cc',
    slug: 'paper-cups-hotels',
    products: [
      { size: '6oz', capacity: '180ml', material: 'Hotel Grade Paper' },
      { size: '8oz', capacity: '240ml', material: 'Hotel Grade Paper' }
    ]
  },
  {
    id: '8a2269a0-74a9-4ce7-8ca0-214e2e314c9c',
    slug: 'paper-cups-ripple',
    products: [
      { size: '8oz', capacity: '240ml', material: 'Ripple Wall Paper' },
      { size: '12oz', capacity: '360ml', material: 'Ripple Wall Paper' },
      { size: '16oz', capacity: '480ml', material: 'Ripple Wall Paper' }
    ]
  },
  {
    id: '9fc5aff7-9761-4ad8-b136-2c9f290d1f48',
    slug: 'paper-cups-single',
    products: [
      { size: '4oz', capacity: '120ml', material: 'Single Wall Paper' },
      { size: '6oz', capacity: '180ml', material: 'Single Wall Paper' },
      { size: '8oz', capacity: '240ml', material: 'Single Wall Paper' },
      { size: '12oz', capacity: '360ml', material: 'Single Wall Paper' }
    ]
  },
  {
    id: 'e61287ed-0e90-4b1f-80b6-5f31f7f72f5f',
    slug: 'ripple-wall-cups',
    products: [
      { size: '8oz', capacity: '240ml', material: 'Ripple Wall Paper' },
      { size: '12oz', capacity: '360ml', material: 'Ripple Wall Paper' },
      { size: '16oz', capacity: '480ml', material: 'Ripple Wall Paper' }
    ]
  },
  {
    id: '55f1eed9-2dda-431a-a487-f1829d77ccd1',
    slug: 'ripple-wall-paper-cups',
    products: [
      { size: '8oz', capacity: '240ml', material: 'Ripple Wall Paper' },
      { size: '12oz', capacity: '360ml', material: 'Ripple Wall Paper' },
      { size: '16oz', capacity: '480ml', material: 'Ripple Wall Paper' }
    ]
  },
  {
    id: 'f423f5ad-4686-46f2-967a-3772330bad80',
    slug: 'single-wall-cups',
    products: [
      { size: '4oz', capacity: '120ml', material: 'Single Wall Paper' },
      { size: '6oz', capacity: '180ml', material: 'Single Wall Paper' },
      { size: '8oz', capacity: '240ml', material: 'Single Wall Paper' },
      { size: '12oz', capacity: '360ml', material: 'Single Wall Paper' }
    ]
  },
  {
    id: 'e50af108-2ffc-40e7-93d2-467f488ee2eb',
    slug: 'single-wall-hotel-cups',
    products: [
      { size: '6oz', capacity: '180ml', material: 'Hotel Grade Single Wall Paper' },
      { size: '8oz', capacity: '240ml', material: 'Hotel Grade Single Wall Paper' }
    ]
  },
  {
    id: '7a66fa03-2cfb-46a7-a292-778bd40673da',
    slug: 'single-wall-paper-cups',
    products: [
      { size: '4oz', capacity: '120ml', material: 'Single Wall Paper' },
      { size: '6oz', capacity: '180ml', material: 'Single Wall Paper' },
      { size: '8oz', capacity: '240ml', material: 'Single Wall Paper' },
      { size: '12oz', capacity: '360ml', material: 'Single Wall Paper' }
    ]
  },
  {
    id: 'b7464e54-7ac4-4fd7-a7a8-1838dab879fd',
    slug: 'single-wall-printed-cups',
    products: [
      { size: '8oz', capacity: '240ml', material: 'Printed Single Wall Paper' },
      { size: '12oz', capacity: '360ml', material: 'Printed Single Wall Paper' }
    ]
  }
];

// Helper function to generate multilingual names
function generateNames(baseType, size) {
  return {
    en: `${baseType} ${size}`,
    fr: `${baseType} ${size}`,
    de: `${baseType} ${size}`,
    es: `${baseType} ${size}`
  };
}

// Helper function to generate multilingual descriptions
function generateDescriptions(baseType, size, capacity, material) {
  return {
    en: `High-quality ${baseType.toLowerCase()} in ${size} size with ${capacity} capacity. Made from premium ${material.toLowerCase()} for excellent durability and performance. Perfect for hot and cold beverages in restaurants, cafes, and events.`,
    fr: `${baseType} de haute qualité en taille ${size} avec une capacité de ${capacity}. Fabriqué à partir de ${material.toLowerCase()} de qualité supérieure pour une excellente durabilité et performance. Parfait pour les boissons chaudes et froides dans les restaurants, cafés et événements.`,
    de: `Hochwertiger ${baseType.toLowerCase()} in Größe ${size} mit ${capacity} Fassungsvermögen. Hergestellt aus hochwertigem ${material.toLowerCase()} für ausgezeichnete Haltbarkeit und Leistung. Perfekt für heiße und kalte Getränke in Restaurants, Cafés und Veranstaltungen.`,
    es: `${baseType} de alta calidad en tamaño ${size} con capacidad de ${capacity}. Hecho de ${material.toLowerCase()} premium para excelente durabilidad y rendimiento. Perfecto para bebidas calientes y frías en restaurantes, cafeterías y eventos.`
  };
}

// Helper function to generate SKU
function generateSKU(categorySlug, size) {
  const cleanSlug = categorySlug.replace(/-/g, '').toUpperCase();
  const cleanSize = size.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return `${cleanSlug}-${cleanSize}`;
}

// Function to create SVG image
function createSVGImage(productName, size, capacity) {
  return `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f8f9fa;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e9ecef;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="400" height="400" fill="#ffffff"/>
  
  <!-- Cup body -->
  <path d="M120 120 L280 120 L270 320 L130 320 Z" fill="url(#cupGradient)" stroke="#6c757d" stroke-width="2"/>
  
  <!-- Cup rim -->
  <ellipse cx="200" cy="120" rx="80" ry="8" fill="#495057" stroke="#343a40" stroke-width="1"/>
  
  <!-- Cup bottom -->
  <ellipse cx="200" cy="320" rx="70" ry="6" fill="#adb5bd" stroke="#6c757d" stroke-width="1"/>
  
  <!-- Size label -->
  <text x="200" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#495057">${size}</text>
  
  <!-- Capacity label -->
  <text x="200" y="230" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#6c757d">${capacity}</text>
  
  <!-- Product name -->
  <text x="200" y="360" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#343a40">${productName}</text>
</svg>`;
}

// Main function to create products
async function createPaperCupsProducts() {
  let totalProducts = 0;
  
  // Create images directory if it doesn't exist
  const imagesDir = path.join(__dirname, 'public', 'product_img', 'Paper Cups');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  for (const category of paperCupsCategories) {
    for (const product of category.products) {
      try {
        // Generate product data
        const productSlug = `${category.slug}-${product.size.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
        const names = generateNames('Paper Cup', product.size);
        const descriptions = generateDescriptions('Paper Cup', product.size, product.capacity, product.material);
        
        // Create SVG image
        const svgContent = createSVGImage(`Paper Cup ${product.size}`, product.size, product.capacity);
        const imagePath = path.join(imagesDir, `${productSlug}.svg`);
        fs.writeFileSync(imagePath, svgContent);
        
        // Prepare product data for Supabase
        const productData = {
          category_id: category.id,
          slug: productSlug,
          sku: generateSKU(category.slug, product.size),
          status: 'active',
          images: {
            thumbnail: `/product_img/Paper Cups/${productSlug}.svg`,
            gallery: [`/product_img/Paper Cups/${productSlug}.svg`]
          },
          technical_specs: {
            size: product.size,
            capacity: product.capacity,
            material: product.material,
            moq: '10,000 pieces',
            features: ['Food grade', 'Leak-proof', 'Eco-friendly', 'Customizable'],
            certifications: ['FDA', 'FSC', 'ISO 9001']
          },
          introduction: {
            en: `Professional ${product.size} paper cup with ${product.capacity} capacity, perfect for beverage service.`,
            fr: `Gobelet en papier professionnel ${product.size} avec une capacité de ${product.capacity}, parfait pour le service de boissons.`,
            de: `Professioneller ${product.size} Papierbecher mit ${product.capacity} Fassungsvermögen, perfekt für den Getränkeservice.`,
            es: `Vaso de papel profesional ${product.size} con capacidad de ${product.capacity}, perfecto para el servicio de bebidas.`
          },
          name_i18n: names,
          description_i18n: descriptions
        };
        
        // Upload to Supabase
        const { data, error } = await supabase
          .from('products')
          .insert([productData]);
        
        if (error) {
          console.error(`❌ Error uploading ${names.en}:`, error);
        } else {
          console.log(`✓ Successfully uploaded product: ${names.en}`);
          totalProducts++;
        }
        
      } catch (error) {
        console.error(`❌ Error processing product ${product.size} for category ${category.slug}:`, error);
      }
    }
  }
  
  console.log(`\n🎉 Successfully uploaded ${totalProducts} paper cups products!`);
}

// Run the script
createPaperCupsProducts().catch(console.error);