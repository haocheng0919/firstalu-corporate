const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Translation mappings for Chinese terms
const translations = {
  '汤桶': {
    en: 'Soup Cup',
    de: 'Suppenbecher',
    es: 'Vaso de Sopa',
    fr: 'Gobelet à Soupe'
  },
  '沙拉碗': {
    en: 'Salad Bowl',
    de: 'Salatschüssel',
    es: 'Bol de Ensalada',
    fr: 'Bol à Salade'
  },
  '面碗': {
    en: 'Noodle Bowl',
    de: 'Nudelschale',
    es: 'Bol de Fideos',
    fr: 'Bol à Nouilles'
  },
  '瓦楞纸碗': {
    en: 'Corrugated Paper Bowl',
    de: 'Wellpappschale',
    es: 'Bol de Papel Corrugado',
    fr: 'Bol en Papier Ondulé'
  },
  '打包盒': {
    en: 'Takeaway Box',
    de: 'Mitnahmebox',
    es: 'Caja para Llevar',
    fr: 'Boîte à Emporter'
  },
  '盘子': {
    en: 'Plate',
    de: 'Teller',
    es: 'Plato',
    fr: 'Assiette'
  },
  '单层杯': {
    en: 'Single Wall Cup',
    de: 'Einwandbecher',
    es: 'Vaso de Pared Simple',
    fr: 'Gobelet Simple Paroi'
  },
  '凸盖杯子': {
    en: 'Dome Lid Cup',
    de: 'Kuppeldeckelbecher',
    es: 'Vaso con Tapa Cúpula',
    fr: 'Gobelet à Couvercle Dôme'
  },
  '盖子': {
    en: 'Lid',
    de: 'Deckel',
    es: 'Tapa',
    fr: 'Couvercle'
  },
  '冷饮杯': {
    en: 'Cold Drink Cup',
    de: 'Kaltgetränkebecher',
    es: 'Vaso para Bebidas Frías',
    fr: 'Gobelet pour Boissons Froides'
  },
  '中空杯': {
    en: 'Double Wall Cup',
    de: 'Doppelwandbecher',
    es: 'Vaso de Doble Pared',
    fr: 'Gobelet Double Paroi'
  },
  '个': {
    en: 'Piece',
    de: 'Stück',
    es: 'Pieza',
    fr: 'Pièce'
  },
  '白': {
    en: 'White',
    de: 'Weiß',
    es: 'Blanco',
    fr: 'Blanc'
  },
  '蓝': {
     en: 'Blue',
     de: 'Blau',
     es: 'Azul',
     fr: 'Bleu'
   },
   '塑盖': {
     en: 'Plastic Lid',
     de: 'Kunststoffdeckel',
     es: 'Tapa de Plástico',
     fr: 'Couvercle Plastique'
   },
   '纸盖': {
     en: 'Paper Lid',
     de: 'Papierdeckel',
     es: 'Tapa de Papel',
     fr: 'Couvercle Papier'
   },
   '实际直径约': {
     en: 'Actual Diameter Approx',
     de: 'Tatsächlicher Durchmesser ca.',
     es: 'Diámetro Real Aprox',
     fr: 'Diamètre Réel Environ'
   },
   '实际容量约': {
     en: 'Actual Capacity Approx',
     de: 'Tatsächliche Kapazität ca.',
     es: 'Capacidad Real Aprox',
     fr: 'Capacité Réelle Environ'
   },
   'mm': {
     en: 'mm',
     de: 'mm',
     es: 'mm',
     fr: 'mm'
   },
   'ml': {
      en: 'ml',
      de: 'ml',
      es: 'ml',
      fr: 'ml'
    },
    '盖': {
      en: 'Lid',
      de: 'Deckel',
      es: 'Tapa',
      fr: 'Couvercle'
    },
    '塑': {
      en: 'Plastic',
      de: 'Kunststoff',
      es: 'Plástico',
      fr: 'Plastique'
    },
    '际': {
      en: '',
      de: '',
      es: '',
      fr: ''
    },
    '直径约': {
      en: 'Diameter Approx',
      de: 'Durchmesser ca.',
      es: 'Diámetro Aprox',
      fr: 'Diamètre Environ'
    }
  };

// Function to translate Chinese text to multiple languages
function translateChineseText(chineseText) {
  // Check if we have a direct translation
  if (translations[chineseText]) {
    return translations[chineseText];
  }
  
  // For complex names, try to break them down and translate parts
  let result = {
    en: chineseText,
    de: chineseText,
    es: chineseText,
    fr: chineseText
  };
  
  // Replace known Chinese terms
  Object.keys(translations).forEach(chineseTerm => {
    if (chineseText.includes(chineseTerm)) {
      result.en = result.en.replace(chineseTerm, translations[chineseTerm].en);
      result.de = result.de.replace(chineseTerm, translations[chineseTerm].de);
      result.es = result.es.replace(chineseTerm, translations[chineseTerm].es);
      result.fr = result.fr.replace(chineseTerm, translations[chineseTerm].fr);
    }
  });
  
  return result;
}

