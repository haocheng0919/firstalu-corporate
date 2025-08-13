// Test script to verify WebP image detection for aluminum foil containers
const fs = require('fs');
const path = require('path');

// Function to get available WebP images for a product
function getAvailableWebPImages(category, shape, productCode) {
  const publicDir = path.join(__dirname, '..', 'public');
  const baseUrl = '/product_img/Aluminum-Foil-Container';
  
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
      
      // Convert to full URLs
      webpFiles.forEach(file => {
        availableImages.push(`${baseUrl}/${folderPath}/${productCode}/${file}`);
      });
    }
  } catch (error) {
    console.error(`Error reading directory for product ${productCode}:`, error);
  }
  
  return {
    code: productCode,
    availableImages,
    totalCount: availableImages.length
  };
}

// Test function
function testImageDetection() {
  console.log('🔍 Testing WebP Image Detection for Aluminum Foil Containers\n');
  
  const testCases = [
    // Test various product categories
    { category: 'wrinklewall', shape: 'rectangle', code: 'C239' }, // Should have c239-1.webp, c239-2.webp, c239-3.webp
    { category: 'wrinklewall', shape: 'round', code: 'Y1843' },    // Should have only y1843.webp
    { category: 'smoothwall', shape: 'rectangle', code: 'C161-320' }, // Should have c161-320.webp, c161-320-2.webp
    { category: 'wrinklewall', shape: 'round', code: 'Y380' },     // Should have y380.webp, y380-2.webp, y380-3.webp
    { category: 'wrinklewall', shape: 'square', code: 'F160' },    // Should have f160.webp, f160-2.webp, f160-3.webp
  ];
  
  testCases.forEach(testCase => {
    const result = getAvailableWebPImages(testCase.category, testCase.shape, testCase.code);
    
    console.log(`📦 Product: ${testCase.code} (${testCase.category} ${testCase.shape})`);
    console.log(`   Images found: ${result.totalCount}`);
    
    if (result.totalCount > 0) {
      result.availableImages.forEach((image, index) => {
        console.log(`   ${index + 1}. ${image}`);
      });
    } else {
      console.log('   ❌ No WebP images found!');
    }
    console.log('');
  });
  
  // Test all products summary
  console.log('📊 Summary Report:\n');
  
  const allProducts = [
    // Smoothwall Rectangle
    ...['C161-320', 'C161-475', 'C161-680', 'C166-200', 'C167-360', 'C184-580', 'C184-750', 'C184-930', 'C220-1050', 'C221-1025', 'C221-1400', 'C221-1800']
      .map(code => ({ ...getAvailableWebPImages('smoothwall', 'rectangle', code), category: 'smoothwall', shape: 'rectangle' })),
    
    // Smoothwall Round
    ...['Y120-290', 'Y180-920', 'Y180-1130', 'Y180-1370', 'Y208-1430', 'Y250-2000', 'Y250-2500', 'Y250-3000', 'Y250-3500']
      .map(code => ({ ...getAvailableWebPImages('smoothwall', 'round', code), category: 'smoothwall', shape: 'round' })),
    
    // Wrinklewall Rectangle
    ...['C130', 'C142', 'C144', 'C148', 'C154', 'C165', 'C175', 'C184', 'C185', 'C195', 'C2', 'C205', 'C2051', 'C209', 'C214', 'C216', 'C220', 'C239', 'C3', 'C312', 'C314', 'C320', 'C337', 'C350', 'C370', 'C4', 'C430', 'C526']
      .map(code => ({ ...getAvailableWebPImages('wrinklewall', 'rectangle', code), category: 'wrinklewall', shape: 'rectangle' })),
    
    // Wrinklewall Round
    ...['Y120', 'Y140', 'Y176', 'Y183', 'Y1843', 'Y212', 'Y214', 'Y234', 'Y252', 'Y292', 'Y328', 'Y340', 'Y345', 'Y380']
      .map(code => ({ ...getAvailableWebPImages('wrinklewall', 'round', code), category: 'wrinklewall', shape: 'round' })),
    
    // Wrinklewall Square
    ...['F160', 'F205']
      .map(code => ({ ...getAvailableWebPImages('wrinklewall', 'square', code), category: 'wrinklewall', shape: 'square' }))
  ];
  
  const productsWithImages = allProducts.filter(p => p.totalCount > 0);
  const productsWithoutImages = allProducts.filter(p => p.totalCount === 0);
  const totalImages = allProducts.reduce((sum, p) => sum + p.totalCount, 0);
  
  console.log(`✅ Products with images: ${productsWithImages.length}/${allProducts.length}`);
  console.log(`📸 Total WebP images detected: ${totalImages}`);
  console.log(`🔍 Average images per product: ${(totalImages / productsWithImages.length).toFixed(1)}`);
  
  if (productsWithoutImages.length > 0) {
    console.log('\n❌ Products without WebP images:');
    productsWithoutImages.forEach(p => {
      console.log(`   - ${p.code} (${p.category} ${p.shape})`);
    });
  }
  
  console.log('\n🎉 WebP image detection test completed!');
}

// Run the test
testImageDetection();