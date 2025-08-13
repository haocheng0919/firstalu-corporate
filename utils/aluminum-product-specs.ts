// Detailed specifications for all aluminum foil container products

export interface ProductSpecification {
  code: string;
  pcsPerCarton: number;
  top: string;
  bottom: string;
  height: string;
  volume?: string;
  description: string;
  applications: string[];
  additionalInfo?: string;
}

export const aluminumProductSpecs: Record<string, ProductSpecification> = {
  // Smoothwall Rectangle products
  'C161-320': {
    code: 'C161-320',
    pcsPerCarton: 1000,
    top: '161×111mm',
    bottom: '140×90mm',
    height: '28mm',
    volume: '320ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers', 
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'C161-475': {
    code: 'C161-475',
    pcsPerCarton: 1000,
    top: '161×111mm',
    bottom: '137×88mm',
    height: '38mm',
    volume: '475ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'C161-680': {
    code: 'C161-680',
    pcsPerCarton: 1000,
    top: '161×111mm',
    bottom: '135×85mm',
    height: '54mm',
    volume: '680ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'C166-200': {
    code: 'C166-200',
    pcsPerCarton: 1000,
    top: '166×65mm',
    bottom: '149×48mm',
    height: '28mm',
    volume: '200ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'C167-360': {
    code: 'C167-360',
    pcsPerCarton: 1000,
    top: '167×104mm',
    bottom: '126×63mm',
    height: '33mm',
    volume: '360ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'C184-580': {
    code: 'C184-580',
    pcsPerCarton: 1000,
    top: '184×128mm',
    bottom: '160×104mm',
    height: '34mm',
    volume: '580ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'C184-750': {
    code: 'C184-750',
    pcsPerCarton: 1000,
    top: '184×128mm',
    bottom: '157×101mm',
    height: '45mm',
    volume: '750ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'C184-930': {
    code: 'C184-930',
    pcsPerCarton: 1000,
    top: '184×128mm',
    bottom: '154×98mm',
    height: '57mm',
    volume: '930ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'C220-1050': {
    code: 'C220-1050',
    pcsPerCarton: 500,
    top: '220×150mm',
    bottom: '189×119mm',
    height: '45mm',
    volume: '1050ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'C221-1025': {
    code: 'C221-1025',
    pcsPerCarton: 500,
    top: '221×168mm',
    bottom: '183×130mm',
    height: '35mm',
    volume: '1025ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'C221-1400': {
    code: 'C221-1400',
    pcsPerCarton: 500,
    top: '221×168mm',
    bottom: '183×130mm',
    height: '56mm',
    volume: '1400ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'C221-1800': {
    code: 'C221-1800',
    pcsPerCarton: 500,
    top: '221×168mm',
    bottom: '178×125mm',
    height: '75mm',
    volume: '1800ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },

  // Smoothwall Round products
  'Y120-290': {
    code: 'Y120-290',
    pcsPerCarton: 1000,
    top: '120mm',
    bottom: '98mm',
    height: '36mm',
    volume: '290ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'Y180-920': {
    code: 'Y180-920',
    pcsPerCarton: 500,
    top: '180mm',
    bottom: '150mm',
    height: '47mm',
    volume: '920ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'Y180-1130': {
    code: 'Y180-1130',
    pcsPerCarton: 500,
    top: '180mm',
    bottom: '147mm',
    height: '60mm',
    volume: '1130ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'Y180-1370': {
    code: 'Y180-1370',
    pcsPerCarton: 500,
    top: '180mm',
    bottom: '141mm',
    height: '80mm',
    volume: '1370ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'Y208-1430': {
    code: 'Y208-1430',
    pcsPerCarton: 500,
    top: '208×197mm',
    bottom: '154mm',
    height: '65mm',
    volume: '1430ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'Y250-2000': {
    code: 'Y250-2000',
    pcsPerCarton: 200,
    top: '250mm',
    bottom: '212mm',
    height: '56mm',
    volume: '2000ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'Y250-2500': {
    code: 'Y250-2500',
    pcsPerCarton: 200,
    top: '250mm',
    bottom: '209mm',
    height: '68mm',
    volume: '2500ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'Y250-3000': {
    code: 'Y250-3000',
    pcsPerCarton: 200,
    top: '250mm',
    bottom: '204mm',
    height: '85mm',
    volume: '3000ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  },
  'Y250-3500': {
    code: 'Y250-3500',
    pcsPerCarton: 200,
    top: '250mm',
    bottom: '201mm',
    height: '100mm',
    volume: '3500ml',
    description: 'Aluminum foil containers have many advantages, whether the food is baked, chilled, frozen, steamed, roasted or fresh the container remains odour proof, temperature resistant and easy to handle. Our containers are made from thick foil and provide best combination of features, price point, and environmental sustainability.',
    applications: [
      'Disposable bakery trays',
      'Takeaway containers',
      'Air fryer trays',
      'Airline food containers',
      'Food service or buffet pans',
      'Oven trays',
      'BBQ pans'
    ]
  }
};

// Function to get product specification by code
export function getProductSpecification(code: string): ProductSpecification | undefined {
  return aluminumProductSpecs[code];
}
