#!/bin/bash

# Complete Verification Script
# This script verifies EVERYTHING works correctly

set -e

echo "🔍 COMPLETE VERIFICATION STARTING..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Bun path
BUN=~/.bun/bin/bun

# Step 1: TypeScript Check
echo "📝 Step 1: TypeScript Check..."
if $BUN run check; then
    echo -e "${GREEN}✅ TypeScript check PASSED${NC}"
else
    echo -e "${RED}❌ TypeScript check FAILED${NC}"
    exit 1
fi
echo ""

# Step 2: Build
echo "🏗️  Step 2: Building project..."
if $BUN run build; then
    echo -e "${GREEN}✅ Build SUCCESSFUL${NC}"
else
    echo -e "${RED}❌ Build FAILED${NC}"
    exit 1
fi
echo ""

# Step 3: Check build output
echo "📦 Step 3: Verifying build output..."
if [ -d ".svelte-kit/output" ]; then
    echo -e "${GREEN}✅ Build directory exists${NC}"

    # Check for client output
    if [ -d ".svelte-kit/output/client" ]; then
        echo -e "${GREEN}✅ Client output exists${NC}"
    else
        echo -e "${RED}❌ Client output missing${NC}"
        exit 1
    fi

    # Check for server output
    if [ -d ".svelte-kit/output/server" ]; then
        echo -e "${GREEN}✅ Server output exists${NC}"
    else
        echo -e "${RED}❌ Server output missing${NC}"
        exit 1
    fi

    # Check bundle size
    BUILD_SIZE=$(du -sh .svelte-kit/output | cut -f1)
    echo -e "${GREEN}✅ Build size: $BUILD_SIZE${NC}"
else
    echo -e "${RED}❌ Build directory missing${NC}"
    exit 1
fi
echo ""

# Step 4: Start preview server in background
echo "🚀 Step 4: Starting preview server..."
$BUN run preview &
SERVER_PID=$!
echo "Server PID: $SERVER_PID"

# Wait for server to start
echo "Waiting for server to start..."
sleep 5

# Check if server is running
if curl -s http://localhost:4173 > /dev/null; then
    echo -e "${GREEN}✅ Server is running${NC}"
else
    echo -e "${RED}❌ Server failed to start${NC}"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi
echo ""

# Step 5: Test all pages
echo "🌐 Step 5: Testing all pages..."

# Test home page
if curl -s http://localhost:4173/ | grep -q "WorkFree"; then
    echo -e "${GREEN}✅ Home page loads${NC}"
else
    echo -e "${RED}❌ Home page failed${NC}"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

# Test product page
if curl -s http://localhost:4173/product | grep -q "Immersive"; then
    echo -e "${GREEN}✅ Product page loads${NC}"
else
    echo -e "${RED}❌ Product page failed${NC}"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

# Test pitch page
if curl -s http://localhost:4173/pitch | grep -q "Investment"; then
    echo -e "${GREEN}✅ Pitch page loads${NC}"
else
    echo -e "${RED}❌ Pitch page failed${NC}"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

# Test contact page
if curl -s http://localhost:4173/contact | grep -q "Contact"; then
    echo -e "${GREEN}✅ Contact page loads${NC}"
else
    echo -e "${RED}❌ Contact page failed${NC}"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi
echo ""

# Step 6: Test API endpoints
echo "🔌 Step 6: Testing API endpoints..."

# Test waitlist endpoint
WAITLIST_RESPONSE=$(curl -s -X POST http://localhost:4173/api/waitlist \
    -H "Content-Type: application/json" \
    -d '{"email":"test@verify.com"}')

if echo "$WAITLIST_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Waitlist API works${NC}"
else
    echo -e "${RED}❌ Waitlist API failed${NC}"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

# Test contact endpoint
CONTACT_RESPONSE=$(curl -s -X POST http://localhost:4173/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@verify.com","message":"Test message"}')

if echo "$CONTACT_RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ Contact API works${NC}"
else
    echo -e "${RED}❌ Contact API failed${NC}"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi
echo ""

# Step 7: Kill server
echo "🛑 Step 7: Stopping server..."
kill $SERVER_PID 2>/dev/null || true
echo -e "${GREEN}✅ Server stopped${NC}"
echo ""

# Final summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 ALL VERIFICATIONS PASSED!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ TypeScript check: PASSED"
echo "✅ Build: SUCCESSFUL"
echo "✅ Server: RUNNING"
echo "✅ Home page: WORKING"
echo "✅ Product page: WORKING"
echo "✅ Pitch page: WORKING"
echo "✅ Contact page: WORKING"
echo "✅ Waitlist API: WORKING"
echo "✅ Contact API: WORKING"
echo ""
echo "🚀 Project is 100% VERIFIED and READY!"

