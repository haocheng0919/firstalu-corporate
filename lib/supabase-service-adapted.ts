import { supabase } from './supabase'

// Adapted types for existing database structure
export interface AdaptedProduct {
  id: string
  category_id?: string
  category_slug?: string
  slug: string
  sku?: string
  status?: string
  images?: any
  specs?: any
  technical_specs?: any
  created_at?: string
  // i18n fields
  name?: string
  name_es?: string
  name_de?: string
  name_fr?: string
  intro?: string
  intro_es?: string
  intro_de?: string
  intro_fr?: string
  description?: string
  description_es?: string
  description_de?: string
  description_fr?: string
}

export interface AdaptedPost {
  id: string
  slug: string
  date: string
  tags?: string[]
  cover_url?: string
  status?: string
  created_at?: string
  // i18n fields
  title?: string
  title_es?: string
  title_de?: string
  title_fr?: string
  excerpt?: string
  excerpt_es?: string
  excerpt_de?: string
  excerpt_fr?: string
  body_md?: string
  body_md_es?: string
  body_md_de?: string
  body_md_fr?: string
}

export interface AdaptedCategory {
  id: string
  slug: string
  parent_id?: string
  thumbnail_url?: string
  created_at?: string
  // i18n fields (if they exist)
  name?: string
  name_es?: string
  name_de?: string
  name_fr?: string
  description?: string
  description_es?: string
  description_de?: string
  description_fr?: string
}

export interface AdaptedCarousel {
  id: string
  title?: string
  title_es?: string
  title_de?: string
  title_fr?: string
  description?: string
  description_es?: string
  description_de?: string
  description_fr?: string
  image_url?: string
  alt_text?: string
  alt_text_es?: string
  alt_text_de?: string
  alt_text_fr?: string
  link_url?: string
  order_index: number
  is_active: boolean
  created_at?: string
}

// Image upload function
export async function uploadImage(file: File, bucket: string, path: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return null
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return publicUrl
  } catch (error) {
    console.error('Upload error:', error)
    return null
  }
}

// Product functions adapted for existing structure
export async function createProduct(product: Omit<AdaptedProduct, 'id' | 'created_at'>): Promise<AdaptedProduct | null> {
  try {
    // Create the main product record
    const { data: productData, error: productError } = await supabase
      .from('products')
      .insert([{
        slug: product.slug,
        sku: product.sku,
        status: product.status || 'active',
        images: product.images,
        specs: product.specs,
        technical_specs: product.technical_specs,
        category_id: product.category_id
      }])
      .select()
      .single()

    if (productError) {
      console.error('Create product error:', productError)
      console.error('Product data being inserted:', {
        slug: product.slug,
        sku: product.sku,
        status: product.status || 'active',
        images: product.images,
        specs: product.specs,
        technical_specs: product.technical_specs,
        category_id: product.category_id
      })
      return null
    }

    // Create i18n records for each language
    const languages = ['en', 'es', 'de', 'fr']
    for (const lang of languages) {
      const locale = lang === 'en' ? 'en' : lang
      const name = lang === 'en' ? product.name : (product as any)[`name_${lang}`]
      const intro = lang === 'en' ? product.intro : (product as any)[`intro_${lang}`]
      const description = lang === 'en' ? product.description : (product as any)[`description_${lang}`]
      if (name || intro || description) {
        await supabase
          .from('product_i18n')
          .insert([{
            product_id: productData.id,
            locale,
            name: name || '',
            intro: intro || '',
            description: description || ''
          }])
      }
    }

    return { ...productData, ...product }
  } catch (error) {
    console.error('Create product error:', error)
    return null
  }
}

export async function getProducts(): Promise<AdaptedProduct[]> {
  try {
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select(`
        *,
        categories!inner(slug)
      `)
      .order('created_at', { ascending: false })

    if (productsError) {
      console.error('Get products error:', productsError)
      return []
    }

    // Get i18n data for all products
    const productIds = products.map(p => p.id)
    const { data: i18nData, error: i18nError } = await supabase
      .from('product_i18n')
      .select('*')
      .in('product_id', productIds)

    if (i18nError) {
      console.error('Get product i18n error:', i18nError)
      return products || []
    }

    // Merge i18n data with products
    const productsWithI18n = products.map(product => {
      const productI18n = i18nData.filter(i18n => i18n.product_id === product.id)
      const merged = { ...product }
      
      // Add category_slug from the joined categories table
      if (product.categories && product.categories.slug) {
        merged.category_slug = product.categories.slug
      }

      productI18n.forEach(i18n => {
        if (i18n.locale === 'en') {
          merged.name = i18n.name
          merged.intro = i18n.intro
          merged.description = i18n.description
        } else {
          merged[`name_${i18n.locale}`] = i18n.name
          merged[`intro_${i18n.locale}`] = i18n.intro
          merged[`description_${i18n.locale}`] = i18n.description
        }
      })

      return merged
    })

    return productsWithI18n || []
  } catch (error) {
    console.error('Get products error:', error)
    return []
  }
}

