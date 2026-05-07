// ===========================================================================
// RSTO ATOMS PAGE SCAFFOLD - Figma
// ===========================================================================
//
// HOW TO USE:
//   1. Navigate to your Atoms page in the RSTO Design System file
//   2. Open Scripter, paste and click Run
//   3. Each atom gets a labelled section with variant reference and
//      a placeholder frame ready for the component to be pasted into
//
// Safe to re-run: removes existing "Atoms Scaffold" frame first
// ===========================================================================

const FRAME_NAME = "Atoms Scaffold";
const SB_BASE    = "https://main--69b89751612a3d6b93166c09.chromatic.com/?path=/docs/rsto-atoms-";

const C = {
  paper:   { r: 0.984, g: 0.965, b: 0.933 },  // #FBF6EE
  bone:    { r: 0.957, g: 0.925, b: 0.878 },  // #F4ECE0
  sand:    { r: 0.910, g: 0.863, b: 0.776 },  // #E8DCC6
  ink:     { r: 0.122, g: 0.102, b: 0.078 },  // #1F1A14
  shadow:  { r: 0.420, g: 0.369, b: 0.290 },  // #6B5E4A
  stone:   { r: 0.749, g: 0.694, b: 0.592 },  // #BFB197
  orange:  { r: 0.949, g: 0.545, b: 0.176 },  // #F28B2D
  brown:   { r: 0.310, g: 0.227, b: 0.173 },  // #4F3A2C
  white:   { r: 1.000, g: 1.000, b: 1.000 },
  green:   { r: 0.369, g: 0.478, b: 0.271 },  // status-positive
};

// --- ATOM DEFINITIONS -------------------------------------------------------
// name:        display name + layer name
// group:       logical grouping for visual separation
// variants:    Storybook story names (exact)
// props:       key component properties to build in Figma
// sbSlug:      Storybook URL slug
// placeholderH: estimated height for the component placeholder frame

