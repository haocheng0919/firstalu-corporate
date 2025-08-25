const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Supabase configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase configuration. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Base directory for product images
const baseDir = '/Users/haochengwang/Desktop/claude/firstalu/public/product_img';

// Category mapping with descriptions
const categoryDescriptions = {
  'Aluminum Foil': {
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point. and environmental sustainability.',
    applications: ['Disposable bakery trays', 'Takeaway containers', 'Air fryer trays', 'Airline food containers', 'Food service or buffet pans', 'Oven trays', 'BBQ pans']
  },
  'Baking Paper': {
    description: 'High-quality baking paper for professional and home use. Non-stick, heat-resistant, and food-safe.',
    applications: ['Baking', 'Cooking', 'Food preparation', 'Oven use']
  },
  'Disposable Cutlery': {
    description: 'Eco-friendly disposable cutlery made from sustainable materials. Perfect for restaurants, events, and takeaway services.',
    applications: ['Restaurants', 'Events', 'Takeaway', 'Catering', 'Food service']
  },
  'Kraft Packaging': {
    description: 'Sustainable kraft packaging solutions for food service industry. Made from renewable materials with excellent durability.',
    applications: ['Food packaging', 'Takeaway containers', 'Food service', 'Eco-friendly packaging']
  },
  'Paper Cups': {
    description: 'High-quality paper cups for hot and cold beverages. Available in various sizes and styles.',
    applications: ['Coffee shops', 'Restaurants', 'Events', 'Takeaway', 'Food service']
  },
  'Sugarcane Tableware': {
    description: 'Eco-friendly tableware made from sugarcane bagasse. Biodegradable and compostable.',
    applications: ['Eco-friendly dining', 'Sustainable food service', 'Biodegradable packaging', 'Green restaurants']
  }
};