export async function getProductBySku(sku: string): Promise<AdaptedProduct | null> {
  try {
    const { data: product, error: productError } = await supabase
      .from('products')
      .select(`
        *,
        categories!inner(
          slug
        )
      `)
      .eq('sku', sku)
      .single()

    if (productError) {
      console.error('Get product by SKU error:', productError)
      return null
    }

    // Get i18n data for the product
    const { data: i18nData, error: i18nError } = await supabase
      .from('product_i18n')
      .select('*')
      .eq('product_id', product.id)

    if (i18nError) {
      console.error('Get product i18n error:', i18nError)
      return product
    }

    // Merge i18n data with product
    const merged = { ...product }
    
    // Add category_slug from the joined categories table
    if (product.categories) {
      merged.category_slug = product.categories.slug
    }
    
    i18nData.forEach(i18n => {
      if (i18n.locale === 'en') {
        merged.name = i18n.name
        merged.intro = i18n.intro
        merged.description = i18n.description
      } else {
        merged[`name_${i18n.locale}`] = i18n.name
        merged[`intro_${i18n.locale}`] = i18n.intro
        merged[`description_${i18n.locale}`] = i18n.description
      }
    })

    return merged
  } catch (error) {
    console.error('Get product by SKU error:', error)
    return null
  }
}

export async function updateProduct(id: string, updates: Partial<AdaptedProduct>): Promise<AdaptedProduct | null> {
  try {
    // Update main product record
    const productUpdates: any = {}
    if (updates.slug) productUpdates.slug = updates.slug
    if (updates.sku) productUpdates.sku = updates.sku
    if (updates.status) productUpdates.status = updates.status
    if (updates.images) productUpdates.images = updates.images
    if (updates.specs) productUpdates.specs = updates.specs
    if (updates.technical_specs) productUpdates.technical_specs = updates.technical_specs
    if (updates.category_id) productUpdates.category_id = updates.category_id

    const { data: productData, error: productError } = await supabase
      .from('products')
      .update(productUpdates)
      .eq('id', id)
      .select()
      .single()

    if (productError) {
      console.error('Update product error:', productError)
      return null
    }

    // Update i18n records
    const languages = ['en', 'es', 'de', 'fr']
    for (const lang of languages) {
      const locale = lang === 'en' ? 'en' : lang
      const name = lang === 'en' ? updates.name : updates[`name_${lang}` as keyof AdaptedProduct]
      const intro = lang === 'en' ? updates.intro : updates[`intro_${lang}` as keyof AdaptedProduct]
      const description = lang === 'en' ? updates.description : updates[`description_${lang}` as keyof AdaptedProduct]

      if (name !== undefined || intro !== undefined || description !== undefined) {
        const i18nUpdates: any = {}
        if (name !== undefined) i18nUpdates.name = name
        if (intro !== undefined) i18nUpdates.intro = intro
        if (description !== undefined) i18nUpdates.description = description

        // Try to update existing record, if not found, create new one
        const { error: updateError } = await supabase
          .from('product_i18n')
          .update(i18nUpdates)
          .eq('product_id', id)
          .eq('locale', locale)

        if (updateError) {
          // If update failed, try to insert
          await supabase
            .from('product_i18n')
            .insert([{
              product_id: id,
              locale,
              name: name || '',
              intro: intro || '',
              description: description || ''
            }])
        }
      }
    }

    return { ...productData, ...updates }
  } catch (error) {
    console.error('Update product error:', error)
    return null
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    // Delete i18n records first
    await supabase
      .from('product_i18n')
      .delete()
      .eq('product_id', id)

    // Delete main product record
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete product error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete product error:', error)
    return false
  }
}

