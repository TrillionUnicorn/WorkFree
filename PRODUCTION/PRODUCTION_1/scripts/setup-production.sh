#!/bin/bash

# WorkFree Production Setup Script
# This script helps set up the production environment

set -e

echo "🔧 WorkFree Production Setup"
echo "============================="
echo ""

# Check if Turso CLI is installed
if ! command -v turso &> /dev/null; then
    echo "📦 Installing Turso CLI..."
    curl -sSfL https://get.tur.so/install.sh | bash
    echo "✅ Turso CLI installed"
else
    echo "✅ Turso CLI already installed"
fi

# Login to Turso
echo ""
echo "🔐 Logging in to Turso..."
turso auth login

# Create database
echo ""
read -p "Enter database name (default: workfree-prod): " DB_NAME
DB_NAME=${DB_NAME:-workfree-prod}

echo "📊 Creating database: $DB_NAME"
turso db create $DB_NAME --location iad

# Get connection details
echo ""
echo "📋 Database connection details:"
echo "================================"
DB_URL=$(turso db show $DB_NAME --url)
echo "URL: $DB_URL"
echo ""
echo "Creating auth token..."
DB_TOKEN=$(turso db tokens create $DB_NAME)
echo "Token: $DB_TOKEN"

# Save to .env.production
echo ""
echo "💾 Saving to .env.production..."
cat > .env.production << EOF
# Production Environment Variables
# Generated on $(date)

# Database
DATABASE_URL=$DB_URL
DATABASE_AUTH_TOKEN=$DB_TOKEN

# Stripe (REPLACE WITH YOUR LIVE KEYS)
STRIPE_SECRET_KEY=sk_live_your_key_here
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
STRIPE_PRICE_STARTER=price_your_id_here
STRIPE_PRICE_PROFESSIONAL=price_your_id_here
STRIPE_PRICE_ENTERPRISE=price_your_id_here

# Email (REPLACE WITH YOUR KEY)
RESEND_API_KEY=re_your_key_here

# App Configuration
PUBLIC_APP_URL=https://workfree.com
NODE_ENV=production
EOF

echo "✅ .env.production created"

# Run migrations
echo ""
read -p "Run database migrations now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔄 Running migrations..."
    DATABASE_URL=$DB_URL DATABASE_AUTH_TOKEN=$DB_TOKEN bun run db:migrate
    echo "✅ Migrations complete"
fi

# Seed database
echo ""
read -p "Seed database with initial data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    DATABASE_URL=$DB_URL DATABASE_AUTH_TOKEN=$DB_TOKEN bun run db:seed
    echo "✅ Database seeded"
fi

echo ""
echo "🎉 Production setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.production with your Stripe and Resend keys"
echo "2. Set up Stripe products and webhooks"
echo "3. Configure Cloudflare Pages environment variables"
echo "4. Run: bun run deploy"
echo ""

