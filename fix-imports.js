const fs = require('fs');

console.log('🔧 Fixing over-escaped import statements...\n');

const filesToFix = [
  'src/app/livraison/page.tsx',
  'src/app/paiements/page.tsx', 
  'src/app/retours/page.tsx',
  'src/app/self-cut/page.tsx',
  'src/app/test-shipping/page.tsx'
];

filesToFix.forEach(filePath => {
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
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed imports in: ${filePath}`);
  }
});

console.log('\n✅ Import statement fixes completed!');
