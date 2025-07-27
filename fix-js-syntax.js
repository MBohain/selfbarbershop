const fs = require('fs');

console.log('🚨 CORRECTION URGENTE: Fixing JavaScript object syntax...\n');

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
    
    // Fix JavaScript object property values (but not JSX content)
    // Only fix properties in objects/arrays, not JSX content
    
    // Fix object properties with quotes around values
    content = content.replace(/(\w+):\s*&apos;([^&]*?)&apos;/g, "$1: '$2'");
    
    // Fix template literals in JSX with proper handling
    content = content.replace(/\?\s*&apos;([^&]*?)&apos;\s*/g, "? '$1' ");
    content = content.replace(/:\s*&apos;([^&]*?)&apos;/g, ": '$1'");
    
    // Fix template literal expressions in className
    content = content.replace(/&apos;([^&]*?)&apos;/g, (match, content_match) => {
      // Only replace if it's clearly inside JavaScript context (not JSX text content)
      return `'${content_match}'`;
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed JavaScript syntax in: ${filePath}`);
  }
});

console.log('\n✅ JavaScript object syntax fixes completed!');
