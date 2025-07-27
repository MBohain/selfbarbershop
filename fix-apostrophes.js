const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Script pour corriger toutes les apostrophes non échappées dans le JSX
console.log('🔧 Fixing unescaped apostrophes in JSX...');

// Trouver tous les fichiers TypeScript/TSX
const files = glob.sync('src/**/*.{ts,tsx}', { ignore: ['node_modules/**'] });

files.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let hasChanges = false;
    
    // Remplacer les apostrophes simples par &apos; dans les chaînes JSX
    // Pattern pour détecter les apostrophes dans les chaînes de texte JSX
    const apostrophePattern = /(>[^<]*)'([^<]*<)/g;
    const matches = content.match(apostrophePattern);
    
    if (matches) {
      content = content.replace(/(>[^<]*)'([^<]*<)/g, (match, before, after) => {
        return before + '&apos;' + after;
      });
      hasChanges = true;
    }
    
    // Pattern plus spécifique pour les apostrophes dans le texte JSX
    const textApostrophePattern = /(\w)'(\w)/g;
    if (content.match(textApostrophePattern)) {
      // Seulement dans les sections de texte JSX, pas dans les attributs ou le code JS
      const lines = content.split('\n');
      content = lines.map(line => {
        // Si la ligne contient du JSX text (pas d'attribut, pas de code JS)
        if (line.includes('>') && line.includes('<') && !line.includes('=')) {
          return line.replace(/(\w)'(\w)/g, '$1&apos;$2');
        }
        return line;
      }).join('\n');
      hasChanges = true;
    }
    
    if (hasChanges) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed apostrophes in ${filePath}`);
    }
  }
});

console.log('🎉 All apostrophes fixed!');
