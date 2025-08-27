const fs = require('fs');
const path = require('path');

// 基础图片路径
const baseImagePath = '/Users/haochengwang/Desktop/claude/firstalu/public/product_img/Aluminum-Foil';

// 所有产品的完整列表（基于文件夹结构）
const allProducts = [
  // Smoothwall Rectangle (12个)
  { folder: 'Container/Smoothwall/Rectangle/C161-320', slug: 'aluminum-foil-container-c161-320', name: 'C161-320', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Rectangle/C161-475', slug: 'aluminum-foil-container-c161-475', name: 'C161-475', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Rectangle/C161-680', slug: 'aluminum-foil-container-c161-680', name: 'C161-680', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Rectangle/C166-200', slug: 'aluminum-foil-container-c166-200', name: 'C166-200', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Rectangle/C167-360', slug: 'aluminum-foil-container-c167-360', name: 'C167-360', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Rectangle/C184-580', slug: 'aluminum-foil-container-c184-580', name: 'C184-580', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Rectangle/C184-750', slug: 'aluminum-foil-container-c184-750', name: 'C184-750', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Rectangle/C184-930', slug: 'aluminum-foil-container-c184-930', name: 'C184-930', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Rectangle/C220-1050', slug: 'aluminum-foil-container-c220-1050', name: 'C220-1050', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Rectangle/C221-1025', slug: 'aluminum-foil-container-c221-1025', name: 'C221-1025', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Rectangle/C221-1400', slug: 'aluminum-foil-container-c221-1400', name: 'C221-1400', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Rectangle/C221-1800', slug: 'aluminum-foil-container-c221-1800', name: 'C221-1800', category: 'aluminum-foil-container-smoothwall' },
  
  // Smoothwall Round (9个)
  { folder: 'Container/Smoothwall/Round/Y120-290', slug: 'aluminum-foil-container-y120-290', name: 'Y120-290', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Round/Y180-920', slug: 'aluminum-foil-container-y180-920', name: 'Y180-920', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Round/Y180-1130', slug: 'aluminum-foil-container-y180-1130', name: 'Y180-1130', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Round/Y180-1370', slug: 'aluminum-foil-container-y180-1370', name: 'Y180-1370', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Round/Y208-1430', slug: 'aluminum-foil-container-y208-1430', name: 'Y208-1430', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Round/Y250-2000', slug: 'aluminum-foil-container-y250-2000', name: 'Y250-2000', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Round/Y250-2500', slug: 'aluminum-foil-container-y250-2500', name: 'Y250-2500', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Round/Y250-3000', slug: 'aluminum-foil-container-y250-3000', name: 'Y250-3000', category: 'aluminum-foil-container-smoothwall' },
  { folder: 'Container/Smoothwall/Round/Y250-3500', slug: 'aluminum-foil-container-y250-3500', name: 'Y250-3500', category: 'aluminum-foil-container-smoothwall' },
  
  // Wrinklewall Rectangle (28个)
  { folder: 'Container/Wrinklewall/rectangle/C2', slug: 'aluminum-foil-container-c2', name: 'C2', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C3', slug: 'aluminum-foil-container-c3', name: 'C3', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C4', slug: 'aluminum-foil-container-c4', name: 'C4', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C130', slug: 'aluminum-foil-container-c130', name: 'C130', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C142', slug: 'aluminum-foil-container-c142', name: 'C142', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C144', slug: 'aluminum-foil-container-c144', name: 'C144', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C148', slug: 'aluminum-foil-container-c148', name: 'C148', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C154', slug: 'aluminum-foil-container-c154', name: 'C154', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C165', slug: 'aluminum-foil-container-c165', name: 'C165', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C175', slug: 'aluminum-foil-container-c175', name: 'C175', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C184', slug: 'aluminum-foil-container-c184', name: 'C184', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C185', slug: 'aluminum-foil-container-c185', name: 'C185', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C195', slug: 'aluminum-foil-container-c195', name: 'C195', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C205', slug: 'aluminum-foil-container-c205', name: 'C205', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C209', slug: 'aluminum-foil-container-c209', name: 'C209', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C214', slug: 'aluminum-foil-container-c214', name: 'C214', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C216', slug: 'aluminum-foil-container-c216', name: 'C216', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C220', slug: 'aluminum-foil-container-c220', name: 'C220', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C239', slug: 'aluminum-foil-container-c239', name: 'C239', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C312', slug: 'aluminum-foil-container-c312', name: 'C312', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C314', slug: 'aluminum-foil-container-c314', name: 'C314', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C320', slug: 'aluminum-foil-container-c320', name: 'C320', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C337', slug: 'aluminum-foil-container-c337', name: 'C337', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C350', slug: 'aluminum-foil-container-c350', name: 'C350', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C370', slug: 'aluminum-foil-container-c370', name: 'C370', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C430', slug: 'aluminum-foil-container-c430', name: 'C430', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C526', slug: 'aluminum-foil-container-c526', name: 'C526', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/rectangle/C2051', slug: 'aluminum-foil-container-c2051', name: 'C2051', category: 'aluminum-foil-container-wrinklewall' },
  
  // Wrinklewall Round (18个)
  { folder: 'Container/Wrinklewall/round/Y80', slug: 'aluminum-foil-container-y80', name: 'Y80', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y120', slug: 'aluminum-foil-container-y120', name: 'Y120', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y140', slug: 'aluminum-foil-container-y140', name: 'Y140', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y176', slug: 'aluminum-foil-container-y176', name: 'Y176', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y183', slug: 'aluminum-foil-container-y183', name: 'Y183', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y212', slug: 'aluminum-foil-container-y212', name: 'Y212', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y214', slug: 'aluminum-foil-container-y214', name: 'Y214', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y234', slug: 'aluminum-foil-container-y234', name: 'Y234', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y252', slug: 'aluminum-foil-container-y252', name: 'Y252', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y292', slug: 'aluminum-foil-container-y292', name: 'Y292', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y328', slug: 'aluminum-foil-container-y328', name: 'Y328', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y340', slug: 'aluminum-foil-container-y340', name: 'Y340', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y345', slug: 'aluminum-foil-container-y345', name: 'Y345', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y380', slug: 'aluminum-foil-container-y380', name: 'Y380', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y430', slug: 'aluminum-foil-container-y430', name: 'Y430', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y470', slug: 'aluminum-foil-container-y470', name: 'Y470', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y545', slug: 'aluminum-foil-container-y545', name: 'Y545', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/round/Y1843', slug: 'aluminum-foil-container-y1843', name: 'Y1843', category: 'aluminum-foil-container-wrinklewall' },
  
  // Wrinklewall Square (2个)
  { folder: 'Container/Wrinklewall/square/F160', slug: 'aluminum-foil-container-f160', name: 'F160', category: 'aluminum-foil-container-wrinklewall' },
  { folder: 'Container/Wrinklewall/square/F205', slug: 'aluminum-foil-container-f205', name: 'F205', category: 'aluminum-foil-container-wrinklewall' }
];

// 需要创建aluminum-foil-sheets类别的产品
const sheetProducts = [
  { folder: 'Foil Sheets/Aluminum-Foil-Roll', slug: 'aluminum-foil-roll', name: 'Aluminum Foil Roll', category: 'aluminum-foil-sheets' },
  { folder: 'Foil Sheets/Hairdressing-Foil-Roll', slug: 'hairdressing-foil-roll', name: 'Hairdressing Foil Roll', category: 'aluminum-foil-sheets' },
  { folder: 'Foil Sheets/Pop-up-Foil-Sheets', slug: 'pop-up-foil-sheets', name: 'Pop-up Foil Sheets', category: 'aluminum-foil-sheets' }
];

// 合并所有产品
const allAluminumProducts = [...allProducts, ...sheetProducts];

console.log(`总共需要创建 ${allAluminumProducts.length} 个铝箔产品`);

// 生成多语言名称
function generateMultilingualName(productName, isSheet = false) {
  const baseType = isSheet ? 'Aluminum Foil' : 'Aluminum Foil Container';
  const germanType = isSheet ? 'Aluminiumfolie' : 'Aluminiumfolien-Behälter';
  const spanishType = isSheet ? 'Papel de Aluminio' : 'Contenedor de Papel de Aluminio';
  const frenchType = isSheet ? 'Papier d\'Aluminium' : 'Conteneur en Papier d\'Aluminium';
  
  return {
    en: `${baseType} ${productName}`,
    de: `${germanType} ${productName}`,
    es: `${spanishType} ${productName}`,
    fr: `${frenchType} ${productName}`
  };
}

// 检查图片文件是否存在
function getProductImage(folderPath) {
  const fullPath = path.join(baseImagePath, folderPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`警告: 文件夹不存在 ${fullPath}`);
    return null;
  }
  
  const files = fs.readdirSync(fullPath);
  const imageFile = files.find(file => file.endsWith('.webp') || file.endsWith('.jpg') || file.endsWith('.png'));
  
  if (!imageFile) {
    console.warn(`警告: 在 ${fullPath} 中未找到图片文件`);
    return null;
  }
  
  return `/product_img/Aluminum-Foil/${folderPath}/${imageFile}`;
}

// 生成SQL插入语句
function generateSQL() {
  let sql = `-- 完整的铝箔产品插入语句 (${allAluminumProducts.length}个产品)\n\n`;
  
  allAluminumProducts.forEach((product, index) => {
    const nameI18n = generateMultilingualName(product.name, product.category === 'aluminum-foil-sheets');
    const imagePath = getProductImage(product.folder);
    
    if (!imagePath) {
      console.error(`跳过产品 ${product.name}: 未找到图片`);
      return;
    }
    
    sql += `-- 产品 ${index + 1}: ${product.name}\n`;
    sql += `INSERT INTO products (\n`;
    sql += `  slug,\n`;
    sql += `  name_i18n,\n`;
    sql += `  description_i18n,\n`;
    sql += `  category_id,\n`;
    sql += `  image_url,\n`;
    sql += `  is_active,\n`;
    sql += `  created_at,\n`;
    sql += `  updated_at\n`;
    sql += `) VALUES (\n`;
    sql += `  '${product.slug}',\n`;
    sql += `  '${JSON.stringify(nameI18n)}',\n`;
    const descriptionI18n = {
      en: `High-quality ${nameI18n.en.toLowerCase()} for various applications`,
      de: `Hochwertiger ${nameI18n.de.toLowerCase()} für verschiedene Anwendungen`,
      es: `${nameI18n.es} de alta calidad para diversas aplicaciones`,
      fr: `${nameI18n.fr.toLowerCase()} de haute qualité pour diverses applications`
    };
    sql += `  '${JSON.stringify(descriptionI18n)}',\n`;
    sql += `  (SELECT id FROM categories WHERE slug = '${product.category}'),\n`;
    sql += `  '${imagePath}',\n`;
    sql += `  true,\n`;
    sql += `  NOW(),\n`;
    sql += `  NOW()\n`;
    sql += `)\n`;
    sql += `ON CONFLICT (slug) DO UPDATE SET\n`;
    sql += `  name_i18n = EXCLUDED.name_i18n,\n`;
    sql += `  description_i18n = EXCLUDED.description_i18n,\n`;
    sql += `  image_url = EXCLUDED.image_url,\n`;
    sql += `  updated_at = NOW();\n\n`;
  });
  
  return sql;
}

// 生成并保存SQL文件
const sqlContent = generateSQL();
const outputPath = path.join(__dirname, '..', 'sql', 'complete-aluminum-products-insert.sql');

// 确保sql目录存在
const sqlDir = path.dirname(outputPath);
if (!fs.existsSync(sqlDir)) {
  fs.mkdirSync(sqlDir, { recursive: true });
}

fs.writeFileSync(outputPath, sqlContent);
console.log(`\n✅ SQL文件已生成: ${outputPath}`);
console.log(`📊 总共包含 ${allAluminumProducts.length} 个铝箔产品的插入语句`);
console.log(`\n产品分布:`);
console.log(`- Smoothwall 容器: ${allProducts.filter(p => p.category === 'aluminum-foil-container-smoothwall').length} 个`);
console.log(`- Wrinklewall 容器: ${allProducts.filter(p => p.category === 'aluminum-foil-container-wrinklewall').length} 个`);
console.log(`- 铝箔片: ${sheetProducts.length} 个`);

module.exports = { allAluminumProducts, generateSQL };