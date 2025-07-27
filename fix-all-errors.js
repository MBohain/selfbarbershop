const fs = require('fs');
const path = require('path');

// List of files to fix with their specific issues
const fixes = [
  // Fix page.tsx apostrophe issues
  {
    file: 'src/app/page.tsx',
    replacements: [
      {search: "Pourquoi choisir SelfBarberShop ?", replace: "Pourquoi choisir SelfBarberShop ?"},
      {search: "Nous nous engageons à vous offrir la meilleure expérience d'achat", replace: "Nous nous engageons à vous offrir la meilleure expérience d&apos;achat"}
    ]
  },
  
  // Fix admin/featured-products/page.tsx
  {
    file: 'src/app/admin/featured-products/page.tsx',
    replacements: [
      {search: "import Image from 'next/image';\n'use client';", replace: "'use client';\n\nimport { useState, useEffect } from 'react';"},
      {search: "l'administration", replace: "l&apos;administration"},
      {search: "d'autres produits \"populaires\"", replace: "d&apos;autres produits &quot;populaires&quot;"}
    ]
  },

  // Fix admin/dashboard/page.tsx
  {
    file: 'src/app/admin/dashboard/page.tsx', 
    replacements: [
      {search: ") => any) | undefined", replace: ") => unknown) | undefined"},
      {search: "} catch (error) {", replace: "} catch {"}
    ]
  },

  // Fix admin/guide/page.tsx
  {
    file: 'src/app/admin/guide/page.tsx',
    replacements: [
      {search: "import { PencilIcon } from '@heroicons/react/24/outline';", replace: ""},
      {search: "d'automatisation", replace: "d&apos;automatisation"}
    ]
  },

  // Fix admin/products/new/page.tsx
  {
    file: 'src/app/admin/products/new/page.tsx',
    replacements: [
      {search: "l'ajout", replace: "l&apos;ajout"}
    ]
  },

  // Fix admin/products/page.tsx
  {
    file: 'src/app/admin/products/page.tsx',
    replacements: [
      {search: "import { FunnelIcon } from '@heroicons/react/24/outline';", replace: ""}
    ]
  },

  // Fix admin/stats/page.tsx
  {
    file: 'src/app/admin/stats/page.tsx',
    replacements: [
      {search: ": any", replace: ": unknown"},
      {search: ": any[]", replace: ": unknown[]"}
    ]
  },

  // Fix API routes
  {
    file: 'src/app/api/admin/products/[id]/route.ts',
    replacements: [
      {search: ": any", replace: ": unknown"},
      {search: "} catch (error) {", replace: "} catch {"}
    ]
  },

  {
    file: 'src/app/api/admin/products/route.ts',
    replacements: [
      {search: ": any", replace: ": unknown"},
      {search: "} catch (error) {", replace: "} catch {"}
    ]
  },

  {
    file: 'src/app/api/admin/settings/route.ts',
    replacements: [
      {search: ": any", replace: ": unknown"}
    ]
  },

  {
    file: 'src/app/api/create-payment-intent/route.ts',
    replacements: [
      {search: ": any", replace: ": unknown"}
    ]
  },

  {
    file: 'src/app/api/orders/route.ts',
    replacements: [
      {search: ": any", replace: ": unknown"}
    ]
  },

  {
    file: 'src/app/api/products/route.ts',
    replacements: [
      {search: ": any", replace: ": unknown"}
    ]
  },

  // Fix checkout/page.tsx
  {
    file: 'src/app/checkout/page.tsx',
    replacements: [
      {search: ": any", replace: ": unknown"},
      {search: '<a href="/" className="text-blue-600 hover:underline">', replace: '<Link href="/" className="text-blue-600 hover:underline">'},
      {search: "</a>", replace: "</Link>"},
      {search: "l'adresse", replace: "l&apos;adresse"}
    ]
  },

  // Fix contact/page.tsx
  {
    file: 'src/app/contact/page.tsx',
    replacements: [
      {search: "import { MapPinIcon } from '@heroicons/react/24/outline';", replace: ""},
      {search: /'/g, replace: "&apos;"}
    ]
  },

  // Fix login/page.tsx
  {
    file: 'src/app/login/page.tsx',
    replacements: [
      {search: ": any", replace: ": unknown"},
      {search: "S'identifier", replace: "S&apos;identifier"}
    ]
  },

  // Fix self-cut pages with quote/apostrophe issues
  {
    file: 'src/app/self-cut/page-new.tsx',
    replacements: [
      {search: ": any", replace: ": unknown"},
      {search: "d'un", replace: "d&apos;un"}
    ]
  },

  {
    file: 'src/app/self-cut/page.tsx',
    replacements: [
      {search: ", setGuideInfo] = useState", replace: "] = useState"},
      {search: /"/g, replace: "&quot;"},
      {search: /'/g, replace: "&apos;"}
    ]
  },

  // Fix various page apostrophe issues
  {
    file: 'src/app/livraison/page.tsx',
    replacements: [
      {search: /'/g, replace: "&apos;"}
    ]
  },

  {
    file: 'src/app/paiements/page.tsx',
    replacements: [
      {search: /'/g, replace: "&apos;"}
    ]
  },

  {
    file: 'src/app/panier/page-old.tsx',
    replacements: [
      {search: /'/g, replace: "&apos;"}
    ]
  },

  {
    file: 'src/app/produits/page-old.tsx',
    replacements: [
      {search: /'/g, replace: "&apos;"}
    ]
  },

  {
    file: 'src/app/retours/page.tsx',
    replacements: [
      {search: /'/g, replace: "&apos;"}
    ]
  },

  {
    file: 'src/app/test-shipping/page.tsx',
    replacements: [
      {search: /'/g, replace: "&apos;"}
    ]
  },

  // Fix components
  {
    file: 'src/components/CartNotifications.tsx',
    replacements: [
      {search: ": any", replace: ": unknown"}
    ]
  },

  // Remove unused imports from various files
  {
    file: 'src/app/produits/page-new.tsx',
    replacements: [
      {search: ", FunnelIcon", replace: ""},
      {search: "const features = ", replace: "// const features = "}
    ]
  },

  {
    file: 'src/app/produits/page.tsx',
    replacements: [
      {search: ", FunnelIcon", replace: ""},
      {search: "const features = ", replace: "// const features = "}
    ]
  },

  {
    file: 'src/app/retours/page.tsx',
    replacements: [
      {search: "(step, index)", replace: "(step)"}
    ]
  },

  // Remove unused imports from API routes
  {
    file: 'src/app/api/admin/guide/route.ts',
    replacements: [
      {search: "const prisma = ", replace: "// const prisma = "}
    ]
  },

  {
    file: 'src/app/api/admin/orders/[id]/route.ts',
    replacements: [
      {search: "const prisma = ", replace: "// const prisma = "}
    ]
  },

  {
    file: 'src/app/api/admin/orders/route.ts',
    replacements: [
      {search: "const prisma = ", replace: "// const prisma = "}
    ]
  },

  {
    file: 'src/app/api/admin/stats/route.ts',
    replacements: [
      {search: "import { prisma } from '@/lib/db';", replace: "// import { prisma } from '@/lib/db';"}
    ]
  },

  {
    file: 'src/lib/aliexpress.ts',
    replacements: [
      {search: "} catch (error) {", replace: "} catch {"}
    ]
  }
];

console.log('🔧 Correction des erreurs TypeScript/ESLint...\n');

fixes.forEach(fix => {
  const filePath = path.join(__dirname, fix.file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    fix.replacements.forEach(replacement => {
      const before = content;
      if (replacement.search instanceof RegExp) {
        content = content.replace(replacement.search, replacement.replace);
      } else {
        content = content.replace(new RegExp(replacement.search, 'g'), replacement.replace);
      }
      
      if (content !== before) {
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${fix.file}`);
    }
  } else {
    console.log(`⚠️  Fichier non trouvé: ${fix.file}`);
  }
});

console.log('\n✅ Toutes les corrections ont été appliquées !');
