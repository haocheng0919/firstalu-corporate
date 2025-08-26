import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  params: { slug: string[] }
}

export default async function DynamicProductPage({ params }: Props) {
  const locale = 'en' // Temporary hardcoded for testing; adjust to use proper locale handling

  const slugPath = params.slug || []
  if (slugPath.length === 0) {
    return notFound()
  }

  let currentCategory: any = null
  let parentId: string | null = null
  let fullPath = []

  for (const slug of slugPath) {
    fullPath.push(slug)
    console.log(`Checking category for slug: ${slug}, parentId: ${parentId ?? 'null'}`);
    let query = supabase
      .from('categories')
      .select('id, slug, name_i18n, parent_id')
      .eq('slug', slug)

    if (parentId === null) {
      query = query.is('parent_id', null)
    } else {
      query = query.eq('parent_id', parentId)
    }

    const { data, error } = await query.single()

    if (error || !data) {
      console.log(`No category found, checking product for slug: ${slug}, category_id: ${parentId}`);
      if (parentId === null) return notFound()

      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('id, slug, name_i18n, images')
        .eq('slug', slug)
        .eq('category_id', parentId)
        .single()

      if (productError || !productData) {
        console.log(`No product found`);
        return notFound()
      }

      console.log(`Found product: ${productData.id}`);
      // Render product detail
      return (
        <div>
          <h1>{productData.name_i18n?.[locale] || productData.slug}</h1>
          {productData.images?.gallery?.map((img: string, index: number) => (
            <Image key={index} src={img} alt={`${productData.slug} image ${index + 1}`} width={500} height={300} />
          ))}
          {/* Add more product info */}
        </div>
      )
    }

    console.log(`Found category: ${data.id}`);
    currentCategory = data
    parentId = data.id
  }

  // If we reach here, it's a category page
  const { data: subcategories } = await supabase
    .from('categories')
    .select('id, slug, name_i18n')
    .eq('parent_id', currentCategory.id)

  const { data: products } = await supabase
    .from('products')
    .select('id, slug, name_i18n, images')
    .eq('category_id', currentCategory.id)

  return (
    <div>
      <h1>{currentCategory.name_i18n?.[locale] || currentCategory.slug}</h1>
      {/* Render subcategories */}
      {subcategories?.map(sub => (
        <Link key={sub.id} href={`/products/${fullPath.join('/')}/${sub.slug}`}>
          {sub.name_i18n?.[locale] || sub.slug}
        </Link>
      ))}
      {/* Render products */}
      {products?.map(product => (
        <div key={product.id}>
          <Link href={`/products/${fullPath.join('/')}/${product.slug}`}>
            {product.name_i18n?.[locale] || product.slug}
          </Link>
          <Image src={product.images?.thumbnail || ''} alt={product.name_i18n?.[locale] || product.slug} width={200} height={200} />
        </div>
      ))}
    </div>
  )
}