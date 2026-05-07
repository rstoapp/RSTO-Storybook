// ===========================================================================
// RSTO COLOUR TOKEN SYNC - Figma Variables
// ===========================================================================
//
// HOW TO USE:
//   1. Install the "Scripter" plugin from the Figma Community (free)
//   2. Open Scripter via Plugins > Scripter
//   3. Paste this entire file and click Run (the play button)
//   4. Re-run any time tokens.ts or palette.ts changes
//
// WHAT IT DOES:
//   - Creates a "RSTO Design Tokens" Variable Collection (if it doesn't exist)
//   - Creates or updates all colour variables - never duplicates
//   - Organises into two groups: scale/ (raw values) and palette/ (semantic)
//   - Reports how many were created vs updated
//
// TO UPDATE TOKENS:
//   Edit the TOKENS object below to match tokens.ts / palette.ts
// ===========================================================================

const COLLECTION_NAME = "RSTO Design Tokens";
const MODE_NAME = "Default";

// --- UPDATE THIS SECTION WHEN TOKENS CHANGE --------------------------------
const TOKENS = {

  // -- RAW SCALES -------------------------------------------------------------
  // Source: tokens.ts

  // Neutrals — warm off-whites to deep clay
  "scale/neutral/paper":  "#FBF6EE",  // page/app shell background
  "scale/neutral/bone":   "#F4ECE0",  // card backgrounds
  "scale/neutral/sand":   "#E8DCC6",  // rules, borders
  "scale/neutral/stone":  "#BFB197",  // tertiary text
  "scale/neutral/shadow": "#6B5E4A",  // secondary text
  "scale/neutral/earth":  "#3D352A",  // body text
  "scale/neutral/ink":    "#1F1A14",  // headlines

  // Orange / Ochre — RSTO primary
  "scale/orange/10": "#FDF1E2",
  "scale/orange/20": "#F8D9B0",
  "scale/orange/30": "#F0B174",
  "scale/orange/40": "#E8934A",
  "scale/orange/50": "#F28B2D",  // RSTO primary orange
  "scale/orange/60": "#C86A1F",  // terracotta
  "scale/orange/70": "#A34E16",  // burnt sienna
  "scale/orange/80": "#6E3410",  // deep rust

  // Blue / Sky — RSTO primary blue
  "scale/blue/10": "#E8F2F4",
  "scale/blue/20": "#C3DDE2",
  "scale/blue/30": "#9CC5CE",
  "scale/blue/40": "#7AB8C5",
  "scale/blue/50": "#65C4DB",  // RSTO primary blue
  "scale/blue/60": "#3E90A3",
  "scale/blue/70": "#2D6B7A",  // dusk
  "scale/blue/80": "#1D4552",

  // Green / Saltbush — eucalyptus, mulga
  "scale/green/10": "#EDF0E5",
  "scale/green/20": "#D4DCBC",
  "scale/green/30": "#A8B48A",
  "scale/green/40": "#7F9165",
  "scale/green/50": "#5D7A45",  // eucalyptus
  "scale/green/60": "#475F34",  // mulga
  "scale/green/70": "#2D3D20",

  // Brown / Bark — MUI primary driver
  "scale/brown/10": "#F0E4D5",
  "scale/brown/20": "#D8C4A6",
  "scale/brown/30": "#B8997A",
  "scale/brown/40": "#96735A",
  "scale/brown/50": "#6F5340",  // bark
  "scale/brown/60": "#4F3A2C",  // MUI primary.main (buttons, focus rings)
  "scale/brown/70": "#2D1F16",

  // Gray — pure neutral, MUI component defaults
  "scale/gray/shadow": "#1919190D",  // 5% black (includes alpha)
  "scale/gray/black":  "#191919",
  "scale/gray/90":     "#474747",
  "scale/gray/80":     "#757575",
  "scale/gray/70":     "#A3A3A3",
  "scale/gray/60":     "#D1D1D1",
  "scale/gray/50":     "#EAEAEA",
  "scale/gray/40":     "#EFEFEF",
  "scale/gray/30":     "#F3F3F3",
  "scale/gray/20":     "#FCFCFC",
  "scale/gray/white":  "#FFFFFF",

  // Red — error/danger states
  "scale/red/10": "#FCEBEB",
  "scale/red/20": "#F6C3C3",
  "scale/red/30": "#F19A9A",
  "scale/red/40": "#EB7272",
  "scale/red/50": "#E23636",
  "scale/red/60": "#AF0303",
  "scale/red/70": "#7C0000",
  "scale/red/80": "#490000",

  // Functional / Status
  "scale/functional/error":           "#DA2E2E",
  "scale/functional/success":         "#99D35F",
  "scale/functional/status-positive": "#5D7A45",  // on-track (eucalyptus)
  "scale/functional/status-moderate": "#3E90A3",  // watch (desert sky)
  "scale/functional/status-warning":  "#F28B2D",  // below-target (RSTO orange)
  "scale/functional/status-critical": "#A34E16",  // needs attention (burnt sienna)

  // -- SEMANTIC PALETTE -------------------------------------------------------
  // Source: palette.ts - maps scale tokens to MUI theme roles

  "palette/background/default": "#FBF6EE",  // rstoNeutral.paper — app shell
  "palette/background/paper":   "#FDFAF4",  // warm card surface

  // Primary — deep teal (buttons, checkboxes, focus rings, sliders)
  "palette/primary/main":          "#1D4552",  // rstoBlue._80 — primary button fill
  "palette/primary/light":         "#3E90A3",  // rstoBlue._60 — chip hover surfaces
  "palette/primary/dark":          "#2D6B7A",  // rstoBlue._70 — primary button hover
  "palette/primary/contrast-text": "#FFFFFF",

  // Secondary — dusk teal outlined (light teal fill on hover)
  "palette/secondary/main":          "#2D6B7A",  // rstoBlue._70 — border + text
  "palette/secondary/light":         "#E8F2F4",  // rstoBlue._10 — hover fill
  "palette/secondary/dark":          "#1D4552",  // rstoBlue._80 — deeper border on hover
  "palette/secondary/contrast-text": "#2D6B7A",  // rstoBlue._70

  // Error — terracotta (destructive actions)
  "palette/error/main":          "#C86A1F",
  "palette/error/light":         "#E8934A",
  "palette/error/dark":          "#A34E16",
  "palette/error/contrast-text": "#FFFFFF",

  // Warning — RSTO orange (caution badges, warning banners)
  "palette/warning/main":          "#F28B2D",
  "palette/warning/light":         "#E8934A",
  "palette/warning/dark":          "#C86A1F",
  "palette/warning/contrast-text": "#1F1A14",

  // Info — desert sky blue
  "palette/info/main":          "#3E90A3",
  "palette/info/light":         "#65C4DB",
  "palette/info/dark":          "#2D6B7A",
  "palette/info/contrast-text": "#1F1A14",

  // Success
  "palette/success/main":          "#99D35F",
  "palette/success/contrast-text": "#FFFFFF",

  // Text
  "palette/text/primary":   "#1F1A14",  // warm ink — body copy, headings
  "palette/text/secondary":  "#6B5E4A",  // supporting / descriptive text
  "palette/text/disabled":   "#BFB197",  // inactive labels

};
// --- END OF TOKEN SECTION --------------------------------------------------


