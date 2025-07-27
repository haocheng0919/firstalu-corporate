# First Aluminum Technology - Company Website

A modern, responsive B2B website for First Aluminum Technology, a leading manufacturer of disposable food packaging products including meal boxes, chopsticks, and aluminum foil containers.

## Features

### 🌐 Multi-language Support
- English (Default)
- German (Deutsch)
- Spanish (Español)
- French (Français)

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Modern UI/UX with Tailwind CSS

### 🏢 Complete Business Website
- **Homepage**: Company introduction and key features
- **About**: Company story, mission, vision, and values
- **Products**: Product catalog with specifications and MOQ information
- **News**: Blog section for industry insights and company updates
- **FAQ**: Comprehensive frequently asked questions
- **Contact**: Contact form and company information

### 🎨 Modern Design Elements
- Gradient backgrounds
- Clean typography with Inter font
- Professional color scheme
- Interactive components
- Smooth animations and transitions

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React & Custom SVG
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd firstalu
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
firstalu/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── faq/               # FAQ page
│   ├── news/              # News/Blog page
│   ├── products/          # Products page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Site footer
├── messages/              # Internationalization files
│   ├── en.json           # English translations
│   ├── de.json           # German translations
│   ├── es.json           # Spanish translations
│   └── fr.json           # French translations
├── public/               # Static assets
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## Key Features

### Business Information
- **Company**: First Aluminum Technology
- **Industry**: B2B Food Packaging Manufacturing
- **Products**: Disposable meal boxes, chopsticks, aluminum foil containers
- **MOQ**: 100 boxes minimum order quantity
- **Global Shipping**: 50+ countries worldwide

### Product Categories
1. **Disposable Meal Boxes**
   - Various sizes and materials
   - Food-safe certified
   - Eco-friendly options

2. **Chopsticks**
   - Bamboo and wooden varieties
   - Bulk packaging available
   - Custom branding options

3. **Aluminum Foil Containers**
   - Multiple sizes and shapes
   - Heat-resistant
   - Recyclable materials

### Contact Information
- **Email**: info@firstaluminum.com
- **Phone**: +86 123 456 7890
- **Address**: 123 Industrial Park Road, Guangzhou, China
- **Business Hours**: Monday-Friday 8:00 AM - 6:00 PM (CST)

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Deploy with zero configuration

Alternatively, you can deploy to other platforms that support Next.js.

## Customization

### Adding New Languages
1. Create a new JSON file in the `messages/` directory
2. Add the language code to the supported locales
3. Update the language switcher in the Header component

### Modifying Content
- Update product information in `/app/products/page.tsx`
- Modify company information in `/app/about/page.tsx`
- Add new blog posts in `/app/news/page.tsx`
- Update FAQ content in `/app/faq/page.tsx`

### Styling
- Global styles: `app/globals.css`
- Tailwind configuration: `tailwind.config.js`
- Component-specific styles: Use Tailwind classes

## Performance Optimizations

- Server-side rendering with Next.js
- Optimized images and assets
- Minimal JavaScript bundle
- Fast loading times
- SEO-friendly structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is created for First Aluminum Technology. All rights reserved.

## Support

For technical support or questions about the website, please contact the development team or refer to the documentation.