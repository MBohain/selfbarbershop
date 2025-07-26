const fs = require('fs');

const typeErrorFixes = [
  // Fix admin/dashboard/page.tsx
  {
    file: 'src/app/admin/dashboard/page.tsx',
    search: ') => any) | undefined',
    replace: ') => unknown) | undefined'
  },
  
  // Fix admin/stats/page.tsx
  {
    file: 'src/app/admin/stats/page.tsx',
    search: ': any',
    replace: ': unknown'
  },

  // Fix API routes
  {
    file: 'src/app/api/admin/products/[id]/route.ts',
    search: ': any',
    replace: ': unknown'
  },

  {
    file: 'src/app/api/admin/products/route.ts',
    search: ': any',
    replace: ': unknown'
  },

  {
    file: 'src/app/api/admin/settings/route.ts',
    search: ': any',
    replace: ': unknown'
  },

  {
    file: 'src/app/api/create-payment-intent/route.ts',
    search: ': any',
    replace: ': unknown'
  },

  {
    file: 'src/app/api/orders/route.ts',
    search: ': any',
    replace: ': unknown'
  },

  {
    file: 'src/app/api/products/route.ts',
    search: ': any',
    replace: ': unknown'
  },

  // Fix checkout/page.tsx
  {
    file: 'src/app/checkout/page.tsx',
    search: ': any',
    replace: ': unknown'
  },

  // Fix login/page.tsx
  {
    file: 'src/app/login/page.tsx',
    search: ': any',
    replace: ': unknown'
  },

  // Fix self-cut/page-new.tsx
  {
    file: 'src/app/self-cut/page-new.tsx',
    search: ': any',
    replace: ': unknown'
  },

  // Fix components
  {
    file: 'src/components/CartNotifications.tsx',
    search: ': any',
    replace: ': unknown'
  }
];

console.log('🔧 Fixing TypeScript any type errors...\n');

typeErrorFixes.forEach(fix => {
  if (fs.existsSync(fix.file)) {
    let content = fs.readFileSync(fix.file, 'utf8');
    const before = content;
    
    // Replace all instances of the search pattern
    content = content.replace(new RegExp(fix.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), fix.replace);
    
    if (content !== before) {
      fs.writeFileSync(fix.file, content);
      console.log(`✅ Fixed types in ${fix.file}`);
    }
  }
});

console.log('\n✅ TypeScript type fixes applied!');
