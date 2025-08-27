const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Additional details content (优点和应用场景)
const additionalDetails = {
  en: `**Aluminum Foil Container Advantages**

Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point and environmental sustainability.

**Applications:**
• Disposable bakery trays
• Takeaway containers  
• Air fryer trays
• Airline food containers
• Food service or buffet pans
• Oven trays
• BBQ pans`,
  zh: `**铝箔容器优势**

铝箔容器具有许多优势，无论食物是烘烤、冷藏、冷冻、蒸煮、烘烤还是新鲜的，容器都能保持无异味、耐温且易于处理。我们的容器采用厚铝箔制成，提供功能、价格和环境可持续性的最佳组合。

**应用场景：**
• 一次性烘焙托盘
• 外卖容器
• 空气炸锅托盘
• 航空餐食容器
• 餐饮服务或自助餐盘
• 烤箱托盘
• 烧烤盘`
};

// Technical specifications template (尺寸规格模板)
const technicalSpecsTemplate = {
  height: '45mm',
  volume: '750ml',
  top_dimensions: '184*128mm',
  carton_quantity: '1000PCS/CARTON',
  bottom_dimensions: '157*101mm'
};

async function updateAluminumFoilProducts() {
  try {
    console.log('开始更新铝箔容器产品信息...');
    
    // 获取所有铝箔容器相关产品
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, slug, sku, name_i18n, technical_specs, description_i18n')
      .or('slug.ilike.%aluminum%,slug.ilike.%foil%,sku.ilike.%c%,sku.ilike.%y%');
    
    if (fetchError) {
      console.error('获取产品失败:', fetchError);
      return;
    }
    
    console.log(`找到 ${products.length} 个相关产品`);
    
    let updatedCount = 0;
    
    for (const product of products) {
      try {
        // 更新描述信息为additional details
        const updatedDescriptionI18n = {
          ...product.description_i18n,
          ...additionalDetails
        };
        
        // 更新technical specs
        const updatedTechnicalSpecs = {
          ...product.technical_specs,
          ...technicalSpecsTemplate
        };
        
        const { error: updateError } = await supabase
          .from('products')
          .update({
            description_i18n: updatedDescriptionI18n,
            technical_specs: updatedTechnicalSpecs
          })
          .eq('id', product.id);
        
        if (updateError) {
          console.error(`更新产品 ${product.slug} 失败:`, updateError);
        } else {
          console.log(`✓ 已更新产品: ${product.slug} (${product.sku || 'No SKU'})`);
          updatedCount++;
        }
        
      } catch (error) {
        console.error(`处理产品 ${product.slug} 时出错:`, error);
      }
    }
    
    console.log(`\n更新完成！共更新了 ${updatedCount} 个产品`);
    
  } catch (error) {
    console.error('脚本执行失败:', error);
  }
}

// 运行脚本
updateAluminumFoilProducts();