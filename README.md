# Lainer Peinture — site web bilingue (FR / EN)

Static website for **Lainer Peinture**, published free with **GitHub Pages** on **www.lainerpeinture.com** (domain at Porkbun).
French is the default language (`/fr/`), English is at `/en/`.

No database, no server, no monthly cost. You edit two text files on GitHub, click "Commit", and the site updates itself in about two minutes.

---

## Contents

1. [What's in this folder](#1-whats-in-this-folder)
2. [The 3 things to fill in before launch](#2-the-3-things-to-fill-in-before-launch)
3. [Activate the enquiry form (Web3Forms)](#3-activate-the-enquiry-form-web3forms)
4. [Put the site on GitHub](#4-put-the-site-on-github)
5. [Connect www.lainerpeinture.com (GitHub + Porkbun)](#5-connect-wwwlainerpeinturecom-github--porkbun)
6. [Turn on HTTPS](#6-turn-on-https)
7. [Google Search Console](#7-google-search-console)
8. [Everyday updates: text, photos, services](#8-everyday-updates-text-photos-services)
9. [Instagram: what the site does and doesn't do](#9-instagram-what-the-site-does-and-doesnt-do)
10. [Preview on your own computer (optional)](#10-preview-on-your-own-computer-optional)
11. [Troubleshooting](#11-troubleshooting)
12. [What was tested / what you must test](#12-what-was-tested--what-you-must-test)
13. [Launch checklist](#13-launch-checklist)

---

## 1. What's in this folder

```
lainer-peinture/
├── content/                     ← THE ONLY FOLDER YOU NORMALLY EDIT
│   ├── site.config.mjs          Settings: domain, form key, service area, legal details, photos
│   └── translations.mjs         Every word of the site, in French and English
├── static/                      Files copied as-is to the website
│   ├── favicon.ico
│   └── assets/
│       ├── css/styles.css       Design (colours, fonts, layout)
│       ├── js/main.js           Mobile menu, language memory, form checks & sending
│       ├── fonts/               Crimson Pro + Jost (free licence, hosted on your site)
│       └── img/
│           ├── logo*.svg        Your logo, recreated as vector files
│           ├── favicon.svg, apple-touch-icon.png, icon-192/512.png
│           ├── og-image-fr.png / og-image-en.png   Preview image for WhatsApp, Facebook…
│           └── projects/        YOUR PROJECT PHOTOS (8 included, cleaned up)
├── src/                         The machinery (you don't need to touch it)
│   ├── build.mjs                Builds the site + checks that FR and EN are complete
│   ├── templates.mjs            Page layouts, shared by both languages
│   ├── icons.mjs                The 10 service icons
│   └── serve.mjs                Local preview server (optional)
├── .github/workflows/deploy.yml Publishes automatically on GitHub Pages
├── package.json                 Shortcuts for "npm run build" / "npm run serve"
├── .gitignore
└── README.md                    This guide
```

**How it works:** `src/build.mjs` reads `content/`, generates every page in both languages into a `_site/` folder, and GitHub publishes `_site/`. One design, one set of components, two languages: no duplicated pages to keep in sync.

**Web addresses produced**

| Page | French | English |
|---|---|---|
| Home | `/fr/` | `/en/` |
| Services | `/fr/prestations/` | `/en/services/` |
| Contact & quote | `/fr/contact/` | `/en/contact/` |
| Legal notice & privacy | `/fr/mentions-legales/` | `/en/legal-notice/` |

`www.lainerpeinture.com/` sends visitors to `/fr/`, or to `/en/` if they chose English on a previous visit. Each page tells Google about its other-language version (`hreflang`), and `sitemap.xml` lists all of them.

**Why separate `/fr/` and `/en/` addresses instead of a JavaScript switch on one page?** Google can index and rank both languages separately, links shared on WhatsApp open in the right language, and the language switch is just a link, so it works instantly and even without JavaScript. The trade-off is that switching reloads the page (it's fast: the whole site is very light).

---

## 2. The 3 things to fill in before launch

Open `content/site.config.mjs` (on GitHub: click the file, then the ✏️ pencil icon).

| Setting | What to put | Status |
|---|---|---|
| `siteUrl` | `https://www.lainerpeinture.com` | ✅ done |
| `web3formsAccessKey` | Your free key, see section 3 | ⚠️ to do |
| `serviceArea` | Currently **"Orléans et le Loiret (45)"**, taken from your Instagram hashtags `#artisanorleans #artisan45`. Change it if it's not right, or set both to `""` to hide it. | ⚠️ please confirm |
| `legal` | Legal form, SIRET, business address, name of the publication director | ⚠️ to do (required by French law) |

Until the legal details are filled in, the "Mentions légales" page shows a visible red **[À compléter]** marker. Nothing is invented.

Also re-read in `content/translations.mjs`:
- `home.quality` ("Protéger / Préparer / Finir / Rendre") and `home.process` (the 5 steps): check they describe how you actually work.
- `home.intro`: your introduction.

---

## 3. Activate the enquiry form (Web3Forms)

GitHub Pages only hosts files; it cannot send emails itself. **Web3Forms** receives the form and emails it to you.

- **Free plan:** 250 enquiries per month, unlimited forms, spam protection, no account needed. Messages are delivered by email; on the free plan, the online history is kept 30 days (your Gmail keeps them forever).
- **Is the key a secret?** No. A Web3Forms access key is designed to be public: it can only *send* messages to your inbox. It cannot read your messages or log in to anything. It's fine in a public GitHub repository.

**Steps**

1. Go to **https://web3forms.com** → "Create your Access Key".
2. Enter **lainer.ent@gmail.com** and confirm.
3. You receive the key by email (check the **Spam** folder). It looks like `a1b2c3d4-…`.
4. In `content/site.config.mjs`, replace `VOTRE_CLE_WEB3FORMS` with your key, keeping the quotes:
   ```js
   web3formsAccessKey: "a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   ```
5. Commit. After the site updates, send yourself a test enquiry from **both** `/fr/contact/` and `/en/contact/`.
6. If the first email lands in Spam, mark it **"Not spam"** so the next ones arrive in your inbox.

**What visitors see**
- Missing or wrong fields → clear message next to each field, in their language.
- While sending → button shows "Envoi en cours…".
- Success message → only after Web3Forms confirms it accepted the message.
- Failure → message with your phone number and email instead.
- Before the key is set → "Le formulaire en ligne n'est pas encore activé…" (never a fake success).

**Spam protection included:** a hidden "honeypot" checkbox that robots tick and humans never see, plus Web3Forms' own filtering. If spam ever becomes a problem, Web3Forms also offers free hCaptcha: follow their documentation, and ask for help adding it.

**The email you receive** contains: name, phone, email (you can reply directly to the client), service chosen (always written in French), project location, message, and `langue: fr/en` so you know which language the client used.

**Alternatives** if you ever need them: Formspree (free plan 50 submissions/month), Basin, or Netlify Forms (requires moving hosting to Netlify).

---

## 4. Put the site on GitHub

No programming tools are needed. Everything happens in your web browser.

### 4.1 Create the account and repository

1. Create a free account on **https://github.com** (remember your **username**, you'll need it for DNS).
2. Top right **+** → **New repository**.
   - Name: `lainerpeinture-site` (any name works).
   - Visibility: **Public** (GitHub Pages is free for public repositories).
   - Don't tick "Add a README".
   - **Create repository**.

### 4.2 Upload the files

1. Unzip `lainer-peinture.zip` on your computer.
2. On the new repository page, click **"uploading an existing file"**.
3. Open the unzipped `lainer-peinture` folder, select **everything inside it** (`content`, `src`, `static`, `package.json`, `README.md`, `.gitignore`, `.github`) and drag it into the browser window.
4. Write "Première version du site" in the message box → **Commit changes**.

> ⚠️ **Hidden folder `.github`:** folders starting with a dot are hidden by default.
> - Mac: in Finder press **Cmd + Shift + .** to show them.
> - Windows: Explorer → View → tick **Hidden items**.
>
> If `.github` didn't upload, create it by hand: on GitHub, **Add file → Create new file**, type the name `.github/workflows/deploy.yml` (typing `/` creates the folders), paste the content of `deploy.yml` from the zip, then **Commit**.

Check that the repository's main page shows: `.github`, `content`, `src`, `static`, `.gitignore`, `README.md`, `package.json`.

### 4.3 Turn on GitHub Pages

1. In the repository: **Settings** → **Pages** (left menu).
2. **Build and deployment → Source:** choose **GitHub Actions**.
3. Go to the **Actions** tab. You should see "Deploy to GitHub Pages" running (yellow dot) then ✅ green, after 1–2 minutes. If nothing appears, click "Deploy to GitHub Pages" → **Run workflow**.
4. Back in **Settings → Pages**, a link like `https://USERNAME.github.io/lainerpeinture-site/` appears.

> Before the domain is connected, that temporary address may show the site with odd links. This is normal: the site is built for `www.lainerpeinture.com`. Carry on with section 5.

---

## 5. Connect www.lainerpeinture.com (GitHub + Porkbun)

**What goes where**

| In **GitHub** | In **Porkbun** |
|---|---|
| Verify you own the domain (optional but recommended) | Add the verification TXT record |
| Settings → Pages → Custom domain = `www.lainerpeinture.com` | A + AAAA records for `lainerpeinture.com` |
| Tick "Enforce HTTPS" | CNAME record `www` → `USERNAME.github.io` |

Replace `USERNAME` everywhere below with your GitHub username (lowercase).

### 5.1 Verify the domain with GitHub (recommended, protects against domain takeover)

1. GitHub: click your **profile photo** (top right) → **Settings** → **Pages** (left menu, under "Code, planning, and automation") → **Add a domain**.
2. Enter `lainerpeinture.com` → **Add domain**. GitHub shows a TXT record: a **name** like `_github-pages-challenge-USERNAME` and a **value** (random code).
3. Porkbun: log in → **Domain Management** → next to `lainerpeinture.com` click **DNS**.
4. Add a record:
   - Type: **TXT**
   - Host: `_github-pages-challenge-USERNAME` (only that part, Porkbun adds `.lainerpeinture.com` itself)
   - Answer: the code from GitHub
   - **Add**.
5. Back on GitHub click **Verify** (may need to wait 5–30 minutes and retry).

### 5.2 DNS records in Porkbun

In Porkbun → `lainerpeinture.com` → **DNS**:

1. **Delete the default parking records** Porkbun created, usually:
   - `ALIAS` `lainerpeinture.com` → `pixie.porkbun.com`
   - `CNAME` `*.lainerpeinture.com` → `pixie.porkbun.com`

   (Do **not** delete MX or TXT records if you use email forwarding on this domain. Your Gmail address isn't affected either way.)

2. **Add these records** (leave **Host** empty for the root domain; TTL can stay at the default 600):

| Type | Host | Answer |
|---|---|---|
| A | *(empty)* | `185.199.108.153` |
| A | *(empty)* | `185.199.109.153` |
| A | *(empty)* | `185.199.110.153` |
| A | *(empty)* | `185.199.111.153` |
| AAAA | *(empty)* | `2606:50c0:8000::153` |
| AAAA | *(empty)* | `2606:50c0:8001::153` |
| AAAA | *(empty)* | `2606:50c0:8002::153` |
| AAAA | *(empty)* | `2606:50c0:8003::153` |
| CNAME | `www` | `USERNAME.github.io` |

These IP addresses are GitHub Pages' official ones. The `www` record points to your GitHub username, **without** the repository name.

### 5.3 Tell GitHub the domain

1. Repository → **Settings → Pages → Custom domain**: type `www.lainerpeinture.com` → **Save**.
2. GitHub runs a DNS check. ✅ "DNS check successful" can take from a few minutes to 24 hours (usually under 1 hour).

Result: `www.lainerpeinture.com` is the main address, and `lainerpeinture.com` (without www) automatically redirects to it.

**About the `CNAME` file:** the build creates `_site/CNAME` containing `www.lainerpeinture.com` automatically. With the "GitHub Actions" publishing method, GitHub uses the Custom domain field from step 1 and doesn't need that file, so there's nothing to do.

---

## 6. Turn on HTTPS

1. Settings → Pages: once the DNS check is green, tick **Enforce HTTPS**.
2. If the box is greyed out with "certificate not yet created", wait (up to 24 h). GitHub issues a free certificate automatically.
3. Test: `https://www.lainerpeinture.com` shows a padlock; `http://lainerpeinture.com` redirects to `https://www.lainerpeinture.com/fr/`.

---

## 7. Google Search Console

1. Go to **https://search.google.com/search-console** → **Add property** → **Domain** → `lainerpeinture.com`.
2. Google gives a TXT record: add it in Porkbun (Type TXT, Host empty, Answer = the code) → **Verify**.
3. Left menu **Sitemaps** → enter `https://www.lainerpeinture.com/sitemap.xml` → **Submit**.
4. After a few days, check **Pages** (indexing) and that both `/fr/` and `/en/` appear.

Also recommended for local search: create or claim your **Google Business Profile** (free) with the same phone, website and service area. That's what shows you on Google Maps. If you add a public business address there, you can also add it to the site (ask for help to add it to the structured data).

The site already includes: unique titles and descriptions per page and language, correct heading order, image descriptions, canonical URLs, `hreflang`, `sitemap.xml`, `robots.txt`, Open Graph previews, and `HousePainter` structured data (name, phone, email, Instagram, service area and your 10 services, with no invented address, reviews or opening hours).

---

## 8. Everyday updates: text, photos, services

Every change = edit on GitHub → **Commit changes** → wait ~2 minutes (Actions tab ✅) → refresh the site (Ctrl+F5 / Cmd+Shift+R).

### Change a text
`content/translations.mjs` → find the sentence in the `fr:` part **and** its equivalent in the `en:` part → edit both → Commit.

Rules: keep the quotes `"…"` and the comma at the end of the line. Apostrophes are fine (the typographic `’` looks nicer in French); a double quote `"` inside a text must be written `\"`. French spacing before `: ; ! ?` is added automatically.

If you forget the English version (or make a typo), the build **stops** and the live site stays as it was. The Actions tab shows a red ❌; click it to read a plain message such as `translations.fr.home.intro.p3: present in "fr" but missing in "en"`.

### Add or replace project photos
1. Prepare the photo: JPG or WebP, about **1400 px** on the long side, under 300 KB. A free tool: **https://squoosh.app** (choose WebP, quality 80). Also save a **700 px** copy named `same-name-700.webp`: it loads faster on phones (optional).
2. On GitHub open `static/assets/img/projects/` → **Add file → Upload files** → drop the photo(s) → Commit.
3. In `content/site.config.mjs`, under `gallery`, add a block (or edit one):
   ```js
   {
     file: "salon-vert-sauge.webp", tall: false,
     caption: { fr: "Salon repeint en vert sauge", en: "Living room repainted in sage green" },
     alt: { fr: "Salon aux murs vert sauge et plafond blanc, après rénovation", en: "Living room with sage-green walls and a white ceiling, after renovation" },
   },
   ```
   - `caption`: short title shown on the photo.
   - `alt`: what the photo shows (for Google and visually impaired visitors).
   - `tall: true` for portrait photos (takes two rows). For a tidy grid of 8 photos, keep **4 tall + 4 normal** in this order: tall, normal, tall, normal, tall, tall, normal, normal.
4. The **first photo** is also the large photo at the top of the home page, and the **second** is shown next to the introduction. To change them, move a block to the top of the `gallery` list.
5. The first 6 photos also appear in the Instagram section.
6. Visitors can click or tap any gallery photo to see it full screen. The viewer has a **Fermer / Close ✕** button at the top right, arrows (or swipe on a phone, or the ← → keys) to move between photos, and closes with Escape or a click on the dark background. Without JavaScript, the photo simply opens on its own page.

**Taking photos from your Instagram:** use the original photos from your phone's gallery rather than screenshots (better quality, no Instagram buttons). For posts you no longer have locally: Instagram → Profile → ☰ → **Your activity** → **Download your information** sends you your original photos.

**The 8 photos already included** come from the images you sent. I cropped the Instagram buttons, counters and captions off the screenshots, kept only one copy of each duplicate, removed location data (GPS) from the files, and converted them to WebP:

| File | Project |
|---|---|
| `escalier-helicoidal.webp` | Spiral staircase and living area |
| `parquet-mosaique-renove.webp` | Mosaic parquet: sanding 40/80/120/240 + clear treatment |
| `facade-pergola.webp` | Façade renovation with pergola |
| `mur-habillage-pierre.webp` | Decorative stone-effect wall under the pergola |
| `cabinet-dentaire-couloir.webp` | Dental practice: Tarkett heavy-traffic PVC, corridor |
| `cabinet-dentaire-salle-de-soins.webp` | Dental practice: treatment room (floor laid around the fixed chair) |
| `cabinet-dentaire-accueil.webp` | Dental practice: reception |
| `cabinet-dentaire-bureau.webp` | Dental practice: office |

Your Instagram caption for the wall mentions a *faïence* cladding. On the site I described what the photo shows ("habillage décoratif façon pierre"). Adjust the wording in `site.config.mjs` if you prefer.

### Change a service
Services are in `content/translations.mjs`, section `services` (name, short summary for the home page, full description for the Services page), in both languages. Their order and grouping are at the top of the same file (`serviceOrder`, `serviceGroups`).

### Change colours or fonts
`static/assets/css/styles.css`, the `:root { … }` block at the top. Example: `--sauge: #4f6455;` is your brand green.

The brand font Minion Pro is a paid Adobe font. The site uses **Crimson Pro**, a free and very close equivalent. If you have an Adobe Fonts subscription, you can switch, but it's not necessary.

---

## 9. Instagram: what the site does and doesn't do

- **Done:** an Instagram link in the footer and on the contact page, a dedicated "Suivez-nous sur Instagram / Follow us on Instagram" section with a button to `https://www.instagram.com/lainerpeinture/`, and a grid of your project photos.
- **No fake data:** no invented posts, likes or follower counts, and no scraping.
- **Why no live feed?** Showing your latest posts automatically requires Meta's official Instagram API: a Business or Creator account, a Meta developer app, and an access token that expires and must be refreshed by a server. GitHub Pages has no server, and putting that token in the site would make it public. Options if you want a live feed later:
  1. **Keep the static grid** (recommended): fast, private, nothing to maintain. Add new photos when you like (section 8).
  2. **A widget service using the official API** (e.g. Behold, LightWidget, Elfsight; some have free plans). You connect your account on their site, and they give you a code snippet to paste into the Instagram section. Note: these load third-party content, so you'd then need to mention it in the privacy section (and possibly ask for consent).
  3. **Embedding individual posts** with Instagram's "Embed" code: also loads Meta scripts and trackers (same privacy note), and slower.
- **Icon:** the site uses a simple, generic camera icon. If you'd like the official Instagram glyph, download it from Meta's brand resources (meta.com/brand/resources/instagram) and follow their usage rules.

---

## 10. Preview on your own computer (optional)

Only if you want to test changes before publishing:

1. Install **Node.js** (LTS version) from https://nodejs.org.
2. Open a terminal in the project folder and run:
   ```
   npm run serve
   ```
3. Open **http://localhost:8080** and use **Ctrl+C** in the terminal to stop.

Don't open the `.html` files by double-clicking: links work only through the preview server or the live site.

**Checking screen sizes:** in Chrome, right-click → **Inspect** → click the phone/tablet icon (Toggle device toolbar) → type widths **320, 375, 390, 768, 1024, 1440** in the width box. Check there's no sideways scrolling and that the menu, FR | EN switch, and the "Appeler / Demander un devis" bar at the bottom work. Then check on a real iPhone and Android phone.

---

## 11. Troubleshooting

| Problem | Cause / fix |
|---|---|
| Actions tab shows red ❌ | Click it → "build" → read the "Build site" step. It names the file and line (usually a missing comma/quote or missing translation). Fix and commit again. The live site keeps the previous version meanwhile. |
| "Deploy" step fails with "Pages not enabled" / 404 | Settings → Pages → Source must be **GitHub Actions**. Then Actions → Deploy → **Re-run jobs**. |
| No workflow in Actions | `.github/workflows/deploy.yml` didn't upload (hidden folder): see 4.2. |
| "DNS check unsuccessful" / "improperly configured" | Check the records in 5.2 exactly; that the Porkbun parking records were deleted; that `www` points to `USERNAME.github.io` (no `https://`, no repository name). Wait and click "Check again". DNS changes can take up to 24–48 h. |
| Test DNS yourself | https://dnschecker.org → `lainerpeinture.com` type A (should show 185.199.108–111.153) and `www.lainerpeinture.com` type CNAME (should show `USERNAME.github.io`). |
| "Enforce HTTPS" greyed out | The certificate is being created: wait up to 24 h after a green DNS check. If stuck: remove the custom domain, Save, add it again. |
| Browser warns "not secure" | Same as above; wait for the certificate, then tick Enforce HTTPS. |
| Site shows the old version | Hard refresh (Ctrl+F5 / Cmd+Shift+R), or try a private window. Check the Actions run is ✅. |
| A photo doesn't appear | The file name in `site.config.mjs` must match exactly (capitals, extension `.webp` vs `.jpg`). The build stops with a message if the file is missing. |
| Form says "pas encore activé" | `web3formsAccessKey` is still the placeholder (section 3). |
| Form says sending failed | Wrong key, or 250/month limit reached (Web3Forms resets monthly). Check the Web3Forms email for messages. |
| Broken links on `USERNAME.github.io/lainerpeinture-site/` | Expected before the custom domain is active. Use the real domain. |

---

## 12. What was tested / what you must test

**Tested automatically before delivery** (headless Chrome + HTML validator):
- All 8 pages at widths 320, 375, 390, 768, 1024, 1440 px: no horizontal scrolling, no JavaScript errors.
- HTML validation (html-validate, recommended rules): no errors.
- Every internal link returns a page; phone links are `tel:0659091588`, email links `mailto:lainer.ent@gmail.com`, Instagram links `https://www.instagram.com/lainerpeinture/`.
- `<html lang>` is `fr` on French pages, `en` on English pages; no French interface words found on English pages (the logo's tagline "La peinture est notre passion" stays in French, as it's part of the brand mark; it's translated in the text and metadata).
- All 10 services appear on both Services pages and in the form dropdown; every service link from the home page reaches its section.
- The build fails if any French or English text is missing.
- Mobile menu: opens, moves focus inside, closes with Escape and returns focus to the button.
- First visit to `/` → `/fr/`; after choosing EN → `/` opens `/en/`; switching language keeps the section (e.g. `#pose-parquet`).
- `?service=pose-parquet` pre-selects the service in the form.
- Form: empty submit shows 4 translated errors and moves focus to the first one; invalid phone/email show specific messages; without key shows "not activated"; a simulated Web3Forms success shows the success message; a simulated failure shows the failure message (FR and EN).
- `hreflang`, canonical, sitemap, robots.txt and CNAME all use `https://www.lainerpeinture.com`.

**You must test yourself** (impossible to test before going live):
- A **real** enquiry from `/fr/contact/` and `/en/contact/` arrives at lainer.ent@gmail.com.
- Real iPhone and Android phones (tap to call, menu, form).
- DNS, HTTPS padlock, `lainerpeinture.com` → `www` redirection.
- Link preview when you share the site on WhatsApp/Facebook (can take a while to refresh).
- Google Search Console indexing (after a few days).

---

## 13. Launch checklist

- [ ] `web3formsAccessKey` filled in; test enquiry received in FR **and** EN
- [ ] Service area confirmed (`serviceArea`)
- [ ] Legal details filled in; no **[À compléter]** left on `/fr/mentions-legales/`
- [ ] Texts "how we work" and "quality" re-read and accurate
- [ ] `www.lainerpeinture.com` opens in **French** on first visit
- [ ] FR | EN switch works on every page (header and footer), on phone and computer
- [ ] All 10 services visible on `/fr/prestations/` and `/en/services/`
- [ ] Phone link calls 06 59 09 15 88; email link opens lainer.ent@gmail.com
- [ ] Instagram links open @lainerpeinture
- [ ] Layout OK at 320, 375, 390, 768, 1024, 1440 px and on a real phone
- [ ] All photos load
- [ ] `lainerpeinture.com` and `http://` versions redirect to `https://www.lainerpeinture.com`
- [ ] **Enforce HTTPS** ticked, padlock visible
- [ ] Sitemap submitted in Google Search Console; both languages indexed after a few days
- [ ] A small test edit (e.g. a word) goes live after Commit → GitHub Pages updates correctly
