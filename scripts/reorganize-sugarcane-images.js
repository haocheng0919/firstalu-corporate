const fs = require('fs');
const path = require('path');

// 甘蔗餐具图片基础路径
const basePath = '/Users/haochengwang/Desktop/claude/firstalu/public/product_img/Sugarcane Tableware';

// 子文件夹列表
const subFolders = ['bowls', 'chamshell', 'plate', 'tray'];

// 创建文件夹
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// 提取产品名称（去掉 (1) 或 (2) 后缀）
function extractProductName(fileName) {
  // 移除文件扩展名
  const nameWithoutExt = path.parse(fileName).name;
  // 移除 (1) 或 (2) 后缀
  return nameWithoutExt.replace(/\s*\(\d+\)\s*$/, '').trim();
}

// 重新组织单个子文件夹
function reorganizeSubFolder(subFolderPath) {
  console.log(`\nProcessing folder: ${subFolderPath}`);
  
  if (!fs.existsSync(subFolderPath)) {
    console.log(`Folder does not exist: ${subFolderPath}`);
    return;
  }
  
  const files = fs.readdirSync(subFolderPath);
  const productGroups = {};
  
  // 按产品名称分组文件
  files.forEach(file => {
    const filePath = path.join(subFolderPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && file.endsWith('.webp')) {
      const productName = extractProductName(file);
      
      if (!productGroups[productName]) {
        productGroups[productName] = [];
      }
      
      productGroups[productName].push(file);
    }
  });
  
  // 为每个产品组创建文件夹并移动文件
  Object.keys(productGroups).forEach(productName => {
    const productFiles = productGroups[productName];
    
    if (productFiles.length > 1) {
      // 只有当有多个文件时才创建子文件夹
      const productFolderPath = path.join(subFolderPath, productName);
      ensureDirectoryExists(productFolderPath);
      
      productFiles.forEach(file => {
        const sourcePath = path.join(subFolderPath, file);
        const targetPath = path.join(productFolderPath, file);
        
        try {
          fs.renameSync(sourcePath, targetPath);
          console.log(`Moved: ${file} -> ${productName}/${file}`);
        } catch (error) {
          console.error(`Error moving ${file}:`, error.message);
        }
      });
    } else {
      console.log(`Skipped ${productName} (only one file)`);
    }
  });
}

// 主函数
function main() {
  console.log('Starting reorganization of Sugarcane Tableware images...');
  
  subFolders.forEach(subFolder => {
    const subFolderPath = path.join(basePath, subFolder);
    reorganizeSubFolder(subFolderPath);
  });
  
  console.log('\nReorganization completed!');
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { main, extractProductName };