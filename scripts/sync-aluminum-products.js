const fs = require('fs');
const path = require('path');

// Base path for aluminum foil container images
const CONTAINER_BASE_PATH = '/Users/haochengwang/Desktop/claude/firstalu/public/product_img/Aluminum-Foil/Container';
const IMAGE_URL_BASE = '/product_img/Aluminum-Foil/Container';

// Category mappings - Container下的Smoothwall和Wrinklewall分类
const CATEGORY_MAPPINGS = {
  'smoothwall': 'container-smoothwall',
  'wrinklewall': 'container-wrinklewall'
};

function scanProductFolders() {
  const products = [];
  
  // Scan Smoothwall containers
  const smoothwallPath = path.join(CONTAINER_BASE_PATH, 'Smoothwall');
  if (fs.existsSync(smoothwallPath)) {
    const shapes = fs.readdirSync(smoothwallPath).filter(item => 
      fs.statSync(path.join(smoothwallPath, item)).isDirectory()
    );
    
    shapes.forEach(shape => {
      const shapePath = path.join(smoothwallPath, shape);
      const productFolders = fs.readdirSync(shapePath).filter(item => 
        fs.statSync(path.join(shapePath, item)).isDirectory()
      );
      
      productFolders.forEach(productCode => {
        const productPath = path.join(shapePath, productCode);
        const images = getProductImages(productPath, productCode);
        if (images.length > 0) {
          products.push({
            type: 'smoothwall',
            shape: shape.toLowerCase(),
            code: productCode,
            images,
            fullPath: productPath
          });
        }
      });
    });
  }
  
  // Scan Wrinklewall containers
  const wrinklewallPath = path.join(CONTAINER_BASE_PATH, 'Wrinklewall');
  if (fs.existsSync(wrinklewallPath)) {
    const shapes = fs.readdirSync(wrinklewallPath).filter(item => 
      fs.statSync(path.join(wrinklewallPath, item)).isDirectory()
    );
    
    shapes.forEach(shape => {
      const shapePath = path.join(wrinklewallPath, shape);
      const productFolders = fs.readdirSync(shapePath).filter(item => 
        fs.statSync(path.join(shapePath, item)).isDirectory()
      );
      
      productFolders.forEach(productCode => {
        const productPath = path.join(shapePath, productCode);
        const images = getProductImages(productPath, productCode);
        if (images.length > 0) {
          products.push({
            type: 'wrinklewall',
            shape: shape.toLowerCase(),
            code: productCode,
            images,
            fullPath: productPath
          });
        }
      });
    });
  }
  
  return products;
}

function getProductImages(productPath, productCode) {
  const images = [];
  
  try {
    const files = fs.readdirSync(productPath);
    const imageFiles = files.filter(file => 
      file.toLowerCase().endsWith('.webp') || 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.png')
    ).sort(); // Sort to ensure consistent ordering
    
    imageFiles.forEach(file => {
      const relativePath = productPath.replace('/Users/haochengwang/Desktop/claude/firstalu/public', '');
      images.push(`${relativePath}/${file}`);
    });
  } catch (error) {
    console.error(`Error reading images from ${productPath}:`, error.message);
  }
  
  return images;
}

function generateProductName(type, shape, code) {
  const typeMap = {
    'smoothwall': 'Smoothwall',
    'wrinklewall': 'Wrinklewall'
  };
  
  const shapeMap = {
    'rectangle': 'Rectangle',
    'round': 'Round', 
    'square': 'Square'
  };
  
  return `${typeMap[type]} ${shapeMap[shape]} Container ${code.toUpperCase()}`;
}

function generateProductSlug(type, shape, code) {
  return `${type}-${shape}-container-${code.toLowerCase()}`;
}

function generateSKU(type, shape, code) {
  const typePrefix = type === 'smoothwall' ? 'SW' : 'WW';
  const shapePrefix = shape === 'rectangle' ? 'R' : shape === 'round' ? 'O' : 'S';
  return `${typePrefix}-${shapePrefix}-${code.toUpperCase()}`;
}

function getCategorySlug(type, shape) {
  return CATEGORY_MAPPINGS[type] || 'aluminum-foil-container';
}

