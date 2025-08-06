'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Trash2, Edit, Plus, Upload, X } from 'lucide-react'
import { 
  type Product, 
  type NewsArticle, 
  type CarouselImage,
  type ProductCategory,
  type ProductSubcategory,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  createNews,
  getNews,
  updateNews,
  deleteNews,
  createCarouselImage,
  getCarouselImages,
  updateCarouselImage,
  deleteCarouselImage,
  createProductCategory,
  getProductCategories,
  updateProductCategory,
  deleteProductCategory,
  createProductSubcategory,
  getProductSubcategories,
  updateProductSubcategory,
  deleteProductSubcategory,
  uploadImage
} from '@/lib/supabase-service'

const PRODUCT_CATEGORIES = [
  'Aluminum Profiles',
  'Windows & Doors',
  'Curtain Walls',
  'Structural Glazing',
  'Custom Solutions'
]

const NEWS_CATEGORIES = [
  'Company News',
  'Industry Updates',
  'Product Launches',
  'Events',
  'Awards'
]

interface ProductForm {
  name: string
  name_es: string
  name_de: string
  name_fr: string
  category: string
  sizes: string[]
  description: string
  description_es: string
  description_de: string
  description_fr: string
  features: string[]
  features_es: string[]
  features_de: string[]
  features_fr: string[]
  is_featured: boolean
  image?: File | null
}

interface NewsForm {
  title: string
  title_es: string
  title_de: string
  title_fr: string
  excerpt: string
  excerpt_es: string
  excerpt_de: string
  excerpt_fr: string
  content: string
  content_es: string
  content_de: string
  content_fr: string
  date: string
  category: string
  read_time: string
  is_featured: boolean
  image?: File | null
}

interface CarouselForm {
  title: string
  subtitle: string
  image: File | null
  order_position: number
}

interface CategoryForm {
  name: string
  name_es: string
  name_de: string
  name_fr: string
  slug: string
  description: string
  description_es: string
  description_de: string
  description_fr: string
  image: File | null
  image_alt: string
  image_alt_es: string
  image_alt_de: string
  image_alt_fr: string
  order_position: number
}

interface SubcategoryForm {
  category_id: string
  name: string
  name_es: string
  name_de: string
  name_fr: string
  slug: string
  description: string
  description_es: string
  description_de: string
  description_fr: string
  image: File | null
  image_alt: string
  image_alt_es: string
  image_alt_de: string
  image_alt_fr: string
  order_position: number
}

