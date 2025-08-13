const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// All product codes from product-images.ts
const allProductCodes = {
  smoothwallRectangle: [
    'C161-320', 'C161-475', 'C161-680', 'C166-200', 'C167-360', 
    'C184-580', 'C184-750', 'C184-930', 'C220-1050', 'C221-1025', 
    'C221-1400', 'C221-1800'
  ],
  smoothwallRound: [
    'Y120-290', 'Y180-920', 'Y180-1130', 'Y180-1370', 'Y208-1430', 
    'Y250-2000', 'Y250-2500', 'Y250-3000', 'Y250-3500'
  ],
  wrinklewallRectangle: [
    'C130', 'C142', 'C144', 'C148', 'C154', 'C165', 'C175', 'C184', 
    'C185', 'C195', 'C2', 'C205', 'C2051', 'C209', 'C214', 'C216', 
    'C220', 'C239', 'C3', 'C312', 'C314', 'C320', 'C337', 'C350', 
    'C370', 'C4', 'C430', 'C526'
  ],
  wrinklewallRound: [
    'Y120', 'Y140', 'Y176', 'Y183', 'Y1843', 'Y212', 'Y214', 'Y234', 
    'Y252', 'Y292', 'Y328', 'Y340', 'Y345', 'Y380'
  ],
  wrinklewallSquare: [
    'F160', 'F205'
  ]
};

// Product specifications for products that have detailed specs
const aluminumProductSpecs = {
  'C161-320': {
    code: 'C161-320',
    pcsPerCarton: 1000,
    top: '161×111mm',
    bottom: '140×90mm',
    height: '28mm',
    volume: '320ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'C161-475': {
    code: 'C161-475',
    pcsPerCarton: 1000,
    top: '161×111mm',
    bottom: '137×88mm',
    height: '38mm',
    volume: '475ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'C161-680': {
    code: 'C161-680',
    pcsPerCarton: 1000,
    top: '161×111mm',
    bottom: '135×85mm',
    height: '54mm',
    volume: '680ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'C166-200': {
    code: 'C166-200',
    pcsPerCarton: 1000,
    top: '166×65mm',
    bottom: '149×48mm',
    height: '28mm',
    volume: '200ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'C167-360': {
    code: 'C167-360',
    pcsPerCarton: 1000,
    top: '167×104mm',
    bottom: '126×63mm',
    height: '33mm',
    volume: '360ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'C184-580': {
    code: 'C184-580',
    pcsPerCarton: 1000,
    top: '184×128mm',
    bottom: '160×104mm',
    height: '34mm',
    volume: '580ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'C184-750': {
    code: 'C184-750',
    pcsPerCarton: 1000,
    top: '184×128mm',
    bottom: '157×101mm',
    height: '45mm',
    volume: '750ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'C184-930': {
    code: 'C184-930',
    pcsPerCarton: 1000,
    top: '184×128mm',
    bottom: '154×98mm',
    height: '57mm',
    volume: '930ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'C220-1050': {
    code: 'C220-1050',
    pcsPerCarton: 500,
    top: '220×150mm',
    bottom: '189×119mm',
    height: '45mm',
    volume: '1050ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'C221-1025': {
    code: 'C221-1025',
    pcsPerCarton: 500,
    top: '221×168mm',
    bottom: '183×130mm',
    height: '35mm',
    volume: '1025ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'C221-1400': {
    code: 'C221-1400',
    pcsPerCarton: 500,
    top: '221×168mm',
    bottom: '183×130mm',
    height: '56mm',
    volume: '1400ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'C221-1800': {
    code: 'C221-1800',
    pcsPerCarton: 500,
    top: '221×168mm',
    bottom: '178×125mm',
    height: '75mm',
    volume: '1800ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'Y120-290': {
    code: 'Y120-290',
    pcsPerCarton: 1000,
    top: '120mm',
    bottom: '98mm',
    height: '36mm',
    volume: '290ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'Y180-920': {
    code: 'Y180-920',
    pcsPerCarton: 500,
    top: '180mm',
    bottom: '150mm',
    height: '47mm',
    volume: '920ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'Y180-1130': {
    code: 'Y180-1130',
    pcsPerCarton: 500,
    top: '180mm',
    bottom: '147mm',
    height: '60mm',
    volume: '1130ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'Y180-1370': {
    code: 'Y180-1370',
    pcsPerCarton: 500,
    top: '180mm',
    bottom: '141mm',
    height: '80mm',
    volume: '1370ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'Y208-1430': {
    code: 'Y208-1430',
    pcsPerCarton: 500,
    top: '208×197mm',
    bottom: '154mm',
    height: '65mm',
    volume: '1430ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'Y250-2000': {
    code: 'Y250-2000',
    pcsPerCarton: 200,
    top: '250mm',
    bottom: '212mm',
    height: '56mm',
    volume: '2000ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'Y250-2500': {
    code: 'Y250-2500',
    pcsPerCarton: 200,
    top: '250mm',
    bottom: '209mm',
    height: '68mm',
    volume: '2500ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'Y250-3000': {
    code: 'Y250-3000',
    pcsPerCarton: 200,
    top: '250mm',
    bottom: '204mm',
    height: '85mm',
    volume: '3000ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'Y250-3500': {
    code: 'Y250-3500',
    pcsPerCarton: 200,
    top: '250mm',
    bottom: '201mm',
    height: '100mm',
    volume: '3500ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  }
};

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Category mapping
const categoryMapping = {
  smoothwallRectangle: 'smoothwall-aluminum-foil-container-rectangle',
  smoothwallRound: 'smoothwall-aluminum-foil-container-round',
  wrinklewallRectangle: 'wrinklewall-aluminum-foil-container-rectangle',
  wrinklewallRound: 'wrinklewall-aluminum-foil-container-round',
  wrinklewallSquare: 'wrinklewall-aluminum-foil-container-square'
};

// Get category ID by slug
async function getCategoryId(slug) {
  const { data, error } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error(`Error finding category ${slug}:`, error);
    return null;
  }
  
  return data?.id;
}

