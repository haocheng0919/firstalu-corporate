require('dotenv').config({ path: '.env.local' });
const path = require('path');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Config
const PRODUCT_IMG_ROOT = path.join(process.cwd(), 'public', 'product_img');
const CATEGORY_THUMB_BUCKET = 'product-images';

function slugify(str) {
  return String(str)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/&/g, ' and ')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function listDirectories(root) {
  try {
    return fs
      .readdirSync(root, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch (e) {
    return [];
  }
}

async function getOrCreateCategory({ slug, parentId, name }) {
  // Slug is globally unique; find by slug only
  const { data: existing, error: findErr } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .limit(1);
  if (findErr) {
    console.error('Find category error:', findErr);
    throw findErr;
  }

  if (existing && existing.length > 0) {
    const cat = existing[0];
    // If parentId specified and category has no parent yet, set it
    if (parentId && !cat.parent_id) {
      const { error: parentUpdErr } = await supabase
        .from('categories')
        .update({ parent_id: parentId })
        .eq('id', cat.id);
      if (parentUpdErr) {
        console.warn('Could not set parent for category', slug, parentUpdErr.message);
      } else {
        cat.parent_id = parentId;
      }
    } else if (parentId && cat.parent_id && cat.parent_id !== parentId) {
      console.warn('Category parent mismatch for', slug, 'existing parent kept.');
    }
    // Ensure i18n name exists/updated
    await ensureCategoryI18n(cat.id, 'en', name);
    return cat;
  }

  // Create new category
  const { data: created, error: createErr } = await supabase
    .from('categories')
    .insert([{ slug, parent_id: parentId || null }])
    .select()
    .single();
  if (createErr) {
    console.error('Create category error:', createErr, { slug, parentId });
    throw createErr;
  }

  await ensureCategoryI18n(created.id, 'en', name);
  return created;
}

async function ensureCategoryI18n(categoryId, locale, name) {
  // Check if exists
  const { data: rows, error: selErr } = await supabase
    .from('category_i18n')
    .select('id')
    .eq('category_id', categoryId)
    .eq('locale', locale)
    .limit(1);

  if (selErr) {
    console.error('Select category_i18n error:', selErr, { categoryId, locale });
    throw selErr;
  }

  if (rows && rows.length > 0) {
    const { error: updErr } = await supabase
      .from('category_i18n')
      .update({ name })
      .eq('category_id', categoryId)
      .eq('locale', locale);
    if (updErr) {
      console.error('Update category_i18n error:', updErr, { categoryId, locale });
      throw updErr;
    }
  } else {
    const { error: insErr } = await supabase
      .from('category_i18n')
      .insert([{ category_id: categoryId, locale, name: name || '' }]);
    if (insErr) {
      console.error('Insert category_i18n error:', insErr, { categoryId, locale });
      throw insErr;
    }
  }
}

async function setTopCategoryThumbnailIfAvailable(categoryId, slug) {
  const storagePath = `categories/${slug}.webp`;
  const { data } = supabase.storage.from(CATEGORY_THUMB_BUCKET).getPublicUrl(storagePath);
  const publicUrl = data?.publicUrl || null;

  if (!publicUrl) return;

  const { error } = await supabase
    .from('categories')
    .update({ thumbnail_url: publicUrl })
    .eq('id', categoryId);

  if (error) {
    console.error('Update thumbnail_url error:', error, { categoryId, slug });
  }
}

async function main() {
  console.log('Scanning product image folders to build category hierarchy...');

  if (!fs.existsSync(PRODUCT_IMG_ROOT)) {
    console.error('Directory does not exist:', PRODUCT_IMG_ROOT);
    process.exit(1);
  }

  const topLevels = listDirectories(PRODUCT_IMG_ROOT);
  console.log(`Found ${topLevels.length} top-level categories.`);

  let topCount = 0;
  let secondCount = 0;
  let thirdCount = 0;

  for (const topName of topLevels) {
    const topSlug = slugify(topName);
    const topCat = await getOrCreateCategory({ slug: topSlug, parentId: null, name: topName });
    await setTopCategoryThumbnailIfAvailable(topCat.id, topSlug);
    topCount++;

    const secondRoot = path.join(PRODUCT_IMG_ROOT, topName);
    const secondLevels = listDirectories(secondRoot);

    for (const secondName of secondLevels) {
      const secondSlug = slugify(secondName);
      const secondCat = await getOrCreateCategory({ slug: secondSlug, parentId: topCat.id, name: secondName });
      secondCount++;

      const thirdRoot = path.join(secondRoot, secondName);
      const thirdLevels = listDirectories(thirdRoot);

      for (const thirdName of thirdLevels) {
        const thirdSlug = slugify(thirdName);
        await getOrCreateCategory({ slug: thirdSlug, parentId: secondCat.id, name: thirdName });
        thirdCount++;
      }
    }
  }

  console.log('\nCategory sync completed.');
  console.log(`Top-level: ${topCount}`);
  console.log(`Second-level: ${secondCount}`);
  console.log(`Third-level: ${thirdCount}`);
}

main()
  .then(() => {
    console.log('Done.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Script failed:', err);
    process.exit(1);
  });