export default function AdminPanel() {
  // State for data
  const [products, setProducts] = useState<Product[]>([])
  const [news, setNews] = useState<NewsArticle[]>([])
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [subcategories, setSubcategories] = useState<ProductSubcategory[]>([])
  
  // State for forms
  const [productForm, setProductForm] = useState<ProductForm>({
    name: '',
    name_es: '',
    name_de: '',
    name_fr: '',
    category: '',
    sizes: [],
    description: '',
    description_es: '',
    description_de: '',
    description_fr: '',
    features: [],
    features_es: [],
    features_de: [],
    features_fr: [],
    is_featured: false,
    image: null
  })
  
  const [newsForm, setNewsForm] = useState<NewsForm>({
    title: '',
    title_es: '',
    title_de: '',
    title_fr: '',
    excerpt: '',
    excerpt_es: '',
    excerpt_de: '',
    excerpt_fr: '',
    content: '',
    content_es: '',
    content_de: '',
    content_fr: '',
    date: '',
    category: '',
    read_time: '',
    is_featured: false,
    image: null
  })
  
  const [carouselForm, setCarouselForm] = useState<CarouselForm>({
    title: '',
    subtitle: '',
    image: null,
    order_position: 1
  })
  const [categoryForm, setCategoryForm] = useState<CategoryForm>({
    name: '',
    name_es: '',
    name_de: '',
    name_fr: '',
    slug: '',
    description: '',
    description_es: '',
    description_de: '',
    description_fr: '',
    image: null,
    image_alt: '',
    image_alt_es: '',
    image_alt_de: '',
    image_alt_fr: '',
    order_position: 1
  })
  const [subcategoryForm, setSubcategoryForm] = useState<SubcategoryForm>({
    category_id: '',
    name: '',
    name_es: '',
    name_de: '',
    name_fr: '',
    slug: '',
    description: '',
    description_es: '',
    description_de: '',
    description_fr: '',
    image: null,
    image_alt: '',
    image_alt_es: '',
    image_alt_de: '',
    image_alt_fr: '',
    order_position: 1
  })
  
  // State for editing
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [editingNews, setEditingNews] = useState<string | null>(null)
  const [editingCarousel, setEditingCarousel] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editingSubcategory, setEditingSubcategory] = useState<string | null>(null)
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState<string>('')
  
  // State for loading
  const [loading, setLoading] = useState(false)
  
  // Load data on component mount
  useEffect(() => {
    loadAllData()
  }, [])
  
  const loadAllData = async () => {
    setLoading(true)
    try {
      const [productsData, newsData, carouselData, categoriesData, subcategoriesData] = await Promise.all([
        getProducts(),
        getNews(),
        getCarouselImages(),
        getProductCategories(),
        getProductSubcategories()
      ])
      setProducts(productsData)
      setNews(newsData)
      setCarouselImages(carouselData)
      setCategories(categoriesData)
      setSubcategories(subcategoriesData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // Product functions
  const handleAddProduct = async () => {
    if (!productForm.name || !productForm.category) return
    
    setLoading(true)
    try {
      let imageUrl = ''
      if (productForm.image) {
        const uploadedUrl = await uploadImage(
          productForm.image,
          'products',
          `${Date.now()}-${productForm.image.name}`
        )
        if (uploadedUrl) imageUrl = uploadedUrl
      }
      
      const newProduct = await createProduct({
        name: productForm.name,
        name_es: productForm.name_es,
        name_de: productForm.name_de,
        name_fr: productForm.name_fr,
        category: productForm.category,
        sizes: productForm.sizes,
        description: productForm.description,
        description_es: productForm.description_es,
        description_de: productForm.description_de,
        description_fr: productForm.description_fr,
        features: productForm.features,
        features_es: productForm.features_es,
        features_de: productForm.features_de,
        features_fr: productForm.features_fr,
        is_featured: productForm.is_featured,
        image_url: imageUrl
      })
      
      if (newProduct) {
        setProducts(prev => [newProduct, ...prev])
        setProductForm({
          name: '',
          name_es: '',
          name_de: '',
          name_fr: '',
          category: '',
          sizes: [],
          description: '',
          description_es: '',
          description_de: '',
          description_fr: '',
          features: [],
          features_es: [],
          features_de: [],
          features_fr: [],
          is_featured: false,
          image: null
        })
      }
    } catch (error) {
      console.error('Error adding product:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleUpdateProduct = async (id: string) => {
    setLoading(true)
    try {
      let imageUrl = products.find(p => p.id === id)?.image_url || ''
      if (productForm.image) {
        const uploadedUrl = await uploadImage(
          productForm.image,
          'products',
          `${Date.now()}-${productForm.image.name}`
        )
        if (uploadedUrl) imageUrl = uploadedUrl
      }
      
      const updatedProduct = await updateProduct(id, {
        name: productForm.name,
        name_es: productForm.name_es,
        name_de: productForm.name_de,
        name_fr: productForm.name_fr,
        category: productForm.category,
        sizes: productForm.sizes,
        description: productForm.description,
        description_es: productForm.description_es,
        description_de: productForm.description_de,
        description_fr: productForm.description_fr,
        features: productForm.features,
        features_es: productForm.features_es,
        features_de: productForm.features_de,
        features_fr: productForm.features_fr,
        is_featured: productForm.is_featured,
        image_url: imageUrl
      })
      
      if (updatedProduct) {
        setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p))
        setEditingProduct(null)
        setProductForm({
          name: '',
          name_es: '',
          name_de: '',
          name_fr: '',
          category: '',
          sizes: [],
          description: '',
          description_es: '',
          description_de: '',
          description_fr: '',
          features: [],
          features_es: [],
          features_de: [],
          features_fr: [],
          is_featured: false,
          image: null
        })
      }
    } catch (error) {
      console.error('Error updating product:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    setLoading(true)
    try {
      const success = await deleteProduct(id)
      if (success) {
        setProducts(prev => prev.filter(p => p.id !== id))
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // News functions
  const handleAddNews = async () => {
    if (!newsForm.title || !newsForm.content) return
    
    setLoading(true)
    try {
      let imageUrl = ''
      if (newsForm.image) {
        const uploadedUrl = await uploadImage(
          newsForm.image,
          'news',
          `${Date.now()}-${newsForm.image.name}`
        )
        if (uploadedUrl) imageUrl = uploadedUrl
      }
      
      const newNews = await createNews({
        title: newsForm.title,
        title_es: newsForm.title_es,
        title_de: newsForm.title_de,
        title_fr: newsForm.title_fr,
        excerpt: newsForm.excerpt,
        excerpt_es: newsForm.excerpt_es,
        excerpt_de: newsForm.excerpt_de,
        excerpt_fr: newsForm.excerpt_fr,
        content: newsForm.content,
        content_es: newsForm.content_es,
        content_de: newsForm.content_de,
        content_fr: newsForm.content_fr,
        date: newsForm.date,
        category: newsForm.category,
        read_time: newsForm.read_time,
        is_featured: newsForm.is_featured,
        image_url: imageUrl
      })
      
      if (newNews) {
        setNews(prev => [newNews, ...prev])
        setNewsForm({
          title: '',
          title_es: '',
          title_de: '',
          title_fr: '',
          excerpt: '',
          excerpt_es: '',
          excerpt_de: '',
          excerpt_fr: '',
          content: '',
          content_es: '',
          content_de: '',
          content_fr: '',
          date: '',
          category: '',
          read_time: '',
          is_featured: false,
          image: null
        })
      }
    } catch (error) {
      console.error('Error adding news:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleUpdateNews = async (id: string) => {
    setLoading(true)
    try {
      let imageUrl = news.find(n => n.id === id)?.image_url || ''
      if (newsForm.image) {
        const uploadedUrl = await uploadImage(
          newsForm.image,
          'news',
          `${Date.now()}-${newsForm.image.name}`
        )
        if (uploadedUrl) imageUrl = uploadedUrl
      }
      
      const updatedNews = await updateNews(id, {
        title: newsForm.title,
        title_es: newsForm.title_es,
        title_de: newsForm.title_de,
        title_fr: newsForm.title_fr,
        excerpt: newsForm.excerpt,
        excerpt_es: newsForm.excerpt_es,
        excerpt_de: newsForm.excerpt_de,
        excerpt_fr: newsForm.excerpt_fr,
        content: newsForm.content,
        content_es: newsForm.content_es,
        content_de: newsForm.content_de,
        content_fr: newsForm.content_fr,
        date: newsForm.date,
        category: newsForm.category,
        read_time: newsForm.read_time,
        is_featured: newsForm.is_featured,
        image_url: imageUrl
      })
      
      if (updatedNews) {
        setNews(prev => prev.map(n => n.id === id ? updatedNews : n))
        setEditingNews(null)
        setNewsForm({
          title: '',
          title_es: '',
          title_de: '',
          title_fr: '',
          excerpt: '',
          excerpt_es: '',
          excerpt_de: '',
          excerpt_fr: '',
          content: '',
          content_es: '',
          content_de: '',
          content_fr: '',
          date: '',
          category: '',
          read_time: '',
          is_featured: false,
          image: null
        })
      }
    } catch (error) {
      console.error('Error updating news:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleDeleteNews = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return
    
    setLoading(true)
    try {
      const success = await deleteNews(id)
      if (success) {
        setNews(prev => prev.filter(n => n.id !== id))
      }
    } catch (error) {
      console.error('Error deleting news:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // Carousel functions
  const handleAddCarousel = async () => {
    if (!carouselForm.title || !carouselForm.image) return
    
    setLoading(true)
    try {
      const uploadedUrl = await uploadImage(
        carouselForm.image,
        'carousel',
        `${Date.now()}-${carouselForm.image.name}`
      )
      
      if (uploadedUrl) {
        const newCarousel = await createCarouselImage({
          title: carouselForm.title,
          subtitle: carouselForm.subtitle,
          image_url: uploadedUrl,
          order_position: carouselForm.order_position
        })
        
        if (newCarousel) {
          setCarouselImages(prev => [...prev, newCarousel].sort((a, b) => a.order_position - b.order_position))
          setCarouselForm({
            title: '',
            subtitle: '',
            image: null,
            order_position: carouselImages.length + 1
          })
        }
      }
    } catch (error) {
      console.error('Error adding carousel image:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleUpdateCarousel = async (id: string) => {
    setLoading(true)
    try {
      let imageUrl = carouselImages.find(c => c.id === id)?.image_url || ''
      if (carouselForm.image) {
        const uploadedUrl = await uploadImage(
          carouselForm.image,
          'carousel',
          `${Date.now()}-${carouselForm.image.name}`
        )
        if (uploadedUrl) imageUrl = uploadedUrl
      }
      
      const updatedCarousel = await updateCarouselImage(id, {
        title: carouselForm.title,
        subtitle: carouselForm.subtitle,
        image_url: imageUrl,
        order_position: carouselForm.order_position
      })
      
      if (updatedCarousel) {
        setCarouselImages(prev => prev.map(c => c.id === id ? updatedCarousel : c).sort((a, b) => a.order_position - b.order_position))
        setEditingCarousel(null)
        setCarouselForm({
          title: '',
          subtitle: '',
          image: null,
          order_position: 1
        })
      }
    } catch (error) {
      console.error('Error updating carousel:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleDeleteCarousel = async (id: string) => {
    if (!confirm('Are you sure you want to delete this carousel image?')) return
    
    setLoading(true)
    try {
      const success = await deleteCarouselImage(id)
      if (success) {
        setCarouselImages(prev => prev.filter(c => c.id !== id))
      }
    } catch (error) {
      console.error('Error deleting carousel:', error)
    } finally {
      setLoading(false)
    }
  }

  // Category functions
  const handleAddCategory = async () => {
    if (!categoryForm.name || !categoryForm.slug) return
    
    setLoading(true)
    try {
      let imageUrl = ''
      let imageAlt = categoryForm.image_alt
      
      if (categoryForm.image) {
        const uploadedUrl = await uploadImage(
          categoryForm.image,
          'categories',
          `${Date.now()}-${categoryForm.image.name}`
        )
        if (uploadedUrl) imageUrl = uploadedUrl
      }
      
      const newCategory = await createProductCategory({
        name: categoryForm.name,
        name_es: categoryForm.name_es,
        name_de: categoryForm.name_de,
        name_fr: categoryForm.name_fr,
        slug: categoryForm.slug,
        description: categoryForm.description,
        description_es: categoryForm.description_es,
        description_de: categoryForm.description_de,
        description_fr: categoryForm.description_fr,
        image_url: imageUrl,
        image_alt: imageAlt,
        image_alt_es: categoryForm.image_alt_es,
        image_alt_de: categoryForm.image_alt_de,
        image_alt_fr: categoryForm.image_alt_fr,
        order_position: categoryForm.order_position
      })
      
      if (newCategory) {
        setCategories(prev => [...prev, newCategory])
      }
      setCategoryForm({
        name: '',
        name_es: '',
        name_de: '',
        name_fr: '',
        slug: '',
        description: '',
        description_es: '',
        description_de: '',
        description_fr: '',
        image: null,
        image_alt: '',
        image_alt_es: '',
        image_alt_de: '',
        image_alt_fr: '',
        order_position: categories.length + 1
      })
    } catch (error) {
      console.error('Error adding category:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCategory = async (id: string) => {
    setLoading(true)
    try {
      let imageUrl = categories.find(c => c.id === id)?.image_url || ''
      if (categoryForm.image) {
        const uploadedUrl = await uploadImage(
          categoryForm.image,
          'categories',
          `${Date.now()}-${categoryForm.image.name}`
        )
        if (uploadedUrl) imageUrl = uploadedUrl
      }
      
      const updatedCategory = await updateProductCategory(id, {
        name: categoryForm.name,
        name_es: categoryForm.name_es,
        name_de: categoryForm.name_de,
        name_fr: categoryForm.name_fr,
        description: categoryForm.description,
        description_es: categoryForm.description_es,
        description_de: categoryForm.description_de,
        description_fr: categoryForm.description_fr,
        slug: categoryForm.slug,
        image_url: imageUrl,
        image_alt: categoryForm.image_alt,
        image_alt_es: categoryForm.image_alt_es,
        image_alt_de: categoryForm.image_alt_de,
        image_alt_fr: categoryForm.image_alt_fr,
        order_position: categoryForm.order_position
      })
      
      if (updatedCategory) {
        setCategories(prev => prev.map(c => c.id === id ? updatedCategory : c).sort((a, b) => a.order_position - b.order_position))
        setEditingCategory(null)
        setCategoryForm({
          name: '',
          name_es: '',
          name_de: '',
          name_fr: '',
          description: '',
          description_es: '',
          description_de: '',
          description_fr: '',
          slug: '',
          image: null,
          image_alt: '',
          image_alt_es: '',
          image_alt_de: '',
          image_alt_fr: '',
          order_position: 1
        })
      }
    } catch (error) {
      console.error('Error updating category:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    
    setLoading(true)
    try {
      const success = await deleteProductCategory(id)
      if (success) {
        setCategories(prev => prev.filter(c => c.id !== id))
      }
    } catch (error) {
      console.error('Error deleting category:', error)
    } finally {
      setLoading(false)
    }
  }

  // Subcategory functions
  const handleAddSubcategory = async () => {
    if (!subcategoryForm.name || !subcategoryForm.slug || !subcategoryForm.category_id) return
    
    setLoading(true)
    try {
      let imageUrl = ''
      if (subcategoryForm.image) {
        const uploadedUrl = await uploadImage(
          subcategoryForm.image,
          'subcategories',
          `${Date.now()}-${subcategoryForm.image.name}`
        )
        if (uploadedUrl) imageUrl = uploadedUrl
      }
      
      const newSubcategory = await createProductSubcategory({
        name: subcategoryForm.name,
        name_es: subcategoryForm.name_es,
        name_de: subcategoryForm.name_de,
        name_fr: subcategoryForm.name_fr,
        description: subcategoryForm.description,
        description_es: subcategoryForm.description_es,
        description_de: subcategoryForm.description_de,
        description_fr: subcategoryForm.description_fr,
        slug: subcategoryForm.slug,
        category_id: subcategoryForm.category_id,
        image_url: imageUrl,
        image_alt: subcategoryForm.image_alt,
        image_alt_es: subcategoryForm.image_alt_es,
        image_alt_de: subcategoryForm.image_alt_de,
        image_alt_fr: subcategoryForm.image_alt_fr,
        order_position: subcategoryForm.order_position
      })
      
      if (newSubcategory) {
        setSubcategories(prev => [...prev, newSubcategory].sort((a, b) => a.order_position - b.order_position))
        setSubcategoryForm({
          name: '',
          name_es: '',
          name_de: '',
          name_fr: '',
          description: '',
          description_es: '',
          description_de: '',
          description_fr: '',
          slug: '',
          category_id: '',
          image: null,
          image_alt: '',
          image_alt_es: '',
          image_alt_de: '',
          image_alt_fr: '',
          order_position: subcategories.length + 1
        })
      }
    } catch (error) {
      console.error('Error adding subcategory:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateSubcategory = async (id: string) => {
    setLoading(true)
    try {
      let imageUrl = subcategories.find(s => s.id === id)?.image_url || ''
      if (subcategoryForm.image) {
        const uploadedUrl = await uploadImage(
          subcategoryForm.image,
          'subcategories',
          `${Date.now()}-${subcategoryForm.image.name}`
        )
        if (uploadedUrl) imageUrl = uploadedUrl
      }
      
      const updatedSubcategory = await updateProductSubcategory(id, {
        name: subcategoryForm.name,
        name_es: subcategoryForm.name_es,
        name_de: subcategoryForm.name_de,
        name_fr: subcategoryForm.name_fr,
        description: subcategoryForm.description,
        description_es: subcategoryForm.description_es,
        description_de: subcategoryForm.description_de,
        description_fr: subcategoryForm.description_fr,
        slug: subcategoryForm.slug,
        category_id: subcategoryForm.category_id,
        image_url: imageUrl,
        image_alt: subcategoryForm.image_alt,
        image_alt_es: subcategoryForm.image_alt_es,
        image_alt_de: subcategoryForm.image_alt_de,
        image_alt_fr: subcategoryForm.image_alt_fr,
        order_position: subcategoryForm.order_position
      })
      
      if (updatedSubcategory) {
        setSubcategories(prev => prev.map(s => s.id === id ? updatedSubcategory : s).sort((a, b) => a.order_position - b.order_position))
        setEditingSubcategory(null)
        setSubcategoryForm({
          name: '',
          name_es: '',
          name_de: '',
          name_fr: '',
          description: '',
          description_es: '',
          description_de: '',
          description_fr: '',
          slug: '',
          category_id: '',
          image: null,
          image_alt: '',
          image_alt_es: '',
          image_alt_de: '',
          image_alt_fr: '',
          order_position: 1
        })
      }
    } catch (error) {
      console.error('Error updating subcategory:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSubcategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subcategory?')) return
    
    setLoading(true)
    try {
      const success = await deleteProductSubcategory(id)
      if (success) {
        setSubcategories(prev => prev.filter(s => s.id !== id))
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // Helper functions
  const handleImageUpload = (file: File, type: 'product' | 'news' | 'carousel') => {
    if (file && file.type.startsWith('image/')) {
      if (type === 'product') {
        setProductForm(prev => ({ ...prev, image: file }))
      } else if (type === 'news') {
        setNewsForm(prev => ({ ...prev, image: file }))
      } else if (type === 'carousel') {
        setCarouselForm(prev => ({ ...prev, image: file }))
      }
    }
  }
  
  const addSize = (size: string) => {
    if (size && !productForm.sizes.includes(size)) {
      setProductForm(prev => ({ ...prev, sizes: [...prev.sizes, size] }))
    }
  }
  
  const removeSize = (size: string) => {
    setProductForm(prev => ({ ...prev, sizes: prev.sizes.filter(s => s !== size) }))
  }
  
  const addFeature = (feature: string) => {
    if (feature && !productForm.features.includes(feature)) {
      setProductForm(prev => ({ ...prev, features: [...prev.features, feature] }))
    }
  }
  
  const removeFeature = (feature: string) => {
    setProductForm(prev => ({ ...prev, features: prev.features.filter(f => f !== feature) }))
  }

  const addFeatureEs = (feature: string) => {
    if (feature && !productForm.features_es.includes(feature)) {
      setProductForm(prev => ({ ...prev, features_es: [...prev.features_es, feature] }))
    }
  }
  
  const removeFeatureEs = (feature: string) => {
    setProductForm(prev => ({ ...prev, features_es: prev.features_es.filter(f => f !== feature) }))
  }

  const addFeatureDe = (feature: string) => {
    if (feature && !productForm.features_de.includes(feature)) {
      setProductForm(prev => ({ ...prev, features_de: [...prev.features_de, feature] }))
    }
  }
  
  const removeFeatureDe = (feature: string) => {
    setProductForm(prev => ({ ...prev, features_de: prev.features_de.filter(f => f !== feature) }))
  }

  const addFeatureFr = (feature: string) => {
    if (feature && !productForm.features_fr.includes(feature)) {
      setProductForm(prev => ({ ...prev, features_fr: [...prev.features_fr, feature] }))
    }
  }
  
  const removeFeatureFr = (feature: string) => {
    setProductForm(prev => ({ ...prev, features_fr: prev.features_fr.filter(f => f !== feature) }))
  }
  
  const startEditProduct = (product: Product) => {
    setProductForm({
      name: product.name,
      name_es: product.name_es || '',
      name_de: product.name_de || '',
      name_fr: product.name_fr || '',
      category: product.category,
      sizes: product.sizes,
      description: product.description,
      description_es: product.description_es || '',
      description_de: product.description_de || '',
      description_fr: product.description_fr || '',
      features: product.features,
      features_es: product.features_es || [],
      features_de: product.features_de || [],
      features_fr: product.features_fr || [],
      is_featured: product.is_featured || false,
      image: null
    })
    setEditingProduct(product.id)
  }
  
  const startEditNews = (article: NewsArticle) => {
    setNewsForm({
      title: article.title,
      title_es: article.title_es || '',
      title_de: article.title_de || '',
      title_fr: article.title_fr || '',
      excerpt: article.excerpt,
      excerpt_es: article.excerpt_es || '',
      excerpt_de: article.excerpt_de || '',
      excerpt_fr: article.excerpt_fr || '',
      content: article.content,
      content_es: article.content_es || '',
      content_de: article.content_de || '',
      content_fr: article.content_fr || '',
      date: article.date,
      category: article.category,
      read_time: article.read_time,
      is_featured: article.is_featured || false,
      image: null
    })
    setEditingNews(article.id)
  }
  
  const startEditCarousel = (carousel: CarouselImage) => {
    setCarouselForm({
      title: carousel.title,
      subtitle: carousel.subtitle || '',
      image: null,
      order_position: carousel.order_position
    })
    setEditingCarousel(carousel.id)
  }

  const startEditCategory = (category: ProductCategory) => {
    setCategoryForm({
      name: category.name,
      name_es: category.name_es || '',
      name_de: category.name_de || '',
      name_fr: category.name_fr || '',
      slug: category.slug,
      description: category.description || '',
      description_es: category.description_es || '',
      description_de: category.description_de || '',
      description_fr: category.description_fr || '',
      image: null,
      image_alt: category.image_alt || '',
      image_alt_es: category.image_alt_es || '',
      image_alt_de: category.image_alt_de || '',
      image_alt_fr: category.image_alt_fr || '',
      order_position: category.order_position
    })
    setEditingCategory(category.id)
  }

  const startEditSubcategory = (subcategory: ProductSubcategory) => {
    setSubcategoryForm({
      name: subcategory.name,
      name_es: subcategory.name_es || '',
      name_de: subcategory.name_de || '',
      name_fr: subcategory.name_fr || '',
      description: subcategory.description || '',
      description_es: subcategory.description_es || '',
      description_de: subcategory.description_de || '',
      description_fr: subcategory.description_fr || '',
      slug: subcategory.slug,
      category_id: subcategory.category_id,
      image: null,
      image_alt: subcategory.image_alt || '',
      image_alt_es: subcategory.image_alt_es || '',
      image_alt_de: subcategory.image_alt_de || '',
      image_alt_fr: subcategory.image_alt_fr || '',
      order_position: subcategory.order_position
    })
    setEditingSubcategory(subcategory.id)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>
        
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="carousel">Homepage Carousel</TabsTrigger>
          </TabsList>
          
          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Product Name - Multilingual */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Product Name</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="product-name">Name (English)</Label>
                      <Input
                        id="product-name"
                        value={productForm.name}
                        onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter product name in English"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-name-es">Name (Spanish)</Label>
                      <Input
                        id="product-name-es"
                        value={productForm.name_es}
                        onChange={(e) => setProductForm(prev => ({ ...prev, name_es: e.target.value }))}
                        placeholder="Enter product name in Spanish"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-name-de">Name (German)</Label>
                      <Input
                        id="product-name-de"
                        value={productForm.name_de}
                        onChange={(e) => setProductForm(prev => ({ ...prev, name_de: e.target.value }))}
                        placeholder="Enter product name in German"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-name-fr">Name (French)</Label>
                      <Input
                        id="product-name-fr"
                        value={productForm.name_fr}
                        onChange={(e) => setProductForm(prev => ({ ...prev, name_fr: e.target.value }))}
                        placeholder="Enter product name in French"
                      />
                    </div>
                  </div>
                </div>

                {/* Category and Feature */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="product-category">Category</Label>
                    <select
                      id="product-category"
                      value={productForm.category}
                      onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="product-featured"
                      checked={productForm.is_featured}
                      onChange={(e) => setProductForm(prev => ({ ...prev, is_featured: e.target.checked }))}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="product-featured">Featured Product</Label>
                  </div>
                </div>
                
                {/* Description - Multilingual */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="product-description">Description (English)</Label>
                      <Textarea
                        id="product-description"
                        value={productForm.description}
                        onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter product description in English"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-description-es">Description (Spanish)</Label>
                      <Textarea
                        id="product-description-es"
                        value={productForm.description_es}
                        onChange={(e) => setProductForm(prev => ({ ...prev, description_es: e.target.value }))}
                        placeholder="Enter product description in Spanish"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-description-de">Description (German)</Label>
                      <Textarea
                        id="product-description-de"
                        value={productForm.description_de}
                        onChange={(e) => setProductForm(prev => ({ ...prev, description_de: e.target.value }))}
                        placeholder="Enter product description in German"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-description-fr">Description (French)</Label>
                      <Textarea
                        id="product-description-fr"
                        value={productForm.description_fr}
                        onChange={(e) => setProductForm(prev => ({ ...prev, description_fr: e.target.value }))}
                        placeholder="Enter product description in French"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Sizes</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add size"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addSize(e.currentTarget.value)
                          e.currentTarget.value = ''
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {productForm.sizes.map(size => (
                      <Badge key={size} variant="secondary" className="flex items-center gap-1">
                        {size}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeSize(size)} />
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Features - Multilingual */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Features (English)</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add feature in English"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addFeature(e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {productForm.features.map((feature, index) => (
                          <Badge key={`en-${index}`} variant="secondary" className="flex items-center gap-1">
                            {feature}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(feature)} />
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Features (Spanish)</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add feature in Spanish"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addFeatureEs(e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {productForm.features_es.map((feature, index) => (
                          <Badge key={`es-${index}`} variant="secondary" className="flex items-center gap-1">
                            {feature}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeatureEs(feature)} />
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Features (German)</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add feature in German"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addFeatureDe(e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {productForm.features_de.map((feature, index) => (
                          <Badge key={`de-${index}`} variant="secondary" className="flex items-center gap-1">
                            {feature}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeatureDe(feature)} />
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Features (French)</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add feature in French"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addFeatureFr(e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {productForm.features_fr.map((feature, index) => (
                          <Badge key={`fr-${index}`} variant="secondary" className="flex items-center gap-1">
                            {feature}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeatureFr(feature)} />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="product-image">Product Image</Label>
                  <Input
                    id="product-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file, 'product')
                    }}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={editingProduct ? () => handleUpdateProduct(editingProduct) : handleAddProduct}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                  {editingProduct && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditingProduct(null)
                        setProductForm({
                          name: '',
                          name_es: '',
                          name_de: '',
                          name_fr: '',
                          category: '',
                          sizes: [],
                          description: '',
                          description_es: '',
                          description_de: '',
                          description_fr: '',
                          features: [],
                          features_es: [],
                          features_de: [],
                          features_fr: [],
                          is_featured: false,
                          image: null
                        })
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Products List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {products.map(product => (
                    <div key={product.id} className="border rounded-lg p-4 flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.category}</p>
                        <p className="text-sm mt-1">{product.description}</p>
                        <div className="flex gap-1 mt-2">
                          {product.sizes.map(size => (
                            <Badge key={size} variant="outline">{size}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => startEditProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingNews ? 'Edit News Article' : 'Add New News Article'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="news-title">Title (English)</Label>
                    <Input
                      id="news-title"
                      value={newsForm.title}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter news title in English"
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-title-es">Title (Spanish)</Label>
                    <Input
                      id="news-title-es"
                      value={newsForm.title_es}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, title_es: e.target.value }))}
                      placeholder="Enter news title in Spanish"
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-title-de">Title (German)</Label>
                    <Input
                      id="news-title-de"
                      value={newsForm.title_de}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, title_de: e.target.value }))}
                      placeholder="Enter news title in German"
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-title-fr">Title (French)</Label>
                    <Input
                      id="news-title-fr"
                      value={newsForm.title_fr}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, title_fr: e.target.value }))}
                      placeholder="Enter news title in French"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="news-category">Category</Label>
                  <select
                    id="news-category"
                    value={newsForm.category}
                    onChange={(e) => setNewsForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select category</option>
                    {NEWS_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="news-excerpt">Excerpt (English)</Label>
                    <Textarea
                      id="news-excerpt"
                      value={newsForm.excerpt}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Enter news excerpt in English"
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-excerpt-es">Excerpt (Spanish)</Label>
                    <Textarea
                      id="news-excerpt-es"
                      value={newsForm.excerpt_es}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, excerpt_es: e.target.value }))}
                      placeholder="Enter news excerpt in Spanish"
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-excerpt-de">Excerpt (German)</Label>
                    <Textarea
                      id="news-excerpt-de"
                      value={newsForm.excerpt_de}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, excerpt_de: e.target.value }))}
                      placeholder="Enter news excerpt in German"
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-excerpt-fr">Excerpt (French)</Label>
                    <Textarea
                      id="news-excerpt-fr"
                      value={newsForm.excerpt_fr}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, excerpt_fr: e.target.value }))}
                      placeholder="Enter news excerpt in French"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="news-content">Content (English)</Label>
                    <Textarea
                      id="news-content"
                      value={newsForm.content}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Enter news content in English"
                      className="min-h-[120px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-content-es">Content (Spanish)</Label>
                    <Textarea
                      id="news-content-es"
                      value={newsForm.content_es}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, content_es: e.target.value }))}
                      placeholder="Enter news content in Spanish"
                      className="min-h-[120px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-content-de">Content (German)</Label>
                    <Textarea
                      id="news-content-de"
                      value={newsForm.content_de}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, content_de: e.target.value }))}
                      placeholder="Enter news content in German"
                      className="min-h-[120px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-content-fr">Content (French)</Label>
                    <Textarea
                      id="news-content-fr"
                      value={newsForm.content_fr}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, content_fr: e.target.value }))}
                      placeholder="Enter news content in French"
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="news-date">Date</Label>
                    <Input
                      id="news-date"
                      type="date"
                      value={newsForm.date}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="news-read-time">Read Time</Label>
                    <Input
                      id="news-read-time"
                      value={newsForm.read_time}
                      onChange={(e) => setNewsForm(prev => ({ ...prev, read_time: e.target.value }))}
                      placeholder="e.g., 5 min read"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="news-featured"
                    checked={newsForm.is_featured}
                    onChange={(e) => setNewsForm(prev => ({ ...prev, is_featured: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="news-featured">Featured News</Label>
                </div>
                
                <div>
                  <Label htmlFor="news-image">News Image</Label>
                  <Input
                    id="news-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file, 'news')
                    }}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={editingNews ? () => handleUpdateNews(editingNews) : handleAddNews}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : editingNews ? 'Update Article' : 'Add Article'}
                  </Button>
                  {editingNews && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditingNews(null)
                        setNewsForm({
                          title: '',
                          title_es: '',
                          title_de: '',
                          title_fr: '',
                          excerpt: '',
                          excerpt_es: '',
                          excerpt_de: '',
                          excerpt_fr: '',
                          content: '',
                          content_es: '',
                          content_de: '',
                          content_fr: '',
                          date: '',
                          category: '',
                          read_time: '',
                          is_featured: false,
                          image: null
                        })
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>News Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {news.map(article => (
                    <div key={article.id} className="border rounded-lg p-4 flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{article.title}</h3>
                        <p className="text-sm text-gray-600">{article.category} • {article.read_time}</p>
                        <p className="text-sm mt-1">{article.excerpt}</p>
                        <p className="text-xs text-gray-500 mt-2">{article.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => startEditNews(article)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteNews(article.id)}>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Categories Section */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category-name-en">Name (English)</Label>
                        <Input
                          id="category-name-en"
                          value={categoryForm.name}
                          onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter category name in English"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category-slug">Slug</Label>
                        <Input
                          id="category-slug"
                          value={categoryForm.slug}
                          onChange={(e) => setCategoryForm(prev => ({ ...prev, slug: e.target.value }))}
                          placeholder="category-slug"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="category-name-es">Name (Spanish)</Label>
                        <Input
                          id="category-name-es"
                          value={categoryForm.name_es}
                          onChange={(e) => setCategoryForm(prev => ({ ...prev, name_es: e.target.value }))}
                          placeholder="Nombre en español"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category-name-de">Name (German)</Label>
                        <Input
                          id="category-name-de"
                          value={categoryForm.name_de}
                          onChange={(e) => setCategoryForm(prev => ({ ...prev, name_de: e.target.value }))}
                          placeholder="Name auf Deutsch"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category-name-fr">Name (French)</Label>
                        <Input
                          id="category-name-fr"
                          value={categoryForm.name_fr}
                          onChange={(e) => setCategoryForm(prev => ({ ...prev, name_fr: e.target.value }))}
                          placeholder="Nom en français"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="category-desc-en">Description (English)</Label>
                      <Textarea
                        id="category-desc-en"
                        value={categoryForm.description}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter category description in English"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="category-desc-es">Description (Spanish)</Label>
                        <Textarea
                          id="category-desc-es"
                          value={categoryForm.description_es}
                          onChange={(e) => setCategoryForm(prev => ({ ...prev, description_es: e.target.value }))}
                          placeholder="Descripción en español"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category-desc-de">Description (German)</Label>
                        <Textarea
                          id="category-desc-de"
                          value={categoryForm.description_de}
                          onChange={(e) => setCategoryForm(prev => ({ ...prev, description_de: e.target.value }))}
                          placeholder="Beschreibung auf Deutsch"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category-desc-fr">Description (French)</Label>
                        <Textarea
                          id="category-desc-fr"
                          value={categoryForm.description_fr}
                          onChange={(e) => setCategoryForm(prev => ({ ...prev, description_fr: e.target.value }))}
                          placeholder="Description en français"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category-image">Category Image</Label>
                        <Input
                          id="category-image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) setCategoryForm(prev => ({ ...prev, image: file }))
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="category-order">Order Position</Label>
                        <Input
                          id="category-order"
                          type="number"
                          value={categoryForm.order_position}
                          onChange={(e) => setCategoryForm(prev => ({ ...prev, order_position: parseInt(e.target.value) || 1 }))}
                          min="1"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={editingCategory ? () => handleUpdateCategory(editingCategory) : handleAddCategory}
                        disabled={loading}
                      >
                        {loading ? 'Processing...' : editingCategory ? 'Update Category' : 'Add Category'}
                      </Button>
                      {editingCategory && (
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setEditingCategory(null)
                            setCategoryForm({
                              name: '',
                              name_es: '',
                              name_de: '',
                              name_fr: '',
                              description: '',
                              description_es: '',
                              description_de: '',
                              description_fr: '',
                              slug: '',
                              image: null,
                              image_alt: '',
                              image_alt_es: '',
                              image_alt_de: '',
                              image_alt_fr: '',
                              order_position: categories.length + 1
                            })
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Categories List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {categories.map(category => (
                        <div key={category.id} className="border rounded-lg p-4 flex justify-between items-start">
                          <div>
                             <h3 className="font-semibold">{category.name}</h3>
                             <p className="text-sm text-gray-600">{category.slug}</p>
                             <p className="text-sm mt-1">{category.description}</p>
                             <p className="text-xs text-gray-500 mt-2">Order: {category.order_position}</p>
                           </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => startEditCategory(category)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteCategory(category.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Subcategories Section */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{editingSubcategory ? 'Edit Subcategory' : 'Add New Subcategory'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="subcategory-category">Parent Category</Label>
                      <select
                        id="subcategory-category"
                        value={subcategoryForm.category_id}
                        onChange={(e) => setSubcategoryForm(prev => ({ ...prev, category_id: e.target.value }))}
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select parent category</option>
                         {categories.map(cat => (
                           <option key={cat.id} value={cat.id}>{cat.name}</option>
                         ))}
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subcategory-name-en">Name (English)</Label>
                        <Input
                          id="subcategory-name-en"
                          value={subcategoryForm.name}
                          onChange={(e) => setSubcategoryForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter subcategory name in English"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subcategory-slug">Slug</Label>
                        <Input
                          id="subcategory-slug"
                          value={subcategoryForm.slug}
                          onChange={(e) => setSubcategoryForm(prev => ({ ...prev, slug: e.target.value }))}
                          placeholder="subcategory-slug"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="subcategory-desc-en">Description (English)</Label>
                      <Textarea
                        id="subcategory-desc-en"
                        value={subcategoryForm.description}
                        onChange={(e) => setSubcategoryForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter subcategory description in English"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subcategory-image">Subcategory Image</Label>
                        <Input
                          id="subcategory-image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) setSubcategoryForm(prev => ({ ...prev, image: file }))
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subcategory-order">Order Position</Label>
                        <Input
                          id="subcategory-order"
                          type="number"
                          value={subcategoryForm.order_position}
                          onChange={(e) => setSubcategoryForm(prev => ({ ...prev, order_position: parseInt(e.target.value) || 1 }))}
                          min="1"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={editingSubcategory ? () => handleUpdateSubcategory(editingSubcategory) : handleAddSubcategory}
                        disabled={loading}
                      >
                        {loading ? 'Processing...' : editingSubcategory ? 'Update Subcategory' : 'Add Subcategory'}
                      </Button>
                      {editingSubcategory && (
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setEditingSubcategory(null)
                            setSubcategoryForm({
                              name: '',
                              name_es: '',
                              name_de: '',
                              name_fr: '',
                              description: '',
                              description_es: '',
                              description_de: '',
                              description_fr: '',
                              slug: '',
                              category_id: '',
                              image: null,
                              image_alt: '',
                              image_alt_es: '',
                              image_alt_de: '',
                              image_alt_fr: '',
                              order_position: subcategories.length + 1
                            })
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Subcategories List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {subcategories.map(subcategory => {
                        const parentCategory = categories.find(cat => cat.id === subcategory.category_id)
                        return (
                          <div key={subcategory.id} className="border rounded-lg p-4 flex justify-between items-start">
                             <div>
                               <h3 className="font-semibold">{subcategory.name}</h3>
                               <p className="text-sm text-gray-600">{parentCategory?.name} → {subcategory.slug}</p>
                               <p className="text-sm mt-1">{subcategory.description}</p>
                               <p className="text-xs text-gray-500 mt-2">Order: {subcategory.order_position}</p>
                             </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => startEditSubcategory(subcategory)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteSubcategory(subcategory.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Carousel Tab */}
          <TabsContent value="carousel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingCarousel ? 'Edit Carousel Image' : 'Add New Carousel Image'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="carousel-title">Title</Label>
                    <Input
                      id="carousel-title"
                      value={carouselForm.title}
                      onChange={(e) => setCarouselForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter carousel title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="carousel-order">Order Position</Label>
                    <Input
                      id="carousel-order"
                      type="number"
                      value={carouselForm.order_position}
                      onChange={(e) => setCarouselForm(prev => ({ ...prev, order_position: parseInt(e.target.value) || 1 }))}
                      min="1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="carousel-subtitle">Subtitle (Optional)</Label>
                  <Input
                    id="carousel-subtitle"
                    value={carouselForm.subtitle}
                    onChange={(e) => setCarouselForm(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="Enter carousel subtitle"
                  />
                </div>
                
                <div>
                  <Label htmlFor="carousel-image">Carousel Image</Label>
                  <Input
                    id="carousel-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file, 'carousel')
                    }}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={editingCarousel ? () => handleUpdateCarousel(editingCarousel) : handleAddCarousel}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : editingCarousel ? 'Update Image' : 'Add Image'}
                  </Button>
                  {editingCarousel && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditingCarousel(null)
                        setCarouselForm({
                          title: '',
                          subtitle: '',
                          image: null,
                          order_position: carouselImages.length + 1
                        })
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Carousel Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {carouselImages.map(carousel => (
                    <div key={carousel.id} className="border rounded-lg p-4 flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{carousel.title}</h3>
                        {carousel.subtitle && <p className="text-sm text-gray-600">{carousel.subtitle}</p>}
                        <p className="text-xs text-gray-500 mt-2">Order: {carousel.order_position}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => startEditCarousel(carousel)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteCarousel(carousel.id)}>
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
    </div>
  )
}