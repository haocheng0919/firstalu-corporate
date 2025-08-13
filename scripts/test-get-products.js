require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Replicate the getProducts function logic
async function testGetProducts() {
  try {
    console.log('Testing getProducts function...');
    
    // Step 1: Get products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (productsError) {
      console.error('Get products error:', productsError)
      return []
    }

    console.log(`Found ${products.length} products`);
    console.log('First product:', products[0]);

    // Step 2: Get i18n data for all products
    const productIds = products.map(p => p.id)
    const { data: i18nData, error: i18nError } = await supabase
      .from('product_i18n')
      .select('*')
      .in('product_id', productIds)

    if (i18nError) {
      console.error('Get product i18n error:', i18nError)
      return products || []
    }

    console.log(`Found ${i18nData.length} i18n records`);
    console.log('First i18n record:', i18nData[0]);

    // Step 3: Merge i18n data with products
    const productsWithI18n = products.map(product => {
      const productI18n = i18nData.filter(i18n => i18n.product_id === product.id)
      const merged = { ...product }

      productI18n.forEach(i18n => {
        if (i18n.locale === 'en') {
          merged.name = i18n.name
          merged.intro = i18n.intro
          merged.description = i18n.description
        } else {
          merged[`name_${i18n.locale}`] = i18n.name
          merged[`intro_${i18n.locale}`] = i18n.intro
          merged[`description_${i18n.locale}`] = i18n.description
        }
      })

      return merged
    })

    console.log(`Merged products: ${productsWithI18n.length}`);
    console.log('First merged product:', {
      id: productsWithI18n[0].id,
      sku: productsWithI18n[0].sku,
      name: productsWithI18n[0].name,
      intro: productsWithI18n[0].intro
    });

    return productsWithI18n || []
  } catch (error) {
    console.error('Get products error:', error)
    return []
  }
}

// Run the test
testGetProducts().then((result) => {
  console.log('\n📊 Test Results:');
  console.log(`✅ Total products returned: ${result.length}`);
  if (result.length > 0) {
    console.log('✅ Products have names:', result.filter(p => p.name).length);
    console.log('✅ Products have intros:', result.filter(p => p.intro).length);
  }
  process.exit(0);
}).catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});