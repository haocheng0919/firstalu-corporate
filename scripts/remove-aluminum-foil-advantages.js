const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function removeAluminumFoilAdvantages() {
  try {
    console.log('开始移除产品描述中的"Aluminum Foil Container Advantages"文本...');
    
    // 获取所有产品
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, slug, description_i18n');
    
    if (fetchError) {
      console.error('获取产品失败:', fetchError);
      return;
    }
    
    console.log(`找到 ${products.length} 个产品`);
    
    let updatedCount = 0;
    
    for (const product of products) {
      try {
        let needsUpdate = false;
        const updatedDescriptionI18n = { ...product.description_i18n };
        
        // 检查并清理英文描述
        if (updatedDescriptionI18n.en && updatedDescriptionI18n.en.includes('**Aluminum Foil Container Advantages**')) {
          // 移除整个"Aluminum Foil Container Advantages"部分
          updatedDescriptionI18n.en = updatedDescriptionI18n.en
            .replace(/\*\*Aluminum Foil Container Advantages\*\*[\s\S]*?(?=\*\*|$)/g, '')
            .trim();
          needsUpdate = true;
        }
        
        // 检查并清理中文描述
        if (updatedDescriptionI18n.zh && updatedDescriptionI18n.zh.includes('**铝箔容器优势**')) {
          // 移除整个"铝箔容器优势"部分
          updatedDescriptionI18n.zh = updatedDescriptionI18n.zh
            .replace(/\*\*铝箔容器优势\*\*[\s\S]*?(?=\*\*|$)/g, '')
            .trim();
          needsUpdate = true;
        }
        
        if (needsUpdate) {
          const { error: updateError } = await supabase
            .from('products')
            .update({
              description_i18n: updatedDescriptionI18n
            })
            .eq('id', product.id);
          
          if (updateError) {
            console.error(`更新产品 ${product.slug} 失败:`, updateError);
          } else {
            console.log(`✓ 已清理产品: ${product.slug}`);
            updatedCount++;
          }
        }
        
      } catch (error) {
        console.error(`处理产品 ${product.slug} 时出错:`, error);
      }
    }
    
    console.log(`\n清理完成！共更新了 ${updatedCount} 个产品`);
    
  } catch (error) {
    console.error('脚本执行失败:', error);
  }
}

// 运行脚本
removeAluminumFoilAdvantages();