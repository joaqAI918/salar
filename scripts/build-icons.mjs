// Render favicon.ico (16+32) and apple-touch-icon.png (180) from assets/favicon.svg.
// Usage: node scripts/build-icons.mjs
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const svg = readFileSync(join(ROOT, 'assets', 'favicon.svg'));

const png = (size) => sharp(svg, { density: 512 }).resize(size, size).png().toBuffer();

const [p16, p32, p180] = await Promise.all([png(16), png(32), png(180)]);
writeFileSync(join(ROOT, 'favicon.ico'), await pngToIco([p16, p32]));
writeFileSync(join(ROOT, 'assets', 'apple-touch-icon.png'), p180);
console.log('favicon.ico + apple-touch-icon.png written');
