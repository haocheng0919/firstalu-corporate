// Script to upload product images to Supabase Storage and update product records
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Function to get available WebP images for a product
function getAvailableWebPImages(category, shape, productCode) {
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Construct the folder path
  const folderPath = category === 'smoothwall' 
    ? `Smoothwall-Aluminum-Foil-Container/${shape.charAt(0).toUpperCase() + shape.slice(1)}`
    : `Wrinklewall-Aluminum-foil-container/${shape}`;
  
  const productDir = path.join(publicDir, 'product_img', 'Aluminum-Foil-Container', folderPath, productCode);
  
  const availableImages = [];
  
  try {
    if (fs.existsSync(productDir)) {
      const files = fs.readdirSync(productDir);
      
      // Filter for WebP files and sort them properly
      const webpFiles = files
        .filter(file => file.endsWith('.webp'))
        .sort((a, b) => {
          // Extract numbers from filenames for proper sorting
          const getNumber = (filename) => {
            const match = filename.match(/-(\d+)\.webp$/);
            return match ? parseInt(match[1]) : 0;
          };
          
          const aNum = getNumber(a);
          const bNum = getNumber(b);
          
          // Files without numbers (main image) come first
          if (aNum === 0 && bNum === 0) return a.localeCompare(b);
          if (aNum === 0) return -1;
          if (bNum === 0) return 1;
          
          return aNum - bNum;
        });
      
      // Convert to full file paths
      webpFiles.forEach(file => {
        availableImages.push({
          filename: file,
          localPath: path.join(productDir, file)
        });
      });
    }
  } catch (error) {
    console.error(`Error reading directory for product ${productCode}:`, error);
  }
  
  return availableImages;
}

// Function to upload a single image to Supabase Storage
async function uploadImageToSupabase(localPath, filename, productCode) {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    const storagePath = `products/${productCode}/${filename}`;
    
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(storagePath, fileBuffer, {
        contentType: 'image/webp',
        upsert: true
      });
    
    if (error) {
      console.error(`Error uploading ${filename}:`, error);
      return null;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(storagePath);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error(`Error uploading ${filename}:`, error);
    return null;
  }
}

// Function to update product with image URLs
async function updateProductImages(productId, imageUrls) {
  try {
    const images = {
      thumbnail: imageUrls[0] || null,
      additional: imageUrls.slice(1)
    };
    
    const { error } = await supabase
      .from('products')
      .update({ images })
      .eq('id', productId);
    
    if (error) {
      console.error(`Error updating product ${productId}:`, error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error updating product ${productId}:`, error);
    return false;
  }
}

// Function to get product by SKU
async function getProductBySku(sku) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, sku')
      .eq('sku', sku)
      .single();
    
    if (error) {
      console.error(`Error finding product with SKU ${sku}:`, error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Error finding product with SKU ${sku}:`, error);
    return null;
  }
}

// Main upload function
async function uploadAllProductImages() {
  console.log('🚀 Starting product image upload to Supabase Storage\n');
  
  // Define all products with their categories and shapes
  const allProducts = [
    // Smoothwall Rectangle
    ...['C161-320', 'C161-475', 'C161-680', 'C166-200', 'C167-360', 'C184-580', 'C184-750', 'C184-930', 'C220-1050', 'C221-1025', 'C221-1400', 'C221-1800']
      .map(code => ({ code, category: 'smoothwall', shape: 'rectangle' })),
    
    // Smoothwall Round
    ...['Y120-290', 'Y180-920', 'Y180-1130', 'Y180-1370', 'Y208-1430', 'Y250-2000', 'Y250-2500', 'Y250-3000', 'Y250-3500']
      .map(code => ({ code, category: 'smoothwall', shape: 'round' })),
    
    // Wrinklewall Rectangle
    ...['C130', 'C142', 'C144', 'C148', 'C154', 'C165', 'C175', 'C184', 'C185', 'C195', 'C2', 'C205', 'C2051', 'C209', 'C214', 'C216', 'C220', 'C239', 'C3', 'C312', 'C314', 'C320', 'C337', 'C350', 'C370', 'C4', 'C430', 'C526']
      .map(code => ({ code, category: 'wrinklewall', shape: 'rectangle' })),
    
    // Wrinklewall Round
    ...['Y120', 'Y140', 'Y176', 'Y183', 'Y1843', 'Y212', 'Y214', 'Y234', 'Y252', 'Y292', 'Y328', 'Y340', 'Y345', 'Y380']
      .map(code => ({ code, category: 'wrinklewall', shape: 'round' })),
    
    // Wrinklewall Square
    ...['F160', 'F205']
      .map(code => ({ code, category: 'wrinklewall', shape: 'square' }))
  ];
  
  let successCount = 0;
  let errorCount = 0;
  let totalImages = 0;
  
  for (const product of allProducts) {
    console.log(`📦 Processing product: ${product.code}`);
    
    // Get product from database
    const dbProduct = await getProductBySku(product.code);
    if (!dbProduct) {
      console.log(`   ❌ Product ${product.code} not found in database`);
      errorCount++;
      continue;
    }
    
    // Get available images
    const images = getAvailableWebPImages(product.category, product.shape, product.code);
    
    if (images.length === 0) {
      console.log(`   ⚠️  No images found for ${product.code}`);
      continue;
    }
    
    console.log(`   📸 Found ${images.length} images`);
    
    // Upload images
    const uploadedUrls = [];
    for (const image of images) {
      console.log(`   ⬆️  Uploading ${image.filename}...`);
      const url = await uploadImageToSupabase(image.localPath, image.filename, product.code);
      if (url) {
        uploadedUrls.push(url);
        totalImages++;
      }
    }
    
    if (uploadedUrls.length > 0) {
      // Update product with image URLs
      const updated = await updateProductImages(dbProduct.id, uploadedUrls);
      if (updated) {
        console.log(`   ✅ Updated product ${product.code} with ${uploadedUrls.length} images`);
        successCount++;
      } else {
        console.log(`   ❌ Failed to update product ${product.code}`);
        errorCount++;
      }
    } else {
      console.log(`   ❌ No images uploaded for ${product.code}`);
      errorCount++;
    }
    
    console.log('');
  }
  
  console.log('📊 Upload Summary:');
  console.log(`   ✅ Successfully processed: ${successCount} products`);
  console.log(`   ❌ Errors: ${errorCount} products`);
  console.log(`   📸 Total images uploaded: ${totalImages}`);
  console.log('\n🎉 Image upload completed!');
}

// Run the upload
uploadAllProductImages().catch(console.error);