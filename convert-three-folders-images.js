const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 中文到英文的翻译映射
const translations = {
  // Disposable Cutlery translations
  '竹子': 'bamboo',
  '勺子': 'spoon',
  '刀': 'knife',
  '叉': 'fork',
  '棍': 'stick',
  
  // Paper Cups translations
  '单层杯': 'single-wall-cup',
  '中空杯': 'double-wall-cup',
  '瓦楞杯': 'ripple-wall-cup',
  '冷饮杯': 'cold-drink-cup',
  '凸盖杯子': 'dome-lid-cup',
  '杯子': 'cup',
  '盖子': 'lid',
  '白': 'white',
  '红': 'red',
  '蓝': 'blue',
  '黑': 'black',
  '上下白': 'top-bottom-white',
  
  // Kraft Packaging translations
  '汤桶和盖子': 'soup-cup-lid',
  '汤桶': 'soup-cup',
  '沙拉碗': 'salad-bowl',
  '面碗': 'noodle-bowl',
  '瓦楞纸碗': 'corrugated-bowl',
  '打包盒': 'takeaway-box',
  '盘子': 'tray',
  '纸盖': 'paper-lid',
  '塑盖': 'plastic-lid',
  '实际容量约': 'capacity-approx',
  '实际直径约': 'diameter-approx',
  '大': 'large',
  '小': 'small',
  '双': 'double'
};

// 翻译函数
function translateToEnglish(chineseName) {
  let englishName = chineseName;
  
  // 替换中文词汇
  Object.keys(translations).forEach(chinese => {
    const regex = new RegExp(chinese, 'g');
    englishName = englishName.replace(regex, translations[chinese]);
  });
  
  // 清理和格式化
  englishName = englishName
    .replace(/[_\s]+/g, '-')  // 替换下划线和空格为连字符
    .replace(/[^a-zA-Z0-9\-\.]/g, '')  // 移除特殊字符，保留字母、数字、连字符和点
    .replace(/-+/g, '-')  // 合并多个连字符
    .replace(/^-|-$/g, '')  // 移除开头和结尾的连字符
    .toLowerCase();
  
  return englishName;
}

// 提取产品基础名称（用于分组）
function extractProductBaseName(filename) {
  // 移除文件扩展名
  const nameWithoutExt = path.parse(filename).name;
  
  // 移除序号部分（如_0000_, _0001_等）
  const baseName = nameWithoutExt.replace(/_\d{4}_/, '_');
  
  // 处理特殊情况，如 "沙拉碗_0000_205" 和 "沙拉碗_0001_205 (2)"
  const cleanName = baseName.replace(/\s*\(\d+\)$/, ''); // 移除 (2), (3) 等
  
  return cleanName;
}

// 转换图片为WebP格式
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    console.log(`✓ 转换完成: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`✗ 转换失败 ${inputPath}:`, error.message);
    return false;
  }
}

// 处理单个文件夹
async function processFolder(folderPath) {
  console.log(`\n处理文件夹: ${folderPath}`);
  
  if (!fs.existsSync(folderPath)) {
    console.log(`文件夹不存在: ${folderPath}`);
    return;
  }
  
  // 收集所有图片文件
  const allImages = [];
  
  function collectImages(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        collectImages(itemPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(ext)) {
          allImages.push(itemPath);
        }
      }
    }
  }
  
  collectImages(folderPath);
  console.log(`找到 ${allImages.length} 个图片文件`);
  
  // 按产品分组
  const productGroups = {};
  
  for (const imagePath of allImages) {
    const filename = path.basename(imagePath);
    const baseName = extractProductBaseName(filename);
    
    if (!productGroups[baseName]) {
      productGroups[baseName] = [];
    }
    productGroups[baseName].push(imagePath);
  }
  
  console.log(`识别出 ${Object.keys(productGroups).length} 个产品组`);
  
  // 处理每个产品组
  for (const [productName, images] of Object.entries(productGroups)) {
    console.log(`\n处理产品: ${productName}`);
    
    // 翻译产品名称
    const englishProductName = translateToEnglish(productName);
    console.log(`英文名称: ${englishProductName}`);
    
    // 创建产品文件夹
    const productFolderPath = path.join(folderPath, englishProductName);
    if (!fs.existsSync(productFolderPath)) {
      fs.mkdirSync(productFolderPath, { recursive: true });
      console.log(`创建文件夹: ${englishProductName}`);
    }
    
    // 处理每个图片
    for (let i = 0; i < images.length; i++) {
      const imagePath = images[i];
      const originalFilename = path.basename(imagePath);
      const ext = path.extname(originalFilename).toLowerCase();
      
      // 生成英文文件名
      let englishFilename;
      if (images.length === 1) {
        englishFilename = `${englishProductName}.webp`;
      } else {
        englishFilename = `${englishProductName}-${i + 1}.webp`;
      }
      
      const outputPath = path.join(productFolderPath, englishFilename);
      
      if (ext === '.webp') {
        // 如果已经是WebP格式，直接复制并重命名
        fs.copyFileSync(imagePath, outputPath);
        console.log(`✓ 复制WebP: ${englishFilename}`);
      } else {
        // 转换为WebP格式
        await convertToWebP(imagePath, outputPath);
      }
    }
  }
  
  // 删除所有非WebP格式的原始文件
  console.log('\n删除非WebP格式的原始文件...');
  let deletedCount = 0;
  
  function deleteNonWebP(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // 检查是否是新创建的产品文件夹
        const isProductFolder = Object.values(productGroups).some(group => 
          group.length > 0 && translateToEnglish(extractProductBaseName(path.basename(group[0]))) === item
        );
        
        if (!isProductFolder) {
          deleteNonWebP(itemPath);
          
          // 如果文件夹为空，删除它
          try {
            const remainingItems = fs.readdirSync(itemPath);
            if (remainingItems.length === 0) {
              fs.rmdirSync(itemPath);
              console.log(`删除空文件夹: ${item}`);
            }
          } catch (error) {
            // 忽略错误
          }
        }
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(ext)) {
          fs.unlinkSync(itemPath);
          deletedCount++;
          console.log(`✗ 删除: ${item}`);
        }
      }
    }
  }
  
  deleteNonWebP(folderPath);
  console.log(`删除了 ${deletedCount} 个非WebP文件`);
}

// 主函数
async function main() {
  const folders = [
    '/Users/haochengwang/Desktop/claude/firstalu/public/product_img/Disposable Cutlery',
    '/Users/haochengwang/Desktop/claude/firstalu/public/product_img/Kraft Packaging',
    '/Users/haochengwang/Desktop/claude/firstalu/public/product_img/Paper Cups'
  ];
  
  console.log('开始处理三个文件夹的图片...');
  
  for (const folder of folders) {
    await processFolder(folder);
  }
  
  console.log('\n所有文件夹处理完成！');
}

// 运行脚本
main().catch(console.error);