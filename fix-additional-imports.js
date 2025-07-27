const fs = require('fs');

console.log('🔧 Fixing remaining over-escaped import statements...\n');

const additionalFiles = [
  'src/app/panier/page-old.tsx',
  'src/app/produits/page-old.tsx'
];

additionalFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix import statements - restore proper quotes
    content = content.replace(/import (.+) from &apos;(.+)&apos;/g, "import $1 from '$2'");
    content = content.replace(/from &apos;(.+)&apos;/g, "from '$1'");
    
    // Fix 'use client' directive
    content = content.replace(/&apos;use client&apos;/g, "'use client'");
    
    // Fix other import patterns
    content = content.replace(/&apos;@\/(.+?)&apos;/g, "'@/$1'");
    content = content.replace(/&apos;react&apos;/g, "'react'");
    content = content.replace(/&apos;next\/(.+?)&apos;/g, "'next/$1'");
    content = content.replace(/&apos;@heroicons\/(.+?)&apos;/g, "'@heroicons/$1'");
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed imports in: ${filePath}`);
  }
});

console.log('\n✅ All import statement fixes completed!');
