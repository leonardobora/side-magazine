# SIDE Magazine Website

A modern, responsive website for SIDE Magazine showcasing the launch of Edição 01 "CORES E FORMAS". Built with React 18, TypeScript, and Express.js backend, featuring event information, artist showcases, and newsletter subscription functionality.

## 🎯 Project Overview

This full-stack application serves as the official landing page for SIDE Magazine's first edition launch event, scheduled for September 28th at Soma Galeria in Curitiba. The site combines contemporary design with functional features for visitor engagement and content management.

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript  
- **Database**: PostgreSQL (Neon Database)
- **Styling**: Tailwind CSS + Shadcn/ui components
- **State Management**: TanStack Query
- **ORM**: Drizzle ORM

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon Database account)

### Installation
```bash
# Clone repository
git clone https://github.com/leonardobora/side-magazine.git
cd side-magazine

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

### Development Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run check    # TypeScript type checking
npm run db:push  # Run database migrations
```

## 📚 Documentation

### Backend API Documentation
**[📖 BACKEND.md](./BACKEND.md)** - Complete backend documentation including:
- All API endpoints with request/response examples
- Deployment guides for Vercel, Render, Railway, Heroku
- Critical services analysis  
- Database setup and configuration
- Production monitoring and security considerations

### Deployment Guide
**[🚀 DEPLOYMENT.md](./DEPLOYMENT.md)** - Step-by-step deployment checklist:
- Pre-deployment setup and verification
- Platform-specific deployment instructions
- Post-deployment testing and monitoring
- Troubleshooting common issues

### Key Features
- **Newsletter Subscription**: Email capture for visitor engagement
- **Gallery Management**: Photo galleries for events and editorial content  
- **Sponsor Inquiries**: Partnership and sponsorship management
- **Responsive Design**: Mobile-first approach with modern UI
- **Type Safety**: Full TypeScript implementation across stack

## ⚠️ Deployment Requirements

**This application requires server-side deployment** and cannot be hosted on static platforms like:
- GitHub Pages
- Netlify Static Sites
- Vercel Static

**Recommended deployment platforms:**
- Vercel (full-stack)
- Render
- Railway  
- Heroku

See [BACKEND.md](./BACKEND.md) for detailed deployment instructions.

## 🎨 Design System

The site features a vibrant design system reflecting SIDE Magazine's contemporary aesthetic:

- **Colors**: Solar yellow, hot pink, lime green, cream, and sophisticated blacks
- **Typography**: Inter (UI), Archivo Black (display), Playfair Display (editorial)
- **Components**: Accessible Radix UI primitives with custom styling
- **Animations**: Smooth transitions and scroll-triggered effects

## 🔧 Technology Stack

### Frontend
- **React 18** - Modern React with concurrent features
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - High-quality component library
- **TanStack Query** - Server state management
- **Wouter** - Lightweight client-side routing

### Backend
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **Drizzle ORM** - Type-safe database queries
- **Zod** - Runtime type validation
- **PostgreSQL** - Robust relational database

### Development Tools
- **ESBuild** - Fast bundling for production
- **TSX** - TypeScript execution for development
- **Drizzle Kit** - Database migrations and schema management

## 📊 Database Schema

- **sponsors** - Partnership and inquiry management
- **galleries** - Photo gallery collections with publishing workflow
- **newsletters** - Email subscription management
- **users** - User authentication system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature-name`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📧 Contact

For questions about the project or SIDE Magazine:
- Email: sidemagazine@outlook.com
- Instagram: [@side.magazine](https://instagram.com/side.magazine)

---

## 📖 Additional Documentation

- **[Backend API Documentation](./BACKEND.md)** - Complete backend endpoints and deployment guide
- **[System Architecture](./replit.md)** - Detailed technical documentation and dependencies