// =====================================================================
//  Page components and templates (shared by French and English).
//  Text comes from content/translations.mjs, settings from
//  content/site.config.mjs. You normally don't need to edit this file.
// =====================================================================
import { readFileSync, existsSync } from "node:fs";
import { serviceIcons, uiIcons } from "./icons.mjs";
import { serviceOrder, serviceGroups } from "../content/translations.mjs";

const IMG_DIR = new URL("../static/assets/img/", import.meta.url);
const logoInline = readFileSync(new URL("logo-inline.svg", IMG_DIR), "utf8");
const logoFramedInline = readFileSync(new URL("logo-framed-inline.svg", IMG_DIR), "utf8");
const wordmarkInline = readFileSync(new URL("wordmark-inline.svg", IMG_DIR), "utf8");
const withClass = (svg, cls) => svg.replace("<svg ", `<svg class="${cls}" aria-hidden="true" focusable="false" `);

// ---------- helpers -----------------------------------------------------

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);

// French typography: narrow no-break space before ; ! ? and no-break before :
const frTypo = (s) =>
  String(s)
    .replace(/ ([;!?])/g, "\u202F$1")
    .replace(/ :/g, "\u00A0:")
    .replace(/« /g, "«\u202F")
    .replace(/ »/g, "\u202F»");

export function makeCtx({ cfg, translations, lang, page }) {
  const t = translations[lang];
  const other = cfg.langs.find((l) => l !== lang);
  const route = (p, l = lang) => cfg.routes[p][l];
  const depth = 1 + route(page).split("/").filter(Boolean).length; // /fr/ = 1
  const prefix = "../".repeat(depth);

  const fill = (s) =>
    String(s).replaceAll("{phone}", cfg.phone.display.replace(/ /g, "\u00A0")).replaceAll("{email}", cfg.email);
  // e(): translated, filled, typographically correct, HTML-escaped text
  const e = (s) => escapeHtml(lang === "fr" ? frTypo(fill(s)) : fill(s));
  const url = (p, l = lang, hash = "") => `${prefix}${l}/${route(p, l)}${hash}`;
  const abs = (p, l = lang) => `${cfg.siteUrl}/${l}/${route(p, l)}`;
  const asset = (p) => `${prefix}assets/${p}`;

  const phone = escapeHtml(cfg.phone.display).replace(/ /g, "&nbsp;"); // number never wraps
  return { cfg, t, lang, other, page, prefix, e, url, abs, asset, fill, translations, phone };
}


// Reads the pixel size of a WebP/JPEG/PNG file (no dependencies).
function imageSize(file) {
  try {
    const b = readFileSync(file);
    if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
      const chunk = b.toString("ascii", 12, 16);
      if (chunk === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
      if (chunk === "VP8 ") return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
      if (chunk === "VP8L") { const v = b.readUInt32LE(21); return { w: (v & 0x3fff) + 1, h: ((v >> 14) & 0x3fff) + 1 }; }
    }
    if (b[0] === 0x89 && b.toString("ascii", 1, 4) === "PNG") return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
    if (b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i < b.length) {
        const m = b[i + 1], len = b.readUInt16BE(i + 2);
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { w: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5) };
        i += 2 + len;
      }
    }
  } catch {}
  return { w: 1200, h: 1500 };
}

// Builds src / srcset / sizes / width / height for a project photo.
function photo(c, file, sizes) {
  const path = (f) => new URL(`projects/${f}`, IMG_DIR);
  const small = file.replace(/\.(\w+)$/, "-700.$1");
  const big = imageSize(path(file));
  const hasSmall = existsSync(path(small));
  const srcset = hasSmall
    ? `${c.asset(`img/projects/${small}`)} ${imageSize(path(small)).w}w, ${c.asset(`img/projects/${file}`)} ${big.w}w`
    : "";
  return {
    full: c.asset(`img/projects/${file}`),
    attrs: `src="${c.asset(`img/projects/${hasSmall ? small : file}`)}"${srcset ? ` srcset="${srcset}" sizes="${sizes}"` : ""} width="${big.w}" height="${big.h}"`,
  };
}

const telHref = (cfg) => `tel:${cfg.phone.href}`;
const mailHref = (cfg) => `mailto:${cfg.email}`;
const isPlaceholderKey = (k) => !k || /^VOTRE_/i.test(k);
const extLink = (c, href, inner, cls = "") =>
  `<a${cls ? ` class="${cls}"` : ""} href="${href}" target="_blank" rel="noopener">${inner}<span class="sr-only"> ${c.e(c.t.a11y.newTab)}</span></a>`;

