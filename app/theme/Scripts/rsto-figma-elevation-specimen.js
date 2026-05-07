// ===========================================================================
// RSTO ELEVATION SPECIMEN GENERATOR - Figma
// ===========================================================================
//
// HOW TO USE:
//   1. Run rsto-figma-effect-styles.js FIRST
//   2. Navigate to your Foundations - Elevation & Effects page in Figma
//   3. Open Scripter, paste and click Run
//   4. Re-run any time effect styles change
//
// WHAT IT DOES:
//   - Reads Elevation/* effect styles from the current file
//   - Builds a visual specimen showing each level applied to a card
//   - Shows the CSS value, usage context, and applies the actual effect style
//   - Safe to re-run: deletes and recreates "Elevation Scale" each time
// ===========================================================================

const FRAME_NAME = "Elevation Scale";

// Colours (from tokens.ts)
const C = {
  paper:  { r: 0.984, g: 0.965, b: 0.933 },  // #FBF6EE
  bone:   { r: 0.957, g: 0.925, b: 0.878 },  // #F4ECE0
  sand:   { r: 0.910, g: 0.863, b: 0.776 },  // #E8DCC6
  ink:    { r: 0.122, g: 0.102, b: 0.078 },  // #1F1A14
  shadow: { r: 0.420, g: 0.369, b: 0.290 },  // #6B5E4A
  stone:  { r: 0.749, g: 0.694, b: 0.592 },  // #BFB197
  orange: { r: 0.949, g: 0.545, b: 0.176 },  // #F28B2D
  white:  { r: 1.000, g: 1.000, b: 1.000 },
};

// Style name -> CSS and usage info (must match names in rsto-figma-effect-styles.js)
const ELEVATION_META = {
  "Elevation/0-Flat": {
    label:   "0 — Flat",
    css:     "box-shadow: none",
    usage:   "Buttons, accordion, flat Paper, sidebar panels. No depth — sits flush with the surface.",
  },
  "Elevation/1-Card": {
    label:   "1 — Card",
    css:     "box-shadow: 0 4px 4px 0 rgba(25,25,25,0.05)",
    usage:   "Elevated card variant. Subtle lift to distinguish interactive or featured cards from the page background.",
  },
  "Elevation/2-Floating": {
    label:   "2 — Floating",
    css:     "box-shadow: 0 4px 16px 0 rgba(0,0,0,0.10)",
    usage:   "Tooltips, dropdowns, popovers. Floats clearly above page content without being heavy.",
  },
  "Elevation/3-Modal": {
    label:   "3 — Modal",
    css:     "box-shadow: 0 4px 16px 0 rgba(0,0,0,0.12)",
    usage:   "Date pickers, drawers, dialogs. Strongest shadow — communicates content in front of a scrim or overlay.",
  },
};

const STYLE_ORDER = [
  "Elevation/0-Flat",
  "Elevation/1-Card",
  "Elevation/2-Floating",
  "Elevation/3-Modal",
];

// Layout
const FRAME_W    = 1080;
const PADDING    = 64;
const CARD_W     = 200;
const CARD_H     = 120;
const COL_GAP    = 40;
const INFO_Y_OFF = CARD_H + 24;  // vertical offset for labels below card

async function loadFonts() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium"  });
  await figma.loadFontAsync({ family: "Inter", style: "Bold"    });
}

function txt(content, size, fontStyle, colour, w) {
  const t = figma.createText();
  t.fontName   = { family: "Inter", style: fontStyle };
  t.fontSize   = size;
  t.fills      = [{ type: "SOLID", color: colour }];
  t.characters = content;
  if (w) { t.resize(w, t.height); t.textAutoResize = "HEIGHT"; }
  return t;
}

