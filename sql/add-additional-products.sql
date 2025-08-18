-- Add Double Wall & Ripple Wall Paper Cups and Wooden & Bamboo Cutlery Products
-- Execute this script in Supabase SQL editor or via CLI

-- Category IDs:
-- paper-cups-drink-cups: e0838652-4d82-48ac-87a8-691ba2d9fa60
-- wooden-disposable-tableware: cf6e758d-d065-4665-a7cb-18160dd79695
-- bamboo-disposable-tableware: 9cf72bda-dc73-4e46-b034-d4e1952045de

-- ========================================
-- DOUBLE WALL & RIPPLE WALL PAPER CUPS
-- ========================================

-- 1. Double Wall Paper Cups
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'double-wall-paper-cups',
  'DWPC-001',
  'active',
  'e0838652-4d82-48ac-87a8-691ba2d9fa60',
  '{"sizes": [
    {"model": "8oz", "volume": "275ml", "dimensions": "80mm x 55mm x 95mm"},
    {"model": "10oz", "volume": "300ml", "dimensions": "80mm x 53mm x 110mm"},
    {"model": "12oz", "volume": "400ml", "dimensions": "90mm x 60mm x 112mm"},
    {"model": "16oz", "volume": "500ml", "dimensions": "90mm x 60mm x 135mm"}
  ]}',
  '{"material": "paper", "type": "double_wall", "application": "hot_beverages", "insulation": "enhanced"}'
);

-- 2. Ripple Wall Paper Cups
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'ripple-wall-paper-cups',
  'RWPC-001',
  'active',
  'e0838652-4d82-48ac-87a8-691ba2d9fa60',
  '{"sizes": [
    {"model": "7oz", "volume": "200ml", "dimensions": "75mm x 48mm x 80mm"},
    {"model": "8oz", "volume": "275ml", "dimensions": "80mm x 55mm x 95mm"},
    {"model": "12oz", "volume": "400ml", "dimensions": "90mm x 60mm x 112mm"},
    {"model": "16oz", "volume": "500ml", "dimensions": "90mm x 60mm x 135mm"}
  ]}',
  '{"material": "paper", "type": "ripple_wall", "application": "hot_beverages", "insulation": "superior"}'
);

-- ========================================
-- WOODEN CUTLERY PRODUCTS
-- ========================================

-- 3. Wooden Spoons
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'wooden-spoons',
  'WS-001',
  'active',
  'cf6e758d-d065-4665-a7cb-18160dd79695',
  '{"sizes": [
    {"model": "YL-WS165-1", "size": "165mm"},
    {"model": "YL-WS160", "size": "160mm"},
    {"model": "YL-WS140", "size": "140mm"},
    {"model": "YL-WS110", "size": "110mm"},
    {"model": "YL-WS105", "size": "105mm"},
    {"model": "YL-WS100", "size": "100mm"},
    {"model": "YL-WS95", "size": "90mm"},
    {"model": "YL-WS85", "size": "80mm"},
    {"model": "YL-WS60", "size": "60mm"}
  ]}',
  '{"material": "wood", "type": "spoon", "application": "disposable_cutlery", "eco_friendly": true}'
);

-- 4. Wooden Knives
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'wooden-knives',
  'WK-001',
  'active',
  'cf6e758d-d065-4665-a7cb-18160dd79695',
  '{"sizes": [
    {"model": "YL-WK165-1", "size": "165mm"},
    {"model": "YL-WK165", "size": "165mm"},
    {"model": "YL-WK140", "size": "140mm"},
    {"model": "YL-WK75", "size": "75mm"}
  ]}',
  '{"material": "wood", "type": "knife", "application": "disposable_cutlery", "eco_friendly": true}'
);

-- 5. Wooden Forks
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'wooden-forks',
  'WF-001',
  'active',
  'cf6e758d-d065-4665-a7cb-18160dd79695',
  '{"sizes": [
    {"model": "YL-WF165-1", "size": "165mm"},
    {"model": "YL-WF160", "size": "160mm"},
    {"model": "YL-WF140", "size": "140mm"},
    {"model": "YL-WF100", "size": "100mm"}
  ]}',
  '{"material": "wood", "type": "fork", "application": "disposable_cutlery", "eco_friendly": true}'
);

-- 6. Wooden Sporks
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'wooden-sporks',
  'WR-001',
  'active',
  'cf6e758d-d065-4665-a7cb-18160dd79695',
  '{"sizes": [
    {"model": "YL-WR160", "size": "160mm"},
    {"model": "YL-WR140", "size": "140mm"},
    {"model": "YL-WR105", "size": "105mm"},
    {"model": "YL-WR85", "size": "85mm"}
  ]}',
  '{"material": "wood", "type": "spork", "application": "disposable_cutlery", "eco_friendly": true}'
);

