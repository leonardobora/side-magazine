# SIDE Magazine Website

## Overview

This is a modern, responsive website for SIDE Magazine showcasing the launch of Edição 01 "CORES E FORMAS". Built as a full-stack React application with Express.js backend, the site serves as a landing page for the magazine's first edition launch event scheduled for September 28th at Soma Galeria in Curitiba.

## Development

### Prerequisites
- Node.js 18+
- npm

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Type check:
```bash
npm run check
```

## Deployment

### GitHub Pages Deployment

This project automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

#### Workflow Configuration

The deployment workflow (`.github/workflows/pages-deploy.yml`) includes:

- **Trigger**: Pushes to `main` branch
- **Build Process**: 
  1. TypeScript type checking (`npm run check`)
  2. Frontend build (`npm run build`)
  3. SPA routing support (creates 404.html)
- **Output**: Static files from `dist/public/` directory
- **Deployment**: Automatic deployment to GitHub Pages

#### Manual Deployment

You can also trigger deployment manually from GitHub Actions tab.

#### Repository Settings

To enable GitHub Pages deployment, ensure:

1. Go to Repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The workflow has proper permissions to deploy

## Project Structure

```
├── .github/workflows/    # GitHub Actions workflows
├── client/              # Frontend React application
│   ├── src/            # Source code
│   └── index.html      # Main HTML template
├── server/             # Backend Express.js application
├── shared/             # Shared types and utilities
├── dist/               # Build output (generated)
│   └── public/         # Static frontend files for deployment
└── vite.config.ts      # Vite configuration
```

## Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: GitHub Pages (static frontend)

## Features

- Responsive design optimized for all devices
- Single Page Application (SPA) with client-side routing
- SEO optimized with meta tags and Open Graph
- Event information and ticket integration
- Newsletter signup functionality
- Artist showcases and gallery sections