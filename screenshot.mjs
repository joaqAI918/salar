// Screenshot a URL into "./temporary screenshots/screenshot-N[-label].png" (auto-incremented).
// Usage:
//   node screenshot.mjs http://localhost:3000 [label] [--width=1440] [--height=900] [--full] [--reduced-motion] [--wait=800]
import puppeteer from 'puppeteer';
import { mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const OUT_DIR = join(ROOT, 'temporary screenshots');
mkdirSync(OUT_DIR, { recursive: true });

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--')) ?? 'http://localhost:3000';
const label = args.filter((a) => !a.startsWith('--'))[1];
const flag = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=')[1] : fallback;
};
const width = Number(flag('width', 1440));
const height = Number(flag('height', 900));
const fullPage = args.includes('--full');
const reducedMotion = args.includes('--reduced-motion');
const wait = Number(flag('wait', 900));

const next = () => {
  const nums = readdirSync(OUT_DIR)
    .map((f) => /^screenshot-(\d+)/.exec(f))
    .filter(Boolean)
    .map((m) => Number(m[1]));
  return (nums.length ? Math.max(...nums) : 0) + 1;
};

const file = join(OUT_DIR, `screenshot-${next()}${label ? `-${label}` : ''}.png`);

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
await page.emulateMediaFeatures([
  { name: 'prefers-reduced-motion', value: reducedMotion ? 'reduce' : 'no-preference' },
  { name: 'prefers-color-scheme', value: 'dark' },
]);
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
if (args.includes('--scroll')) {
  // walk the page so IntersectionObserver reveals fire, then return to top
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 160));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1400));
}
await new Promise((r) => setTimeout(r, wait));
await page.screenshot({ path: file, fullPage });
await browser.close();
console.log(file);
