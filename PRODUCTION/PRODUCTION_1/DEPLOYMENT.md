# WorkFree Production Deployment Guide

This guide covers deploying WorkFree to production using Cloudflare Pages.

---

## 📋 Prerequisites

- Cloudflare account
- Stripe account (for payments)
- Resend account (for emails)
- GitHub repository
- Domain name (optional)

---

## 🚀 Deployment Steps

### 1. Database Setup

**Option A: Turso (Recommended for Production)**

```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Create database
turso db create workfree-prod

# Get connection URL
turso db show workfree-prod --url

# Create auth token
turso db tokens create workfree-prod
```

**Option B: Neon (PostgreSQL)**

1. Go to https://neon.tech
2. Create new project
3. Copy connection string
4. Update `drizzle.config.ts` for PostgreSQL

### 2. Environment Variables

Set these in Cloudflare Pages dashboard:

```env
# Database
DATABASE_URL=libsql://your-database.turso.io
DATABASE_AUTH_TOKEN=your-turso-token

# Stripe
STRIPE_SECRET_KEY=sk_live_...
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PROFESSIONAL=price_...
STRIPE_PRICE_ENTERPRISE=price_...

# Email
RESEND_API_KEY=re_...

# App
PUBLIC_APP_URL=https://workfree.com
NODE_ENV=production
```

### 3. Stripe Setup

1. **Create Products in Stripe Dashboard:**
   - Starter ($49/month)
   - Professional ($149/month)
   - Enterprise ($499/month)

2. **Copy Price IDs** and add to environment variables

3. **Set up Webhook:**
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_failed`

4. **Copy Webhook Secret** to environment variables

### 4. Resend Setup

1. Go to https://resend.com
2. Create API key
3. Verify domain (optional but recommended)
4. Add API key to environment variables

### 5. Database Migration

```bash
# Generate migration
bun run db:generate

# Apply migration to production
DATABASE_URL=your-prod-url bun run db:migrate

# Seed initial data (optional)
DATABASE_URL=your-prod-url bun run db:seed
```

### 6. Cloudflare Pages Deployment

**Option A: Automatic (GitHub Integration)**

1. Go to Cloudflare Pages dashboard
2. Connect GitHub repository
3. Configure build settings:
   - Build command: `bun run build`
   - Build output directory: `build`
   - Root directory: `PRODUCTION/PRODUCTION_1`
4. Add environment variables
5. Deploy

**Option B: Manual (Wrangler CLI)**

```bash
# Install Wrangler
bun add -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy build --project-name=workfree
```

### 7. Custom Domain (Optional)

1. Go to Cloudflare Pages project
2. Click "Custom domains"
3. Add your domain
4. Update DNS records as instructed

---

## 🔒 Security Checklist

- [ ] All environment variables set
- [ ] Stripe webhook secret configured
- [ ] Database connection secured
- [ ] HTTPS enabled (automatic with Cloudflare)
- [ ] Rate limiting configured
- [ ] CORS headers set
- [ ] CSP headers configured
- [ ] Admin accounts secured

---

## 📊 Monitoring

### Cloudflare Analytics

- Page views
- Unique visitors
- Bandwidth usage
- Error rates

### Application Monitoring

**Recommended: Axiom**

```bash
# Install Axiom
bun add @axiomhq/js

# Add to hooks.server.ts
import { Axiom } from '@axiomhq/js';
const axiom = new Axiom({ token: process.env.AXIOM_TOKEN });
```

### Error Tracking

**Recommended: Sentry**

```bash
# Install Sentry
bun add @sentry/sveltekit

# Initialize in hooks.server.ts
import * as Sentry from '@sentry/sveltekit';
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

---

## 🔄 CI/CD Pipeline

The GitHub Actions workflow automatically:

1. Runs tests on every push
2. Builds the application
3. Deploys to Cloudflare Pages (on main branch)

**Required GitHub Secrets:**

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `DATABASE_URL`
- `STRIPE_SECRET_KEY`
- `PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `PUBLIC_APP_URL`

---

## 🧪 Testing Production

```bash
# Run production build locally
bun run build
bun run preview

# Test with production environment variables
DATABASE_URL=prod-url bun run preview
```

---

## 📈 Performance Optimization

### 1. Enable Caching

Add to `svelte.config.js`:

```js
kit: {
  adapter: adapter({
    routes: {
      include: ['/*'],
      exclude: ['<all>']
    }
  })
}
```

### 2. Image Optimization

Use Cloudflare Images or imgix for image optimization.

### 3. Database Optimization

- Add indexes for frequently queried fields
- Use connection pooling
- Enable query caching

---

## 🔧 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .svelte-kit node_modules
bun install
bun run build
```

### Database Connection Issues

```bash
# Test connection
DATABASE_URL=your-url bun run db:push
```

### Stripe Webhook Not Working

1. Check webhook URL is correct
2. Verify webhook secret
3. Check Cloudflare logs
4. Test with Stripe CLI:

```bash
stripe listen --forward-to localhost:5173/api/webhooks/stripe
```

---

## 📝 Post-Deployment

1. **Test all features:**
   - User registration
   - Login/logout
   - Quest completion
   - Payment flow
   - Email delivery

2. **Monitor for 24 hours:**
   - Check error logs
   - Monitor performance
   - Watch for failed payments

3. **Set up backups:**
   - Database backups (daily)
   - Code backups (GitHub)

4. **Create admin account:**
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

---

## 🆘 Support

For deployment issues:
1. Check Cloudflare Pages logs
2. Review GitHub Actions logs
3. Check database connection
4. Verify environment variables

---

**Deployment Checklist:**

- [ ] Database created and migrated
- [ ] Environment variables set
- [ ] Stripe configured
- [ ] Resend configured
- [ ] Domain connected (optional)
- [ ] CI/CD pipeline working
- [ ] Monitoring enabled
- [ ] Backups configured
- [ ] Admin account created
- [ ] All features tested

---

**Status:** Ready for production deployment 🚀

