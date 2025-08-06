// Product categories and products structure
export interface Category {
  id: string
  name: string
  slug: string
  products: ProductItem[]
}

export interface ProductItem {
  id: string
  name: string
  slug: string
  categoryId: string
}

// Static data for the specific categories and products
export const PRODUCT_CATEGORIES: Category[] = [
  {
    id: 'aluminum-foil-containers',
    name: 'Aluminum Foil Containers',
    slug: 'aluminum-foil-containers',
    products: [
      { id: 'wrinklewall-rectangle', name: 'Wrinklewall Aluminum Foil Container Rectangle', slug: 'wrinklewall-rectangle', categoryId: 'aluminum-foil-containers' },
      { id: 'wrinklewall-square', name: 'Wrinklewall Aluminum Foil Container Square', slug: 'wrinklewall-square', categoryId: 'aluminum-foil-containers' },
      { id: 'wrinklewall-round', name: 'Wrinklewall Aluminum Foil Container Round', slug: 'wrinklewall-round', categoryId: 'aluminum-foil-containers' },
      { id: 'smoothwall-rectangle', name: 'Smoothwall Aluminum Foil Container Rectangle', slug: 'smoothwall-rectangle', categoryId: 'aluminum-foil-containers' },
      { id: 'smoothwall-round', name: 'Smoothwall Aluminum Foil Container Round', slug: 'smoothwall-round', categoryId: 'aluminum-foil-containers' },
      { id: 'shrink-packaging-color-label', name: 'Aluminum Foil Container in Shrink Packaging with Color Label', slug: 'shrink-packaging-color-label', categoryId: 'aluminum-foil-containers' }
    ]
  },
  {
    id: 'kitchen-baking-papers',
    name: 'Kitchen & Baking Papers',
    slug: 'kitchen-baking-papers',
    products: [
      { id: 'kitchen-foil', name: 'Kitchen Foil', slug: 'kitchen-foil', categoryId: 'kitchen-baking-papers' },
      { id: 'baking-paper', name: 'Baking Paper', slug: 'baking-paper', categoryId: 'kitchen-baking-papers' }
    ]
  },
  {
    id: 'paper-cups-drink-cups',
    name: 'Paper Cups & Drink Cups',
    slug: 'paper-cups-drink-cups',
    products: [
      { id: 'single-wall-paper-cups', name: 'Single Wall Paper Cups', slug: 'single-wall-paper-cups', categoryId: 'paper-cups-drink-cups' },
      { id: 'single-wall-paper-cups-hotels', name: 'Single Wall Paper Cups for Hotels', slug: 'single-wall-paper-cups-hotels', categoryId: 'paper-cups-drink-cups' },
      { id: 'printed-single-wall-paper-cups', name: 'Printed Single Wall Paper Cups (Lids)', slug: 'printed-single-wall-paper-cups', categoryId: 'paper-cups-drink-cups' },
      { id: 'cold-drink-cups', name: 'Cold Drink Cups (Double Sides PE Lined)', slug: 'cold-drink-cups', categoryId: 'paper-cups-drink-cups' },
      { id: 'double-wall-paper-cups', name: 'Double Wall Paper Cups', slug: 'double-wall-paper-cups', categoryId: 'paper-cups-drink-cups' },
      { id: 'ripple-wall-paper-cups', name: 'Ripple Wall Paper Cups', slug: 'ripple-wall-paper-cups', categoryId: 'paper-cups-drink-cups' }
    ]
  },
  {
    id: 'kraft-packaging',
    name: 'Kraft Packaging',
    slug: 'kraft-packaging',
    products: [
      { id: 'round-kraft-soup-cups', name: 'Round Kraft Soup Cups (Lids)', slug: 'round-kraft-soup-cups', categoryId: 'kraft-packaging' },
      { id: 'round-kraft-salad-bowls', name: 'Round Kraft Salad Bowls (Lids)', slug: 'round-kraft-salad-bowls', categoryId: 'kraft-packaging' },
      { id: 'round-kraft-deli-bowls', name: 'Round Kraft Deli Bowls (Lids)', slug: 'round-kraft-deli-bowls', categoryId: 'kraft-packaging' },
      { id: 'take-away-kraft-boxes', name: 'Take Away Kraft Boxes (PE Lined)', slug: 'take-away-kraft-boxes', categoryId: 'kraft-packaging' },
      { id: 'kraft-trays', name: 'Kraft Trays (PE Lined)', slug: 'kraft-trays', categoryId: 'kraft-packaging' }
    ]
  },
  {
    id: 'wooden-disposable-tableware',
    name: 'Wooden Disposable Tableware',
    slug: 'wooden-disposable-tableware',
    products: [
      { id: 'wooden-spoon', name: 'Wooden Spoon', slug: 'wooden-spoon', categoryId: 'wooden-disposable-tableware' },
      { id: 'wooden-knife', name: 'Wooden Knife', slug: 'wooden-knife', categoryId: 'wooden-disposable-tableware' },
      { id: 'wooden-fork', name: 'Wooden Fork', slug: 'wooden-fork', categoryId: 'wooden-disposable-tableware' },
      { id: 'wooden-spork', name: 'Wooden Spork', slug: 'wooden-spork', categoryId: 'wooden-disposable-tableware' },
      { id: 'wooden-coffee-stirrers', name: 'Wooden Coffee Stirrers', slug: 'wooden-coffee-stirrers', categoryId: 'wooden-disposable-tableware' },
      { id: 'wooden-ice-cream-sticks', name: 'Wooden Ice-cream Sticks', slug: 'wooden-ice-cream-sticks', categoryId: 'wooden-disposable-tableware' },
      { id: 'wooden-ice-cream-spoon', name: 'Wooden Ice-cream Spoon', slug: 'wooden-ice-cream-spoon', categoryId: 'wooden-disposable-tableware' }
    ]
  },
  {
    id: 'bamboo-disposable-tableware',
    name: 'Bamboo Disposable Tableware',
    slug: 'bamboo-disposable-tableware',
    products: [
      { id: 'bamboo-fork-spoon-knife', name: 'Bamboo Fork, Spoon & Knife', slug: 'bamboo-fork-spoon-knife', categoryId: 'bamboo-disposable-tableware' },
      { id: 'bamboo-chopsticks', name: 'Bamboo Chopsticks', slug: 'bamboo-chopsticks', categoryId: 'bamboo-disposable-tableware' }
    ]
  }
]

// Helper functions
export function getAllCategories(): Category[] {
  return PRODUCT_CATEGORIES
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return PRODUCT_CATEGORIES.find(category => category.slug === slug)
}

export function getProductsByCategory(categorySlug: string): ProductItem[] {
  const category = getCategoryBySlug(categorySlug)
  return category ? category.products : []
}

export function getProductBySlug(productSlug: string): ProductItem | undefined {
  for (const category of PRODUCT_CATEGORIES) {
    const product = category.products.find(p => p.slug === productSlug)
    if (product) return product
  }
  return undefined
}

export function getAllProducts(): ProductItem[] {
  return PRODUCT_CATEGORIES.flatMap(category => category.products)
}