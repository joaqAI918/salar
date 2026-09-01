// Fail if any page logs console errors/warnings or any request 404s.
// Usage: node scripts/check-console.mjs   (dev server must be running)
import puppeteer from 'puppeteer';

const pages = ['/', '/cordillera.html', '/404.html'];
const browser = await puppeteer.launch();
let failures = 0;

for (const path of pages) {
  const page = await browser.newPage();
  const problems = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      problems.push(`console.${msg.type()}: ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`));
  page.on('response', (res) => {
    if (res.status() >= 400 && !res.url().endsWith('/404.html')) {
      problems.push(`HTTP ${res.status()}: ${res.url()}`);
    }
  });
  await page.goto(`http://localhost:3000${path}`, { waitUntil: 'networkidle0' });
  await page.evaluate(async () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 400));
  });
  if (problems.length) {
    failures += problems.length;
    console.log(`✗ ${path}`);
    for (const p of problems) console.log(`  ${p}`);
  } else {
    console.log(`✓ ${path} clean`);
  }
  await page.close();
}

await browser.close();
process.exit(failures ? 1 : 0);
