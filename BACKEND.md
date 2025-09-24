# SIDE Magazine - Backend API Documentation

## Overview
SIDE Magazine utilizes a Node.js/Express backend with TypeScript that provides RESTful API endpoints for managing sponsors, galleries, and newsletter subscriptions. **These backend services cannot be deployed to static hosting platforms** like GitHub Pages and require a server environment with database connectivity.

## ⚠️ Deployment Requirements
This backend **CANNOT** be deployed to:
- GitHub Pages
- Netlify Static Sites  
- Vercel Static
- Any other static-only hosting

**Requires:**
- Node.js runtime environment
- Database connectivity (PostgreSQL)
- Server-side processing capabilities

## API Endpoints Reference

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-domain.com/api`

---

### 📋 Sponsors API
Manages partnership and sponsorship inquiries for the magazine.

#### POST /api/sponsors
Creates a new sponsor inquiry.

**Request Body:**
```json
{
  "companyName": "Empresa Exemplo Ltda",
  "contactName": "João Silva", 
  "email": "joao@exemplo.com",
  "phone": "+55 11 99999-9999",
  "partnershipType": "Patrocínio",
  "budget": "R$ 5.000 - R$ 10.000",
  "message": "Interesse em patrocinar a próxima edição"
}
```

**Validation Rules:**
- `companyName`: Required, minimum 1 character
- `contactName`: Required, minimum 1 character  
- `email`: Required, valid email format
- `phone`: Optional string
- `partnershipType`: Required, minimum 1 character
- `budget`: Optional string
- `message`: Required, minimum 1 character

**Responses:**
- **200 OK**: Sponsor created successfully
- **400 Bad Request**: Validation errors

#### GET /api/sponsors
Retrieves all sponsor inquiries.

**Response:** Array of sponsor objects with creation timestamps

---

### 🖼️ Galleries API  
Manages photo galleries for events and editorial content.

#### POST /api/galleries
Creates a new gallery.

**Request Body:**
```json
{
  "title": "Lançamento CORES E FORMAS",
  "description": "Registro fotográfico do evento de lançamento",
  "coverImage": "https://example.com/cover.jpg",
  "images": ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
  "isPublished": "published"
}
```

**Validation Rules:**
- `title`: Required
- `description`: Optional
- `coverImage`: Optional URL string
- `images`: Optional array of URLs
- `isPublished`: Optional, defaults to "draft"

**Responses:**
- **200 OK**: Gallery created successfully
- **400 Bad Request**: Validation errors

#### GET /api/galleries
Retrieves all galleries ordered by creation date.

#### GET /api/galleries/:id
Retrieves a specific gallery by UUID.

**Parameters:**
- `id`: Gallery UUID

**Responses:**
- **200 OK**: Gallery object
- **404 Not Found**: Gallery doesn't exist

---

### 📧 Newsletter API
Handles email newsletter subscriptions.

#### POST /api/newsletter
Subscribes an email to the newsletter.

**Request Body:**
```json
{
  "email": "usuario@example.com"
}
```

**Validation Rules:**
- `email`: Required, valid email format

**Responses:**
- **200 OK**: Subscription successful
- **409 Conflict**: Email already subscribed
- **400 Bad Request**: Invalid email format

#### GET /api/newsletter
Retrieves all newsletter subscriptions.

---

## 🔴 Critical Services Analysis

### Essential for Basic Site Functionality:
1. **Database Connection (PostgreSQL via Neon)**
   - Required for all data persistence
   - Stores sponsors, galleries, and newsletter subscriptions
   - Site cannot function without database connectivity

2. **Newsletter API (/api/newsletter)**
   - Critical for visitor engagement and lead capture
   - Primary conversion mechanism for the site
   - Loss affects business growth potential

3. **Gallery API (/api/galleries)**
   - Essential for displaying event photos and content
   - Core feature for showcasing magazine content
   - Required for content management functionality

### Important but Non-Critical:
1. **Sponsors API (/api/sponsors)**
   - Important for business partnerships
   - Site remains functional for visitors without it
   - Primarily affects business development

## 🚀 Deployment Guide

### Environment Variables
```bash
NODE_ENV=production
PORT=5000  
DATABASE_URL=postgresql://user:password@host:port/database
```

### Recommended Deployment Platforms

#### 1. Vercel (⭐ Recommended)
Best for full-stack React applications with serverless backend.

**Steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project root
3. Configure environment variables in Vercel dashboard
4. Add `DATABASE_URL` in Environment Variables section

**vercel.json:**
```json
{
  "builds": [
    {
      "src": "server/index.ts", 
      "use": "@vercel/node"
    },
    {
      "src": "client/**/*",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist/public" }
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server/index.ts" },
    { "src": "/(.*)", "dest": "/client/$1" }
  ]
}
```

#### 2. Render
Simple Git-based deployment with automatic builds.

**Configuration:**
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment**: Add `DATABASE_URL`

#### 3. Railway  
Modern platform with excellent developer experience.

```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway link  
railway up

# Set environment variables
railway variables set DATABASE_URL=your_database_url
```

#### 4. Heroku
Traditional PaaS with extensive addon ecosystem.

```bash
heroku create your-app-name
heroku config:set DATABASE_URL=your_database_url
git push heroku main
```

**Procfile:**
```
web: npm start
```

### Database Setup Options

#### Neon Database (Recommended)
1. Create account at [neon.tech](https://neon.tech)
2. Create new PostgreSQL project
3. Copy connection string to `DATABASE_URL`
4. Run database migrations: `npm run db:push`

#### Alternative Providers:
- **Supabase**: PostgreSQL with additional features and dashboard
- **PlanetScale**: MySQL-compatible with branching
- **AWS RDS**: Enterprise-grade managed databases
- **Google Cloud SQL**: Fully managed relational database service

### Production Monitoring

**Essential Monitoring:**
- **Uptime**: UptimeRobot, Pingdom, or StatusCake
- **Error Tracking**: Sentry for runtime error monitoring  
- **Performance**: New Relic or DataDog for APM
- **Database**: Provider-specific monitoring dashboards

**Maintenance Tasks:**
- Regular dependency updates (`npm audit && npm update`)
- Database backup verification (usually automated by provider)
- API response time monitoring
- Error rate tracking and alerting

### Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **CORS Configuration**: Configure allowed origins for production
3. **Rate Limiting**: Consider implementing API rate limiting
4. **Input Validation**: All endpoints use Zod schemas for validation
5. **HTTPS**: Use SSL certificates (automatic on most platforms)

### Scaling Considerations

- **Database Connection Pooling**: Already implemented via Neon
- **Caching**: Consider Redis for frequently accessed data
- **CDN**: Use for static assets and images
- **Load Balancing**: Platform-specific (handled by deployment provider)

---

## 📊 Database Schema

### Tables Overview:
- **sponsors**: Partnership inquiries and contact information
- **galleries**: Photo galleries with metadata and publishing status  
- **newsletters**: Email subscription list with status tracking
- **users**: User authentication (implemented but not exposed via API)

### Data Models:
All models include auto-generated UUIDs and timestamps for creation tracking.