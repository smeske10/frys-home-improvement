/**
 * inject-meta.mjs
 *
 * Reads src/siteConfig.ts, extracts meta values, and generates index.html
 * from index.template.html. Run automatically via `prebuild` and `predev`.
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// ── Parse siteConfig.ts ────────────────────────────────────────────────────

const config = readFileSync(resolve(root, 'src/siteConfig.ts'), 'utf-8');

/**
 * Extracts the first double-quoted string value for a given key.
 * Handles keys separated from their value by optional whitespace/newlines.
 */
function extract(key) {
  const match = config.match(new RegExp(`${key}:\\s*"([^"]+)"`));
  if (!match) throw new Error(`inject-meta: could not find "${key}" in siteConfig.ts`);
  return match[1];
}

const pageTitle     = extract('pageTitle');
const metaDesc      = extract('metaDescription');
const siteUrl       = extract('siteUrl');
const ogImageUrl    = extract('ogImageUrl');
const logoUrl       = extract('logoUrl');
const nameLine1     = extract('nameLine1');
const nameLine2     = extract('nameLine2');
const gtmId         = extract('gtmId');

const ogImageAlt = `Home remodeling work by ${nameLine1} ${nameLine2}`;

// ── Replace tokens ─────────────────────────────────────────────────────────

const template = readFileSync(resolve(root, 'index.template.html'), 'utf-8');

const output = template
  .replaceAll('__PAGE_TITLE__',      pageTitle)
  .replaceAll('__META_DESCRIPTION__', metaDesc)
  .replaceAll('__SITE_URL__',        siteUrl)
  .replaceAll('__OG_IMAGE_URL__',    ogImageUrl)
  .replaceAll('__OG_IMAGE_ALT__',    ogImageAlt)
  .replaceAll('__LOGO_URL__',        logoUrl)
  .replaceAll('__GTM_ID__',          gtmId);

writeFileSync(resolve(root, 'index.html'), output, 'utf-8');

console.log('inject-meta: index.html generated from siteConfig.ts');
