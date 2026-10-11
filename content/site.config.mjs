// =====================================================================
//  LAINER PEINTURE — SITE CONFIGURATION
//  This is the main file you edit. Values marked "À COMPLÉTER" or
//  "CHANGE ME" must be filled in before launch. Everything else is ready.
//  After editing on GitHub, commit: the site rebuilds automatically.
// =====================================================================

export default {
  // ---------------------------------------------------------------
  // 1. YOUR DOMAIN  (CHANGE ME)
  // Full address of the live site, WITH https:// and WITHOUT a final slash.
  // The "www" version is the main address; lainerpeinture.com redirects to it.
  // Used for canonical URLs, hreflang, sitemap, social previews and CNAME.
  // ---------------------------------------------------------------
  siteUrl: "https://www.lainerpeinture.com",

  // ---------------------------------------------------------------
  // 2. ENQUIRY FORM  (CHANGE ME)
  // Free access key from https://web3forms.com (sent to lainer.ent@gmail.com).
  // This key is designed to be public: it can only SEND messages to your
  // inbox, it cannot read them or log in to anything.
  // Until it is set, the form shows a clear "not activated yet" message
  // instead of pretending to send.
  // ---------------------------------------------------------------
  web3formsAccessKey: "VOTRE_CLE_WEB3FORMS",

  // ---------------------------------------------------------------
  // 3. BUSINESS DETAILS (provided by you — no need to change)
  // ---------------------------------------------------------------
  businessName: "Lainer Peinture",
  phone: {
    href: "0659091588",            // used in tel: links
    display: "06 59 09 15 88",     // what visitors read
    international: "+33659091588", // used in structured data for Google
  },
  email: "lainer.ent@gmail.com",
  instagram: {
    handle: "lainerpeinture",
    url: "https://www.instagram.com/lainerpeinture/",
  },

  // ---------------------------------------------------------------
  // 4. SERVICE AREA  (À COMPLÉTER — optional)
  // Leave empty ("") to hide it everywhere. Example:
  //   fr: "Lyon et ses environs (Rhône)", en: "Lyon and the surrounding area (Rhône)"
  // When filled in it appears on the home page, contact page, footer and
  // in Google structured data. It also helps local SEO a lot.
  // ---------------------------------------------------------------
  // Taken from your Instagram hashtags (#artisanorleans #artisan45): please confirm.
  serviceArea: { fr: "Orléans et le Loiret (45)", en: "Orléans and the Loiret area (45)" },

  // ---------------------------------------------------------------
  // 5. LEGAL NOTICE  (À COMPLÉTER — required by French law, LCEN art. 6)
  // Shown on the "Mentions légales" page. Empty values display a
  // visible "[À compléter]" marker so nothing is invented.
  // ---------------------------------------------------------------
  legal: {
    legalForm: "",        // e.g. "Entreprise individuelle", "SASU", "EURL"
    siret: "",            // e.g. "123 456 789 00012"
    address: "",          // registered business address
    publisher: "",        // "Directeur de la publication": your full name
    vat: "",              // VAT number if any (leave empty if none)
  },

  // ---------------------------------------------------------------
  // 6. PROJECT PHOTOS (gallery + Instagram section)
  // 1) Put your photos in  static/assets/img/projects/
  // 2) Write the file name in "file" (e.g. "salon-1.jpg").
  // 3) "caption" = short title shown on the photo (both languages).
  //    "alt" = description for Google and visually impaired visitors.
  //    "tall: true" = the photo takes two rows (good for portrait photos).
  //    For each photo, also add a small copy named  name-700.webp
  //    (700 px) — it loads on phones. Optional but recommended.
  // Empty "file" = an elegant placeholder tile is shown instead.
  // Recommended: JPG or WebP, 1600 px wide max, under 300 KB each.
  // ---------------------------------------------------------------
  gallery: [
    {
      file: "escalier-helicoidal.webp", tall: true,
      caption: { fr: "Escalier hélicoïdal et pièce de vie", en: "Spiral staircase and living area" },
      alt: { fr: "Escalier hélicoïdal blanc aux courbes lisses devant des murs bleu nuit, dans une pièce de vie lumineuse", en: "Smooth white spiral staircase against midnight-blue walls in a bright living area" },
    },
    {
      file: "parquet-mosaique-renove.webp",
      caption: { fr: "Rénovation d’un parquet mosaïque", en: "Mosaic parquet renovation" },
      alt: { fr: "Parquet mosaïque en chêne poncé en plusieurs passes puis protégé par un traitement incolore, dans une chambre mansardée", en: "Oak mosaic parquet sanded in several passes and protected with a clear treatment, in an attic bedroom" },
    },
    {
      file: "facade-pergola.webp", tall: true,
      caption: { fr: "Ravalement de façade et terrasse", en: "Façade renovation and terrace" },
      alt: { fr: "Façade blanche d’une maison avec pergola verte et mur décoratif façon pierre sur la terrasse", en: "White house façade with a green pergola and a stone-effect decorative wall on the terrace" },
    },
    {
      file: "mur-habillage-pierre.webp",
      caption: { fr: "Habillage décoratif d’un mur extérieur", en: "Decorative finish on an exterior wall" },
      alt: { fr: "Mur extérieur sous pergola rénové avec un habillage décoratif façon pierre", en: "Exterior wall under a pergola renovated with a stone-effect decorative finish" },
    },
    {
      file: "cabinet-dentaire-couloir.webp", tall: true,
      caption: { fr: "Cabinet dentaire : sol PVC grand passage", en: "Dental practice: heavy-traffic PVC flooring" },
      alt: { fr: "Couloir d’un cabinet dentaire revêtu d’un sol PVC grand passage effet béton, avec barre de seuil", en: "Dental practice corridor fitted with concrete-effect heavy-traffic PVC flooring and a threshold strip" },
    },
    {
      file: "cabinet-dentaire-salle-de-soins.webp", tall: true,
      caption: { fr: "Cabinet dentaire : salle de soins", en: "Dental practice: treatment room" },
      alt: { fr: "Salle de soins avec fauteuil dentaire, sol PVC posé autour du fauteuil resté en place", en: "Treatment room with a dental chair, PVC flooring laid around the chair left in place" },
    },
    {
      file: "cabinet-dentaire-accueil.webp",
      caption: { fr: "Cabinet dentaire : accueil", en: "Dental practice: reception" },
      alt: { fr: "Accueil d’un cabinet dentaire avec un sol PVC effet béton gris", en: "Dental practice reception area with grey concrete-effect PVC flooring" },
    },
    {
      file: "cabinet-dentaire-bureau.webp",
      caption: { fr: "Cabinet dentaire : bureau", en: "Dental practice: office" },
      alt: { fr: "Bureau et rangements d’un cabinet dentaire, sol PVC posé jusqu’à la barre de seuil", en: "Office and storage in a dental practice, PVC flooring laid up to the threshold strip" },
    },
  ],

  // ---------------------------------------------------------------
  // Technical settings (normally no need to touch)
  // ---------------------------------------------------------------
  defaultLang: "fr",
  langs: ["fr", "en"],
  locales: { fr: "fr_FR", en: "en_GB" },
  // Page addresses for each language (folder names under /fr/ and /en/)
  routes: {
    home:     { fr: "",                 en: "" },
    services: { fr: "prestations/",     en: "services/" },
    contact:  { fr: "contact/",         en: "contact/" },
    legal:    { fr: "mentions-legales/", en: "legal-notice/" },
  },
};
