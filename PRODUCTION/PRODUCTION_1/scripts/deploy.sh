#!/bin/bash

# WorkFree Production Deployment Script
# This script automates the deployment process

set -e  # Exit on error

echo "🚀 WorkFree Production Deployment"
echo "=================================="
echo ""

# Check if we're on the right branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "production/production-1-build" ]; then
    echo "⚠️  Warning: You're not on production/production-1-build branch"
    echo "Current branch: $CURRENT_BRANCH"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "⚠️  You have uncommitted changes"
    git status -s
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Run tests
echo "🧪 Running tests..."
bun run test:unit || {
    echo "❌ Tests failed!"
    exit 1
}

# Type checking
echo "🔍 Type checking..."
bun run check || {
    echo "❌ Type check failed!"
    exit 1
}

# Build
echo "🔨 Building for production..."
bun run build:prod || {
    echo "❌ Build failed!"
    exit 1
}

# Deploy to Cloudflare Pages
echo "☁️  Deploying to Cloudflare Pages..."
wrangler pages deploy build --project-name=workfree || {
    echo "❌ Deployment failed!"
    exit 1
}

echo ""
echo "✅ Deployment successful!"
echo "🎉 Your app is now live!"
echo ""
echo "Next steps:"
echo "1. Test the production site"
echo "2. Monitor error logs"
echo "3. Check analytics"
echo ""

