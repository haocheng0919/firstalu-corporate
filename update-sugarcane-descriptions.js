const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '/Users/haochengwang/Desktop/claude/firstalu/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Sugarcane product specifications based on provided data
const sugarcaneSpecs = {
  // Plates
  '6-inch': {
    name: '6 Inch Plate',
    size: 'φ155*15mm',
    innerPackage: '6 pieces',
    specification: '50/bag, 20bag/ctn',
    ctnSize: '32.5*26.5*32.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '7-inch': {
    name: '7 Inch Plate',
    size: 'φ175*15.8mm',
    innerPackage: '8 pieces',
    specification: '125/bag, 8bag/ctn',
    ctnSize: '36.5*28.5*36.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '8-86-inch': {
    name: '8.86 Inch Plate',
    size: 'φ225*19.5mm',
    innerPackage: '15 pieces',
    specification: '125/bag, 4bag/ctn',
    ctnSize: '46.5*31.5*24cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '8-86-inch-3-compartment': {
    name: '8.86 Inch 3 Compartment Plate',
    size: 'φ225*19.5mm',
    innerPackage: '15 pieces',
    specification: '125/bag, 4bag/ctn',
    ctnSize: '46.5*34.5*24cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '9-inch': {
    name: '9 Inch Plate',
    size: 'φ230*19.6mm',
    innerPackage: '15 pieces',
    specification: '50/bag, 10bag/ctn',
    ctnSize: '47*35*24.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '10-inch': {
    name: '10 Inch Plate',
    size: 'φ260*20.6mm',
    innerPackage: '20 pieces',
    specification: '125/bag, 4bag/ctn',
    ctnSize: '53.5*32.5*27cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '10-inch-3-compartment': {
    name: '10 Inch 3 Compartment Plate',
    size: 'φ260*25.5mm',
    innerPackage: '20 pieces',
    specification: '125/bag, 4bag/ctn',
    ctnSize: '53.5*34.5*27cm',
    features: 'Food-grade materials, Suitable for refrigeration/microwave oven, Thick texture, Compostable degradation'
  },
  '8-inch-oval-plate': {
    name: '8 Inch Oval Plate',
    size: '264×200×H19.4mm',
    innerPackage: '17 pieces',
    specification: '50/bag, 10bag/ctn',
    ctnSize: '54×34.5×21.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '10-inch-oval-plate': {
    name: '10 Inch Oval Plate',
    size: '319×256×H24mm',
    innerPackage: '30 pieces',
    specification: '50/bag, 10bag/ctn',
    ctnSize: '53×32×33.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '7-inch-cake-tray': {
    name: '7 Inch Cake Tray',
    size: 'φ175×9.6mm',
    innerPackage: '9 pieces',
    specification: '125/bag, 8bags/ctn',
    ctnSize: '37×37×23cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '8-inch-cake-tray': {
    name: '8 Inch Cake Tray',
    size: 'φ210×17.6mm',
    innerPackage: '11 pieces',
    specification: '125/bag, 8bags/ctn',
    ctnSize: '43×43×22cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '6-inch-square-plate': {
    name: '6 Inch Square Plate',
    size: '160×160×15mm',
    innerPackage: '13 pieces',
    specification: '50/bag, 10bags/ctn',
    ctnSize: '34×28×17cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '8-inch-square-plate': {
    name: '8 Inch Square Plate',
    size: '200×200×15mm',
    innerPackage: '17 pieces',
    specification: '50/bag, 10bags/ctn',
    ctnSize: '56×21×21cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '10-inch-square-plate': {
    name: '10 Inch Square Plate',
    size: '260×260×15mm',
    innerPackage: '30 pieces',
    specification: '50/bag, 10bags/ctn',
    ctnSize: '57×27×27cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },

  // Bowls
  '260ml': {
    name: '260ml Bowl',
    size: 'φ115×44.5mm',
    innerPackage: '6 pieces',
    specification: '50/bag, 20bags/ctn',
    ctnSize: '48×24.5×24.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '350ml': {
    name: '350ml Bowl',
    size: 'φ135×48mm',
    innerPackage: '8 pieces',
    specification: '50/bag, 20bags/ctn',
    ctnSize: '56.5×28×28.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '500ml': {
    name: '500ml Bowl',
    size: 'φ155×58mm',
    innerPackage: '14 pieces',
    specification: '125/bag, 8bag/ctn',
    ctnSize: '68×33×33cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '650ml': {
    name: '650ml Bowl',
    size: 'φ188×39.6mm',
    innerPackage: '14 pieces',
    specification: '50/bag, 20bags/ctn',
    ctnSize: '39×36×39cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '12oz': {
    name: '12oz Bowl',
    size: 'φ160×37.5mm',
    innerPackage: '10 pieces',
    specification: '125/bag, 8bag/ctn',
    ctnSize: '54.5×33×33.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '16oz': {
    name: '16oz Bowl',
    size: 'φ175×40mm',
    innerPackage: '12 pieces',
    specification: '125/bag, 6bag/ctn',
    ctnSize: '55.5×34×36.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '6inch-bowl': {
    name: '6 Inch Bowl',
    size: 'φ160×34.7mm',
    innerPackage: '10 pieces',
    specification: '50/bag, 10bags/ctn',
    ctnSize: '33.5×33.5×38.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },

  // Clamshells
  '450ml-clamshell': {
    name: '450ml Clamshell',
    size: '248×175.5×H54.5mm (Open)',
    innerPackage: '15 pieces',
    specification: '50/bag, 10bags/ctn',
    ctnSize: '38.5×26.5×37cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '600ml-clamshell': {
    name: '600ml Clamshell',
    size: '187×272×H45.5mm (Open)',
    innerPackage: '20 pieces',
    specification: '50/bag, 10bags/ctn',
    ctnSize: '51.5×29×39cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '9x6-inch-clamshell': {
    name: '9X6 Inch Clamshell',
    size: '228×155×H76mm (Close), 228×300×H46mm (Open)',
    innerPackage: '30 pieces',
    specification: '50/bag, 4bags/ctn',
    ctnSize: '47.5×33.5×24.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '9x6-2-inch-clamshel': {
    name: '9X6 2 Inch Clamshell',
    size: '228×309×H46mm (Open)',
    innerPackage: '30 pieces',
    specification: '50/bag, 4bags/ctn',
    ctnSize: '33.5×33×24.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '9x6-2-compartment-clamshell': {
    name: '9X6 2 Compartment Clamshell',
    size: '228×309×H46mm (Open)',
    innerPackage: '30 pieces',
    specification: '50/bag, 4bags/ctn',
    ctnSize: '33.5×33×24.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '8-inch-clamshell-3-compartment': {
    name: '8 Inch Clamshell 3 Compartment',
    size: '438×210×44.3mm',
    innerPackage: '38 pieces',
    specification: '50/bag, 4bags/ctn',
    ctnSize: '46×35×22cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '9-inch-clamshell-3-compartment': {
    name: '9 Inch Clamshell 3 Compartment',
    size: '464×228×47mm (Open)',
    innerPackage: '42 pieces',
    specification: '100/bag, 2bags/ctn',
    ctnSize: '48×34×24cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '8-inch-clamshell': {
    name: '8 Inch Clamshell',
    size: '438×210×44.3mm',
    innerPackage: '38 pieces',
    specification: '50/bag, 4bags/ctn',
    ctnSize: '46×35×22cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '9-inch-clamshell': {
    name: '9 Inch Clamshell',
    size: '464×228×47mm (Open)',
    innerPackage: '42 pieces',
    specification: '100/bag, 2bags/ctn',
    ctnSize: '48×32×24cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '6-inch-hamburg-box': {
    name: '6 Inch Hamburg Box',
    size: '159×151×79mm (Closed), 311×151×36.6mm (Open)',
    innerPackage: '21 pieces',
    specification: '50/bag, 10bags/ctn',
    ctnSize: '52.5×32.5×32.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },

  // Packing Boxes
  '550ml-square-packing-box': {
    name: '550ml Square Packing Box',
    size: '180×125×45mm',
    innerPackage: '15 pieces',
    specification: '50/bag, 6bags/ctn',
    ctnSize: '48×27×19.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '650ml-square-packing-box': {
    name: '650ml Square Packing Box',
    size: '180×125×55mm',
    innerPackage: '17 pieces',
    specification: '50/bag, 6bags/ctn',
    ctnSize: '48×27×19.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '750ml-square-packing-box': {
    name: '750ml Square Packing Box',
    size: '180×125×62mm',
    innerPackage: '18 pieces',
    specification: '50/bag, 6bags/ctn',
    ctnSize: '48×27×19.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '700ml-packing-box': {
    name: '700ml Packing Box',
    size: '195×115×51mm',
    innerPackage: '16 pieces (box)',
    specification: '50/bag, 10bags/ctn',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '850ml-packing-box': {
    name: '850ml Packing Box',
    size: '234×132×50.7mm',
    innerPackage: '22 pieces',
    specification: '50/bag, 10bags/ctn',
    ctnSize: '69.5×35×25cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '850ml-2-compartment-packing-box': {
    name: '850ml 2 Compartment Packing Box',
    size: '234×132×50.7mm',
    innerPackage: '22 pieces',
    specification: '50/bag, 10bags/ctn',
    ctnSize: '67×25×28cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '850ml-packing-lid': {
    name: '850ml Packing Lid',
    size: '240×137×15.6mm',
    innerPackage: '14 pieces (lid)',
    specification: '50/bag, 10bags/ctn',
    ctnSize: '70.5×38×26cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '1000ml-packing-box': {
    name: '1000ml Packing Box',
    size: '234×132×60.7mm',
    innerPackage: '24 pieces',
    specification: '50/bag, 10bags/ctn',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '1000ml-2-compartment-packing-box': {
    name: '1000ml 2 Compartment Packing Box',
    size: '234×132×60.7mm',
    innerPackage: '24 pieces',
    specification: '50/bag, 10bags/ctn',
    ctnSize: '68×36×25cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '1000ml-packing-lid': {
    name: '1000ml Packing Lid',
    size: '240×137×15.6mm',
    innerPackage: '14 pieces',
    specification: '50/bag, 10bags/ctn',
    ctnSize: '70.5×38×26cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },

  // Trays
  '5-compartment-tray': {
    name: '5 Compartment Tray',
    size: '260×210×24.5mm',
    weight: '24g',
    innerPackage: '24 pieces',
    specification: '50/bag, 10bags/ctn',
    ctnSize: '44×37×27.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '1100ml-4-compartment-tray': {
    name: '1100ml 4 Compartment Tray',
    size: '225×175×39mm',
    weight: '25g',
    innerPackage: '25 pieces',
    specification: '50/bag, 8bags/ctn',
    ctnSize: '59.5×37.5×24cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '1100ml-universal-tray-lid': {
    name: '1100ml Universal Tray Lid',
    size: '230×180×15mm',
    weight: '13g',
    innerPackage: '13 pieces',
    specification: '50/bag, 10bags/ctn',
    ctnSize: '42.5×38×24.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '1100ml-small-3-compartment-tray': {
    name: '1100ml Small 3 Compartment Tray',
    size: '225×175×39mm',
    weight: '24g',
    innerPackage: '24 pieces',
    specification: '50/bag, 8bags/ctn',
    ctnSize: '61×36.5×24cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '1200ml-medium-3-compartment-tray': {
    name: '1200ml Medium 3 Compartment Tray',
    size: '237×216×138mm',
    weight: '30g',
    innerPackage: '30 pieces',
    specification: '50/bag, 6bags/ctn',
    ctnSize: '46×30×25.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '1200ml-medium-4-compartment-tray': {
    name: '1200ml Medium 4 Compartment Tray',
    size: '237×216×138mm',
    weight: '31g',
    innerPackage: '31 pieces',
    specification: '50/bag, 6bags/ctn',
    ctnSize: '46.5×38×36.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '1200ml-universal-tray-lid': {
    name: '1200ml Universal Tray Lid',
    size: '243×221×16mm',
    weight: '20g',
    innerPackage: '20 pieces',
    specification: '50/bag, 6bags/ctn',
    ctnSize: '46.5×40×25.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  'large-4-compartment-tray': {
    name: '1400ml Large 4 Compartment Tray',
    size: '278×208×39mm',
    weight: '38g',
    innerPackage: '38 pieces',
    specification: '50/bag, 4bags/ctn',
    ctnSize: '45×32.5×29.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '1400ml-5-compartment-tray-w-bowl-corner': {
    name: '1400ml 5 Compartment Tray W Bowl Corner',
    size: '278×208×39mm',
    weight: '38g',
    innerPackage: '38 pieces',
    specification: '50/bag, 4bags/ctn',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '6-compartment-tray': {
    name: '1400ml 6 Compartment Tray',
    size: '278×208×39mm',
    weight: '38g',
    innerPackage: '38 pieces',
    specification: '50/bag, 4bags/ctn',
    ctnSize: '44×35.5×29.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '1400ml-5-compartment-tray-w-bowl-center': {
    name: '1400ml 5 Compartment Tray W Bowl Center',
    size: '278×208×39mm',
    weight: '38g',
    innerPackage: '38 pieces',
    specification: '50/bag, 4bags/ctn',
    ctnSize: '44×25×29.5cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '1400ml-universal-tray-lid': {
    name: '1400ml Universal Tray Lid',
    size: '285×217×16mm',
    weight: '20g',
    innerPackage: '20 pieces',
    specification: '50/bag, 4bags/ctn',
    ctnSize: '45×27×30cm',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  },
  '400ml-5-compartment-tray-w-bowl-corner': {
    name: '400ml 5 Compartment Tray W Bowl Corner',
    size: '278×208×39mm',
    weight: '38g',
    innerPackage: '38 pieces',
    specification: '50/bag, 4bags/ctn',
    features: 'Food-grade material, Refrigerable/Microwaveable, Solid quality, Compostable degradation'
  }
};

async function updateProductDescriptions() {
  console.log('Starting to update Sugarcane product descriptions...');

  for (const [slug, specs] of Object.entries(sugarcaneSpecs)) {
    try {
      const description = `Premium sugarcane bagasse ${specs.name.toLowerCase()} crafted from sustainable materials.

**Specifications:**
- Size: ${specs.size}
- Inner Package: ${specs.innerPackage}
- Packaging: ${specs.specification}
- Carton Size: ${specs.ctnSize}

**Features:**
- ${specs.features.replace(/√/g, '').replace(/\n/g, '\n- ')}

Made from renewable sugarcane bagasse, these eco-friendly products offer excellent durability and are perfect for food service applications.`;

      const { error } = await supabase
        .from('products')
        .update({
          name_i18n: { en: specs.name },
          description_i18n: { en: description }
        })
        .eq('slug', slug);

      if (error) {
        console.error(`Error updating ${slug}:`, error);
      } else {
        console.log(`✅ Updated ${slug}`);
      }
    } catch (error) {
      console.error(`Error processing ${slug}:`, error);
    }
  }

  console.log('Finished updating product descriptions!');
}

updateProductDescriptions();
