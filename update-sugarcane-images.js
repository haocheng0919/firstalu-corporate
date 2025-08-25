const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Product slug to image folder mapping
const productImageMap = {
  // Bowls
  'sugarcane-bowl-16oz-round': { category: 'bowls', folder: '16oz' },
  'sugarcane-bowl-12oz-round': { category: 'bowls', folder: '12oz' },
  'sugarcane-bowl-260ml-round': { category: 'bowls', folder: '260ml' },
  'sugarcane-bowl-350ml-round': { category: 'bowls', folder: '350ml' },
  'sugarcane-bowl-500ml-round': { category: 'bowls', folder: '500ml' },
  'sugarcane-bowl-6inch-round': { category: 'bowls', folder: '6 inch bow' },
  'sugarcane-bowl-650ml-round': { category: 'bowls', folder: '650ml' },
  
  // Plates
  'sugarcane-plate-9inch-round': { category: 'plate', folder: '9 inch' },
  'sugarcane-plate-10inch-round': { category: 'plate', folder: '10 inch' },
  'sugarcane-plate-6inch-round': { category: 'plate', folder: '6 inch' },
  'sugarcane-plate-7inch-round': { category: 'plate', folder: '7 inch' },
  'sugarcane-plate-8inch-round': { category: 'plate', folder: '8.86 inch' },
  'sugarcane-plate-10inch-3compartment': { category: 'plate', folder: '10 inch 3 compartment' },
  'sugarcane-plate-8inch-3compartment': { category: 'plate', folder: '8.86 inch 3 compartment' },
  'sugarcane-plate-10inch-oval': { category: 'plate', folder: '10 inch Oval plate' },
  'sugarcane-plate-8inch-oval': { category: 'plate', folder: '8 inch Oval plate' },
  'sugarcane-plate-10inch-square': { category: 'plate', folder: '10 inch square plate' },
  'sugarcane-plate-8inch-square': { category: 'plate', folder: '8 inch square plate' },
  'sugarcane-plate-6inch-square': { category: 'plate', folder: '6 inch square plate' },
  'sugarcane-plate-7inch-cake': { category: 'plate', folder: '7 inch cake tray' },
  'sugarcane-plate-8inch-cake': { category: 'plate', folder: '8 inch cake tray' },
  
  // Clamshells
  'sugarcane-clamshell-9x6-hinged': { category: 'chamshell', folder: '9X6 inch clamshell' },
  'sugarcane-clamshell-8inch-round': { category: 'chamshell', folder: '8 inch clamshell' },
  'sugarcane-clamshell-9inch-round': { category: 'chamshell', folder: '9 inch clamshell' },
  'sugarcane-clamshell-450ml': { category: 'chamshell', folder: '450ml clamshell' },
  'sugarcane-clamshell-600ml': { category: 'chamshell', folder: '600ml clamshell' },
  'sugarcane-clamshell-6inch-hamburg': { category: 'chamshell', folder: '6 inch hamburg box' },
  'sugarcane-clamshell-8inch-3compartment': { category: 'chamshell', folder: '8 inch clamshell 3 compartment' },
  'sugarcane-clamshell-9inch-3compartment': { category: 'chamshell', folder: '9 inch clamshell 3 compartment' },
  'sugarcane-clamshell-9x6-2compartment': { category: 'chamshell', folder: '9X6-2 compartment clamshell' },
  
  // Trays
  'sugarcane-tray-10x8-rectangular': { category: 'tray', folder: 'Large 4-Compartment tray' },
  'sugarcane-tray-1100ml-4compartment': { category: 'tray', folder: '1100ml 4-Compartment tray' },
  'sugarcane-tray-1100ml-3compartment': { category: 'tray', folder: '1100ml Small 3-Compartment tray' },
  'sugarcane-tray-1200ml-3compartment': { category: 'tray', folder: '1200ml Medium 3-Compartment tray' },
  'sugarcane-tray-1200ml-4compartment': { category: 'tray', folder: '1200ml Medium 4-Compartment tray' },
  'sugarcane-tray-1400ml-5compartment': { category: 'tray', folder: '1400ml 5-Compartment tray w bowl center' },
  'sugarcane-tray-400ml-5compartment': { category: 'tray', folder: '400ml 5-Compartment tray w bowl corner' },
  'sugarcane-tray-5compartment': { category: 'tray', folder: '5-Compartment tray' },
  'sugarcane-tray-6compartment': { category: 'tray', folder: '6-Compartment tray' },
};

// Function to update product images in database
async function updateProductImages() {
  console.log('Starting to update sugarcane product images...');
  
  for (const [slug, imageInfo] of Object.entries(productImageMap)) {
    const { category, folder } = imageInfo;
    
    // Construct image paths
    const mainImage = `/product_img/Sugarcane Tableware/${category}/${folder}/${folder} (1).webp`;
    const thumbnailImage = `/product_img/Sugarcane Tableware/${category}/${folder}/${folder} (1).webp`;
    const galleryImage = `/product_img/Sugarcane Tableware/${category}/${folder}/${folder} (2).webp`;
    
    // Check if files exist
    const publicDir = path.join(__dirname, 'public');
    const mainImagePath = path.join(publicDir, mainImage);
    const galleryImagePath = path.join(publicDir, galleryImage);
    
    const mainExists = fs.existsSync(mainImagePath);
    const galleryExists = fs.existsSync(galleryImagePath);
    
    if (!mainExists) {
      console.log(`Warning: Main image not found for ${slug}: ${mainImage}`);
      continue;
    }
    
    // Prepare images object
    const images = {
      main: mainImage,
      thumbnail: thumbnailImage,
      alt_text: `Sugarcane ${category} product`,
      gallery: galleryExists ? [galleryImage] : []
    };
    
    // Update database
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ images })
        .eq('slug', slug);
      
      if (error) {
        console.error(`Error updating ${slug}:`, error);
      } else {
        console.log(`✓ Updated images for ${slug}`);
      }
    } catch (err) {
      console.error(`Exception updating ${slug}:`, err);
    }
  }
  
  console.log('Finished updating sugarcane product images.');
}

// Run the update
if (require.main === module) {
  updateProductImages().catch(console.error);
}

module.exports = { updateProductImages, productImageMap };