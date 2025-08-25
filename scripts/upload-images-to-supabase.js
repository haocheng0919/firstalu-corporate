const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// Supabase配置（仅使用环境变量，不使用硬编码密钥）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 图片文件夹配置：上传类别缩略图与产品图片
const imageFolders = [
  {
    localPath: path.join(__dirname, '..', 'public', 'product_cat'),
    storagePath: 'categories'
  },
  {
    localPath: path.join(__dirname, '..', 'public', 'product_img'),
    storagePath: 'products'
  }
];

// 上传单个文件
async function uploadFile(localFilePath, storageFilePath) {
  try {
    const fileBuffer = fs.readFileSync(localFilePath);

    const { error } = await supabase.storage
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

// 获取存储桶中的文件列表（非递归，仅用于统计）
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