const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://setmygkovqgthorwhvxd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldG15Z2tvdnFndGhvcndodnhkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzU0MTQxNywiZXhwIjoyMDY5MTE3NDE3fQ.Z0kFfH-3Bu4ncwlxBuifrqBat3oDTz09v9FR46Zah5Q';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkImageExists(imagePath) {
  if (!imagePath) return false;
  
  // Remove leading slash and construct full path
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  const fullPath = path.join(__dirname, 'public', cleanPath);
  
  try {
    return fs.existsSync(fullPath);
  } catch (error) {
    console.error(`Error checking file ${fullPath}:`, error.message);
    return false;
  }
}

async function cleanupAluminumProducts() {
  try {
    console.log('开始清理aluminum-foil产品...');
    
    // Get aluminum-foil category ID
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', 'aluminum-foil')
      .single();
    
    if (categoryError) {
      throw new Error(`获取分类失败: ${categoryError.message}`);
    }
    
    console.log(`找到aluminum-foil分类ID: ${category.id}`);
    
    // Get all products in aluminum-foil category
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, slug, sku, images, name_i18n')
      .eq('category_id', category.id);
    
    if (productsError) {
      throw new Error(`获取产品失败: ${productsError.message}`);
    }
    
    console.log(`找到 ${products.length} 个产品`);
    
    const productsToDelete = [];
    const validProducts = [];
    
    for (const product of products) {
      let hasValidImage = false;
      
      if (product.images) {
        // Check main image
        if (product.images.main && await checkImageExists(product.images.main)) {
          hasValidImage = true;
        }
        
        // Check thumbnail
        if (!hasValidImage && product.images.thumbnail && await checkImageExists(product.images.thumbnail)) {
          hasValidImage = true;
        }
        
        // Check gallery images
        if (!hasValidImage && product.images.gallery && Array.isArray(product.images.gallery)) {
          for (const galleryImage of product.images.gallery) {
            if (await checkImageExists(galleryImage)) {
              hasValidImage = true;
              break;
            }
          }
        }
      }
      
      if (hasValidImage) {
        validProducts.push(product);
        console.log(`✓ 保留产品: ${product.slug} (${product.sku})`);
      } else {
        productsToDelete.push(product);
        console.log(`✗ 标记删除: ${product.slug} (${product.sku}) - 没有有效图片`);
      }
    }
    
    console.log(`\n总结:`);
    console.log(`- 总产品数: ${products.length}`);
    console.log(`- 有效产品: ${validProducts.length}`);
    console.log(`- 需要删除: ${productsToDelete.length}`);
    
    if (productsToDelete.length > 0) {
      console.log('\n开始删除没有图片的产品...');
      
      for (const product of productsToDelete) {
        const { error: deleteError } = await supabase
          .from('products')
          .delete()
          .eq('id', product.id);
        
        if (deleteError) {
          console.error(`删除产品 ${product.slug} 失败:`, deleteError.message);
        } else {
          console.log(`✓ 已删除: ${product.slug}`);
        }
      }
      
      console.log(`\n清理完成! 删除了 ${productsToDelete.length} 个没有图片的产品`);
    } else {
      console.log('\n没有需要删除的产品');
    }
    
  } catch (error) {
    console.error('清理过程中出错:', error.message);
  }
}

// 运行清理
cleanupAluminumProducts();