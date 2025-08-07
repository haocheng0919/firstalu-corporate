-- Database Fix Script for FirstAlu Project
-- This script creates missing tables and fixes RLS policies

-- 1. Create carousel table
CREATE TABLE IF NOT EXISTS public.carousel (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    image_url text,
    link_url text,
    order_index integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- 2. Create carousel_i18n table
CREATE TABLE IF NOT EXISTS public.carousel_i18n (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    carousel_id uuid REFERENCES public.carousel(id) ON DELETE CASCADE,
    locale text NOT NULL CHECK (locale = ANY (ARRAY['en'::text, 'fr'::text, 'es'::text, 'de'::text])),
    title text DEFAULT '',
    description text DEFAULT '',
    alt_text text DEFAULT '',
    created_at timestamptz DEFAULT now(),
    UNIQUE(carousel_id, locale)
);

-- 3. Create category_i18n table
CREATE TABLE IF NOT EXISTS public.category_i18n (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE,
    locale text NOT NULL CHECK (locale = ANY (ARRAY['en'::text, 'fr'::text, 'es'::text, 'de'::text])),
    name text DEFAULT '',
    created_at timestamptz DEFAULT now(),
    UNIQUE(category_id, locale)
);

-- 4. Enable RLS on all tables
ALTER TABLE public.carousel ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carousel_i18n ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_i18n ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for carousel table
DROP POLICY IF EXISTS "Allow public read access on carousel" ON public.carousel;
CREATE POLICY "Allow public read access on carousel" ON public.carousel
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all operations on carousel" ON public.carousel;
CREATE POLICY "Allow all operations on carousel" ON public.carousel
    FOR ALL USING (true) WITH CHECK (true);

-- 6. Create RLS policies for carousel_i18n table
DROP POLICY IF EXISTS "Allow public read access on carousel_i18n" ON public.carousel_i18n;
CREATE POLICY "Allow public read access on carousel_i18n" ON public.carousel_i18n
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all operations on carousel_i18n" ON public.carousel_i18n;
CREATE POLICY "Allow all operations on carousel_i18n" ON public.carousel_i18n
    FOR ALL USING (true) WITH CHECK (true);

-- 7. Create RLS policies for category_i18n table
DROP POLICY IF EXISTS "Allow public read access on category_i18n" ON public.category_i18n;
CREATE POLICY "Allow public read access on category_i18n" ON public.category_i18n
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all operations on category_i18n" ON public.category_i18n;
CREATE POLICY "Allow all operations on category_i18n" ON public.category_i18n
    FOR ALL USING (true) WITH CHECK (true);

-- 8. Fix RLS policies for categories table
DROP POLICY IF EXISTS "Allow public read access on categories" ON public.categories;
CREATE POLICY "Allow public read access on categories" ON public.categories
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all operations on categories" ON public.categories;
CREATE POLICY "Allow all operations on categories" ON public.categories
    FOR ALL USING (true) WITH CHECK (true);

-- 9. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_carousel_order_index ON public.carousel(order_index);
CREATE INDEX IF NOT EXISTS idx_carousel_is_active ON public.carousel(is_active);
CREATE INDEX IF NOT EXISTS idx_carousel_i18n_carousel_id ON public.carousel_i18n(carousel_id);
CREATE INDEX IF NOT EXISTS idx_carousel_i18n_locale ON public.carousel_i18n(locale);
CREATE INDEX IF NOT EXISTS idx_category_i18n_category_id ON public.category_i18n(category_id);
CREATE INDEX IF NOT EXISTS idx_category_i18n_locale ON public.category_i18n(locale);

-- 10. Insert some sample data for testing (optional)
-- INSERT INTO public.carousel (image_url, link_url, order_index, is_active) VALUES
-- ('https://example.com/image1.jpg', 'https://example.com/link1', 1, true),
-- ('https://example.com/image2.jpg', 'https://example.com/link2', 2, true);