import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(new URL('..', import.meta.url)));

const requiredFiles = [
  'favicon.ico',
  'manifest.json',
  'assets/icons/icon-192.svg',
  'assets/icons/icon-512.svg',
  'assets/social/github.svg',
  'assets/social/linkedin.svg',
  'assets/placeholders/profile-placeholder.svg',
  'assets/placeholders/logo-placeholder.svg',
  'assets/images/.gitkeep',
  'assets/fonts/.gitkeep'
];

for (const file of requiredFiles) {
  const path = join(root, file);
  assert.equal(existsSync(path), true, `Missing asset: ${file}`);
}

const manifest = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8'));
assert.equal(manifest.name, 'OBJETIVONET Email Signature Generator');
assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 2);

for (const icon of manifest.icons) {
  assert.ok(icon.src.startsWith('assets/icons/'), `Invalid icon path: ${icon.src}`);
  assert.equal(existsSync(join(root, icon.src)), true, `Manifest icon not found: ${icon.src}`);
  assert.match(icon.type ?? '', /svg|png|ico/, `Invalid icon type: ${icon.type}`);
}

const serviceWorker = readFileSync(join(root, 'service-worker.js'), 'utf8');
assert.match(serviceWorker, /v0\.6\.0/, 'Service worker cache version should be v0.6.0');
assert.match(serviceWorker, /\/favicon\.ico/);
assert.match(serviceWorker, /\/assets\/social\/github\.svg/);
assert.match(serviceWorker, /\/assets\/placeholders\/profile-placeholder\.svg/);

const indexHtml = readFileSync(join(root, 'index.html'), 'utf8');
assert.match(indexHtml, /rel="icon" href="\/favicon\.ico"/);
assert.match(indexHtml, /assets\/icons\/icon-192\.svg/);

const svgFiles = [
  'assets/icons/icon-192.svg',
  'assets/icons/icon-512.svg',
  'assets/social/github.svg',
  'assets/social/linkedin.svg',
  'assets/placeholders/profile-placeholder.svg',
  'assets/placeholders/logo-placeholder.svg'
];

for (const file of svgFiles) {
  const content = readFileSync(join(root, file), 'utf8');
  assert.match(content, /<svg[\s\S]*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/, `Invalid SVG: ${file}`);
  assert.match(content, /<\/svg>/, `Unclosed SVG: ${file}`);
}

const favicon = readFileSync(join(root, 'favicon.ico'));
assert.equal(favicon[0], 0);
assert.equal(favicon[1], 0);
assert.equal(favicon[2], 1);
assert.equal(favicon[3], 0);

console.log('Assets layer validation tests passed');
