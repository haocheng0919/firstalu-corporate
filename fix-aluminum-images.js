const fs = require('fs');
const path = require('path');

// Function to get all image files in a directory
function getImageFiles(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      console.log(`Directory does not exist: ${dirPath}`);
      return [];
    }
    
    const files = fs.readdirSync(dirPath);
    const imageFiles = files.filter(file => 
      file.toLowerCase().endsWith('.webp') || 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.png')
    );
    
    return imageFiles.map(file => path.join(dirPath, file).replace('/Users/haochengwang/Desktop/claude/firstalu/public', ''));
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

// Product data from database query
const products = [
  {"slug":"aluminum-foil-container-c130","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C130"]},
  {"slug":"aluminum-foil-container-c142","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C142"]},
  {"slug":"aluminum-foil-container-c144","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C144"]},
  {"slug":"aluminum-foil-container-c148","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C148"]},
  {"slug":"aluminum-foil-container-c154","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C154"]},
  {"slug":"aluminum-foil-container-c161-320","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C161-320"]},
  {"slug":"aluminum-foil-container-c161-475","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C161-475"]},
  {"slug":"aluminum-foil-container-c161-680","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C161-680"]},
  {"slug":"aluminum-foil-container-c165","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C165"]},
  {"slug":"aluminum-foil-container-c166-200","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C166-200"]},
  {"slug":"aluminum-foil-container-c167-360","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C167-360"]},
  {"slug":"aluminum-foil-container-c175","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C175"]},
  {"slug":"aluminum-foil-container-c184","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C184"]},
  {"slug":"aluminum-foil-container-c184-580","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C184-580"]},
  {"slug":"aluminum-foil-container-c184-750","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C184-750"]},
  {"slug":"aluminum-foil-container-c184-930","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C184-930"]},
  {"slug":"aluminum-foil-container-c185","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C185"]},
  {"slug":"aluminum-foil-container-c195","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C195"]},
  {"slug":"aluminum-foil-container-c2","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C2"]},
  {"slug":"aluminum-foil-container-c205","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C205"]},
  {"slug":"aluminum-foil-container-c2051","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C2051"]},
  {"slug":"aluminum-foil-container-c209","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C209"]},
  {"slug":"aluminum-foil-container-c214","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C214"]},
  {"slug":"aluminum-foil-container-c216","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C216"]},
  {"slug":"aluminum-foil-container-c220","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C220"]},
  {"slug":"aluminum-foil-container-c220-1050","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C220-1050"]},
  {"slug":"aluminum-foil-container-c221-1025","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C221-1025"]},
  {"slug":"aluminum-foil-container-c221-1400","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C221-1400"]},
  {"slug":"aluminum-foil-container-c221-1800","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C221-1800"]},
  {"slug":"aluminum-foil-container-c239","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C239"]},
  {"slug":"aluminum-foil-container-c3","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C3"]},
  {"slug":"aluminum-foil-container-c312","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C312"]},
  {"slug":"aluminum-foil-container-c314","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C314"]},
  {"slug":"aluminum-foil-container-c320","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C320"]},
  {"slug":"aluminum-foil-container-c337","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C337"]},
  {"slug":"aluminum-foil-container-c350","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C350"]},
  {"slug":"aluminum-foil-container-c370","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C370"]},
  {"slug":"aluminum-foil-container-c4","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C4"]},
  {"slug":"aluminum-foil-container-c430","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C430"]},
  {"slug":"aluminum-foil-container-c526","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C526"]},
  {"slug":"aluminum-foil-container-f160","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/square/F160"]},
  {"slug":"aluminum-foil-container-f205","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/square/F205"]},
  {"slug":"aluminum-foil-container-y120","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y120"]},
  {"slug":"aluminum-foil-container-y120-290","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y120-290"]},
  {"slug":"aluminum-foil-container-y140","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y140"]},
  {"slug":"aluminum-foil-container-y176","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y176"]},
  {"slug":"aluminum-foil-container-y180-1130","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y180-1130"]},
  {"slug":"aluminum-foil-container-y180-1370","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y180-1370"]},
  {"slug":"aluminum-foil-container-y180-920","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y180-920"]},
  {"slug":"aluminum-foil-container-y183","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y183"]},
  {"slug":"aluminum-foil-container-y1843","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y1843"]},
  {"slug":"aluminum-foil-container-y208-1430","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y208-1430"]},
  {"slug":"aluminum-foil-container-y212","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y212"]},
  {"slug":"aluminum-foil-container-y214","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y214"]},
  {"slug":"aluminum-foil-container-y234","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y234"]},
  {"slug":"aluminum-foil-container-y250-2000","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y250-2000"]},
  {"slug":"aluminum-foil-container-y250-2500","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y250-2500"]},
  {"slug":"aluminum-foil-container-y250-3000","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y250-3000"]},
  {"slug":"aluminum-foil-container-y250-3500","images":["/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y250-3500"]},
  {"slug":"aluminum-foil-container-y252","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y252"]},
  {"slug":"aluminum-foil-container-y292","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y292"]},
  {"slug":"aluminum-foil-container-y328","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y328"]},
  {"slug":"aluminum-foil-container-y340","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y340"]},
  {"slug":"aluminum-foil-container-y345","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y345"]},
  {"slug":"aluminum-foil-container-y380","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y380"]},
  {"slug":"aluminum-foil-container-y430","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y430"]},
  {"slug":"aluminum-foil-container-y470","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y470"]},
  {"slug":"aluminum-foil-container-y545","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y545"]},
  {"slug":"aluminum-foil-container-y80","images":["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y80"]},
  {"slug":"aluminum-foil-roll","images":["/product_img/Aluminum-Foil/Foil Sheets/Aluminum-Foil-Roll"]},
  {"slug":"hairdressing-foil-roll","images":["/product_img/Aluminum-Foil/Foil Sheets/Hairdressing-Foil-Roll"]},
  {"slug":"pop-up-foil-sheets","images":["/product_img/Aluminum-Foil/Foil Sheets/Pop-up-Foil-Sheets"]}
];

// Generate SQL update statements
function generateUpdateStatements() {
  const updateStatements = [];
  
  for (const product of products) {
    const currentImagePath = product.images[0];
    const fullDirPath = path.join('/Users/haochengwang/Desktop/claude/firstalu/public', currentImagePath);
    
    console.log(`\nProcessing product: ${product.slug}`);
    console.log(`Current image path: ${currentImagePath}`);
    console.log(`Looking in directory: ${fullDirPath}`);
    
    const imageFiles = getImageFiles(fullDirPath);
    
    if (imageFiles.length > 0) {
      console.log(`Found ${imageFiles.length} images:`, imageFiles);
      
      const imagesJson = JSON.stringify(imageFiles);
      const updateStatement = `UPDATE products SET images = '${imagesJson}'::jsonb WHERE slug = '${product.slug}';`;
      updateStatements.push(updateStatement);
      
      console.log(`✓ Generated update statement for ${product.slug}`);
    } else {
      console.log(`⚠ No images found for product ${product.slug}`);
    }
  }
  
  // Write all update statements to a file
  const sqlContent = updateStatements.join('\n\n');
  fs.writeFileSync('update-aluminum-images.sql', sqlContent);
  
  console.log(`\n✅ Generated ${updateStatements.length} update statements in update-aluminum-images.sql`);
  console.log('\nFirst few statements:');
  console.log(updateStatements.slice(0, 3).join('\n\n'));
}

// Run the generator
generateUpdateStatements();