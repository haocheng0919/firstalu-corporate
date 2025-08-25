const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://setmygkovqgthorwhvxd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldG15Z2tvdnFndGhvcndodnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NDE0MTcsImV4cCI6MjA2OTExNzQxN30.F2v2fDlUDCrtRs0eDMl595M_FcUKwgaftsNYX9UL6t4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Category mappings
const categoryMappings = {
  'sugarcane-plates': '27c2281f-9a63-4229-9bad-fd6cce2f8db5',
  'sugarcane-bowls': '6eaa30a0-b681-439e-9864-77d6b44657c5',
  'sugarcane-trays': 'c7acb91c-461c-42ea-a22f-2947dd7696e0',
  'sugarcane-clamshells': 'f1d55c9d-0115-42f6-b9d6-258312a21b1a'
};

// Function to determine category based on product name
function getCategoryForProduct(productName) {
  const name = productName.toLowerCase();
  
  if (name.includes('plate')) {
    return categoryMappings['sugarcane-plates'];
  } else if (name.includes('bowl')) {
    return categoryMappings['sugarcane-bowls'];
  } else if (name.includes('clamshell')) {
    return categoryMappings['sugarcane-clamshells'];
  } else {
    // Default to trays for everything else (trays, lids, boxes, etc.)
    return categoryMappings['sugarcane-trays'];
  }
}

// Function to reorganize products
async function reorganizeSugarcaneProducts() {
  try {
    console.log('开始重新组织甘蔗餐具产品分类...');
    
    // Get all products from sugarcane-tableware category
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, sku, name_i18n')
      .eq('category_id', 'df7abf38-1878-4bf4-a11f-a3da99788ab6'); // sugarcane-tableware main category
    
    if (fetchError) {
      throw fetchError;
    }
    
    console.log(`找到 ${products.length} 个产品需要重新分类`);
    
    let updatedCount = 0;
    
    for (const product of products) {
      const productName = product.name_i18n?.en || '';
      const newCategoryId = getCategoryForProduct(productName);
      
      // Update product category
      const { error: updateError } = await supabase
        .from('products')
        .update({ category_id: newCategoryId })
        .eq('id', product.id);
      
      if (updateError) {
        console.error(`更新产品 ${product.sku} 失败:`, updateError);
      } else {
        console.log(`✓ 产品 ${product.sku} (${productName}) 已移动到新分类`);
        updatedCount++;
      }
    }
    
    console.log(`\n重新分类完成！共更新了 ${updatedCount} 个产品`);
    
    // Show final category distribution
    console.log('\n最终分类分布:');
    for (const [slug, categoryId] of Object.entries(categoryMappings)) {
      const { data: categoryProducts } = await supabase
        .from('products')
        .select('id')
        .eq('category_id', categoryId);
      
      console.log(`${slug}: ${categoryProducts?.length || 0} 个产品`);
    }
    
  } catch (error) {
    console.error('重新组织产品时出错:', error);
  }
}

// Run the reorganization
reorganizeSugarcaneProducts();