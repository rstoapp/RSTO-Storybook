// ===========================================================================
// RSTO EFFECT STYLE SYNC - Figma
// ===========================================================================
//
// HOW TO USE:
//   1. Open Scripter (Plugins > Scripter)
//   2. Paste this script and click Run
//   3. Re-run any time shadow values change in the codebase
//
// WHAT IT DOES:
//   - Creates or updates Figma Effect Styles for each elevation level
//   - Styles appear in the right sidebar under Styles > Effect styles
//   - Grouped under "Elevation/" for easy browsing
//   - Safe to re-run: updates existing styles, never duplicates
//
// SOURCE: Derived from components.ts, HtmlTooltip.tsx, QuarterDatePicker.tsx
//
//   Elevation/0-Flat     boxShadow: none
//   Elevation/1-Card     0 4px 4px 0 rgba(25,25,25,0.05)   components.ts — Card elevation variant
//   Elevation/2-Floating 0 4px 16px 0 rgba(0,0,0,0.10)     HtmlTooltip.tsx — tooltips, dropdowns
//   Elevation/3-Modal    0 4px 16px 0 rgba(0,0,0,0.12)     QuarterDatePicker.tsx — date pickers, drawers
//
// TO UPDATE: edit EFFECT_STYLES below if shadows change
// ===========================================================================

// --- UPDATE THIS SECTION WHEN SHADOWS CHANGE -------------------------------
const EFFECT_STYLES = [
  {
    name:        "Elevation/0-Flat",
    description: "No shadow. Used on: all buttons, accordion, flat Paper, AppSideMenu panels.",
    effects:     [],  // intentionally empty — flat surface
  },
  {
    name:        "Elevation/1-Card",
    description: "Subtle card lift. Used on: MuiCard elevation variant. CSS: 0 4px 4px 0 rgba(25,25,25,0.05)",
    effects: [
      {
        type:      "DROP_SHADOW",
        color:     { r: 0.098, g: 0.098, b: 0.098, a: 0.05 },  // #191919 at 5%
        offset:    { x: 0, y: 4 },
        radius:    4,
        spread:    0,
        visible:   true,
        blendMode: "NORMAL",
      },
    ],
  },
  {
    name:        "Elevation/2-Floating",
    description: "Floating element shadow. Used on: tooltips, popovers, dropdowns. CSS: 0 4px 16px 0 rgba(0,0,0,0.10)",
    effects: [
      {
        type:      "DROP_SHADOW",
        color:     { r: 0, g: 0, b: 0, a: 0.10 },
        offset:    { x: 0, y: 4 },
        radius:    16,
        spread:    0,
        visible:   true,
        blendMode: "NORMAL",
      },
    ],
  },
  {
    name:        "Elevation/3-Modal",
    description: "Modal / drawer shadow. Used on: date pickers, drawers, dialogs. CSS: 0 4px 16px 0 rgba(0,0,0,0.12)",
    effects: [
      {
        type:      "DROP_SHADOW",
        color:     { r: 0, g: 0, b: 0, a: 0.12 },
        offset:    { x: 0, y: 4 },
        radius:    16,
        spread:    0,
        visible:   true,
        blendMode: "NORMAL",
      },
    ],
  },
];
// --- END OF EFFECT STYLES SECTION ------------------------------------------


// -- Script logic - no need to edit below this line -------------------------

let created = 0, updated = 0, errors = 0;

// Index existing effect styles by name
const existingStyles = {};
for (const s of figma.getLocalEffectStyles()) {
  existingStyles[s.name] = s;
}

for (const def of EFFECT_STYLES) {
  try {
    let style = existingStyles[def.name];

    if (!style) {
      style = figma.createEffectStyle();
      style.name = def.name;
      created++;
      console.log("  + Created: " + def.name);
    } else {
      updated++;
      console.log("  ~ Updated: " + def.name);
    }

    style.effects     = def.effects;
    style.description = def.description;

  } catch (e) {
    errors++;
    console.error("  Error on " + def.name + ": " + e.message);
  }
}

const summary = "RSTO effect styles synced - "
  + created + " created, "
  + updated + " updated"
  + (errors > 0 ? ", " + errors + " errors" : "");

console.log(summary);
figma.notify(summary, { timeout: 4000 });
figma.closePlugin();
