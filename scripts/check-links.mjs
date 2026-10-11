// Fails if any internal link or asset in dist/ points to a file that does not exist,
// or if a page still contains draft markers. Run after a build: `npm run check`.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const DRAFT_MARKERS = [/TASLAK/, /\(DRAFT\)/, /TO CONFIRM/, /ONAYLANACAK/];

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const exists = (urlPath) => {
  const target = join(DIST, decodeURIComponent(urlPath));
  return urlPath.endsWith('/') ? existsSync(join(target, 'index.html')) : existsSync(target);
};

const problems = [];
for (const file of walk(DIST).filter((f) => f.endsWith('.html'))) {
  const page = relative(DIST, file);
  const text = readFileSync(file, 'utf8');
  for (const [, url] of text.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!url.startsWith('/')) {
      if (!/^(https?:|mailto:|#)/.test(url)) problems.push(`${page}: relative link ${url}`);
      continue;
    }
    const [path, hash] = url.split('#');
    if (!exists(path)) problems.push(`${page}: missing ${url}`);
    else if (hash && path.endsWith('/')) {
      const target = readFileSync(join(DIST, path, 'index.html'), 'utf8');
      if (!target.includes(`id="${hash}"`)) problems.push(`${page}: missing anchor ${url}`);
    }
  }
  for (const [, id] of text.matchAll(/href="#([^"]+)"/g)) {
    if (!text.includes(`id="${id}"`)) problems.push(`${page}: missing anchor #${id}`);
  }
  for (const marker of DRAFT_MARKERS) if (marker.test(text)) problems.push(`${page}: draft marker ${marker}`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('Links and anchors OK, no draft markers.');
