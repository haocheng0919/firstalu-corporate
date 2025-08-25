INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'wrinklewall-rectangle-container-c370',
  'WW-R-C370',
  'active',
  '["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C370/c370-2.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C370/c370-3.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C370/c370.webp"]',
  '{"en":"Wrinklewall Rectangle Container C370","zh":"皱壁长方形容器 C370"}',
  '{"en":"High-quality wrinklewall rectangle aluminum foil container, model C370. Perfect for food packaging and storage.","zh":"优质皱壁长方形铝箔容器，型号 C370。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Wrinklewall","shape":"Rectangle","product_code":"C370","wall_type":"Wrinkle Wall"}',
  '{"en":"Professional wrinklewall rectangle aluminum foil container designed for commercial and household use. Model C370 offers excellent durability and food safety.","zh":"专业皱壁长方形铝箔容器，适用于商业和家庭使用。型号 C370 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'wrinklewall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'wrinklewall-rectangle-container-c4',
  'WW-R-C4',
  'active',
  '["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C4/c4-2.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C4/c4-3.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C4/c4.webp"]',
  '{"en":"Wrinklewall Rectangle Container C4","zh":"皱壁长方形容器 C4"}',
  '{"en":"High-quality wrinklewall rectangle aluminum foil container, model C4. Perfect for food packaging and storage.","zh":"优质皱壁长方形铝箔容器，型号 C4。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Wrinklewall","shape":"Rectangle","product_code":"C4","wall_type":"Wrinkle Wall"}',
  '{"en":"Professional wrinklewall rectangle aluminum foil container designed for commercial and household use. Model C4 offers excellent durability and food safety.","zh":"专业皱壁长方形铝箔容器，适用于商业和家庭使用。型号 C4 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'wrinklewall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'wrinklewall-rectangle-container-c430',
  'WW-R-C430',
  'active',
  '["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C430/c430-2.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C430/c430-3.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C430/c430.webp"]',
  '{"en":"Wrinklewall Rectangle Container C430","zh":"皱壁长方形容器 C430"}',
  '{"en":"High-quality wrinklewall rectangle aluminum foil container, model C430. Perfect for food packaging and storage.","zh":"优质皱壁长方形铝箔容器，型号 C430。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Wrinklewall","shape":"Rectangle","product_code":"C430","wall_type":"Wrinkle Wall"}',
  '{"en":"Professional wrinklewall rectangle aluminum foil container designed for commercial and household use. Model C430 offers excellent durability and food safety.","zh":"专业皱壁长方形铝箔容器，适用于商业和家庭使用。型号 C430 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'wrinklewall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'wrinklewall-rectangle-container-c526',
  'WW-R-C526',
  'active',
  '["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C526/c526-2.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C526/c526-3.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C526/c526.webp"]',
  '{"en":"Wrinklewall Rectangle Container C526","zh":"皱壁长方形容器 C526"}',
  '{"en":"High-quality wrinklewall rectangle aluminum foil container, model C526. Perfect for food packaging and storage.","zh":"优质皱壁长方形铝箔容器，型号 C526。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Wrinklewall","shape":"Rectangle","product_code":"C526","wall_type":"Wrinkle Wall"}',
  '{"en":"Professional wrinklewall rectangle aluminum foil container designed for commercial and household use. Model C526 offers excellent durability and food safety.","zh":"专业皱壁长方形铝箔容器，适用于商业和家庭使用。型号 C526 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'wrinklewall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'wrinklewall-round-container-y120',
  'WW-O-Y120',
  'active',
  '["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y120/y120-2.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y120/y120-3.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y120/y120.webp"]',
  '{"en":"Wrinklewall Round Container Y120","zh":"皱壁圆形容器 Y120"}',
  '{"en":"High-quality wrinklewall round aluminum foil container, model Y120. Perfect for food packaging and storage.","zh":"优质皱壁圆形铝箔容器，型号 Y120。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Wrinklewall","shape":"Round","product_code":"Y120","wall_type":"Wrinkle Wall"}',
  '{"en":"Professional wrinklewall round aluminum foil container designed for commercial and household use. Model Y120 offers excellent durability and food safety.","zh":"专业皱壁圆形铝箔容器，适用于商业和家庭使用。型号 Y120 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'wrinklewall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;