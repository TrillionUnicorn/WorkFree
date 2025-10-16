# WorkFree - Quick Start Guide

Get WorkFree running in production in under 3 hours!

---

## 🚀 Quick Start (3 Hours to Production)

### Prerequisites (5 minutes)
- [x] Bun installed (`curl -fsSL https://bun.sh/install | bash`)
- [x] Git installed
- [x] GitHub account
- [x] Cloudflare account
- [x] Stripe account
- [x] Resend account

---

## 📦 Step 1: Clone & Install (5 minutes)

```bash
# Clone repository
git clone https://github.com/TrillionUnicorn/WorkFree.git
cd WorkFree/PRODUCTION/PRODUCTION_1

# Install dependencies
bun install

# Copy environment file
cp .env.example .env
```

---

## 🗄️ Step 2: Database Setup (30 minutes)

### Option A: Automated Setup (Recommended)

```bash
# Run setup script
./scripts/setup-production.sh
```

This will:
- Install Turso CLI
- Create production database
- Generate connection credentials
- Run migrations
- Seed initial data

### Option B: Manual Setup

```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Login
turso auth login

# Create database
turso db create workfree-prod --location iad

# Get credentials
turso db show workfree-prod --url
turso db tokens create workfree-prod

# Update .env.production with credentials

# Run migrations
DATABASE_URL="..." DATABASE_AUTH_TOKEN="..." bun run db:migrate

# Seed data
DATABASE_URL="..." DATABASE_AUTH_TOKEN="..." bun run db:seed
```

---

## 💳 Step 3: Stripe Setup (20 minutes)

1. **Go to Stripe Dashboard** → https://dashboard.stripe.com

2. **Create Products:**
   - Product 1: "Starter" - $49/month
   - Product 2: "Professional" - $149/month
   - Product 3: "Enterprise" - $499/month

3. **Copy Price IDs** (starts with `price_...`)

4. **Set up Webhook:**
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
   - Copy webhook secret (starts with `whsec_...`)

5. **Update .env.production:**
   ```env
   STRIPE_SECRET_KEY=sk_live_...
   PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   STRIPE_PRICE_STARTER=price_...
   STRIPE_PRICE_PROFESSIONAL=price_...
   STRIPE_PRICE_ENTERPRISE=price_...
   ```

---

## 📧 Step 4: Email Setup (10 minutes)

1. **Go to Resend** → https://resend.com

2. **Create API Key**

3. **Verify Domain** (optional but recommended)

4. **Update .env.production:**
   ```env
   RESEND_API_KEY=re_...
   ```

---

## ☁️ Step 5: Cloudflare Pages (30 minutes)

1. **Go to Cloudflare Pages** → https://dash.cloudflare.com

2. **Connect GitHub:**
   - Select repository: `TrillionUnicorn/WorkFree`
   - Branch: `production/production-1-build`
   - Root directory: `PRODUCTION/PRODUCTION_1`

3. **Build Settings:**
   ```
   Build command: bun run build:prod
   Build output: build
   ```

4. **Environment Variables:**
   Copy all variables from `.env.production`

5. **Deploy!**

---

## 🌐 Step 6: Domain Setup (15 minutes)

1. **Add Custom Domain** in Cloudflare Pages

2. **Update DNS:**
   - Add CNAME record
   - Point to Cloudflare Pages URL

3. **Wait for SSL** (automatic, ~5 minutes)

4. **Update .env.production:**
   ```env
   PUBLIC_APP_URL=https://your-domain.com
   ```

---

## 👤 Step 7: Create Admin (5 minutes)

```bash
# Connect to database
turso db shell workfree-prod

# Register a user first through the UI, then:
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';

# Verify
SELECT id, email, role FROM users WHERE role = 'admin';
```

---

## ✅ Step 8: Test Everything (30 minutes)

### Test Checklist:
- [ ] Visit your domain
- [ ] Register new account
- [ ] Verify email works
- [ ] Login/logout
- [ ] Browse quests
- [ ] Start a quest
- [ ] Complete a quest
- [ ] Check achievements
- [ ] View leaderboard
- [ ] Update profile
- [ ] Test payment (use test card: 4242 4242 4242 4242)
- [ ] Access admin dashboard
- [ ] Create a quest
- [ ] Manage users

---

## 🎉 Step 9: Go Live! (5 minutes)

1. **Switch Stripe to Live Mode:**
   - Update all Stripe keys to live keys
   - Redeploy

2. **Announce:**
   - Update website
   - Social media
   - Email list

3. **Monitor:**
   - Check error logs
   - Watch analytics
   - Monitor payments

---

## 🔧 Troubleshooting

### Build Fails
```bash
rm -rf .svelte-kit node_modules
bun install
bun run build
```

### Database Connection Issues
```bash
turso db shell workfree-prod
# If this works, your connection is fine
```

### Stripe Webhook Not Working
```bash
# Test locally
stripe listen --forward-to localhost:5173/api/webhooks/stripe
```

### Email Not Sending
- Check Resend dashboard for logs
- Verify API key
- Check domain verification

---

## 📊 Monitoring

### Cloudflare Analytics
- Go to Cloudflare Pages → Analytics
- View traffic, performance, errors

### Stripe Dashboard
- Monitor payments
- Check failed payments
- View customer list

### Database
```bash
# Check database size
turso db show workfree-prod

# View tables
turso db shell workfree-prod
.tables
```

---

## 🆘 Need Help?

- **Documentation:** See README.md
- **API Docs:** See API_DOCUMENTATION.md
- **Deployment:** See DEPLOYMENT.md
- **Launch Guide:** See LAUNCH_GUIDE.md

---

## 💰 Costs

### Free Tier (0-1000 users)
- Cloudflare Pages: $0
- Turso: $0 (500MB)
- Resend: $0 (3,000 emails/month)
- Stripe: 2.9% + $0.30 per transaction
- **Total: $0/month** (+ transaction fees)

### Paid Tier (1000-10000 users)
- Cloudflare Pages: $20
- Turso: $29
- Resend: $20
- Stripe: 2.9% + $0.30 per transaction
- **Total: $69/month** (+ transaction fees)

---

## 🎯 Success Checklist

- [ ] Database created and migrated
- [ ] Stripe configured with live keys
- [ ] Resend configured
- [ ] Cloudflare Pages deployed
- [ ] Domain connected with SSL
- [ ] Admin account created
- [ ] All features tested
- [ ] Monitoring enabled
- [ ] Backups configured
- [ ] Ready to accept payments!

---

## 🚀 You're Live!

**Congratulations!** WorkFree is now running in production!

**Next Steps:**
1. Monitor for 24 hours
2. Gather user feedback
3. Plan improvements
4. Scale as needed

---

**Time to Production:** ~3 hours  
**Monthly Cost:** $0-120  
**Capacity:** 10,000+ users  
**Status:** Production Ready ✅

---

**Need help?** Check the documentation or create an issue on GitHub.

**Happy training!** 🎉