// Create product in database
async function createProduct(productCode, categoryId, productSpec = null) {
  const defaultDescription = 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.';
  
  const productData = {
    slug: productCode.toLowerCase(),
    sku: productCode,
    status: 'published',
    category_id: categoryId,
    images: null,
    specs: productSpec ? {
      code: productSpec.code,
      pcsPerCarton: productSpec.pcsPerCarton,
      top: productSpec.top,
      bottom: productSpec.bottom,
      height: productSpec.height,
      volume: productSpec.volume,
      description: productSpec.description,
      applications: productSpec.applications
    } : {
      code: productCode,
      description: defaultDescription
    },
    technical_specs: productSpec ? {
      en: `Top: ${productSpec.top}\nBottom: ${productSpec.bottom}\nHeight: ${productSpec.height}\nVolume: ${productSpec.volume || 'N/A'}\nPcs per Carton: ${productSpec.pcsPerCarton}\n\nApplications:\n${productSpec.applications.map(app => `• ${app}`).join('\n')}`,
      es: `Superior: ${productSpec.top}\nInferior: ${productSpec.bottom}\nAltura: ${productSpec.height}\nVolumen: ${productSpec.volume || 'N/A'}\nPiezas por Cartón: ${productSpec.pcsPerCarton}\n\nAplicaciones:\n${productSpec.applications.map(app => `• ${app}`).join('\n')}`,
      de: `Oben: ${productSpec.top}\nUnten: ${productSpec.bottom}\nHöhe: ${productSpec.height}\nVolumen: ${productSpec.volume || 'N/A'}\nStück pro Karton: ${productSpec.pcsPerCarton}\n\nAnwendungen:\n${productSpec.applications.map(app => `• ${app}`).join('\n')}`,
      fr: `Haut: ${productSpec.top}\nBas: ${productSpec.bottom}\nHauteur: ${productSpec.height}\nVolume: ${productSpec.volume || 'N/A'}\nPièces par Carton: ${productSpec.pcsPerCarton}\n\nApplications:\n${productSpec.applications.map(app => `• ${app}`).join('\n')}`
    } : {
      en: `Product Code: ${productCode}\nProfessional aluminum foil container for various food service applications.`,
      es: `Código de Producto: ${productCode}\nContenedor profesional de papel de aluminio para diversas aplicaciones de servicio de alimentos.`,
      de: `Produktcode: ${productCode}\nProfessioneller Aluminiumfolienbehälter für verschiedene Lebensmittelservice-Anwendungen.`,
      fr: `Code Produit: ${productCode}\nConteneur professionnel en papier d'aluminium pour diverses applications de service alimentaire.`
    }
  };

  const { data, error } = await supabase
    .from('products')
    .insert(productData)
    .select()
    .single();

  if (error) {
    console.error(`Error creating product ${productCode}:`, error);
    return null;
  }

  console.log(`✅ Created product: ${productCode}`);
  return data;
}

// Main import function
async function importProducts() {
  console.log('Starting product import...');
  
  // Get category IDs
  const categoryIds = {};
  for (const [categoryType, categorySlug] of Object.entries(categoryMapping)) {
    categoryIds[categoryType] = await getCategoryId(categorySlug);
    if (!categoryIds[categoryType]) {
      console.error(`Could not find category: ${categorySlug}`);
      return;
    }
    console.log(`${categoryType} category ID: ${categoryIds[categoryType]}`);
  }
  
  let successCount = 0;
  let errorCount = 0;
  
  // Import all products from allProductCodes
  for (const [categoryType, productCodes] of Object.entries(allProductCodes)) {
    const categoryId = categoryIds[categoryType];
    
    for (const productCode of productCodes) {
      try {
        // Check if we have detailed specs for this product
        const productSpec = aluminumProductSpecs[productCode] || null;
        
        const result = await createProduct(productCode, categoryId, productSpec);
        if (result) {
          successCount++;
        } else {
          errorCount++;
        }
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error processing product ${productCode}:`, error);
        errorCount++;
      }
    }
  }
  
  // Calculate total products
  const totalProducts = Object.values(allProductCodes).reduce((sum, codes) => sum + codes.length, 0);
  
  console.log(`\n📊 Import Summary:`);
  console.log(`✅ Successfully imported: ${successCount} products`);
  console.log(`❌ Errors: ${errorCount} products`);
  console.log(`📦 Total products to import: ${totalProducts}`);
  console.log(`📋 Products with detailed specs: ${Object.keys(aluminumProductSpecs).length}`);
}

// Run the import
importProducts().catch(console.error);