-- 7. Wooden Coffee Stirrers
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'wooden-coffee-stirrers',
  'WCS-001',
  'active',
  'cf6e758d-d065-4665-a7cb-18160dd79695',
  '{"sizes": [
    {"model": "YL-CS110", "size": "110mm"},
    {"model": "YL-CS140", "size": "140mm"},
    {"model": "YL-CS160", "size": "160mm"},
    {"model": "YL-CS178", "size": "178mm"},
    {"model": "YL-CS190", "size": "190mm"}
  ]}',
  '{"material": "wood", "type": "stirrer", "application": "coffee_accessories", "eco_friendly": true}'
);

-- 8. Wooden Ice Cream Sticks
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'wooden-icecream-sticks',
  'WICS-001',
  'active',
  'cf6e758d-d065-4665-a7cb-18160dd79695',
  '{"sizes": [
    {"model": "YL-CE93", "size": "93mm"},
    {"model": "YL-CE114", "size": "114mm"}
  ]}',
  '{"material": "wood", "type": "ice_cream_stick", "application": "dessert_accessories", "eco_friendly": true}'
);

-- 9. Wooden Ice Cream Spoons
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'wooden-icecream-spoons',
  'WICSP-001',
  'active',
  'cf6e758d-d065-4665-a7cb-18160dd79695',
  '{"sizes": [
    {"model": "YL-CB60", "size": "60mm"},
    {"model": "YL-CB75", "size": "75mm"},
    {"model": "YL-CB94", "size": "94mm"},
    {"model": "YL-CB114", "size": "114mm"},
    {"model": "YL-CB125", "size": "125mm"}
  ]}',
  '{"material": "wood", "type": "ice_cream_spoon", "application": "dessert_accessories", "eco_friendly": true}'
);

-- 10. Wooden Chopsticks
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'wooden-chopsticks',
  'WCH-001',
  'active',
  'cf6e758d-d065-4665-a7cb-18160dd79695',
  '{"sizes": [
    {"model": "YL-CH180", "size": "180mm"},
    {"model": "YL-CH193", "size": "193mm"},
    {"model": "YL-CH203", "size": "203mm"}
  ]}',
  '{"material": "wood", "type": "chopsticks", "application": "asian_cuisine", "eco_friendly": true}'
);

-- ========================================
-- BAMBOO CUTLERY PRODUCTS
-- ========================================

-- 11. Bamboo Forks
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'bamboo-forks',
  'BF-001',
  'active',
  '9cf72bda-dc73-4e46-b034-d4e1952045de',
  '{"sizes": [
    {"model": "YL-BF90", "size": "90mm"},
    {"model": "YL-BF170", "size": "170mm"}
  ]}',
  '{"material": "bamboo", "type": "fork", "application": "disposable_cutlery", "eco_friendly": true, "sustainable": true}'
);

-- 12. Bamboo Knives
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'bamboo-knives',
  'BK-001',
  'active',
  '9cf72bda-dc73-4e46-b034-d4e1952045de',
  '{"sizes": [
    {"model": "YL-BK170", "size": "170mm"}
  ]}',
  '{"material": "bamboo", "type": "knife", "application": "disposable_cutlery", "eco_friendly": true, "sustainable": true}'
);

-- 13. Bamboo Spoons
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'bamboo-spoons',
  'BS-001',
  'active',
  '9cf72bda-dc73-4e46-b034-d4e1952045de',
  '{"sizes": [
    {"model": "YL-BS170", "size": "170mm"}
  ]}',
  '{"material": "bamboo", "type": "spoon", "application": "disposable_cutlery", "eco_friendly": true, "sustainable": true}'
);

-- 14. Bamboo Chopsticks
INSERT INTO products (slug, sku, status, category_id, specs, technical_specs)
VALUES (
  'bamboo-chopsticks',
  'BCH-001',
  'active',
  '9cf72bda-dc73-4e46-b034-d4e1952045de',
  '{"sizes": [
    {"model": "YL-BC200", "size": "200mm"},
    {"model": "YL-BC210", "size": "210mm"}
  ]}',
  '{"material": "bamboo", "type": "chopsticks", "application": "asian_cuisine", "eco_friendly": true, "sustainable": true}'
);

-- ========================================
-- ADD INTERNATIONALIZATION DATA
-- ========================================

-- Add i18n data for Double Wall Paper Cups
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Double Wall Paper Cups',
  'Insulated double wall paper cups for hot beverages',
  'Premium double wall paper cups with enhanced insulation for hot beverages. Available in 8oz, 10oz, 12oz, and 16oz sizes. Perfect for coffee shops and cafes requiring superior heat protection.'
FROM products WHERE slug = 'double-wall-paper-cups';

-- Add i18n data for Ripple Wall Paper Cups
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Ripple Wall Paper Cups',
  'Superior insulated ripple wall cups for hot drinks',
  'High-quality ripple wall paper cups offering superior insulation and comfortable grip. Available in 7oz, 8oz, 12oz, and 16oz sizes. Ideal for premium hot beverage service.'
FROM products WHERE slug = 'ripple-wall-paper-cups';

