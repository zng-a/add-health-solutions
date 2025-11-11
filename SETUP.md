# Complete Setup Guide: Astro + Payload CMS

This project consists of two parts:
1. **Payload CMS Backend** - A headless CMS with Next.js, Cloudflare D1, and R2 storage
2. **Astro Frontend** - A static site with the Mainline theme that fetches content from Payload

## Architecture

```
┌─────────────────────┐
│   Astro Frontend    │
│  (Port 4321)        │
│  Mainline Theme     │
└──────────┬──────────┘
           │
           │ HTTP REST API
           │
┌──────────▼──────────┐
│   Payload CMS       │
│  (Port 3000)        │
│  Next.js + D1 + R2  │
└─────────────────────┘
```

## Prerequisites

- Node.js 18.20.2+ or 20.9.0+
- pnpm 9 or 10
- Cloudflare account (for deployment)

## Quick Start

### Step 1: Install Dependencies

Install dependencies for the Payload CMS backend:

```bash
pnpm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your Payload secret:

```bash
PAYLOAD_SECRET=$(openssl rand -hex 32)
```

### Step 3: Start Payload CMS Backend

```bash
pnpm dev
```

The Payload CMS admin panel will be available at `http://localhost:3000/admin`

### Step 4: Create Your First User

1. Navigate to `http://localhost:3000/admin`
2. Create an admin user account
3. Log in to the admin panel

### Step 5: Set Up Astro Frontend

In a new terminal, navigate to the Astro frontend:

```bash
cd astro-frontend
pnpm install
```

Configure the frontend environment:

```bash
cp .env.example .env
```

Start the Astro development server:

```bash
pnpm dev
```

The Astro site will be available at `http://localhost:4321`

## Creating Content

### Create a Blog Post

1. Log in to Payload CMS at `http://localhost:3000/admin`
2. Navigate to the "Posts" collection
3. Click "Create New"
4. Fill in the post details:
   - Title
   - Slug (URL-friendly)
   - Excerpt
   - Content
   - Published Date
   - Status (change to "published" to make it visible)
5. Click "Save"

The post will now be available via the API and will appear on the Astro frontend at `http://localhost:4321/blog`

## Project Structure

```
add-health-solutions/
├── astro-frontend/          # Astro frontend with Mainline theme
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── layouts/         # Page layouts
│   │   ├── lib/             # API client & utilities
│   │   ├── pages/           # Routes
│   │   └── styles/          # Global styles
│   ├── astro.config.mjs
│   └── package.json
├── src/
│   ├── collections/         # Payload CMS collections
│   │   ├── Users.ts
│   │   ├── Media.ts
│   │   └── Posts.ts         # Blog posts collection
│   ├── app/                 # Next.js app routes
│   └── payload.config.ts    # Payload configuration
├── package.json
└── wrangler.jsonc           # Cloudflare Workers config
```

## API Endpoints

Payload CMS exposes REST API endpoints:

- `GET /api/posts` - List all posts
- `GET /api/posts/:id` - Get a single post
- `GET /api/media` - List media files
- `GET /api/users` - List users (protected)

GraphQL is also available at `/api/graphql` (may have limitations in production on Cloudflare Workers).

## Collections

### Posts

The Posts collection includes:
- `title` - Post title
- `slug` - URL-friendly identifier
- `excerpt` - Brief summary
- `content` - Rich text content
- `featuredImage` - Upload relationship to Media
- `author` - Relationship to Users
- `publishedDate` - Publication date
- `status` - Draft or Published
- `tags` - Array of tags

### Media

Upload and manage images and files with R2 storage.

### Users

Authentication-enabled collection for admin access.

## Development Workflow

1. **Start both servers**:
   ```bash
   # Terminal 1 - Payload CMS
   pnpm dev

   # Terminal 2 - Astro
   cd astro-frontend && pnpm dev
   ```

2. **Create content** in Payload CMS admin panel

3. **View changes** in Astro frontend (refresh browser)

## Building for Production

### Build Payload CMS

```bash
pnpm run build
```

### Build Astro Frontend

```bash
cd astro-frontend
pnpm run build
```

## Deployment

### Deploy Payload CMS to Cloudflare

1. Authenticate with Wrangler:
   ```bash
   pnpm wrangler login
   ```

2. Create migrations:
   ```bash
   pnpm payload migrate:create
   ```

3. Deploy:
   ```bash
   pnpm run deploy
   ```

### Deploy Astro Frontend

The `astro-frontend/dist` directory can be deployed to:
- Cloudflare Pages
- Netlify
- Vercel
- Any static hosting service

Update the `PAYLOAD_API_URL` in your production environment to point to your deployed Payload CMS instance.

## Troubleshooting

### Astro can't connect to Payload

- Ensure Payload CMS is running on port 3000
- Check the `PAYLOAD_API_URL` in `astro-frontend/.env`
- Verify CORS settings if needed

### Database issues

- Delete `.wrangler` directory and restart
- Run migrations: `pnpm payload migrate`

### Build fails

- Clear caches: `rm -rf .next .open-next node_modules/.cache`
- Reinstall: `pnpm install --force`

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers)
