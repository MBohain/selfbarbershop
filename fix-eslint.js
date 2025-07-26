const fs = require('fs');

// Fix page.tsx
let pageContent = fs.readFileSync('src/app/page.tsx', 'utf8');
pageContent = pageContent.replace('} catch (error) {', '} catch (error: unknown) {');
fs.writeFileSync('src/app/page.tsx', pageContent);

// Fix featured-products/page.tsx
let featuredContent = fs.readFileSync('src/app/admin/featured-products/page.tsx', 'utf8');

// Fix any type
featuredContent = featuredContent.replace('(product: any)', '(product: { id: string; name: string; price: number; originalPrice: number; images: string | string[]; category: { name: string; }; })');

// Fix apostrophes
featuredContent = featuredContent.replace(/l'Accueil/g, 'l&apos;Accueil');
featuredContent = featuredContent.replace(/d'ajout/g, 'd&apos;ajout');
featuredContent = featuredContent.replace(/l'accueil/g, 'l&apos;accueil');
featuredContent = featuredContent.replace(/n'est/g, 'n&apos;est');

// Fix quotes
featuredContent = featuredContent.replace(/"Vedette"/g, '&quot;Vedette&quot;');

// Replace img with Image (we'll add import)
featuredContent = featuredContent.replace('<img', '<img');
featuredContent = 'import Image from \'next/image\';\n' + featuredContent;

fs.writeFileSync('src/app/admin/featured-products/page.tsx', featuredContent);

console.log('✅ Corrections appliquées !');