// -- Script logic - no need to edit below this line -------------------------

function hexToRgba(hex) {
  hex = hex.replace('#', '');
  let r, g, b, a = 1;
  if (hex.length === 8) {
    r = parseInt(hex.slice(0, 2), 16) / 255;
    g = parseInt(hex.slice(2, 4), 16) / 255;
    b = parseInt(hex.slice(4, 6), 16) / 255;
    a = parseInt(hex.slice(6, 8), 16) / 255;
  } else {
    r = parseInt(hex.slice(0, 2), 16) / 255;
    g = parseInt(hex.slice(2, 4), 16) / 255;
    b = parseInt(hex.slice(4, 6), 16) / 255;
  }
  return { r, g, b, a };
}

// Get or create the collection
let collection = figma.variables.getLocalVariableCollections()
  .find(c => c.name === COLLECTION_NAME);

if (!collection) {
  collection = figma.variables.createVariableCollection(COLLECTION_NAME);
  collection.renameMode(collection.modes[0].modeId, MODE_NAME);
  console.log(`Created new collection: "${COLLECTION_NAME}"`);
} else {
  console.log(`Found existing collection: "${COLLECTION_NAME}"`);
}

const modeId = collection.modes[0].modeId;

// Index existing variables by name for fast lookup
const existingVars = {};
for (const v of figma.variables.getLocalVariables('COLOR')) {
  if (v.variableCollectionId === collection.id) {
    existingVars[v.name] = v;
  }
}

function valuesMatch(current, next) {
  // Compare with small tolerance for floating point rounding
  const close = (a, b) => Math.abs(a - b) < 0.002;
  return close(current.r, next.r)
      && close(current.g, next.g)
      && close(current.b, next.b)
      && close(current.a || 1, next.a);
}

let created = 0, updated = 0, skipped = 0, errors = 0;

for (const [name, hex] of Object.entries(TOKENS)) {
  try {
    const rgba = hexToRgba(hex);
    let variable = existingVars[name];

    if (!variable) {
      // New token — create it
      variable = figma.variables.createVariable(name, collection, 'COLOR');
      variable.setValueForMode(modeId, rgba);
      created++;
      console.log('  + Created: ' + name);
    } else {
      // Existing token — only write if value changed
      const current = variable.valuesByMode[modeId];
      if (current && valuesMatch(current, rgba)) {
        skipped++;
        // console.log('  = Unchanged: ' + name); // uncomment to debug
      } else {
        variable.setValueForMode(modeId, rgba);
        updated++;
        console.log('  ~ Updated: ' + name + '  (' + hex + ')');
      }
    }

  } catch (e) {
    errors++;
    console.error(`  ✗ Error on ${name}: ${e.message}`);
  }
}

const summary = created + ' created, ' + updated + ' updated, ' + skipped + ' unchanged'
  + (errors > 0 ? ', ' + errors + ' errors' : '');
console.log('Done: ' + summary);
figma.notify('Tokens synced — ' + summary, { timeout: 4000 });
figma.closePlugin();
