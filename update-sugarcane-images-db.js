const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Map product names to their corresponding image folders
const productImageMap = {
  // Bowls
  'sugarcane-bowl-16oz-round': '16oz',
  'sugarcane-bowl-12oz-round': '12oz',
  'sugarcane-bowl-260ml-round': '260ml',
  'sugarcane-bowl-350ml-round': '350ml',
  'sugarcane-bowl-500ml-round': '500ml',
  'sugarcane-bowl-650ml-round': '650ml',
  'sugarcane-bowl-6inch-round': '6 inch bow',
  
  // Plates
  'sugarcane-plate-6inch-round': '6 inch',
  'sugarcane-plate-7inch-round': '7 inch',
  'sugarcane-plate-9inch-round': '9 inch',
  'sugarcane-plate-8.86inch-round': '8.86 inch',
  'sugarcane-plate-10inch-round': '10 inch',
  'sugarcane-plate-6inch-square': '6 inch square plate',
  'sugarcane-plate-8inch-square': '8 inch square plate',
  'sugarcane-plate-10inch-square': '10 inch square plate',
  'sugarcane-plate-8inch-oval': '8 inch Oval plate',
  'sugarcane-plate-10inch-oval': '10 inch Oval plate',
  'sugarcane-plate-7inch-cake-tray': '7 inch cake tray',
  'sugarcane-plate-8inch-cake-tray': '8 inch cake tray',
  'sugarcane-plate-8.86inch-3compartment': '8.86 inch 3 compartment',
  'sugarcane-plate-10inch-3compartment': '10 inch 3 compartment',
  
  // Clamshells
  'sugarcane-clamshell-9x6-hinged': '9X6 inch clamshell',
  'sugarcane-clamshell-8inch-round': '8 inch clamshell',
  'sugarcane-clamshell-9inch-round': '9 inch clamshell',
  'sugarcane-clamshell-450ml': '450ml clamshell',
  'sugarcane-clamshell-600ml': '600ml clamshell',
  'sugarcane-clamshell-6inch-hamburg': '6 inch hamburg box',
  'sugarcane-clamshell-8inch-3compartment': '8 inch clamshell 3 compartment',
  'sugarcane-clamshell-9inch-3compartment': '9 inch clamshell 3 compartment',
  'sugarcane-clamshell-9x6-2compartment': '9X6-2 compartment clamshell',
  'sugarcane-clamshell-550ml-square': '550ml square packing box',
  'sugarcane-clamshell-650ml-square': '650ml square packing box',
  'sugarcane-clamshell-750ml-square': '750ml square packing box',
  'sugarcane-clamshell-700ml-packing': '700ml packing box',
  'sugarcane-clamshell-850ml-packing': '850ml packing box',
  'sugarcane-clamshell-1000ml-packing': '1000ml packing box',
  'sugarcane-clamshell-850ml-2compartment': '850ml 2-compartment packing box',
  'sugarcane-clamshell-1000ml-2compartment': '1000ml 2-compartment packing box',
  'sugarcane-clamshell-850ml-lid': '850ml packing lid',
  'sugarcane-clamshell-1000ml-lid': '1000ml packing lid',
  
  // Trays
  'sugarcane-tray-10x8-rectangular': 'Large 4-Compartment tray',
  'sugarcane-tray-5compartment': '5-Compartment tray',
  'sugarcane-tray-6compartment': '6-Compartment tray',
  'sugarcane-tray-1100ml-4compartment': '1100ml 4-Compartment tray',
  'sugarcane-tray-1100ml-3compartment': '1100ml Small 3-Compartment tray',
  'sugarcane-tray-1200ml-3compartment': '1200ml Medium 3-Compartment tray',
  'sugarcane-tray-1200ml-4compartment': '1200ml Medium 4-Compartment tray',
  'sugarcane-tray-1400ml-5compartment': '1400ml 5-Compartment tray w bowl center',
  'sugarcane-tray-400ml-5compartment': '400ml 5-Compartment tray w bowl corner',
  'sugarcane-tray-1100ml-lid': '1100ml universal tray lid',
  'sugarcane-tray-1200ml-lid': '1200ml universal tray lid',
  'sugarcane-tray-1400ml-lid': '1400ml universal tray lid'
};

// Map category slugs to folder names
const categoryFolderMap = {
  'plates': 'plate',
  'bowls': 'bowls',
  'clamshells': 'chamshell',
  'trays': 'tray'
};

async function updateSugarcaneProductImages() {
  try {
    console.log('Starting to update sugarcane product images...');
    
    // Get all sugarcane products
    const { data: products, error } = await supabase
      .from('products')
      .select('id, slug, category_id, categories(slug)')
      .like('slug', 'sugarcane%');
    
    if (error) {
      console.error('Error fetching products:', error);
      return;
    }
    
    console.log(`Found ${products.length} sugarcane products`);
    
    for (const product of products) {
      const productSlug = product.slug;
      const categorySlug = product.categories?.slug;
      
      if (!categorySlug || !categoryFolderMap[categorySlug]) {
        console.log(`Skipping ${productSlug} - no category mapping`);
        continue;
      }
      
      const productFolder = productImageMap[productSlug];
      if (!productFolder) {
        console.log(`Skipping ${productSlug} - no image folder mapping`);
        continue;
      }
      
      const categoryFolder = categoryFolderMap[categorySlug];
      const imagePath = `/product_img/Sugarcane Tableware/${categoryFolder}/${productFolder}/${productFolder} (1).webp`;
      const galleryPath = `/product_img/Sugarcane Tableware/${categoryFolder}/${productFolder}/${productFolder} (2).webp`;
      
      // Check if the image file exists
      const fullImagePath = path.join(__dirname, 'public', imagePath.substring(1));
      const fullGalleryPath = path.join(__dirname, 'public', galleryPath.substring(1));
      
      if (!fs.existsSync(fullImagePath)) {
        console.log(`Image not found for ${productSlug}: ${fullImagePath}`);
        continue;
      }
      
      // Prepare image data
      const imageData = {
        main: imagePath,
        thumbnail: imagePath,
        alt_text: product.name || productSlug.replace(/-/g, ' '),
        gallery: []
      };
      
      // Add gallery image if it exists
      if (fs.existsSync(fullGalleryPath)) {
        imageData.gallery.push(galleryPath);
      }
      
      // Update the product in database
      const { error: updateError } = await supabase
        .from('products')
        .update({ images: imageData })
        .eq('id', product.id);
      
      if (updateError) {
        console.error(`Error updating ${productSlug}:`, updateError);
      } else {
        console.log(`✓ Updated ${productSlug} with image: ${imagePath}`);
      }
    }
    
    console.log('Finished updating sugarcane product images!');
    
  } catch (error) {
    console.error('Script error:', error);
  }
}

// Run the script
if (require.main === module) {
  updateSugarcaneProductImages();
}

module.exports = { updateSugarcaneProductImages };