// ---------- layout parts --------------------------------------------------

function head(c, { title, description, jsonLd = "" }) {
  const { cfg, lang, page } = c;
  const alternates = cfg.langs
    .map((l) => `<link rel="alternate" hreflang="${l}" href="${c.abs(page, l)}">`)
    .join("\n  ");
  return `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${c.e(title)}</title>
  <meta name="description" content="${c.e(description)}">
  <link rel="canonical" href="${c.abs(page)}">
  ${alternates}
  <link rel="alternate" hreflang="x-default" href="${c.abs(page, cfg.defaultLang)}">
  <meta name="theme-color" content="#4F6455">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${c.e(cfg.businessName)}">
  <meta property="og:title" content="${c.e(title)}">
  <meta property="og:description" content="${c.e(description)}">
  <meta property="og:url" content="${c.abs(page)}">
  <meta property="og:image" content="${cfg.siteUrl}/assets/img/og-image-${lang}.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="${cfg.locales[lang]}">
  <meta property="og:locale:alternate" content="${cfg.locales[c.other]}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="${c.prefix}favicon.ico" sizes="48x48">
  <link rel="icon" href="${c.asset("img/favicon.svg")}" type="image/svg+xml">
  <link rel="apple-touch-icon" href="${c.asset("img/apple-touch-icon.png")}">
  <link rel="manifest" href="${c.prefix}site.webmanifest">
  <link rel="preload" href="${c.asset("fonts/crimsonpro-italic.woff2")}" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${c.asset("fonts/jost.woff2")}" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${c.asset("css/styles.css")}">
  <script>document.documentElement.classList.replace("no-js","js")</script>
  ${jsonLd}
</head>`;
}

function langSwitch(c, extraClass = "", label = c.t.a11y.langNav) {
  return `<nav class="lang-switch ${extraClass}" aria-label="${c.e(label)}">
      ${c.cfg.langs
        .map((l) => {
          const cur = l === c.lang;
          const name = c.translations[l].langName;
          return `<a href="${c.url(c.page, l)}" hreflang="${l}" lang="${l}" data-lang="${l}"${cur ? ' aria-current="true"' : ""}><span aria-hidden="true">${l.toUpperCase()}</span><span class="sr-only">${escapeHtml(name)}</span></a>`;
        })
        .join('<span class="lang-sep" aria-hidden="true">|</span>')}
    </nav>`;
}

function navItems(c) {
  return [
    ["home", c.url("home"), c.t.nav.home],
    ["services", c.url("services"), c.t.nav.services],
    ["work", c.url("home", c.lang, "#realisations"), c.t.nav.work],
    ["contact", c.url("contact"), c.t.nav.contact],
  ];
}

function header(c) {
  const items = navItems(c)
    .map(([key, href, label]) => {
      const cur = key === c.page ? ' aria-current="page"' : "";
      return `<li><a href="${href}"${cur}>${c.e(label)}</a></li>`;
    })
    .join("\n          ");
  return `<header class="site-header" data-header>
    <div class="wrap header-bar">
      <a class="brand" href="${c.url("home")}" aria-label="${c.e(c.t.a11y.homeLink)}">${withClass(logoInline, "brand-full")}${withClass(wordmarkInline, "brand-mark")}</a>
      <nav class="main-nav" id="main-nav" aria-label="${c.e(c.t.a11y.mainNav)}" data-nav>
        <ul class="nav-list">
          ${items}
        </ul>
        <a class="btn btn-primary nav-cta" href="${c.url("contact", c.lang, "#formulaire")}">${c.e(c.t.cta.quote)}</a>
        <a class="nav-phone" href="${telHref(c.cfg)}">${uiIcons.phone}<span>${c.phone}</span></a>
      </nav>
      <div class="header-tools">
        <a class="header-phone" href="${telHref(c.cfg)}">${uiIcons.phone}<span>${c.phone}</span></a>
        ${langSwitch(c)}
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" data-menu-toggle
          data-label-open="${c.e(c.t.a11y.menuOpen)}" data-label-close="${c.e(c.t.a11y.menuClose)}">
          <span class="menu-icon-open">${uiIcons.menu}</span><span class="menu-icon-close">${uiIcons.close}</span>
          <span class="menu-toggle-text" aria-hidden="true">${c.e(c.t.nav.menu)}</span>
          <span class="sr-only" data-menu-label>${c.e(c.t.a11y.menuOpen)}</span>
        </button>
      </div>
    </div>
  </header>`;
}

