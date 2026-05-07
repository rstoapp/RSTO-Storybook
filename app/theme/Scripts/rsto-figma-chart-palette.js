// ===========================================================================
// RSTO CHART PALETTE SPECIMEN GENERATOR - Figma
// ===========================================================================
//
// HOW TO USE:
//   1. Run rsto-figma-chart-tokens.js FIRST
//   2. Navigate to your Foundations - Chart Palette page in Figma
//   3. Open Scripter, paste and click Run
//   4. Re-run whenever chart-theme.ts changes
//
// Safe to re-run: deletes and recreates "Chart Palette" frame each time
// ===========================================================================

const FRAME_NAME = "Chart Palette";

const C = {
  paper:  { r: 0.984, g: 0.965, b: 0.933 },
  bone:   { r: 0.957, g: 0.925, b: 0.878 },
  sand:   { r: 0.910, g: 0.863, b: 0.776 },
  ink:    { r: 0.122, g: 0.102, b: 0.078 },
  shadow: { r: 0.420, g: 0.369, b: 0.290 },
  stone:  { r: 0.749, g: 0.694, b: 0.592 },
  orange: { r: 0.949, g: 0.545, b: 0.176 },
  white:  { r: 1.000, g: 1.000, b: 1.000 },
};

// Palette definitions — matches chart-theme.ts exactly
const PALETTES = [
  {
    id:    "semantic",
    label: "Semantic RAG",
    desc:  "Use when colour carries meaning — performance status, fidelity indicators. Apply consistently across all chart types. Never use for decoration.",
    swatches: [
      { name: "positive",  hex: "#3A5E52", label: "On track",       note: "Above threshold" },
      { name: "neutral",   hex: "#4A8EA8", label: "Neutral",         note: "Right direction" },
      { name: "caution",   hex: "#C07840", label: "Caution",         note: "Below threshold" },
      { name: "attention", hex: "#8C3A18", label: "Needs attention", note: "Critical" },
      { name: "reference", hex: "#A0A49C", label: "Reference",       note: "Total lines" },
    ],
  },
  {
    id:    "stack",
    label: "Stack colours",
    desc:  "For BarChart and WeeklyAttendanceChart stacked series. stack/1 = bottom/dominant, stack/5 = top/smallest. Cool (positive) to warm (concern) direction.",
    swatches: [
      { name: "stack/1", hex: "#3A5E52", label: "Stack 1", note: "Bottom — dominant" },
      { name: "stack/2", hex: "#567A6E", label: "Stack 2", note: "" },
      { name: "stack/3", hex: "#4A8EA8", label: "Stack 3", note: "" },
      { name: "stack/4", hex: "#C07840", label: "Stack 4", note: "" },
      { name: "stack/5", hex: "#8C3A18", label: "Stack 5", note: "Top — smallest" },
    ],
  },
  {
    id:    "series",
    label: "Series colours",
    desc:  "For LineChart and MultiLineChart. Assign by performance rank — series/1 to the highest performer. series/3 and series/6 are decorative only (low contrast).",
    swatches: [
      { name: "series/1", hex: "#2E6878", label: "Series 1", note: "5.8:1 AAA" },
      { name: "series/2", hex: "#5A9EAF", label: "Series 2", note: "" },
      { name: "series/3", hex: "#8BBFCC", label: "Series 3", note: "Decorative only" },
      { name: "series/4", hex: "#8F4E2A", label: "Series 4", note: "" },
      { name: "series/5", hex: "#D4844A", label: "Series 5", note: "" },
      { name: "series/6", hex: "#E8B48A", label: "Series 6", note: "Decorative only" },
    ],
  },
  {
    id:    "heatmap",
    label: "Heatmap scale",
    desc:  "For WeeklyAttendanceChart attendance. 10 steps ordered by hours. Sage (high attendance) fades to amber (low), then stone (did not attend). heatmap/10 always renders at 55% opacity.",
    swatches: [
      { name: "heatmap/01", hex: "#284E44", label: "30+ hrs",      note: "On track" },
      { name: "heatmap/02", hex: "#3D6860", label: "25-<30 hrs",   note: "" },
      { name: "heatmap/03", hex: "#567A6E", label: "15-<25 hrs",   note: "" },
      { name: "heatmap/04", hex: "#80A89C", label: "13-<15 hrs",   note: "" },
      { name: "heatmap/05", hex: "#A0C4BA", label: "10-<13 hrs",   note: "" },
      { name: "heatmap/06", hex: "#CAD8D0", label: "8-<10 hrs",    note: "" },
      { name: "heatmap/07", hex: "#E8B48A", label: "6-<8 hrs",     note: "" },
      { name: "heatmap/08", hex: "#C07840", label: "4-<6 hrs",     note: "" },
      { name: "heatmap/09", hex: "#8C3A18", label: "<4 hrs",       note: "Critical" },
      { name: "heatmap/10", hex: "#A0A49C", label: "Did not attend", note: "55% opacity" },
    ],
  },
  {
    id:    "surface",
    label: "Neutral surfaces",
    desc:  "Chart-specific surface tokens for backgrounds, gridlines, borders, labels and tooltips. Not used for data. Referenced as the P object in chart-theme.ts.",
    swatches: [
      { name: "paper",   hex: "#FFFFFF", label: "paper",   note: "Card background" },
      { name: "frost",   hex: "#FAF8F4", label: "frost",   note: "Loading skeleton" },
      { name: "linen",   hex: "#F7F3ED", label: "linen",   note: "Empty state bg" },
      { name: "bone",    hex: "#EEE8DF", label: "bone",    note: "Gridlines, tooltip bg" },
      { name: "sand",    hex: "#E0D8CC", label: "sand",    note: "Card border" },
      { name: "stone",   hex: "#A0A49C", label: "stone",   note: "Reference lines" },
      { name: "shadow",  hex: "#8A7B6A", label: "shadow",  note: "Axis ticks, legend" },
      { name: "earth",   hex: "#5C4F3A", label: "earth",   note: "Tooltip body" },
      { name: "bark",    hex: "#3D3028", label: "bark",    note: "Card title" },
      { name: "ink",     hex: "#2C2416", label: "ink",     note: "Tooltip title" },
      { name: "orange",  hex: "#C06010", label: "orange",  note: "Decorative elements" },
      { name: "eyebrow", hex: "#9A4D0A", label: "eyebrow", note: "Eyebrow label 4.5:1" },
    ],
  },
];

