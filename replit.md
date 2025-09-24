# SIDE Magazine Website

## Overview

This is a modern, responsive website for SIDE Magazine showcasing the launch of Edição 01 "CORES E FORMAS". Built as a full-stack React application with Express.js backend, the site serves as a landing page for the magazine's first edition launch event scheduled for September 28th at Soma Galeria in Curitiba. The website features sections for artist showcases, event information, musical lineup, and newsletter signup, all designed with a vibrant, contemporary aesthetic that reflects the magazine's focus on the intersection of fashion, art, and visual culture.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development experience
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for the brand color palette (solar yellow, hot pink, lime green, etc.)
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessibility and consistency
- **State Management**: TanStack Query for server state management with custom query client configuration
- **Build System**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for API endpoints
- **Development Setup**: TSX for TypeScript execution in development
- **Build Process**: ESBuild for production bundling with ES modules format
- **Error Handling**: Centralized error middleware with status code management
- **Logging**: Custom request logging middleware for API endpoints

### Database Layer
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe queries
- **Schema**: Shared schema definitions between client and server
- **Migrations**: Drizzle Kit for database migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL integration
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

### Development & Deployment
- **TypeScript Configuration**: Shared tsconfig with path mapping for clean imports
- **Development Server**: Vite dev server with HMR and middleware integration
- **Production Build**: Static asset generation with Express.js API serving
- **Asset Management**: Alias-based imports for components, utilities, and shared modules

### Styling System
- **Design System**: Custom CSS variables for brand colors and typography
- **Fonts**: Inter for UI text, Archivo Black for display headings, Playfair Display for editorial content
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Animation**: CSS transitions and transforms with intersection observer for scroll-triggered animations

## External Dependencies

- **UI Components**: Radix UI primitives for accessible component foundations
- **Styling**: Tailwind CSS for utility-first styling approach
- **Database**: PostgreSQL via Neon Database serverless platform
- **Form Handling**: React Hook Form with Zod resolvers for validation
- **Date Management**: date-fns for date formatting and manipulation
- **Development Tools**: Replit-specific Vite plugins for development environment integration
- **Icons**: Font Awesome for iconography throughout the site

## Backend API Endpoints

The SIDE Magazine backend provides RESTful API endpoints that **cannot be deployed to static hosting platforms** like GitHub Pages, Netlify Pages, or Vercel Static. These endpoints require a Node.js server environment and database connectivity.

### API Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

### Sponsors Management
Handles partnership and sponsorship inquiries.

**POST /api/sponsors**
- **Purpose**: Create new sponsor inquiry
- **Body**: 
  ```json
  {
    "companyName": "string (required)",
    "contactName": "string (required)", 
    "email": "string (required, valid email)",
    "phone": "string (optional)",
    "partnershipType": "string (required)",
    "budget": "string (optional)",
    "message": "string (required)"
  }
  ```
- **Responses**:
  - `200`: Sponsor created successfully
  - `400`: Invalid data with validation errors

**GET /api/sponsors**
- **Purpose**: Retrieve all sponsor inquiries
- **Responses**:
  - `200`: Array of sponsor objects
  - `500`: Internal server error

### Gallery Management  
Manages photo galleries for events and content.

**POST /api/galleries**
- **Purpose**: Create new gallery
- **Body**:
  ```json
  {
    "title": "string (required)",
    "description": "string (optional)",
    "coverImage": "string (optional)",
    "images": "string[] (optional)",
    "isPublished": "string (default: 'draft')"
  }
  ```
- **Responses**:
  - `200`: Gallery created successfully
  - `400`: Invalid data with validation errors

**GET /api/galleries**
- **Purpose**: Retrieve all galleries
- **Responses**:
  - `200`: Array of gallery objects
  - `500`: Internal server error

**GET /api/galleries/:id**
- **Purpose**: Retrieve specific gallery by ID
- **Parameters**: `id` - Gallery UUID
- **Responses**:
  - `200`: Gallery object
  - `404`: Gallery not found
  - `500`: Internal server error

### Newsletter Management
Handles email newsletter subscriptions.

**POST /api/newsletter**  
- **Purpose**: Subscribe email to newsletter
- **Body**:
  ```json
  {
    "email": "string (required, valid email)"
  }
  ```
- **Responses**:
  - `200`: Subscription successful
  - `409`: Email already subscribed
  - `400`: Invalid email format

**GET /api/newsletter**
- **Purpose**: Retrieve all newsletter subscriptions  
- **Responses**:
  - `200`: Array of subscription objects
  - `500`: Internal server error

### Critical Backend Services

**🔴 CRITICAL for Basic Functionality:**
- **Database Connection**: PostgreSQL via Neon Database - Required for all data operations
- **Newsletter Endpoint**: Essential for visitor engagement and lead capture
- **Gallery Endpoints**: Required for event photo display and content management

**🟡 IMPORTANT for Full Features:**
- **Sponsors Endpoints**: Important for business partnerships but site functions without them

**📊 Database Schema:**
- `sponsors`: Company partnership inquiries
- `galleries`: Photo gallery collections  
- `newsletters`: Email subscription list
- `users`: User authentication (implemented but not exposed via API)

## Deployment Guide

### Production Requirements

**Environment Variables:**
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://username:password@host:port/database
```

**System Requirements:**
- Node.js 18+ 
- NPM or compatible package manager
- PostgreSQL database (local or cloud)
- Minimum 512MB RAM
- Persistent storage for uploads (if file uploads are added)

### Deployment Options

#### 1. Vercel (Recommended)
Vercel supports full-stack applications with serverless functions.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Set environment variables in Vercel dashboard
# Add DATABASE_URL in Environment Variables section
```

**vercel.json** configuration:
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
Simple deployment with automatic builds from Git.

1. Connect GitHub repository to Render
2. Select "Web Service" 
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Add `DATABASE_URL`
4. Deploy

#### 3. Railway
Modern deployment platform with automatic scaling.

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up

# Set environment variables
railway variables set DATABASE_URL=your_database_url
```

#### 4. AWS App Runner
Containerized deployment on AWS infrastructure.

1. Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

2. Push to container registry or connect GitHub
3. Configure environment variables in App Runner console

#### 5. Heroku
Traditional PaaS deployment (requires credit card for free tier).

```bash
# Install Heroku CLI and login
heroku create your-app-name
heroku config:set DATABASE_URL=your_database_url
git push heroku main
```

**Procfile**:
```
web: npm start
```

### Database Setup

**Neon Database (Recommended)**:
1. Create account at [neon.tech](https://neon.tech)
2. Create new project and database
3. Copy connection string to `DATABASE_URL`
4. Run migrations: `npm run db:push`

**Alternative Database Providers**:
- **Supabase**: PostgreSQL with additional features
- **PlanetScale**: MySQL-compatible serverless database  
- **AWS RDS**: Managed PostgreSQL/MySQL
- **Google Cloud SQL**: Enterprise database hosting

### SSL/HTTPS Setup

Most deployment platforms provide automatic HTTPS certificates:
- **Vercel**: Automatic SSL for all domains
- **Render**: Free SSL certificates  
- **Railway**: Built-in SSL support
- **Heroku**: SSL available for custom domains

### Monitoring and Maintenance

**Recommended Tools**:
- **Error Tracking**: Sentry for runtime error monitoring
- **Uptime Monitoring**: UptimeRobot or Pingdom
- **Database Monitoring**: Provider-specific dashboards
- **Performance**: New Relic or DataDog for APM

**Maintenance Tasks**:
- Regular database backups (automated via provider)
- Dependency updates (`npm audit` and `npm update`)
- Log monitoring for API errors
- Performance monitoring for response times