import { redirect } from 'next/navigation';

export default function BowlsProductRedirect({
  params
}: {
  params: { product: string }
}) {
  // Redirect bowls products to sugarcane-bowls
  redirect(`/products/sugarcane-bowls/${params.product}`);
}

// Generate static params for known bowl products
export async function generateStaticParams() {
  const bowlProducts = [
    '12oz',
    '16oz', 
    '260ml',
    '350ml',
    '500ml',
    '6-inch',
    '650ml'
  ];

  return bowlProducts.map((product) => ({
    product: product
  }));
}