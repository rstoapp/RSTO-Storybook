// ===========================================================================
// RSTO SPACING TOKEN SYNC - Figma Variables
// ===========================================================================
//
// HOW TO USE:
//   1. Open Scripter (Plugins > Scripter)
//   2. Paste this script and click Run
//   3. Re-run any time the spacing scale changes
//
// WHAT IT DOES:
//   - Creates or updates spacing variables in the "Spacing" collection
//   - Variables are FLOAT type (pixel values) for use as width/height/padding
//   - Named as spacing/[multiplier] to match theme.spacing() in code
//   - Uses existing "Spacing" collection if present, creates it if not
//   - Safe to re-run: updates existing, never duplicates
//
// SOURCE: Spacing.stories.tsx
//   steps = [0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 10, 12]
//   base  = 8px (MUI default — theme.spacing(1) = 8px)
//
// TO UPDATE: edit SPACING_TOKENS below if the scale changes
// ===========================================================================

const COLLECTION_NAME = "Spacing";
const MODE_NAME       = "Default";

// --- UPDATE THIS SECTION IF THE SPACING SCALE CHANGES ----------------------
// Format: { name, value (px), description }
// name follows spacing/[multiplier] to match theme.spacing() calls in code

const SPACING_TOKENS = [
  { name: "spacing/half", value:  4,  description: "theme.spacing(0.5) — 4px.  Micro gap: icon padding, tight list spacing" },
  { name: "spacing/1",   value:  8,  description: "theme.spacing(1)   — 8px.  Base unit: small gaps, icon margins" },
  { name: "spacing/1-5", value: 12,  description: "theme.spacing(1.5) — 12px. Compact padding: dense list items, badge offset" },
  { name: "spacing/2",   value: 16,  description: "theme.spacing(2)   — 16px. Default padding: form fields, card internal spacing" },
  { name: "spacing/3",   value: 24,  description: "theme.spacing(3)   — 24px. Section gap: between form groups, card padding" },
  { name: "spacing/4",   value: 32,  description: "theme.spacing(4)   — 32px. Component gap: between cards, between sections" },
  { name: "spacing/5",   value: 40,  description: "theme.spacing(5)   — 40px. Medium layout gap" },
  { name: "spacing/6",   value: 48,  description: "theme.spacing(6)   — 48px. Large layout gap: section padding, page margins" },
  { name: "spacing/7",   value: 56,  description: "theme.spacing(7)   — 56px." },
  { name: "spacing/8",   value: 64,  description: "theme.spacing(8)   — 64px. Page section gap: major layout divisions" },
  { name: "spacing/10",  value: 80,  description: "theme.spacing(10)  — 80px. Hero spacing, page-level padding" },
  { name: "spacing/12",  value: 96,  description: "theme.spacing(12)  — 96px. Maximum spacing: top/bottom page padding" },
];
// --- END OF SPACING SECTION ------------------------------------------------


// -- Script logic - no need to edit below this line -------------------------

// Get or create the Spacing collection
let collection = figma.variables.getLocalVariableCollections()
  .find(c => c.name === COLLECTION_NAME);

if (!collection) {
  collection = figma.variables.createVariableCollection(COLLECTION_NAME);
  collection.renameMode(collection.modes[0].modeId, MODE_NAME);
  console.log("Created new collection: " + COLLECTION_NAME);
} else {
  console.log("Found existing collection: " + COLLECTION_NAME + " (" + collection.modes[0].name + " mode)");
}

const modeId = collection.modes[0].modeId;

// Index existing float variables by name
const existingVars = {};
for (const v of figma.variables.getLocalVariables("FLOAT")) {
  if (v.variableCollectionId === collection.id) {
    existingVars[v.name] = v;
  }
}

let created = 0, updated = 0, errors = 0;

for (const token of SPACING_TOKENS) {
  try {
    let variable = existingVars[token.name];

    if (!variable) {
      variable = figma.variables.createVariable(token.name, collection, "FLOAT");
      created++;
      console.log("  + Created: " + token.name + " = " + token.value + "px");
    } else {
      updated++;
      console.log("  ~ Updated: " + token.name + " = " + token.value + "px");
    }

    variable.setValueForMode(modeId, token.value);
    variable.description = token.description;

  } catch (e) {
    errors++;
    console.error("  Error on " + token.name + ": " + e.message);
  }
}

const summary = "RSTO spacing tokens synced - "
  + created + " created, "
  + updated + " updated"
  + (errors > 0 ? ", " + errors + " errors" : "");

console.log(summary);
figma.notify(summary, { timeout: 4000 });
figma.closePlugin();
