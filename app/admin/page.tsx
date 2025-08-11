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
  alt_text: Record<string, string>
  image?: File | null
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
    alt_text: { en: '', es: '', de: '', fr: '' },
    image: null
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
    name: { en: '', es: '', de: '', fr: '' }
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
      alt_text: { en: '', es: '', de: '', fr: '' },
      image: null
    })
  }

  // Helper function to reset category form
  const resetCategoryForm = () => {
    setCategoryForm({
      name: { en: '', es: '', de: '', fr: '' }
    })
  }

  // Helper function to reset carousel form
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
      let imageUrl = ''
      if (productForm.image) {
        const uploadedUrl = await uploadImage(productForm.image, 'products', `${Date.now()}-${productForm.image.name}`)
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        }
      }

      // 自动生成slug
      const slug = generateSlug(productForm.name.en)

      const productData = {
        slug: slug,
        sku: `SKU-${Date.now()}`, // 自动生成SKU
        status: productForm.status,
        category_id: productForm.category_id || undefined,
        images: imageUrl ? { main: imageUrl, alt: productForm.alt_text } : undefined,
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

  // Category functions
  const handleAddCategory = async () => {
    if (!categoryForm.name.en) {
      alert('请填写必填字段（英文名称）')
      return
    }

    setLoading(true)
    try {
      // 自动生成slug
      const slug = generateSlug(categoryForm.name.en)

      const categoryData = {
        slug: slug,
        name: categoryForm.name.en,
        name_es: categoryForm.name.es,
        name_de: categoryForm.name.de,
        name_fr: categoryForm.name.fr
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
          slug: '',
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

  if (loading && products.length === 0 && posts.length === 0 && categories.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">加载中...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">增强版管理面板</h1>
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">产品管理</TabsTrigger>
          <TabsTrigger value="categories">分类管理</TabsTrigger>
          <TabsTrigger value="posts">新闻管理</TabsTrigger>
          <TabsTrigger value="carousel">轮播图管理</TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Form */}
            <Card>
              <CardHeader>
                <CardTitle>{editingProduct ? '编辑产品' : '添加新产品'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="product-status">状态</Label>
                  <select
                    id="product-status"
                    value={productForm.status}
                    onChange={(e) => setProductForm({...productForm, status: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="active">启用</option>
                    <option value="inactive">禁用</option>
                    <option value="draft">草稿</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="product-category">分类</Label>
                  <select
                    id="product-category"
                    value={productForm.category_id}
                    onChange={(e) => setProductForm({...productForm, category_id: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">选择分类</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name || cat.slug}</option>
                    ))}
                  </select>
                </div>

                <MultiLangInput
                  label="产品名称"
                  value={productForm.name}
                  onChange={(value) => setProductForm({...productForm, name: value})}
                  placeholder="Product Name"
                  required
                />

                <MultiLangRichText
                  label="产品简介"
                  value={productForm.intro}
                  onChange={(value) => setProductForm({...productForm, intro: value})}
                  placeholder="Product Introduction"
                />

                <MultiLangRichText
                  label="产品描述"
                  value={productForm.description}
                  onChange={(value) => setProductForm({...productForm, description: value})}
                  placeholder="Product Description"
                />

                <MultiLangInput
                  label="图片Alt文本"
                  value={productForm.alt_text}
                  onChange={(value) => setProductForm({...productForm, alt_text: value})}
                  placeholder="Image Alt Text"
                />

                <div>
                  <Label htmlFor="product-image">产品图片</Label>
                  <Input
                    id="product-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProductForm({...productForm, image: e.target.files?.[0] || null})}
                  />
                </div>

                <div className="flex gap-2">
                  {editingProduct ? (
                    <>
                      <Button onClick={() => console.log('Update product')} disabled={loading}>
                        更新产品
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setEditingProduct(null)
                        resetProductForm()
                      }}>
                        取消
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleAddProduct} disabled={loading}>
                      <Plus className="w-4 h-4 mr-2" />
                      添加产品
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Products List */}
            <Card>
              <CardHeader>
                <CardTitle>产品列表 ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{product.name || product.slug}</h3>
                          <p className="text-sm text-gray-600">Slug: {product.slug}</p>
                          {product.sku && <p className="text-sm text-gray-600">SKU: {product.sku}</p>}
                          <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                            {product.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => console.log('Edit product', product.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => console.log('Delete product', product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      暂无产品数据
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Form */}
            <Card>
              <CardHeader>
                <CardTitle>{editingCategory ? '编辑分类' : '添加新分类'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MultiLangInput
                  label="分类名称"
                  value={categoryForm.name}
                  onChange={(value) => setCategoryForm({...categoryForm, name: value})}
                  placeholder="Category Name"
                  required
                />

                <div className="flex gap-2">
                  {editingCategory ? (
                    <>
                      <Button onClick={() => console.log('Update category')} disabled={loading}>
                        更新分类
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setEditingCategory(null)
                        resetCategoryForm()
                      }}>
                        取消
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleAddCategory} disabled={loading}>
                      <Plus className="w-4 h-4 mr-2" />
                      添加分类
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Categories List */}
            <Card>
              <CardHeader>
                <CardTitle>分类列表 ({categories.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {categories.map((category) => (
                    <div key={category.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{category.name || category.slug}</h3>
                          <p className="text-sm text-gray-600">Slug: {category.slug}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => console.log('Edit category', category.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => console.log('Delete category', category.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {categories.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      暂无分类数据
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Posts Tab */}
        <TabsContent value="posts">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Post Form */}
            <Card>
              <CardHeader>
                <CardTitle>{editingPost ? '编辑新闻' : '添加新新闻'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="post-date">发布日期</Label>
                  <Input
                    id="post-date"
                    type="date"
                    value={postForm.date}
                    onChange={(e) => setPostForm({...postForm, date: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="post-status">状态</Label>
                  <select
                    id="post-status"
                    value={postForm.status}
                    onChange={(e) => setPostForm({...postForm, status: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="published">已发布</option>
                    <option value="draft">草稿</option>
                    <option value="archived">已归档</option>
                  </select>
                </div>

                <MultiLangInput
                  label="新闻标题"
                  value={postForm.title}
                  onChange={(value) => setPostForm({...postForm, title: value})}
                  placeholder="News Title"
                  required
                />

                <MultiLangInput
                  label="新闻摘要"
                  value={postForm.excerpt}
                  onChange={(value) => setPostForm({...postForm, excerpt: value})}
                  type="textarea"
                  placeholder="News Summary"
                />

                <MultiLangRichText
                  label="新闻内容"
                  value={postForm.body_md}
                  onChange={(value) => setPostForm({...postForm, body_md: value})}
                  placeholder="News Content"
                />

                <MultiLangInput
                  label="封面图片Alt文本"
                  value={postForm.alt_text}
                  onChange={(value) => setPostForm({...postForm, alt_text: value})}
                  placeholder="Cover Image Alt Text"
                />

                <div>
                  <Label htmlFor="post-image">封面图片</Label>
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
                      <Button onClick={() => console.log('Update post')} disabled={loading}>
                        更新新闻
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setEditingPost(null)
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
                      }}>
                        取消
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleAddPost} disabled={loading}>
                      <Plus className="w-4 h-4 mr-2" />
                      添加新闻
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Posts List */}
            <Card>
              <CardHeader>
                <CardTitle>新闻列表 ({posts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {posts.map((post) => (
                    <div key={post.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{post.title || post.slug}</h3>
                          <p className="text-sm text-gray-600">Slug: {post.slug}</p>
                          <p className="text-sm text-gray-600">日期: {post.date}</p>
                          <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                            {post.status === 'published' ? '已发布' : post.status === 'draft' ? '草稿' : '已归档'}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => console.log('Edit post', post.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => console.log('Delete post', post.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {posts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      暂无新闻数据
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Carousel Tab */}
        <TabsContent value="carousel">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Carousel Form */}
            <Card>
              <CardHeader>
                <CardTitle>{editingCarousel ? '编辑轮播图' : '添加新轮播图'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MultiLangInput
                  label="轮播图标题"
                  value={carouselForm.title}
                  onChange={(value) => setCarouselForm({...carouselForm, title: value})}
                  placeholder="Carousel Title"
                  required
                />

                <MultiLangInput
                  label="轮播图描述"
                  value={carouselForm.description}
                  onChange={(value) => setCarouselForm({...carouselForm, description: value})}
                  type="textarea"
                  placeholder="Carousel Description"
                />

                <MultiLangInput
                  label="图片Alt文本"
                  value={carouselForm.alt_text}
                  onChange={(value) => setCarouselForm({...carouselForm, alt_text: value})}
                  placeholder="Image Alt Text"
                />

                <div>
                  <Label htmlFor="carousel-link">链接地址</Label>
                  <Input
                    id="carousel-link"
                    value={carouselForm.link_url}
                    onChange={(e) => setCarouselForm({...carouselForm, link_url: e.target.value})}
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="carousel-order">排序顺序</Label>
                  <Input
                    id="carousel-order"
                    type="number"
                    value={carouselForm.order_index}
                    onChange={(e) => setCarouselForm({...carouselForm, order_index: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="carousel-active"
                    type="checkbox"
                    checked={carouselForm.is_active}
                    onChange={(e) => setCarouselForm({...carouselForm, is_active: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="carousel-active">启用轮播图</Label>
                </div>

                <div>
                  <Label htmlFor="carousel-image">轮播图片 *</Label>
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
                      <Button onClick={() => console.log('Update carousel')} disabled={loading}>
                        更新轮播图
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setEditingCarousel(null)
                        resetCarouselForm()
                      }}>
                        取消
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleAddCarousel} disabled={loading}>
                      <Plus className="w-4 h-4 mr-2" />
                      添加轮播图
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Carousel List */}
            <Card>
              <CardHeader>
                <CardTitle>轮播图列表 ({carouselItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {carouselItems.map((item) => (
                    <div key={item.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.title || '无标题'}</h3>
                          <p className="text-sm text-gray-600">排序: {item.order_index}</p>
                          {item.link_url && (
                            <p className="text-sm text-gray-600 truncate">链接: {item.link_url}</p>
                          )}
                          <div className="mt-2">
                            <Badge variant={item.is_active ? 'default' : 'secondary'}>
                              {item.is_active ? '启用' : '禁用'}
                            </Badge>
                          </div>
                          {item.image_url && (
                            <div className="mt-2">
                              <img 
                                src={item.image_url} 
                                alt={item.alt_text || item.title || '轮播图'}
                                className="w-16 h-16 object-cover rounded"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => console.log('Edit carousel', item.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => console.log('Delete carousel', item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {carouselItems.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      暂无轮播图数据
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}