async function main() {
  await loadFonts();

  // Load effect styles
  const allEffectStyles = figma.getLocalEffectStyles();
  const styleMap = {};
  for (const s of allEffectStyles) styleMap[s.name] = s;

  console.log("Found " + allEffectStyles.length + " effect styles:");
  for (const s of allEffectStyles) console.log("  - " + s.name);

  const elevationStyles = STYLE_ORDER.map(n => styleMap[n]).filter(Boolean);

  if (elevationStyles.length === 0) {
    figma.notify(
      "No Elevation/* styles found. Run rsto-figma-effect-styles.js first.",
      { timeout: 5000 }
    );
    figma.closePlugin();
    return;
  }

  // Remove existing frame
  const existing = figma.currentPage.children.find(n => n.name === FRAME_NAME);
  if (existing) existing.remove();

  // Root frame
  const root = figma.createFrame();
  root.name = FRAME_NAME;
  root.fills = [{ type: "SOLID", color: C.paper }];
  root.resize(FRAME_W, 200);
  root.clipsContent = false;
  figma.currentPage.appendChild(root);

  let y = PADDING;

  // ── Section heading ────────────────────────────────────────────────────────
  const heading = txt("Elevation & Effects", 11, "Medium", C.shadow, 300);
  heading.name = "Section/Heading";
  heading.x = PADDING; heading.y = y;
  root.appendChild(heading);
  y += heading.height + 8;

  const accent = figma.createRectangle();
  accent.name = "Section/Accent-Bar";
  accent.resize(32, 3);
  accent.x = PADDING; accent.y = y;
  accent.fills = [{ type: "SOLID", color: C.orange }];
  accent.cornerRadius = 2;
  root.appendChild(accent);
  y += 20;

  const desc = txt(
    "Four elevation levels. Use the lowest level that creates clear hierarchy — avoid stacking multiple shadows.",
    11, "Regular", C.shadow, FRAME_W - PADDING * 2
  );
  desc.name = "Section/Description";
  desc.x = PADDING; desc.y = y;
  root.appendChild(desc);
  y += desc.height + 48;

  // ── Card row ───────────────────────────────────────────────────────────────
  // All cards on the same horizontal baseline
  const cardsRow = figma.createFrame();
  cardsRow.name = "Cards/Row";
  cardsRow.fills = [];
  cardsRow.resize(FRAME_W - PADDING * 2, CARD_H);
  cardsRow.x = PADDING; cardsRow.y = y;
  root.appendChild(cardsRow);

  let cardX = 0;

  for (const effectStyle of elevationStyles) {
    const meta = ELEVATION_META[effectStyle.name] || {};

    // Card frame
    const card = figma.createFrame();
    card.name = "Card/" + effectStyle.name.replace("Elevation/", "");
    card.resize(CARD_W, CARD_H);
    card.x = cardX; card.y = 0;
    card.fills = [{ type: "SOLID", color: C.white }];
    card.cornerRadius = 8;

    // Apply effect style
    try {
      card.effectStyleId = effectStyle.id;
    } catch (e) {
      // Fall back to direct effects if styleId binding fails
      card.effects = effectStyle.effects;
      console.warn("Could not bind effectStyleId for " + effectStyle.name + ": " + e.message);
    }

    // Add a subtle card border for elevation/0 (flat — no shadow, needs border to be visible)
    if (effectStyle.name === "Elevation/0-Flat") {
      card.strokes = [{ type: "SOLID", color: C.sand }];
      card.strokeWeight = 1;
    }

    cardsRow.appendChild(card);
    cardX += CARD_W + COL_GAP;
  }

  cardsRow.resize(cardX - COL_GAP, CARD_H);
  y += CARD_H + 32;

  // ── Labels below cards ─────────────────────────────────────────────────────
  const labelsRow = figma.createFrame();
  labelsRow.name = "Labels/Row";
  labelsRow.fills = [];
  labelsRow.resize(FRAME_W - PADDING * 2, 200);
  labelsRow.x = PADDING; labelsRow.y = y;
  root.appendChild(labelsRow);

  let labelX = 0;
  let maxLabelH = 0;

  for (const effectStyle of elevationStyles) {
    const meta = ELEVATION_META[effectStyle.name] || {};

    const col = figma.createFrame();
    col.name = "Label-Col/" + effectStyle.name.replace("Elevation/", "");
    col.fills = [];
    col.resize(CARD_W, 200);
    col.x = labelX; col.y = 0;
    col.clipsContent = false;
    labelsRow.appendChild(col);

    let colY = 0;

    // Level label
    const levelLabel = txt(meta.label || effectStyle.name, 13, "Bold", C.ink, CARD_W);
    levelLabel.name = "Label/Level";
    levelLabel.x = 0; levelLabel.y = colY;
    col.appendChild(levelLabel);
    colY += levelLabel.height + 8;

    // Style name chip
    const styleNameLabel = txt(effectStyle.name, 10, "Regular", C.stone, CARD_W);
    styleNameLabel.name = "Label/Style-Name";
    styleNameLabel.x = 0; styleNameLabel.y = colY;
    col.appendChild(styleNameLabel);
    colY += styleNameLabel.height + 12;

    // CSS value
    const cssLabel = txt(meta.css || "—", 10, "Regular", C.shadow, CARD_W);
    cssLabel.name = "Label/CSS";
    cssLabel.x = 0; cssLabel.y = colY;
    col.appendChild(cssLabel);
    colY += cssLabel.height + 12;

    // Usage description
    const usageLabel = txt(meta.usage || "", 11, "Regular", C.shadow, CARD_W);
    usageLabel.name = "Label/Usage";
    usageLabel.x = 0; usageLabel.y = colY;
    col.appendChild(usageLabel);
    colY += usageLabel.height;

    col.resize(CARD_W, colY);
    if (colY > maxLabelH) maxLabelH = colY;

    labelX += CARD_W + COL_GAP;
  }

  labelsRow.resize(labelX - COL_GAP, maxLabelH);
  y += maxLabelH + PADDING;

  // ── Usage rules ────────────────────────────────────────────────────────────
  y += 8;

  const rulesHeading = txt("Rules", 11, "Medium", C.shadow, 300);
  rulesHeading.name = "Rules/Heading";
  rulesHeading.x = PADDING; rulesHeading.y = y;
  root.appendChild(rulesHeading);
  y += rulesHeading.height + 16;

  const rules = [
    "Use the lowest elevation level that creates clear visual hierarchy.",
    "Never stack multiple shadows on the same element.",
    "All interactive elements (buttons, links) use Elevation/0-Flat — elevation is reserved for containers.",
    "Floating UI (tooltips, dropdowns) always use Elevation/2-Floating or higher.",
    "Modal overlays always use Elevation/3-Modal.",
  ];

  const rulesFrame = figma.createFrame();
  rulesFrame.name = "Rules/List";
  rulesFrame.x = PADDING; rulesFrame.y = y;
  rulesFrame.fills = [{ type: "SOLID", color: C.bone }];
  rulesFrame.cornerRadius = 8;
  rulesFrame.resize(FRAME_W - PADDING * 2, 20);
  rulesFrame.clipsContent = false;
  root.appendChild(rulesFrame);

  let ruleY = 20;
  for (let i = 0; i < rules.length; i++) {
    const bullet = txt("" + (i + 1) + ".", 11, "Medium", C.orange, 20);
    bullet.name = "Rule/Bullet-" + (i + 1);
    bullet.x = 20; bullet.y = ruleY;
    rulesFrame.appendChild(bullet);

    const ruleText = txt(rules[i], 11, "Regular", C.ink, FRAME_W - PADDING * 2 - 56);
    ruleText.name = "Rule/Text-" + (i + 1);
    ruleText.x = 44; ruleText.y = ruleY;
    rulesFrame.appendChild(ruleText);

    ruleY += Math.max(bullet.height, ruleText.height) + 10;
  }
  rulesFrame.resize(FRAME_W - PADDING * 2, ruleY + 20);
  y += rulesFrame.height + PADDING;

  // ── Resize and finish ──────────────────────────────────────────────────────
  root.resize(FRAME_W, y);
  figma.viewport.scrollAndZoomIntoView([root]);
  figma.notify(
    "Elevation specimen generated - " + elevationStyles.length + " levels",
    { timeout: 3000 }
  );
  figma.closePlugin();
}

main();
