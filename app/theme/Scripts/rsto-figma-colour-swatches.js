// ===========================================================================
// RSTO COLOUR SWATCH GENERATOR - Figma
// ===========================================================================
//
// HOW TO USE:
//   1. Navigate to your Foundations - Colour page in Figma
//   2. Open Scripter (Plugins > Scripter)
//   3. Paste this script and click Run
//
// WHAT IT DOES:
//   - Reads all variables from the "RSTO Design Tokens" collection
//   - Generates a labelled colour swatch for every token
//   - Groups swatches by scale/palette section with headings
//   - Places everything in a frame called "Colour Tokens" on the current page
//   - Safe to re-run: deletes and recreates "Colour Tokens" each time
//
// CUSTOMISE:
//   - SWATCH_W / SWATCH_H: swatch rectangle size
//   - SWATCH_GAP: gap between swatches in a row
//   - ROW_GAP: gap between rows/groups
// ===========================================================================

const COLLECTION_NAME = "RSTO Design Tokens";
const FRAME_NAME      = "Colour Tokens";

const SWATCH_W   = 96;
const SWATCH_H   = 64;
const SWATCH_GAP = 12;
const ROW_GAP    = 48;
const GROUP_GAP  = 72;
const LABEL_H    = 40;
const COLS       = 10;   // max swatches per row before wrapping
const PADDING    = 48;

// Group display names
const GROUP_LABELS = {
  "scale/neutral":          "Neutral",
  "scale/orange":           "Orange / Ochre",
  "scale/blue":             "Blue / Sky",
  "scale/green":            "Green / Saltbush",
  "scale/brown":            "Brown / Bark",
  "scale/gray":             "Gray",
  "scale/red":              "Red",
  "scale/functional":       "Functional / Status",
  "palette/background":     "Background",
  "palette/primary":        "Primary",
  "palette/secondary":      "Secondary",
  "palette/error":          "Error",
  "palette/warning":        "Warning",
  "palette/info":           "Info",
  "palette/success":        "Success",
  "palette/text":           "Text",
};

// Section headings
const SECTION_LABELS = {
  "scale":   "Raw Scales",
  "palette": "Semantic Palette",
};

// ---- helpers ----------------------------------------------------------------

