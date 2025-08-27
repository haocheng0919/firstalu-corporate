-- 完整的铝箔产品插入语句 (72个产品)

-- 产品 1: C161-320
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c161-320',
  '{"en":"Aluminum Foil Container C161-320","de":"Aluminiumfolien-Behälter C161-320","es":"Contenedor de Papel de Aluminio C161-320","fr":"Conteneur en Papier d'Aluminium C161-320"}',
  '{"en":"High-quality aluminum foil container c161-320 for various applications","de":"Hochwertiger aluminiumfolien-behälter c161-320 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C161-320 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c161-320 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C161-320/c161-320-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 2: C161-475
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c161-475',
  '{"en":"Aluminum Foil Container C161-475","de":"Aluminiumfolien-Behälter C161-475","es":"Contenedor de Papel de Aluminio C161-475","fr":"Conteneur en Papier d'Aluminium C161-475"}',
  '{"en":"High-quality aluminum foil container c161-475 for various applications","de":"Hochwertiger aluminiumfolien-behälter c161-475 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C161-475 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c161-475 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C161-475/c161-475-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 3: C161-680
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c161-680',
  '{"en":"Aluminum Foil Container C161-680","de":"Aluminiumfolien-Behälter C161-680","es":"Contenedor de Papel de Aluminio C161-680","fr":"Conteneur en Papier d'Aluminium C161-680"}',
  '{"en":"High-quality aluminum foil container c161-680 for various applications","de":"Hochwertiger aluminiumfolien-behälter c161-680 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C161-680 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c161-680 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C161-680/c161-680-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 4: C166-200
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c166-200',
  '{"en":"Aluminum Foil Container C166-200","de":"Aluminiumfolien-Behälter C166-200","es":"Contenedor de Papel de Aluminio C166-200","fr":"Conteneur en Papier d'Aluminium C166-200"}',
  '{"en":"High-quality aluminum foil container c166-200 for various applications","de":"Hochwertiger aluminiumfolien-behälter c166-200 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C166-200 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c166-200 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C166-200/c166-200-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 5: C167-360
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c167-360',
  '{"en":"Aluminum Foil Container C167-360","de":"Aluminiumfolien-Behälter C167-360","es":"Contenedor de Papel de Aluminio C167-360","fr":"Conteneur en Papier d'Aluminium C167-360"}',
  '{"en":"High-quality aluminum foil container c167-360 for various applications","de":"Hochwertiger aluminiumfolien-behälter c167-360 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C167-360 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c167-360 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C167-360/c167-360-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 6: C184-580
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c184-580',
  '{"en":"Aluminum Foil Container C184-580","de":"Aluminiumfolien-Behälter C184-580","es":"Contenedor de Papel de Aluminio C184-580","fr":"Conteneur en Papier d'Aluminium C184-580"}',
  '{"en":"High-quality aluminum foil container c184-580 for various applications","de":"Hochwertiger aluminiumfolien-behälter c184-580 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C184-580 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c184-580 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C184-580/c184-580-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 7: C184-750
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c184-750',
  '{"en":"Aluminum Foil Container C184-750","de":"Aluminiumfolien-Behälter C184-750","es":"Contenedor de Papel de Aluminio C184-750","fr":"Conteneur en Papier d'Aluminium C184-750"}',
  '{"en":"High-quality aluminum foil container c184-750 for various applications","de":"Hochwertiger aluminiumfolien-behälter c184-750 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C184-750 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c184-750 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C184-750/c184-750-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 8: C184-930
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c184-930',
  '{"en":"Aluminum Foil Container C184-930","de":"Aluminiumfolien-Behälter C184-930","es":"Contenedor de Papel de Aluminio C184-930","fr":"Conteneur en Papier d'Aluminium C184-930"}',
  '{"en":"High-quality aluminum foil container c184-930 for various applications","de":"Hochwertiger aluminiumfolien-behälter c184-930 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C184-930 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c184-930 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C184-930/c184-930-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 9: C220-1050
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c220-1050',
  '{"en":"Aluminum Foil Container C220-1050","de":"Aluminiumfolien-Behälter C220-1050","es":"Contenedor de Papel de Aluminio C220-1050","fr":"Conteneur en Papier d'Aluminium C220-1050"}',
  '{"en":"High-quality aluminum foil container c220-1050 for various applications","de":"Hochwertiger aluminiumfolien-behälter c220-1050 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C220-1050 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c220-1050 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C220-1050/c220-1050-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 10: C221-1025
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c221-1025',
  '{"en":"Aluminum Foil Container C221-1025","de":"Aluminiumfolien-Behälter C221-1025","es":"Contenedor de Papel de Aluminio C221-1025","fr":"Conteneur en Papier d'Aluminium C221-1025"}',
  '{"en":"High-quality aluminum foil container c221-1025 for various applications","de":"Hochwertiger aluminiumfolien-behälter c221-1025 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C221-1025 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c221-1025 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C221-1025/c221-1025-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 11: C221-1400
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c221-1400',
  '{"en":"Aluminum Foil Container C221-1400","de":"Aluminiumfolien-Behälter C221-1400","es":"Contenedor de Papel de Aluminio C221-1400","fr":"Conteneur en Papier d'Aluminium C221-1400"}',
  '{"en":"High-quality aluminum foil container c221-1400 for various applications","de":"Hochwertiger aluminiumfolien-behälter c221-1400 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C221-1400 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c221-1400 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C221-1400/c221-1400-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 12: C221-1800
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c221-1800',
  '{"en":"Aluminum Foil Container C221-1800","de":"Aluminiumfolien-Behälter C221-1800","es":"Contenedor de Papel de Aluminio C221-1800","fr":"Conteneur en Papier d'Aluminium C221-1800"}',
  '{"en":"High-quality aluminum foil container c221-1800 for various applications","de":"Hochwertiger aluminiumfolien-behälter c221-1800 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C221-1800 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c221-1800 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Rectangle/C221-1800/c221-1800.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 13: Y120-290
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y120-290',
  '{"en":"Aluminum Foil Container Y120-290","de":"Aluminiumfolien-Behälter Y120-290","es":"Contenedor de Papel de Aluminio Y120-290","fr":"Conteneur en Papier d'Aluminium Y120-290"}',
  '{"en":"High-quality aluminum foil container y120-290 for various applications","de":"Hochwertiger aluminiumfolien-behälter y120-290 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y120-290 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y120-290 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y120-290/y120-290-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 14: Y180-920
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y180-920',
  '{"en":"Aluminum Foil Container Y180-920","de":"Aluminiumfolien-Behälter Y180-920","es":"Contenedor de Papel de Aluminio Y180-920","fr":"Conteneur en Papier d'Aluminium Y180-920"}',
  '{"en":"High-quality aluminum foil container y180-920 for various applications","de":"Hochwertiger aluminiumfolien-behälter y180-920 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y180-920 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y180-920 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y180-920/y180-920-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 15: Y180-1130
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y180-1130',
  '{"en":"Aluminum Foil Container Y180-1130","de":"Aluminiumfolien-Behälter Y180-1130","es":"Contenedor de Papel de Aluminio Y180-1130","fr":"Conteneur en Papier d'Aluminium Y180-1130"}',
  '{"en":"High-quality aluminum foil container y180-1130 for various applications","de":"Hochwertiger aluminiumfolien-behälter y180-1130 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y180-1130 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y180-1130 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y180-1130/y180-1130-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 16: Y180-1370
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y180-1370',
  '{"en":"Aluminum Foil Container Y180-1370","de":"Aluminiumfolien-Behälter Y180-1370","es":"Contenedor de Papel de Aluminio Y180-1370","fr":"Conteneur en Papier d'Aluminium Y180-1370"}',
  '{"en":"High-quality aluminum foil container y180-1370 for various applications","de":"Hochwertiger aluminiumfolien-behälter y180-1370 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y180-1370 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y180-1370 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y180-1370/y180-1370-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 17: Y208-1430
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y208-1430',
  '{"en":"Aluminum Foil Container Y208-1430","de":"Aluminiumfolien-Behälter Y208-1430","es":"Contenedor de Papel de Aluminio Y208-1430","fr":"Conteneur en Papier d'Aluminium Y208-1430"}',
  '{"en":"High-quality aluminum foil container y208-1430 for various applications","de":"Hochwertiger aluminiumfolien-behälter y208-1430 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y208-1430 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y208-1430 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y208-1430/y208-1430-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 18: Y250-2000
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y250-2000',
  '{"en":"Aluminum Foil Container Y250-2000","de":"Aluminiumfolien-Behälter Y250-2000","es":"Contenedor de Papel de Aluminio Y250-2000","fr":"Conteneur en Papier d'Aluminium Y250-2000"}',
  '{"en":"High-quality aluminum foil container y250-2000 for various applications","de":"Hochwertiger aluminiumfolien-behälter y250-2000 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y250-2000 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y250-2000 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y250-2000/y250-2000.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 19: Y250-2500
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y250-2500',
  '{"en":"Aluminum Foil Container Y250-2500","de":"Aluminiumfolien-Behälter Y250-2500","es":"Contenedor de Papel de Aluminio Y250-2500","fr":"Conteneur en Papier d'Aluminium Y250-2500"}',
  '{"en":"High-quality aluminum foil container y250-2500 for various applications","de":"Hochwertiger aluminiumfolien-behälter y250-2500 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y250-2500 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y250-2500 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y250-2500/y250-2500-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 20: Y250-3000
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y250-3000',
  '{"en":"Aluminum Foil Container Y250-3000","de":"Aluminiumfolien-Behälter Y250-3000","es":"Contenedor de Papel de Aluminio Y250-3000","fr":"Conteneur en Papier d'Aluminium Y250-3000"}',
  '{"en":"High-quality aluminum foil container y250-3000 for various applications","de":"Hochwertiger aluminiumfolien-behälter y250-3000 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y250-3000 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y250-3000 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y250-3000/y250-3000-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 21: Y250-3500
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y250-3500',
  '{"en":"Aluminum Foil Container Y250-3500","de":"Aluminiumfolien-Behälter Y250-3500","es":"Contenedor de Papel de Aluminio Y250-3500","fr":"Conteneur en Papier d'Aluminium Y250-3500"}',
  '{"en":"High-quality aluminum foil container y250-3500 for various applications","de":"Hochwertiger aluminiumfolien-behälter y250-3500 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y250-3500 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y250-3500 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-smoothwall'),
  '/product_img/Aluminum-Foil/Container/Smoothwall/Round/Y250-3500/y250-3500-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 22: C2
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c2',
  '{"en":"Aluminum Foil Container C2","de":"Aluminiumfolien-Behälter C2","es":"Contenedor de Papel de Aluminio C2","fr":"Conteneur en Papier d'Aluminium C2"}',
  '{"en":"High-quality aluminum foil container c2 for various applications","de":"Hochwertiger aluminiumfolien-behälter c2 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C2 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c2 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C2/c2-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 23: C3
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c3',
  '{"en":"Aluminum Foil Container C3","de":"Aluminiumfolien-Behälter C3","es":"Contenedor de Papel de Aluminio C3","fr":"Conteneur en Papier d'Aluminium C3"}',
  '{"en":"High-quality aluminum foil container c3 for various applications","de":"Hochwertiger aluminiumfolien-behälter c3 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C3 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c3 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C3/c3-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 24: C4
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c4',
  '{"en":"Aluminum Foil Container C4","de":"Aluminiumfolien-Behälter C4","es":"Contenedor de Papel de Aluminio C4","fr":"Conteneur en Papier d'Aluminium C4"}',
  '{"en":"High-quality aluminum foil container c4 for various applications","de":"Hochwertiger aluminiumfolien-behälter c4 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C4 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c4 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C4/c4-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 25: C130
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c130',
  '{"en":"Aluminum Foil Container C130","de":"Aluminiumfolien-Behälter C130","es":"Contenedor de Papel de Aluminio C130","fr":"Conteneur en Papier d'Aluminium C130"}',
  '{"en":"High-quality aluminum foil container c130 for various applications","de":"Hochwertiger aluminiumfolien-behälter c130 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C130 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c130 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C130/c130-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 26: C142
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c142',
  '{"en":"Aluminum Foil Container C142","de":"Aluminiumfolien-Behälter C142","es":"Contenedor de Papel de Aluminio C142","fr":"Conteneur en Papier d'Aluminium C142"}',
  '{"en":"High-quality aluminum foil container c142 for various applications","de":"Hochwertiger aluminiumfolien-behälter c142 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C142 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c142 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C142/c142-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 27: C144
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c144',
  '{"en":"Aluminum Foil Container C144","de":"Aluminiumfolien-Behälter C144","es":"Contenedor de Papel de Aluminio C144","fr":"Conteneur en Papier d'Aluminium C144"}',
  '{"en":"High-quality aluminum foil container c144 for various applications","de":"Hochwertiger aluminiumfolien-behälter c144 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C144 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c144 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C144/c144.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 28: C148
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c148',
  '{"en":"Aluminum Foil Container C148","de":"Aluminiumfolien-Behälter C148","es":"Contenedor de Papel de Aluminio C148","fr":"Conteneur en Papier d'Aluminium C148"}',
  '{"en":"High-quality aluminum foil container c148 for various applications","de":"Hochwertiger aluminiumfolien-behälter c148 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C148 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c148 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C148/c148.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 29: C154
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c154',
  '{"en":"Aluminum Foil Container C154","de":"Aluminiumfolien-Behälter C154","es":"Contenedor de Papel de Aluminio C154","fr":"Conteneur en Papier d'Aluminium C154"}',
  '{"en":"High-quality aluminum foil container c154 for various applications","de":"Hochwertiger aluminiumfolien-behälter c154 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C154 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c154 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C154/c154.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 30: C165
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c165',
  '{"en":"Aluminum Foil Container C165","de":"Aluminiumfolien-Behälter C165","es":"Contenedor de Papel de Aluminio C165","fr":"Conteneur en Papier d'Aluminium C165"}',
  '{"en":"High-quality aluminum foil container c165 for various applications","de":"Hochwertiger aluminiumfolien-behälter c165 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C165 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c165 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C165/c165-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 31: C175
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c175',
  '{"en":"Aluminum Foil Container C175","de":"Aluminiumfolien-Behälter C175","es":"Contenedor de Papel de Aluminio C175","fr":"Conteneur en Papier d'Aluminium C175"}',
  '{"en":"High-quality aluminum foil container c175 for various applications","de":"Hochwertiger aluminiumfolien-behälter c175 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C175 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c175 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C175/c175-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 32: C184
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c184',
  '{"en":"Aluminum Foil Container C184","de":"Aluminiumfolien-Behälter C184","es":"Contenedor de Papel de Aluminio C184","fr":"Conteneur en Papier d'Aluminium C184"}',
  '{"en":"High-quality aluminum foil container c184 for various applications","de":"Hochwertiger aluminiumfolien-behälter c184 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C184 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c184 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C184/c184-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 33: C185
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c185',
  '{"en":"Aluminum Foil Container C185","de":"Aluminiumfolien-Behälter C185","es":"Contenedor de Papel de Aluminio C185","fr":"Conteneur en Papier d'Aluminium C185"}',
  '{"en":"High-quality aluminum foil container c185 for various applications","de":"Hochwertiger aluminiumfolien-behälter c185 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C185 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c185 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C185/c185-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 34: C195
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c195',
  '{"en":"Aluminum Foil Container C195","de":"Aluminiumfolien-Behälter C195","es":"Contenedor de Papel de Aluminio C195","fr":"Conteneur en Papier d'Aluminium C195"}',
  '{"en":"High-quality aluminum foil container c195 for various applications","de":"Hochwertiger aluminiumfolien-behälter c195 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C195 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c195 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C195/c195-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 35: C205
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c205',
  '{"en":"Aluminum Foil Container C205","de":"Aluminiumfolien-Behälter C205","es":"Contenedor de Papel de Aluminio C205","fr":"Conteneur en Papier d'Aluminium C205"}',
  '{"en":"High-quality aluminum foil container c205 for various applications","de":"Hochwertiger aluminiumfolien-behälter c205 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C205 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c205 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C205/c205-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 36: C209
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c209',
  '{"en":"Aluminum Foil Container C209","de":"Aluminiumfolien-Behälter C209","es":"Contenedor de Papel de Aluminio C209","fr":"Conteneur en Papier d'Aluminium C209"}',
  '{"en":"High-quality aluminum foil container c209 for various applications","de":"Hochwertiger aluminiumfolien-behälter c209 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C209 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c209 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C209/c209.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 37: C214
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c214',
  '{"en":"Aluminum Foil Container C214","de":"Aluminiumfolien-Behälter C214","es":"Contenedor de Papel de Aluminio C214","fr":"Conteneur en Papier d'Aluminium C214"}',
  '{"en":"High-quality aluminum foil container c214 for various applications","de":"Hochwertiger aluminiumfolien-behälter c214 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C214 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c214 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C214/c214-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 38: C216
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c216',
  '{"en":"Aluminum Foil Container C216","de":"Aluminiumfolien-Behälter C216","es":"Contenedor de Papel de Aluminio C216","fr":"Conteneur en Papier d'Aluminium C216"}',
  '{"en":"High-quality aluminum foil container c216 for various applications","de":"Hochwertiger aluminiumfolien-behälter c216 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C216 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c216 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C216/c216.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 39: C220
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c220',
  '{"en":"Aluminum Foil Container C220","de":"Aluminiumfolien-Behälter C220","es":"Contenedor de Papel de Aluminio C220","fr":"Conteneur en Papier d'Aluminium C220"}',
  '{"en":"High-quality aluminum foil container c220 for various applications","de":"Hochwertiger aluminiumfolien-behälter c220 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C220 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c220 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C220/c220-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 40: C239
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c239',
  '{"en":"Aluminum Foil Container C239","de":"Aluminiumfolien-Behälter C239","es":"Contenedor de Papel de Aluminio C239","fr":"Conteneur en Papier d'Aluminium C239"}',
  '{"en":"High-quality aluminum foil container c239 for various applications","de":"Hochwertiger aluminiumfolien-behälter c239 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C239 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c239 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C239/c239-1.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 41: C312
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c312',
  '{"en":"Aluminum Foil Container C312","de":"Aluminiumfolien-Behälter C312","es":"Contenedor de Papel de Aluminio C312","fr":"Conteneur en Papier d'Aluminium C312"}',
  '{"en":"High-quality aluminum foil container c312 for various applications","de":"Hochwertiger aluminiumfolien-behälter c312 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C312 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c312 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C312/c312-1.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 42: C314
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c314',
  '{"en":"Aluminum Foil Container C314","de":"Aluminiumfolien-Behälter C314","es":"Contenedor de Papel de Aluminio C314","fr":"Conteneur en Papier d'Aluminium C314"}',
  '{"en":"High-quality aluminum foil container c314 for various applications","de":"Hochwertiger aluminiumfolien-behälter c314 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C314 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c314 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C314/c314-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 43: C320
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c320',
  '{"en":"Aluminum Foil Container C320","de":"Aluminiumfolien-Behälter C320","es":"Contenedor de Papel de Aluminio C320","fr":"Conteneur en Papier d'Aluminium C320"}',
  '{"en":"High-quality aluminum foil container c320 for various applications","de":"Hochwertiger aluminiumfolien-behälter c320 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C320 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c320 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C320/c320-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 44: C337
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c337',
  '{"en":"Aluminum Foil Container C337","de":"Aluminiumfolien-Behälter C337","es":"Contenedor de Papel de Aluminio C337","fr":"Conteneur en Papier d'Aluminium C337"}',
  '{"en":"High-quality aluminum foil container c337 for various applications","de":"Hochwertiger aluminiumfolien-behälter c337 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C337 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c337 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C337/c337-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 45: C350
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c350',
  '{"en":"Aluminum Foil Container C350","de":"Aluminiumfolien-Behälter C350","es":"Contenedor de Papel de Aluminio C350","fr":"Conteneur en Papier d'Aluminium C350"}',
  '{"en":"High-quality aluminum foil container c350 for various applications","de":"Hochwertiger aluminiumfolien-behälter c350 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C350 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c350 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C350/c350-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 46: C370
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c370',
  '{"en":"Aluminum Foil Container C370","de":"Aluminiumfolien-Behälter C370","es":"Contenedor de Papel de Aluminio C370","fr":"Conteneur en Papier d'Aluminium C370"}',
  '{"en":"High-quality aluminum foil container c370 for various applications","de":"Hochwertiger aluminiumfolien-behälter c370 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C370 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c370 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C370/c370-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 47: C430
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c430',
  '{"en":"Aluminum Foil Container C430","de":"Aluminiumfolien-Behälter C430","es":"Contenedor de Papel de Aluminio C430","fr":"Conteneur en Papier d'Aluminium C430"}',
  '{"en":"High-quality aluminum foil container c430 for various applications","de":"Hochwertiger aluminiumfolien-behälter c430 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C430 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c430 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C430/c430-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 48: C526
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c526',
  '{"en":"Aluminum Foil Container C526","de":"Aluminiumfolien-Behälter C526","es":"Contenedor de Papel de Aluminio C526","fr":"Conteneur en Papier d'Aluminium C526"}',
  '{"en":"High-quality aluminum foil container c526 for various applications","de":"Hochwertiger aluminiumfolien-behälter c526 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C526 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c526 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C526/c526-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 49: C2051
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-c2051',
  '{"en":"Aluminum Foil Container C2051","de":"Aluminiumfolien-Behälter C2051","es":"Contenedor de Papel de Aluminio C2051","fr":"Conteneur en Papier d'Aluminium C2051"}',
  '{"en":"High-quality aluminum foil container c2051 for various applications","de":"Hochwertiger aluminiumfolien-behälter c2051 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio C2051 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium c2051 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/rectangle/C2051/c2051-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 50: Y80
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y80',
  '{"en":"Aluminum Foil Container Y80","de":"Aluminiumfolien-Behälter Y80","es":"Contenedor de Papel de Aluminio Y80","fr":"Conteneur en Papier d'Aluminium Y80"}',
  '{"en":"High-quality aluminum foil container y80 for various applications","de":"Hochwertiger aluminiumfolien-behälter y80 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y80 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y80 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y80/y80-1.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 51: Y120
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y120',
  '{"en":"Aluminum Foil Container Y120","de":"Aluminiumfolien-Behälter Y120","es":"Contenedor de Papel de Aluminio Y120","fr":"Conteneur en Papier d'Aluminium Y120"}',
  '{"en":"High-quality aluminum foil container y120 for various applications","de":"Hochwertiger aluminiumfolien-behälter y120 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y120 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y120 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y120/y120-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 52: Y140
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y140',
  '{"en":"Aluminum Foil Container Y140","de":"Aluminiumfolien-Behälter Y140","es":"Contenedor de Papel de Aluminio Y140","fr":"Conteneur en Papier d'Aluminium Y140"}',
  '{"en":"High-quality aluminum foil container y140 for various applications","de":"Hochwertiger aluminiumfolien-behälter y140 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y140 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y140 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y140/y140-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 53: Y176
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y176',
  '{"en":"Aluminum Foil Container Y176","de":"Aluminiumfolien-Behälter Y176","es":"Contenedor de Papel de Aluminio Y176","fr":"Conteneur en Papier d'Aluminium Y176"}',
  '{"en":"High-quality aluminum foil container y176 for various applications","de":"Hochwertiger aluminiumfolien-behälter y176 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y176 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y176 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y176/y176-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 54: Y183
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y183',
  '{"en":"Aluminum Foil Container Y183","de":"Aluminiumfolien-Behälter Y183","es":"Contenedor de Papel de Aluminio Y183","fr":"Conteneur en Papier d'Aluminium Y183"}',
  '{"en":"High-quality aluminum foil container y183 for various applications","de":"Hochwertiger aluminiumfolien-behälter y183 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y183 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y183 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y183/y183-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 55: Y212
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y212',
  '{"en":"Aluminum Foil Container Y212","de":"Aluminiumfolien-Behälter Y212","es":"Contenedor de Papel de Aluminio Y212","fr":"Conteneur en Papier d'Aluminium Y212"}',
  '{"en":"High-quality aluminum foil container y212 for various applications","de":"Hochwertiger aluminiumfolien-behälter y212 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y212 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y212 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y212/y212-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 56: Y214
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y214',
  '{"en":"Aluminum Foil Container Y214","de":"Aluminiumfolien-Behälter Y214","es":"Contenedor de Papel de Aluminio Y214","fr":"Conteneur en Papier d'Aluminium Y214"}',
  '{"en":"High-quality aluminum foil container y214 for various applications","de":"Hochwertiger aluminiumfolien-behälter y214 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y214 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y214 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y214/y214-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 57: Y234
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y234',
  '{"en":"Aluminum Foil Container Y234","de":"Aluminiumfolien-Behälter Y234","es":"Contenedor de Papel de Aluminio Y234","fr":"Conteneur en Papier d'Aluminium Y234"}',
  '{"en":"High-quality aluminum foil container y234 for various applications","de":"Hochwertiger aluminiumfolien-behälter y234 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y234 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y234 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y234/y234-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 58: Y252
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y252',
  '{"en":"Aluminum Foil Container Y252","de":"Aluminiumfolien-Behälter Y252","es":"Contenedor de Papel de Aluminio Y252","fr":"Conteneur en Papier d'Aluminium Y252"}',
  '{"en":"High-quality aluminum foil container y252 for various applications","de":"Hochwertiger aluminiumfolien-behälter y252 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y252 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y252 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y252/y252-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 59: Y292
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y292',
  '{"en":"Aluminum Foil Container Y292","de":"Aluminiumfolien-Behälter Y292","es":"Contenedor de Papel de Aluminio Y292","fr":"Conteneur en Papier d'Aluminium Y292"}',
  '{"en":"High-quality aluminum foil container y292 for various applications","de":"Hochwertiger aluminiumfolien-behälter y292 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y292 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y292 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y292/y292-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 60: Y328
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y328',
  '{"en":"Aluminum Foil Container Y328","de":"Aluminiumfolien-Behälter Y328","es":"Contenedor de Papel de Aluminio Y328","fr":"Conteneur en Papier d'Aluminium Y328"}',
  '{"en":"High-quality aluminum foil container y328 for various applications","de":"Hochwertiger aluminiumfolien-behälter y328 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y328 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y328 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y328/y328-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 61: Y340
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y340',
  '{"en":"Aluminum Foil Container Y340","de":"Aluminiumfolien-Behälter Y340","es":"Contenedor de Papel de Aluminio Y340","fr":"Conteneur en Papier d'Aluminium Y340"}',
  '{"en":"High-quality aluminum foil container y340 for various applications","de":"Hochwertiger aluminiumfolien-behälter y340 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y340 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y340 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y340/y340-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 62: Y345
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y345',
  '{"en":"Aluminum Foil Container Y345","de":"Aluminiumfolien-Behälter Y345","es":"Contenedor de Papel de Aluminio Y345","fr":"Conteneur en Papier d'Aluminium Y345"}',
  '{"en":"High-quality aluminum foil container y345 for various applications","de":"Hochwertiger aluminiumfolien-behälter y345 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y345 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y345 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y345/y345-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 63: Y380
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y380',
  '{"en":"Aluminum Foil Container Y380","de":"Aluminiumfolien-Behälter Y380","es":"Contenedor de Papel de Aluminio Y380","fr":"Conteneur en Papier d'Aluminium Y380"}',
  '{"en":"High-quality aluminum foil container y380 for various applications","de":"Hochwertiger aluminiumfolien-behälter y380 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y380 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y380 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y380/y380-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 64: Y430
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y430',
  '{"en":"Aluminum Foil Container Y430","de":"Aluminiumfolien-Behälter Y430","es":"Contenedor de Papel de Aluminio Y430","fr":"Conteneur en Papier d'Aluminium Y430"}',
  '{"en":"High-quality aluminum foil container y430 for various applications","de":"Hochwertiger aluminiumfolien-behälter y430 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y430 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y430 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y430/y430-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 65: Y470
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y470',
  '{"en":"Aluminum Foil Container Y470","de":"Aluminiumfolien-Behälter Y470","es":"Contenedor de Papel de Aluminio Y470","fr":"Conteneur en Papier d'Aluminium Y470"}',
  '{"en":"High-quality aluminum foil container y470 for various applications","de":"Hochwertiger aluminiumfolien-behälter y470 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y470 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y470 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y470/y470-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 66: Y545
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y545',
  '{"en":"Aluminum Foil Container Y545","de":"Aluminiumfolien-Behälter Y545","es":"Contenedor de Papel de Aluminio Y545","fr":"Conteneur en Papier d'Aluminium Y545"}',
  '{"en":"High-quality aluminum foil container y545 for various applications","de":"Hochwertiger aluminiumfolien-behälter y545 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y545 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y545 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y545/y545-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 67: Y1843
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-y1843',
  '{"en":"Aluminum Foil Container Y1843","de":"Aluminiumfolien-Behälter Y1843","es":"Contenedor de Papel de Aluminio Y1843","fr":"Conteneur en Papier d'Aluminium Y1843"}',
  '{"en":"High-quality aluminum foil container y1843 for various applications","de":"Hochwertiger aluminiumfolien-behälter y1843 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio Y1843 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium y1843 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/round/Y1843/y1843.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 68: F160
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-f160',
  '{"en":"Aluminum Foil Container F160","de":"Aluminiumfolien-Behälter F160","es":"Contenedor de Papel de Aluminio F160","fr":"Conteneur en Papier d'Aluminium F160"}',
  '{"en":"High-quality aluminum foil container f160 for various applications","de":"Hochwertiger aluminiumfolien-behälter f160 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio F160 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium f160 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/square/F160/f160-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 69: F205
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-container-f205',
  '{"en":"Aluminum Foil Container F205","de":"Aluminiumfolien-Behälter F205","es":"Contenedor de Papel de Aluminio F205","fr":"Conteneur en Papier d'Aluminium F205"}',
  '{"en":"High-quality aluminum foil container f205 for various applications","de":"Hochwertiger aluminiumfolien-behälter f205 für verschiedene Anwendungen","es":"Contenedor de Papel de Aluminio F205 de alta calidad para diversas aplicaciones","fr":"conteneur en papier d'aluminium f205 de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-container-wrinklewall'),
  '/product_img/Aluminum-Foil/Container/Wrinklewall/square/F205/f205-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 70: Aluminum Foil Roll
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'aluminum-foil-roll',
  '{"en":"Aluminum Foil Aluminum Foil Roll","de":"Aluminiumfolie Aluminum Foil Roll","es":"Papel de Aluminio Aluminum Foil Roll","fr":"Papier d'Aluminium Aluminum Foil Roll"}',
  '{"en":"High-quality aluminum foil aluminum foil roll for various applications","de":"Hochwertiger aluminiumfolie aluminum foil roll für verschiedene Anwendungen","es":"Papel de Aluminio Aluminum Foil Roll de alta calidad para diversas aplicaciones","fr":"papier d'aluminium aluminum foil roll de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-sheets'),
  '/product_img/Aluminum-Foil/Foil Sheets/Aluminum-Foil-Roll/aluminum-foil-roll-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 71: Hairdressing Foil Roll
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'hairdressing-foil-roll',
  '{"en":"Aluminum Foil Hairdressing Foil Roll","de":"Aluminiumfolie Hairdressing Foil Roll","es":"Papel de Aluminio Hairdressing Foil Roll","fr":"Papier d'Aluminium Hairdressing Foil Roll"}',
  '{"en":"High-quality aluminum foil hairdressing foil roll for various applications","de":"Hochwertiger aluminiumfolie hairdressing foil roll für verschiedene Anwendungen","es":"Papel de Aluminio Hairdressing Foil Roll de alta calidad para diversas aplicaciones","fr":"papier d'aluminium hairdressing foil roll de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-sheets'),
  '/product_img/Aluminum-Foil/Foil Sheets/Hairdressing-Foil-Roll/hairdressing-foil-roll.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- 产品 72: Pop-up Foil Sheets
INSERT INTO products (
  slug,
  name_i18n,
  description_i18n,
  category_id,
  image_url,
  is_active,
  created_at,
  updated_at
) VALUES (
  'pop-up-foil-sheets',
  '{"en":"Aluminum Foil Pop-up Foil Sheets","de":"Aluminiumfolie Pop-up Foil Sheets","es":"Papel de Aluminio Pop-up Foil Sheets","fr":"Papier d'Aluminium Pop-up Foil Sheets"}',
  '{"en":"High-quality aluminum foil pop-up foil sheets for various applications","de":"Hochwertiger aluminiumfolie pop-up foil sheets für verschiedene Anwendungen","es":"Papel de Aluminio Pop-up Foil Sheets de alta calidad para diversas aplicaciones","fr":"papier d'aluminium pop-up foil sheets de haute qualité pour diverses applications"}',
  (SELECT id FROM categories WHERE slug = 'aluminum-foil-sheets'),
  '/product_img/Aluminum-Foil/Foil Sheets/Pop-up-Foil-Sheets/pop-up-foil-sheets-2.webp',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  name_i18n = EXCLUDED.name_i18n,
  description_i18n = EXCLUDED.description_i18n,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

