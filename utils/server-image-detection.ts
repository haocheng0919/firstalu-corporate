// Server-side utility to detect available WebP images for products
import fs from 'fs';
import path from 'path';

export interface ProductImageInfo {
  code: string;
  availableImages: string[];
  totalCount: number;
}

// Get all available WebP images for a specific product
export function getAvailableWebPImages(
  category: 'smoothwall' | 'wrinklewall',
  shape: 'rectangle' | 'round' | 'square',
  productCode: string
): ProductImageInfo {
  const publicDir = path.join(process.cwd(), 'public');
  const baseUrl = '/product_img/Aluminum-Foil-Container';
  
  // Construct the folder path
  const folderPath = category === 'smoothwall' 
    ? `Smoothwall-Aluminum-Foil-Container/${shape.charAt(0).toUpperCase() + shape.slice(1)}`
    : `Wrinklewall-Aluminum-foil-container/${shape}`;
  
  const productDir = path.join(publicDir, 'product_img', 'Aluminum-Foil-Container', folderPath, productCode);
  
  const availableImages: string[] = [];
  
  try {
    if (fs.existsSync(productDir)) {
      const files = fs.readdirSync(productDir);
      
      // Filter for WebP files and sort them properly
      const webpFiles = files
        .filter(file => file.endsWith('.webp'))
        .sort((a, b) => {
          // Extract numbers from filenames for proper sorting
          const getNumber = (filename: string) => {
            const match = filename.match(/-(\d+)\.webp$/);
            return match ? parseInt(match[1]) : 0;
          };
          
          const aNum = getNumber(a);
          const bNum = getNumber(b);
          
          // Files without numbers (main image) come first
          if (aNum === 0 && bNum === 0) return a.localeCompare(b);
          if (aNum === 0) return -1;
          if (bNum === 0) return 1;
          
          return aNum - bNum;
        });
      
      // Convert to full URLs
      webpFiles.forEach(file => {
        availableImages.push(`${baseUrl}/${folderPath}/${productCode}/${file}`);
      });
    }
  } catch (error) {
    console.error(`Error reading directory for product ${productCode}:`, error);
  }
  
  return {
    code: productCode,
    availableImages,
    totalCount: availableImages.length
  };
}

// Get image info for all products (for pre-generation)
export function getAllProductImageInfo(): ProductImageInfo[] {
  const products = [
    // Smoothwall Rectangle
    ...['C161-320', 'C161-475', 'C161-680', 'C166-200', 'C167-360', 'C184-580', 'C184-750', 'C184-930', 'C220-1050', 'C221-1025', 'C221-1400', 'C221-1800']
      .map(code => getAvailableWebPImages('smoothwall', 'rectangle', code)),
    
    // Smoothwall Round
    ...['Y120-290', 'Y180-920', 'Y180-1130', 'Y180-1370', 'Y208-1430', 'Y250-2000', 'Y250-2500', 'Y250-3000', 'Y250-3500']
      .map(code => getAvailableWebPImages('smoothwall', 'round', code)),
    
    // Wrinklewall Rectangle
    ...['C130', 'C142', 'C144', 'C148', 'C154', 'C165', 'C175', 'C184', 'C185', 'C195', 'C2', 'C205', 'C2051', 'C209', 'C214', 'C216', 'C220', 'C239', 'C3', 'C312', 'C314', 'C320', 'C337', 'C350', 'C370', 'C4', 'C430', 'C526']
      .map(code => getAvailableWebPImages('wrinklewall', 'rectangle', code)),
    
    // Wrinklewall Round
    ...['Y120', 'Y140', 'Y176', 'Y183', 'Y1843', 'Y212', 'Y214', 'Y234', 'Y252', 'Y292', 'Y328', 'Y340', 'Y345', 'Y380']
      .map(code => getAvailableWebPImages('wrinklewall', 'round', code)),
    
    // Wrinklewall Square
    ...['F160', 'F205']
      .map(code => getAvailableWebPImages('wrinklewall', 'square', code))
  ];
  
  return products.filter(product => product.totalCount > 0);
}