function rgbToHex(r, g, b) {
  const toHex = n => Math.round(n * 255).toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function luminance(r, g, b) {
  // Relative luminance for text contrast decision
  const toLinear = c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function textColourForBg(r, g, b) {
  return luminance(r, g, b) > 0.35 ? { r: 0.12, g: 0.10, b: 0.08 } : { r: 1, g: 1, b: 1 };
}

function makeText(content, fontSize, fontWeight, colour) {
  const t = figma.createText();
  t.characters = content;
  t.fontSize = fontSize;
  t.fontName = { family: "Inter", style: fontWeight };
  t.fills = [{ type: "SOLID", color: colour }];
  return t;
}

async function loadFonts() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
}

// ---- main -------------------------------------------------------------------

async function main() {
  await loadFonts();

  // Find the variable collection
  const collection = figma.variables.getLocalVariableCollections()
    .find(c => c.name === COLLECTION_NAME);

  if (!collection) {
    figma.notify(`Collection "${COLLECTION_NAME}" not found. Run the token sync script first.`);
    figma.closePlugin();
    return;
  }

  const modeId = collection.modes[0].modeId;

  // Gather all colour variables and group them
  const allVars = figma.variables.getLocalVariables("COLOR")
    .filter(v => v.variableCollectionId === collection.id);

  // Build group map: "scale/orange" -> [{ name, shortName, r, g, b, a, hex }]
  const groups = {};
  for (const v of allVars) {
    const parts = v.name.split("/");
    const groupKey = parts.slice(0, 2).join("/");
    const shortName = parts.slice(2).join("/") || parts[parts.length - 1];
    const value = v.valuesByMode[modeId];
    if (!value || typeof value.r === "undefined") continue;
    const { r, g, b, a } = value;
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push({ name: v.name, shortName, r, g, b, a, hex: rgbToHex(r, g, b) });
  }

  // Delete existing frame if re-running
  const existing = figma.currentPage.children.find(n => n.name === FRAME_NAME);
  if (existing) existing.remove();

  // Outer container frame
  const container = figma.createFrame();
  container.name = FRAME_NAME;
  container.fills = [{ type: "SOLID", color: { r: 0.976, g: 0.965, b: 0.949 } }]; // neutral.paper
  container.clipsContent = false;
  figma.currentPage.appendChild(container);

  let cursorY = PADDING;
  let maxWidth = 0;

  // Ordered group keys
  const orderedKeys = Object.keys(GROUP_LABELS).filter(k => groups[k]);

  let lastSection = null;

  for (const groupKey of orderedKeys) {
    const swatches = groups[groupKey];
    const section = groupKey.split("/")[0]; // "scale" or "palette"

    // Section divider
    if (section !== lastSection) {
      if (lastSection !== null) cursorY += GROUP_GAP / 2;

      const sectionLabel = makeText(
        SECTION_LABELS[section] || section,
        22,
        "Bold",
        { r: 0.12, g: 0.10, b: 0.08 }
      );
      sectionLabel.name = "heading/" + section;
      sectionLabel.x = PADDING;
      sectionLabel.y = cursorY;
      container.appendChild(sectionLabel);
      cursorY += sectionLabel.height + 8;

      // Divider line
      const line = figma.createRectangle();
      line.name = "divider/" + section;
      line.resize(800, 1);
      line.x = PADDING;
      line.y = cursorY;
      line.fills = [{ type: "SOLID", color: { r: 0.75, g: 0.69, b: 0.59 }, opacity: 0.4 }];
      container.appendChild(line);
      cursorY += 20;

      lastSection = section;
    }

    // Group heading
    const heading = makeText(
      GROUP_LABELS[groupKey] || groupKey,
      13,
      "Semi Bold",
      { r: 0.42, g: 0.37, b: 0.29 }
    );
    heading.name = "heading/" + groupKey;
    heading.x = PADDING;
    heading.y = cursorY;
    container.appendChild(heading);
    cursorY += heading.height + 12;

    // Swatch row(s)
    let col = 0;
    let rowStartY = cursorY;

    for (const token of swatches) {
      const x = PADDING + col * (SWATCH_W + SWATCH_GAP);
      const y = rowStartY;

      // Swatch card — named after the full token path
      const card = figma.createFrame();
      card.name = token.name;
      card.resize(SWATCH_W, SWATCH_H + LABEL_H);
      card.x = x;
      card.y = y;
      card.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      card.cornerRadius = 6;
      card.effects = [{
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.08 },
        offset: { x: 0, y: 1 },
        radius: 4,
        spread: 0,
        visible: true,
        blendMode: "NORMAL",
      }];
      container.appendChild(card);

      // Colour fill block
      const fill = figma.createRectangle();
      fill.name = "fill";
      fill.resize(SWATCH_W, SWATCH_H);
      fill.x = 0;
      fill.y = 0;
      fill.fills = [{ type: "SOLID", color: { r: token.r, g: token.g, b: token.b }, opacity: token.a }];
      fill.topLeftRadius = 6;
      fill.topRightRadius = 6;
      card.appendChild(fill);

      // Short name label
      const nameText = makeText(
        token.shortName,
        10,
        "Semi Bold",
        { r: 0.12, g: 0.10, b: 0.08 }
      );
      nameText.name = "label/name";
      nameText.x = 6;
      nameText.y = SWATCH_H + 5;
      nameText.resize(SWATCH_W - 12, nameText.height);
      nameText.textAutoResize = "HEIGHT";
      card.appendChild(nameText);

      // Hex label
      const hexText = makeText(
        token.hex,
        9,
        "Regular",
        { r: 0.42, g: 0.37, b: 0.29 }
      );
      hexText.name = "label/hex";
      hexText.x = 6;
      hexText.y = SWATCH_H + 18;
      hexText.resize(SWATCH_W - 12, hexText.height);
      card.appendChild(hexText);

      const cardRight = x + SWATCH_W;
      if (cardRight + PADDING > maxWidth) maxWidth = cardRight + PADDING;

      col++;
      if (col >= COLS) {
        col = 0;
        rowStartY += SWATCH_H + LABEL_H + ROW_GAP;
      }
    }

    cursorY = rowStartY + SWATCH_H + LABEL_H + GROUP_GAP;
  }

  // Resize container to fit content
  const finalWidth = Math.max(maxWidth, 900);
  container.resize(finalWidth, cursorY);
  container.x = 0;
  container.y = 0;

  figma.viewport.scrollAndZoomIntoView([container]);
  figma.notify("Colour swatches generated (" + allVars.length + " tokens)", { timeout: 3000 });
  figma.closePlugin();
}

main();
