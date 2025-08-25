INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'smoothwall-rectangle-container-c221-1400',
  'SW-R-C221-1400',
  'active',
  '["/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C221-1400/c221-1400-2.webp","/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C221-1400/c221-1400-3.webp","/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C221-1400/c221-1400.webp"]',
  '{"en":"Smoothwall Rectangle Container C221-1400","zh":"光壁长方形容器 C221-1400"}',
  '{"en":"High-quality smoothwall rectangle aluminum foil container, model C221-1400. Perfect for food packaging and storage.","zh":"优质光壁长方形铝箔容器，型号 C221-1400。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Smoothwall","shape":"Rectangle","product_code":"C221-1400","wall_type":"Smooth Wall"}',
  '{"en":"Professional smoothwall rectangle aluminum foil container designed for commercial and household use. Model C221-1400 offers excellent durability and food safety.","zh":"专业光壁长方形铝箔容器，适用于商业和家庭使用。型号 C221-1400 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'smoothwall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'smoothwall-rectangle-container-c221-1800',
  'SW-R-C221-1800',
  'active',
  '["/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C221-1800/c221-1800.webp"]',
  '{"en":"Smoothwall Rectangle Container C221-1800","zh":"光壁长方形容器 C221-1800"}',
  '{"en":"High-quality smoothwall rectangle aluminum foil container, model C221-1800. Perfect for food packaging and storage.","zh":"优质光壁长方形铝箔容器，型号 C221-1800。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Smoothwall","shape":"Rectangle","product_code":"C221-1800","wall_type":"Smooth Wall"}',
  '{"en":"Professional smoothwall rectangle aluminum foil container designed for commercial and household use. Model C221-1800 offers excellent durability and food safety.","zh":"专业光壁长方形铝箔容器，适用于商业和家庭使用。型号 C221-1800 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'smoothwall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'smoothwall-round-container-y120-290',
  'SW-O-Y120-290',
  'active',
  '["/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y120-290/y120-290-2.webp","/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y120-290/y120-290-3.webp","/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y120-290/y120-290.webp"]',
  '{"en":"Smoothwall Round Container Y120-290","zh":"光壁圆形容器 Y120-290"}',
  '{"en":"High-quality smoothwall round aluminum foil container, model Y120-290. Perfect for food packaging and storage.","zh":"优质光壁圆形铝箔容器，型号 Y120-290。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Smoothwall","shape":"Round","product_code":"Y120-290","wall_type":"Smooth Wall"}',
  '{"en":"Professional smoothwall round aluminum foil container designed for commercial and household use. Model Y120-290 offers excellent durability and food safety.","zh":"专业光壁圆形铝箔容器，适用于商业和家庭使用。型号 Y120-290 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'smoothwall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'smoothwall-round-container-y180-1130',
  'SW-O-Y180-1130',
  'active',
  '["/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y180-1130/y180-1130-2.webp","/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y180-1130/y180-1130.webp"]',
  '{"en":"Smoothwall Round Container Y180-1130","zh":"光壁圆形容器 Y180-1130"}',
  '{"en":"High-quality smoothwall round aluminum foil container, model Y180-1130. Perfect for food packaging and storage.","zh":"优质光壁圆形铝箔容器，型号 Y180-1130。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Smoothwall","shape":"Round","product_code":"Y180-1130","wall_type":"Smooth Wall"}',
  '{"en":"Professional smoothwall round aluminum foil container designed for commercial and household use. Model Y180-1130 offers excellent durability and food safety.","zh":"专业光壁圆形铝箔容器，适用于商业和家庭使用。型号 Y180-1130 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'smoothwall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'smoothwall-round-container-y180-1370',
  'SW-O-Y180-1370',
  'active',
  '["/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y180-1370/y180-1370-2.webp","/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y180-1370/y180-1370-3.webp","/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y180-1370/y180-1370.webp"]',
  '{"en":"Smoothwall Round Container Y180-1370","zh":"光壁圆形容器 Y180-1370"}',
  '{"en":"High-quality smoothwall round aluminum foil container, model Y180-1370. Perfect for food packaging and storage.","zh":"优质光壁圆形铝箔容器，型号 Y180-1370。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Smoothwall","shape":"Round","product_code":"Y180-1370","wall_type":"Smooth Wall"}',
  '{"en":"Professional smoothwall round aluminum foil container designed for commercial and household use. Model Y180-1370 offers excellent durability and food safety.","zh":"专业光壁圆形铝箔容器，适用于商业和家庭使用。型号 Y180-1370 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'smoothwall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;