const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://setmygkovqgthorwhvxd.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldG15Z2tvdnFndGhvcndodnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NDE0MTcsImV4cCI6MjA2OTExNzQxN30.F2v2fDlUDCrtRs0eDMl595M_FcUKwgaftsNYX9UL6t4';

const supabase = createClient(supabaseUrl, supabaseKey);

// Sugarcane bagasse image files from storage
const imageFiles = [
  'products/sugarcane-bagasse/sb-clamshell-1.webp',
  'products/sugarcane-bagasse/sb-clamshell-2.webp',
  'products/sugarcane-bagasse/sb-clamshell-3.webp',
  'products/sugarcane-bagasse/sb-hamburg-box-1.webp',
  'products/sugarcane-bagasse/sb-hamburg-box-2.webp',
  'products/sugarcane-bagasse/sb-hamburg-box-3.webp',
  'products/sugarcane-bagasse/sb-plate-1.webp',
  'products/sugarcane-bagasse/sb-plate-2.webp',
  'products/sugarcane-bagasse/sb-plate-3.webp',
  'products/sugarcane-bagasse/sb-plate-4.webp',
  'products/sugarcane-bagasse/sb-plate-5.webp',
  'products/sugarcane-bagasse/sb-plate-6.webp',
  'products/sugarcane-bagasse/sb-plate-7.webp',
  'products/sugarcane-bagasse/sb-plate-8.webp'
];

// Category ID for sugarcane bagasse products
const CATEGORY_ID = '960fed18-8420-4e5e-a938-b4bb4853bf16';

// Function to generate product data based on image filename
function generateProductData(imageFile) {
  const filename = imageFile.split('/').pop().replace('.webp', '');
  const parts = filename.split('-');
  
  let productType = '';
  let size = '';
  let variant = '';
  
  if (filename.includes('clamshell')) {
    productType = 'Clamshell Container';
    variant = parts[parts.length - 1];
  } else if (filename.includes('hamburg-box')) {
    productType = 'Hamburg Box';
    variant = parts[parts.length - 1];
  } else if (filename.includes('plate')) {
    productType = 'Plate';
    variant = parts[parts.length - 1];
  }
  
  const slug = filename.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const sku = `SB-${filename.toUpperCase().replace(/[^A-Z0-9]+/g, '-')}`;
  
  return {
    category_id: CATEGORY_ID,
    slug: slug,
    sku: sku,
    status: 'active',
    images: {
      thumbnail: `https://setmygkovqgthorwhvxd.supabase.co/storage/v1/object/public/product-images/${imageFile}`,
      additional: [
        `https://setmygkovqgthorwhvxd.supabase.co/storage/v1/object/public/product-images/${imageFile}`
      ]
    },
    specs: {
      material: 'Sugarcane Bagasse',
      type: productType,
      variant: variant,
      color: 'Natural',
      biodegradable: true,
      compostable: true,
      microwave_safe: true,
      freezer_safe: true,
      oil_resistant: true,
      water_resistant: true,
      temperature_range: '-20°C to 120°C',
      certifications: ['FDA', 'LFGB', 'BPI'],
      applications: ['Food Service', 'Takeaway', 'Catering', 'Events']
    },
    technical_specs: {
      en: {
        name: `Sugarcane Bagasse ${productType} - ${variant}`,
        description: `Eco-friendly ${productType.toLowerCase()} made from 100% sugarcane bagasse fiber. Biodegradable, compostable, and perfect for sustainable food service. Microwave and freezer safe with excellent oil and water resistance.`,
        features: [
          '100% sugarcane bagasse fiber',
          'Biodegradable and compostable',
          'Microwave and freezer safe',
          'Oil and water resistant',
          'FDA and LFGB certified',
          'Natural color'
        ],
        applications: [
          'Restaurant takeaway',
          'Food delivery services',
          'Catering events',
          'Outdoor dining',
          'Eco-conscious businesses'
        ]
      },
      es: {
        name: `${productType} de Bagazo de Caña de Azúcar - ${variant}`,
        description: `${productType} ecológico hecho de 100% fibra de bagazo de caña de azúcar. Biodegradable, compostable y perfecto para servicios de alimentos sostenibles. Apto para microondas y congelador con excelente resistencia al aceite y agua.`,
        features: [
          '100% fibra de bagazo de caña de azúcar',
          'Biodegradable y compostable',
          'Apto para microondas y congelador',
          'Resistente al aceite y agua',
          'Certificado FDA y LFGB',
          'Color natural'
        ],
        applications: [
          'Comida para llevar de restaurantes',
          'Servicios de entrega de comida',
          'Eventos de catering',
          'Comedor al aire libre',
          'Empresas eco-conscientes'
        ]
      },
      fr: {
        name: `${productType} en Bagasse de Canne à Sucre - ${variant}`,
        description: `${productType} écologique fabriqué à partir de 100% de fibres de bagasse de canne à sucre. Biodégradable, compostable et parfait pour les services alimentaires durables. Compatible micro-ondes et congélateur avec une excellente résistance à l'huile et à l'eau.`,
        features: [
          '100% fibres de bagasse de canne à sucre',
          'Biodégradable et compostable',
          'Compatible micro-ondes et congélateur',
          'Résistant à l\'huile et à l\'eau',
          'Certifié FDA et LFGB',
          'Couleur naturelle'
        ],
        applications: [
          'Plats à emporter de restaurant',
          'Services de livraison de nourriture',
          'Événements de restauration',
          'Restauration en plein air',
          'Entreprises éco-responsables'
        ]
      },
      de: {
        name: `${productType} aus Zuckerrohr-Bagasse - ${variant}`,
        description: `Umweltfreundlicher ${productType.toLowerCase()} aus 100% Zuckerrohr-Bagasse-Fasern. Biologisch abbaubar, kompostierbar und perfekt für nachhaltigen Foodservice. Mikrowellen- und gefrierschranksicher mit ausgezeichneter Öl- und Wasserbeständigkeit.`,
        features: [
          '100% Zuckerrohr-Bagasse-Fasern',
          'Biologisch abbaubar und kompostierbar',
          'Mikrowellen- und gefrierschranksicher',
          'Öl- und wasserbeständig',
          'FDA- und LFGB-zertifiziert',
          'Natürliche Farbe'
        ],
        applications: [
          'Restaurant-Takeaway',
          'Essenslieferdienste',
          'Catering-Veranstaltungen',
          'Outdoor-Dining',
          'Umweltbewusste Unternehmen'
        ]
      }
    }
  };
}

async function createSugarcaneProducts() {
  console.log('Creating sugarcane bagasse products...');
  
  try {
    const products = imageFiles.map(generateProductData);
    
    console.log(`Generated ${products.length} products`);
    
    // Insert products into database
    const { data, error } = await supabase
      .from('products')
      .insert(products)
      .select();
    
    if (error) {
      console.error('Error inserting products:', error);
      return;
    }
    
    console.log(`Successfully created ${data.length} sugarcane bagasse products`);
    
    // Display created products
    data.forEach(product => {
      console.log(`- ${product.technical_specs.en.name} (${product.sku})`);
    });
    
  } catch (error) {
    console.error('Error creating products:', error);
  }
}

// Run the script
if (require.main === module) {
  createSugarcaneProducts();
}

module.exports = { createSugarcaneProducts, generateProductData };