function footer(c) {
  const { cfg, t } = c;
  const area = cfg.serviceArea[c.lang]
    ? `<li>${uiIcons.pin}<span>${c.e(cfg.serviceArea[c.lang])}</span></li>`
    : "";
  const links = navItems(c)
    .map(([, href, label]) => `<li><a href="${href}">${c.e(label)}</a></li>`)
    .join("");
  return `<footer class="site-footer">
    <div class="wrap footer-grid">
      <div class="footer-brand">
        <a href="${c.url("home")}" class="footer-logo" aria-label="${c.e(t.a11y.homeLink)}">${withClass(logoFramedInline, "logo-framed")}</a>
        <p class="footer-name">${c.e(cfg.businessName)}</p>
      </div>
      <div>
        <h2 class="footer-title">${c.e(t.footer.contactTitle)}</h2>
        <ul class="footer-contact">
          <li>${uiIcons.phone}<a href="${telHref(cfg)}">${c.phone}</a></li>
          <li>${uiIcons.mail}<a href="${mailHref(cfg)}">${c.e(cfg.email)}</a></li>
          <li>${uiIcons.camera}${extLink(c, cfg.instagram.url, `@${c.e(cfg.instagram.handle)}`)}</li>
          ${area}
        </ul>
      </div>
      <nav aria-label="${c.e(t.a11y.footerNav)}">
        <h2 class="footer-title">${c.e(t.footer.navTitle)}</h2>
        <ul class="footer-links">${links}<li><a href="${c.url("legal")}">${c.e(t.nav.legal)}</a></li></ul>
      </nav>
    </div>
    <div class="wrap footer-bottom">
      <p>© ${new Date().getFullYear()} ${c.e(cfg.businessName)}. ${c.e(t.footer.rights)}</p>
      ${langSwitch(c, "lang-switch--footer", t.a11y.langNavFooter)}
    </div>
  </footer>`;
}

function mobileBar(c) {
  return `<div class="mobile-bar" role="group" aria-label="${c.e(c.t.a11y.quickActions)}">
    <a class="mobile-bar-call" href="${telHref(c.cfg)}">${uiIcons.phone}<span>${c.e(c.t.cta.callShort)}</span></a>
    <a class="mobile-bar-quote" href="${c.url("contact", c.lang, "#formulaire")}">${c.e(c.t.cta.quote)}</a>
  </div>`;
}

export function layout(c, { main, jsonLd, i18nScript = "" }) {
  const meta = c.t.meta[c.page];
  return `<!DOCTYPE html>
<html lang="${c.lang}" class="no-js">
${head(c, { title: meta.title, description: meta.description, jsonLd })}
<body class="page-${c.page}">
  <a class="skip-link" href="#contenu">${c.e(c.t.a11y.skip)}</a>
  ${header(c)}
  <main id="contenu" tabindex="-1">
${main}
  </main>
  ${footer(c)}
  ${mobileBar(c)}
  ${i18nScript}
  <script src="${c.asset("js/main.js")}" defer></script>
</body>
</html>
`;
}

// ---------- shared blocks ----------------------------------------------

function serviceSelectOptions(c) {
  const fr = c.translations.fr.services;
  return serviceOrder
    .map((id) => `<option value="${escapeHtml(fr[id].name)}" data-id="${id}">${c.e(c.t.services[id].name)}</option>`)
    .join("\n            ");
}

function field(c, { id, name, type = "text", label, required, autocomplete, inputmode, hint, textarea }) {
  const f = c.t.form;
  const errId = `${id}-err`;
  const hintId = hint ? `${id}-hint` : "";
  const describedby = [hintId, errId].filter(Boolean).join(" ");
  const req = required
    ? ' <span class="req" aria-hidden="true">*</span>'
    : ` <span class="opt">(${c.e(f.optional)})</span>`;
  const attrs = [
    `id="${id}"`,
    `name="${name}"`,
    required ? "required" : "",
    autocomplete ? `autocomplete="${autocomplete}"` : "",
    inputmode ? `inputmode="${inputmode}"` : "",
    `aria-describedby="${describedby}"`,
  ]
    .filter(Boolean)
    .join(" ");
  const control = textarea
    ? `<textarea ${attrs} rows="5"></textarea>`
    : `<input type="${type}" ${attrs}>`;
  return `<div class="field" data-field="${name}">
          <label for="${id}">${c.e(label)}${req}</label>
          ${control}
          ${hint ? `<p class="field-hint" id="${hintId}">${c.e(hint)}</p>` : ""}
          <p class="field-error" id="${errId}" hidden></p>
        </div>`;
}