-- Add i18n data for Wooden Spoons
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Wooden Spoons',
  'Eco-friendly disposable wooden spoons in various sizes',
  'Sustainable wooden spoons made from natural wood. Available in 9 different sizes from 60mm to 165mm. Perfect for eco-conscious food service and events.'
FROM products WHERE slug = 'wooden-spoons';

-- Add i18n data for Wooden Knives
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Wooden Knives',
  'Biodegradable wooden knives for sustainable dining',
  'Environmentally friendly wooden knives crafted from natural wood. Available in 4 sizes from 75mm to 165mm. Ideal for sustainable food service and eco-friendly events.'
FROM products WHERE slug = 'wooden-knives';

-- Add i18n data for Wooden Forks
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Wooden Forks',
  'Natural wooden forks for eco-friendly dining',
  'Sustainable wooden forks made from high-quality natural wood. Available in 4 sizes from 100mm to 165mm. Perfect for environmentally conscious food service.'
FROM products WHERE slug = 'wooden-forks';

-- Add i18n data for Wooden Sporks
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Wooden Sporks',
  'Versatile wooden spork combination utensils',
  'Multi-functional wooden sporks combining spoon and fork functionality. Available in 4 sizes from 85mm to 160mm. Ideal for convenient and sustainable dining.'
FROM products WHERE slug = 'wooden-sporks';

-- Add i18n data for Wooden Coffee Stirrers
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Wooden Coffee Stirrers',
  'Natural wooden stirrers for hot beverages',
  'Eco-friendly wooden coffee stirrers made from natural wood. Available in 5 sizes from 110mm to 190mm. Perfect for coffee shops and beverage service.'
FROM products WHERE slug = 'wooden-coffee-stirrers';

-- Add i18n data for Wooden Ice Cream Sticks
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Wooden Ice Cream Sticks',
  'Natural wooden sticks for ice cream and popsicles',
  'High-quality wooden ice cream sticks made from food-grade natural wood. Available in 93mm and 114mm sizes. Perfect for ice cream parlors and dessert shops.'
FROM products WHERE slug = 'wooden-icecream-sticks';

-- Add i18n data for Wooden Ice Cream Spoons
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Wooden Ice Cream Spoons',
  'Small wooden spoons perfect for ice cream and desserts',
  'Compact wooden spoons designed for ice cream and dessert service. Available in 5 sizes from 60mm to 125mm. Made from natural wood for safe food contact.'
FROM products WHERE slug = 'wooden-icecream-spoons';

-- Add i18n data for Wooden Chopsticks
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Wooden Chopsticks',
  'Traditional wooden chopsticks for Asian cuisine',
  'Authentic wooden chopsticks crafted from natural wood. Available in 3 sizes: 180mm, 193mm, and 203mm. Perfect for Asian restaurants and traditional dining.'
FROM products WHERE slug = 'wooden-chopsticks';

-- Add i18n data for Bamboo Forks
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Bamboo Forks',
  'Sustainable bamboo forks for eco-friendly dining',
  'Premium bamboo forks made from fast-growing sustainable bamboo. Available in 90mm and 170mm sizes. Stronger and more durable than wooden alternatives.'
FROM products WHERE slug = 'bamboo-forks';

-- Add i18n data for Bamboo Knives
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Bamboo Knives',
  'Durable bamboo knives for sustainable food service',
  'High-strength bamboo knives crafted from premium bamboo material. Available in 170mm size. Offers superior durability and sustainability compared to plastic alternatives.'
FROM products WHERE slug = 'bamboo-knives';

-- Add i18n data for Bamboo Spoons
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Bamboo Spoons',
  'Strong and sustainable bamboo spoons',
  'Premium bamboo spoons made from high-quality sustainable bamboo. Available in 170mm size. Provides excellent strength and eco-friendly alternative to plastic cutlery.'
FROM products WHERE slug = 'bamboo-spoons';

-- Add i18n data for Bamboo Chopsticks
INSERT INTO product_i18n (product_id, locale, name, intro, description)
SELECT 
  id,
  'en',
  'Bamboo Chopsticks',
  'Premium bamboo chopsticks for authentic dining',
  'Traditional bamboo chopsticks made from sustainable bamboo. Available in 200mm and 210mm sizes. Offers superior strength and authentic feel for Asian cuisine.'
FROM products WHERE slug = 'bamboo-chopsticks';

-- ========================================
-- VERIFY INSERTIONS
-- ========================================

-- Verify all new products
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
  'double-wall-paper-cups',
  'ripple-wall-paper-cups',
  'wooden-spoons',
  'wooden-knives',
  'wooden-forks',
  'wooden-sporks',
  'wooden-coffee-stirrers',
  'wooden-icecream-sticks',
  'wooden-icecream-spoons',
  'wooden-chopsticks',
  'bamboo-forks',
  'bamboo-knives',
  'bamboo-spoons',
  'bamboo-chopsticks'
)
ORDER BY p.created_at;