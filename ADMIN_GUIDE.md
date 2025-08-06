# FirstAlu Admin Panel Guide

## Access the Admin Panel

1. Navigate to: `http://localhost:3001/admin` (or your domain `/admin`)
2. You'll be redirected to the login page
3. Use the demo credentials:
   - **Username:** `admin`
   - **Password:** `FirstAlu2024!`

## Admin Panel Features

### 1. Products Management
- **Add New Products:** Fill in product details including name, category, description, sizes, and features
- **Categories Available:**
  - Aluminum Foil Containers
  - Kitchen & Baking Papers
  - Paper Cups & Drink Cups
  - Kraft Packaging
  - Wooden Disposable Tableware
  - Bamboo Disposable Tableware
- **Image Upload:** Only WebP format images are accepted
- **Edit/Delete:** Manage existing products with edit and delete functionality

### 2. News Management
- **Add News Articles:** Create new articles with title, excerpt, content, and category
- **Categories Available:**
  - Sustainability
  - Product Launch
  - Food Safety
  - Company News
  - Industry Trends
  - Quality
- **Auto-dating:** Publication date is automatically set
- **Image Support:** Upload WebP images for articles

### 3. Homepage Carousel Management
- **Add Carousel Images:** Upload up to 5 images for the homepage hero section
- **Order Control:** Set the display order (1-5) for each image
- **Title & Subtitle:** Add overlay text for each carousel slide
- **WebP Only:** Only WebP format images are accepted for optimal performance

## Technical Details

### Authentication
- Simple session-based authentication
- Login credentials stored in the component (for demo purposes)
- Session expires when browser is closed
- Logout functionality available in header

### File Upload
- **Image Format:** Only WebP files are accepted
- **Processing:** Images are converted to base64 data URLs for storage
- **Storage:** Currently uses browser localStorage/sessionStorage (demo implementation)

### Data Storage
- **Current Implementation:** Browser state management (non-persistent)
- **Production Recommendation:** Integrate with a database (MongoDB, PostgreSQL, etc.)
- **API Integration:** Ready for backend API implementation

## Security Considerations

### For Production Use:
1. **Change Default Credentials:** Update username/password in production
2. **Implement Proper Authentication:** Use JWT tokens or server sessions
3. **Database Storage:** Replace state management with proper database
4. **File Upload Security:** Implement server-side image validation
5. **HTTPS Only:** Ensure admin panel is only accessible via HTTPS
6. **Role-Based Access:** Add user roles and permissions

## Customization

### Adding New Product Categories:
Edit the `PRODUCT_CATEGORIES` array in `/app/admin/page.tsx`

### Adding New News Categories:
Edit the `NEWS_CATEGORIES` array in `/app/admin/page.tsx`

### Styling:
The admin panel uses Tailwind CSS and can be customized by modifying the classes in the component files.

## Navigation

- Access admin panel via the "Admin" link in the website footer
- Use the tab navigation to switch between Products, News, and Carousel management
- Logout button is available in the admin header

## Browser Support

- Modern browsers with JavaScript enabled
- File API support required for image uploads
- Session storage support required for authentication