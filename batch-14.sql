INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'wrinklewall-round-container-y545',
  'WW-O-Y545',
  'active',
  '["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y545/y545-2.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y545/y545-3.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y545/y545.webp"]',
  '{"en":"Wrinklewall Round Container Y545","zh":"皱壁圆形容器 Y545"}',
  '{"en":"High-quality wrinklewall round aluminum foil container, model Y545. Perfect for food packaging and storage.","zh":"优质皱壁圆形铝箔容器，型号 Y545。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Wrinklewall","shape":"Round","product_code":"Y545","wall_type":"Wrinkle Wall"}',
  '{"en":"Professional wrinklewall round aluminum foil container designed for commercial and household use. Model Y545 offers excellent durability and food safety.","zh":"专业皱壁圆形铝箔容器，适用于商业和家庭使用。型号 Y545 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'wrinklewall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'wrinklewall-round-container-y80',
  'WW-O-Y80',
  'active',
  '["/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y80/y80-1.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y80/y80-2.webp"]',
  '{"en":"Wrinklewall Round Container Y80","zh":"皱壁圆形容器 Y80"}',
  '{"en":"High-quality wrinklewall round aluminum foil container, model Y80. Perfect for food packaging and storage.","zh":"优质皱壁圆形铝箔容器，型号 Y80。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Wrinklewall","shape":"Round","product_code":"Y80","wall_type":"Wrinkle Wall"}',
  '{"en":"Professional wrinklewall round aluminum foil container designed for commercial and household use. Model Y80 offers excellent durability and food safety.","zh":"专业皱壁圆形铝箔容器，适用于商业和家庭使用。型号 Y80 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'wrinklewall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'wrinklewall-square-container-f160',
  'WW-S-F160',
  'active',
  '["/product_img/Aluminum-Foil/Container/Wrinklewall/square/F160/f160-2.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/square/F160/f160-3.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/square/F160/f160.webp"]',
  '{"en":"Wrinklewall Square Container F160","zh":"皱壁方形容器 F160"}',
  '{"en":"High-quality wrinklewall square aluminum foil container, model F160. Perfect for food packaging and storage.","zh":"优质皱壁方形铝箔容器，型号 F160。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Wrinklewall","shape":"Square","product_code":"F160","wall_type":"Wrinkle Wall"}',
  '{"en":"Professional wrinklewall square aluminum foil container designed for commercial and household use. Model F160 offers excellent durability and food safety.","zh":"专业皱壁方形铝箔容器，适用于商业和家庭使用。型号 F160 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'wrinklewall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'wrinklewall-square-container-f205',
  'WW-S-F205',
  'active',
  '["/product_img/Aluminum-Foil/Container/Wrinklewall/square/F205/f205-2.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/square/F205/f205-3.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/square/F205/f205.webp"]',
  '{"en":"Wrinklewall Square Container F205","zh":"皱壁方形容器 F205"}',
  '{"en":"High-quality wrinklewall square aluminum foil container, model F205. Perfect for food packaging and storage.","zh":"优质皱壁方形铝箔容器，型号 F205。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Wrinklewall","shape":"Square","product_code":"F205","wall_type":"Wrinkle Wall"}',
  '{"en":"Professional wrinklewall square aluminum foil container designed for commercial and household use. Model F205 offers excellent durability and food safety.","zh":"专业皱壁方形铝箔容器，适用于商业和家庭使用。型号 F205 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'wrinklewall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;