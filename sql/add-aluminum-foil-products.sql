-- Add Aluminum Foil Roll Products to Database
-- Execute this script in Supabase SQL editor or via CLI

-- 1. Insert Aluminum Foil Roll Product
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'aluminum-foil-roll',
  'AFR-001', 
  'active',
  '13194b42-ebdd-4696-8851-afc26748badb',
  '{"sizes": [
    {"size": "300mm×7.62m", "thickness": "0.008mm-0.025mm", "quantity": "24 rolls/case"},
    {"size": "300mm×30m", "thickness": "0.008mm-0.025mm", "quantity": "24 rolls/case"},
    {"size": "300mm×75m", "thickness": "0.008mm-0.025mm", "quantity": "6 rolls/case"},
    {"size": "300mm×100m", "thickness": "0.008mm-0.025mm", "quantity": "6 rolls/case"},
    {"size": "300mm×100m", "thickness": "0.008mm-0.025mm", "quantity": "4 rolls/case"},
    {"size": "450mm×7.62m", "thickness": "0.008mm-0.025mm", "quantity": "24 rolls/case"},
    {"size": "450mm×30m", "thickness": "0.008mm-0.025mm", "quantity": "24 rolls/case"},
    {"size": "450mm×75m", "thickness": "0.008mm-0.025mm", "quantity": "6 rolls/case"},
    {"size": "450mm×100m", "thickness": "0.008mm-0.025mm", "quantity": "6 rolls/case"},
    {"size": "450mm×100m", "thickness": "0.008mm-0.025mm", "quantity": "4 rolls/case"}
  ]}',
  '{"material": "aluminum", "type": "foil_roll", "application": "food_packaging"}'
);

-- Add i18n data for Aluminum Foil Roll
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Aluminum Foil Roll',
  'High-quality aluminum foil rolls available in multiple sizes and thicknesses',
  'Professional aluminum foil rolls perfect for food packaging, cooking, and storage. Available in various sizes with detailed specifications. Details seen in E-catalogue from Download page.'
FROM products WHERE slug = 'aluminum-foil-roll';

-- 2. Insert Hairdressing Foil Roll Product
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'hairdressing-foil-roll',
  'HFR-001', 
  'active',
  'ceec4c30-31f2-4067-a527-876a6fe92062',
  '{"sizes": [
    {"length": "100mm", "width": "3-300m", "thickness": "0.009mm-0.030mm"},
    {"length": "120mm", "width": "3-300m", "thickness": "0.009mm-0.030mm"},
    {"length": "150mm", "width": "3-300m", "thickness": "0.009mm-0.030mm"},
    {"length": "200mm", "width": "3-300m", "thickness": "0.009mm-0.030mm"}
  ]}',
  '{"material": "aluminum", "type": "foil_roll", "application": "hairdressing"}'
);

-- Add i18n data for Hairdressing Foil Roll
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Hairdressing Foil Roll',
  'Professional hairdressing foil rolls for salon use',
  'Specialized aluminum foil rolls designed for professional hairdressing applications. Available in various widths and lengths. Details seen in E-catalogue from Download page.'
FROM products WHERE slug = 'hairdressing-foil-roll';

-- 3. Insert Pop-up Foil Sheets Product
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'pop-up-foil-sheets',
  'PFS-001',
  'active', 
  'fd74437a-3d37-4c3b-89f2-5a461c2fb805',
  '{"sizes": [
    {"width": "22.8mm", "quantity": "50-500", "thickness": "0.009mm-0.030mm"},
    {"width": "300mm", "quantity": "50-500", "thickness": "0.009mm-0.030mm"},
    {"width": "380mm", "quantity": "50-500", "thickness": "0.009mm-0.030mm"},
    {"width": "450mm", "quantity": "50-500", "thickness": "0.009mm-0.030mm"}
  ]}',
  '{"material": "aluminum", "type": "foil_sheets", "application": "food_service", "format": "pop_up"}'
);

-- Add i18n data for Pop-up Foil Sheets
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Pop-up Foil Sheets',
  'Convenient pop-up aluminum foil sheets for easy dispensing',
  'Pre-cut aluminum foil sheets in convenient pop-up dispensers. Perfect for food service and kitchen applications. Details seen in E-catalogue from Download page.'
FROM products WHERE slug = 'pop-up-foil-sheets';

-- Verify the insertions
SELECT 
  p.slug,
  p.sku,
  p.status,
  pi.name,
  pi.intro,
  c.slug as category_slug
FROM products p
LEFT JOIN product_i18n pi ON p.id = pi.product_id AND pi.locale = 'en'
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.slug IN ('aluminum-foil-roll', 'hairdressing-foil-roll', 'pop-up-foil-sheets')
ORDER BY p.created_at;