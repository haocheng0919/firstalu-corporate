const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Base directory for product images
const baseImageDir = path.join(__dirname, '../public/product_img/Aluminum-Foil/Container');

// Function to scan directory recursively for product folders
function scanProductFolders(dir, basePath = '') {
  const results = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Check if this directory contains image files (product folder)
        const files = fs.readdirSync(fullPath);
        const imageFiles = files.filter(file => file.endsWith('.webp'));
        
        if (imageFiles.length > 0) {
          // This is a product folder
          const sku = item.toUpperCase();
          const relativePath = path.join(basePath, item).replace(/\\/g, '/');
          
          results.push({
            sku,
            folderPath: fullPath,
            relativePath,
            imageFiles: imageFiles.sort(),
            imageCount: imageFiles.length
          });
        } else {
          // Continue scanning subdirectories
          const subResults = scanProductFolders(fullPath, path.join(basePath, item));
          results.push(...subResults);
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
  
  return results;
}

// Function to update product images in database
async function updateProductImages(productData) {
  const imagePaths = productData.imageFiles.map(file => 
    `/product_img/Aluminum-Foil/Container/${productData.relativePath}/${file}`
  );
  
  try {
    const { data, error } = await supabase
      .from('products')
      .update({ images: imagePaths })
      .eq('sku', productData.sku)
      .select('sku, images');
    
    if (error) {
      console.error(`Error updating ${productData.sku}:`, error.message);
      return false;
    }
    
    if (data && data.length > 0) {
      console.log(`✅ Updated ${productData.sku}: ${productData.imageCount} images`);
      return true;
    } else {
      console.log(`⚠️  No product found with SKU: ${productData.sku}`);
      return false;
    }
  } catch (error) {
    console.error(`Error updating ${productData.sku}:`, error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('🔍 Scanning product image folders...');
  
  const productFolders = scanProductFolders(baseImageDir);
  
  console.log(`📁 Found ${productFolders.length} product folders`);
  
  // Filter products with multiple images
  const multiImageProducts = productFolders.filter(p => p.imageCount > 1);
  
  console.log(`🖼️  Found ${multiImageProducts.length} products with multiple images`);
  
  if (multiImageProducts.length === 0) {
    console.log('✅ No products need image updates');
    return;
  }
  
  console.log('\n📋 Products with multiple images:');
  multiImageProducts.forEach(p => {
    console.log(`  ${p.sku}: ${p.imageCount} images`);
  });
  
  console.log('\n🔄 Updating database...');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const product of multiImageProducts) {
    const success = await updateProductImages(product);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
    
    // Add small delay to avoid overwhelming the database
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  ✅ Successfully updated: ${successCount}`);
  console.log(`  ❌ Errors: ${errorCount}`);
  console.log(`  📁 Total products scanned: ${productFolders.length}`);
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { scanProductFolders, updateProductImages };