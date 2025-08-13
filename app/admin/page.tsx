'use client'

import React, { useState, useEffect } from 'react'

// Force dynamic rendering to prevent static generation issues with Supabase
export const dynamic = 'force-dynamic'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MultiLangRichText } from '@/components/ui/multi-lang-rich-text'
import { Trash2, Edit, Plus, Upload, X } from 'lucide-react'
import { generateSlug } from '@/lib/utils'
import { 
  type AdaptedProduct, 
  type AdaptedPost, 
  type AdaptedCategory,
  type AdaptedCarousel,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  createPost,
  getPosts,
  updatePost,
  deletePost,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createCarousel,
  getCarousels,
  updateCarousel,
  deleteCarousel,
  uploadImage
} from '@/lib/supabase-service-adapted'

// Language configuration
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'fr', name: 'French', flag: '🇫🇷' }
] as const

// Multi-language Input Component
interface MultiLangInputProps {
  label: string
  value: Record<string, string>
  onChange: (value: Record<string, string>) => void
  type?: 'input' | 'textarea'
  placeholder?: string
  required?: boolean
}

function MultiLangInput({ label, value, onChange, type = 'input', placeholder, required }: MultiLangInputProps) {
  const [activeTab, setActiveTab] = useState('en')

  const handleChange = (lang: string, newValue: string) => {
    onChange({ ...value, [lang]: newValue })
  }

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label} {required && <span className="text-red-500">*</span>}</Label>
      <div className="border rounded-lg">
        <div className="flex border-b">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setActiveTab(lang.code)}
              className={`px-3 py-2 text-sm flex items-center gap-2 border-r last:border-r-0 ${
                activeTab === lang.code 
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
        <div className="p-3">
          {type === 'textarea' ? (
            <Textarea
              value={value[activeTab] || ''}
              onChange={(e) => handleChange(activeTab, e.target.value)}
              placeholder={placeholder ? `${placeholder} (${LANGUAGES.find(l => l.code === activeTab)?.name})` : ''}
              rows={4}
            />
          ) : (
            <Input
              value={value[activeTab] || ''}
              onChange={(e) => handleChange(activeTab, e.target.value)}
              placeholder={placeholder ? `${placeholder} (${LANGUAGES.find(l => l.code === activeTab)?.name})` : ''}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Enhanced form interfaces
interface ProductForm {
  status: string
  category_id: string
  name: Record<string, string>
  intro: Record<string, string>
  description: Record<string, string>
  technical_specs: Record<string, any>
  alt_text: Record<string, string>
  thumbnail?: File | null
  images?: File[] | null
}

interface PostForm {
  date: string
  tags: string[]
  cover_url: string
  status: string
  title: Record<string, string>
  excerpt: Record<string, string>
  body_md: Record<string, string>
  alt_text: Record<string, string>
  image?: File | null
}

interface CategoryForm {
  name: Record<string, string>
  description: Record<string, string>
  thumbnail?: File | null
}

interface CarouselForm {
  title: Record<string, string>
  description: Record<string, string>
  alt_text: Record<string, string>
  link_url: string
  order_index: number
  is_active: boolean
  image?: File | null
}

export default function EnhancedAdminPanel() {
  // State for data
  const [products, setProducts] = useState<AdaptedProduct[]>([])
  const [posts, setPosts] = useState<AdaptedPost[]>([])
  const [categories, setCategories] = useState<AdaptedCategory[]>([])
  const [carouselItems, setCarouselItems] = useState<AdaptedCarousel[]>([])
  
  // State for forms
  const [productForm, setProductForm] = useState<ProductForm>({
    status: 'active',
    category_id: '',
    name: { en: '', es: '', de: '', fr: '' },
    intro: { en: '', es: '', de: '', fr: '' },
    description: { en: '', es: '', de: '', fr: '' },
    technical_specs: {},
    alt_text: { en: '', es: '', de: '', fr: '' },
    thumbnail: null,
    images: null
  })
  
  const [postForm, setPostForm] = useState<PostForm>({
    date: new Date().toISOString().split('T')[0],
    tags: [],
    cover_url: '',
    status: 'published',
    title: { en: '', es: '', de: '', fr: '' },
    excerpt: { en: '', es: '', de: '', fr: '' },
    body_md: { en: '', es: '', de: '', fr: '' },
    alt_text: { en: '', es: '', de: '', fr: '' },
    image: null
  })
  
  const [categoryForm, setCategoryForm] = useState<CategoryForm>({
    name: { en: '', es: '', de: '', fr: '' },
    description: { en: '', es: '', de: '', fr: '' },
    thumbnail: null
  })

  const [carouselForm, setCarouselForm] = useState<CarouselForm>({
    title: { en: '', es: '', de: '', fr: '' },
    description: { en: '', es: '', de: '', fr: '' },
    alt_text: { en: '', es: '', de: '', fr: '' },
    link_url: '',
    order_index: 0,
    is_active: true,
    image: null
  })

  // State for editing
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [editingPost, setEditingPost] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editingCarousel, setEditingCarousel] = useState<string | null>(null)
  
  // State for loading
  const [loading, setLoading] = useState(false)

  // Load all data on component mount
  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [productsData, postsData, categoriesData, carouselData] = await Promise.all([
        getProducts(),
        getPosts(),
        getCategories(),
        getCarousels()
      ])
      setProducts(productsData)
      setPosts(postsData)
      setCategories(categoriesData)
      setCarouselItems(carouselData)
      console.log('Loaded data:', { 
        products: productsData.length, 
        posts: postsData.length, 
        categories: categoriesData.length,
        carousel: carouselData.length
      })
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Helper function to reset product form
  const resetProductForm = () => {
    setProductForm({
      status: 'active',
      category_id: '',
      name: { en: '', es: '', de: '', fr: '' },
      intro: { en: '', es: '', de: '', fr: '' },
      description: { en: '', es: '', de: '', fr: '' },
      technical_specs: {},
      alt_text: { en: '', es: '', de: '', fr: '' },
      thumbnail: null,
      images: null
    })
  }

  const resetCategoryForm = () => {
    setCategoryForm({
      name: { en: '', es: '', de: '', fr: '' },
      description: { en: '', es: '', de: '', fr: '' },
      thumbnail: null
    })
  }

  const resetCarouselForm = () => {
    setCarouselForm({
      title: { en: '', es: '', de: '', fr: '' },
      description: { en: '', es: '', de: '', fr: '' },
      alt_text: { en: '', es: '', de: '', fr: '' },
      link_url: '',
      order_index: 0,
      is_active: true,
      image: null
    })
  }

  // Product functions
  const handleAddProduct = async () => {
    if (!productForm.name.en) {
      alert('请填写必填字段（英文名称）')
      return
    }

    setLoading(true)
    try {
      let thumbnailUrl = ''
      let additionalImageUrls: string[] = []
      
      // Upload thumbnail
      if (productForm.thumbnail) {
        const uploadedUrl = await uploadImage(productForm.thumbnail, 'products', `${Date.now()}-thumbnail-${productForm.thumbnail.name}`)
        if (uploadedUrl) {
          thumbnailUrl = uploadedUrl
        }
      }
      
      // Upload additional images
      if (productForm.images && productForm.images.length > 0) {
        for (let i = 0; i < productForm.images.length; i++) {
          const file = productForm.images[i]
          const uploadedUrl = await uploadImage(file, 'products', `${Date.now()}-${i}-${file.name}`)
          if (uploadedUrl) {
            additionalImageUrls.push(uploadedUrl)
          }
        }
      }

      // 自动生成slug
      const slug = generateSlug(productForm.name.en)

      const productData = {
        slug: slug,
        sku: `SKU-${Date.now()}`, // 自动生成SKU
        status: productForm.status,
        category_id: productForm.category_id || undefined,
        images: thumbnailUrl ? { 
          main: thumbnailUrl, 
          additional: additionalImageUrls,
          alt: productForm.alt_text 
        } : undefined,
        // Map multi-language fields
        name: productForm.name.en,
        name_es: productForm.name.es,
        name_de: productForm.name.de,
        name_fr: productForm.name.fr,
        intro: productForm.intro.en,
        intro_es: productForm.intro.es,
        intro_de: productForm.intro.de,
        intro_fr: productForm.intro.fr,
        description: productForm.description.en,
        description_es: productForm.description.es,
        description_de: productForm.description.de,
        description_fr: productForm.description.fr
      }

      console.log('Creating product with data:', productData)
      
      const newProduct = await createProduct(productData)
      if (newProduct) {
        setProducts([newProduct, ...products])
        resetProductForm()
        alert('产品创建成功！')
      } else {
        alert('产品创建失败，请检查控制台错误')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      alert('产品创建失败')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`确定要删除产品 "${name}" 吗？此操作不可撤销。`)) {
      return
    }

    setLoading(true)
    try {
      const success = await deleteProduct(id)
      if (success) {
        setProducts(products.filter(p => p.id !== id))
        alert('产品删除成功！')
      } else {
        alert('产品删除失败，请检查控制台错误')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('产品删除失败')
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = (product: AdaptedProduct) => {
    setProductForm({
      status: product.status || 'active',
      category_id: product.category_id || '',
      name: {
        en: product.name || '',
        es: product.name_es || '',
        de: product.name_de || '',
        fr: product.name_fr || ''
      },
      intro: {
        en: product.intro || '',
        es: product.intro_es || '',
        de: product.intro_de || '',
        fr: product.intro_fr || ''
      },
      description: {
        en: product.description || '',
        es: product.description_es || '',
        de: product.description_de || '',
        fr: product.description_fr || ''
      },
      technical_specs: product.technical_specs || {},
      alt_text: {
        en: '',
        es: '',
        de: '',
        fr: ''
      },
      thumbnail: null,
      images: null
    })
    setEditingProduct(product.id)
  }

  const handleUpdateProduct = async () => {
    if (!editingProduct || !productForm.name.en) {
      alert('请填写必填字段（英文名称）')
      return
    }

    setLoading(true)
    try {
      let thumbnailUrl = undefined
      let additionalImageUrls: string[] = []
      
      // Upload new thumbnail if provided
      if (productForm.thumbnail) {
        const uploadedUrl = await uploadImage(productForm.thumbnail, 'products', `${Date.now()}-thumbnail-${productForm.thumbnail.name}`)
        if (uploadedUrl) {
          thumbnailUrl = uploadedUrl
        }
      }
      
      // Upload new additional images if provided
      if (productForm.images && productForm.images.length > 0) {
        for (let i = 0; i < productForm.images.length; i++) {
          const file = productForm.images[i]
          const uploadedUrl = await uploadImage(file, 'products', `${Date.now()}-${i}-${file.name}`)
          if (uploadedUrl) {
            additionalImageUrls.push(uploadedUrl)
          }
        }
      }

      const productData: any = {
        status: productForm.status,
        category_id: productForm.category_id || undefined,
        name: productForm.name.en,
        name_es: productForm.name.es,
        name_de: productForm.name.de,
        name_fr: productForm.name.fr,
        intro: productForm.intro.en,
        intro_es: productForm.intro.es,
        intro_de: productForm.intro.de,
        intro_fr: productForm.intro.fr,
        description: productForm.description.en,
        description_es: productForm.description.es,
        description_de: productForm.description.de,
        description_fr: productForm.description.fr
      }

      // Only include images if new ones were uploaded
      if (thumbnailUrl || additionalImageUrls.length > 0) {
        productData.images = {
          main: thumbnailUrl,
          additional: additionalImageUrls,
          alt: productForm.alt_text
        }
      }

      console.log('Updating product with data:', productData)
      
      const updatedProduct = await updateProduct(editingProduct, productData)
      if (updatedProduct) {
        setProducts(products.map(p => p.id === editingProduct ? updatedProduct : p))
        resetProductForm()
        setEditingProduct(null)
        alert('产品更新成功！')
      } else {
        alert('产品更新失败，请检查控制台错误')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      alert('产品更新失败')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEditProduct = () => {
    setEditingProduct(null)
    resetProductForm()
  }

  // Category functions
  const handleAddCategory = async () => {
    if (!categoryForm.name.en) {
      alert('请填写必填字段（英文名称）')
      return
    }

    setLoading(true)
    try {
      let thumbnailUrl = ''
      
      // Upload thumbnail if provided
      if (categoryForm.thumbnail) {
        const uploadedUrl = await uploadImage(categoryForm.thumbnail, 'categories', `${Date.now()}-thumbnail-${categoryForm.thumbnail.name}`)
        if (uploadedUrl) {
          thumbnailUrl = uploadedUrl
        }
      }

      // 自动生成slug
      const slug = generateSlug(categoryForm.name.en)

      const categoryData = {
        slug: slug,
        thumbnail_url: thumbnailUrl,
        name: categoryForm.name.en,
        name_es: categoryForm.name.es,
        name_de: categoryForm.name.de,
        name_fr: categoryForm.name.fr,
        description: categoryForm.description.en,
        description_es: categoryForm.description.es,
        description_de: categoryForm.description.de,
        description_fr: categoryForm.description.fr
      }

      console.log('Creating category with data:', categoryData)
      
      const newCategory = await createCategory(categoryData)
      if (newCategory) {
        setCategories([newCategory, ...categories])
        resetCategoryForm()
        alert('分类创建成功！')
      } else {
        alert('分类创建失败，请检查控制台错误')
      }
    } catch (error) {
      console.error('Error creating category:', error)
      alert('分类创建失败')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`确定要删除分类 "${name}" 吗？此操作不可撤销。`)) {
      return
    }

    setLoading(true)
    try {
      const success = await deleteCategory(id)
      if (success) {
        setCategories(categories.filter(c => c.id !== id))
        alert('分类删除成功！')
      } else {
        alert('分类删除失败，请检查控制台错误')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('分类删除失败')
    } finally {
      setLoading(false)
    }
  }

  const handleEditCategory = (category: AdaptedCategory) => {
    setCategoryForm({
      name: {
        en: category.name || '',
        es: category.name_es || '',
        de: category.name_de || '',
        fr: category.name_fr || ''
      },
      description: {
        en: category.description || '',
        es: category.description_es || '',
        de: category.description_de || '',
        fr: category.description_fr || ''
      },
      thumbnail: null
    })
    setEditingCategory(category.id)
  }

  const handleUpdateCategory = async () => {
    if (!editingCategory || !categoryForm.name.en) {
      alert('请填写必填字段（英文名称）')
      return
    }

    setLoading(true)
    try {
      let thumbnailUrl = undefined
      
      // Upload new thumbnail if provided
      if (categoryForm.thumbnail) {
        const uploadedUrl = await uploadImage(categoryForm.thumbnail, 'categories', `${Date.now()}-thumbnail-${categoryForm.thumbnail.name}`)
        if (uploadedUrl) {
          thumbnailUrl = uploadedUrl
        }
      }

      const categoryData: any = {
        name: categoryForm.name.en,
        name_es: categoryForm.name.es,
        name_de: categoryForm.name.de,
        name_fr: categoryForm.name.fr,
        description: categoryForm.description.en,
        description_es: categoryForm.description.es,
        description_de: categoryForm.description.de,
        description_fr: categoryForm.description.fr
      }

      // Only include thumbnail_url if a new one was uploaded
      if (thumbnailUrl) {
        categoryData.thumbnail_url = thumbnailUrl
      }

      console.log('Updating category with data:', categoryData)
      
      const updatedCategory = await updateCategory(editingCategory, categoryData)
      if (updatedCategory) {
        setCategories(categories.map(c => c.id === editingCategory ? updatedCategory : c))
        resetCategoryForm()
        setEditingCategory(null)
        alert('分类更新成功！')
      } else {
        alert('分类更新失败，请检查控制台错误')
      }
    } catch (error) {
      console.error('Error updating category:', error)
      alert('分类更新失败')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEditCategory = () => {
    setEditingCategory(null)
    resetCategoryForm()
  }

  // Carousel functions
  const handleAddCarousel = async () => {
    if (!carouselForm.title.en) {
      alert('请填写必填字段（英文标题）')
      return
    }

    setLoading(true)
    try {
      let imageUrl = ''
      if (carouselForm.image) {
        const uploadedUrl = await uploadImage(carouselForm.image, 'carousel', `${Date.now()}-${carouselForm.image.name}`)
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        }
      }

      const carouselData = {
        image_url: imageUrl,
        link_url: carouselForm.link_url,
        order_index: carouselForm.order_index,
        is_active: carouselForm.is_active,
        title: carouselForm.title.en,
        title_es: carouselForm.title.es,
        title_de: carouselForm.title.de,
        title_fr: carouselForm.title.fr,
        description: carouselForm.description.en,
        description_es: carouselForm.description.es,
        description_de: carouselForm.description.de,
        description_fr: carouselForm.description.fr,
        alt_text: carouselForm.alt_text.en,
        alt_text_es: carouselForm.alt_text.es,
        alt_text_de: carouselForm.alt_text.de,
        alt_text_fr: carouselForm.alt_text.fr
      }

      console.log('Creating carousel with data:', carouselData)
      
      const newCarousel = await createCarousel(carouselData)
      if (newCarousel) {
        setCarouselItems([...carouselItems, newCarousel])
        resetCarouselForm()
        alert('轮播图创建成功！')
      } else {
        alert('轮播图创建失败，请检查控制台错误')
      }
    } catch (error) {
      console.error('Error creating carousel:', error)
      alert('轮播图创建失败')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCarousel = async (id: string, title: string) => {
    if (!confirm(`确定要删除轮播图 "${title}" 吗？此操作不可撤销。`)) {
      return
    }

    setLoading(true)
    try {
      const success = await deleteCarousel(id)
      if (success) {
        setCarouselItems(carouselItems.filter(c => c.id !== id))
        alert('轮播图删除成功！')
      } else {
        alert('轮播图删除失败，请检查控制台错误')
      }
    } catch (error) {
      console.error('Error deleting carousel:', error)
      alert('轮播图删除失败')
    } finally {
      setLoading(false)
    }
  }

  const handleEditCarousel = (carousel: AdaptedCarousel) => {
    setEditingCarousel(carousel.id)
    setCarouselForm({
      title: {
        en: carousel.title || '',
        es: carousel.title_es || '',
        de: carousel.title_de || '',
        fr: carousel.title_fr || ''
      },
      description: {
        en: carousel.description || '',
        es: carousel.description_es || '',
        de: carousel.description_de || '',
        fr: carousel.description_fr || ''
      },
      alt_text: {
        en: carousel.alt_text || '',
        es: carousel.alt_text_es || '',
        de: carousel.alt_text_de || '',
        fr: carousel.alt_text_fr || ''
      },
      link_url: carousel.link_url || '',
      order_index: carousel.order_index,
      is_active: carousel.is_active,
      image: null
    })
  }

  const handleUpdateCarousel = async () => {
    if (!editingCarousel) return

    const currentCarousel = carouselItems.find(c => c.id === editingCarousel)
    if (!currentCarousel) return

    if (!carouselForm.title.en) {
      alert('请填写必填字段（英文标题）')
      return
    }

    setLoading(true)
    try {
      let imageUrl = currentCarousel.image_url
      if (carouselForm.image) {
        const uploadedUrl = await uploadImage(carouselForm.image, 'carousel', `${Date.now()}-${carouselForm.image.name}`)
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        }
      }

      const carouselData = {
        image_url: imageUrl,
        link_url: carouselForm.link_url,
        order_index: carouselForm.order_index,
        is_active: carouselForm.is_active,
        title: carouselForm.title.en,
        title_es: carouselForm.title.es,
        title_de: carouselForm.title.de,
        title_fr: carouselForm.title.fr,
        description: carouselForm.description.en,
        description_es: carouselForm.description.es,
        description_de: carouselForm.description.de,
        description_fr: carouselForm.description.fr,
        alt_text: carouselForm.alt_text.en,
        alt_text_es: carouselForm.alt_text.es,
        alt_text_de: carouselForm.alt_text.de,
        alt_text_fr: carouselForm.alt_text.fr
      }

      console.log('Updating carousel with data:', carouselData)
      
      const updatedCarousel = await updateCarousel(editingCarousel, carouselData)
      if (updatedCarousel) {
        setCarouselItems(carouselItems.map(c => c.id === editingCarousel ? updatedCarousel : c))
        setEditingCarousel(null)
        resetCarouselForm()
        loadAllData()
        alert('轮播图更新成功！')
      } else {
        alert('轮播图更新失败，请检查控制台错误')
      }
    } catch (error) {
      console.error('Error updating carousel:', error)
      alert('轮播图更新失败')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEditCarousel = () => {
    setEditingCarousel(null)
    resetCarouselForm()
  }

  // Post functions
  const handleAddPost = async () => {
    if (!postForm.title.en) {
      alert('请填写必填字段（英文标题）')
      return
    }

    setLoading(true)
    try {
      let imageUrl = ''
      if (postForm.image) {
        const uploadedUrl = await uploadImage(postForm.image, 'posts', `${Date.now()}-${postForm.image.name}`)
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        }
      }

      // 自动生成slug
      const slug = generateSlug(postForm.title.en)

      const postData = {
        slug: slug,
        date: postForm.date,
        tags: postForm.tags,
        cover_url: imageUrl || postForm.cover_url,
        status: postForm.status,
        title: postForm.title.en,
        title_es: postForm.title.es,
        title_de: postForm.title.de,
        title_fr: postForm.title.fr,
        excerpt: postForm.excerpt.en,
        excerpt_es: postForm.excerpt.es,
        excerpt_de: postForm.excerpt.de,
        excerpt_fr: postForm.excerpt.fr,
        body_md: postForm.body_md.en,
        body_md_es: postForm.body_md.es,
        body_md_de: postForm.body_md.de,
        body_md_fr: postForm.body_md.fr
      }

      console.log('Creating post with data:', postData)
      
      const newPost = await createPost(postData)
      if (newPost) {
        setPosts([newPost, ...posts])
        setPostForm({
          date: new Date().toISOString().split('T')[0],
          tags: [],
          cover_url: '',
          status: 'published',
          title: { en: '', es: '', de: '', fr: '' },
          excerpt: { en: '', es: '', de: '', fr: '' },
          body_md: { en: '', es: '', de: '', fr: '' },
          alt_text: { en: '', es: '', de: '', fr: '' },
          image: null
        })
        alert('新闻创建成功！')
      } else {
        alert('新闻创建失败，请检查控制台错误')
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert('新闻创建失败')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`确定要删除新闻 "${title}" 吗？此操作不可撤销。`)) {
      return
    }

    setLoading(true)
    try {
      const success = await deletePost(id)
      if (success) {
        setPosts(posts.filter(p => p.id !== id))
        alert('新闻删除成功！')
      } else {
        alert('新闻删除失败，请检查控制台错误')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('新闻删除失败')
    } finally {
      setLoading(false)
    }
  }

  const handleEditPost = (post: AdaptedPost) => {
    setEditingPost(post.id)
    setPostForm({
      date: post.date || new Date().toISOString().split('T')[0],
      tags: post.tags || [],
      cover_url: post.cover_url || '',
      status: post.status || 'published',
      title: {
        en: post.title || '',
        es: post.title_es || '',
        de: post.title_de || '',
        fr: post.title_fr || ''
      },
      excerpt: {
        en: post.excerpt || '',
        es: post.excerpt_es || '',
        de: post.excerpt_de || '',
        fr: post.excerpt_fr || ''
      },
      body_md: {
        en: post.body_md || '',
        es: post.body_md_es || '',
        de: post.body_md_de || '',
        fr: post.body_md_fr || ''
      },
      alt_text: { en: '', es: '', de: '', fr: '' },
      image: null
    })
  }

  const handleUpdatePost = async () => {
    if (!editingPost) return;

    const currentPost = posts.find(p => p.id === editingPost);
    if (!currentPost) return;

    try {
      let coverUrl = currentPost.cover_url;

      // Upload new image if provided
      if (postForm.image) {
        const uploadedUrl = await uploadImage(postForm.image, 'posts', `${Date.now()}-${postForm.image.name}`)
        if (uploadedUrl) {
          coverUrl = uploadedUrl;
        }
      }

      await updatePost(editingPost, {
        date: postForm.date,
        tags: postForm.tags,
        cover_url: coverUrl,
        status: postForm.status,
        title: postForm.title.en,
        title_es: postForm.title.es,
        title_de: postForm.title.de,
        title_fr: postForm.title.fr,
        excerpt: postForm.excerpt.en,
        excerpt_es: postForm.excerpt.es,
        excerpt_de: postForm.excerpt.de,
        excerpt_fr: postForm.excerpt.fr,
        body_md: postForm.body_md.en,
        body_md_es: postForm.body_md.es,
        body_md_de: postForm.body_md.de,
        body_md_fr: postForm.body_md.fr
      });

      await loadAllData();
      resetPostForm();
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Helper function to reset post form
  const resetPostForm = () => {
    setPostForm({
      date: new Date().toISOString().split('T')[0],
      tags: [],
      cover_url: '',
      status: 'published',
      title: { en: '', es: '', de: '', fr: '' },
      excerpt: { en: '', es: '', de: '', fr: '' },
      body_md: { en: '', es: '', de: '', fr: '' },
      alt_text: { en: '', es: '', de: '', fr: '' },
      image: null
    })
  }

  const handleCancelEditPost = () => {
    setEditingPost(null)
    resetPostForm()
  }

  if (loading && products.length === 0 && posts.length === 0 && categories.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">加载中...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Enhanced Admin Panel</h1>
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
          <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
          <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
          <TabsTrigger value="carousel">Carousel ({carouselItems.length})</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-status">Status</Label>
                  <select
                    id="product-status"
                    value={productForm.status}
                    onChange={(e) => setProductForm({...productForm, status: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="product-category">Category</Label>
                  <select
                    id="product-category"
                    value={productForm.category_id}
                    onChange={(e) => setProductForm({...productForm, category_id: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <MultiLangInput
                label="Product Name"
                value={productForm.name}
                onChange={(value) => setProductForm({...productForm, name: value})}
                placeholder="Product Name"
                required
              />

              <MultiLangInput
                label="Product Intro"
                value={productForm.intro}
                onChange={(value) => setProductForm({...productForm, intro: value})}
                type="textarea"
                placeholder="Product Intro"
              />

              <MultiLangInput
                label="Product Description"
                value={productForm.description}
                onChange={(value) => setProductForm({...productForm, description: value})}
                type="textarea"
                placeholder="Product Description"
              />

              <MultiLangInput
                label="Technical Specifications"
                value={productForm.technical_specs}
                onChange={(value) => setProductForm({...productForm, technical_specs: value})}
                type="textarea"
                placeholder="Technical Specifications"
              />

              <MultiLangInput
                label="Alt Text"
                value={productForm.alt_text}
                onChange={(value) => setProductForm({...productForm, alt_text: value})}
                placeholder="Alt Text for Images"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-thumbnail">Thumbnail Image</Label>
                  <Input
                    id="product-thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProductForm({...productForm, thumbnail: e.target.files?.[0] || null})}
                  />
                </div>
                <div>
                  <Label htmlFor="product-images">Additional Images</Label>
                  <Input
                    id="product-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setProductForm({...productForm, images: e.target.files ? Array.from(e.target.files) : null})}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                {editingProduct ? (
                  <>
                    <Button onClick={handleUpdateProduct} disabled={loading}>
                      {loading ? 'Updating...' : 'Update Product'}
                    </Button>
                    <Button variant="outline" onClick={handleCancelEditProduct}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleAddProduct} disabled={loading}>
                    {loading ? 'Creating...' : 'Add Product'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Products List */}
          <Card>
            <CardHeader>
              <CardTitle>Products List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {products.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                      <p className="text-sm text-gray-600">Status: <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>{product.status}</Badge></p>
                      {product.intro && (
                        <p className="text-sm text-gray-700 mt-2 line-clamp-2">{product.intro}</p>
                      )}
                      {product.category_id && (
                        <p className="text-sm text-gray-600 mt-1">
                          Category: {categories.find(c => c.id === product.category_id)?.name || 'Unknown'}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id, product.name || 'Unnamed Product')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MultiLangInput
                label="Category Name"
                value={categoryForm.name}
                onChange={(value) => setCategoryForm({...categoryForm, name: value})}
                placeholder="Category Name"
                required
              />

              <div>
                <Label htmlFor="category-thumbnail">Thumbnail Image</Label>
                <Input
                  id="category-thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCategoryForm({...categoryForm, thumbnail: e.target.files?.[0] || null})}
                />
              </div>

              <div className="flex gap-2">
                {editingCategory ? (
                  <>
                    <Button onClick={handleUpdateCategory} disabled={loading}>
                      {loading ? 'Updating...' : 'Update Category'}
                    </Button>
                    <Button variant="outline" onClick={handleCancelEditCategory}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleAddCategory} disabled={loading}>
                    {loading ? 'Creating...' : 'Add Category'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Categories List */}
          <Card>
            <CardHeader>
              <CardTitle>Categories List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="border rounded-lg p-4 flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-gray-600">Slug: {category.slug}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id, category.name || 'Unnamed Category')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Carousel Tab */}
        <TabsContent value="carousel" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {editingCarousel ? 'Edit Carousel Item' : 'Add New Carousel Item'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MultiLangInput
                label="Carousel Title"
                value={carouselForm.title}
                onChange={(value) => setCarouselForm({...carouselForm, title: value})}
                placeholder="Carousel Title"
                required
              />

              <MultiLangInput
                label="Description"
                value={carouselForm.description}
                onChange={(value) => setCarouselForm({...carouselForm, description: value})}
                placeholder="Carousel Description"
              />

              <MultiLangInput
                label="Alt Text"
                value={carouselForm.alt_text}
                onChange={(value) => setCarouselForm({...carouselForm, alt_text: value})}
                placeholder="Alt Text for Image"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="carousel-link">Link URL</Label>
                  <Input
                    id="carousel-link"
                    type="url"
                    value={carouselForm.link_url}
                    onChange={(e) => setCarouselForm({...carouselForm, link_url: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="carousel-order">Order Index</Label>
                  <Input
                    id="carousel-order"
                    type="number"
                    value={carouselForm.order_index}
                    onChange={(e) => setCarouselForm({...carouselForm, order_index: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="carousel-active"
                    checked={carouselForm.is_active}
                    onChange={(e) => setCarouselForm({...carouselForm, is_active: e.target.checked})}
                  />
                  <Label htmlFor="carousel-active">Active</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="carousel-image">Carousel Image</Label>
                <Input
                  id="carousel-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCarouselForm({...carouselForm, image: e.target.files?.[0] || null})}
                />
              </div>

              <div className="flex gap-2">
                {editingCarousel ? (
                  <>
                    <Button onClick={handleUpdateCarousel} disabled={loading}>
                      {loading ? 'Updating...' : 'Update Carousel'}
                    </Button>
                    <Button variant="outline" onClick={handleCancelEditCarousel}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleAddCarousel} disabled={loading}>
                    {loading ? 'Creating...' : 'Add Carousel'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Carousel List */}
          <Card>
            <CardHeader>
              <CardTitle>Carousel Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {carouselItems.map((carousel) => (
                  <div key={carousel.id} className="border rounded-lg p-4 flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{carousel.title}</h3>
                      <p className="text-sm text-gray-600">Order: {carousel.order_index}</p>
                      <p className="text-sm text-gray-600">
                        Status: <Badge variant={carousel.is_active ? 'default' : 'secondary'}>
                          {carousel.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </p>
                      {carousel.link_url && (
                        <p className="text-sm text-gray-600 mt-1">Link: {carousel.link_url}</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCarousel(carousel)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCarousel(carousel.id, carousel.title || 'Unnamed Carousel')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Posts Tab */}
        <TabsContent value="posts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {editingPost ? 'Edit Post' : 'Add New Post'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="post-date">Date</Label>
                  <Input
                    id="post-date"
                    type="date"
                    value={postForm.date}
                    onChange={(e) => setPostForm({...postForm, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="post-status">Status</Label>
                  <select
                    id="post-status"
                    value={postForm.status}
                    onChange={(e) => setPostForm({...postForm, status: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="post-tags">Tags (comma separated)</Label>
                <Input
                  id="post-tags"
                  value={postForm.tags.join(', ')}
                  onChange={(e) => setPostForm({...postForm, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div>
                <Label htmlFor="post-cover-url">Cover URL</Label>
                <Input
                  id="post-cover-url"
                  value={postForm.cover_url}
                  onChange={(e) => setPostForm({...postForm, cover_url: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <MultiLangInput
                label="Post Title"
                value={postForm.title}
                onChange={(value) => setPostForm({...postForm, title: value})}
                placeholder="Post Title"
                required
              />

              <MultiLangInput
                label="Post Excerpt"
                value={postForm.excerpt}
                onChange={(value) => setPostForm({...postForm, excerpt: value})}
                type="textarea"
                placeholder="Post Excerpt"
              />

              <MultiLangInput
                label="Post Content (Markdown)"
                value={postForm.body_md}
                onChange={(value) => setPostForm({...postForm, body_md: value})}
                type="textarea"
                placeholder="Post Content in Markdown"
              />

              <div>
                <Label htmlFor="post-image">Cover Image</Label>
                <Input
                  id="post-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPostForm({...postForm, image: e.target.files?.[0] || null})}
                />
              </div>

              <div className="flex gap-2">
                {editingPost ? (
                  <>
                    <Button onClick={handleUpdatePost} disabled={loading}>
                      {loading ? 'Updating...' : 'Update Post'}
                    </Button>
                    <Button variant="outline" onClick={handleCancelEditPost}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleAddPost} disabled={loading}>
                    {loading ? 'Creating...' : 'Add Post'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Posts List */}
          <Card>
            <CardHeader>
              <CardTitle>Posts List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {posts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4 flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <p className="text-sm text-gray-600">Date: {post.date}</p>
                      <p className="text-sm text-gray-600">Status: <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>{post.status}</Badge></p>
                      {post.excerpt && (
                        <p className="text-sm text-gray-700 mt-2 line-clamp-2">{post.excerpt}</p>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPost(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePost(post.id, post.title || 'Unnamed Post')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}