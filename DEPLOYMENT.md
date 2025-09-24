# Deployment Checklist

## Pre-Deployment Setup

### 1. Database Setup
- [ ] Create PostgreSQL database (recommended: [Neon.tech](https://neon.tech))
- [ ] Copy database connection string
- [ ] Test database connectivity locally

### 2. Environment Configuration
- [ ] Copy `.env.example` to `.env`
- [ ] Set `DATABASE_URL` with your database connection string
- [ ] Set `NODE_ENV=production` for production deployments
- [ ] Configure `PORT` if needed (default: 5000)

### 3. Code Preparation
- [ ] Run `npm install` to install dependencies
- [ ] Run `npm run check` to verify TypeScript compilation
- [ ] Run `npm run build` to test production build
- [ ] Test database migrations: `npm run db:push`

## Platform-Specific Deployment

### Vercel Deployment
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Run `vercel` in project root
- [ ] Configure environment variables in Vercel dashboard:
  - [ ] Add `DATABASE_URL`
  - [ ] Add `NODE_ENV=production` 
- [ ] Verify `vercel.json` configuration is present
- [ ] Deploy and test all API endpoints

### Render Deployment
- [ ] Connect GitHub repository to Render
- [ ] Select "Web Service"
- [ ] Configure build settings:
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Start Command: `npm start`
- [ ] Add environment variables:
  - [ ] `DATABASE_URL`
  - [ ] `NODE_ENV=production`
- [ ] Deploy and verify functionality

### Railway Deployment
- [ ] Install Railway CLI: `npm install -g @railway/cli`
- [ ] Login: `railway login`
- [ ] Link project: `railway link`
- [ ] Set environment variables:
  - [ ] `railway variables set DATABASE_URL=your_database_url`
  - [ ] `railway variables set NODE_ENV=production`
- [ ] Deploy: `railway up`

### Heroku Deployment
- [ ] Install Heroku CLI
- [ ] Create app: `heroku create your-app-name`
- [ ] Set environment variables:
  - [ ] `heroku config:set DATABASE_URL=your_database_url`
  - [ ] `heroku config:set NODE_ENV=production`
- [ ] Ensure `Procfile` exists: `web: npm start`
- [ ] Deploy: `git push heroku main`

## Post-Deployment Verification

### API Endpoint Testing
Test all endpoints with curl or Postman:

```bash
# Test Newsletter endpoint
curl -X POST https://your-app.com/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Test Sponsors endpoint  
curl -X POST https://your-app.com/api/sponsors \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Company",
    "contactName": "Test User", 
    "email": "test@company.com",
    "partnershipType": "Sponsorship",
    "message": "Test inquiry"
  }'

# Test Galleries endpoint
curl -X GET https://your-app.com/api/galleries
```

### Frontend Verification
- [ ] Navigate to your deployed URL
- [ ] Verify all pages load correctly
- [ ] Test newsletter subscription form
- [ ] Check responsive design on mobile
- [ ] Verify all images and assets load

### Database Verification
- [ ] Check database connection in deployment logs
- [ ] Verify data is being stored correctly
- [ ] Test all CRUD operations through the UI

## Monitoring Setup

### Basic Monitoring
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error tracking (Sentry recommended)
- [ ] Set up database monitoring through provider dashboard
- [ ] Configure deployment notifications

### Performance Monitoring
- [ ] Monitor API response times
- [ ] Track database query performance
- [ ] Monitor memory and CPU usage
- [ ] Set up alerts for high error rates

## Security Checklist

- [ ] Verify HTTPS is enabled (automatic on most platforms)
- [ ] Environment variables are properly secured
- [ ] No sensitive data in source code
- [ ] Database connection uses SSL
- [ ] CORS is properly configured for production domain

## Maintenance Tasks

### Regular Tasks
- [ ] Monitor deployment logs for errors
- [ ] Check database backup status (usually automatic)
- [ ] Update dependencies: `npm audit && npm update`
- [ ] Monitor API performance and response times

### Monthly Tasks  
- [ ] Review and clean old database records if needed
- [ ] Check for security updates
- [ ] Review error tracking reports
- [ ] Backup verification

---

## Troubleshooting

### Common Issues
1. **Database Connection Error**: Verify `DATABASE_URL` format and connectivity
2. **Build Failures**: Run `npm run build` locally to debug
3. **API 500 Errors**: Check deployment logs for error details
4. **Static Assets Not Loading**: Verify build output directory configuration

### Getting Help
- Check platform-specific documentation
- Review deployment logs for error messages
- Test locally with production environment variables
- Verify all dependencies are properly installed