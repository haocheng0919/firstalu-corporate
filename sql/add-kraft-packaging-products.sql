-- Add Kraft Packaging and Paper Cup Products to Database
-- Execute this script in Supabase SQL editor or via CLI

-- Category IDs:
-- kraft-packaging: 7e057bae-547e-4eff-be7b-ae9cbeeee4d2
-- paper-cups-drink-cups: e0838652-4d82-48ac-87a8-691ba2d9fa60

-- ========================================
-- KRAFT PACKAGING PRODUCTS
-- ========================================

-- 1. Round Kraft Salad Bowls
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'round-kraft-salad-bowls',
  'RKSB-001',
  'active',
  '7e057bae-547e-4eff-be7b-ae9cbeeee4d2',
  '{"sizes": [
    {"model": "500S", "volume": "500ml", "dimensions": "150mm x 127mm x 46mm"},
    {"model": "750S", "volume": "750ml", "dimensions": "150mm x 128mm x 60mm"},
    {"model": "900", "volume": "900ml", "dimensions": "185mm x 160mm"},
    {"model": "1000S", "volume": "1000ml", "dimensions": "150mm x 129mm x 77mm"},
    {"model": "1100S", "volume": "1100ml", "dimensions": "165mm x 144mm x 66mm"},
    {"model": "1300S", "volume": "1300ml", "dimensions": "165mm x 144mm x 77mm"},
    {"model": "1500B", "volume": "1300ml", "dimensions": "185mm x 144mm x 65mm"},
    {"model": "1500", "volume": "1500ml", "dimensions": "185mm x 160mm x 85mm"},
    {"model": "1700", "volume": "1700ml", "dimensions": "185mm x 157mm"},
    {"model": "1800", "volume": "1800ml", "dimensions": "205mm x 181mm x 66mm"}
  ], "lids": "Available in 150mm, 165mm, 185mm, and 205mm sizes"}',
  '{"material": "kraft_paper", "type": "salad_bowl", "shape": "round", "application": "food_packaging"}'
);

-- 2. Round Kraft Deli Bowls
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'round-kraft-deli-bowls',
  'RKDB-001',
  'active',
  '7e057bae-547e-4eff-be7b-ae9cbeeee4d2',
  '{"sizes": [
    {"model": "650", "volume": "650ml", "dimensions": "142mm x 120mm x 65mm"},
    {"model": "800", "volume": "800ml", "dimensions": "132mm x 105mm x 85mm"},
    {"model": "850", "volume": "850ml", "dimensions": "142mm x 113mm x 85mm"},
    {"model": "1000", "volume": "1000ml", "dimensions": "142mm x 105mm x 102mm"}
  ], "lids": "Available in 132mm and 142mm sizes"}',
  '{"material": "kraft_paper", "type": "deli_bowl", "shape": "round", "application": "food_packaging"}'
);

-- 3. Take Away Kraft Boxes (PE Lined)
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'takeaway-kraft-boxes-pe-lined',
  'TAKB-001',
  'active',
  '7e057bae-547e-4eff-be7b-ae9cbeeee4d2',
  '{"sizes": [
    {"model": "1#S", "volume": "600ml", "dimensions_top": "115*105mm", "dimensions_bottom": "105*90mm", "height": "53mm"},
    {"model": "1#", "volume": "750ml", "dimensions_top": "120*105mm", "dimensions_bottom": "105*90mm", "height": "65mm"},
    {"model": "1#L", "volume": "800ml", "dimensions_top": "130*105mm", "dimensions_bottom": "115*90mm", "height": "63mm"},
    {"model": "2#", "volume": "1400ml", "dimensions_top": "215*160mm", "dimensions_bottom": "196*140mm", "height": "48mm"},
    {"model": "3#", "volume": "1900ml", "dimensions_top": "215*160mm", "dimensions_bottom": "196*140mm", "height": "65mm"},
    {"model": "4#", "volume": "900ml", "dimensions_top": "160*100mm", "dimensions_bottom": "135*80mm"},
    {"model": "5#", "volume": "1040ml", "dimensions_top": "170*135mm", "dimensions_bottom": "152*120mm", "height": "50mm"},
    {"model": "8#", "volume": "1100ml", "dimensions_top": "170*136mm", "dimensions_bottom": "153*120mm", "height": "55mm"},
    {"model": "9#S", "volume": "1100ml", "dimensions_top": "170*135mm", "dimensions_bottom": "152*120mm", "height": "60mm"},
    {"model": "9#", "volume": "1200ml", "dimensions_top": "170*135mm", "dimensions_bottom": "152*120mm", "height": "65mm"},
    {"model": "9#D", "volume": "1200ml", "dimensions_top": "170*135mm", "dimensions_bottom": "152*120mm", "height": "65mm"},
    {"model": "10#", "volume": "1800ml", "dimensions_top": "175*175mm", "dimensions_bottom": "150*150mm", "height": "75mm"}
  ]}',
  '{"material": "kraft_paper", "type": "takeaway_box", "lining": "PE_lined", "application": "food_packaging"}'
);

