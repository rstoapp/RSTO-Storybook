// ===========================================================================
// RSTO MOLECULES PAGE SCAFFOLD - Figma
// ===========================================================================
//
// HOW TO USE:
//   1. Navigate to the Molecules page in RSTO Design System 3.0
//   2. Open Scripter, paste and click Run
//   3. Each molecule gets a labelled section with variant reference and
//      a placeholder frame ready for the component to be built
//
// Safe to re-run: removes existing "Molecules Scaffold" frame first
// ===========================================================================

const FRAME_NAME = "Molecules Scaffold";

const C = {
  paper:   { r: 0.984, g: 0.965, b: 0.933 },
  bone:    { r: 0.957, g: 0.925, b: 0.878 },
  sand:    { r: 0.910, g: 0.863, b: 0.776 },
  ink:     { r: 0.122, g: 0.102, b: 0.078 },
  shadow:  { r: 0.420, g: 0.369, b: 0.290 },
  stone:   { r: 0.749, g: 0.694, b: 0.592 },
  orange:  { r: 0.949, g: 0.545, b: 0.176 },
  white:   { r: 1.000, g: 1.000, b: 1.000 },
};

// --- MOLECULE DEFINITIONS ---------------------------------------------------
// Ordered to match Storybook sidebar (alphabetical within groups)
// variants: exact Storybook story names
// props: key Figma component properties to build
// atoms: which atom components are used to compose this molecule
// placeholderH: estimated height for the component placeholder frame

