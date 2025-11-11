# Astro Frontend with Mainline Theme

This is the frontend for the project, built with [Astro](https://astro.build) and styled with the Mainline theme using Tailwind CSS.

## Features

- **Astro** - Fast, modern static site generator
- **Mainline Theme** - Clean, professional design system
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **Payload CMS Integration** - Fetches content from Payload CMS API

## Prerequisites

- Node.js 18.20.2 or higher (or Node.js 20.9.0+)
- pnpm 9 or 10

## Getting Started

### 1. Install Dependencies

```bash
cd astro-frontend
pnpm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update the `.env` file with your Payload CMS API URL:

```env
PAYLOAD_API_URL=http://localhost:3000/api
```

### 3. Start the Development Server

```bash
pnpm dev
```

The site will be available at `http://localhost:4321`

## Project Structure

```
astro-frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable Astro components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Hero.astro
│   ├── layouts/         # Page layouts
│   │   └── MainLayout.astro
│   ├── lib/             # Utility functions
│   │   └── payload.ts   # Payload CMS API client
│   ├── pages/           # File-based routing
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── blog/
│   │       └── index.astro
│   └── styles/          # Global styles
│       └── global.css
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## Connecting to Payload CMS

The frontend connects to Payload CMS using the REST API. The `src/lib/payload.ts` file provides helper functions:

```typescript
import { fetchFromPayload } from '../lib/payload';

// Fetch all posts
const response = await fetchFromPayload('posts', {
  limit: '10',
  sort: '-publishedDate',
});

// Fetch a single document
const post = await fetchPayloadDoc('posts', 'post-id');
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm astro` - Run Astro CLI commands

## Mainline Theme

The Mainline theme provides:

- Responsive navigation header
- Hero sections for landing pages
- Card-based layouts
- Modern typography
- Primary color scheme (customizable in `tailwind.config.mjs`)
- Utility components (buttons, containers, etc.)

### Customizing the Theme

Edit `tailwind.config.mjs` to customize colors, fonts, and other design tokens:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

## Deployment

Build the site for production:

```bash
pnpm build
```

The static files will be in the `dist/` directory, ready to deploy to any static hosting service (Netlify, Vercel, Cloudflare Pages, etc.).

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
