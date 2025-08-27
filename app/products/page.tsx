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

    // Get product count for category by counting products in leaf categories only (to avoid double counting)
    const getProductCountForCategory = async (categoryId: string): Promise<number> => {
      // Use RPC function to get all descendant category IDs
      const { data: descendantIds, error } = await supabase
        .rpc('get_descendant_category_ids', { parent_category_id: categoryId })

      if (error) {
        console.error('Error getting descendant categories:', error)
        return 0
      }

      // If there are no descendants, this is a leaf category, count its products
      if (!descendantIds || descendantIds.length === 0) {
        const { count } = await supabase
          .from('products')
          .select('id', { count: 'exact', head: true })
          .eq('category_id', categoryId)
        
        return count || 0
      }

      // If there are descendants, find leaf categories (categories with no children)
      // and count products only in those leaf categories
      const allCategoryIds = [categoryId, ...descendantIds]
      
      // Get leaf categories (categories that don't have any children)
      const { data: leafCategories, error: leafError } = await supabase
        .from('categories')
        .select('id')
        .in('id', allCategoryIds)
        .not('id', 'in', `(SELECT DISTINCT parent_id FROM categories WHERE parent_id IS NOT NULL AND parent_id = ANY(ARRAY[${allCategoryIds.map(id => `'${id}'`).join(',')}]))`)

      if (leafError) {
        console.error('Error getting leaf categories:', leafError)
        return 0
      }

      const leafCategoryIds = leafCategories?.map(cat => cat.id) || []
      
      if (leafCategoryIds.length === 0) {
        return 0
      }

      const { count } = await supabase
        .from('products')
        .select('id', { count: 'exact', head: true })
        .in('category_id', leafCategoryIds)

      return count || 0
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