// Post functions adapted for existing structure
export async function createPost(post: Omit<AdaptedPost, 'id' | 'created_at'>): Promise<AdaptedPost | null> {
  try {
    // Create the main post record
    const { data: postData, error: postError } = await supabase
      .from('posts')
      .insert([{
        slug: post.slug,
        date: post.date,
        tags: post.tags,
        cover_url: post.cover_url,
        status: post.status || 'published'
      }])
      .select()
      .single()

    if (postError) {
      console.error('Create post error:', postError)
      return null
    }

    // Create i18n records for each language
    const languages = ['en', 'es', 'de', 'fr']
    for (const lang of languages) {
      const locale = lang === 'en' ? 'en' : lang
      const title = lang === 'en' ? post.title : (post as any)[`title_${lang}`]
      const excerpt = lang === 'en' ? post.excerpt : (post as any)[`excerpt_${lang}`]
      const body_md = lang === 'en' ? post.body_md : (post as any)[`body_md_${lang}`]

      if (title || excerpt || body_md) {
        await supabase
          .from('post_i18n')
          .insert([{
            post_id: postData.id,
            locale,
            title: title || '',
            excerpt: excerpt || '',
            body_md: body_md || ''
          }])
      }
    }

    return { ...postData, ...post }
  } catch (error) {
    console.error('Create post error:', error)
    return null
  }
}

export async function getPosts(): Promise<AdaptedPost[]> {
  try {
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (postsError) {
      console.error('Get posts error:', postsError)
      return []
    }

    // Get i18n data for all posts
    const postIds = posts.map(p => p.id)
    const { data: i18nData, error: i18nError } = await supabase
      .from('post_i18n')
      .select('*')
      .in('post_id', postIds)

    if (i18nError) {
      console.error('Get post i18n error:', i18nError)
      return posts || []
    }

    // Merge i18n data with posts
    const postsWithI18n = posts.map(post => {
      const postI18n = i18nData.filter(i18n => i18n.post_id === post.id)
      const merged = { ...post }

      postI18n.forEach(i18n => {
        if (i18n.locale === 'en') {
          merged.title = i18n.title
          merged.excerpt = i18n.excerpt
          merged.body_md = i18n.body_md
        } else {
          merged[`title_${i18n.locale}`] = i18n.title
          merged[`excerpt_${i18n.locale}`] = i18n.excerpt
          merged[`body_md_${i18n.locale}`] = i18n.body_md
        }
      })

      return merged
    })

    return postsWithI18n || []
  } catch (error) {
    console.error('Get posts error:', error)
    return []
  }
}

export async function updatePost(id: string, updates: Partial<AdaptedPost>): Promise<AdaptedPost | null> {
  try {
    // Update main post record
    const postUpdates: any = {}
    if (updates.slug) postUpdates.slug = updates.slug
    if (updates.date) postUpdates.date = updates.date
    if (updates.tags) postUpdates.tags = updates.tags
    if (updates.cover_url) postUpdates.cover_url = updates.cover_url
    if (updates.status) postUpdates.status = updates.status

    const { data: postData, error: postError } = await supabase
      .from('posts')
      .update(postUpdates)
      .eq('id', id)
      .select()
      .single()

    if (postError) {
      console.error('Update post error:', postError)
      return null
    }

    // Update i18n records
    const languages = ['en', 'es', 'de', 'fr']
    for (const lang of languages) {
      const locale = lang === 'en' ? 'en' : lang
      const title = lang === 'en' ? updates.title : updates[`title_${lang}` as keyof AdaptedPost]
      const excerpt = lang === 'en' ? updates.excerpt : updates[`excerpt_${lang}` as keyof AdaptedPost]
      const body_md = lang === 'en' ? updates.body_md : updates[`body_md_${lang}` as keyof AdaptedPost]

      if (title !== undefined || excerpt !== undefined || body_md !== undefined) {
        const i18nUpdates: any = {}
        if (title !== undefined) i18nUpdates.title = title
        if (excerpt !== undefined) i18nUpdates.excerpt = excerpt
        if (body_md !== undefined) i18nUpdates.body_md = body_md

        // Try to update existing record, if not found, create new one
        const { error: updateError } = await supabase
          .from('post_i18n')
          .update(i18nUpdates)
          .eq('post_id', id)
          .eq('locale', locale)

        if (updateError) {
          // If update failed, try to insert
          await supabase
            .from('post_i18n')
            .insert([{
              post_id: id,
              locale,
              title: title || '',
              excerpt: excerpt || '',
              body_md: body_md || ''
            }])
        }
      }
    }

    return { ...postData, ...updates }
  } catch (error) {
    console.error('Update post error:', error)
    return null
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    // Delete i18n records first
    await supabase
      .from('post_i18n')
      .delete()
      .eq('post_id', id)

    // Delete main post record
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete post error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete post error:', error)
    return false
  }
}