function quoteForm(c, idPrefix = "f") {
  const f = c.t.form;
  const key = c.cfg.web3formsAccessKey;
  return `<form class="quote-form" action="https://api.web3forms.com/submit" method="POST" novalidate data-form
        data-configured="${isPlaceholderKey(key) ? "false" : "true"}">
        <input type="hidden" name="access_key" value="${escapeHtml(key)}">
        <input type="hidden" name="subject" value="${c.e(c.translations.fr.form.subject)}">
        <input type="hidden" name="from_name" value="${c.e(c.cfg.businessName)} (site web)">
        <input type="hidden" name="langue" value="${c.lang}">
        <p class="form-note">${c.e(f.required)}</p>
        <div class="form-summary" role="alert" tabindex="-1" hidden data-summary></div>
        <div class="form-row">
          ${field(c, { id: `${idPrefix}-name`, name: "name", label: f.name, required: true, autocomplete: "name" })}
          ${field(c, { id: `${idPrefix}-phone`, name: "phone", type: "tel", label: f.phone, required: true, autocomplete: "tel", inputmode: "tel" })}
        </div>
        ${field(c, { id: `${idPrefix}-email`, name: "email", type: "email", label: f.email, required: true, autocomplete: "email", inputmode: "email" })}
        <div class="form-row">
          <div class="field" data-field="service">
            <label for="${idPrefix}-service">${c.e(f.service)} <span class="opt">(${c.e(f.optional)})</span></label>
            <select id="${idPrefix}-service" name="service">
            <option value="">${c.e(f.servicePlaceholder)}</option>
            ${serviceSelectOptions(c)}
            <option value="${c.e(c.translations.fr.form.serviceOther)}">${c.e(f.serviceOther)}</option>
            </select>
          </div>
          ${field(c, { id: `${idPrefix}-location`, name: "location", label: f.location, autocomplete: "address-level2", hint: f.locationHint })}
        </div>
        ${field(c, { id: `${idPrefix}-message`, name: "message", label: f.message, required: true, hint: f.messageHint, textarea: true })}
        <div class="hp" aria-hidden="true">
          <label>${c.e(f.honeypot)}<input type="checkbox" name="botcheck" tabindex="-1"></label>
        </div>
        <p class="form-privacy">${c.e(f.privacy)} <a href="${c.url("legal", c.lang, "#confidentialite")}">${c.e(f.privacyLink)}</a></p>
        <button class="btn btn-primary btn-submit" type="submit" data-submit>${c.e(f.submit)}</button>
        <div class="form-status" role="status" aria-live="polite" data-status></div>
      </form>`;
}

function formI18n(c) {
  const f = c.t.form;
  const data = {
    submit: f.submit,
    sending: f.sending,
    success: f.success,
    failure: f.failure,
    notConfigured: f.notConfigured,
    errors: f.errors,
  };
  const filled = JSON.parse(
    JSON.stringify(data, (k, v) => (typeof v === "string" ? (c.lang === "fr" ? frTypo(c.fill(v)) : c.fill(v)) : v))
  );
  return `<script type="application/json" id="form-i18n">${JSON.stringify(filled).replace(/</g, "\\u003c")}</script>`;
}

function galleryTiles(c, { limit, decorative = false } = {}) {
  const items = c.cfg.gallery.slice(0, limit ?? c.cfg.gallery.length);
  return items
    .map((g, i) => {
      if (g.file) {
        const p = photo(c, g.file, decorative ? "(min-width: 900px) 18vw, 33vw" : "(min-width: 900px) 25vw, 50vw");
        if (decorative) return `<figure class="tile"><img ${p.attrs} alt="" loading="lazy" decoding="async"></figure>`;
        const alt = c.e(g.alt[c.lang] || "");
        const caption = g.caption?.[c.lang] ? c.e(g.caption[c.lang]) : "";
        const label = c.e(c.t.lightbox.open.replace("{caption}", g.caption?.[c.lang] || g.alt[c.lang] || ""));
        return `<figure class="tile${g.tall ? " tile--tall" : ""}">
          <a class="tile-link" href="${p.full}" data-lightbox data-caption="${caption}" data-alt="${alt}" aria-label="${label}">
            <img ${p.attrs} alt="${alt}" loading="lazy" decoding="async">
            <span class="tile-zoom" aria-hidden="true">${uiIcons.zoom}</span>
          </a>
          ${caption ? `<figcaption>${caption}</figcaption>` : ""}
        </figure>`;
      }
      return `<figure class="tile tile--placeholder${g.tall && !decorative ? " tile--tall" : ""}"${decorative ? ' aria-hidden="true"' : ""}>
          <span class="tile-mark">${serviceIcons[serviceOrder[i % serviceOrder.length]]}</span>
          ${decorative ? "" : `<figcaption>${c.e(c.t.home.work.placeholder)}</figcaption>`}
        </figure>`;
    })
    .join("\n        ");
}