const ATOMS = [
  // ── Inputs ───────────────────────────────────────────────────────────────
  {
    name:         "Button",
    group:        "Inputs",
    variants:     ["Primary", "Secondary", "Disabled", "Destructive"],
    props:        ["Variant=Primary/Secondary/Destructive", "State=Default/Disabled", "Icon=None/Left/Right"],
    sbSlug:       "button",
    placeholderH: 200,
  },
  {
    name:         "TextField",
    group:        "Inputs",
    variants:     ["Outlined", "Filled", "Standard", "With Helper Text", "Error", "Disabled", "Multiline"],
    props:        ["Variant=Outlined/Filled/Standard", "State=Default/Error/Disabled", "Multiline=True/False"],
    sbSlug:       "textfield",
    placeholderH: 280,
  },
  {
    name:         "Checkbox",
    group:        "Inputs",
    variants:     ["Default", "Checked", "Indeterminate", "With Label", "Group", "Disabled"],
    props:        ["State=Default/Checked/Indeterminate/Disabled", "Label=True/False"],
    sbSlug:       "checkbox",
    placeholderH: 240,
  },
  {
    name:         "Radio",
    group:        "Inputs",
    variants:     ["Default", "Row", "With Disabled"],
    props:        ["Direction=Column/Row", "State=Default/Disabled"],
    sbSlug:       "radio",
    placeholderH: 180,
  },
  {
    name:         "Switch",
    group:        "Inputs",
    variants:     ["Default", "Checked", "With Label", "Small", "Disabled"],
    props:        ["State=Default/Checked/Disabled", "Size=Default/Small", "Label=True/False"],
    sbSlug:       "switch",
    placeholderH: 180,
  },
  {
    name:         "Slider",
    group:        "Inputs",
    variants:     ["Default", "With Marks", "Range", "With Value Label", "Disabled"],
    props:        ["Type=Single/Range", "Marks=True/False", "Label=True/False", "State=Default/Disabled"],
    sbSlug:       "slider",
    placeholderH: 200,
  },
  {
    name:         "DatePicker",
    group:        "Inputs",
    variants:     ["Default", "With Min Max", "Disabled"],
    props:        ["State=Default/Disabled", "Constrained=True/False"],
    sbSlug:       "datepicker",
    placeholderH: 200,
  },
  // ── Feedback ─────────────────────────────────────────────────────────────
  {
    name:         "Alert",
    group:        "Feedback",
    variants:     ["Success", "Error", "Warning", "Info"],
    props:        ["Severity=Success/Error/Warning/Info"],
    sbSlug:       "alert",
    placeholderH: 240,
  },
  {
    name:         "LinearProgress",
    group:        "Feedback",
    variants:     ["Indeterminate", "Determinate", "Buffer", "Success", "Warning"],
    props:        ["Variant=Indeterminate/Determinate/Buffer", "Color=Primary/Success/Warning"],
    sbSlug:       "linearprogress",
    placeholderH: 160,
  },
  {
    name:         "CircularProgress",
    group:        "Feedback",
    variants:     ["Indeterminate", "Determinate", "With Label", "Large"],
    props:        ["Variant=Indeterminate/Determinate", "Size=Default/Large", "Label=True/False"],
    sbSlug:       "circularprogress",
    placeholderH: 200,
  },
  // ── Data Display ─────────────────────────────────────────────────────────
  {
    name:         "Badge",
    group:        "Data Display",
    variants:     ["Default", "Dot", "Error Count", "Max Value"],
    props:        ["Variant=Standard/Dot", "Color=Default/Error"],
    sbSlug:       "badge",
    placeholderH: 160,
  },
  {
    name:         "Card",
    group:        "Data Display",
    variants:     ["Default", "Elevated"],
    props:        ["Variant=Default/Elevated"],
    sbSlug:       "card",
    placeholderH: 240,
  },
  {
    name:         "Chip",
    group:        "Data Display",
    variants:     ["Default", "Primary", "Secondary"],
    props:        ["Color=Default/Primary/Secondary"],
    sbSlug:       "chip",
    placeholderH: 120,
  },
  {
    name:         "Table",
    group:        "Data Display",
    variants:     ["Default", "Dense"],
    props:        ["Density=Default/Dense"],
    sbSlug:       "table",
    placeholderH: 320,
  },
  // ── Navigation ───────────────────────────────────────────────────────────
  {
    name:         "Tabs",
    group:        "Navigation",
    variants:     ["Single tab active", "Second tab active", "Many tabs (scrollable)"],
    props:        ["Active=First/Second/etc", "Scrollable=True/False"],
    sbSlug:       "tabs",
    placeholderH: 160,
  },
  {
    name:         "Breadcrumbs",
    group:        "Navigation",
    variants:     ["Default", "Custom Separator", "Collapsed"],
    props:        ["Separator=Default/Custom", "Collapsed=True/False"],
    sbSlug:       "breadcrumbs",
    placeholderH: 120,
  },
  {
    name:         "Stepper",
    group:        "Navigation",
    variants:     ["Horizontal", "Alternative Label", "Vertical"],
    props:        ["Orientation=Horizontal/Vertical", "LabelPosition=Default/Alternative"],
    sbSlug:       "stepper",
    placeholderH: 240,
  },
];
// --- END OF ATOM DEFINITIONS ------------------------------------------------


// Layout
const FRAME_W        = 1200;
const PADDING        = 64;
const SECTION_GAP    = 48;
const GROUP_GAP      = 80;
const HEADER_H       = 120;
const PLACEHOLDER_W  = FRAME_W - PADDING * 2;
const BADGE_PAD_H    = 4;
const BADGE_PAD_V    = 3;

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

function rect(w, h, colour, radius) {
  const r = figma.createRectangle();
  r.resize(w, h);
  r.fills = [{ type: "SOLID", color: colour }];
  if (radius) r.cornerRadius = radius;
  return r;
}

