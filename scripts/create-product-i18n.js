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

// Function to create i18n records for a product
async function createProductI18n(productId, sku) {
  const defaultDescription = 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.';
  
  const i18nData = [
    {
      product_id: productId,
      locale: 'en',
      name: `${sku} - Aluminum Foil Container`,
      intro: `Professional aluminum foil container ${sku} for food service applications`,
      description: defaultDescription
    },
    {
      product_id: productId,
      locale: 'es',
      name: `${sku} - Contenedor de Papel de Aluminio`,
      intro: `Contenedor profesional de papel de aluminio ${sku} para aplicaciones de servicio de alimentos`,
      description: 'Los contenedores de papel de aluminio tienen muchas ventajas, ya sea que los alimentos se horneen, enfríen, congelen, cocinen al vapor, asen o estén frescos, el contenedor permanece a prueba de olores, resistente a la temperatura y fácil de manejar.'
    },
    {
      product_id: productId,
      locale: 'de',
      name: `${sku} - Aluminiumfolienbehälter`,
      intro: `Professioneller Aluminiumfolienbehälter ${sku} für Lebensmittelservice-Anwendungen`,
      description: 'Aluminiumfolienbehälter haben viele Vorteile. Ob die Lebensmittel gebacken, gekühlt, gefroren, gedämpft, geröstet oder frisch sind, der Behälter bleibt geruchsdicht, temperaturbeständig und einfach zu handhaben.'
    },
    {
      product_id: productId,
      locale: 'fr',
      name: `${sku} - Conteneur en Papier d'Aluminium`,
      intro: `Conteneur professionnel en papier d'aluminium ${sku} pour diverses applications de service alimentaire`,
      description: 'Les contenants en papier d\'aluminium ont de nombreux avantages, que les aliments soient cuits, refroidis, congelés, cuits à la vapeur, rôtis ou frais, le contenant reste étanche aux odeurs, résistant à la température et facile à manipuler.'
    }
  ];

  try {
    const { data, error } = await supabase
      .from('product_i18n')
      .insert(i18nData);

    if (error) {
      console.error(`❌ Error creating i18n for ${sku}:`, error);
      return false;
    }

    console.log(`✅ Created i18n records for ${sku}`);
    return true;
  } catch (error) {
    console.error(`❌ Exception creating i18n for ${sku}:`, error);
    return false;
  }
}

// Main function to create i18n for all products
async function createAllProductI18n() {
  console.log('Starting product i18n creation...');
  
  try {
    // Get all products from database
    const { data: products, error } = await supabase
      .from('products')
      .select('id, sku')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching products:', error);
      return;
    }

    if (!products || products.length === 0) {
      console.log('No products found in database');
      return;
    }

    console.log(`Found ${products.length} products to process`);

    let successCount = 0;
    let errorCount = 0;

    // Create i18n records for each product
    for (const product of products) {
      const success = await createProductI18n(product.id, product.sku);
      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n📊 I18n Creation Summary:');
    console.log(`✅ Successfully created: ${successCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);
    console.log(`📦 Total products processed: ${products.length}`);
    
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run the script
createAllProductI18n().then(() => {
  console.log('Script completed');
  process.exit(0);
}).catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});