// Full-screen photo viewer (opened by main.js). One per page with a gallery.
function lightbox(c) {
  const L = c.t.lightbox;
  return `<dialog class="lightbox" aria-label="${c.e(L.title)}" data-lightbox-dialog
    data-count="${c.e(L.count)}">
    <div class="lb-frame" data-lb-frame>
      <div class="lb-bar">
        <p class="lb-count" data-lb-count aria-live="polite"></p>
        <button class="lb-close" type="button" data-lb-close>${uiIcons.close}<span>${c.e(L.close)}</span></button>
      </div>
      <figure class="lb-figure">
        <img data-lb-img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="">
        <figcaption class="lb-caption" data-lb-caption></figcaption>
      </figure>
      <button class="lb-nav lb-prev" type="button" data-lb-prev aria-label="${c.e(L.prev)}">${uiIcons.chevronLeft}</button>
      <button class="lb-nav lb-next" type="button" data-lb-next aria-label="${c.e(L.next)}">${uiIcons.chevronRight}</button>
    </div>
  </dialog>`;
}

// "Appeler le 06 59 09 15 88": on very small phones only the number is shown
function callLabel(c) {
  const [before, after = ""] = c.t.cta.call.split("{phone}");
  const nb = (s) => c.e(s).replace(/ /g, "&nbsp;");
  return `${before.trim() ? `<span class="call-prefix">${nb(before)}</span>` : ""}${c.phone}${nb(after)}`;
}

function ctaButtons(c, { light = false } = {}) {
  return `<div class="actions">
          <a class="btn btn-primary" href="${c.url("contact", c.lang, "#formulaire")}">${c.e(c.t.cta.quote)}</a>
          <a class="btn ${light ? "btn-ghost-light" : "btn-ghost"}" href="${telHref(c.cfg)}">${uiIcons.phone}<span>${callLabel(c)}</span></a>
        </div>`;
}

function jsonLd(c) {
  const { cfg } = c;
  const data = {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    "@id": `${cfg.siteUrl}/#business`,
    name: cfg.businessName,
    url: c.abs("home"),
    telephone: cfg.phone.international,
    email: cfg.email,
    image: `${cfg.siteUrl}/assets/img/og-image-fr.png`,
    logo: `${cfg.siteUrl}/assets/img/icon-512.png`,
    slogan: c.t.tagline,
    sameAs: [cfg.instagram.url],
    knowsLanguage: ["fr", "en"],
    makesOffer: serviceOrder.map((id) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: c.t.services[id].name, description: c.t.services[id].description },
    })),
  };
  if (cfg.serviceArea[c.lang]) data.areaServed = cfg.serviceArea[c.lang];
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

// ---------- pages -------------------------------------------------------

