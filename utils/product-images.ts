// Utility to generate aluminum foil container image paths with complete product catalog

export interface ProductImage {
  code: string;
  name: string;
  path: string;
  images: string[];
  category: 'smoothwall' | 'wrinklewall';
  shape: 'rectangle' | 'round' | 'square';
  type: string;
}

export function getAluminumContainerImages(): ProductImage[] {
  const baseUrl = '/product_img/Aluminum-Foil-Container';
  
  // Smoothwall Rectangle containers
  const smoothwallRectangleCodes = [
    'C161-320', 'C161-475', 'C161-680', 'C166-200', 'C167-360', 
    'C184-580', 'C184-750', 'C184-930', 'C220-1050', 'C221-1025', 
    'C221-1400', 'C221-1800'
  ];

  // Smoothwall Round containers
  const smoothwallRoundCodes = [
    'Y120-290', 'Y180-920', 'Y180-1130', 'Y180-1370', 'Y208-1430', 
    'Y250-2000', 'Y250-2500', 'Y250-3000', 'Y250-3500'
  ];

  // Wrinklewall Rectangle containers
  const wrinklewallRectangleCodes = [
    'C130', 'C142', 'C144', 'C148', 'C154', 'C165', 'C175', 'C184', 
    'C185', 'C195', 'C2', 'C205', 'C2051', 'C209', 'C214', 'C216', 
    'C220', 'C239', 'C3', 'C312', 'C314', 'C320', 'C337', 'C350', 
    'C370', 'C4', 'C430', 'C526'
  ];

  // Wrinklewall Round containers
  const wrinklewallRoundCodes = [
    'Y120', 'Y140', 'Y176', 'Y183', 'Y1843', 'Y212', 'Y214', 'Y234', 
    'Y252', 'Y292', 'Y328', 'Y340', 'Y345', 'Y380'
  ];

  // Wrinklewall Square containers
  const wrinklewallSquareCodes = [
    'F160', 'F205'
  ];

  // Helper function to get all webp image variations for a product
  const getProductImages = (code: string, category: string, shape: string): string[] => {
    const basePath = category === 'smoothwall' 
      ? `${baseUrl}/Smoothwall-Aluminum-Foil-Container/${shape.charAt(0).toUpperCase() + shape.slice(1)}`
      : `${baseUrl}/Wrinklewall-Aluminum-foil-container/${shape}`;
    
    const lowerCode = code.toLowerCase();
    const images: string[] = [];
    
    // Different products have different image naming patterns
    // We'll generate all possible variations and let the browser handle 404s
    
    if (code === 'C239') {
      // Special case for C239 which has c239-1.webp, c239-2.webp, c239-3.webp
      images.push(
        `${basePath}/${code}/${lowerCode}-1.webp`,
        `${basePath}/${code}/${lowerCode}-2.webp`,
        `${basePath}/${code}/${lowerCode}-3.webp`
      );
    } else if (code === 'C312') {
      // Special case for C312 which has c312-1.webp, c312-2.webp, c312-3.webp
      images.push(
        `${basePath}/${code}/${lowerCode}-1.webp`,
        `${basePath}/${code}/${lowerCode}-2.webp`,
        `${basePath}/${code}/${lowerCode}-3.webp`
      );
    } else {
      // Standard pattern: main image, -2, -3
      images.push(`${basePath}/${code}/${lowerCode}.webp`);
      images.push(`${basePath}/${code}/${lowerCode}-2.webp`);
      images.push(`${basePath}/${code}/${lowerCode}-3.webp`);
    }
    
    return images;
  };

  const products: ProductImage[] = [];

  // Add Smoothwall Rectangle products
  smoothwallRectangleCodes.forEach(code => {
    const images = getProductImages(code, 'smoothwall', 'rectangle');
    products.push({
      code,
      name: `Smoothwall Rectangle ${code}`,
      path: images[0], // Main image
      images,
      category: 'smoothwall',
      shape: 'rectangle',
      type: 'smoothwall-rectangle'
    });
  });

  // Add Smoothwall Round products
  smoothwallRoundCodes.forEach(code => {
    const images = getProductImages(code, 'smoothwall', 'round');
    products.push({
      code,
      name: `Smoothwall Round ${code}`,
      path: images[0], // Main image
      images,
      category: 'smoothwall',
      shape: 'round',
      type: 'smoothwall-round'
    });
  });

  // Add Wrinklewall Rectangle products
  wrinklewallRectangleCodes.forEach(code => {
    const images = getProductImages(code, 'wrinklewall', 'rectangle');
    products.push({
      code,
      name: `Wrinklewall Rectangle ${code}`,
      path: images[0], // Main image
      images,
      category: 'wrinklewall',
      shape: 'rectangle',
      type: 'wrinklewall-rectangle'
    });
  });

  // Add Wrinklewall Round products
  wrinklewallRoundCodes.forEach(code => {
    const images = getProductImages(code, 'wrinklewall', 'round');
    products.push({
      code,
      name: `Wrinklewall Round ${code}`,
      path: images[0], // Main image
      images,
      category: 'wrinklewall',
      shape: 'round',
      type: 'wrinklewall-round'
    });
  });

  // Add Wrinklewall Square products
  wrinklewallSquareCodes.forEach(code => {
    const images = getProductImages(code, 'wrinklewall', 'square');
    products.push({
      code,
      name: `Wrinklewall Square ${code}`,
      path: images[0], // Main image
      images,
      category: 'wrinklewall',
      shape: 'square',
      type: 'wrinklewall-square'
    });
  });

  return products;
}

// Get all available product images for aluminum containers
export function getAllAluminumContainerProductImages(): ProductImage[] {
  return getAluminumContainerImages();
}

// Get products by category (smoothwall/wrinklewall)
export function getProductsByCategory(category: 'smoothwall' | 'wrinklewall'): ProductImage[] {
  return getAluminumContainerImages().filter(product => product.category === category);
}

// Get products by category and shape
export function getProductsByCategoryAndShape(
  category: 'smoothwall' | 'wrinklewall', 
  shape: 'rectangle' | 'round' | 'square'
): ProductImage[] {
  return getAluminumContainerImages().filter(
    product => product.category === category && product.shape === shape
  );
}

// Get available shapes for a category
export function getAvailableShapes(category: 'smoothwall' | 'wrinklewall'): string[] {
  const products = getProductsByCategory(category);
  const shapeSet = new Set(products.map(p => p.shape));
  const shapes = Array.from(shapeSet);
  return shapes.sort();
}

// Get product by code
export function getProductByCode(code: string): ProductImage | undefined {
  return getAluminumContainerImages().find(product => product.code === code);
}

// Helper function to dynamically detect available webp images for a product
export function getAvailableProductImages(product: ProductImage): string[] {
  // Return all possible images - the client-side code will handle image loading errors
  return product.images;
}