const FRAME_W   = 1080;
const PADDING   = 64;
const SWATCH_W  = 72;
const SWATCH_H  = 56;
const SWATCH_GAP = 10;
const LABEL_H   = 36;

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

function luminance(r, g, b) {
  const lin = c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function textOnBg(hex) {
  const { r, g, b } = hexToRgb(hex);
  return luminance(r, g, b) > 0.3
    ? { r: 0.18, g: 0.15, b: 0.09 }
    : { r: 1, g: 1, b: 1 };
}

async function loadFonts() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium"  });
  await figma.loadFontAsync({ family: "Inter", style: "Bold"    });
}

function txt(content, size, style, colour, w) {
  const t = figma.createText();
  t.fontName   = { family: "Inter", style };
  t.fontSize   = size;
  t.fills      = [{ type: "SOLID", color: colour }];
  t.characters = content;
  if (w) { t.resize(w, t.height); t.textAutoResize = "HEIGHT"; }
  return t;
}

async function main() {
  await loadFonts();

  const existing = figma.currentPage.children.find(n => n.name === FRAME_NAME);
  if (existing) existing.remove();

  const root = figma.createFrame();
  root.name = FRAME_NAME;
  root.fills = [{ type: "SOLID", color: C.paper }];
  root.resize(FRAME_W, 2000);
  root.clipsContent = false;
  figma.currentPage.appendChild(root);

  let y = PADDING;

  // Page heading
  const heading = txt("Chart Palette", 11, "Medium", C.shadow, 300);
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

  const pageDesc = txt(
    "Five distinct palettes for data visualisation. Never mix palettes within a single chart — choose one and apply it consistently.",
    12, "Regular", C.shadow, FRAME_W - PADDING * 2
  );
  pageDesc.name = "Section/Description";
  pageDesc.x = PADDING; pageDesc.y = y;
  root.appendChild(pageDesc);
  y += pageDesc.height + 48;

  // Palettes
  for (const palette of PALETTES) {
    console.log("Building palette: " + palette.label);

    // Palette card
    const card = figma.createFrame();
    card.name = "Palette/" + palette.id;
    card.x = PADDING; card.y = y;
    card.fills = [{ type: "SOLID", color: C.white }];
    card.cornerRadius = 8;
    card.effects = [{
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: 0.06 },
      offset: { x: 0, y: 2 }, radius: 8, spread: 0,
      visible: true, blendMode: "NORMAL",
    }];
    card.clipsContent = false;
    root.appendChild(card);

    let cardY = 28;

    // Palette label
    const palLabel = txt(palette.label, 14, "Bold", C.ink, FRAME_W - PADDING * 2 - 48);
    palLabel.name = "Palette/Label";
    palLabel.x = 28; palLabel.y = cardY;
    card.appendChild(palLabel);
    cardY += palLabel.height + 6;

    // Description
    const palDesc = txt(palette.desc, 11, "Regular", C.shadow, FRAME_W - PADDING * 2 - 48);
    palDesc.name = "Palette/Description";
    palDesc.x = 28; palDesc.y = cardY;
    card.appendChild(palDesc);
    cardY += palDesc.height + 24;

    // Swatches row
    const swatchRowY = cardY;
    let swatchX = 28;

    for (const swatch of palette.swatches) {
      try {
        const rgb = hexToRgb(swatch.hex);
        const textCol = textOnBg(swatch.hex);

        // Swatch cell
        const cell = figma.createFrame();
        cell.name = "Swatch/" + swatch.name;
        cell.resize(SWATCH_W, SWATCH_H + LABEL_H);
        cell.x = swatchX; cell.y = swatchRowY;
        cell.fills = [];
        cell.clipsContent = false;
        card.appendChild(cell);

        // Colour block
        const block = figma.createRectangle();
        block.name = "Fill";
        block.resize(SWATCH_W, SWATCH_H);
        block.x = 0; block.y = 0;
        block.fills = [{ type: "SOLID", color: rgb }];
        block.cornerRadius = 6;

        // Heatmap/10 gets opacity
        if (swatch.name === "heatmap/10") block.opacity = 0.55;
        cell.appendChild(block);

        // Hex on swatch (light text for dark swatches, dark text for light)
        const hexOnSwatch = txt(swatch.hex, 9, "Medium", textCol, SWATCH_W - 8);
        hexOnSwatch.name = "Label/Hex-On-Swatch";
        hexOnSwatch.x = 4; hexOnSwatch.y = SWATCH_H - 18;
        cell.appendChild(hexOnSwatch);

        // Label below
        const nameLabel = txt(swatch.label, 10, "Medium", C.ink, SWATCH_W);
        nameLabel.name = "Label/Name";
        nameLabel.x = 0; nameLabel.y = SWATCH_H + 6;
        cell.appendChild(nameLabel);

        // Usage note (if any)
        if (swatch.note) {
          const noteLabel = txt(swatch.note, 9, "Regular", C.stone, SWATCH_W);
          noteLabel.name = "Label/Note";
          noteLabel.x = 0; noteLabel.y = SWATCH_H + 19;
          cell.appendChild(noteLabel);
        }

        swatchX += SWATCH_W + SWATCH_GAP;

      } catch (e) {
        console.error("Error on swatch " + swatch.name + ": " + e.message);
      }
    }

    cardY = swatchRowY + SWATCH_H + LABEL_H + 28;
    card.resize(FRAME_W - PADDING * 2, cardY);
    y += card.height + 24;
  }

  y += PADDING;
  root.resize(FRAME_W, y);

  figma.viewport.scrollAndZoomIntoView([root]);
  figma.notify(
    "Chart Palette generated — " + PALETTES.length + " palettes, "
    + PALETTES.reduce((n, p) => n + p.swatches.length, 0) + " swatches",
    { timeout: 4000 }
  );
  figma.closePlugin();
}

main();
