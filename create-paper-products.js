const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://setmygkovqgthorwhvxd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldG15Z2tvdnFndGhvcndodnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NDE0MTcsImV4cCI6MjA2OTExNzQxN30.F2v2fDlUDCrtRs0eDMl595M_FcUKwgaftsNYX9UL6t4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Paper containers category ID
const PAPER_CONTAINERS_CATEGORY_ID = '80eda00d-de19-4c6e-8af5-be818b6dcb74';

// Function to get all paper container image files
function getAllPaperContainerImages() {
  // Since the original paper container images were removed during build fix,
  // we'll create sample products with placeholder images
  const sampleProducts = [
    { folder: '1.', filename: '纸盒_001_小号白色.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '1.', filename: '纸盒_002_小号棕色.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '2.', filename: '纸盒_003_中号白色.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '2.', filename: '纸盒_004_中号棕色.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '3.', filename: '纸盒_005_大号白色.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '3.', filename: '纸盒_006_大号棕色.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '4.', filename: '汤盒_001_500ml白色.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '4.', filename: '汤盒_002_750ml白色.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '5.', filename: '沙拉盒_001_圆形透明盖.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '5.', filename: '沙拉盒_002_方形透明盖.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '6.', filename: '快餐盒_001_三格白色.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '6.', filename: '快餐盒_002_单格白色.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '7.', filename: '打包盒_001_小号牛皮纸.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '7.', filename: '打包盒_002_大号牛皮纸.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '8.', filename: '寿司盒_001_透明盖.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '8.', filename: '寿司盒_002_黑色底.webp', fullPath: 'disposablephoto/Disposable Food Boxes.webp' },
    { folder: '9.', filename: '冷饮杯_001_12oz白色.webp', fullPath: 'disposablephoto/Disposable Cups.webp' },
    { folder: '9.', filename: '冷饮杯_002_16oz白色.webp', fullPath: 'disposablephoto/Disposable Cups.webp' },
    { folder: '10.', filename: '热饮杯_001_8oz棕色.webp', fullPath: 'disposablephoto/Disposable Cups.webp' },
    { folder: '10.', filename: '热饮杯_002_12oz棕色.webp', fullPath: 'disposablephoto/Disposable Cups.webp' }
  ];
  
  return sampleProducts;
}

// Function to generate product name from filename
function generateProductName(filename, folder) {
  // Remove .webp extension
  let name = filename.replace('.webp', '');
  
  // Clean up common patterns
  name = name.replace(/^_\d+_/, ''); // Remove _0000_ prefix
  name = name.replace(/^\d+_\d+_/, ''); // Remove 4_0000_ prefix
  
  // Convert to readable format
  if (name.includes('oz')) {
    name = name.replace(/oz/g, ' oz');
  }
  if (name.includes('ml')) {
    name = name.replace(/ml/g, ' ml');
  }
  if (name.includes('mm')) {
    name = name.replace(/mm/g, ' mm');
  }
  
  // Add descriptive prefix based on folder
  const folderDescriptions = {
    '1': 'Paper Cup',
    '2': 'Paper Bowl',
    '3': 'Paper Container',
    '4': 'Large Paper Cup',
    '5': 'Paper Food Container',
    '6': 'Paper Takeaway Box',
    '7': 'Paper Drink Cup',
    '8': 'Paper Soup Cup',
    '9': 'Paper Coffee Cup',
    '10': 'Paper Hot Cup',
    '11': 'Paper Cold Cup'
  };
  
  const prefix = folderDescriptions[folder] || 'Paper Container';
  return `${prefix} ${name}`.trim();
}

// Function to generate SKU
function generateSKU(filename, folder) {
  let sku = filename.replace('.webp', '').toUpperCase();
  sku = sku.replace(/[^A-Z0-9]/g, '');
  return `PC${folder.padStart(2, '0')}-${sku}`;
}

// Function to generate specs based on filename
function generateSpecs(filename, productName) {
  const specs = {
    material: 'Paper',
    type: 'Disposable Container',
    color: 'Natural/White',
    features: ['Biodegradable', 'Food Safe', 'Disposable'],
    applications: ['Food Service', 'Takeaway', 'Catering', 'Events']
  };
  
  // Extract size information
  const ozMatch = filename.match(/(\d+(?:\.\d+)?)oz/);
  const mlMatch = filename.match(/(\d+)ml/);
  const mmMatch = filename.match(/(\d+)mm/);
  
  if (ozMatch) {
    specs.capacity = `${ozMatch[1]} oz`;
    specs.volume = `${Math.round(parseFloat(ozMatch[1]) * 29.5735)} ml`;
  } else if (mlMatch) {
    specs.capacity = `${mlMatch[1]} ml`;
    specs.volume = `${mlMatch[1]} ml`;
  }
  
  if (mmMatch) {
    specs.diameter = `${mmMatch[1]} mm`;
  }
  
  return specs;
}

// Function to generate technical specs
function generateTechnicalSpecs(productName, specs) {
  return {
    en: {
      description: `High-quality ${productName.toLowerCase()} made from food-grade paper. Perfect for food service and takeaway applications.`,
      specifications: {
        'Material': specs.material,
        'Type': specs.type,
        'Capacity': specs.capacity || 'Various sizes',
        'Color': specs.color,
        'Features': specs.features.join(', ')
      },
      applications: specs.applications,
      certifications: ['Food Grade', 'Biodegradable']
    },
    es: {
      description: `${productName} de alta calidad hecho de papel apto para alimentos. Perfecto para servicio de comida y aplicaciones para llevar.`,
      specifications: {
        'Material': 'Papel',
        'Tipo': 'Contenedor Desechable',
        'Capacidad': specs.capacity || 'Varios tamaños',
        'Color': 'Natural/Blanco',
        'Características': 'Biodegradable, Apto para Alimentos, Desechable'
      },
      applications: ['Servicio de Comida', 'Para Llevar', 'Catering', 'Eventos'],
      certifications: ['Grado Alimentario', 'Biodegradable']
    },
    de: {
      description: `Hochwertiger ${productName.toLowerCase()} aus lebensmittelechtem Papier. Perfekt für Gastronomie und Takeaway-Anwendungen.`,
      specifications: {
        'Material': 'Papier',
        'Typ': 'Einwegbehälter',
        'Kapazität': specs.capacity || 'Verschiedene Größen',
        'Farbe': 'Natur/Weiß',
        'Eigenschaften': 'Biologisch abbaubar, Lebensmittelsicher, Einweg'
      },
      applications: ['Gastronomie', 'Takeaway', 'Catering', 'Veranstaltungen'],
      certifications: ['Lebensmittelqualität', 'Biologisch abbaubar']
    },
    fr: {
      description: `${productName} de haute qualité fabriqué en papier de qualité alimentaire. Parfait pour la restauration et les applications à emporter.`,
      specifications: {
        'Matériau': 'Papier',
        'Type': 'Conteneur Jetable',
        'Capacité': specs.capacity || 'Diverses tailles',
        'Couleur': 'Naturel/Blanc',
        'Caractéristiques': 'Biodégradable, Sûr pour les Aliments, Jetable'
      },
      applications: ['Service Alimentaire', 'À Emporter', 'Traiteur', 'Événements'],
      certifications: ['Qualité Alimentaire', 'Biodégradable']
    }
  };
}

// Main function to create products
async function createPaperContainerProducts() {
  try {
    console.log('Starting paper container product creation...');
    
    const images = getAllPaperContainerImages();
    console.log(`Found ${images.length} paper container images`);
    
    const products = [];
    
    for (const image of images) {
      const productName = generateProductName(image.filename, image.folder);
      const sku = generateSKU(image.filename, image.folder);
      const baseSlug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const slug = `${baseSlug}-${image.folder.replace('.', '')}-${image.filename.replace('.webp', '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const specs = generateSpecs(image.filename, productName);
      const technicalSpecs = generateTechnicalSpecs(productName, specs);
      
      const product = {
        category_id: PAPER_CONTAINERS_CATEGORY_ID,
        slug: slug,
        sku: sku,
        status: 'active',
        images: {
          thumbnail: `https://setmygkovqgthorwhvxd.supabase.co/storage/v1/object/public/product-images/${image.fullPath}`,
          additional: []
        },
        specs: specs,
        technical_specs: technicalSpecs
      };
      
      products.push(product);
    }
    
    // Insert products in batches
    const batchSize = 10;
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('products')
        .insert(batch);
      
      if (error) {
        console.error('Error inserting batch:', error);
        throw error;
      }
      
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(products.length / batchSize)}`);
    }
    
    console.log(`Successfully created ${products.length} paper container products!`);
    
    // Display some examples
    console.log('\nSample products created:');
    products.slice(0, 5).forEach(product => {
      console.log(`- ${product.sku}: ${product.slug}`);
    });
    
  } catch (error) {
    console.error('Error creating paper container products:', error);
  }
}

// Run the script
createPaperContainerProducts();