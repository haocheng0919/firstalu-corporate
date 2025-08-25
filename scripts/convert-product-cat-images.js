const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 产品分类图片文件夹路径
const productCatFolder = '/Users/haochengwang/Desktop/claude/firstalu/public/product_cat';

// 转换单个图片
async function convertImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    console.log(`Converted: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error.message);
    return false;
  }
}

// 主函数
async function main() {
  console.log('Starting product category image conversion to WebP format...');
  
  // 检查 sharp 是否可用
  try {
    await sharp({ create: { width: 1, height: 1, channels: 3, background: 'white' } })
      .webp()
      .toBuffer();
    console.log('Sharp library is working correctly.');
  } catch (error) {
    console.error('Sharp library error:', error.message);
    console.log('Please install sharp: npm install sharp');
    return;
  }
  
  if (!fs.existsSync(productCatFolder)) {
    console.log(`Product category folder does not exist: ${productCatFolder}`);
    return;
  }
  
  const items = fs.readdirSync(productCatFolder);
  
  for (const item of items) {
    const sourcePath = path.join(productCatFolder, item);
    const stat = fs.statSync(sourcePath);
    
    if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const baseName = path.basename(item, ext);
        const outputPath = path.join(productCatFolder, `${baseName}.webp`);
        
        // 避免重复转换
        if (!fs.existsSync(outputPath)) {
          const success = await convertImage(sourcePath, outputPath);
          if (success) {
            // 删除原始文件
            fs.unlinkSync(sourcePath);
            console.log(`Deleted original file: ${item}`);
          }
        } else {
          console.log(`Skipped (already exists): ${baseName}.webp`);
        }
      } else {
        console.log(`Skipped (not an image): ${item}`);
      }
    }
  }
  
  console.log('\nProduct category image conversion completed!');
}

// 运行脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, convertImage };