import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create the client if we have valid environment variables
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Product {
  id: string
  name: string
  name_es?: string
  name_de?: string
  name_fr?: string
  category: string
  sizes: string[]
  description: string
  description_es?: string
  description_de?: string
  description_fr?: string
  features: string[]
  features_es?: string[]
  features_de?: string[]
  features_fr?: string[]
  image_url?: string
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface NewsArticle {
  id: string
  title: string
  title_es?: string
  title_de?: string
  title_fr?: string
  excerpt: string
  excerpt_es?: string
  excerpt_de?: string
  excerpt_fr?: string
  content: string
  content_es?: string
  content_de?: string
  content_fr?: string
  date: string
  category: string
  read_time: string
  image_url?: string
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface CarouselImage {
  id: string
  title: string
  subtitle?: string
  image_url: string
  order_position: number
  created_at: string
  updated_at: string
}

export interface ProductCategory {
  id: string
  name: string
  name_es?: string
  name_de?: string
  name_fr?: string
  slug: string
  description?: string
  description_es?: string
  description_de?: string
  description_fr?: string
  image_url?: string
  image_alt?: string
  image_alt_es?: string
  image_alt_de?: string
  image_alt_fr?: string
  order_position: number
  created_at: string
  updated_at: string
}

export interface ProductSubcategory {
  id: string
  category_id: string
  name: string
  name_es?: string
  name_de?: string
  name_fr?: string
  slug: string
  description?: string
  description_es?: string
  description_de?: string
  description_fr?: string
  image_url?: string
  image_alt?: string
  image_alt_es?: string
  image_alt_de?: string
  image_alt_fr?: string
  order_position: number
  created_at: string
  updated_at: string
}