export function homePage(c) {
  const { t, cfg } = c;
  const h = t.home;
  const area = cfg.serviceArea[c.lang]
    ? `<p class="hero-area">${uiIcons.pin}<span>${c.e(cfg.serviceArea[c.lang])}</span></p>`
    : "";

  // Hero photo = first gallery photo, intro photo = second (change the order in site.config.mjs)
  const photos = cfg.gallery.filter((g) => g.file);
  const heroItem = photos[0];
  const heroImg = heroItem ? photo(c, heroItem.file, "(min-width: 960px) 45vw, 100vw") : null;
  const introItem = photos[1];
  const introImg = introItem ? photo(c, introItem.file, "(min-width: 900px) 40vw, 100vw") : null;

  const groups = serviceGroups
    .map(
      (g) => `<article class="svc-group">
          <h3 class="svc-group-title">${c.e(t.groups[g.id].name)}</h3>
          <p class="svc-group-text">${c.e(t.groups[g.id].text)}</p>
          <ul class="svc-index">
            ${g.services
              .map(
                (id) => `<li><a href="${c.url("services", c.lang, `#${id}`)}"><span class="svc-index-icon">${serviceIcons[id]}</span><span><span class="svc-index-name">${c.e(t.services[id].name)}</span><span class="svc-index-sum">${c.e(t.services[id].summary)}</span></span></a></li>`
              )
              .join("\n            ")}
          </ul>
        </article>`
    )
    .join("\n        ");

  const quality = h.quality.items
    .map((q) => `<li><h3>${c.e(q.title)}</h3><p>${c.e(q.text)}</p></li>`)
    .join("\n          ");

  const steps = h.process.steps
    .map((s) => `<li><h3>${c.e(s.title)}</h3><p>${c.e(s.text)}</p></li>`)
    .join("\n          ");

  const main = `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-grid">
        <div class="hero-panel">
          <div class="hero-content">
            <h1 id="hero-title" class="hero-title">${c.e(h.hero.title)}</h1>
            <p class="hero-lead">${c.e(h.hero.lead)}</p>
            ${ctaButtons(c, { light: true })}
            ${area}
          </div>
        </div>
        ${heroImg ? `<div class="hero-media"><img ${heroImg.attrs} alt="${c.e(heroItem.alt[c.lang])}" fetchpriority="high" decoding="async"></div>` : ""}
      </div>
    </section>

    <section class="section intro" aria-labelledby="intro-title">
      <div class="wrap intro-grid">
        <div class="intro-text">
          <h2 id="intro-title" class="h2">${c.e(h.intro.title)}</h2>
          <div class="prose">
            <p>${c.e(h.intro.p1)}</p>
            <p>${c.e(h.intro.p2)}</p>
          </div>
          <p class="intro-links"><a class="text-link" href="#realisations">${c.e(h.intro.seeWork)}</a> <a class="text-link" href="${c.url("services")}">${c.e(c.t.cta.allServices)}</a></p>
        </div>
        ${introImg ? `<figure class="intro-media"><img ${introImg.attrs} alt="${c.e(introItem.alt[c.lang])}" loading="lazy" decoding="async"><figcaption>${c.e(introItem.caption?.[c.lang] || "")}</figcaption></figure>` : ""}
      </div>
    </section>

    <section class="section services-overview" aria-labelledby="services-title">
      <div class="wrap">
        <div class="section-head">
          <h2 id="services-title" class="h2">${c.e(h.services.title)}</h2>
          <p>${c.e(h.services.lead)}</p>
        </div>
        <div class="svc-groups">
        ${groups}
        </div>
        <p class="section-foot"><a class="btn btn-ghost" href="${c.url("services")}">${c.e(t.cta.allServices)}</a></p>
      </div>
    </section>

    <section class="section quality" aria-labelledby="quality-title">
      <div class="wrap">
        <div class="section-head">
          <h2 id="quality-title" class="h2">${c.e(h.quality.title)}</h2>
          <p>${c.e(h.quality.lead)}</p>
        </div>
        <ul class="quality-list">
          ${quality}
        </ul>
      </div>
    </section>

    <section class="section work" id="realisations" aria-labelledby="work-title">
      <div class="wrap">
        <div class="section-head">
          <h2 id="work-title" class="h2">${c.e(h.work.title)}</h2>
          <p>${c.e(h.work.lead)}</p>
        </div>
        <div class="gallery">
        ${galleryTiles(c)}
        </div>
      </div>
    </section>

    <section class="section process" aria-labelledby="process-title">
      <div class="wrap">
        <div class="section-head">
          <h2 id="process-title" class="h2">${c.e(h.process.title)}</h2>
        </div>
        <ol class="steps">
          ${steps}
        </ol>
      </div>
    </section>

    <section class="section enquiry" id="devis" aria-labelledby="enquiry-title">
      <div class="wrap enquiry-grid">
        <div class="enquiry-text">
          <h2 id="enquiry-title" class="h2">${c.e(h.enquiry.title)}</h2>
          <p>${c.e(h.enquiry.lead)}</p>
          <ul class="contact-quick">
            <li><a href="${telHref(cfg)}">${uiIcons.phone}<span>${c.phone}</span></a></li>
            <li><a href="${mailHref(cfg)}">${uiIcons.mail}<span>${c.e(cfg.email)}</span></a></li>
          </ul>
        </div>
        <div class="form-card">
          ${quoteForm(c, "h")}
        </div>
      </div>
    </section>

    <section class="section insta" aria-labelledby="insta-title">
      <div class="wrap insta-grid">
        <div class="insta-text">
          <h2 id="insta-title" class="h2">${c.e(h.instagram.title)}</h2>
          <p>${c.e(h.instagram.lead)}</p>
          ${extLink(c, cfg.instagram.url, `${uiIcons.camera}<span>${c.e(h.instagram.button)}</span>`, "btn btn-ghost")}
        </div>
        <div class="insta-tiles" aria-hidden="true">
        ${galleryTiles(c, { limit: 6, decorative: true })}
        </div>
      </div>
    </section>`;

  return layout(c, { main: main + lightbox(c), jsonLd: jsonLd(c), i18nScript: formI18n(c) });
}