-- 4. Kraft Trays (PE Lined)
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'kraft-trays-pe-lined',
  'KT-001',
  'active',
  '7e057bae-547e-4eff-be7b-ae9cbeeee4d2',
  '{"sizes": [
    {"model": "1", "volume": "750ml", "dimensions_top": "250*175mm", "dimensions_bottom": "199*124mm", "height": "21mm"},
    {"model": "2", "volume": "450ml", "dimensions_top": "205*167mm", "dimensions_bottom": "155*117mm", "height": "21mm"},
    {"model": "3", "volume": "850ml", "dimensions_top": "205*135mm", "dimensions_bottom": "155*85mm", "height": "44mm"},
    {"model": "4", "volume": "400ml", "dimensions_top": "170*148mm", "dimensions_bottom": "124*102mm", "height": "24mm"},
    {"model": "5", "volume": "250ml", "dimensions_top": "168*119mm", "dimensions_bottom": "137*88mm", "height": "16mm"},
    {"model": "6", "volume": "400ml", "dimensions_top": "204*139mm", "dimensions_bottom": "150*85mm", "height": "25mm"},
    {"model": "7", "volume": "400ml", "dimensions_top": "178*140mm", "dimensions_bottom": "122*85mm", "height": "45mm"}
  ]}',
  '{"material": "kraft_paper", "type": "tray", "lining": "PE_lined", "application": "food_packaging"}'
);

-- ========================================
-- PAPER CUP PRODUCTS
-- ========================================

-- 5. Single Wall Paper Cups
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'single-wall-paper-cups',
  'SWPC-001',
  'active',
  'e0838652-4d82-48ac-87a8-691ba2d9fa60',
  '{"sizes": [
    {"model": "2.5oz", "volume": "65ml", "dimensions": "48mm x 36mm"},
    {"model": "4oz", "volume": "120ml", "dimensions": "60mm x 45mm x 62mm"},
    {"model": "6oz", "volume": "150ml", "dimensions": "68mm x 50mm x 75mm"},
    {"model": "6.5oz", "volume": "228ml", "dimensions": "72mm x 53mm"},
    {"model": "7oz", "volume": "240ml", "dimensions": "75mm x 53mm x 84mm"},
    {"model": "8oz", "volume": "275ml", "dimensions": "80mm x 55mm x 95mm"},
    {"model": "9oz", "volume": "250ml", "dimensions": "76mm x 52mm x 95mm"},
    {"model": "9oz-B", "volume": "250ml", "dimensions": "75mm x 52mm x 88mm"},
    {"model": "9.5oz", "volume": "275ml", "dimensions": "80mm x 52mm"},
    {"model": "12oz", "volume": "400ml", "dimensions": "90mm x 60mm"},
    {"model": "16oz", "volume": "500ml", "dimensions": "90mm x 60mm x 135mm"},
    {"model": "22oz", "volume": "650ml", "dimensions": "90mm x 60mm x 168mm"}
  ]}',
  '{"material": "paper", "type": "single_wall", "application": "hot_cold_beverages"}'
);

-- 6. Single Wall Paper Cups for Hotels
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'hotel-paper-cups',
  'HPC-001',
  'active',
  'e0838652-4d82-48ac-87a8-691ba2d9fa60',
  '{"sizes": [
    {"model": "8oz-80mm", "volume": "275ml", "dimensions": "80mm (top) x 52mm (bottom) x 94-95mm (height)"}
  ]}',
  '{"material": "paper", "type": "single_wall", "application": "hotel_hospitality"}'
);

-- 7. Printed Single Wall Paper Cups
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'printed-paper-cups',
  'PPC-001',
  'active',
  'e0838652-4d82-48ac-87a8-691ba2d9fa60',
  '{"sizes": [
    {"model": "8oz", "volume": "275ml", "dimensions": "80mm (top) x 55mm (bottom)"},
    {"model": "12oz", "volume": "400ml", "dimensions": "90mm (top) x 60mm (bottom) x 112mm (height)"},
    {"model": "16oz", "volume": "500ml", "dimensions": "90mm (top) x 60mm (bottom) x 135mm (height)"}
  ], "lids": "Available for 80mm and 90mm sizes"}',
  '{"material": "paper", "type": "single_wall_printed", "application": "branded_beverages"}'
);

