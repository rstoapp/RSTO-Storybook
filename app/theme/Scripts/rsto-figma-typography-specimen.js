// ===========================================================================
// RSTO TYPOGRAPHY SPECIMEN GENERATOR - Figma
// ===========================================================================
//
// HOW TO USE:
//   1. Run rsto-figma-text-styles.js FIRST to create the text styles
//   2. Navigate to your Foundations - Typography page in Figma
//   3. Open Scripter (Plugins > Scripter), paste and click Run
//   4. Re-run any time text styles change
//
// WHAT IT DOES:
//   - Builds a visual type scale specimen on the current page
//   - Each row shows the style live at size, with its name and specs
//   - Safe to re-run: deletes and recreates "Typography Specimen"
// ===========================================================================

const FRAME_NAME = "Typography Specimen";

// Colours (from tokens.ts)
const C = {
  paper:    { r: 0.984, g: 0.965, b: 0.933 },  // #FBF6EE
  ink:      { r: 0.122, g: 0.102, b: 0.078 },  // #1F1A14
  shadow:   { r: 0.420, g: 0.369, b: 0.290 },  // #6B5E4A
  stone:    { r: 0.749, g: 0.694, b: 0.592 },  // #BFB197
  orange:   { r: 0.949, g: 0.545, b: 0.176 },  // #F28B2D
  white:    { r: 1.000, g: 1.000, b: 1.000 },
};

const FRAME_W    = 1080;
const PADDING    = 64;
const TEXT_COL_X = PADDING + 140;
const TEXT_COL_W = 580;
const SPEC_COL_X = TEXT_COL_X + TEXT_COL_W + 32;
const SPEC_COL_W = FRAME_W - SPEC_COL_X - PADDING;
const ROW_PAD_V  = 24;

// Sample text per style
const SAMPLES = {
  "Typography/h1":       "The quick brown fox",
  "Typography/h2":       "Section Heading",
  "Typography/h3":       "Subsection Heading",
  "Typography/h4":       "Card Heading",
  "Typography/h5":       "Small Heading",
  "Typography/h6":       "Label Heading",
  "Typography/body1":    "Body text — the primary reading style for all content areas. Comfortable at paragraph length.",
  "Typography/body2":    "Secondary body — used for supporting text, descriptions, and helper copy.",
  "Typography/button":   "Button Label",
  "Typography/caption":  "Caption or helper text — 12px",
  "Typography/overline":    "Overline Label",
  "Typography/chart-title":  "Routine test completeness by care item",
  "Typography/filter-label": "Site: All sites",
  "Typography/chart-body":   "This centre has no recorded results for the selected period. Try a different site or date range.",
  "Typography/eyebrow": "ANC - Routine Care",
};

// Style display order
const STYLE_ORDER = [
  "Typography/h1",
  "Typography/h2",
  "Typography/h3",
  "Typography/h4",
  "Typography/h5",
  "Typography/h6",
  "Typography/body1",
  "Typography/body2",
  "Typography/button",
  "Typography/caption",
  "Typography/overline",
  "Typography/eyebrow",
  "Typography/chart-title",
  "Typography/filter-label",
  "Typography/chart-body",
];

function weightLabel(fontStyle) {
  const map = { "Bold": "700", "SemiBold": "600", "Regular": "400", "Light": "300" };
  return (map[fontStyle] || "400") + " " + fontStyle;
}

function fmtLineHeight(lh) {
  if (!lh || lh.unit === "AUTO") return "auto";
  return lh.value + (lh.unit === "PIXELS" ? "px" : "%");
}

function fmtLetterSpacing(ls) {
  if (!ls || ls.value === 0) return "0";
  return (ls.value > 0 ? "+" : "") + ls.value + (ls.unit === "PIXELS" ? "px" : "%");
}

async function loadFonts() {
  const fontsToLoad = [
    { family: "Fraunces",  style: "Regular"  },
    { family: "Open Sans", style: "Regular"  },
    { family: "Open Sans", style: "SemiBold" },
    { family: "Open Sans", style: "Bold"     },
    { family: "Inter",     style: "Regular"  },
    { family: "Inter",     style: "Medium"   },
  ];
  for (const f of fontsToLoad) {
    try { await figma.loadFontAsync(f); } catch (e) { console.warn("Could not load font: " + f.family + " " + f.style); }
  }
}

function createLabel(text, size, style, colour, w) {
  const t = figma.createText();
  t.fontName    = { family: "Inter", style: style };
  t.fontSize    = size;
  t.fills       = [{ type: "SOLID", color: colour }];
  t.characters  = text;
  if (w) { t.resize(w, t.height); t.textAutoResize = "HEIGHT"; }
  return t;
}

function createDivider(x, y, w) {
  const r = figma.createRectangle();
  r.name   = "Divider";
  r.resize(w, 1);
  r.x = x; r.y = y;
  r.fills  = [{ type: "SOLID", color: C.stone, opacity: 0.35 }];
  return r;
}

