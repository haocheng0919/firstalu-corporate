const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 处理图片转换和组织的函数
async function processImageFolder(folderPath) {
  console.log(`Processing folder: ${folderPath}`);
  
  // 递归遍历文件夹
  async function processDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // 递归处理子文件夹
        await processDirectory(itemPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        const baseName = path.basename(item, ext);
        
        // 只处理图片文件
        if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'].includes(ext)) {
          console.log(`Processing image: ${item}`);
          
          // 转换为webp格式
          const webpPath = path.join(dirPath, `${baseName}.webp`);
          
          try {
            await sharp(itemPath)
              .webp({ quality: 85 })
              .toFile(webpPath);
            
            console.log(`Converted ${item} to webp`);
            
            // 删除原始文件
            fs.unlinkSync(itemPath);
            console.log(`Deleted original file: ${item}`);
          } catch (error) {
            console.error(`Error converting ${item}:`, error);
          }
        }
      }
    }
  }
  
  // 第一步：转换所有图片为webp格式
  await processDirectory(folderPath);
  
  // 第二步：重新组织图片到产品文件夹
  await organizeImages(folderPath);
}

// 组织图片到产品文件夹的函数
async function organizeImages(folderPath) {
  console.log(`Organizing images in: ${folderPath}`);
  
  async function organizeDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);
    const imageGroups = new Map();
    
    // 收集所有webp图片并按产品分组
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // 递归处理子文件夹
        await organizeDirectory(itemPath);
      } else if (stat.isFile() && path.extname(item).toLowerCase() === '.webp') {
        // 解析产品名称
        const productName = extractProductName(item);
        
        if (!imageGroups.has(productName)) {
          imageGroups.set(productName, []);
        }
        imageGroups.get(productName).push({
          fileName: item,
          filePath: itemPath
        });
      }
    }
    
    // 为每个产品创建文件夹并移动图片
    for (const [productName, images] of imageGroups) {
      if (images.length > 0) {
        const productFolderPath = path.join(dirPath, productName);
        
        // 创建产品文件夹
        if (!fs.existsSync(productFolderPath)) {
          fs.mkdirSync(productFolderPath, { recursive: true });
          console.log(`Created folder: ${productName}`);
        }
        
        // 移动图片到产品文件夹
        for (const image of images) {
          const newPath = path.join(productFolderPath, image.fileName);
          fs.renameSync(image.filePath, newPath);
          console.log(`Moved ${image.fileName} to ${productName}/`);
        }
      }
    }
  }
  
  await organizeDirectory(folderPath);
}

// 提取产品名称的函数
function extractProductName(fileName) {
  const baseName = path.basename(fileName, '.webp');
  
  // 处理特殊情况：沙拉碗_0000_205 和 沙拉碗_0001_205 (2) 应该归为同一产品
  if (baseName.includes('沙拉碗') && baseName.includes('205')) {
    return '沙拉碗_205';
  }
  
  // 处理其他带有 (2), (3) 等后缀的情况
  let productName = baseName.replace(/\s*\(\d+\)\s*$/, '');
  
  // 对于单层杯_0000_2.5oz这种格式，提取主要产品名
  if (productName.includes('_')) {
    const parts = productName.split('_');
    if (parts.length >= 3) {
      // 保留产品类型和规格，去掉序号
      productName = `${parts[0]}_${parts[2]}`;
    }
  }
  
  return productName;
}

// 主函数
async function main() {
  const paperCupsPath = '/Users/haochengwang/Desktop/claude/firstalu/public/product_img/Paper Cups';
  const kraftPackagingPath = '/Users/haochengwang/Desktop/claude/firstalu/public/product_img/Kraft Packaging';
  
  try {
    console.log('Starting image processing...');
    
    // 处理Paper Cups文件夹
    console.log('\n=== Processing Paper Cups ===');
    await processImageFolder(paperCupsPath);
    
    // 处理Kraft Packaging文件夹
    console.log('\n=== Processing Kraft Packaging ===');
    await processImageFolder(kraftPackagingPath);
    
    console.log('\nImage processing completed!');
  } catch (error) {
    console.error('Error during processing:', error);
  }
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { processImageFolder, organizeImages, extractProductName };