import { supabase } from '@/lib/supabase'
import ProductsClient from './products-client'

interface Category {
  id: string
  slug: string
  name_i18n?: { [key: string]: string }
  thumbnail_url?: string
}

export default async function ProductsPage() {
  try {
    // Get main categories (parent_id is null)
    const { data: categories, error } = await supabase
      .from('categories')
      .select('id, slug, name_i18n, thumbnail_url')
      .is('parent_id', null)
      .order('slug')

    if (error) {
      console.error('Error fetching categories:', error)
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Products</h1>
            <p className="text-gray-600">Unable to load product categories at the moment.</p>
          </div>
        </div>
      )
    }

    // Get product count for category including all subcategories
    const getProductCountForCategory = async (categoryId: string): Promise<number> => {
      try {
        // Use recursive CTE to get all descendant category IDs
        const { data: categoryIds, error: categoryError } = await supabase
          .rpc('get_category_descendants', { parent_category_id: categoryId })

        if (categoryError) {
          console.error('Error getting category descendants for', categoryId, ':', categoryError)
          // Fallback to direct count if RPC fails
          const { count, error } = await supabase
            .from('products')
            .select('id', { count: 'exact', head: true })
            .eq('category_id', categoryId)
            .eq('status', 'active')

          if (error) {
            console.error('Error counting products for', categoryId, ':', error)
            return 0
          }
          return count || 0
        }

        // Include the parent category itself
        const allCategoryIds = [categoryId, ...(categoryIds || [])]

        // Count products in all categories
        const { count, error } = await supabase
          .from('products')
          .select('id', { count: 'exact', head: true })
          .in('category_id', allCategoryIds)
          .eq('status', 'active')

        if (error) {
          console.error('Error counting products for categories', allCategoryIds, ':', error)
          return 0
        }

        return count || 0
      } catch (err) {
        console.error('Exception in getProductCountForCategory for', categoryId, ':', err)
        return 0
      }
    }

    // Get product counts for each category including all subcategories
    const categoriesWithCount = await Promise.all(
      (categories || []).map(async (category) => {
        const productCount = await getProductCountForCategory(category.id)

        return {
          ...category,
          productCount
        }
      })
    )

    return <ProductsClient categories={categoriesWithCount} />
  } catch (error) {
    console.error('Error in ProductsPage:', error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Products</h1>
          <p className="text-gray-600">Something went wrong. Please try again later.</p>
        </div>
      </div>
    )
  }
}
