const fs = require('fs');

const specificFixes = [
  // Fix admin/featured-products/page.tsx specific issues
  {
    file: 'src/app/admin/featured-products/page.tsx',
    fixes: [
      { line: 124, search: "l'administration", replace: "l&apos;administration" },
      { line: 183, search: "d'autres produits \"populaires\"", replace: "d&apos;autres produits &quot;populaires&quot;" }
    ]
  },
  
  // Fix page.tsx specific issues
  {
    file: 'src/app/page.tsx', 
    fixes: [
      { line: 162, search: "Pourquoi choisir SelfBarberShop ?", replace: "Pourquoi choisir SelfBarberShop ?" },
      { line: 173, search: "d'achat", replace: "d&apos;achat" }
    ]
  },

  // Fix admin/guide/page.tsx
  {
    file: 'src/app/admin/guide/page.tsx',
    fixes: [
      { line: 427, search: "d'automatisation", replace: "d&apos;automatisation" }
    ]
  },

  // Fix admin/products/new/page.tsx
  {
    file: 'src/app/admin/products/new/page.tsx',
    fixes: [
      { line: 320, search: "l'ajout", replace: "l&apos;ajout" }
    ]
  },

  // Fix checkout/page.tsx
  {
    file: 'src/app/checkout/page.tsx',
    fixes: [
      { line: 149, search: "l'adresse", replace: "l&apos;adresse" }
    ]
  },

  // Fix contact/page.tsx
  {
    file: 'src/app/contact/page.tsx',
    fixes: [
      { line: 21, search: "d'un", replace: "d&apos;un" },
      { line: 132, search: "n'hésitez", replace: "n&apos;hésitez" },
      { line: 199, search: "d'expédition", replace: "d&apos;expédition" },
      { line: 216, search: "l'état", replace: "l&apos;état" },
      { line: 220, search: "d'avoir", replace: "d&apos;avoir" },
      { line: 237, search: "l'équipe", replace: "l&apos;équipe" }
    ]
  },

  // Fix login/page.tsx
  {
    file: 'src/app/login/page.tsx',
    fixes: [
      { line: 59, search: "S'identifier", replace: "S&apos;identifier" }
    ]
  },

  // Fix self-cut/page-new.tsx
  {
    file: 'src/app/self-cut/page-new.tsx',
    fixes: [
      { line: 63, search: "d'un", replace: "d&apos;un" }  
    ]
  }
];

console.log('🔧 Fixing specific ESLint quote errors...\n');

specificFixes.forEach(fileData => {
  const filePath = fileData.file;
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    fileData.fixes.forEach(fix => {
      const before = content;
      content = content.replace(fix.search, fix.replace);
      
      if (content !== before) {
        hasChanges = true;
        console.log(`✅ Fixed line ${fix.line} in ${filePath}`);
      }
    });
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content);
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log('\n✅ Specific quote fixes applied!');
