const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://setmygkovqgthorwhvxd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldG15Z2tvdnFndGhvcndodnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NDE0MTcsImV4cCI6MjA2OTExNzQxN30.F2v2fDlUDCrtRs0eDMl595M_FcUKwgaftsNYX9UL6t4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Aluminum Foil categories with their IDs
const aluminumFoilCategories = [
  {
    id: '61534b79-37af-4bce-874a-560082a2b551',
    slug: 'aluminum-foil',
    name: 'Aluminum Foil'
  },
  {
    id: 'f1312956-2350-4839-96fb-5b2dd97d8189',
    slug: 'aluminum-foil-container',
    name: 'Aluminum Foil Container'
  },
  {
    id: 'b356db70-3821-46d3-ac74-10a9bb0d6425',
    slug: 'aluminum-foil-roll',
    name: 'Aluminum Foil Roll'
  },
  {
    id: '8ab9d6a3-4ada-498c-9fa6-686e4acff4c8',
    slug: 'aluminum-foil-sheets',
    name: 'Aluminum Foil Sheets'
  },
  {
    id: '5703e02d-ee81-441c-bd6a-8212390c12c7',
    slug: 'foil-sheets',
    name: 'Foil Sheets'
  },
  {
    id: '1bc4f7b0-3ba8-4b70-82c6-e5056fcd3a8b',
    slug: 'hairdressing-foil-roll',
    name: 'Hairdressing Foil Roll'
  },
  {
    id: 'dbe4fcc1-7c21-41e3-8b02-3505e598c51b',
    slug: 'pop-up-foil-sheets',
    name: 'Pop-up Foil Sheets'
  }
];

// Product templates for different aluminum foil types
const productTemplates = {
  'aluminum-foil': [
    { size: '12x10.75', thickness: '0.0007', description: 'Standard aluminum foil for food packaging' },
    { size: '18x500', thickness: '0.0008', description: 'Heavy duty aluminum foil roll' },
    { size: '24x1000', thickness: '0.001', description: 'Extra heavy duty aluminum foil' }
  ],
  'aluminum-foil-container': [
    { size: '8.5x6.5x1.5', capacity: '24oz', description: 'Rectangular aluminum container' },
    { size: '9x13x2', capacity: '64oz', description: 'Large rectangular aluminum container' },
    { size: '8x8x2', capacity: '32oz', description: 'Square aluminum container' },
    { size: '10x8x1.5', capacity: '40oz', description: 'Oblong aluminum container' }
  ],
  'aluminum-foil-roll': [
    { size: '12x25', weight: '25sqft', description: 'Standard household aluminum foil roll' },
    { size: '12x75', weight: '75sqft', description: 'Family size aluminum foil roll' },
    { size: '18x500', weight: '500sqft', description: 'Commercial aluminum foil roll' }
  ],
  'aluminum-foil-sheets': [
    { size: '12x10.75', count: '500', description: 'Pre-cut aluminum foil sheets' },
    { size: '9x10.75', count: '1000', description: 'Small pre-cut aluminum foil sheets' },
    { size: '16x24', count: '200', description: 'Large pre-cut aluminum foil sheets' }
  ],
  'foil-sheets': [
    { size: '9x10.75', count: '500', description: 'Standard foil sheets for food service' },
    { size: '12x10.75', count: '500', description: 'Medium foil sheets for catering' },
    { size: '16x24', count: '200', description: 'Large foil sheets for commercial use' }
  ],
  'hairdressing-foil-roll': [
    { size: '4x250', thickness: '0.0005', description: 'Professional hairdressing foil roll' },
    { size: '5x250', thickness: '0.0005', description: 'Wide hairdressing foil roll' },
    { size: '4x500', thickness: '0.0005', description: 'Long hairdressing foil roll' }
  ],
  'pop-up-foil-sheets': [
    { size: '9x10.75', count: '500', description: 'Pop-up aluminum foil sheets dispenser' },
    { size: '12x10.75', count: '500', description: 'Large pop-up aluminum foil sheets' },
    { size: '10x12', count: '300', description: 'Square pop-up aluminum foil sheets' }
  ]
};

// Helper functions
function generateNames(categoryName, productSpec) {
  const baseName = `${categoryName} ${productSpec.size}`;
  return {
    en: baseName,
    de: baseName.replace('Aluminum Foil', 'Aluminiumfolie'),
    fr: baseName.replace('Aluminum Foil', 'Papier d\'aluminium'),
    es: baseName.replace('Aluminum Foil', 'Papel de aluminio')
  };
}