// Function to update product with translations
async function updateProductTranslations(product) {
  const chineseName = product.name_i18n.en;
  const translatedName = translateChineseText(chineseName);
  
  // Update name_i18n
  const updatedNameI18n = {
    en: translatedName.en,
    de: translatedName.de,
    es: translatedName.es,
    fr: translatedName.fr
  };
  
  // Update images with translated alt text
  const updatedImages = product.images.map(image => ({
    ...image,
    alt: {
      en: `${translatedName.en} - Image`,
      de: `${translatedName.de} - Bild`,
      es: `${translatedName.es} - Imagen`,
      fr: `${translatedName.fr} - Image`
    }
  }));
  
  // Update description_i18n with multilingual content
  const updatedDescriptionI18n = {
    en: `High-quality ${translatedName.en.toLowerCase()} for food service applications. Made from sustainable materials with excellent durability.\n\nApplications:\n1. Food packaging\n2. Takeaway containers\n3. Food service\n4. Eco-friendly packaging`,
    de: `Hochwertige ${translatedName.de.toLowerCase()} für Gastronomie-Anwendungen. Hergestellt aus nachhaltigen Materialien mit ausgezeichneter Haltbarkeit.\n\nAnwendungen:\n1. Lebensmittelverpackung\n2. Takeaway-Behälter\n3. Gastronomie\n4. Umweltfreundliche Verpackung`,
    es: `${translatedName.es} de alta calidad para aplicaciones de servicio de alimentos. Fabricado con materiales sostenibles con excelente durabilidad.\n\nAplicaciones:\n1. Empaque de alimentos\n2. Contenedores para llevar\n3. Servicio de alimentos\n4. Empaque ecológico`,
    fr: `${translatedName.fr} de haute qualité pour les applications de service alimentaire. Fabriqué à partir de matériaux durables avec une excellente durabilité.\n\nApplications:\n1. Emballage alimentaire\n2. Contenants à emporter\n3. Service alimentaire\n4. Emballage écologique`
  };
  
  // Update introduction with multilingual content
  const updatedIntroduction = {
    en: `Professional ${translatedName.en.toLowerCase()} designed for commercial food service operations.`,
    de: `Professionelle ${translatedName.de.toLowerCase()} für kommerzielle Gastronomie-Betriebe entwickelt.`,
    es: `${translatedName.es} profesional diseñado para operaciones comerciales de servicio de alimentos.`,
    fr: `${translatedName.fr} professionnel conçu pour les opérations commerciales de service alimentaire.`
  };
  
  try {
    const { error } = await supabase
      .from('products')
      .update({
        name_i18n: updatedNameI18n,
        description_i18n: updatedDescriptionI18n,
        introduction: updatedIntroduction,
        images: updatedImages
      })
      .eq('id', product.id);
    
    if (error) {
      console.error(`Error updating product ${product.sku}:`, error);
      return false;
    }
    
    console.log(`✓ Updated product: ${product.sku} - ${translatedName.en}`);
    return true;
  } catch (error) {
    console.error(`Error updating product ${product.sku}:`, error);
    return false;
  }
}

// Main function
async function translateChineseProducts() {
  console.log('Starting translation of Chinese product names...');
  
  try {
    // Get all products with Chinese names
    const { data: products, error } = await supabase
      .from('products')
      .select('id, slug, sku, name_i18n, description_i18n, introduction, images');
    
    if (error) {
      console.error('Error fetching products:', error);
      return;
    }

    if (!products || products.length === 0) {
      console.log('No products found.');
      return;
    }

    // Filter products with Chinese characters
    const chineseProducts = products.filter(product => {
      const englishName = product.name_i18n?.en || '';
      return /[\u4e00-\u9fff]/.test(englishName);
    });

    if (chineseProducts.length === 0) {
      console.log('No products found with Chinese names.');
      return;
    }
    
    console.log(`Found ${chineseProducts.length} products with Chinese names to translate`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const product of chineseProducts) {
      const success = await updateProductTranslations(product);
      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
      
      // Add a small delay to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\nTranslation completed!`);
    console.log(`✓ Successfully updated: ${successCount} products`);
    console.log(`✗ Failed to update: ${errorCount} products`);
    
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run the script
translateChineseProducts();