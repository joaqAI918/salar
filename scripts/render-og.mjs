// Render the OG templates to assets/og/*.png at exactly 1200x630.
// Usage: node scripts/render-og.mjs   (dev server must be running on :3000)
import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
mkdirSync(join(ROOT, 'assets', 'og'), { recursive: true });

const pages = ['og-home', 'og-cordillera'];
const browser = await puppeteer.launch();

for (const name of pages) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:3000/scripts/og/${name}.html`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: join(ROOT, 'assets', 'og', `${name}.png`) });
  console.log(`assets/og/${name}.png`);
  await page.close();
}

await browser.close();
