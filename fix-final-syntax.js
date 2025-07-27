const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/app/retours/page.tsx',
  'src/app/self-cut/page.tsx'
];

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fixes spécifiques
    console.log(`Fixing ${filePath}...`);
    
    // Fix pour retours/page.tsx - apostrophe mal formée
    if (filePath.includes('retours')) {
      content = content.replace(
        `title: 'Changement d\\'avis&apos;,`,
        `title: 'Changement d\\'avis',`
      );
    }
    
    // Fix pour self-cut/page.tsx - remplacer &quot; par des guillemets normaux dans JSX
    if (filePath.includes('self-cut')) {
      // Remplacer les entités HTML dans les attributs className par des guillemets normaux
      content = content.replace(/className=&quot;([^"]*?)&quot;/g, 'className="$1"');
    }
    
    // Corrections générales pour tous les fichiers
    content = content.replace(/className=&quot;([^"]*?)&quot;/g, 'className="$1"');
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed ${filePath}`);
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
});

console.log('🎉 Syntax fixes completed!');