function createProductData(product) {
  const { type, shape, code, images } = product;
  
  const name = generateProductName(type, shape, code);
  const slug = generateProductSlug(type, shape, code);
  const sku = generateSKU(type, shape, code);
  const categorySlug = getCategorySlug(type, shape);
  
  const shapeNameMap = {
    'rectangle': { en: 'Rectangle', zh: '长方形' },
    'round': { en: 'Round', zh: '圆形' },
    'square': { en: 'Square', zh: '方形' }
  };
  
  const typeNameMap = {
    'smoothwall': { en: 'Smoothwall', zh: '光壁' },
    'wrinklewall': { en: 'Wrinklewall', zh: '皱壁' }
  };
  
  return {
    slug,
    sku,
    status: 'active',
    images,
    category_slug: categorySlug,
    name_i18n: {
      en: name,
      zh: `${typeNameMap[type].zh}${shapeNameMap[shape].zh}容器 ${code.toUpperCase()}`
    },
    description_i18n: {
      en: `High-quality ${typeNameMap[type].en.toLowerCase()} ${shapeNameMap[shape].en.toLowerCase()} aluminum foil container, model ${code.toUpperCase()}. Perfect for food packaging and storage.`,
      zh: `优质${typeNameMap[type].zh}${shapeNameMap[shape].zh}铝箔容器，型号 ${code.toUpperCase()}。适用于食品包装和储存。`
    },
    technical_specs: {
      material: 'Aluminum Foil',
      type: typeNameMap[type].en,
      shape: shapeNameMap[shape].en,
      product_code: code.toUpperCase(),
      wall_type: type === 'smoothwall' ? 'Smooth Wall' : 'Wrinkle Wall'
    },
    introduction: {
      en: `Professional ${typeNameMap[type].en.toLowerCase()} ${shapeNameMap[shape].en.toLowerCase()} aluminum foil container designed for commercial and household use. Model ${code.toUpperCase()} offers excellent durability and food safety.`,
      zh: `专业${typeNameMap[type].zh}${shapeNameMap[shape].zh}铝箔容器，适用于商业和家庭使用。型号 ${code.toUpperCase()} 提供卓越的耐用性和食品安全性。`
    }
  };
}

function escapeSQL(str) {
  if (typeof str === 'string') {
    return str.replace(/'/g, "''");
  }
  return JSON.stringify(str).replace(/'/g, "''");
}

async function syncProductsToDatabase(products) {
  console.log(`Starting sync of ${products.length} products...`);
  
  const sqlStatements = [];
  
  for (const product of products) {
    try {
      const productData = createProductData(product);
      
      // Generate SQL INSERT statement
      const sql = `INSERT INTO products (
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  '${productData.slug}',
  '${productData.sku}',
  '${productData.status}',
  '${escapeSQL(productData.images)}',
  '${escapeSQL(productData.name_i18n)}',
  '${escapeSQL(productData.description_i18n)}',
  '${escapeSQL(productData.technical_specs)}',
  '${escapeSQL(productData.introduction)}',
  (SELECT id FROM categories WHERE slug = '${productData.category_slug}' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;`;
      
      sqlStatements.push(sql);
      console.log(`✓ Prepared SQL for: ${productData.name_i18n.en}`);
    } catch (error) {
      console.error(`Error processing product:`, error);
    }
  }
  
  console.log('\n=== Generated SQL Statements ===');
  console.log(sqlStatements.join('\n\n'));
  console.log('\n=== End SQL Statements ===');
  console.log(`\nGenerated ${sqlStatements.length} SQL statements for ${products.length} products.`);
  console.log('Copy the SQL statements above and execute them in your database.');
}

async function main() {
  try {
    console.log('Scanning aluminum foil container products...');
    const products = scanProductFolders();
    
    console.log(`Found ${products.length} products`);
    
    if (products.length === 0) {
      console.log('No products found to sync.');
      return;
    }
    
    // Group products by type and shape for summary
    const summary = {};
    products.forEach(product => {
      const key = `${product.type}-${product.shape}`;
      if (!summary[key]) summary[key] = 0;
      summary[key]++;
    });
    
    console.log('\n=== Product Summary ===');
    Object.entries(summary).forEach(([key, count]) => {
      console.log(`${key}: ${count} products`);
    });
    
    console.log('\n=== Product Details ===');
    products.forEach(product => {
      console.log(`- ${product.type} ${product.shape} ${product.code} (${product.images.length} images)`);
    });
    
    await syncProductsToDatabase(products);
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

if (require.main === module) {
  main();
}

module.exports = { scanProductFolders, syncProductsToDatabase, main };