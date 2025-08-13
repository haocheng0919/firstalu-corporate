// Test script to check getProducts function in browser environment
// This script simulates the browser environment to test the getProducts function

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Replicate the exact getProducts function from supabase-service-adapted.ts
async function getProducts() {
  try {
    console.log('Fetching products...')
    
    // First, get all products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (productsError) {
      console.error('Error fetching products:', productsError)
      throw productsError
    }
    
    console.log(`Found ${products?.length || 0} products`)
    
    // Then get all i18n data
    const { data: i18nData, error: i18nError } = await supabase
      .from('product_i18n')
      .select('*')
    
    if (i18nError) {
      console.error('Error fetching i18n data:', i18nError)
      throw i18nError
    }
    
    console.log(`Found ${i18nData?.length || 0} i18n records`)
    
    // Merge products with i18n data
    const adaptedProducts = products?.map(product => {
      const i18nRecords = i18nData?.filter(i18n => i18n.product_id === product.id) || []
      
      const adapted = {
        ...product,
        name: '',
        intro: '',
        description: '',
        name_es: '',
        intro_es: '',
        description_es: '',
        name_de: '',
        intro_de: '',
        description_de: '',
        name_fr: '',
        intro_fr: '',
        description_fr: ''
      }
      
      // Apply i18n data
      i18nRecords.forEach(i18n => {
        if (i18n.locale === 'en') {
          adapted.name = i18n.name || ''
          adapted.intro = i18n.intro || ''
          adapted.description = i18n.description || ''
        } else {
          adapted[`name_${i18n.locale}`] = i18n.name || ''
          adapted[`intro_${i18n.locale}`] = i18n.intro || ''
          adapted[`description_${i18n.locale}`] = i18n.description || ''
        }
      })
      
      return adapted
    }) || []
    
    console.log('Sample adapted product:', adaptedProducts[0])
    console.log(`Returning ${adaptedProducts.length} adapted products`)
    
    return adaptedProducts
    
  } catch (error) {
    console.error('Error in getProducts:', error)
    throw error
  }
}

// Test the function
async function testGetProducts() {
  try {
    console.log('Testing getProducts function...')
    const products = await getProducts()
    console.log('\n=== RESULTS ===')
    console.log(`Total products: ${products.length}`)
    
    if (products.length > 0) {
      console.log('\nFirst 3 products:')
      products.slice(0, 3).forEach((product, index) => {
        console.log(`${index + 1}. SKU: ${product.sku}, Name: ${product.name}, Status: ${product.status}`)
      })
    }
    
  } catch (error) {
    console.error('Test failed:', error)
  }
}

testGetProducts()