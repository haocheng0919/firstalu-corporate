const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 图片文件夹路径
const imageFolders = [
  {
    source: '/Users/haochengwang/Desktop/claude/firstalu/public/Sugarcane Bagasse 上传',
    target: '/Users/haochengwang/Desktop/claude/firstalu/public/sugarcane-bagasse',
    category: 'sugarcane-bagasse'
  },
  {
    source: '/Users/haochengwang/Desktop/claude/firstalu/public/刀叉图上传',
    target: '/Users/haochengwang/Desktop/claude/firstalu/public/cutlery-images',
    category: 'cutlery'
  },
  {
    source: '/Users/haochengwang/Desktop/claude/firstalu/public/纸盒编辑文件',
    target: '/Users/haochengwang/Desktop/claude/firstalu/public/paper-containers',
    category: 'paper-containers'
  }
];

// 创建目标文件夹
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// 清理文件名，移除特殊字符
function cleanFileName(fileName) {
  return fileName
    .replace(/[\[\]()]/g, '') // 移除方括号和圆括号
    .replace(/[\s]+/g, '-') // 空格替换为连字符
    .replace(/[^a-zA-Z0-9\-_.]/g, '') // 移除其他特殊字符
    .toLowerCase();
}

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

// 递归处理文件夹
async function processFolder(sourceFolder, targetFolder, category) {
  const items = fs.readdirSync(sourceFolder);
  
  for (const item of items) {
    const sourcePath = path.join(sourceFolder, item);
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      // 如果是文件夹，递归处理
      const subTargetFolder = path.join(targetFolder, cleanFileName(item));
      ensureDirectoryExists(subTargetFolder);
      await processFolder(sourcePath, subTargetFolder, category);
    } else if (stat.isFile()) {
      // 如果是文件，检查是否为图片
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const baseName = path.basename(item, ext);
        const cleanName = cleanFileName(baseName);
        const outputPath = path.join(targetFolder, `${cleanName}.webp`);
        
        // 避免重复转换
        if (!fs.existsSync(outputPath)) {
          await convertImage(sourcePath, outputPath);
        } else {
          console.log(`Skipped (already exists): ${outputPath}`);
        }
      } else if (ext !== '.psd') {
        console.log(`Skipped (not an image): ${item}`);
      }
    }
  }
}

// 主函数
async function main() {
  console.log('Starting image conversion to WebP format...');
  
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
  
  for (const folder of imageFolders) {
    console.log(`\nProcessing folder: ${folder.source}`);
    console.log(`Target folder: ${folder.target}`);
    
    if (!fs.existsSync(folder.source)) {
      console.log(`Source folder does not exist: ${folder.source}`);
      continue;
    }
    
    ensureDirectoryExists(folder.target);
    await processFolder(folder.source, folder.target, folder.category);
  }
  
  console.log('\nImage conversion completed!');
}

// 运行脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, convertImage, cleanFileName };