-- 8. Cold Drink Cups (Double Sides PE Lined)
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'cold-drink-cups-pe-lined',
  'CDC-001',
  'active',
  'e0838652-4d82-48ac-87a8-691ba2d9fa60',
  '{"sizes": [
    {"model": "12A", "volume": "400ml", "dimensions": "80mm x 52mm x 110mm"},
    {"model": "14A", "volume": "400ml", "dimensions": "90mm x 60mm x 110mm"},
    {"model": "16", "volume": "450ml", "dimensions": "90mm x 60mm x 133mm"},
    {"model": "18", "volume": "670ml", "dimensions": "90mm x 60mm x 170mm"}
  ], "lids": "Available for 80/90mm sizes"}',
  '{"material": "paper", "type": "double_pe_lined", "application": "cold_beverages"}'
);

-- ========================================
-- ADD INTERNATIONALIZATION DATA
-- ========================================

-- Add i18n data for Round Kraft Salad Bowls
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Round Kraft Salad Bowls',
  'Eco-friendly kraft paper salad bowls in various sizes',
  'Premium round kraft paper salad bowls perfect for fresh salads and healthy meals. Available in multiple sizes from 500ml to 1800ml with matching lids. Made from sustainable kraft paper material.'
FROM products WHERE slug = 'round-kraft-salad-bowls';

-- Add i18n data for Round Kraft Deli Bowls
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Round Kraft Deli Bowls',
  'Kraft paper deli bowls for food service',
  'Durable round kraft paper bowls designed for deli and food service applications. Available in sizes from 650ml to 1000ml with compatible lids in 132mm and 142mm sizes.'
FROM products WHERE slug = 'round-kraft-deli-bowls';

-- Add i18n data for Take Away Kraft Boxes
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Take Away Kraft Boxes (PE Lined)',
  'PE-lined kraft boxes for takeaway meals',
  'High-quality kraft paper takeaway boxes with PE lining for grease resistance. Available in various sizes from 600ml to 1900ml, perfect for restaurants and food delivery services.'
FROM products WHERE slug = 'takeaway-kraft-boxes-pe-lined';

-- Add i18n data for Kraft Trays
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Kraft Trays (PE Lined)',
  'PE-lined kraft trays for food presentation',
  'Versatile kraft paper trays with PE lining, ideal for food presentation and serving. Available in 7 different sizes ranging from 250ml to 850ml capacity.'
FROM products WHERE slug = 'kraft-trays-pe-lined';

-- Add i18n data for Single Wall Paper Cups
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Single Wall Paper Cups',
  'Standard single wall paper cups for beverages',
  'High-quality single wall paper cups suitable for both hot and cold beverages. Available in sizes from 2.5oz to 22oz, perfect for cafes, restaurants, and events.'
FROM products WHERE slug = 'single-wall-paper-cups';

-- Add i18n data for Hotel Paper Cups
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Hotel Paper Cups',
  'Premium paper cups designed for hospitality',
  'Specially designed 8oz paper cups for hotel and hospitality industry. Features premium quality construction with precise dimensions for professional presentation.'
FROM products WHERE slug = 'hotel-paper-cups';

-- Add i18n data for Printed Paper Cups
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Printed Single Wall Paper Cups',
  'Custom printed paper cups for branding',
  'Single wall paper cups with custom printing options. Available in 8oz, 12oz, and 16oz sizes with matching lids. Perfect for branded beverage service and marketing.'
FROM products WHERE slug = 'printed-paper-cups';

-- Add i18n data for Cold Drink Cups
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Cold Drink Cups (Double Sides PE Lined)',
  'PE-lined cups specifically for cold beverages',
  'Double-sided PE lined paper cups designed specifically for cold beverages. Available in sizes from 400ml to 670ml with moisture-resistant lining and compatible lids.'
FROM products WHERE slug = 'cold-drink-cups-pe-lined';

-- ========================================
-- VERIFY INSERTIONS
-- ========================================

-- Verify all kraft packaging products
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
WHERE p.slug IN (
  'round-kraft-salad-bowls',
  'round-kraft-deli-bowls', 
  'takeaway-kraft-boxes-pe-lined',
  'kraft-trays-pe-lined',
  'single-wall-paper-cups',
  'hotel-paper-cups',
  'printed-paper-cups',
  'cold-drink-cups-pe-lined'
)
ORDER BY p.created_at;