// Function to normalize folder names
function normalizeName(name) {
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Function to create slug from name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Function to scan directory structure
function scanDirectory(dirPath, level = 0) {
  const items = [];
  
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory does not exist: ${dirPath}`);
    return items;
  }
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(dirPath, entry.name);
      const normalizedName = normalizeName(entry.name);
      
      // Check if this directory contains product images (webp files)
      const hasImages = fs.readdirSync(fullPath).some(file => file.endsWith('.webp'));
      
      if (hasImages) {
        // This is a product folder
        const images = fs.readdirSync(fullPath)
          .filter(file => file.endsWith('.webp'))
          .map(file => path.join(fullPath, file));
        
        items.push({
          type: 'product',
          name: normalizedName,
          slug: createSlug(normalizedName),
          path: fullPath,
          images: images,
          level: level
        });
      } else {
        // This is a category folder
        const children = scanDirectory(fullPath, level + 1);
        items.push({
          type: 'category',
          name: normalizedName,
          slug: createSlug(normalizedName),
          path: fullPath,
          children: children,
          level: level
        });
      }
    }
  }
  
  return items;
}

// Predefined category IDs
const mainCategoryIds = {
  'aluminum-foil': '61534b79-37af-4bce-874a-560082a2b551',
  'baking-paper': '03a87355-01f9-4049-8041-029aefe8e098',
  'disposable-cutlery': '713c85f9-a86e-4fc5-b947-11cf8e995dff',
  'kraft-packaging': '5b6edc4e-c163-4dc7-b212-e3e964a9c877',
  'paper-cups': '2538378e-ad81-489f-884f-25189288a173',
  'sugarcane-tableware': 'df7abf38-1878-4bf4-a11f-a3da99788ab6'
};

// Function to create category in database
async function createCategory(categoryData, parentId = null) {
  const categoryName = categoryData.name;
  const categorySlug = categoryData.slug;
  
  console.log(`Creating category: ${categoryName} (level ${categoryData.level})`);
  
  // If this is a main category, use the predefined ID
  if (parentId === null && mainCategoryIds[categorySlug]) {
    const { data: existingCategory } = await supabase
      .from('categories')
      .select('*')
      .eq('id', mainCategoryIds[categorySlug])
      .single();
    
    if (existingCategory) {
      console.log(`✓ Using existing main category: ${categoryName}`);
      return existingCategory;
    }
  }
  
  // Check if category already exists
  const { data: existingCategory } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .eq('parent_id', parentId)
    .single();
  
  if (existingCategory) {
    console.log(`✓ Category ${categoryName} already exists`);
    return existingCategory;
  }
  
  // Create category with i18n data
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .insert({
      slug: categorySlug,
      parent_id: parentId,
      name_i18n: {
        en: categoryName
      },
      description_i18n: {
        en: categoryDescriptions[categoryName]?.description || `${categoryName} products and accessories`
      }
    })
    .select()
    .single();
  
  if (categoryError) {
    console.error(`Error creating category ${categoryName}:`, categoryError);
    return null;
  }
  
  console.log(`✓ Created category: ${categoryName}`);
  return category;
}

// Function to create product in database
async function createProduct(productData, categoryId, categoryName) {
  const productName = productData.name;
  const productSlug = productData.slug;
  
  console.log(`Creating product: ${productName}`);
  
  // Get category description
  const categoryDesc = categoryDescriptions[categoryName] || categoryDescriptions['Aluminum Foil'];
  const baseDescription = categoryDesc.description;
  const applications = categoryDesc.applications || [];
  const fullDescription = applications.length > 0 
    ? `${baseDescription}\n\nApplications:\n${applications.map((app, index) => `${index + 1}. ${app}`).join('\n')}`
    : baseDescription;
  
  // Create product with i18n data
  const { data: product, error: productError } = await supabase
    .from('products')
    .insert({
      slug: productSlug,
      sku: productSlug.toUpperCase(),
      category_id: categoryId,
      status: 'active',
      images: productData.images.map((imagePath, index) => ({
        url: imagePath.replace('/Users/haochengwang/Desktop/claude/firstalu/public', ''),
        alt: `${productName} - Image ${index + 1}`,
        isPrimary: index === 0
      })),
      name_i18n: {
        en: productName
      },
      description_i18n: {
        en: fullDescription
      }
    })
    .select()
    .single();
  
  if (productError) {
    console.error(`Error creating product ${productName}:`, productError);
    return null;
  }
  
  console.log(`✓ Created product: ${productName}`);
  return product;
}

// Function to process category and its children
async function processCategory(categoryData, parentId = null, rootCategoryName = null) {
  const category = await createCategory(categoryData, parentId);
  if (!category) return;
  
  // Use the root category name for product descriptions
  const categoryNameForProducts = rootCategoryName || categoryData.name;
  
  // Process children
  for (const child of categoryData.children) {
    if (child.type === 'category') {
      await processCategory(child, category.id, categoryNameForProducts);
    } else if (child.type === 'product') {
      await createProduct(child, category.id, categoryNameForProducts);
    }
  }
}

// Main function
async function main() {
  console.log('Starting to recreate products from folder structure...');
  
  // Clear existing data
  console.log('Clearing existing data...');
  await supabase.from('product_images').delete().neq('id', 0);
  await supabase.from('product_i18n').delete().neq('id', 0);
  await supabase.from('products').delete().neq('id', 0);
  await supabase.from('category_i18n').delete().neq('id', 0);
  await supabase.from('categories').delete().neq('id', 0);
  
  // Get main category folders
  const mainFolders = [
    'Aluminum-Foil',
    'Baking-Paper', 
    'Disposable Cutlery',
    'Kraft Packaging',
    'Paper Cups',
    'Sugarcane Tableware'
  ];
  
  for (const folderName of mainFolders) {
    const folderPath = path.join(baseDir, folderName);
    console.log(`\nProcessing main category: ${folderName}`);
    
    if (!fs.existsSync(folderPath)) {
      console.log(`Folder does not exist: ${folderPath}`);
      continue;
    }
    
    const normalizedName = normalizeName(folderName);
    const structure = {
      type: 'category',
      name: normalizedName,
      slug: createSlug(normalizedName),
      path: folderPath,
      children: scanDirectory(folderPath, 1),
      level: 0
    };
    
    await processCategory(structure);
  }
  
  console.log('\nFinished recreating products from folder structure!');
}

// Run the script
main().catch(console.error);