/**
 * Design tokens extracted verbatim from the reference mockups in /design:
 * jaza-ana-sayfa.html, jaza-demo-odasi-rezervasyon.html, jaza-kafe-rezervasyon.html,
 * jaza-plak-kutuphanesi.html (all four share one :root block) and
 * jaza-design-system.html (an earlier v1 palette, superseded by the four above —
 * kept as `legacy` in case the design system doc needs reconciling later).
 *
 * Do not hand-tune these values — if the mockups change, re-extract from the CSS
 * custom properties instead of eyeballing a new hex.
 */

export const color = {
  bg: "#25120C",
  surface1: "#331C13",
  surface2: "#3E2417",
  border: "rgba(232,201,163,0.13)",
  borderStrong: "rgba(232,201,163,0.26)",

  copper300: "#E8B084",
  copper400: "#D88A54",
  copper500: "#C97B4A",
  amberGlow: "#E8A868",

  cream: "#F3E9DC",
  taupe: "#B7A491",
  taupeDim: "#93816E",

  success: "#8FAE7D",
  live: "#D8724A",
  error: "#E7908A",

  /** Text color to use on top of copper500/amber-filled surfaces (buttons, active pills). */
  onCopper: "#231409",

  /** Outer page background behind the phone frame in the mockups — not part of the app UI itself. */
  stageBg: "#150A06",
} as const;

/** v1 palette from jaza-design-system.html — slightly different from the four screen mockups above. */
export const legacyColor = {
  bg: "#17100D",
  surface1: "#241A15",
  surface2: "#2E2119",
  surface3: "#3A291F",
  border: "rgba(232,201,163,0.14)",
  borderStrong: "rgba(232,201,163,0.28)",
  copper300: "#E8B084",
  copper400: "#D88A54",
  copper500: "#C97B4A",
  copper600: "#A85E36",
  amberGlow: "#E8A868",
  cream: "#F3E9DC",
  taupe: "#B7A491",
  taupeDim: "#8A7A69",
  success: "#8FAE7D",
} as const;

/** Genre accent colors used for record art / mascot gradients in the plak kütüphanesi screen. */
export const genreColor = {
  Jazz: { c1: "#5C87B8", c2: "#1F3350" },
  Soul: { c1: "#C46A75", c2: "#3A1418" },
  Blues: { c1: "#5FA0B0", c2: "#173238" },
  Funk: { c1: "#E0925C", c2: "#4A2416" },
  Klasik: { c1: "#D9BB6B", c2: "#4A3607" },
  Elektronik: { c1: "#A184C9", c2: "#2E1A42" },
  Rock: { c1: "#7FBE9A", c2: "#183B30" },
} as const;

export const fontFamily = {
  /** Editorial serif for display headings — used italic more often than not. */
  display: "Fraunces",
  /** Body / UI text. */
  body: "Inter",
  /** Live numbers, timestamps, labels, everything data-like. */
  mono: "IBM Plex Mono",
} as const;

/** Google Fonts URL used across every mockup — keep the same weight/style axes when loading in-app. */
export const fontImportUrl =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,400&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";

export const fontSize = {
  displayXl: 40,
  displayL: 28,
  displayM: 20,
  greeting: 23,
  heroTitle: 26,
  detailTitle: 22,
  headTitle: 21,
  body: 16,
  sectionTitle: 22,
  resRoom: 17,
  caption: 13,
  small: 12.5,
  tiny: 11,
  micro: 10,
  nano: 9,
} as const;

export const radius = {
  pill: 100,
  card: 16,
  cardSm: 14,
  input: 10,
  inputSm: 8,
  circle: 9999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/** Letter-spacing used on mono/uppercase eyebrow and tag labels, in em units. */
export const letterSpacing = {
  tag: 0.08,
  eyebrow: 0.14,
  tagline: 0.3,
  sectionLabel: 0.1,
} as const;

export const theme = {
  color,
  legacyColor,
  genreColor,
  fontFamily,
  fontImportUrl,
  fontSize,
  radius,
  spacing,
  letterSpacing,
} as const;

export type Theme = typeof theme;
export type Genre = keyof typeof genreColor;
