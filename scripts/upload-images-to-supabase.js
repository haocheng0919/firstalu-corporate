const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://setmygkovqgthorwhvxd.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldG15Z2tvdnFndGhvcndodnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NDE0MTcsImV4cCI6MjA2OTExNzQxN30.F2v2fDlUDCrtRs0eDMl595M_FcUKwgaftsNYX9UL6t4';

const supabase = createClient(supabaseUrl, supabaseKey);

// 图片文件夹配置
const imageFolders = [
  {
    localPath: '/Users/haochengwang/Desktop/claude/firstalu/public/sugarcane-bagasse',
    storagePath: 'sugarcane-bagasse',
    category: 'sugarcane-bagasse'
  },
  {
    localPath: '/Users/haochengwang/Desktop/claude/firstalu/public/cutlery-images',
    storagePath: 'cutlery',
    category: 'cutlery'
  },
  {
    localPath: '/Users/haochengwang/Desktop/claude/firstalu/public/paper-containers',
    storagePath: 'paper-containers',
    category: 'paper-containers'
  }
];

// 上传单个文件
async function uploadFile(localFilePath, storageFilePath) {
  try {
    const fileBuffer = fs.readFileSync(localFilePath);
    
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(storageFilePath, fileBuffer, {
        contentType: 'image/webp',
        upsert: true // 如果文件已存在则覆盖
      });
    
    if (error) {
      console.error(`Error uploading ${storageFilePath}:`, error.message);
      return false;
    }
    
    console.log(`Uploaded: ${storageFilePath}`);
    return true;
  } catch (error) {
    console.error(`Error reading file ${localFilePath}:`, error.message);
    return false;
  }
}

// 递归上传文件夹
async function uploadFolder(localFolderPath, storageFolderPath) {
  if (!fs.existsSync(localFolderPath)) {
    console.log(`Local folder does not exist: ${localFolderPath}`);
    return;
  }
  
  const items = fs.readdirSync(localFolderPath);
  
  for (const item of items) {
    const localItemPath = path.join(localFolderPath, item);
    const stat = fs.statSync(localItemPath);
    
    if (stat.isDirectory()) {
      // 递归处理子文件夹
      const subStoragePath = `${storageFolderPath}/${item}`;
      await uploadFolder(localItemPath, subStoragePath);
    } else if (stat.isFile() && path.extname(item).toLowerCase() === '.webp') {
      // 上传WebP文件
      const storageFilePath = `${storageFolderPath}/${item}`;
      await uploadFile(localItemPath, storageFilePath);
    }
  }
}

// 获取存储桶中的文件列表
async function listStorageFiles(folderPath = '') {
  const { data, error } = await supabase.storage
    .from('product-images')
    .list(folderPath);
  
  if (error) {
    console.error('Error listing files:', error.message);
    return [];
  }
  
  return data || [];
}

// 主函数
async function main() {
  console.log('Starting image upload to Supabase storage...');
  
  // 测试Supabase连接
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      console.error('Supabase connection error:', error.message);
      return;
    }
    console.log('Supabase connection successful.');
    console.log('Available buckets:', data.map(b => b.name).join(', '));
  } catch (error) {
    console.error('Failed to connect to Supabase:', error.message);
    return;
  }
  
  // 上传所有图片文件夹
  for (const folder of imageFolders) {
    console.log(`\nUploading folder: ${folder.localPath}`);
    console.log(`To storage path: ${folder.storagePath}`);
    
    await uploadFolder(folder.localPath, folder.storagePath);
  }
  
  console.log('\nImage upload completed!');
  
  // 显示上传后的文件统计
  console.log('\nStorage summary:');
  for (const folder of imageFolders) {
    const files = await listStorageFiles(folder.storagePath);
    console.log(`${folder.storagePath}: ${files.length} files`);
  }
}

// 运行脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, uploadFile, uploadFolder };