# WorkFree Development Guide

## 🏗️ Architecture Overview

WorkFree is built as a modern, production-ready web application using cutting-edge technologies:

### Tech Stack

**Frontend:**
- **Framework:** Svelte 5 (latest runes, snippets, fine-grained reactivity)
- **Meta-framework:** SvelteKit 2
- **Styling:** Tailwind CSS v4+ (custom theme, no external UI libraries)
- **3D Graphics:** Three.js + Threlte (Svelte wrapper)
- **Animations:** GSAP (GreenSock), Svelte-Motion
- **Charts:** Chart.js (custom Svelte wrapper)
- **Language:** TypeScript (strict mode)

**Backend:**
- **Runtime:** Node.js (ready for Bun 1.3+ migration)
- **API:** SvelteKit API routes
- **Future:** Redis (caching/sessions), TimescaleDB (analytics), TigerBeetle (financial ledgers)

**DevOps:**
- **Build Tool:** Vite 6
- **Package Manager:** npm
- **Version Control:** Git
- **CI/CD:** GitHub Actions (ready)
- **Containerization:** Docker/Podman (ready)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.3+
- npm or pnpm
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TrillionUnicorn/WorkFree.git
   cd WorkFree
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Type-check with svelte-check
npm run check:watch  # Type-check in watch mode
```

---

## 📁 Project Structure

```
WorkFree/
├── src/
│   ├── lib/
│   │   ├── components/      # Reusable Svelte components
│   │   │   ├── Button.svelte
│   │   │   ├── Card.svelte
│   │   │   ├── Input.svelte
│   │   │   ├── Textarea.svelte
│   │   │   ├── Navigation.svelte
│   │   │   ├── Footer.svelte
│   │   │   ├── Chart.svelte
│   │   │   └── Scene3D.svelte
│   │   ├── assets/          # Static assets (images, icons)
│   │   └── index.ts         # Library exports
│   ├── routes/
│   │   ├── +layout.svelte   # Root layout (Navigation + Footer)
│   │   ├── +page.svelte     # Home page
│   │   ├── product/
│   │   │   └── +page.svelte # Product page (3D environment)
│   │   ├── pitch/
│   │   │   └── +page.svelte # Pitch deck page
│   │   ├── contact/
│   │   │   └── +page.svelte # Contact page
│   │   └── api/
│   │       ├── waitlist/
│   │       │   └── +server.ts
│   │       └── contact/
│   │           └── +server.ts
│   ├── app.css              # Global styles + Tailwind
│   ├── app.d.ts             # TypeScript declarations
│   └── app.html             # HTML template
├── static/                  # Static files (robots.txt, etc.)
├── README.md                # Project overview
├── DEVELOPMENT.md           # This file
├── ROADMAP.md               # Product roadmap
├── LICENSE                  # MIT License
├── package.json             # Dependencies
├── svelte.config.js         # SvelteKit configuration
├── vite.config.ts           # Vite configuration
└── tsconfig.json            # TypeScript configuration
```

---

## 🎨 Design System

### Color Palette

**Primary (Blue):**
- 50: #f0f9ff → 950: #082f49
- Main: #0ea5e9 (500)

**Secondary (Purple):**
- 50: #faf5ff → 950: #3b0764
- Main: #a855f7 (500)

**Accent (Pink):**
- 50: #fdf4ff → 950: #4a044e
- Main: #d946ef (500)

### Typography

- **Headings:** Bold, tracking-tight
- **Body:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Sizes:** Responsive (mobile → desktop)

### Components

All components follow Svelte 5 best practices:
- Use `$state` for reactive state
- Use `$props` for component props
- Use `$derived` for computed values
- Use `$effect` for side effects
- TypeScript interfaces for type safety

---

## 🔧 Component API

### Button

```svelte
<Button
  variant="primary|secondary|outline|ghost"
  size="sm|md|lg"
  loading={boolean}
>
  Click me
</Button>
```

### Card

```svelte
<Card
  hover={boolean}
  glass={boolean}
  class="custom-classes"
>
  Content
</Card>
```

### Input

```svelte
<Input
  label="Label"
  type="text|email|password"
  bind:value={variable}
  error="Error message"
  required
/>
```

### Chart

```svelte
<Chart
  type="line|bar|doughnut|pie|radar"
  data={chartData}
  options={chartOptions}
  height={300}
/>
```

---

## 🌐 API Routes

### POST /api/waitlist

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully joined waitlist"
}
```

### POST /api/contact

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "subject": "Demo Request",
  "message": "I'd like to schedule a demo"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

---

## 🎯 Development Guidelines

### Code Style

1. **Use Svelte 5 runes:**
   - `$state` for reactive variables
   - `$props` for component props
   - `$derived` for computed values
   - `$effect` for side effects

2. **TypeScript:**
   - Always use TypeScript
   - Define interfaces for props
   - Use strict mode

3. **Naming Conventions:**
   - Components: PascalCase (Button.svelte)
   - Variables: camelCase
   - Constants: UPPER_SNAKE_CASE
   - Files: kebab-case or PascalCase

4. **Component Structure:**
   ```svelte
   <script lang="ts">
     // Imports
     // Props
     // State
     // Derived values
     // Effects
     // Functions
   </script>

   <!-- Template -->

   <style>
     /* Scoped styles (if needed) */
   </style>
   ```

### Performance

1. **Code Splitting:**
   - Use dynamic imports for heavy components
   - Lazy load routes

2. **Image Optimization:**
   - Use WebP format
   - Implement lazy loading
   - Use appropriate sizes

3. **Bundle Size:**
   - Monitor bundle size
   - Tree-shake unused code
   - Use production builds

### Accessibility

1. **Semantic HTML:**
   - Use proper heading hierarchy
   - Use semantic elements

2. **ARIA:**
   - Add ARIA labels where needed
   - Ensure keyboard navigation

3. **Color Contrast:**
   - Maintain WCAG 2.1 AA compliance
   - Test with accessibility tools

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] All pages load without errors
- [ ] Navigation works on all pages
- [ ] Forms submit successfully
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Animations run smoothly
- [ ] 3D scene renders correctly
- [ ] Charts display data accurately
- [ ] No console errors or warnings

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Environment Variables

Create a `.env` file:

```env
# API Configuration
PUBLIC_API_URL=https://api.workfree.com

# Database (future)
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

# Email (future)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
```

### Docker Deployment (Ready)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "build"]
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Dependencies not installing
**Solution:** Delete `node_modules` and `package-lock.json`, then run `npm install`

**Issue:** TypeScript errors
**Solution:** Run `npm run check` to see detailed errors

**Issue:** 3D scene not rendering
**Solution:** Check browser WebGL support, ensure Three.js is loaded

**Issue:** Tailwind classes not working
**Solution:** Ensure Tailwind is configured in `vite.config.ts`

---

## 📚 Resources

- [Svelte 5 Documentation](https://svelte.dev/docs)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [GSAP Documentation](https://greensock.com/docs)

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Areas

- **Frontend Development:** Svelte components, animations, UI/UX
- **3D Development:** Three.js scenes, interactions, optimizations
- **Backend Development:** API routes, database integration
- **Documentation:** Improve guides, add examples
- **Testing:** Write tests, report bugs
- **Design:** UI/UX improvements, accessibility

---

## 📞 Support

- **Email:** hello@workfree.com
- **GitHub Issues:** [Report a bug](https://github.com/TrillionUnicorn/WorkFree/issues)
- **Discord:** [Join our community](https://discord.gg/workfree)

---

**Built with ❤️ by the WorkFree team**