// Category functions
export async function createCategory(category: Omit<AdaptedCategory, 'id' | 'created_at'>): Promise<AdaptedCategory | null> {
  try {
    // Create the main category record
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .insert([{
        slug: category.slug,
        parent_id: category.parent_id || null,
        thumbnail_url: category.thumbnail_url
      }])
      .select()
      .single()

    if (categoryError) {
      console.error('Create category error:', categoryError)
      return null
    }

    // Create i18n records for each language if names or descriptions are provided
    const languages = ['en', 'es', 'de', 'fr']
    for (const lang of languages) {
      const locale = lang === 'en' ? 'en' : lang
      const name = lang === 'en' ? category.name : (category as any)[`name_${lang}`]
      const description = lang === 'en' ? category.description : (category as any)[`description_${lang}`]
      if (name || description) {
        await supabase
          .from('category_i18n')
          .insert([{
            category_id: categoryData.id,
            locale,
            name: name || '',
            description: description || ''
          }])
      }
    }

    return { ...categoryData, ...category }
  } catch (error) {
    console.error('Create category error:', error)
    return null
  }
}

export async function getCategories(): Promise<AdaptedCategory[]> {
  try {
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .is('parent_id', null)  // Only get top-level categories (parent categories)
      .order('created_at', { ascending: true })

    if (categoriesError) {
      console.error('Get categories error:', categoriesError)
      return []
    }

    // Get i18n data for all categories
    const categoryIds = categories.map(c => c.id)
    const { data: i18nData, error: i18nError } = await supabase
      .from('category_i18n')
      .select('*')
      .in('category_id', categoryIds)

    if (i18nError) {
      console.error('Get category i18n error:', i18nError)
      return categories || []
    }

    // Merge i18n data with categories
    const categoriesWithI18n = categories.map(category => {
      const categoryI18n = i18nData.filter(i18n => i18n.category_id === category.id)
      const merged = { ...category }

      categoryI18n.forEach(i18n => {
        if (i18n.locale === 'en') {
          merged.name = i18n.name
          merged.description = i18n.description
        } else {
          merged[`name_${i18n.locale}`] = i18n.name
          merged[`description_${i18n.locale}`] = i18n.description
        }
      })

      return merged
    })

    return categoriesWithI18n || []
  } catch (error) {
    console.error('Get categories error:', error)
    return []
  }
}



export async function getSubcategories(parentId: string): Promise<AdaptedCategory[]> {
  try {
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .eq('parent_id', parentId)  // Get subcategories of the specified parent
      .order('created_at', { ascending: true })

    if (categoriesError) {
      console.error('Get subcategories error:', categoriesError)
      return []
    }

    // Get i18n data for all categories
    const categoryIds = categories.map(c => c.id)
    const { data: i18nData, error: i18nError } = await supabase
      .from('category_i18n')
      .select('*')
      .in('category_id', categoryIds)

    if (i18nError) {
      console.error('Get subcategory i18n error:', i18nError)
      return categories || []
    }

    // Merge i18n data with categories
    const categoriesWithI18n = categories.map(category => {
      const categoryI18n = i18nData.filter(i18n => i18n.category_id === category.id)
      const merged = { ...category }

      categoryI18n.forEach(i18n => {
        if (i18n.locale === 'en') {
          merged.name = i18n.name
          merged.description = i18n.description
        } else {
          merged[`name_${i18n.locale}`] = i18n.name
          merged[`description_${i18n.locale}`] = i18n.description
        }
      })

      return merged
    })

    return categoriesWithI18n || []
  } catch (error) {
    console.error('Get subcategories error:', error)
    return []
  }
}

