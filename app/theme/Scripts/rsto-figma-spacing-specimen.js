// ===========================================================================
// RSTO SPACING SPECIMEN GENERATOR - Figma
// ===========================================================================
//
// HOW TO USE:
//   1. Run rsto-figma-spacing-tokens.js FIRST
//   2. Navigate to your Foundations - Spacing & Grid page in Figma
//   3. Open Scripter, paste and click Run
//   4. Re-run any time the spacing scale changes
//
// WHAT IT DOES:
//   - Reads spacing variables from the "Spacing" collection
//   - Builds a visual specimen with labelled bars for each step
//   - Safe to re-run: deletes and recreates "Spacing Scale" each time
// ===========================================================================

const FRAME_NAME      = "Spacing Scale";
const COLLECTION_NAME = "Spacing";

// Colours (from tokens.ts)
const C = {
  paper:  { r: 0.984, g: 0.965, b: 0.933 },  // #FBF6EE
  ink:    { r: 0.122, g: 0.102, b: 0.078 },  // #1F1A14
  shadow: { r: 0.420, g: 0.369, b: 0.290 },  // #6B5E4A
  stone:  { r: 0.749, g: 0.694, b: 0.592 },  // #BFB197
  orange: { r: 0.949, g: 0.545, b: 0.176 },  // #F28B2D
  brown:  { r: 0.310, g: 0.227, b: 0.173 },  // brown/60 #4F3A2C
  bone:   { r: 0.957, g: 0.925, b: 0.878 },  // #F4ECE0
};

// Layout
const FRAME_W      = 900;
const PADDING      = 64;
const ROW_H        = 32;   // height of each bar row
const ROW_GAP      = 12;   // gap between rows
const LABEL_W      = 140;  // "spacing(1)" column
const PX_W         = 64;   // "8px" column
const VAR_W        = 140;  // "spacing/1" column
const BAR_X        = PADDING + LABEL_W + PX_W + VAR_W + 24; // where bars start
const BAR_MAX_W    = FRAME_W - BAR_X - PADDING;  // max bar width on canvas
const MAX_PX       = 96;   // largest spacing value — used to scale bars

// Ordered spacing steps (must match rsto-figma-spacing-tokens.js)
const STEPS = [
  { name: "spacing/half", step: "spacing(0.5)", px: 4  },
  { name: "spacing/1",   step: "spacing(1)",   px: 8  },
  { name: "spacing/1-5", step: "spacing(1.5)", px: 12 },
  { name: "spacing/2",   step: "spacing(2)",   px: 16 },
  { name: "spacing/3",   step: "spacing(3)",   px: 24 },
  { name: "spacing/4",   step: "spacing(4)",   px: 32 },
  { name: "spacing/5",   step: "spacing(5)",   px: 40 },
  { name: "spacing/6",   step: "spacing(6)",   px: 48 },
  { name: "spacing/7",   step: "spacing(7)",   px: 56 },
  { name: "spacing/8",   step: "spacing(8)",   px: 64 },
  { name: "spacing/10",  step: "spacing(10)",  px: 80 },
  { name: "spacing/12",  step: "spacing(12)",  px: 96 },
];

async function loadFonts() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium"  });
  await figma.loadFontAsync({ family: "Inter", style: "Bold"    });
}

function label(text, size, fontStyle, colour, w) {
  const t = figma.createText();
  t.fontName   = { family: "Inter", style: fontStyle };
  t.fontSize   = size;
  t.fills      = [{ type: "SOLID", color: colour }];
  t.characters = text;
  if (w) { t.resize(w, t.height); t.textAutoResize = "HEIGHT"; }
  return t;
}

function divider(x, y, w) {
  const r = figma.createRectangle();
  r.name   = "Divider";
  r.resize(w, 1);
  r.x = x; r.y = y;
  r.fills  = [{ type: "SOLID", color: C.stone, opacity: 0.3 }];
  return r;
}

