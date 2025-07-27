#!/bin/bash

echo "🔧 Fixing critical TypeScript/ESLint errors..."

# Fix admin/featured-products/page.tsx - remove unused Image import and fix quotes
sed -i '' '1s/^/\/\/ /' src/app/admin/featured-products/page.tsx

# Fix checkout/page.tsx - add Link import
if ! grep -q "import Link from 'next/link'" src/app/checkout/page.tsx; then
    sed -i '' "1i\\
import Link from 'next/link';\\
" src/app/checkout/page.tsx
fi

# Use sed to escape quotes in multiple files
files=(
    "src/app/page.tsx"
    "src/app/admin/featured-products/page.tsx"
    "src/app/admin/guide/page.tsx"
    "src/app/admin/products/new/page.tsx"
    "src/app/checkout/page.tsx"
    "src/app/contact/page.tsx"
    "src/app/livraison/page.tsx"
    "src/app/login/page.tsx"
    "src/app/paiements/page.tsx"
    "src/app/panier/page-old.tsx"
    "src/app/produits/page-old.tsx" 
    "src/app/retours/page.tsx"
    "src/app/self-cut/page-new.tsx"
    "src/app/self-cut/page.tsx"
    "src/app/test-shipping/page.tsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        # Replace single quotes with HTML entity
        sed -i '' "s/'/\&apos;/g" "$file" 2>/dev/null || true
        # Replace double quotes with HTML entity
        sed -i '' 's/"/\&quot;/g' "$file" 2>/dev/null || true
        echo "✅ Fixed quotes: $file"
    fi
done

echo "✅ Critical fixes applied!"
