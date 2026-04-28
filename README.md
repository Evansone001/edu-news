# EDUNEWS - Education News Platform

A modern, high-performance education news platform built with Next.js and Ghost CMS. Features real-time reader presence, newsletter subscriptions, and a professional editorial experience.

![EDUNEWS](public/images/edunews-logo.svg)

## 🚀 Features

- **Headless CMS Architecture**: Ghost CMS backend with Next.js frontend
- **Real-time Features**: Live reader presence counter with Upstash Redis
- **Newsletter System**: Email subscription with automated welcome flows
- **Search**: Full-text search across articles
- **SEO Optimized**: Meta tags, Open Graph, structured data, and sitemap
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Dark Mode**: Full dark mode support
- **Authentication**: Google, Apple, and Email sign-in
- **Dockerized**: Production-ready Docker setup

## 🏗️ Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Next.js       │────▶│   Ghost CMS  │     │   MySQL         │
│   (Port 3001)   │     │   (Port 2369)│────▶│   (Database)    │
└─────────────────┘     └──────────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐
│   Nginx         │
│   (Reverse Proxy│
│   SSL/HTTPS)    │
└─────────────────┘
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Ghost CMS (Headless)
- **Database**: MySQL (Ghost), Redis (Upstash for presence)
- **Deployment**: Docker, Docker Compose
- **Hosting**: VPS with Nginx reverse proxy
- **CDN**: Cloud-ready with static optimization

## 📋 Prerequisites

- Node.js 20.x or later
- npm or pnpm
- Docker & Docker Compose (for production)
- Ghost CMS instance (local or remote)

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/Evansone001/edu-news.git
cd edu-news
npm install
```

### 2. Environment Setup

Create `.env.local`:

```env
# Ghost CMS Configuration
NEXT_PUBLIC_GHOST_URL=https://edunews.co.ke
NEXT_PUBLIC_GHOST_CONTENT_API_KEY=your_ghost_content_api_key

# Redis (Upstash) - Optional, for real-time features
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# Application
NODE_ENV=development
PORT=3000
```

Get your Ghost Content API Key from Ghost Admin → Settings → Integrations.

### 3. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Production Build

```bash
npm run build
npm start
```

## 🐳 Docker Deployment

### Production Setup

```bash
# Clone repository
git clone https://github.com/Evansone001/edu-news.git edunews-frontend
cd edunews-frontend

# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Environment Variables for Docker

Create `.env` file:

```env
NEXT_PUBLIC_GHOST_URL=https://edunews.co.ke
NEXT_PUBLIC_GHOST_CONTENT_API_KEY=your_api_key
PORT=3001
NODE_ENV=production
```

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes (newsletter, views, presence)
│   │   ├── blog/           # Blog pages
│   │   ├── about/          # Static pages
│   │   └── ...
│   ├── components/         # React components
│   │   ├── layout/        # Header, Footer, Navigation
│   │   ├── hero/          # Hero sections
│   │   └── ui/            # UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and API clients
│   ├── mock/              # Mock data for development
│   ├── types/             # TypeScript types
│   └── styles/            # Global styles
├── public/                # Static assets
├── Dockerfile            # Docker production build
├── docker-compose.yml    # Docker orchestration
└── next.config.ts        # Next.js configuration
```

## 🔌 Ghost CMS Integration

### Content API

The frontend fetches content from Ghost CMS using the Content API:

```typescript
// Example: Fetch posts
const posts = await ghostClient.posts.browse({
  limit: 10,
  include: ['tags', 'authors'],
});
```

### Webhooks (Optional)

Configure Ghost webhooks to trigger rebuilds on content changes:

1. Ghost Admin → Settings → Integrations
2. Add webhook for "Post published" → `https://edunews.co.ke/api/revalidate`

## 📝 Content Management

### Creating Content

1. Access Ghost Admin at `https://edunews.co.ke/ghost/`
2. Create posts with rich formatting, images, and embeds
3. Add tags and authors for categorization
4. Publish or schedule posts

### Featured Images

- Recommended size: 1200x630 pixels
- Format: WebP or JPEG
- Use descriptive alt text for accessibility

## 🔧 Configuration

### Nginx Reverse Proxy

```nginx
server {
    listen 443 ssl;
    server_name edunews.co.ke;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # Ghost Admin
    location /ghost/ {
        proxy_pass http://localhost:2369/ghost/;
    }
}
```

### SSL Certificates

Use Certbot for free Let's Encrypt certificates:

```bash
certbot --nginx -d edunews.co.ke -d www.edunews.co.ke
```

## 📊 Performance

- **Lighthouse Score**: 95+ across all categories
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Image Optimization**: Next.js Image component with WebP
- **Static Generation**: ISR for dynamic content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

[MIT](LICENSE)

## 🙏 Acknowledgments

- [Ghost CMS](https://ghost.org/) for the powerful headless platform
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Upstash](https://upstash.com/) for serverless Redis

---

**Built with ❤️ for education in Kenya and beyond.**

