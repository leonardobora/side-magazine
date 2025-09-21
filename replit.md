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