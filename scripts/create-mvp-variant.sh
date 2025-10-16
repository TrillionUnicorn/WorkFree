#!/bin/bash

# Script to create a new MVP variant
# Usage: ./scripts/create-mvp-variant.sh <variant-name>

VARIANT_NAME=$1

if [ -z "$VARIANT_NAME" ]; then
    echo "Error: Please provide a variant name"
    echo "Usage: ./scripts/create-mvp-variant.sh <variant-name>"
    exit 1
fi

echo "Creating MVP variant: $VARIANT_NAME"

# Create variant directory
mkdir -p "mvp-variants/$VARIANT_NAME"

# Copy current src structure
cp -r src "mvp-variants/$VARIANT_NAME/"

# Copy configuration files
cp svelte.config.js "mvp-variants/$VARIANT_NAME/"
cp vite.config.ts "mvp-variants/$VARIANT_NAME/"
cp tailwind.config.js "mvp-variants/$VARIANT_NAME/"
cp postcss.config.js "mvp-variants/$VARIANT_NAME/"
cp tsconfig.json "mvp-variants/$VARIANT_NAME/"

# Create README for variant
cat > "mvp-variants/$VARIANT_NAME/README.md" << EOF
# MVP Variant: $VARIANT_NAME

## Description
[Add description here]

## Target Audience
[Add target audience here]

## Key Differences
- [Difference 1]
- [Difference 2]
- [Difference 3]

## Design System
- **Primary Color:** [color]
- **Secondary Color:** [color]
- **Typography:** [fonts]

## Unique Features
- [Feature 1]
- [Feature 2]
- [Feature 3]

## Testing
\`\`\`bash
# Run tests for this variant
bun run test:$VARIANT_NAME
\`\`\`

## Deployment
\`\`\`bash
# Build this variant
bun run build:$VARIANT_NAME
\`\`\`
EOF

echo "✅ MVP variant '$VARIANT_NAME' created successfully!"
echo "📁 Location: mvp-variants/$VARIANT_NAME"
echo ""
echo "Next steps:"
echo "1. Update the design system in mvp-variants/$VARIANT_NAME/src/app.css"
echo "2. Modify components in mvp-variants/$VARIANT_NAME/src/lib/components"
echo "3. Update pages in mvp-variants/$VARIANT_NAME/src/routes"
echo "4. Test the variant"
echo "5. Create a PR for review"

