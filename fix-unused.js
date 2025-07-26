const fs = require('fs');

const unusedImportFixes = [
  // Fix admin/guide/page.tsx - remove unused PencilIcon
  {
    file: 'src/app/admin/guide/page.tsx',
    search: /import.*PencilIcon.*from.*\n/,
    replace: ''
  },

  // Fix admin/products/page.tsx - remove unused FunnelIcon
  {
    file: 'src/app/admin/products/page.tsx',
    search: /,\s*FunnelIcon/,
    replace: ''
  },

  // Fix contact/page.tsx - remove unused MapPinIcon
  {
    file: 'src/app/contact/page.tsx',
    search: /import.*MapPinIcon.*from.*\n/,
    replace: ''
  },

  // Fix produits pages - remove unused FunnelIcon and features
  {
    file: 'src/app/produits/page-new.tsx',
    search: /,\s*FunnelIcon/,
    replace: ''
  },

  {
    file: 'src/app/produits/page.tsx', 
    search: /,\s*FunnelIcon/,
    replace: ''
  },

  // Fix retours/page.tsx - remove unused index parameter
  {
    file: 'src/app/retours/page.tsx',
    search: /(step,\s*)index/,
    replace: 'step'
  },

  // Fix unused error variables
  {
    file: 'src/app/admin/dashboard/page.tsx',
    search: /} catch \(error\) {/,
    replace: '} catch {'
  },

  {
    file: 'src/app/api/admin/products/[id]/route.ts',
    search: /} catch \(error\) {/,
    replace: '} catch {'
  },

  {
    file: 'src/app/api/admin/products/route.ts',
    search: /} catch \(error\) {/,
    replace: '} catch {'
  },

  {
    file: 'src/lib/aliexpress.ts',
    search: /} catch \(error\) {/g,
    replace: '} catch {'
  }
];

console.log('🔧 Fixing unused imports and variables...\n');

unusedImportFixes.forEach(fix => {
  if (fs.existsSync(fix.file)) {
    let content = fs.readFileSync(fix.file, 'utf8');
    const before = content;
    
    content = content.replace(fix.search, fix.replace);
    
    if (content !== before) {
      fs.writeFileSync(fix.file, content);
      console.log(`✅ Fixed imports in ${fix.file}`);
    }
  }
});

console.log('\n✅ Unused import fixes applied!');