async function main() {
  await loadFonts();

  // Find all local text styles
  const allStyles   = figma.getLocalTextStyles();
  const styleByName = {};
  for (const s of allStyles) styleByName[s.name] = s;

  console.log("Found " + allStyles.length + " total text styles in this file:");
  for (const s of allStyles) console.log("  - " + s.name);

  const orderedStyles = STYLE_ORDER.map(n => styleByName[n]).filter(Boolean);

  if (orderedStyles.length === 0) {
    figma.notify(
      "No Typography/* styles found in this file. Make sure you ran rsto-figma-text-styles.js in THIS file first.",
      { timeout: 6000 }
    );
    figma.closePlugin();
    return;
  }

  console.log("Rendering " + orderedStyles.length + " typography styles...");

  // Remove old frame
  const existing = figma.currentPage.children.find(n => n.name === FRAME_NAME);
  if (existing) existing.remove();

  // Root frame
  const root = figma.createFrame();
  root.name        = FRAME_NAME;
  root.fills       = [{ type: "SOLID", color: C.paper }];
  root.resize(FRAME_W, 200);
  root.clipsContent = false;
  figma.currentPage.appendChild(root);

  let y = PADDING;

  // ── Section heading ────────────────────────────────────────────────────────
  const sectionHeading = createLabel("Type Scale", 11, "Medium", C.shadow, 200);
  sectionHeading.name  = "Section/Heading";
  sectionHeading.x = PADDING;
  sectionHeading.y = y;
  root.appendChild(sectionHeading);
  y += sectionHeading.height + 8;

  const accent = figma.createRectangle();
  accent.name   = "Section/Accent-Bar";
  accent.resize(32, 3);
  accent.x = PADDING; accent.y = y;
  accent.fills = [{ type: "SOLID", color: C.orange }];
  accent.cornerRadius = 2;
  root.appendChild(accent);
  y += 20;

  // ── Column headers ─────────────────────────────────────────────────────────
  const colHeaderFrame = figma.createFrame();
  colHeaderFrame.name   = "Table/Column-Headers";
  colHeaderFrame.resize(FRAME_W - PADDING * 2, 20);
  colHeaderFrame.x = PADDING; colHeaderFrame.y = y;
  colHeaderFrame.fills = [];
  root.appendChild(colHeaderFrame);

  const cols = [
    { label: "Style",  x: 0,                      w: 120 },
    { label: "Sample", x: TEXT_COL_X - PADDING,    w: TEXT_COL_W },
    { label: "Specs",  x: SPEC_COL_X - PADDING,    w: SPEC_COL_W },
  ];
  for (const col of cols) {
    const h = createLabel(col.label, 10, "Medium", C.shadow, col.w);
    h.name = "Column-Header/" + col.label;
    h.x = col.x; h.y = 0;
    colHeaderFrame.appendChild(h);
  }
  y += 28;

  // Top divider
  const topDivider = createDivider(PADDING, y, FRAME_W - PADDING * 2);
  root.appendChild(topDivider);
  y += 1;

  // ── Style rows ─────────────────────────────────────────────────────────────
  for (const textStyle of orderedStyles) {
    const shortName = textStyle.name.replace("Typography/", "");

    try {
      y += ROW_PAD_V;
      const rowTop = y;

      // Row container (invisible, for grouping)
      const row = figma.createFrame();
      row.name   = "Row/" + shortName;
      row.resize(FRAME_W - PADDING * 2, 40);
      row.x = PADDING; row.y = y;
      row.fills = [];
      row.clipsContent = false;
      root.appendChild(row);

      // Style name label
      const styleName = createLabel(shortName, 11, "Medium", C.shadow, 120);
      styleName.name = "Style-Name";
      styleName.x = 0; styleName.y = 2;
      row.appendChild(styleName);

      // Sample text — apply style via textStyleId
      const sample = figma.createText();
      sample.name       = "Sample-Text";
      sample.x          = TEXT_COL_X - PADDING;
      sample.y          = 0;
      sample.resize(TEXT_COL_W, 40);
      sample.textAutoResize = "HEIGHT";
      // Apply the full text style first, then set characters
      sample.textStyleId = textStyle.id;
      sample.fills       = [{ type: "SOLID", color: C.ink }];
      if (shortName === "overline") sample.textCase = "UPPER";
      sample.characters  = SAMPLES[textStyle.name] || shortName;
      row.appendChild(sample);

      // Specs block
      const specFrame = figma.createFrame();
      specFrame.name   = "Specs";
      specFrame.x      = SPEC_COL_X - PADDING;
      specFrame.y      = 0;
      specFrame.resize(SPEC_COL_W, 60);
      specFrame.fills  = [];
      specFrame.clipsContent = false;
      row.appendChild(specFrame);

      const specLines = [
        { text: textStyle.fontName.family,       style: "Medium", colour: C.ink    },
        { text: weightLabel(textStyle.fontName.style) + "  |  " + textStyle.fontSize + "px / " + fmtLineHeight(textStyle.lineHeight), style: "Regular", colour: C.shadow },
        { text: "Tracking: " + fmtLetterSpacing(textStyle.letterSpacing), style: "Regular", colour: C.shadow },
      ];
      let specY = 0;
      for (let i = 0; i < specLines.length; i++) {
        const line = createLabel(specLines[i].text, i === 0 ? 11 : 10, specLines[i].style, specLines[i].colour, SPEC_COL_W);
        line.name = ["Spec/Family", "Spec/Size-Weight", "Spec/Tracking"][i];
        line.x = 0; line.y = specY;
        specFrame.appendChild(line);
        specY += line.height + 3;
      }
      specFrame.resize(SPEC_COL_W, specY);

      // Resize row to tallest child
      const rowH = Math.max(sample.height, specFrame.height, styleName.height);
      row.resize(FRAME_W - PADDING * 2, rowH);
      y += rowH + ROW_PAD_V;

      // Divider after row
      const divider = createDivider(PADDING, y, FRAME_W - PADDING * 2);
      divider.name = "Divider/" + shortName;
      root.appendChild(divider);
      y += 1;

      console.log("  + Row added: " + shortName + " (height " + rowH + "px)");

    } catch (e) {
      console.error("  Error on " + shortName + ": " + e.message);
    }
  }

  y += PADDING;
  root.resize(FRAME_W, y);

  figma.viewport.scrollAndZoomIntoView([root]);
  figma.notify(
    "Typography specimen generated - " + orderedStyles.length + " styles",
    { timeout: 3000 }
  );
  figma.closePlugin();
}

main();
