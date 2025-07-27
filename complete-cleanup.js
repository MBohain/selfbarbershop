const fs = require('fs');
const path = require('path');

// Script pour nettoyer complètement tous les fichiers des entités HTML mal placées
const filesToClean = [
  'src/app/self-cut/page.tsx'
];

filesToClean.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    console.log(`🧹 Cleaning ${filePath}...`);
    
    // Remplacer toutes les entités HTML par leurs équivalents normaux
    // SEULEMENT dans les contextes où elles ne sont pas appropriées
    
    // &quot; dans les attributs JSX (href, className, etc.)
    content = content.replace(/(\w+)=&quot;([^"]*?)&quot;/g, '$1="$2"');
    
    // &apos; dans les chaînes JavaScript
    content = content.replace(/&apos;/g, "'");
    
    // &amp; dans les URLs ou le code JavaScript
    content = content.replace(/&amp;/g, "&");
    
    // &lt; et &gt; dans le code JavaScript
    content = content.replace(/&lt;/g, "<");
    content = content.replace(/&gt;/g, ">");
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Cleaned ${filePath}`);
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
});

console.log('🎉 Complete cleanup finished!');