export async function updateCategory(id: string, updates: Partial<AdaptedCategory>): Promise<AdaptedCategory | null> {
  try {
    // Update main category record
    const categoryUpdates: any = {}
    if (updates.slug) categoryUpdates.slug = updates.slug
    if (updates.thumbnail_url !== undefined) categoryUpdates.thumbnail_url = updates.thumbnail_url

    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .update(categoryUpdates)
      .eq('id', id)
      .select()
      .single()

    if (categoryError) {
      console.error('Update category error:', categoryError)
      return null
    }

    // Update i18n records
    const languages = ['en', 'es', 'de', 'fr']
    for (const lang of languages) {
      const locale = lang === 'en' ? 'en' : lang
      const name = lang === 'en' ? updates.name : updates[`name_${lang}` as keyof AdaptedCategory]
      const description = lang === 'en' ? updates.description : updates[`description_${lang}` as keyof AdaptedCategory]

      if (name !== undefined || description !== undefined) {
        const i18nUpdates: any = {}
        if (name !== undefined) i18nUpdates.name = name
        if (description !== undefined) i18nUpdates.description = description

        // Try to update existing record, if not found, create new one
        const { error: updateError } = await supabase
          .from('category_i18n')
          .update(i18nUpdates)
          .eq('category_id', id)
          .eq('locale', locale)

        if (updateError) {
          // If update failed, try to insert
          await supabase
            .from('category_i18n')
            .insert([{
              category_id: id,
              locale,
              name: name || '',
              description: description || ''
            }])
        }
      }
    }

    return { ...categoryData, ...updates }
  } catch (error) {
    console.error('Update category error:', error)
    return null
  }
}

export async function deleteCategory(id: string): Promise<boolean> {
  try {
    // Delete i18n records first
    await supabase
      .from('category_i18n')
      .delete()
      .eq('category_id', id)

    // Delete main category record
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete category error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete category error:', error)
    return false
  }
}

// Carousel functions
export async function createCarousel(carousel: Omit<AdaptedCarousel, 'id' | 'created_at'>): Promise<AdaptedCarousel | null> {
  try {
    // Create the main carousel record
    const { data: carouselData, error: carouselError } = await supabase
      .from('carousel')
      .insert([{
        image_url: carousel.image_url,
        link_url: carousel.link_url,
        order_index: carousel.order_index,
        is_active: carousel.is_active
      }])
      .select()
      .single()

    if (carouselError) {
      console.error('Create carousel error:', carouselError)
      return null
    }

    // Create i18n records for each language
    const languages = ['en', 'es', 'de', 'fr']
    for (const lang of languages) {
      const locale = lang === 'en' ? 'en' : lang
      const title = lang === 'en' ? carousel.title : (carousel as any)[`title_${lang}`]
      const description = lang === 'en' ? carousel.description : (carousel as any)[`description_${lang}`]
      const alt_text = lang === 'en' ? carousel.alt_text : (carousel as any)[`alt_text_${lang}`]

      if (title || description || alt_text) {
        await supabase
          .from('carousel_i18n')
          .insert([{
            carousel_id: carouselData.id,
            locale,
            title: title || '',
            description: description || '',
            alt_text: alt_text || ''
          }])
      }
    }

    return { ...carouselData, ...carousel }
  } catch (error) {
    console.error('Create carousel error:', error)
    return null
  }
}

export async function getCarousels(): Promise<AdaptedCarousel[]> {
  try {
    const { data: carousels, error: carouselsError } = await supabase
      .from('carousel')
      .select('*')
      .order('order_index', { ascending: true })

    if (carouselsError) {
      console.error('Get carousels error:', carouselsError)
      return []
    }

    // Get i18n data for all carousels
    const carouselIds = carousels.map(c => c.id)
    if (carouselIds.length === 0) return []

    const { data: i18nData, error: i18nError } = await supabase
      .from('carousel_i18n')
      .select('*')
      .in('carousel_id', carouselIds)

    if (i18nError) {
      console.error('Get carousel i18n error:', i18nError)
      return carousels || []
    }

    // Merge i18n data with carousels
    const carouselsWithI18n = carousels.map(carousel => {
      const carouselI18n = i18nData.filter(i18n => i18n.carousel_id === carousel.id)
      const merged = { ...carousel }

      carouselI18n.forEach(i18n => {
        if (i18n.locale === 'en') {
          merged.title = i18n.title
          merged.description = i18n.description
          merged.alt_text = i18n.alt_text
        } else {
          merged[`title_${i18n.locale}`] = i18n.title
          merged[`description_${i18n.locale}`] = i18n.description
          merged[`alt_text_${i18n.locale}`] = i18n.alt_text
        }
      })

      return merged
    })

    return carouselsWithI18n || []
  } catch (error) {
    console.error('Get carousels error:', error)
    return []
  }
}

