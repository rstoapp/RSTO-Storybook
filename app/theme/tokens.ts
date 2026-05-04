// Raw design tokens — single source of truth for the RSTO palette.
// Outback scale names (from theme.css) are noted in comments.

// ─── Neutrals (outback: n-*) ─────────────────────────────────────────────────
// Warm off-whites to deep clay. Use in place of pure grays for backgrounds,
// borders, and text where the warm-earth character of the brand is needed.
export const rstoNeutral = {
    paper:  '#FBF6EE', // --n-paper  (N-00) page background
    bone:   '#F4ECE0', // --n-bone   (N-10) card backgrounds
    sand:   '#E8DCC6', // --n-sand   (N-20) rules, borders
    stone:  '#BFB197', // --n-stone  (N-40) tertiary text
    shadow: '#6B5E4A', // --n-shadow (N-60) secondary text
    earth:  '#3D352A', // --n-earth  (N-80) body text
    ink:    '#1F1A14', // --n-ink    (N-90) headlines
} as const;

// ─── Orange / Ochre (outback: o-*) ───────────────────────────────────────────
// RSTO primary orange. Sunset, earth, terracotta.
export const rstoOrange = {
    _10: '#FDF1E2', // --o-10
    _20: '#F8D9B0', // --o-20
    _30: '#F0B174', // --o-30
    _40: '#E8934A', // --o-40
    _50: '#F28B2D', // --o-50  RSTO primary orange
    _60: '#C86A1F', // --o-60  terracotta
    _70: '#A34E16', // --o-70  burnt sienna
    _80: '#6E3410', // --o-80  deep rust
} as const;

// ─── Blue / Sky (outback: b-*) ───────────────────────────────────────────────
// RSTO primary blue. Desert sky, waterhole, dusk.
export const rstoBlue = {
    _10: '#E8F2F4', // --b-10
    _20: '#C3DDE2', // --b-20
    _30: '#9CC5CE', // --b-30
    _40: '#7AB8C5', // --b-40
    _50: '#65C4DB', // --b-50  RSTO primary blue
    _60: '#3E90A3', // --b-60
    _70: '#2D6B7A', // --b-70  dusk
    _80: '#1D4552', // --b-80
} as const;

// ─── Green / Saltbush (outback: g-*) ─────────────────────────────────────────
// Desaturated bushland greens. Eucalyptus, mulga.
export const rstoGreen = {
    _10: '#EDF0E5', // --g-10
    _20: '#D4DCBC', // --g-20
    _30: '#A8B48A', // --g-30
    _40: '#7F9165', // --g-40
    _50: '#5D7A45', // --g-50  eucalyptus
    _60: '#475F34', // --g-60  mulga
    _70: '#2D3D20', // --g-70
} as const;

// ─── Brown / Bark (outback: br-*) ────────────────────────────────────────────
// Red ochre, pindan, bark. New in the outback palette — use for warm tertiary
// accents, data vis, or UI surfaces that need earthy warmth beyond the orange.
export const rstoBrown = {
    _10: '#F0E4D5', // --br-10
    _20: '#D8C4A6', // --br-20
    _30: '#B8997A', // --br-30
    _40: '#96735A', // --br-40
    _50: '#6F5340', // --br-50  bark
    _60: '#4F3A2C', // --br-60
    _70: '#2D1F16', // --br-70
} as const;

// ─── Gray (neutral, non-warm) ─────────────────────────────────────────────────
// Kept for MUI component defaults and wherever a pure gray is required.
// Prefer rstoNeutral for brand-facing surfaces.
export const rstoGray = {
    shadow: '#1919190D',
    black:  '#191919',
    _90:    '#474747',
    _80:    '#757575',
    _70:    '#A3A3A3',
    _60:    '#D1D1D1',
    _50:    '#EAEAEA',
    _40:    '#EFEFEF',
    _30:    '#F3F3F3',
    _20:    '#FCFCFC',
    white:  '#FFFFFF',
} as const;

// ─── Red (error / danger) ─────────────────────────────────────────────────────
// Kept for error states; no direct equivalent in the outback palette.
export const rstoRed = {
    _80: '#490000',
    _70: '#7C0000',
    _60: '#AF0303',
    _50: '#E23636',
    _40: '#EB7272',
    _30: '#F19A9A',
    _20: '#F6C3C3',
    _10: '#FCEBEB',
} as const;

// ─── Functional / Status ──────────────────────────────────────────────────────
export const rstoFunctional = {
    error:          '#DA2E2E',
    success:        '#99D35F',
    // Outback status scale (--status-*)
    statusPositive: '#5D7A45', // --status-positive  eucalyptus green  on-track
    statusModerate: '#3E90A3', // --status-moderate  desert sky blue   watch
    statusWarning:  '#F28B2D', // --status-warning   RSTO orange       below-target
    statusCritical: '#A34E16', // --status-critical  burnt sienna      needs attention
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────
export const fonts = {
    display: '"Fraunces", Georgia, "Times New Roman", serif', // --font-display (replaces Bebas Neue)
    body:    '"Open Sans", sans-serif',                       // --font-open-sans (replaces Inter)
} as const;