function generateDescriptions(categoryName, productSpec) {
  const baseDesc = productSpec.description;
  return {
    en: baseDesc,
    de: baseDesc.replace('aluminum', 'Aluminium').replace('foil', 'folie'),
    fr: baseDesc.replace('aluminum foil', 'papier d\'aluminium'),
    es: baseDesc.replace('aluminum foil', 'papel de aluminio')
  };
}

function generateSKU(categorySlug, index) {
  const prefix = categorySlug.replace(/-/g, '').toUpperCase().substring(0, 6);
  return `${prefix}${String(index + 1).padStart(3, '0')}`;
}

// Create generic aluminum foil product image
function createAluminumFoilSVG(productName, size) {
  return `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="foilGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#E8E8E8;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#F5F5F5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#DCDCDC;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="packageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4A90E2;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#357ABD;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="400" height="300" fill="#FFFFFF"/>
  
  <!-- Package Box -->
  <rect x="50" y="50" width="300" height="200" rx="10" fill="url(#packageGradient)" stroke="#2C5F8A" stroke-width="2"/>
  
  <!-- Foil Roll/Sheet -->
  <rect x="80" y="80" width="240" height="140" rx="5" fill="url(#foilGradient)" stroke="#CCCCCC" stroke-width="1"/>
  
  <!-- Shine effect -->
  <rect x="90" y="90" width="20" height="120" fill="#FFFFFF" opacity="0.3"/>
  <rect x="130" y="90" width="15" height="120" fill="#FFFFFF" opacity="0.2"/>
  <rect x="170" y="90" width="25" height="120" fill="#FFFFFF" opacity="0.3"/>
  
  <!-- Product Name -->
  <text x="200" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#333">${productName}</text>
  
  <!-- Size Label -->
  <text x="200" y="280" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#666">${size}</text>
  
  <!-- Brand Logo Area -->
  <rect x="60" y="60" width="80" height="30" fill="#FFFFFF" opacity="0.9" rx="5"/>
  <text x="100" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#2C5F8A">FirstAlu</text>
</svg>`;
}

async function uploadProducts() {
  let totalProducts = 0;
  
  try {
    // Create product images directory if it doesn't exist
    const imagesDir = path.join(__dirname, 'public', 'product_img', 'Aluminum-Foil');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    for (const category of aluminumFoilCategories) {
      const templates = productTemplates[category.slug] || [];
      
      for (let i = 0; i < templates.length; i++) {
        const template = templates[i];
        const productSlug = `${category.slug}-${template.size.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
        
        // Generate product names and descriptions
        const names = generateNames(category.name, template);
        const descriptions = generateDescriptions(category.name, template);
        
        // Create product image
        const imageName = `${productSlug}.svg`;
        const imagePath = path.join(imagesDir, imageName);
        const svgContent = createAluminumFoilSVG(names.en, template.size);
        fs.writeFileSync(imagePath, svgContent);
        
        // Prepare product data
        const productData = {
          category_id: category.id,
          slug: productSlug,
          sku: generateSKU(category.slug, i),
          status: 'active',
          images: {
            thumbnail: `/product_img/Aluminum-Foil/${imageName}`,
            gallery: [`/product_img/Aluminum-Foil/${imageName}`]
          },
          technical_specs: {
            moq: '10000 pcs',
            material: 'Food Grade Aluminum',
            features: ['Food Safe', 'Heat Resistant', 'Recyclable', 'Moisture Proof'],
            certifications: ['FDA Approved', 'LFGB Certified'],
            size: template.size,
            thickness: template.thickness || 'Standard',
            capacity: template.capacity || 'N/A',
            weight: template.weight || 'N/A',
            count: template.count || 'N/A'
          },
          introduction: {
            en: `High-quality ${category.name.toLowerCase()} perfect for food packaging and storage applications.`,
            de: `Hochwertige ${category.name.toLowerCase()} perfekt für Lebensmittelverpackung und Lagerung.`,
            fr: `${category.name} de haute qualité parfait pour l'emballage et le stockage des aliments.`,
            es: `${category.name} de alta calidad perfecto para envasado y almacenamiento de alimentos.`
          },
          name_i18n: names,
          description_i18n: descriptions
        };
        
        // Insert product into database
        const { data, error } = await supabase
          .from('products')
          .insert([productData]);
        
        if (error) {
          console.error(`Error inserting product ${productSlug}:`, error);
        } else {
          console.log(`✓ Successfully uploaded product: ${names.en}`);
          totalProducts++;
        }
      }
    }
    
    console.log(`\n🎉 Successfully uploaded ${totalProducts} aluminum foil products!`);
    
  } catch (error) {
    console.error('Error uploading products:', error);
  }
}

// Run the upload
uploadProducts();