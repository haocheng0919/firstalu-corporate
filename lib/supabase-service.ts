import { supabase, Product, NewsArticle, CarouselImage, ProductCategory, ProductSubcategory } from './supabase'

// Re-export types for easier importing
export type { Product, NewsArticle, CarouselImage, ProductCategory, ProductSubcategory }

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
      .getPublicUrl(data.path)

    return publicUrl
  } catch (error) {
    console.error('Upload error:', error)
    return null
  }
}

// Product functions
export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single()

    if (error) {
      console.error('Create product error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Create product error:', error)
    return null
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Get products error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Get products error:', error)
    return []
  }
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Update product error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Update product error:', error)
    return null
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
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

// News functions
export async function createNews(article: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>): Promise<NewsArticle | null> {
  try {
    const { data, error } = await supabase
      .from('news')
      .insert([article])
      .select()
      .single()

    if (error) {
      console.error('Create news error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Create news error:', error)
    return null
  }
}

export async function getNews(): Promise<NewsArticle[]> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Get news error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Get news error:', error)
    return []
  }
}

export async function updateNews(id: string, updates: Partial<NewsArticle>): Promise<NewsArticle | null> {
  try {
    const { data, error } = await supabase
      .from('news')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Update news error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Update news error:', error)
    return null
  }
}

export async function deleteNews(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete news error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete news error:', error)
    return false
  }
}

// Carousel functions
export async function createCarouselImage(carousel: Omit<CarouselImage, 'id' | 'created_at' | 'updated_at'>): Promise<CarouselImage | null> {
  try {
    const { data, error } = await supabase
      .from('carousel_images')
      .insert([carousel])
      .select()
      .single()

    if (error) {
      console.error('Create carousel error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Create carousel error:', error)
    return null
  }
}

export async function getCarouselImages(): Promise<CarouselImage[]> {
  try {
    const { data, error } = await supabase
      .from('carousel_images')
      .select('*')
      .order('order_position', { ascending: true })

    if (error) {
      console.error('Get carousel error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Get carousel error:', error)
    return []
  }
}

export async function updateCarouselImage(id: string, updates: Partial<CarouselImage>): Promise<CarouselImage | null> {
  try {
    const { data, error } = await supabase
      .from('carousel_images')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Update carousel error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Update carousel error:', error)
    return null
  }
}

export async function deleteCarouselImage(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('carousel_images')
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

// Product Category functions
export async function createProductCategory(category: Omit<ProductCategory, 'id' | 'created_at' | 'updated_at'>): Promise<ProductCategory | null> {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .insert([category])
      .select()
      .single()

    if (error) {
      console.error('Create category error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Create category error:', error)
    return null
  }
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .order('order_position', { ascending: true })

    if (error) {
      console.error('Get categories error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Get categories error:', error)
    return []
  }
}

export async function updateProductCategory(id: string, updates: Partial<ProductCategory>): Promise<ProductCategory | null> {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Update category error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Update category error:', error)
    return null
  }
}

export async function deleteProductCategory(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('product_categories')
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

// Product Subcategory functions
export async function createProductSubcategory(subcategory: Omit<ProductSubcategory, 'id' | 'created_at' | 'updated_at'>): Promise<ProductSubcategory | null> {
  try {
    const { data, error } = await supabase
      .from('product_subcategories')
      .insert([subcategory])
      .select()
      .single()

    if (error) {
      console.error('Create subcategory error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Create subcategory error:', error)
    return null
  }
}

export async function getProductSubcategories(categoryId?: string): Promise<ProductSubcategory[]> {
  try {
    let query = supabase
      .from('product_subcategories')
      .select('*')
      .order('order_position', { ascending: true })

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Get subcategories error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Get subcategories error:', error)
    return []
  }
}

export async function updateProductSubcategory(id: string, updates: Partial<ProductSubcategory>): Promise<ProductSubcategory | null> {
  try {
    const { data, error } = await supabase
      .from('product_subcategories')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Update subcategory error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Update subcategory error:', error)
    return null
  }
}

export async function deleteProductSubcategory(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('product_subcategories')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete subcategory error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete subcategory error:', error)
    return false
  }
}