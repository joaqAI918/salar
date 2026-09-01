// Convert the source PNGs into AVIF + WebP at responsive widths.
// Usage: node scripts/process-images.mjs
import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(ROOT, 'assets', 'img', 'src');
const OUT = join(ROOT, 'assets', 'img');
const WIDTHS = [680, 1024, 1360];

for (const file of readdirSync(SRC).filter((f) => f.endsWith('.png'))) {
  const { name } = parse(file);
  for (const width of WIDTHS) {
    const base = sharp(join(SRC, file)).resize({ width });
    const avif = join(OUT, `${name}-${width}.avif`);
    const webp = join(OUT, `${name}-${width}.webp`);
    await base.clone().avif({ quality: 55 }).toFile(avif);
    await base.clone().webp({ quality: 74 }).toFile(webp);
    console.log(
      `${name}-${width}: avif ${(statSync(avif).size / 1024).toFixed(0)}KB · webp ${(statSync(webp).size / 1024).toFixed(0)}KB`
    );
  }
}
