// =====================================================================
//  BUILD SCRIPT — generates the finished website in the _site/ folder.
//  Run locally with:  node src/build.mjs   (or: npm run build)
//  GitHub Actions runs it automatically every time you commit.
//  No dependencies: only Node.js (version 18 or newer).
// =====================================================================
import { rmSync, mkdirSync, cpSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import cfg from "../content/site.config.mjs";
import { translations, serviceOrder, serviceGroups } from "../content/translations.mjs";
import { makeCtx, homePage, servicesPage, contactPage, legalPage, rootRedirect, notFoundPage } from "./templates.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "_site");
const errors = [];
const warnings = [];

// ---------- 1. Checks ----------------------------------------------------

// Every key in French must exist in English and vice versa (same shape).
function compareShape(a, b, path, la, lb) {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return errors.push(`${path}: list in one language, not in the other`);
    if (a.length !== b.length) errors.push(`${path}: ${a.length} items in "${la}" but ${b.length} in "${lb}"`);
    a.forEach((v, i) => b[i] !== undefined && compareShape(v, b[i], `${path}[${i}]`, la, lb));
    return;
  }
  if (typeof a === "object" && a) {
    for (const k of Object.keys(a)) {
      if (!(k in b)) errors.push(`${path}.${k}: present in "${la}" but missing in "${lb}"`);
      else compareShape(a[k], b[k], `${path}.${k}`, la, lb);
    }
    return;
  }
  if (typeof a === "string" && a.trim() === "") errors.push(`${path}: empty text in "${la}"`);
}
const [L1, L2] = cfg.langs;
compareShape(translations[L1], translations[L2], "translations", L1, L2);
compareShape(translations[L2], translations[L1], "translations", L2, L1);

for (const l of cfg.langs) {
  for (const id of serviceOrder) if (!translations[l].services[id]) errors.push(`Service "${id}" has no text in "${l}"`);
}
const grouped = serviceGroups.flatMap((g) => g.services);
for (const id of serviceOrder) if (!grouped.includes(id)) errors.push(`Service "${id}" is not in any group`);

if (!/^https:\/\/[^/]+$/.test(cfg.siteUrl)) errors.push(`siteUrl must look like https://www.example.fr (no slash at the end). Current: ${cfg.siteUrl}`);
if (/VOTRE-DOMAINE/i.test(cfg.siteUrl)) warnings.push("siteUrl is still the placeholder: set your real domain in content/site.config.mjs");
if (/^VOTRE_/i.test(cfg.web3formsAccessKey)) warnings.push("web3formsAccessKey is not set: the form will show 'not activated yet' instead of sending");
if (!cfg.serviceArea.fr) warnings.push("serviceArea is empty (optional, but recommended for local SEO)");
for (const [k, v] of Object.entries(cfg.legal)) if (!v && k !== "vat") warnings.push(`legal.${k} is empty: shown as [À compléter] on the legal page`);
cfg.gallery.forEach((g, i) => {
  if (!g.file) return;
  if (!existsSync(join(ROOT, "static/assets/img/projects", g.file))) errors.push(`gallery[${i}]: file not found static/assets/img/projects/${g.file}`);
  for (const l of cfg.langs) {
    if (!g.alt?.[l]) errors.push(`gallery[${i}] (${g.file}): missing alt text in "${l}"`);
    if (g.caption && !g.caption[l]) errors.push(`gallery[${i}] (${g.file}): missing caption in "${l}"`);
  }
});
const photos = cfg.gallery.filter((g) => g.file).length;
if (photos === 0) warnings.push("No project photos yet: the gallery shows placeholder tiles");

if (errors.length) {
  console.error("\n✗ Build stopped. Please fix:\n  - " + errors.join("\n  - ") + "\n");
  process.exit(1);
}

// ---------- 2. Generate ---------------------------------------------------

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(ROOT, "static"), OUT, { recursive: true });

const pages = { home: homePage, services: servicesPage, contact: contactPage, legal: legalPage };
const written = [];
for (const lang of cfg.langs) {
  for (const [page, render] of Object.entries(pages)) {
    const c = makeCtx({ cfg, translations, lang, page });
    const dir = join(OUT, lang, cfg.routes[page][lang]);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), render(c));
    written.push(`/${lang}/${cfg.routes[page][lang]}`);
  }
}
writeFileSync(join(OUT, "index.html"), rootRedirect(cfg));
writeFileSync(join(OUT, "404.html"), notFoundPage(cfg, translations));

// sitemap.xml with language alternates
const today = new Date().toISOString().slice(0, 10);
const urls = [];
for (const page of Object.keys(pages)) {
  for (const lang of cfg.langs) {
    const loc = `${cfg.siteUrl}/${lang}/${cfg.routes[page][lang]}`;
    const alts = cfg.langs
      .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${cfg.siteUrl}/${l}/${cfg.routes[page][l]}"/>`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${cfg.siteUrl}/${cfg.defaultLang}/${cfg.routes[page][cfg.defaultLang]}"/>`)
      .join("\n");
    urls.push(`  <url>\n    <loc>${loc}</loc>\n${alts}\n    <lastmod>${today}</lastmod>\n  </url>`);
  }
}
writeFileSync(
  join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`
);
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${cfg.siteUrl}/sitemap.xml\n`);
writeFileSync(join(OUT, "CNAME"), new URL(cfg.siteUrl).host + "\n");
writeFileSync(join(OUT, ".nojekyll"), "");
writeFileSync(
  join(OUT, "site.webmanifest"),
  JSON.stringify(
    {
      name: cfg.businessName,
      short_name: "Lainer",
      start_url: "/fr/",
      display: "browser",
      background_color: "#EFE9DA",
      theme_color: "#4F6455",
      icons: [
        { src: "/assets/img/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/assets/img/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2
  )
);

console.log(`\n✓ Site built in _site/ (${written.length} pages + home redirect, 404, sitemap, robots.txt)`);
written.forEach((p) => console.log("    " + p));
if (warnings.length) console.log("\n! Before launch:\n  - " + warnings.join("\n  - "));
console.log("");
