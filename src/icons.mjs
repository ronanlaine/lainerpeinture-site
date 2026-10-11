// Simple line icons drawn for this site (48×48 grid, colour = currentColor).
// To change an icon, replace the SVG content of the matching key.

const wrap = (body, size = 48) =>
  `<svg class="icon" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

export const serviceIcons = {
  // Paint roller
  "peinture-interieure": wrap(`<rect x="8" y="7" width="26" height="11" rx="2.5"/><path d="M34 12.5h4.5v10.5H24v6"/><rect x="20.5" y="29" width="7" height="13" rx="2.5"/><path d="M12 12.5h8"/>`),
  // Filling knife over a crack
  "preparation-supports": wrap(`<path d="M13 7h22l-3.5 16h-15z"/><path d="M21 23v5h6v-5"/><rect x="20" y="28" width="8" height="14" rx="2.5"/><path d="M38 30l3 3-2 3 3 3" opacity=".7"/>`),
  // Smoothing trowel
  "enduits-lissage": wrap(`<rect x="6" y="28" width="36" height="6" rx="1.5"/><path d="M17 28v-6.5a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4V28"/><path d="M7 11c5-3 9-3 13 0s9 3 13 0 6-2.5 8-1.5"/>`),
  // Wallpaper roll hanging
  "revetements-muraux": wrap(`<circle cx="12" cy="11" r="4"/><path d="M12 7h25a4 4 0 0 1 0 8H12"/><path d="M15 15v26h20V15"/><path d="M21 21l4 4-4 4-4-4zM29 29l3 3-3 3-3-3z" stroke-width="1.3"/>`),
  // Staggered parquet planks
  "pose-parquet": wrap(`<rect x="6" y="9" width="36" height="9" rx="1"/><rect x="6" y="19.5" width="36" height="9" rx="1"/><rect x="6" y="30" width="36" height="9" rx="1"/><path d="M20 9v9M33 19.5v9M15 30v9M30 30v9"/>`),
  // Flooring roll unrolling
  "sols-souples": wrap(`<circle cx="14" cy="28" r="8"/><circle cx="14" cy="28" r="3"/><path d="M14 20h28v16H14"/><path d="M28 24v8" opacity=".6"/>`),
  // Cornice and wall panel
  "decoration-interieure": wrap(`<path d="M6 8h36"/><path d="M8 8v4c5 0 7 2 8.5 4.5S21 20 26 20h16"/><rect x="11" y="27" width="26" height="14" rx="1"/><rect x="15" y="31" width="18" height="6" rx=".5"/>`),
  // Plasterboard with a patched section
  "reparations-placo": wrap(`<rect x="7" y="7" width="34" height="34" rx="1"/><path d="M24 7v34" stroke-dasharray="2.5 3"/><rect x="28" y="23" width="9" height="9"/><circle cx="11" cy="11" r=".6" fill="currentColor"/><circle cx="37" cy="11" r=".6" fill="currentColor"/><circle cx="11" cy="37" r=".6" fill="currentColor"/>`),
  // Water drop with a brush stroke
  "degat-des-eaux": wrap(`<path d="M24 6S12 20 12 29a12 12 0 0 0 24 0C36 20 24 6 24 6z"/><path d="M18 31c2.5 2 4.5 2 6 0s3.5-2 6 0"/>`),
  // Façade with shutters
  "peinture-exterieure": wrap(`<path d="M5 22L24 8l19 14"/><path d="M10 19v22h28V19"/><rect x="20" y="24" width="8" height="8"/><rect x="15.5" y="24" width="4" height="8"/><rect x="28.5" y="24" width="4" height="8"/><path d="M21 41v-5h6v5"/>`),
};

const ui = (body) =>
  `<svg class="icon-ui" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

export const uiIcons = {
  phone: ui(`<path d="M6.6 3.5h-2A1.6 1.6 0 0 0 3 5.2C3.3 13.6 10.4 20.7 18.8 21a1.6 1.6 0 0 0 1.7-1.6v-2a1 1 0 0 0-.8-1l-3.5-.8a1 1 0 0 0-1 .3l-1.4 1.5a13 13 0 0 1-5.2-5.2l1.5-1.4a1 1 0 0 0 .3-1l-.8-3.5a1 1 0 0 0-1-.8z"/>`),
  mail: ui(`<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3.5 6l8.5 7 8.5-7"/>`),
  // Generic camera icon (not the Instagram trademark glyph; see README to use the official one)
  camera: ui(`<path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H8l1.6-2.5h4.8L16 7h3.5A1.5 1.5 0 0 1 21 8.5v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/><circle cx="12" cy="13" r="3.6"/>`),
  zoom: ui(`<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21M10.5 7.5v6M7.5 10.5h6"/>`),
  chevronLeft: ui(`<path d="M15 5l-7 7 7 7"/>`),
  chevronRight: ui(`<path d="M9 5l7 7-7 7"/>`),
  menu: ui(`<path d="M4 7h16M4 12h16M4 17h16"/>`),
  close: ui(`<path d="M6 6l12 12M18 6L6 18"/>`),
  pin: ui(`<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>`),
};
