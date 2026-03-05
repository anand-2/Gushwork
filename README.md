# Premium HDPE Pipes - Product Page

A fully responsive product landing page with sticky header and interactive image carousel built with vanilla HTML, CSS, and JavaScript.

## Features

### ✨ Sticky Header
- **Dynamic Scroll Behavior**: Header appears smoothly when scrolling beyond the first fold
- **Smart Navigation**: Positions above the main navbar without covering content
- **Smooth Transitions**: Uses CSS animations for elegant show/hide effects
- **Auto-hide**: Disappears when scrolling back to the top
- **Throttled Scroll Events**: Optimized performance using requestAnimationFrame

### 🖼️ Image Carousel
- **Interactive Navigation**: Previous/Next buttons with hover effects
- **Thumbnail Selection**: Select images directly from thumbnail gallery
- **Smooth Transitions**: Fade effects between image changes
- **Keyboard Support**: Arrow keys (← →) to navigate
- **Touch Support**: Swipe gestures on mobile devices
- **Scrollable Thumbnails**: Horizontal scroll for additional images

### 🔍 Image Zoom
- **Hover Zoom**: Displays zoomed preview on mouse hover
- **Smooth Gradient Overlay**: Visual feedback showing zoom focus point
- **Performance Optimized**: Uses CSS transforms for 60fps animations
- **Touch-friendly**: Disables on mobile, provides alternative UX

### 📱 Responsive Design
- **Desktop**: Full-width layout with two-column grid (1200px+)
- **Tablet**: Single column layout (768px - 1199px)
- **Mobile**: Optimized for small screens (480px - 767px)
- **Extra Small**: Support for devices under 480px
- **Flexible Grid**: Uses CSS Grid for responsive layouts
- **Touch-optimized**: Larger buttons and touch targets for mobile

### ♿ Accessibility
- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Focus States**: Visible focus indicators for keyboard users
- **Alt Text**: Descriptive alt attributes on all images
- **Color Contrast**: WCAG compliant color combinations

### 🎨 Design Elements
- **Color Scheme**: Professional purple and orange palette
- **Typography**: Clean, modern font stack
- **Certifications**: BIS, ISO, and CE certified badges
- **Product Features**: Highlighted with checkmark icons
- **Shipping Info**: Clear warnings and information badges
- **Trust Section**: Brand logos and company trust indicators

## File Structure

```
├── index.html        # HTML structure and markup
├── styles.css        # Complete styling and responsive breakpoints
├── script.js         # JavaScript functionality
└── README.md         # This file
```

## Technologies

- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, CSS Custom Properties, Animations
- **Vanilla JavaScript**: No frameworks or libraries
- **Responsive Design**: Mobile-first approach

## How to Use

### 1. Open the Page
Simply open `index.html` in any modern web browser:
```bash
# On Windows
start index.html

# On Mac
open index.html

# Or drag and drop to browser
```

### 2. Navigate the Carousel
- **Previous/Next Buttons**: Click arrows on either side of the main image
- **Thumbnail Selection**: Click any thumbnail to jump to that image
- **Keyboard Navigation**: Use arrow keys (← →) on desktop
- **Touch/Swipe**: Swipe left/right on mobile devices

### 3. View Zoom Preview
- **Hover Effect**: Move mouse over the main image to see zoom preview
- **Focus Point**: The radial gradient indicates the zoom center point
- **Smooth Animation**: Zoom fade in/out smoothly

### 4. Sticky Header
- **Auto-appear**: Scroll down past the first viewport height
- **Auto-hide**: Scroll back up to the top section
- **Navigation**: Click links in sticky header for smooth scroll
- **Content Below**: Header stays above all page content

## Responsive Breakpoints

```css
Desktop (1200px+)      - Full two-column layout
Tablet (768-1199px)    - Single column, adjusted spacing
Mobile (480-767px)     - Touch-optimized, smaller elements
Extra Small (<480px)   - Minimal spacing, stacked layout
```

## CSS Variables

The design system uses CSS custom properties for easy theming:

```css
--primary-color: #5b3dbf        /* Main brand color */
--primary-dark: #4a2fa1         /* Darker variant */
--accent-color: #ff6b35         /* Accent orange */
--text-color: #1a1a1a           /* Primary text */
--text-light: #666              /* Secondary text */
--border-color: #e0e0e0         /* Borders */
--bg-light: #f9f9f9             /* Light background */

--spacing-xs: 8px               /* Extra small */
--spacing-sm: 16px              /* Small */
--spacing-md: 24px              /* Medium */
--spacing-lg: 32px              /* Large */
--spacing-xl: 48px              /* Extra large */

--transition-smooth: 0.3s       /* Standard animation */
--transition-smooth-fast: 0.2s  /* Quick animation */
```

## Browser Support

- **Chrome**: Latest versions
- **Firefox**: Latest versions
- **Safari**: Latest versions (iOS 12+)
- **Edge**: Latest versions

## Performance Features

- **Lazy Loading**: Images load only when needed
- **Throttled Scroll**: Optimized scroll event handling
- **CSS Transforms**: GPU-accelerated animations
- **No External Dependencies**: Lightweight and fast
- **Responsive Images**: Optimized image loading

## Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #your-color;
    --accent-color: #your-accent;
}
```

### Update Images
Replace image URLs in `script.js`:
```javascript
const images = [
    'your-image-url-1.jpg',
    'your-image-url-2.jpg',
    // ...
];
```

### Adjust Breakpoints
Modify media queries in `styles.css` for different responsive behavior.

### Customize Animations
Change transition values in CSS variables:
```css
--transition-smooth: 0.5s /* Slower animation */
```

## JavaScript Events

The page includes event listeners for:
- `scroll` - Sticky header toggle
- `click` - Carousel navigation and thumbnail selection
- `mousemove` - Zoom preview positioning
- `keydown` - Keyboard navigation
- `touchstart/touchend` - Mobile swipe gestures
- `resize` - Responsive calculations

## Code Quality

- ✅ No console errors
- ✅ Semantic HTML
- ✅ BEM-style CSS naming
- ✅ Clean, commented JavaScript
- ✅ WCAG accessibility standards
- ✅ Page Speed optimized

## Tips for Best Experience

1. **Desktop**: Use arrow keys for carousel navigation
2. **Mobile**: Swipe across images for rotation
3. **Tablet**: Mix of touch and mouse input works smoothly
4. **Keyboard**: Tab through elements for full keyboard navigation
5. **Accessibility**: All features work without mouse

## Future Enhancements

Potential additions without changing core architecture:
- Image lightbox with full-screen view
- Add to cart functionality
- Customer reviews section
- Product specifications modal
- Live product availability
- Video autoplay support

## License

Free to use and modify for any purpose.

---

**Created**: 2026
**Last Updated**: March 2026
