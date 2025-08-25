const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://setmygkovqgthorwhvxd.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldG15Z2tvdnFndGhvcndodnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NDE0MTcsImV4cCI6MjA2OTExNzQxN30.F2v2fDlUDCrtRs0eDMl595M_FcUKwgaftsNYX9UL6t4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Category ID for sugarcane tableware
const categoryId = 'df7abf38-1878-4bf4-a11f-a3da99788ab6';

// Base directory for sugarcane tableware images
const baseDir = '/Users/haochengwang/Desktop/claude/firstalu/public/product_img/Sugarcane Tableware';

// Helper function to generate slug from folder name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to generate multilingual names
function generateNames(folderName) {
  const baseNames = {
    bowls: { en: 'Bowl', de: 'Schüssel', fr: 'Bol', es: 'Cuenco' },
    chamshell: { en: 'Clamshell Container', de: 'Muschelschalen-Behälter', fr: 'Conteneur Coquillage', es: 'Contenedor Almeja' },
    plate: { en: 'Plate', de: 'Teller', fr: 'Assiette', es: 'Plato' },
    tray: { en: 'Tray', de: 'Tablett', fr: 'Plateau', es: 'Bandeja' }
  };
  
  let category = 'tray'; // default
  if (folderName.toLowerCase().includes('bowl')) category = 'bowls';
  else if (folderName.toLowerCase().includes('chamshell')) category = 'chamshell';
  else if (folderName.toLowerCase().includes('plate')) category = 'plate';
  
  const base = baseNames[category];
  
  return {
    en: `${folderName} - ${base.en}`,
    de: `${folderName} - ${base.de}`,
    fr: `${folderName} - ${base.fr}`,
    es: `${folderName} - ${base.es}`
  };
}

// Helper function to generate multilingual descriptions
function generateDescriptions(folderName) {
  return {
    en: `Eco-friendly ${folderName.toLowerCase()} made from sustainable sugarcane bagasse. Perfect for food service and catering.`,
    de: `Umweltfreundliche ${folderName.toLowerCase()} aus nachhaltigem Zuckerrohr-Bagasse. Perfekt für Gastronomie und Catering.`,
    fr: `${folderName} écologique fabriqué à partir de bagasse de canne à sucre durable. Parfait pour la restauration et le traiteur.`,
    es: `${folderName} ecológico hecho de bagazo de caña de azúcar sostenible. Perfecto para servicios de alimentos y catering.`
  };
}

async function uploadProducts() {
  try {
    console.log('🚀 Starting sugarcane tableware product upload...');
    
    // Read all category folders in the sugarcane tableware directory
    const categoryFolders = fs.readdirSync(baseDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    console.log(`Found ${categoryFolders.length} category folders: ${categoryFolders.join(', ')}`);
    
    let totalProducts = 0;
    
    for (const categoryFolder of categoryFolders) {
      const categoryPath = path.join(baseDir, categoryFolder);
      console.log(`\n📁 Processing category: ${categoryFolder}`);
      
      // Read all product folders in this category
      const productFolders = fs.readdirSync(categoryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
      
      console.log(`   Found ${productFolders.length} products in ${categoryFolder}`);
      
      for (const folderName of productFolders) {
        try {
          const folderPath = path.join(categoryPath, folderName);
          const files = fs.readdirSync(folderPath);
          
          // Find thumbnail (1).webp and other images
          const thumbnailFile = files.find(file => file.includes('(1).webp'));
          const allImages = files.filter(file => file.endsWith('.webp'));
          
          if (!thumbnailFile) {
            console.log(`⚠️  No thumbnail found for ${folderName}, skipping...`);
            continue;
          }
        
          // Generate product data
          const productSlug = generateSlug(folderName);
          const names = generateNames(folderName);
          const descriptions = generateDescriptions(folderName);
          
          // Prepare image paths (relative to public folder)
          const thumbnailPath = `/product_img/Sugarcane Tableware/${categoryFolder}/${folderName}/${thumbnailFile}`;
          const galleryImages = allImages.map(img => `/product_img/Sugarcane Tableware/${categoryFolder}/${folderName}/${img}`);
          
          const productData = {
            category_id: categoryId,
            slug: productSlug,
            sku: `SC-${productSlug.toUpperCase().replace(/-/g, '')}`,
            status: 'active',
            images: {
              thumbnail: thumbnailPath,
              gallery: galleryImages
            },
            technical_specs: {
              moq: '10,000 pieces',
              material: 'Sugarcane Bagasse',
              features: ['Biodegradable', 'Compostable', 'Microwave Safe', 'Oil Resistant'],
              certifications: ['FDA', 'LFGB', 'BPI']
            },
            introduction: {
              en: `High-quality ${folderName.toLowerCase()} made from sustainable sugarcane bagasse.`,
              de: `Hochwertige ${folderName.toLowerCase()} aus nachhaltigem Zuckerrohr-Bagasse.`,
              fr: `${folderName} de haute qualité fabriqué à partir de bagasse de canne à sucre durable.`,
              es: `${folderName} de alta calidad hecho de bagazo de caña de azúcar sostenible.`
            },
            name_i18n: names,
            description_i18n: descriptions
          };
          
          // Insert product into Supabase
          const { data, error } = await supabase
            .from('products')
            .insert([productData])
            .select();
          
          if (error) {
            console.error(`Error uploading product ${folderName}:`, error);
          } else {
            console.log(`✅ Successfully uploaded: ${folderName}`);
            totalProducts++;
          }
          
        } catch (error) {
          console.error(`Error processing folder ${folderName}:`, error);
        }
      }
    }
    
    console.log(`\n🎉 All sugarcane tableware products uploaded successfully! Total: ${totalProducts} products`);
    
  } catch (error) {
    console.error('Error uploading products:', error);
  }
}

// Run the upload
uploadProducts();