export async function updateCarousel(id: string, updates: Partial<AdaptedCarousel>): Promise<AdaptedCarousel | null> {
  try {
    // Update main carousel record
    const carouselUpdates: any = {}
    if (updates.image_url !== undefined) carouselUpdates.image_url = updates.image_url
    if (updates.link_url !== undefined) carouselUpdates.link_url = updates.link_url
    if (updates.order_index !== undefined) carouselUpdates.order_index = updates.order_index
    if (updates.is_active !== undefined) carouselUpdates.is_active = updates.is_active

    const { data: carouselData, error: carouselError } = await supabase
      .from('carousel')
      .update(carouselUpdates)
      .eq('id', id)
      .select()
      .single()

    if (carouselError) {
      console.error('Update carousel error:', carouselError)
      return null
    }

    // Update i18n records
    const languages = ['en', 'es', 'de', 'fr']
    for (const lang of languages) {
      const locale = lang === 'en' ? 'en' : lang
      const title = lang === 'en' ? updates.title : updates[`title_${lang}` as keyof AdaptedCarousel]
      const description = lang === 'en' ? updates.description : updates[`description_${lang}` as keyof AdaptedCarousel]
      const alt_text = lang === 'en' ? updates.alt_text : updates[`alt_text_${lang}` as keyof AdaptedCarousel]

      if (title !== undefined || description !== undefined || alt_text !== undefined) {
        const i18nUpdates: any = {}
        if (title !== undefined) i18nUpdates.title = title
        if (description !== undefined) i18nUpdates.description = description
        if (alt_text !== undefined) i18nUpdates.alt_text = alt_text

        // Try to update existing record, if not found, create new one
        const { error: updateError } = await supabase
          .from('carousel_i18n')
          .update(i18nUpdates)
          .eq('carousel_id', id)
          .eq('locale', locale)

        if (updateError) {
          // If update failed, try to insert
          await supabase
            .from('carousel_i18n')
            .insert([{
              carousel_id: id,
              locale,
              title: title || '',
              description: description || '',
              alt_text: alt_text || ''
            }])
        }
      }
    }

    return { ...carouselData, ...updates }
  } catch (error) {
    console.error('Update carousel error:', error)
    return null
  }
}

export async function deleteCarousel(id: string): Promise<boolean> {
  try {
    // Delete i18n records first
    await supabase
      .from('carousel_i18n')
      .delete()
      .eq('carousel_id', id)

    // Delete main carousel record
    const { error } = await supabase
      .from('carousel')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete carousel error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete carousel error:', error)
    return false
  }
}

// Legacy aliases for backward compatibility
export const createCarouselImage = createCarousel
export const getCarouselImages = getCarousels
export const updateCarouselImage = updateCarousel
export const deleteCarouselImage = deleteCarousel

export async function createProductSubcategory(): Promise<null> {
  console.warn('Product subcategories not supported in current database structure')
  return null
}

export async function getProductSubcategories(): Promise<any[]> {
  console.warn('Product subcategories not supported in current database structure')
  return []
}

export async function updateProductSubcategory(): Promise<null> {
  console.warn('Product subcategories not supported in current database structure')
  return null
}

export async function deleteProductSubcategory(): Promise<boolean> {
  console.warn('Product subcategories not supported in current database structure')
  return false
}

// Alias functions to match expected names
export const createNews = createPost
export const getNews = getPosts
export const updateNews = updatePost
export const deleteNews = deletePost

export const createProductCategory = createCategory
export const getProductCategories = getCategories
export const updateProductCategory = updateCategory
export const deleteProductCategory = deleteCategory

// Product Images functions
export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  image_type: 'main' | 'gallery' | 'detail'
  sort_order: number
  alt_text?: string
  created_at?: string
}

export async function createProductImage(image: Omit<ProductImage, 'id' | 'created_at'>): Promise<ProductImage | null> {
  try {
    const { data, error } = await supabase
      .from('product_images')
      .insert([image])
      .select()
      .single()

    if (error) {
      console.error('Create product image error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Create product image error:', error)
    return null
  }
}

export async function getProductImages(productId: string): Promise<ProductImage[]> {
  try {
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('image_type')
      .order('sort_order')

    if (error) {
      console.error('Get product images error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Get product images error:', error)
    return []
  }
}

export async function updateProductImage(id: string, updates: Partial<ProductImage>): Promise<ProductImage | null> {
  try {
    const { data, error } = await supabase
      .from('product_images')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Update product image error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Update product image error:', error)
    return null
  }
}

export async function deleteProductImage(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('product_images')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete product image error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete product image error:', error)
    return false
  }
}