export function servicesPage(c) {
  const { t } = c;
  const p = t.servicesPage;
  const jump = serviceGroups
    .map((g) => `<li><a href="#groupe-${g.id}">${c.e(t.groups[g.id].name)}</a></li>`)
    .join("");

  const sections = serviceGroups
    .map(
      (g) => `<section class="svc-section" id="groupe-${g.id}" aria-labelledby="groupe-${g.id}-title">
        <div class="wrap">
          <div class="svc-section-head">
            <h2 id="groupe-${g.id}-title" class="h2">${c.e(t.groups[g.id].name)}</h2>
            <p>${c.e(t.groups[g.id].text)}</p>
          </div>
          ${g.services
            .map((id) => {
              const s = t.services[id];
              const note = s.note ? `<p class="svc-note">${c.e(s.note)}</p>` : "";
              return `<article class="svc" id="${id}" aria-labelledby="${id}-title">
            <div class="svc-icon">${serviceIcons[id]}</div>
            <div class="svc-body">
              <h3 id="${id}-title">${c.e(s.name)}</h3>
              <p>${c.e(s.description)}</p>
              ${note}
            </div>
            <a class="btn btn-ghost svc-cta" href="${c.url("contact", c.lang, `?service=${id}#formulaire`)}">${c.e(t.cta.serviceQuote)}</a>
          </article>`;
            })
            .join("\n          ")}
        </div>
      </section>`
    )
    .join("\n    ");

  const main = `
    <section class="page-head" aria-labelledby="page-title">
      <div class="wrap">
        <h1 id="page-title" class="page-title">${c.e(p.title)}</h1>
        <p class="page-lead">${c.e(p.lead)}</p>
        <nav class="jump" aria-label="${c.e(p.jump)}"><ul>${jump}</ul></nav>
      </div>
    </section>
    ${sections}
    <section class="section cta-band" aria-labelledby="cta-title">
      <div class="wrap cta-band-inner">
        <h2 id="cta-title" class="h2">${c.e(t.home.enquiry.title)}</h2>
        ${ctaButtons(c, { light: true })}
      </div>
    </section>`;
  return layout(c, { main });
}

export function contactPage(c) {
  const { t, cfg } = c;
  const p = t.contactPage;
  const area = cfg.serviceArea[c.lang]
    ? `<div><dt>${c.e(p.areaLabel)}</dt><dd>${c.e(cfg.serviceArea[c.lang])}</dd></div>`
    : "";
  const main = `
    <section class="page-head" aria-labelledby="page-title">
      <div class="wrap">
        <h1 id="page-title" class="page-title">${c.e(p.title)}</h1>
        <p class="page-lead">${c.e(p.lead)}</p>
      </div>
    </section>
    <section class="section contact" aria-label="${c.e(p.formTitle)}">
      <div class="wrap enquiry-grid">
        <div class="contact-details">
          <h2 class="h3">${c.e(p.detailsTitle)}</h2>
          <dl>
            <div><dt>${c.e(p.phoneLabel)}</dt><dd><a href="${telHref(cfg)}">${c.phone}</a></dd></div>
            <div><dt>${c.e(p.emailLabel)}</dt><dd><a href="${mailHref(cfg)}">${c.e(cfg.email)}</a></dd></div>
            <div><dt>${c.e(p.instagramLabel)}</dt><dd>${extLink(c, cfg.instagram.url, `@${c.e(cfg.instagram.handle)}`)}</dd></div>
            ${area}
          </dl>
        </div>
        <div class="form-card" id="formulaire" tabindex="-1">
          <h2 class="h3">${c.e(p.formTitle)}</h2>
          ${quoteForm(c, "c")}
        </div>
      </div>
    </section>`;
  return layout(c, { main, i18nScript: formI18n(c) });
}