const MOLECULES = [

  // ── Navigation ─────────────────────────────────────────────────────────────
  {
    name:         "IconNavRail",
    group:        "Navigation",
    variants:     ["Default", "No item selected", "Analytics selected"],
    props:        ["Selected=Dashboard/Analytics/Upload/Settings/etc", "Environment=Production/Preview/CI"],
    atoms:        ["Icon (Material Design Icons)", "Typography/eyebrow"],
    sbSlug:       "iconnavrail",
    placeholderH: 400,
  },
  {
    name:         "NavList",
    group:        "Navigation",
    variants:     ["ExpandableListButton — collapsed", "ExpandableListButton — expanded", "NestedListButton — default", "NestedListButton — selected", "NestedListButtonGroup", "NestedListSection — collapsed", "NestedListSection — expanded", "Multiple sections"],
    props:        ["Type=Expandable/Nested/Section", "State=Default/Selected/Collapsed/Expanded"],
    atoms:        ["RstoListItemButton", "Typography/body2", "Icon"],
    sbSlug:       "navlist",
    placeholderH: 320,
  },
  {
    name:         "RstoListItemButton",
    group:        "Navigation",
    variants:     ["Default", "Selected", "Nested (left-border variant)"],
    props:        ["State=Default/Selected", "Variant=Default/Nested"],
    atoms:        ["Typography/body2", "Icon"],
    sbSlug:       "rstolistitembutton",
    placeholderH: 160,
  },
  {
    name:         "StrategyMenu",
    group:        "Navigation",
    variants:     ["Three strategies", "Second item active", "Indicator categories"],
    props:        ["ActiveIndex=0/1/2/etc", "ItemCount=2/3/4"],
    atoms:        ["Tabs", "Typography/button"],
    sbSlug:       "strategymenu",
    placeholderH: 120,
  },

  {
    name:         "GlobalSearch",
    group:        "Navigation",
    variants:     ["Default", "With results — \"qual\"", "No results", "Wide (400px) — top nav context"],
    props:        ["State=Default/WithResults/NoResults", "Width=280px/400px"],
    atoms:        ["TextField/InputBase", "Icon (search)", "Typography/body2", "Typography/caption", "Card (results dropdown)"],
    sbSlug:       "globalsearch",
    placeholderH: 280,
  },

  // ── Inputs & Controls ──────────────────────────────────────────────────────
  {
    name:         "FilterChip",
    group:        "Inputs & Controls",
    variants:     ["Default", "Open", "Interactive", "Multiple Filters", "Display Only"],
    props:        ["State=Default/Open", "Interactive=True/False"],
    atoms:        ["Typography/filter-label", "Typography/eyebrow", "Icon (arrow_drop_down)"],
    sbSlug:       "filterchip",
    placeholderH: 80,
  },
  {
    name:         "Selector",
    group:        "Inputs & Controls",
    variants:     ["With selected value", "With placeholder (no selection)", "Period selector"],
    props:        ["State=Default/Open/Disabled", "HasValue=True/False"],
    atoms:        ["TextField", "Typography/body2", "Icon"],
    sbSlug:       "selector",
    placeholderH: 120,
  },

  // ── Data Display ───────────────────────────────────────────────────────────
  {
    name:         "RstoChip",
    group:        "Data Display",
    variants:     ["Default", "Primary", "Secondary", "All Variants"],
    props:        ["Color=Default/Primary/Secondary", "Size=Default"],
    atoms:        ["Chip", "Typography/caption"],
    sbSlug:       "rstochip",
    placeholderH: 80,
  },
  {
    name:         "PublishedStatusChip",
    group:        "Data Display",
    variants:     ["Published", "Draft"],
    props:        ["Status=Published/Draft"],
    atoms:        ["RstoChip", "Icon"],
    sbSlug:       "publishedstatuschip",
    placeholderH: 60,
  },
  {
    name:         "HeadingWithChips",
    group:        "Data Display",
    variants:     ["Default", "With tooltip", "Many tags"],
    props:        ["HasTooltip=True/False", "ChipCount=1/2/3+"],
    atoms:        ["Typography/h4", "RstoChip", "RstoTooltip"],
    sbSlug:       "headingwithchips",
    placeholderH: 100,
  },
  {
    name:         "IndicatorListItem",
    group:        "Data Display",
    variants:     ["Default", "Selected", "Multiple items in a list"],
    props:        ["State=Default/Selected", "HasSubtext=True/False"],
    atoms:        ["Typography/body2", "Typography/caption", "Icon"],
    sbSlug:       "indicatorlistitem",
    placeholderH: 160,
  },
  {
    name:         "MenuItem",
    group:        "Data Display",
    variants:     ["Default", "Selected", "All Items"],
    props:        ["State=Default/Selected", "HasIcon=True/False"],
    atoms:        ["Typography/body1", "Icon"],
    sbSlug:       "menuitem",
    placeholderH: 160,
  },
  {
    name:         "TitleWithSelectors",
    group:        "Data Display",
    variants:     ["Inline selector mid-title", "Text only (no selectors)", "Multiple inline selectors"],
    props:        ["SelectorCount=0/1/2", "Variant=Inline/TextOnly"],
    atoms:        ["Typography/h3", "Selector", "Typography/body1"],
    sbSlug:       "titlewithselectors",
    placeholderH: 100,
  },

  // ── Data Components ────────────────────────────────────────────────────────
  {
    name:         "DataComponents",
    group:        "Data Components",
    variants:     ["StatPill — plain", "StatPill — with chip badge", "StatPill — summary row", "PopBar — above target", "PopBar — below target", "PopBar — group", "BarrierRow", "BarrierRow — group"],
    props:        ["Type=StatPill/PopBar/BarrierRow", "Variant=Plain/WithBadge/SummaryRow/AboveTarget/BelowTarget/Group"],
    atoms:        ["Typography/body2", "Typography/caption", "RstoChip", "Icon"],
    sbSlug:       "datacomponents",
    placeholderH: 280,
  },

  // ── Feedback & Status ──────────────────────────────────────────────────────
  {
    name:         "AlertSnackbar",
    group:        "Feedback & Status",
    variants:     ["Success", "Error", "Warning", "Info"],
    props:        ["Severity=Success/Error/Warning/Info"],
    atoms:        ["Alert", "Icon", "Typography/body2"],
    sbSlug:       "alertsnackbar",
    placeholderH: 120,
  },
  {
    name:         "DataStateViews",
    group:        "Feedback & Status",
    variants:     ["Data Missing", "Data Processing"],
    props:        ["State=Missing/Processing"],
    atoms:        ["Typography/body1", "Typography/body2", "LinearProgress", "Icon"],
    sbSlug:       "datastateviews",
    placeholderH: 160,
  },
  {
    name:         "InfoCard",
    group:        "Feedback & Status",
    variants:     ["Default", "Warning"],
    props:        ["Variant=Default/Warning"],
    atoms:        ["Card", "Typography/body2", "Icon"],
    sbSlug:       "infocard",
    placeholderH: 160,
  },
  {
    name:         "InsightCard",
    group:        "Feedback & Status",
    variants:     ["Default", "Loading", "Custom Label"],
    props:        ["State=Default/Loading", "HasLabel=True/False"],
    atoms:        ["Card", "Typography/h5", "Typography/body2", "LinearProgress"],
    sbSlug:       "insightcard",
    placeholderH: 200,
  },

  // ── Overlays ───────────────────────────────────────────────────────────────
  {
    name:         "RstoDialog",
    group:        "Overlays",
    variants:     ["Default", "Interactive", "With Actions", "Confirmation", "Full Width"],
    props:        ["Variant=Default/Confirmation/FullWidth", "HasActions=True/False"],
    atoms:        ["Button", "Typography/h6", "Typography/body1", "Icon"],
    sbSlug:       "rstodialog",
    placeholderH: 280,
  },
  {
    name:         "RstoDrawer",
    group:        "Overlays",
    variants:     ["Default", "Interactive", "With Content", "Narrow"],
    props:        ["Width=Default/Narrow", "HasContent=True/False"],
    atoms:        ["Button", "Typography/h6", "Typography/body1"],
    sbSlug:       "rstodrawer",
    placeholderH: 280,
  },
  {
    name:         "RstoTooltip",
    group:        "Overlays",
    variants:     ["Default — ? icon, orange hover", "Insight — ? icon, blue colour", "With CTA button"],
    props:        ["Variant=Default/Insight/WithCTA", "Placement=Top/Bottom/Left/Right"],
    atoms:        ["Icon", "Typography/caption", "Button"],
    sbSlug:       "rstotooltip",
    placeholderH: 160,
  },

  // ── Layout ─────────────────────────────────────────────────────────────────
  {
    name:         "Accordion",
    group:        "Layout",
    variants:     ["Collapsed", "Expanded"],
    props:        ["State=Collapsed/Expanded"],
    atoms:        ["Typography/h6", "Typography/body2", "Icon (expand_more)"],
    sbSlug:       "accordion",
    placeholderH: 200,
  },

];
// --- END OF MOLECULE DEFINITIONS -------------------------------------------


