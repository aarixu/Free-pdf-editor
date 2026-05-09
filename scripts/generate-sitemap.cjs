const fs = require('fs');
const path = require('path');

const tsCode = fs.readFileSync(path.join(__dirname, '../src/config/tools.ts'), 'utf8');

const slugs = [];
const regex = /slug:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(tsCode)) !== null) {
  slugs.push(match[1]);
}

const currentDate = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

sitemap += `  <url>\n`;
sitemap += `    <loc>https://piscis.live/en/</loc>\n`;
sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
sitemap += `    <changefreq>weekly</changefreq>\n`;
sitemap += `    <priority>1.0</priority>\n`;
sitemap += `  </url>\n`;

for (const slug of slugs) {
  sitemap += `  <url>\n`;
  sitemap += `    <loc>https://piscis.live/en/tools/${slug}</loc>\n`;
  sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
  sitemap += `    <changefreq>weekly</changefreq>\n`;
  sitemap += `    <priority>0.8</priority>\n`;
  sitemap += `  </url>\n`;
}

sitemap += `</urlset>\n`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('Sitemap generated successfully with ' + slugs.length + ' tools.');
