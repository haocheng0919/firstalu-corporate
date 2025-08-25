const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Translation mappings for common terms
const translations = {
  // Container types
  'Smoothwall Rectangle Container': {
    en: 'Smoothwall Rectangle Container',
    de: 'Glattwand-Rechteckbehälter',
    es: 'Contenedor Rectangular de Pared Lisa',
    fr: 'Conteneur Rectangulaire à Paroi Lisse'
  },
  'Smoothwall Round Container': {
    en: 'Smoothwall Round Container',
    de: 'Glattwand-Rundbehälter',
    es: 'Contenedor Redondo de Pared Lisa',
    fr: 'Conteneur Rond à Paroi Lisse'
  },
  'Wrinklewall Rectangle Container': {
    en: 'Wrinklewall Rectangle Container',
    de: 'Faltenwand-Rechteckbehälter',
    es: 'Contenedor Rectangular de Pared Rugosa',
    fr: 'Conteneur Rectangulaire à Paroi Plissée'
  },
  'Wrinklewall Round Container': {
    en: 'Wrinklewall Round Container',
    de: 'Faltenwand-Rundbehälter',
    es: 'Contenedor Redondo de Pared Rugosa',
    fr: 'Conteneur Rond à Paroi Plissée'
  },
  'Wrinklewall Square Container': {
    en: 'Wrinklewall Square Container',
    de: 'Faltenwand-Quadratbehälter',
    es: 'Contenedor Cuadrado de Pared Rugosa',
    fr: 'Conteneur Carré à Paroi Plissée'
  },
  
  // Common descriptions
  'High-quality aluminum foil container': {
    en: 'High-quality aluminum foil container',
    de: 'Hochwertiger Aluminiumfolienbehälter',
    es: 'Contenedor de papel de aluminio de alta calidad',
    fr: 'Conteneur en papier d\'aluminium de haute qualité'
  },
  'Perfect for food packaging and storage': {
    en: 'Perfect for food packaging and storage',
    de: 'Perfekt für Lebensmittelverpackung und -lagerung',
    es: 'Perfecto para envasado y almacenamiento de alimentos',
    fr: 'Parfait pour l\'emballage et le stockage des aliments'
  },
  'Professional aluminum foil container designed for commercial and household use': {
    en: 'Professional aluminum foil container designed for commercial and household use',
    de: 'Professioneller Aluminiumfolienbehälter für gewerbliche und private Nutzung',
    es: 'Contenedor profesional de papel de aluminio diseñado para uso comercial y doméstico',
    fr: 'Conteneur professionnel en papier d\'aluminium conçu pour un usage commercial et domestique'
  },
  'offers excellent durability and food safety': {
    en: 'offers excellent durability and food safety',
    de: 'bietet hervorragende Haltbarkeit und Lebensmittelsicherheit',
    es: 'ofrece excelente durabilidad y seguridad alimentaria',
    fr: 'offre une excellente durabilité et sécurité alimentaire'
  }
};

// Function to generate translations for a product name
function generateNameTranslations(englishName) {
  // Extract model number from name
  const modelMatch = englishName.match(/([A-Z]\d+[-]?\d*)/i);
  const model = modelMatch ? modelMatch[1] : '';
  
  // Find base container type
  let baseType = '';
  for (const [key, value] of Object.entries(translations)) {
    if (englishName.includes(key)) {
      baseType = key;
      break;
    }
  }
  
  if (baseType && translations[baseType]) {
    return {
      en: englishName,
      de: `${translations[baseType].de} ${model}`,
      es: `${translations[baseType].es} ${model}`,
      fr: `${translations[baseType].fr} ${model}`
    };
  }
  
  // Fallback for products without specific translations
  return {
    en: englishName,
    de: englishName, // Keep English as fallback
    es: englishName,
    fr: englishName
  };
}

// Function to generate translations for descriptions
function generateDescriptionTranslations(englishDescription) {
  let translations_obj = {
    en: englishDescription,
    de: englishDescription,
    es: englishDescription,
    fr: englishDescription
  };
  
  // Apply common translation patterns
  for (const [englishPhrase, translationSet] of Object.entries(translations)) {
    if (englishDescription.includes(englishPhrase)) {
      translations_obj.de = translations_obj.de.replace(englishPhrase, translationSet.de);
      translations_obj.es = translations_obj.es.replace(englishPhrase, translationSet.es);
      translations_obj.fr = translations_obj.fr.replace(englishPhrase, translationSet.fr);
    }
  }
  
  return translations_obj;
}

async function updateProductTranslations() {
  try {
    console.log('Fetching all products...');
    
    // Fetch all products
    const { data: products, error } = await supabase
      .from('products')
      .select('id, slug, name_i18n, description_i18n');
    
    if (error) {
      throw error;
    }
    
    console.log(`Found ${products.length} products to update`);
    
    let updatedCount = 0;
    const batchSize = 10;
    
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      
      for (const product of batch) {
        try {
          // Get current English name and description
          const currentName = product.name_i18n?.en || product.slug;
          const currentDescription = product.description_i18n?.en || `High-quality ${product.slug} from our premium collection.`;
          
          // Generate new translations
          const newNameTranslations = generateNameTranslations(currentName);
          const newDescriptionTranslations = generateDescriptionTranslations(currentDescription);
          
          // Update the product
          const { error: updateError } = await supabase
            .from('products')
            .update({
              name_i18n: newNameTranslations,
              description_i18n: newDescriptionTranslations
            })
            .eq('id', product.id);
          
          if (updateError) {
            console.error(`Error updating product ${product.slug}:`, updateError);
          } else {
            updatedCount++;
            console.log(`Updated ${product.slug} (${updatedCount}/${products.length})`);
          }
          
        } catch (productError) {
          console.error(`Error processing product ${product.slug}:`, productError);
        }
      }
      
      // Small delay between batches to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\nTranslation update completed!`);
    console.log(`Successfully updated ${updatedCount} out of ${products.length} products`);
    
  } catch (error) {
    console.error('Error updating translations:', error);
  }
}

// Run the update
if (require.main === module) {
  updateProductTranslations();
}

module.exports = { updateProductTranslations };