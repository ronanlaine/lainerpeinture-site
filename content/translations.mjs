// =====================================================================
//  LAINER PEINTURE — ALL WEBSITE TEXT (FRENCH + ENGLISH)
//
//  Every word visible on the site lives here. French ("fr") and English
//  ("en") have exactly the same structure: if you add or rename a key in
//  one language, do the same in the other. The build checks this and
//  stops with a clear message if a translation is missing.
//
//  Tips:
//  - Keep the quotes "..." and the commas at the end of lines.
//  - French spacing before : ; ! ? is added automatically.
//  - {phone} and {email} are replaced by your real contact details.
// =====================================================================

// Service structure: order, grouping and icon. Text is further below.
// Order inside "services" = order in the form dropdown (as in your brief).
export const serviceOrder = [
  "peinture-interieure",
  "preparation-supports",
  "enduits-lissage",
  "revetements-muraux",
  "pose-parquet",
  "sols-souples",
  "decoration-interieure",
  "reparations-placo",
  "degat-des-eaux",
  "peinture-exterieure",
];

export const serviceGroups = [
  { id: "peinture", services: ["peinture-interieure", "peinture-exterieure", "decoration-interieure"] },
  { id: "murs",     services: ["preparation-supports", "enduits-lissage", "revetements-muraux", "reparations-placo"] },
  { id: "sols",     services: ["pose-parquet", "sols-souples"] },
  { id: "sinistre", services: ["degat-des-eaux"] },
];

