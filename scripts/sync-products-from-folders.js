// Sync products from public/product_img folder into Supabase DB
// - Creates/updates products with images JSON (thumbnail/additional)
// - Links each product to the proper third-level category by slug
// - Creates basic EN i18n (name) if missing

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Constants
const PRODUCT_IMG_ROOT = path.join(__dirname, '..', 'public', 'product_img');
const BUCKET = 'product-images';
const STORAGE_PRODUCTS_PREFIX = 'products';

function slugify(str) {
  return String(str)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function titleCaseFromSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function listDirectories(dirPath) {
  try {
    return fs
      .readdirSync(dirPath, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch (e) {
    return [];
  }
}

function collectWebpFilesRecursive(rootDir) {
  const results = [];
  (function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.webp') {
        results.push(full);
      }
    }
  })(rootDir);
  return results;
}

function getPublicUrl(storagePath) {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  return data?.publicUrl || null;
}

const categoryIdCache = new Map();
async function getCategoryIdBySlug(slug) {
  if (categoryIdCache.has(slug)) return categoryIdCache.get(slug);
  const { data, error } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', slug)
    .limit(1);
  if (error) throw error;
  const id = data && data.length ? data[0].id : null;
  if (!id) {
    console.warn('Category not found for slug:', slug);
  }
  categoryIdCache.set(slug, id);
  return id;
}

function generateSKU(secondSlug, filenameSlug) {
  const prefix = secondSlug.slice(0, 3).toUpperCase();
  const code = filenameSlug.toUpperCase().replace(/-/g, '').slice(0, 24);
  return `${prefix}-${code}`;
}

async function ensureProductI18nEn(productId, name) {
  const { data: existing, error: selErr } = await supabase
    .from('product_i18n')
    .select('id')
    .eq('product_id', productId)
    .eq('locale', 'en')
    .limit(1);
  if (selErr) throw selErr;
  if (existing && existing.length) return; // already exists
  const { error: insErr } = await supabase
    .from('product_i18n')
    .insert([{ product_id: productId, locale: 'en', name: name || '' }]);
  if (insErr) throw insErr;
}

async function upsertProduct({ slug, sku, category_id, imageUrl, name }) {
  // Check if product exists by slug
  const { data: rows, error: findErr } = await supabase
    .from('products')
    .select('id, images')
    .eq('slug', slug)
    .limit(1);
  if (findErr) throw findErr;

  if (rows && rows.length) {
    const existing = rows[0];
    let images = existing.images || {};

    // Normalize images object to our expected shape
    if (Array.isArray(images)) {
      images = { thumbnail: images[0] || imageUrl, additional: images.slice(1) };
    }
    if (!images.thumbnail) images.thumbnail = imageUrl;
    if (!images.additional) images.additional = [];
    if (!images.additional.includes(imageUrl)) images.additional.push(imageUrl);

    const { data: upd, error: updErr } = await supabase
      .from('products')
      .update({ images })
      .eq('id', existing.id)
      .select('id')
      .single();
    if (updErr) throw updErr;

    await ensureProductI18nEn(existing.id, name);
    return { id: existing.id, updated: true, created: false };
  }

  // Insert new product
  const insertPayload = {
    slug,
    sku,
    status: 'active',
    category_id,
    images: { thumbnail: imageUrl, additional: [] },
    specs: {},
    technical_specs: {}
  };

  const { data: created, error: insErr } = await supabase
    .from('products')
    .insert([insertPayload])
    .select('id')
    .single();
  if (insErr) throw insErr;

  await ensureProductI18nEn(created.id, name);
  return { id: created.id, updated: false, created: true };
}

async function main() {
  console.log('Scanning product image folders to sync products...');
  if (!fs.existsSync(PRODUCT_IMG_ROOT)) {
    console.error('Directory does not exist:', PRODUCT_IMG_ROOT);
    process.exit(1);
  }

  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  const topLevels = listDirectories(PRODUCT_IMG_ROOT);
  for (const topName of topLevels) {
    const topRoot = path.join(PRODUCT_IMG_ROOT, topName);
    const secondLevels = listDirectories(topRoot);

    for (const secondName of secondLevels) {
      const secondRoot = path.join(topRoot, secondName);
      const thirdLevels = listDirectories(secondRoot);

      for (const thirdName of thirdLevels) {
        const thirdRoot = path.join(secondRoot, thirdName);
        const webpFiles = collectWebpFilesRecursive(thirdRoot);
        if (webpFiles.length === 0) continue;

        const secondSlug = slugify(secondName);
        const thirdSlug = slugify(thirdName);
        const categoryId = await getCategoryIdBySlug(thirdSlug);
        if (!categoryId) {
          console.warn('Skipping files under third-level folder due to missing category:', { secondName, thirdName });
          skippedCount += webpFiles.length;
          continue;
        }

        for (const absFilePath of webpFiles) {
          const relFromRoot = path.relative(path.join(__dirname, '..', 'public'), absFilePath); // e.g., product_img/.../file.webp
          // map to storage path under products keeping relative structure after product_img/
          const relUnderProductImg = relFromRoot.replace(/^product_img\//, '');
          const storagePath = `${STORAGE_PRODUCTS_PREFIX}/${relUnderProductImg}`; // products/<...>
          const publicUrl = getPublicUrl(storagePath);
          if (!publicUrl) {
            console.warn('No public URL for storage path (did you upload images first?):', storagePath);
            skippedCount++;
            continue;
          }

          const base = path.basename(absFilePath, path.extname(absFilePath));
          let filenameSlug = slugify(base);
          if (!filenameSlug) filenameSlug = `item-${Date.now()}`;

          const productSlug = `${secondSlug}-${thirdSlug}-${filenameSlug}`;
          const productName = titleCaseFromSlug(filenameSlug);
          const sku = generateSKU(secondSlug, filenameSlug);

          try {
            const res = await upsertProduct({ slug: productSlug, sku, category_id: categoryId, imageUrl: publicUrl, name: productName });
            if (res.created) createdCount++;
            else if (res.updated) updatedCount++;
            else skippedCount++;
          } catch (e) {
            console.error('Upsert product failed for', productSlug, e.message || e);
            skippedCount++;
          }
        }
      }
    }
  }

  console.log('Product sync completed.');
  console.log(`Created: ${createdCount}`);
  console.log(`Updated: ${updatedCount}`);
  console.log(`Skipped: ${skippedCount}`);
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(err => { console.error(err); process.exit(1); });
}

module.exports = { main };