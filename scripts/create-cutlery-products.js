const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://setmygkovqgthorwhvxd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldG15Z2tvdnFndGhvcndodnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NDE0MTcsImV4cCI6MjA2OTExNzQxN30.F2v2fDlUDCrtRs0eDMl595M_FcUKwgaftsNYX9UL6t4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createCutleryProducts() {
  try {
    console.log('Starting cutlery products creation...');
    
    // Get cutlery category
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', 'cutlery')
      .single();
    
    if (categoryError) {
      console.error('Error finding cutlery category:', categoryError);
      return;
    }
    
    const cutleryCategoryId = categoryData.id;
    console.log('Using cutlery category ID:', cutleryCategoryId);
    
    // Get all cutlery images
    const cutleryDir = path.join(__dirname, '..', 'public', 'cutlery-images');
    if (!fs.existsSync(cutleryDir)) {
      console.error('Cutlery images directory not found:', cutleryDir);
      return;
    }
    
    const imageFiles = fs.readdirSync(cutleryDir)
      .filter(file => file.toLowerCase().endsWith('.webp'))
      .sort();
    
    console.log(`Found ${imageFiles.length} cutlery images`);
    
    // Process images in batches
    const batchSize = 10;
    const totalBatches = Math.ceil(imageFiles.length / batchSize);
    
    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const startIndex = batchIndex * batchSize;
      const endIndex = Math.min(startIndex + batchSize, imageFiles.length);
      const batchImages = imageFiles.slice(startIndex, endIndex);
      
      console.log(`Processing batch ${batchIndex + 1}/${totalBatches} (${batchImages.length} images)`);
      
      const products = [];
      const productI18n = [];
      
      for (let i = 0; i < batchImages.length; i++) {
        const imageFile = batchImages[i];
        const baseName = path.basename(imageFile, '.webp');
        const cleanName = baseName.replace(/^[-_]+/, '').replace(/[-_]+$/, '');
        
        // Generate product name from filename
        let productName = cleanName.replace(/[-_]/g, ' ').trim();
        productName = productName.charAt(0).toUpperCase() + productName.slice(1);
        
        // Create unique slug
        const slug = `cutlery-${cleanName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${Date.now()}`;
        
        // Product specifications
        const specs = {
          material: 'Wooden/Bamboo',
          length: '16-18cm',
          packaging: '100pcs/bag',
          biodegradable: true,
          compostable: true
        };
        
        // Product data
        const product = {
          slug: slug,
          category_id: cutleryCategoryId,
          status: 'active',
          images: [`https://wnqhxipawvfkjnwfzlnj.supabase.co/storage/v1/object/public/product-images/cutlery/${imageFile}`],
          specs: specs,
          technical_specs: {
            material: 'Wooden/Bamboo',
            length: '16-18cm',
            packaging: '100pcs/bag',
            biodegradable: true,
            compostable: true
          }
        };
        
        products.push(product);
        
        // Internationalized names
        const i18nData = [
          {
            product_id: null, // Will be filled after insertion
            locale: 'en',
            name: productName,
            intro: `Eco-friendly ${productName.toLowerCase()} made from sustainable materials`,
            description: `Eco-friendly ${productName.toLowerCase()} made from sustainable materials. Perfect for restaurants, events, and everyday use.`
          },
          {
            product_id: null,
            locale: 'es',
            name: `${productName} Ecológico`,
            intro: `${productName} ecológico hecho de materiales sostenibles`,
            description: `${productName} ecológico hecho de materiales sostenibles. Perfecto para restaurantes, eventos y uso diario.`
          },
          {
            product_id: null,
            locale: 'de',
            name: `Ökologischer ${productName}`,
            intro: `Ökologischer ${productName.toLowerCase()} aus nachhaltigen Materialien`,
            description: `Ökologischer ${productName.toLowerCase()} aus nachhaltigen Materialien. Perfekt für Restaurants, Veranstaltungen und den täglichen Gebrauch.`
          },
          {
            product_id: null,
            locale: 'fr',
            name: `${productName} Écologique`,
            intro: `${productName} écologique fabriqué à partir de matériaux durables`,
            description: `${productName} écologique fabriqué à partir de matériaux durables. Parfait pour les restaurants, les événements et l'utilisation quotidienne.`
          }
        ];
        
        productI18n.push(...i18nData);
      }
      
      // Insert products
      const { data: insertedProducts, error: insertError } = await supabase
        .from('products')
        .insert(products)
        .select('id');
      
      if (insertError) {
        console.error('Error inserting products:', insertError);
        continue;
      }
      
      console.log(`Inserted ${insertedProducts.length} products`);
      
      // Insert internationalized names
      let i18nIndex = 0;
      for (const product of insertedProducts) {
        for (let j = 0; j < 4; j++) {
          productI18n[i18nIndex].product_id = product.id;
          i18nIndex++;
        }
      }
      
      const { error: i18nError } = await supabase
        .from('product_i18n')
        .insert(productI18n);
      
      if (i18nError) {
        console.error('Error inserting product i18n:', i18nError);
      } else {
        console.log(`Inserted ${productI18n.length} i18n entries`);
      }
    }
    
    console.log('Cutlery products creation completed!');
    
  } catch (error) {
    console.error('Error creating cutlery products:', error);
  }
}

// Run the script
if (require.main === module) {
  createCutleryProducts();
}

module.exports = { createCutleryProducts };