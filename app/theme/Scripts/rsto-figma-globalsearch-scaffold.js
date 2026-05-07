// ===========================================================================
// RSTO GLOBAL SEARCH SCAFFOLD - Figma
// ===========================================================================
//
// HOW TO USE:
//   1. Navigate to the Molecules page in RSTO Design System 3.0
//   2. Open Scripter, paste and click Run
//   3. Adds a single "GlobalSearch" scaffold section to the current page
//
// This adds GlobalSearch which is missing from the main molecules scaffold
// because it has no Storybook stories yet.
// ===========================================================================

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

const COMPONENT = {
  name:         "GlobalSearch",
  variants:     ["Default", "With results — \"qual\"", "No results", "Wide (400px) — top nav context"],
  props:        [
    "State=Default/WithResults/NoResults",
    "Width=280px (default) / 400px (top nav)",
    "Placeholder=Search (default) or custom",
  ],
  atoms:        ["TextField/InputBase", "Icon (search)", "Typography/body2", "Typography/caption", "Card (results dropdown)"],
  note:         "RSTO/Molecules/GlobalSearch  |  Storybook",
  placeholderH: 280,
};

const FRAME_W    = 1200;
const PADDING    = 64;
const HEADER_H   = 150;

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

  // Remove existing if re-running
  const existing = figma.currentPage.children.find(n => n.name === "GlobalSearch — Scaffold");
  if (existing) existing.remove();

  const sectionH = HEADER_H + 16 + COMPONENT.placeholderH + 32;
  const section = figma.createFrame();
  section.name = "GlobalSearch";
  section.resize(FRAME_W - PADDING * 2, sectionH);
  section.fills = [{ type: "SOLID", color: C.white }];
  section.cornerRadius = 8;
  section.effects = [{
    type: "DROP_SHADOW",
    color: { r: 0, g: 0, b: 0, a: 0.06 },
    offset: { x: 0, y: 2 }, radius: 8, spread: 0,
    visible: true, blendMode: "NORMAL",
  }];
  figma.currentPage.appendChild(section);

  // Header
  const header = figma.createFrame();
  header.name = "Header";
  header.resize(FRAME_W - PADDING * 2, HEADER_H);
  header.x = 0; header.y = 0;
  header.fills = [{ type: "SOLID", color: C.bone }];
  header.topLeftRadius = 8; header.topRightRadius = 8;
  section.appendChild(header);

  // Accent bar
  const accent = figma.createRectangle();
  accent.name = "Accent-Bar";
  accent.resize(4, HEADER_H);
  accent.fills = [{ type: "SOLID", color: C.orange }];
  accent.topLeftRadius = 8; accent.bottomLeftRadius = 8;
  header.appendChild(accent);

  // Name
  const nameLabel = txt("GlobalSearch", 20, "Bold", C.ink, 500);
  nameLabel.name = "Label/Name";
  nameLabel.x = 24; nameLabel.y = 16;
  header.appendChild(nameLabel);

  // Storybook note
  const sbLabel = txt("RSTO/Molecules/GlobalSearch  |  Storybook", 10, "Regular", C.stone, 500);
  sbLabel.name = "Label/Storybook";
  sbLabel.x = 24; sbLabel.y = 42;
  header.appendChild(sbLabel);

  // Atoms
  const atomsLabel = txt("Composed of:  " + COMPONENT.atoms.join("  ·  "), 10, "Regular", C.shadow, FRAME_W - PADDING * 2 - 360);
  atomsLabel.name = "Label/Atoms";
  atomsLabel.x = 24; atomsLabel.y = 58;
  header.appendChild(atomsLabel);

  // Variant pills
  let pillX = 24;
  const pillY = 80;
  for (const variant of COMPONENT.variants) {
    const pillBg = figma.createFrame();
    pillBg.name = "Variant-Pill/" + variant;
    pillBg.fills = [{ type: "SOLID", color: C.sand }];
    pillBg.cornerRadius = 100;
    pillBg.clipsContent = false;

    const pillText = txt(variant, 10, "Medium", C.shadow, null);
    pillText.name = "Label";
    pillText.x = 8; pillText.y = 3;

    const pillW = pillText.width + 16;
    const pillH = pillText.height + 6;
    pillBg.resize(pillW, pillH);
    pillBg.x = pillX; pillBg.y = pillY;
    pillBg.appendChild(pillText);
    header.appendChild(pillBg);

    pillX += pillW + 6;
  }

  // Props (right column)
  const propsX = FRAME_W - PADDING * 2 - 340;
  const propsHeading = txt("Component properties", 10, "Bold", C.stone, 310);
  propsHeading.name = "Props/Heading";
  propsHeading.x = propsX; propsHeading.y = 16;
  header.appendChild(propsHeading);

  let propY = 32;
  for (const prop of COMPONENT.props) {
    const propText = txt(prop, 10, "Regular", C.stone, 310);
    propText.name = "Props/Item";
    propText.x = propsX; propText.y = propY;
    header.appendChild(propText);
    propY += propText.height + 4;
  }

  // Status badge
  const statusBg = figma.createFrame();
  statusBg.name = "Status/Badge";
  statusBg.fills = [{ type: "SOLID", color: C.sand }];
  statusBg.cornerRadius = 100;
  statusBg.resize(80, 24);
  const statusText = txt("To do", 10, "Medium", C.stone, null);
  statusText.name = "Status/Label";
  statusText.x = 10; statusText.y = 5;
  statusBg.appendChild(statusText);
  statusBg.x = FRAME_W - PADDING * 2 - 96; statusBg.y = 16;
  header.appendChild(statusBg);

  // Placeholder
  const placeholder = figma.createFrame();
  placeholder.name = "Component-Placeholder";
  placeholder.resize(FRAME_W - PADDING * 2, COMPONENT.placeholderH);
  placeholder.x = 0; placeholder.y = HEADER_H + 16;
  placeholder.fills = [{ type: "SOLID", color: C.paper }];
  placeholder.strokes = [{ type: "SOLID", color: C.sand }];
  placeholder.strokeWeight = 1;
  placeholder.dashPattern = [6, 4];
  section.appendChild(placeholder);

  const hintText = txt(
    "Build GlobalSearch here\n\nPill-shaped input — 280px default, 400px wide (top nav context)\nDropdown: code chip + label (body2) + category path (caption)\nStates: Default / With results / No results",
    11, "Regular", C.stone, 500
  );
  hintText.name = "Placeholder/Hint";
  hintText.x = (FRAME_W - PADDING * 2 - 500) / 2;
  hintText.y = (COMPONENT.placeholderH - hintText.height) / 2;
  placeholder.appendChild(hintText);

  figma.viewport.scrollAndZoomIntoView([section]);
  figma.notify("GlobalSearch scaffold added to Molecules page", { timeout: 3000 });
  figma.closePlugin();
}

main();