async function main() {
  await loadFonts();

  // Verify spacing collection exists
  const collection = figma.variables.getLocalVariableCollections()
    .find(c => c.name === COLLECTION_NAME);

  if (!collection) {
    figma.notify(
      "\"" + COLLECTION_NAME + "\" variable collection not found. Run rsto-figma-spacing-tokens.js first.",
      { timeout: 5000 }
    );
    figma.closePlugin();
    return;
  }

  const modeId = collection.modes[0].modeId;

  // Build a lookup of variable name -> variable
  const varMap = {};
  for (const v of figma.variables.getLocalVariables("FLOAT")) {
    if (v.variableCollectionId === collection.id) {
      varMap[v.name] = v;
    }
  }

  console.log("Found " + Object.keys(varMap).length + " spacing variables");

  // Remove existing frame
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
  const sectionHeading = label("Spacing Scale", 11, "Medium", C.shadow, 200);
  sectionHeading.name = "Section/Heading";
  sectionHeading.x = PADDING;
  sectionHeading.y = y;
  root.appendChild(sectionHeading);
  y += sectionHeading.height + 8;

  const accentBar = figma.createRectangle();
  accentBar.name   = "Section/Accent-Bar";
  accentBar.resize(32, 3);
  accentBar.x = PADDING; accentBar.y = y;
  accentBar.fills = [{ type: "SOLID", color: C.orange }];
  accentBar.cornerRadius = 2;
  root.appendChild(accentBar);
  y += 20;

  // Sub-description
  const desc = label("Base unit: 8px  |  theme.spacing(n) = n × 8px  |  MUI default spacing scale", 11, "Regular", C.shadow, FRAME_W - PADDING * 2);
  desc.name = "Section/Description";
  desc.x = PADDING; desc.y = y;
  root.appendChild(desc);
  y += desc.height + 24;

  // ── Column headers ─────────────────────────────────────────────────────────
  const colHeaders = figma.createFrame();
  colHeaders.name   = "Table/Column-Headers";
  colHeaders.resize(FRAME_W - PADDING * 2, 20);
  colHeaders.x = PADDING; colHeaders.y = y;
  colHeaders.fills = [];
  root.appendChild(colHeaders);

  const headerCols = [
    { text: "Function",    x: 0,                          w: LABEL_W },
    { text: "Value",       x: LABEL_W,                    w: PX_W   },
    { text: "Variable",    x: LABEL_W + PX_W,             w: VAR_W  },
    { text: "Visual",      x: BAR_X - PADDING,            w: 80     },
  ];
  for (const col of headerCols) {
    const h = label(col.text, 10, "Medium", C.shadow, col.w);
    h.name = "Column-Header/" + col.text;
    h.x = col.x; h.y = 0;
    colHeaders.appendChild(h);
  }
  y += 28;

  // Top divider
  const topDivider = divider(PADDING, y, FRAME_W - PADDING * 2);
  topDivider.name = "Divider/Header";
  root.appendChild(topDivider);
  y += 1;

  // ── Spacing rows ───────────────────────────────────────────────────────────
  for (const step of STEPS) {
    y += 10;

    // Row container
    const row = figma.createFrame();
    row.name   = "Row/" + step.name;
    row.resize(FRAME_W - PADDING * 2, ROW_H);
    row.x = PADDING; row.y = y;
    row.fills = [];
    root.appendChild(row);

    // Function call label: "spacing(1)"
    const funcLabel = label(step.step, 12, "Regular", C.ink, LABEL_W);
    funcLabel.name  = "Label/Function";
    funcLabel.x = 0;
    funcLabel.y = (ROW_H - funcLabel.height) / 2;
    row.appendChild(funcLabel);

    // Pixel value: "8px"
    const pxLabel = label(step.px + "px", 12, "Medium", C.shadow, PX_W);
    pxLabel.name  = "Label/Value";
    pxLabel.x = LABEL_W;
    pxLabel.y = (ROW_H - pxLabel.height) / 2;
    row.appendChild(pxLabel);

    // Variable name: "spacing/1"
    const varLabel = label(step.name, 11, "Regular", C.stone, VAR_W);
    varLabel.name  = "Label/Variable";
    varLabel.x = LABEL_W + PX_W;
    varLabel.y = (ROW_H - varLabel.height) / 2;
    row.appendChild(varLabel);

    // Visual bar — actual pixel width so spacing(1)=8px on canvas, spacing(12)=96px, etc.
    // Min display width of 4px so spacing(0.5) remains visible
    const barW = Math.max(4, step.px);
    const bar = figma.createRectangle();
    bar.name   = "Bar/Visual";
    bar.resize(barW, 20);
    bar.x = BAR_X - PADDING;
    bar.y = (ROW_H - 20) / 2;
    bar.fills = [{ type: "SOLID", color: C.brown }];
    bar.cornerRadius = 4;
    bar.opacity = 0.85; // consistent — width is the only variable
    row.appendChild(bar);

    // Bind bar width to spacing variable if it exists
    const variable = varMap[step.name];
    if (variable) {
      try {
        bar.setBoundVariable("width", variable);
        console.log("  + Bound " + step.name + " variable to bar width");
      } catch (e) {
        console.warn("  Could not bind variable to bar: " + e.message);
      }
    }

    y += ROW_H + ROW_GAP;

    // Row divider
    const rowDivider = divider(PADDING, y, FRAME_W - PADDING * 2);
    rowDivider.name = "Divider/" + step.name;
    root.appendChild(rowDivider);
    y += 1;
  }

  // ── Usage notes ────────────────────────────────────────────────────────────
  y += 32;

  const notesHeading = label("Common usage", 11, "Medium", C.shadow, 300);
  notesHeading.name = "Usage-Notes/Heading";
  notesHeading.x = PADDING; notesHeading.y = y;
  root.appendChild(notesHeading);
  y += notesHeading.height + 16;

  const usageNotes = [
    { token: "spacing/1   (8px)",  usage: "Icon margins, tight inline gaps"             },
    { token: "spacing/2   (16px)", usage: "Default component padding, form field gaps"  },
    { token: "spacing/3   (24px)", usage: "Card internal padding, between form groups"  },
    { token: "spacing/4   (32px)", usage: "Gap between cards, between sections"         },
    { token: "spacing/6   (48px)", usage: "Page section padding, sidebar margins"       },
    { token: "spacing/8   (64px)", usage: "Major layout divisions, page-level gaps"     },
  ];

  // Usage table
  const usageFrame = figma.createFrame();
  usageFrame.name   = "Usage-Notes/Table";
  usageFrame.x = PADDING; usageFrame.y = y;
  usageFrame.fills = [{ type: "SOLID", color: C.bone }];
  usageFrame.cornerRadius = 8;
  usageFrame.resize(FRAME_W - PADDING * 2, 20);
  usageFrame.clipsContent = false;
  root.appendChild(usageFrame);

  let usageY = 20;
  for (const note of usageNotes) {
    const tokenCol = label(note.token, 11, "Medium", C.ink, 200);
    tokenCol.name  = "Usage-Row/Token";
    tokenCol.x = 20; tokenCol.y = usageY;
    usageFrame.appendChild(tokenCol);

    const usageCol = label(note.usage, 11, "Regular", C.shadow, FRAME_W - PADDING * 2 - 240);
    usageCol.name  = "Usage-Row/Description";
    usageCol.x = 220; usageCol.y = usageY;
    usageFrame.appendChild(usageCol);

    usageY += 28;
  }
  usageFrame.resize(FRAME_W - PADDING * 2, usageY + 20);
  y += usageFrame.height + PADDING;

  // ── Resize root and finish ─────────────────────────────────────────────────
  root.resize(FRAME_W, y);
  figma.viewport.scrollAndZoomIntoView([root]);
  figma.notify("Spacing specimen generated - " + STEPS.length + " steps", { timeout: 3000 });
  figma.closePlugin();
}

main();