export const translations = {
  // ===================================================================
  //  FRANÇAIS (langue par défaut)
  // ===================================================================
  fr: {
    langName: "Français",
    meta: {
      home: {
        title: "Lainer Peinture | Peinture et rénovation intérieure, revêtements et sols",
        description: "Lainer Peinture : peinture intérieure et extérieure, préparation des supports, enduits, papier peint, pose de parquet et de sols souples. Demandez votre devis.",
      },
      services: {
        title: "Prestations | Peinture, enduits, revêtements muraux et sols | Lainer Peinture",
        description: "Les dix prestations de Lainer Peinture : peinture intérieure et extérieure, préparation des supports, enduits, revêtements muraux, parquet, sols souples, décoration, placo, dégât des eaux.",
      },
      contact: {
        title: "Contact et demande de devis | Lainer Peinture",
        description: "Contactez Lainer Peinture par téléphone au 06 59 09 15 88, par e-mail ou via le formulaire de demande de devis.",
      },
      legal: {
        title: "Mentions légales et confidentialité | Lainer Peinture",
        description: "Mentions légales, hébergement et politique de confidentialité du site Lainer Peinture.",
      },
    },

    a11y: {
      skip: "Aller au contenu",
      homeLink: "Lainer Peinture, retour à l’accueil",
      mainNav: "Navigation principale",
      footerNav: "Navigation du pied de page",
      langNav: "Choisir la langue",
      langNavFooter: "Choisir la langue (pied de page)",
      menuOpen: "Ouvrir le menu",
      menuClose: "Fermer le menu",
      quickActions: "Actions rapides",
      newTab: "(s’ouvre dans un nouvel onglet)",
    },

    nav: {
      home: "Accueil",
      services: "Prestations",
      work: "Réalisations",
      contact: "Contact",
      legal: "Mentions légales",
      menu: "Menu",
    },

    cta: {
      quote: "Demander un devis",
      contact: "Contactez-nous",
      call: "Appeler le {phone}",
      callShort: "Appeler",
      quoteShort: "Devis",
      email: "Écrire un e-mail",
      allServices: "Voir toutes les prestations",
      serviceQuote: "Demander un devis pour cette prestation",
    },

    tagline: "La peinture est notre passion",

    home: {
      hero: {
        title: "Peinture et rénovation intérieure, des finitions soignées jusque dans les moindres détails.",
        lead: "Lainer Peinture vous accompagne dans vos projets de peinture, de rénovation des murs, de revêtements et de pose de sols, avec une attention particulière portée à la préparation des supports et à la qualité des finitions.",
      },
      intro: {
        title: "Vos murs, vos sols, vos finitions : un seul interlocuteur",
        p1: "Lainer Peinture réalise vos travaux de peinture intérieure et extérieure, de préparation et de rénovation des murs, de revêtements muraux et de pose de sols.",
        p2: "Du rebouchage d’une fissure à la rénovation complète d’une pièce, chaque chantier commence par le même principe : un support bien préparé, pour une finition qui dure.",
      },
      services: {
        title: "Nos prestations",
        lead: "Dix prestations, regroupées par type de travaux.",
      },
      quality: {
        title: "Une belle finition se prépare avant le premier coup de rouleau",
        lead: "La différence entre un mur repeint et un mur bien repeint se voit à la lumière rasante. Elle tient à la préparation.",
        items: [
          { title: "Protéger", text: "Sols, meubles et menuiseries sont protégés avant le début des travaux." },
          { title: "Préparer", text: "Rebouchage, traitement des fissures, ponçage et impression : le support est rendu sain et régulier." },
          { title: "Finir", text: "Angles nets, raccords discrets et découpes propres le long des plafonds et des menuiseries." },
          { title: "Rendre", text: "Le chantier est nettoyé et rangé avant la réception des travaux." },
        ],
      },
      work: {
        title: "Réalisations",
        lead: "Une sélection de chantiers. Les plus récents sont publiés sur Instagram.",
        placeholder: "Photo de chantier à venir",
      },
      process: {
        title: "Comment se déroule un projet",
        steps: [
          { title: "Votre demande", text: "Vous décrivez votre projet par téléphone, par e-mail ou avec le formulaire." },
          { title: "Visite et devis", text: "Nous examinons l’état des supports et les surfaces à traiter, puis nous vous remettons un devis détaillé." },
          { title: "Préparation", text: "Protection des lieux, puis préparation des supports : c’est l’étape qui conditionne le résultat." },
          { title: "Réalisation", text: "Peinture, pose des revêtements ou des sols, selon le planning convenu ensemble." },
          { title: "Finitions et réception", text: "Nous vérifions les finitions avec vous, puis le chantier est nettoyé." },
        ],
      },
      enquiry: {
        title: "Parlons de votre projet",
        lead: "Décrivez vos travaux en quelques lignes. Vous pouvez aussi nous appeler ou nous écrire directement.",
      },
      instagram: {
        title: "Suivez-nous sur Instagram",
        lead: "Chantiers en cours et dernières réalisations, sur @lainerpeinture.",
        button: "Voir le profil @lainerpeinture",
      },
    },

    servicesPage: {
      title: "Prestations de peinture, de rénovation et de pose de sols",
      lead: "Murs, plafonds, boiseries, revêtements et sols : voici l’ensemble de nos prestations. Pour chacune, vous pouvez demander un devis en précisant directement le type de travaux.",
      jump: "Accès direct",
    },

    groups: {
      peinture: { name: "Peinture", text: "Intérieur, extérieur et finitions décoratives." },
      murs: { name: "Murs et supports", text: "Préparer, lisser, habiller et réparer les murs." },
      sols: { name: "Sols", text: "Parquet, PVC, vinyle et moquette." },
      sinistre: { name: "Après un dégât des eaux", text: "La remise en état, une fois la fuite réparée." },
    },

    services: {
      "peinture-interieure": {
        name: "Peinture intérieure",
        summary: "Murs, plafonds, portes, escaliers et boiseries.",
        description: "Peinture intérieure : murs, plafonds, portes, escaliers et boiseries.",
      },
      "preparation-supports": {
        name: "Préparation des supports",
        summary: "Rebouchage, fissures, ponçage et impression.",
        description: "Préparation des supports : rebouchage, traitement des fissures, ponçage et impression.",
      },
      "enduits-lissage": {
        name: "Enduits et lissage",
        summary: "Ratissage complet, rénovation des murs, airless.",
        description: "Enduits et lissage : ratissage complet, rénovation des murs et application à l’airless.",
      },
      "revetements-muraux": {
        name: "Revêtements muraux",
        summary: "Papier peint, toile de verre, revêtements décoratifs.",
        description: "Revêtements muraux : papier peint, toile de verre et revêtements décoratifs.",
      },
      "pose-parquet": {
        name: "Pose de parquet",
        summary: "De la dépose de l’ancien sol aux barres de seuil.",
        description: "Pose de parquet : dépose de l’ancien sol, sous-couche, pose, ponçage du parquet, plinthes et barres de seuil.",
      },
      "sols-souples": {
        name: "Pose de sols souples",
        summary: "Lames PVC, vinyle et moquette.",
        description: "Pose de sols souples : lames PVC, vinyle et moquette.",
      },
      "decoration-interieure": {
        name: "Décoration intérieure",
        summary: "Moulures, soubassements, corniches, peintures à effets.",
        description: "Décoration intérieure : moulures, soubassements, corniches et peintures à effets.",
      },
      "reparations-placo": {
        name: "Petites réparations de placo",
        summary: "Trous, reprises de bandes, parties abîmées.",
        description: "Petites réparations de placo : trous, reprises de bandes et remplacement de parties abîmées.",
      },
      "degat-des-eaux": {
        name: "Remise en état après dégât des eaux",
        summary: "Préparation et peinture, après réparation et séchage.",
        description: "Remise en état après dégât des eaux : préparation et peinture après réparation de la fuite et séchage.",
        note: "La remise en peinture intervient uniquement une fois la fuite réparée et les supports secs. La recherche et la réparation de la fuite ne font pas partie de cette prestation.",
      },
      "peinture-exterieure": {
        name: "Peinture extérieure",
        summary: "Façades, volets, portails, clôtures et boiseries.",
        description: "Peinture extérieure : façades, volets, portails, clôtures et boiseries.",
      },
    },

    contactPage: {
      title: "Contact et demande de devis",
      lead: "Appelez-nous, écrivez-nous ou remplissez le formulaire : nous revenons vers vous pour discuter de votre projet.",
      detailsTitle: "Nos coordonnées",
      phoneLabel: "Téléphone",
      emailLabel: "E-mail",
      instagramLabel: "Instagram",
      areaLabel: "Zone d’intervention",
      formTitle: "Demande de devis",
    },

    form: {
      required: "Les champs marqués d’un astérisque (*) sont obligatoires.",
      optional: "facultatif",
      name: "Nom complet",
      phone: "Téléphone",
      email: "E-mail",
      service: "Prestation souhaitée",
      servicePlaceholder: "Choisissez une prestation",
      serviceOther: "Autre ou plusieurs prestations",
      location: "Localisation du projet",
      locationHint: "Ville ou code postal",
      message: "Votre message",
      messageHint: "Type de travaux, pièces concernées, surface approximative, délai souhaité…",
      submit: "Envoyer ma demande",
      sending: "Envoi en cours…",
      privacy: "Vos informations servent uniquement à répondre à votre demande.",
      privacyLink: "En savoir plus sur la confidentialité",
      honeypot: "Ne pas remplir ce champ",
      subject: "Nouvelle demande de devis (site Lainer Peinture)",
      errors: {
        summaryOne: "Le formulaire contient 1 erreur. Corrigez le champ signalé.",
        summaryMany: "Le formulaire contient {n} erreurs. Corrigez les champs signalés.",
        nameMissing: "Indiquez votre nom complet.",
        phoneMissing: "Indiquez votre numéro de téléphone.",
        phoneInvalid: "Ce numéro ne semble pas valide. Exemple : 06 12 34 56 78.",
        emailMissing: "Indiquez votre adresse e-mail.",
        emailInvalid: "Cette adresse e-mail n’est pas valide. Exemple : nom@exemple.fr.",
        messageMissing: "Décrivez votre projet en quelques mots.",
      },
      success: "Merci, votre demande a bien été envoyée. Nous revenons vers vous dès que possible.",
      failure: "L’envoi a échoué. Vérifiez votre connexion et réessayez, ou contactez-nous au {phone} ou à {email}.",
      notConfigured: "Le formulaire en ligne n’est pas encore activé. Contactez-nous au {phone} ou à {email}.",
    },

    footer: {
      contactTitle: "Contact",
      navTitle: "Navigation",
      rights: "Tous droits réservés.",
      followUs: "Suivez-nous sur Instagram",
    },

    legalPage: {
      title: "Mentions légales et confidentialité",
      toComplete: "[À compléter]",
      publisherTitle: "Éditeur du site",
      businessName: "Dénomination",
      legalForm: "Forme juridique",
      siret: "SIRET",
      vat: "N° de TVA intracommunautaire",
      address: "Adresse",
      phone: "Téléphone",
      email: "E-mail",
      director: "Directeur de la publication",
      hostTitle: "Hébergement",
      hostText: "Ce site est hébergé par GitHub, Inc. (service GitHub Pages), 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.",
      ipTitle: "Propriété intellectuelle",
      ipText: "Les textes, logos et photographies de ce site sont la propriété de Lainer Peinture, sauf mention contraire. Toute reproduction sans autorisation est interdite.",
      privacyTitle: "Données personnelles",
      privacyP1: "Les informations envoyées via le formulaire de contact (nom, téléphone, e-mail, localisation du projet et message) servent uniquement à répondre à votre demande et à établir un devis. Elles ne sont ni vendues ni cédées à des tiers.",
      privacyP2: "Le formulaire est transmis par le service Web3Forms, qui achemine votre message par e-mail jusqu’à Lainer Peinture. Les messages sont conservés le temps nécessaire au traitement de votre demande et au suivi de la relation commerciale.",
      privacyP3: "Conformément au RGPD, vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à {email}. Vous pouvez également adresser une réclamation à la CNIL (www.cnil.fr).",
      cookiesTitle: "Cookies",
      cookiesText: "Ce site n’utilise ni cookies, ni outil de mesure d’audience, ni publicité. Votre choix de langue est simplement enregistré dans votre navigateur (stockage local) pour vous afficher la bonne version lors de votre prochaine visite. Les polices de caractères sont hébergées sur le site lui-même.",
    },

    notFound: {
      title: "Page introuvable",
      text: "Cette page n’existe pas ou a été déplacée.",
      back: "Retour à l’accueil",
    },
  },

  // ===================================================================
  //  ENGLISH
  // ===================================================================
  en: {
    langName: "English",
    meta: {
      home: {
        title: "Lainer Peinture | Painting, interior renovation, wall coverings and flooring",
        description: "Lainer Peinture: interior and exterior painting, surface preparation, plastering, wallpaper, parquet and flexible flooring installation. Request a quote.",
      },
      services: {
        title: "Services | Painting, plastering, wall coverings and flooring | Lainer Peinture",
        description: "Lainer Peinture’s ten services: interior and exterior painting, surface preparation, plastering, wall coverings, parquet, flexible flooring, decoration, plasterboard repairs and water damage reinstatement.",
      },
      contact: {
        title: "Contact and quote request | Lainer Peinture",
        description: "Contact Lainer Peinture by phone on 06 59 09 15 88, by email or with the quote request form.",
      },
      legal: {
        title: "Legal notice and privacy | Lainer Peinture",
        description: "Legal notice, hosting information and privacy policy for the Lainer Peinture website.",
      },
    },

    a11y: {
      skip: "Skip to content",
      homeLink: "Lainer Peinture, back to home page",
      mainNav: "Main navigation",
      footerNav: "Footer navigation",
      langNav: "Choose language",
      langNavFooter: "Choose language (footer)",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      quickActions: "Quick actions",
      newTab: "(opens in a new tab)",
    },

    nav: {
      home: "Home",
      services: "Services",
      work: "Our work",
      contact: "Contact",
      legal: "Legal notice",
      menu: "Menu",
    },

    cta: {
      quote: "Request a quote",
      contact: "Contact us",
      call: "Call {phone}",
      callShort: "Call",
      quoteShort: "Quote",
      email: "Send an email",
      allServices: "See all services",
      serviceQuote: "Request a quote for this service",
    },

    tagline: "Painting is our passion",

    home: {
      hero: {
        title: "Painting and interior renovation, finished with care down to the smallest detail.",
        lead: "Lainer Peinture can help with your painting, wall renovation, wall covering and flooring projects, with particular care given to surface preparation and the quality of the finish.",
      },
      intro: {
        title: "Your walls, your floors, your finishes: one point of contact",
        p1: "Lainer Peinture carries out interior and exterior painting, wall preparation and renovation, wall coverings and flooring installation.",
        p2: "From filling a single crack to renovating a whole room, every project starts from the same principle: a well-prepared surface, for a finish that lasts.",
      },
      services: {
        title: "Our services",
        lead: "Ten services, grouped by type of work.",
      },
      quality: {
        title: "A fine finish is prepared before the first stroke of the roller",
        lead: "The difference between a repainted wall and a well-repainted wall shows in low, raking light. It comes down to preparation.",
        items: [
          { title: "Protect", text: "Floors, furniture and joinery are protected before work begins." },
          { title: "Prepare", text: "Filling, crack repair, sanding and priming leave the surface sound and even." },
          { title: "Finish", text: "Crisp corners, invisible joins and clean cutting-in along ceilings and joinery." },
          { title: "Hand over", text: "The site is cleaned and tidied before the work is handed over." },
        ],
      },
      work: {
        title: "Our work",
        lead: "A selection of projects. The most recent ones are posted on Instagram.",
        placeholder: "Project photo coming soon",
      },
      process: {
        title: "How a project works",
        steps: [
          { title: "Your request", text: "You describe your project by phone, by email or with the form." },
          { title: "Visit and quote", text: "We assess the condition of the surfaces and the areas to be treated, then give you a detailed quote." },
          { title: "Preparation", text: "The space is protected, then the surfaces are prepared: this is the step that determines the result." },
          { title: "The work", text: "Painting, wall coverings or flooring, following the schedule agreed together." },
          { title: "Finishing and handover", text: "We check the finish with you, then the site is cleaned." },
        ],
      },
      enquiry: {
        title: "Tell us about your project",
        lead: "Describe the work in a few lines. You can also call or email us directly.",
      },
      instagram: {
        title: "Follow us on Instagram",
        lead: "Work in progress and recent projects, on @lainerpeinture.",
        button: "View the @lainerpeinture profile",
      },
    },

    servicesPage: {
      title: "Painting, renovation and flooring services",
      lead: "Walls, ceilings, woodwork, wall coverings and floors: here is everything we offer. For each service, you can request a quote with the type of work already filled in.",
      jump: "Jump to",
    },

    groups: {
      peinture: { name: "Painting", text: "Interior, exterior and decorative finishes." },
      murs: { name: "Walls and surfaces", text: "Preparing, smoothing, covering and repairing walls." },
      sols: { name: "Flooring", text: "Parquet, PVC, vinyl and carpet." },
      sinistre: { name: "After water damage", text: "Reinstatement, once the leak has been repaired." },
    },

    services: {
      "peinture-interieure": {
        name: "Interior painting",
        summary: "Walls, ceilings, doors, staircases and woodwork.",
        description: "Interior painting for walls, ceilings, doors, staircases and woodwork.",
      },
      "preparation-supports": {
        name: "Surface preparation",
        summary: "Filling, crack repair, sanding and priming.",
        description: "Surface preparation, including filling holes, repairing cracks, sanding and applying primer.",
      },
      "enduits-lissage": {
        name: "Plastering and smoothing",
        summary: "Full skim coating, wall renovation, airless spraying.",
        description: "Wall filling and smoothing, full-surface skim coating, wall renovation and airless spray application.",
      },
      "revetements-muraux": {
        name: "Wall coverings",
        summary: "Wallpaper, glass-fibre wall covering, decorative finishes.",
        description: "Wall coverings, including wallpaper, glass-fibre wall covering and decorative wall finishes.",
      },
      "pose-parquet": {
        name: "Parquet and wood flooring",
        summary: "From removing the old floor to threshold strips.",
        description: "Wood and parquet flooring installation, including removal of existing flooring, underlay, installation, sanding of parquet flooring, skirting boards and threshold strips.",
      },
      "sols-souples": {
        name: "Flexible flooring",
        summary: "PVC planks, vinyl and carpet.",
        description: "Installation of flexible flooring, including PVC flooring planks, vinyl flooring and carpet.",
      },
      "decoration-interieure": {
        name: "Interior decoration",
        summary: "Mouldings, wall panelling, cornices, paint effects.",
        description: "Interior decorative finishes, including mouldings, wall panelling, cornices and decorative paint effects.",
      },
      "reparations-placo": {
        name: "Minor plasterboard repairs",
        summary: "Holes, joint tape, damaged sections.",
        description: "Minor plasterboard repairs, including filling holes, repairing joint tape and replacing damaged sections.",
      },
      "degat-des-eaux": {
        name: "Water damage reinstatement",
        summary: "Preparation and repainting, after repair and drying.",
        description: "Reinstatement after water damage, including surface preparation and repainting once the leak has been repaired and the affected area has dried.",
        note: "Repainting only takes place once the leak has been repaired and the surfaces are dry. Finding and repairing the leak is not part of this service.",
      },
      "peinture-exterieure": {
        name: "Exterior painting",
        summary: "Façades, shutters, gates, fences and woodwork.",
        description: "Exterior painting for façades, shutters, gates, fences and exterior woodwork.",
      },
    },

    contactPage: {
      title: "Contact and quote request",
      lead: "Call us, email us or fill in the form, and we will get back to you to discuss your project.",
      detailsTitle: "Contact details",
      phoneLabel: "Phone",
      emailLabel: "Email",
      instagramLabel: "Instagram",
      areaLabel: "Service area",
      formTitle: "Quote request",
    },

    form: {
      required: "Fields marked with an asterisk (*) are required.",
      optional: "optional",
      name: "Full name",
      phone: "Phone number",
      email: "Email address",
      service: "Service required",
      servicePlaceholder: "Choose a service",
      serviceOther: "Other or several services",
      location: "Project location",
      locationHint: "Town or postcode",
      message: "Your message",
      messageHint: "Type of work, rooms involved, approximate area, preferred timing…",
      submit: "Send enquiry",
      sending: "Sending…",
      privacy: "Your details are only used to reply to your enquiry.",
      privacyLink: "Read more about privacy",
      honeypot: "Leave this field empty",
      subject: "New quote request (Lainer Peinture website)",
      errors: {
        summaryOne: "The form contains 1 error. Please correct the highlighted field.",
        summaryMany: "The form contains {n} errors. Please correct the highlighted fields.",
        nameMissing: "Enter your full name.",
        phoneMissing: "Enter your phone number.",
        phoneInvalid: "This number does not look valid. Example: 06 12 34 56 78 or +44 7700 900123.",
        emailMissing: "Enter your email address.",
        emailInvalid: "This email address is not valid. Example: name@example.com.",
        messageMissing: "Describe your project in a few words.",
      },
      success: "Thank you, your enquiry has been sent. We will get back to you as soon as possible.",
      failure: "Sending failed. Check your connection and try again, or contact us on {phone} or at {email}.",
      notConfigured: "The online form is not active yet. Please contact us on {phone} or at {email}.",
    },

    footer: {
      contactTitle: "Contact",
      navTitle: "Navigation",
      rights: "All rights reserved.",
      followUs: "Follow us on Instagram",
    },

    legalPage: {
      title: "Legal notice and privacy",
      toComplete: "[To be completed]",
      publisherTitle: "Website publisher",
      businessName: "Business name",
      legalForm: "Legal form",
      siret: "SIRET",
      vat: "EU VAT number",
      address: "Address",
      phone: "Phone",
      email: "Email",
      director: "Publication director",
      hostTitle: "Hosting",
      hostText: "This website is hosted by GitHub, Inc. (GitHub Pages service), 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States.",
      ipTitle: "Intellectual property",
      ipText: "The text, logos and photographs on this website belong to Lainer Peinture unless stated otherwise. Reproduction without permission is prohibited.",
      privacyTitle: "Personal data",
      privacyP1: "Information sent with the contact form (name, phone number, email, project location and message) is only used to reply to your enquiry and prepare a quote. It is never sold or passed on to third parties.",
      privacyP2: "The form is processed by the Web3Forms service, which delivers your message by email to Lainer Peinture. Messages are kept for as long as needed to handle your enquiry and any resulting business relationship.",
      privacyP3: "Under the GDPR, you can ask to access, correct or delete your data by writing to {email}. You can also lodge a complaint with the CNIL, the French data protection authority (www.cnil.fr).",
      cookiesTitle: "Cookies",
      cookiesText: "This website uses no cookies, no analytics and no advertising. Your language choice is simply saved in your browser (local storage) so the right version is shown on your next visit. Fonts are hosted on the website itself.",
    },

    notFound: {
      title: "Page not found",
      text: "This page does not exist or has been moved.",
      back: "Back to the home page",
    },
  },
};
