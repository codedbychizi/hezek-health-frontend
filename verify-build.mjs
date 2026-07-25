import fs from 'fs';
import path from 'path';

const cwd = process.cwd();
const root = path.join(cwd, 'src');
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(js|jsx|ts|tsx|svg|png|jpg|jpeg|gif|webp|mp4|pdf|woff|woff2)$/.test(entry.name)) {
      files.push(p);
    }
  }
}

walk(root);
const regex = /from\s+['"]([^'"]+)['"]/g;
const bad = [];

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = regex.exec(text))) {
    const spec = match[1];
    if (spec.startsWith('.') || spec.startsWith('/')) {
      const base = path.resolve(path.dirname(file), spec);
      const exts = ['', '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'];
      let found = false;
      for (const ext of exts) {
        if (fs.existsSync(base + ext)) {
          found = true;
          break;
        }
        if (fs.existsSync(path.join(base, 'index' + ext))) {
          found = true;
          break;
        }
      }
      if (!found) {
        bad.push({ file: path.relative(cwd, file), spec });
      }
    }
  }
}

if (bad.length) {
  console.log(JSON.stringify(bad, null, 2));
  process.exit(1);
}

console.log('all relative imports resolved');