export function legalPage(c) {
  const { t, cfg } = c;
  const L = t.legalPage;
  const v = (val) => (val ? c.e(val) : `<span class="todo">${c.e(L.toComplete)}</span>`);
  const row = (label, val) => `<div><dt>${c.e(label)}</dt><dd>${val}</dd></div>`;
  const main = `
    <section class="page-head" aria-labelledby="page-title">
      <div class="wrap">
        <h1 id="page-title" class="page-title">${c.e(L.title)}</h1>
      </div>
    </section>
    <section class="section legal">
      <div class="wrap prose legal-prose">
        <h2 class="h3">${c.e(L.publisherTitle)}</h2>
        <dl class="legal-list">
          ${row(L.businessName, c.e(cfg.businessName))}
          ${row(L.legalForm, v(cfg.legal.legalForm))}
          ${row(L.siret, v(cfg.legal.siret))}
          ${cfg.legal.vat ? row(L.vat, c.e(cfg.legal.vat)) : ""}
          ${row(L.address, v(cfg.legal.address))}
          ${row(L.phone, `<a href="${telHref(cfg)}">${c.phone}</a>`)}
          ${row(L.email, `<a href="${mailHref(cfg)}">${c.e(cfg.email)}</a>`)}
          ${row(L.director, v(cfg.legal.publisher))}
        </dl>
        <h2 class="h3">${c.e(L.hostTitle)}</h2>
        <p>${c.e(L.hostText)}</p>
        <h2 class="h3">${c.e(L.ipTitle)}</h2>
        <p>${c.e(L.ipText)}</p>
        <h2 class="h3" id="confidentialite">${c.e(L.privacyTitle)}</h2>
        <p>${c.e(L.privacyP1)}</p>
        <p>${c.e(L.privacyP2)}</p>
        <p>${c.e(L.privacyP3)}</p>
        <h2 class="h3">${c.e(L.cookiesTitle)}</h2>
        <p>${c.e(L.cookiesText)}</p>
      </div>
    </section>`;
  return layout(c, { main });
}

// Root "/" : sends visitors to /fr/ (default) or to /en/ if they chose English before.
export function rootRedirect(cfg) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(cfg.businessName)}</title>
  <link rel="canonical" href="${cfg.siteUrl}/fr/">
  <link rel="alternate" hreflang="fr" href="${cfg.siteUrl}/fr/">
  <link rel="alternate" hreflang="en" href="${cfg.siteUrl}/en/">
  <link rel="alternate" hreflang="x-default" href="${cfg.siteUrl}/fr/">
  <link rel="icon" href="favicon.ico" sizes="48x48">
  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
  <script>
    (function () {
      var lang = "fr";
      try { if (localStorage.getItem("lainer-lang") === "en") lang = "en"; } catch (e) {}
      location.replace(lang + "/" + location.search + location.hash);
    })();
  </script>
  <noscript><meta http-equiv="refresh" content="0; url=fr/"></noscript>
  <style>body{font:18px/1.6 system-ui,sans-serif;background:#EFE9DA;color:#253029;display:grid;place-items:center;min-height:100vh;margin:0}a{color:#3D4F43}</style>
</head>
<body>
  <p><a href="fr/" hreflang="fr">Lainer Peinture, version française</a><br><a href="en/" hreflang="en" lang="en">English version</a></p>
</body>
</html>
`;
}

export function notFoundPage(cfg, translations) {
  const fr = translations.fr.notFound;
  const en = translations.en.notFound;
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(fr.title)} | ${escapeHtml(cfg.businessName)}</title>
  <meta name="robots" content="noindex">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body class="page-404">
  <main class="notfound wrap">
    <a class="notfound-logo" href="/fr/" aria-label="Lainer Peinture">${withClass(logoFramedInline, "logo-framed")}</a>
    <div class="notfound-grid">
      <section>
        <h1 class="h2">${escapeHtml(frTypo(fr.title))}</h1>
        <p>${escapeHtml(frTypo(fr.text))}</p>
        <p><a class="btn btn-primary" href="/fr/">${escapeHtml(fr.back)}</a></p>
      </section>
      <section lang="en">
        <h2 class="h2">${escapeHtml(en.title)}</h2>
        <p>${escapeHtml(en.text)}</p>
        <p><a class="btn btn-ghost" href="/en/" hreflang="en">${escapeHtml(en.back)}</a></p>
      </section>
    </div>
  </main>
</body>
</html>
`;
}