async function main() {
  await loadFonts();

  // Remove existing scaffold
  const existing = figma.currentPage.children.find(n => n.name === FRAME_NAME);
  if (existing) existing.remove();

  // Root frame
  const root = figma.createFrame();
  root.name = FRAME_NAME;
  root.fills = [{ type: "SOLID", color: C.paper }];
  root.resize(FRAME_W, 4000);
  root.clipsContent = false;
  figma.currentPage.appendChild(root);

  let y = PADDING;

  // Page title
  const pageTitle = txt("Atoms", 32, "Bold", C.ink, FRAME_W - PADDING * 2);
  pageTitle.name = "Page/Title";
  pageTitle.x = PADDING; pageTitle.y = y;
  root.appendChild(pageTitle);
  y += pageTitle.height + 8;

  const pageDesc = txt(
    "Base MUI components restyled with RSTO tokens. Each component should match its Storybook story exactly — same name, same variants, same props.",
    13, "Regular", C.shadow, FRAME_W - PADDING * 2
  );
  pageDesc.name = "Page/Description";
  pageDesc.x = PADDING; pageDesc.y = y;
  root.appendChild(pageDesc);
  y += pageDesc.height + 16;

  // Progress summary
  const progress = txt(
    "0 / " + ATOMS.length + " components built",
    11, "Medium", C.stone, 300
  );
  progress.name = "Page/Progress";
  progress.x = PADDING; progress.y = y;
  root.appendChild(progress);
  y += progress.height + 48;

  // Group separator line
  function addGroupHeading(label, yPos) {
    const line = rect(FRAME_W - PADDING * 2, 1, C.sand);
    line.name = "Group/Divider/" + label;
    line.x = PADDING; line.y = yPos;
    root.appendChild(line);
    yPos += 16;

    const groupLabel = txt(label.toUpperCase(), 10, "Bold", C.stone, 400);
    groupLabel.name = "Group/Label/" + label;
    groupLabel.letterSpacing = { unit: "PERCENT", value: 8 };
    groupLabel.x = PADDING; groupLabel.y = yPos;
    root.appendChild(groupLabel);
    yPos += groupLabel.height + 24;
    return yPos;
  }

  let currentGroup = null;

  for (const atom of ATOMS) {
    // Group heading when group changes
    if (atom.group !== currentGroup) {
      if (currentGroup !== null) y += GROUP_GAP - SECTION_GAP;
      y = addGroupHeading(atom.group, y);
      currentGroup = atom.group;
    }

    console.log("Building scaffold for: " + atom.name);

    // ── Atom section frame ─────────────────────────────────────────────────
    const sectionH = HEADER_H + 16 + atom.placeholderH + 32;
    const section = figma.createFrame();
    section.name = atom.name;
    section.resize(FRAME_W - PADDING * 2, sectionH);
    section.x = PADDING; section.y = y;
    section.fills = [{ type: "SOLID", color: C.white }];
    section.cornerRadius = 8;
    section.effects = [{
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: 0.06 },
      offset: { x: 0, y: 2 },
      radius: 8, spread: 0,
      visible: true, blendMode: "NORMAL",
    }];
    root.appendChild(section);

    // ── Header bar ────────────────────────────────────────────────────────
    const header = figma.createFrame();
    header.name = "Header";
    header.resize(FRAME_W - PADDING * 2, HEADER_H);
    header.x = 0; header.y = 0;
    header.fills = [{ type: "SOLID", color: C.bone }];
    header.topLeftRadius = 8;
    header.topRightRadius = 8;
    section.appendChild(header);

    // Left accent bar
    const accentBar = rect(4, HEADER_H, C.orange);
    accentBar.name = "Accent-Bar";
    accentBar.topLeftRadius = 8;
    accentBar.bottomLeftRadius = 8;
    header.appendChild(accentBar);

    // Component name
    const nameLabel = txt(atom.name, 20, "Bold", C.ink, 400);
    nameLabel.name = "Label/Name";
    nameLabel.x = 24; nameLabel.y = 20;
    header.appendChild(nameLabel);

    // Storybook link label
    const sbLabel = txt("RSTO/Atoms/" + atom.name + "  |  Storybook", 10, "Regular", C.stone, 400);
    sbLabel.name = "Label/Storybook";
    sbLabel.x = 24; sbLabel.y = 46;
    header.appendChild(sbLabel);

    // Variants pills row
    let pillX = 24;
    const pillY = 72;
    for (const variant of atom.variants) {
      const pillBg = figma.createFrame();
      pillBg.name = "Variant-Pill/" + variant;
      pillBg.fills = [{ type: "SOLID", color: C.sand }];
      pillBg.cornerRadius = 100;
      pillBg.clipsContent = false;

      const pillText = txt(variant, 10, "Medium", C.shadow, null);
      pillText.name = "Label";
      pillText.x = BADGE_PAD_H * 2; pillText.y = BADGE_PAD_V;

      // Size pill to text
      const pillW = pillText.width + BADGE_PAD_H * 4;
      const pillH = pillText.height + BADGE_PAD_V * 2;
      pillBg.resize(pillW, pillH);
      pillBg.x = pillX; pillBg.y = pillY;
      pillBg.appendChild(pillText);
      header.appendChild(pillBg);

      pillX += pillW + 6;

      // Wrap if running off edge
      if (pillX > FRAME_W - PADDING * 2 - 120) break;
    }

    // Props reference (right side of header)
    const propsX = FRAME_W - PADDING * 2 - 320;
    const propsLabel = txt("Component properties", 10, "Bold", C.stone, 290);
    propsLabel.name = "Props/Heading";
    propsLabel.x = propsX; propsLabel.y = 20;
    header.appendChild(propsLabel);

    let propY = 36;
    for (const prop of atom.props) {
      const propText = txt(prop, 10, "Regular", C.stone, 290);
      propText.name = "Props/Item";
      propText.x = propsX; propText.y = propY;
      header.appendChild(propText);
      propY += propText.height + 4;
    }

    // ── Status badge (top-right) ───────────────────────────────────────────
    const statusBg = figma.createFrame();
    statusBg.name = "Status/Badge";
    statusBg.fills = [{ type: "SOLID", color: C.sand }];
    statusBg.cornerRadius = 100;
    statusBg.resize(80, 24);

    const statusText = txt("To do", 10, "Medium", C.stone, null);
    statusText.name = "Status/Label";
    statusText.x = 10; statusText.y = 5;
    statusBg.appendChild(statusText);
    statusBg.x = FRAME_W - PADDING * 2 - 96; statusBg.y = 20;
    header.appendChild(statusBg);

    // ── Component placeholder ──────────────────────────────────────────────
    const placeholder = figma.createFrame();
    placeholder.name = "Component-Placeholder";
    placeholder.resize(PLACEHOLDER_W, atom.placeholderH);
    placeholder.x = 0; placeholder.y = HEADER_H + 16;
    placeholder.fills = [{ type: "SOLID", color: C.paper }];
    placeholder.clipsContent = false;
    section.appendChild(placeholder);

    // Dashed border simulation using strokes
    placeholder.strokes = [{ type: "SOLID", color: C.sand }];
    placeholder.strokeWeight = 1;
    placeholder.dashPattern = [6, 4];

    // Placeholder hint text
    const hintText = txt(
      "Paste " + atom.name + " component here from MUI file\nThen restyle with RSTO tokens",
      12, "Regular", C.stone, 400
    );
    hintText.name = "Placeholder/Hint";
    hintText.textAlignHorizontal = "CENTER";
    hintText.x = (PLACEHOLDER_W - 400) / 2;
    hintText.y = (atom.placeholderH - hintText.height) / 2;
    placeholder.appendChild(hintText);

    // Resize section to actual content
    section.resize(FRAME_W - PADDING * 2, HEADER_H + 16 + atom.placeholderH + 32);

    y += section.height + SECTION_GAP;
  }

  y += PADDING;
  root.resize(FRAME_W, y);

  figma.viewport.scrollAndZoomIntoView([root]);
  figma.notify(
    "Atoms scaffold created — " + ATOMS.length + " components across 4 groups",
    { timeout: 4000 }
  );
  figma.closePlugin();
}

main();
