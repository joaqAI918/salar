// Generate sitemap.xml from the HTML files in the project root.
// Never hand-maintain the sitemap — re-run this script instead.
// Usage: node scripts/build-sitemap.mjs
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_URL = 'https://joaqai918.github.io/salar/';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const EXCLUDE = new Set(['404.html']);

const pages = readdirSync(ROOT)
  .filter((f) => f.endsWith('.html') && !EXCLUDE.has(f))
  .map((f) => ({
    loc: f === 'index.html' ? BASE_URL : BASE_URL + f,
    lastmod: statSync(join(ROOT, f)).mtime.toISOString().slice(0, 10),
  }));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;

writeFileSync(join(ROOT, 'sitemap.xml'), xml);
console.log(`sitemap.xml written (${pages.length} urls)`);
