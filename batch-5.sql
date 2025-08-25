INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'smoothwall-round-container-y250-3500',
  'SW-O-Y250-3500',
  'active',
  '["/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y250-3500/y250-3500-2.webp","/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y250-3500/y250-3500.webp"]',
  '{"en":"Smoothwall Round Container Y250-3500","zh":"光壁圆形容器 Y250-3500"}',
  '{"en":"High-quality smoothwall round aluminum foil container, model Y250-3500. Perfect for food packaging and storage.","zh":"优质光壁圆形铝箔容器，型号 Y250-3500。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Smoothwall","shape":"Round","product_code":"Y250-3500","wall_type":"Smooth Wall"}',
  '{"en":"Professional smoothwall round aluminum foil container designed for commercial and household use. Model Y250-3500 offers excellent durability and food safety.","zh":"专业光壁圆形铝箔容器，适用于商业和家庭使用。型号 Y250-3500 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'smoothwall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'wrinklewall-rectangle-container-c130',
  'WW-R-C130',
  'active',
  '["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C130/c130-2.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C130/c130-3.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C130/c130.webp"]',
  '{"en":"Wrinklewall Rectangle Container C130","zh":"皱壁长方形容器 C130"}',
  '{"en":"High-quality wrinklewall rectangle aluminum foil container, model C130. Perfect for food packaging and storage.","zh":"优质皱壁长方形铝箔容器，型号 C130。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Wrinklewall","shape":"Rectangle","product_code":"C130","wall_type":"Wrinkle Wall"}',
  '{"en":"Professional wrinklewall rectangle aluminum foil container designed for commercial and household use. Model C130 offers excellent durability and food safety.","zh":"专业皱壁长方形铝箔容器，适用于商业和家庭使用。型号 C130 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'wrinklewall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'wrinklewall-rectangle-container-c142',
  'WW-R-C142',
  'active',
  '["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C142/c142-2.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C142/c142-3.webp","/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C142/c142.webp"]',
  '{"en":"Wrinklewall Rectangle Container C142","zh":"皱壁长方形容器 C142"}',
  '{"en":"High-quality wrinklewall rectangle aluminum foil container, model C142. Perfect for food packaging and storage.","zh":"优质皱壁长方形铝箔容器，型号 C142。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Wrinklewall","shape":"Rectangle","product_code":"C142","wall_type":"Wrinkle Wall"}',
  '{"en":"Professional wrinklewall rectangle aluminum foil container designed for commercial and household use. Model C142 offers excellent durability and food safety.","zh":"专业皱壁长方形铝箔容器，适用于商业和家庭使用。型号 C142 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'wrinklewall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'wrinklewall-rectangle-container-c144',
  'WW-R-C144',
  'active',
  '["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C144/c144.webp"]',
  '{"en":"Wrinklewall Rectangle Container C144","zh":"皱壁长方形容器 C144"}',
  '{"en":"High-quality wrinklewall rectangle aluminum foil container, model C144. Perfect for food packaging and storage.","zh":"优质皱壁长方形铝箔容器，型号 C144。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Wrinklewall","shape":"Rectangle","product_code":"C144","wall_type":"Wrinkle Wall"}',
  '{"en":"Professional wrinklewall rectangle aluminum foil container designed for commercial and household use. Model C144 offers excellent durability and food safety.","zh":"专业皱壁长方形铝箔容器，适用于商业和家庭使用。型号 C144 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'wrinklewall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO products(
  slug, sku, status, images, name_i18n, description_i18n, 
  technical_specs, introduction, category_id
) VALUES (
  'wrinklewall-rectangle-container-c148',
  'WW-R-C148',
  'active',
  '["/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C148/c148.webp"]',
  '{"en":"Wrinklewall Rectangle Container C148","zh":"皱壁长方形容器 C148"}',
  '{"en":"High-quality wrinklewall rectangle aluminum foil container, model C148. Perfect for food packaging and storage.","zh":"优质皱壁长方形铝箔容器，型号 C148。适用于食品包装和储存。"}',
  '{"material":"Aluminum Foil","type":"Wrinklewall","shape":"Rectangle","product_code":"C148","wall_type":"Wrinkle Wall"}',
  '{"en":"Professional wrinklewall rectangle aluminum foil container designed for commercial and household use. Model C148 offers excellent durability and food safety.","zh":"专业皱壁长方形铝箔容器，适用于商业和家庭使用。型号 C148 提供卓越的耐用性和食品安全性。"}',
  (SELECT id FROM categories WHERE slug = 'wrinklewall-containers' LIMIT 1)
) ON CONFLICT (slug) DO NOTHING;