// Layout constants
const FRAME_W        = 1200;
const PADDING        = 64;
const SECTION_GAP    = 48;
const GROUP_GAP      = 80;
const HEADER_H       = 140;   // slightly taller than atoms (molecules have more props)
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

  const existing = figma.currentPage.children.find(n => n.name === FRAME_NAME);
  if (existing) existing.remove();

  const root = figma.createFrame();
  root.name = FRAME_NAME;
  root.fills = [{ type: "SOLID", color: C.paper }];
  root.resize(FRAME_W, 4000);
  root.clipsContent = false;
  figma.currentPage.appendChild(root);

  let y = PADDING;

  // Page title
  const pageTitle = txt("Molecules", 32, "Bold", C.ink, FRAME_W - PADDING * 2);
  pageTitle.name = "Page/Title";
  pageTitle.x = PADDING; pageTitle.y = y;
  root.appendChild(pageTitle);
  y += pageTitle.height + 8;

  const pageDesc = txt(
    "RSTO-specific composite components. Each molecule is composed of atoms and/or other molecules. Component name and variant names match Storybook exactly.",
    13, "Regular", C.shadow, FRAME_W - PADDING * 2
  );
  pageDesc.name = "Page/Description";
  pageDesc.x = PADDING; pageDesc.y = y;
  root.appendChild(pageDesc);
  y += pageDesc.height + 16;

  const progress = txt("0 / " + MOLECULES.length + " components built", 11, "Medium", C.stone, 300);
  progress.name = "Page/Progress";
  progress.x = PADDING; progress.y = y;
  root.appendChild(progress);
  y += progress.height + 48;

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

  for (const mol of MOLECULES) {

    if (mol.group !== currentGroup) {
      if (currentGroup !== null) y += GROUP_GAP - SECTION_GAP;
      y = addGroupHeading(mol.group, y);
      currentGroup = mol.group;
    }

    console.log("Building: " + mol.name);

    const sectionH = HEADER_H + 16 + mol.placeholderH + 32;
    const section = figma.createFrame();
    section.name = mol.name;
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

    // Header bar
    const header = figma.createFrame();
    header.name = "Header";
    header.resize(FRAME_W - PADDING * 2, HEADER_H);
    header.x = 0; header.y = 0;
    header.fills = [{ type: "SOLID", color: C.bone }];
    header.topLeftRadius = 8; header.topRightRadius = 8;
    section.appendChild(header);

    // Orange accent bar
    const accent = rect(4, HEADER_H, C.orange);
    accent.name = "Accent-Bar";
    accent.topLeftRadius = 8; accent.bottomLeftRadius = 8;
    header.appendChild(accent);

    // Component name
    const nameLabel = txt(mol.name, 20, "Bold", C.ink, 500);
    nameLabel.name = "Label/Name";
    nameLabel.x = 24; nameLabel.y = 16;
    header.appendChild(nameLabel);

    // Storybook path
    const sbLabel = txt("RSTO/Molecules/" + mol.name + "  |  Storybook", 10, "Regular", C.stone, 400);
    sbLabel.name = "Label/Storybook";
    sbLabel.x = 24; sbLabel.y = 42;
    header.appendChild(sbLabel);

    // Atoms used
    const atomsLabel = txt("Composed of:  " + mol.atoms.join("  ·  "), 10, "Regular", C.shadow, FRAME_W - PADDING * 2 - 360);
    atomsLabel.name = "Label/Atoms";
    atomsLabel.x = 24; atomsLabel.y = 58;
    header.appendChild(atomsLabel);

    // Variant pills
    let pillX = 24;
    const pillY = 80;
    for (const variant of mol.variants) {
      const pillBg = figma.createFrame();
      pillBg.name = "Variant-Pill/" + variant;
      pillBg.fills = [{ type: "SOLID", color: C.sand }];
      pillBg.cornerRadius = 100;
      pillBg.clipsContent = false;

      const pillText = txt(variant, 10, "Medium", C.shadow, null);
      pillText.name = "Label";
      pillText.x = BADGE_PAD_H * 2; pillText.y = BADGE_PAD_V;

      const pillW = pillText.width + BADGE_PAD_H * 4;
      const pillH = pillText.height + BADGE_PAD_V * 2;
      pillBg.resize(pillW, pillH);
      pillBg.x = pillX; pillBg.y = pillY;
      pillBg.appendChild(pillText);
      header.appendChild(pillBg);

      pillX += pillW + 6;
      if (pillX > FRAME_W - PADDING * 2 - 160) {
        pillX = 24;
        // Can't add more rows in this space — pills truncated
        break;
      }
    }

    // Props (right column)
    const propsX = FRAME_W - PADDING * 2 - 340;
    const propsHeading = txt("Component properties", 10, "Bold", C.stone, 310);
    propsHeading.name = "Props/Heading";
    propsHeading.x = propsX; propsHeading.y = 16;
    header.appendChild(propsHeading);

    let propY = 32;
    for (const prop of mol.props) {
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

    // Component placeholder
    const placeholder = figma.createFrame();
    placeholder.name = "Component-Placeholder";
    placeholder.resize(PLACEHOLDER_W, mol.placeholderH);
    placeholder.x = 0; placeholder.y = HEADER_H + 16;
    placeholder.fills = [{ type: "SOLID", color: C.paper }];
    placeholder.strokes = [{ type: "SOLID", color: C.sand }];
    placeholder.strokeWeight = 1;
    placeholder.dashPattern = [6, 4];
    section.appendChild(placeholder);

    const hintText = txt(
      "Build " + mol.name + " here\nAtoms: " + mol.atoms.join(", "),
      11, "Regular", C.stone, 500
    );
    hintText.name = "Placeholder/Hint";
    hintText.x = (PLACEHOLDER_W - 500) / 2;
    hintText.y = (mol.placeholderH - hintText.height) / 2;
    placeholder.appendChild(hintText);

    section.resize(FRAME_W - PADDING * 2, HEADER_H + 16 + mol.placeholderH + 32);
    y += section.height + SECTION_GAP;
  }

  y += PADDING;
  root.resize(FRAME_W, y);

  figma.viewport.scrollAndZoomIntoView([root]);
  figma.notify(
    "Molecules scaffold — " + MOLECULES.length + " components across " +
    [...new Set(MOLECULES.map(m => m.group))].length + " groups",
    { timeout: 4000 }
  );
  figma.closePlugin();
}

main();
