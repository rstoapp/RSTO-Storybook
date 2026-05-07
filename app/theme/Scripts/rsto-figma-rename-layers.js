// ===========================================================================
// RSTO LAYER RENAME - Figma
// ===========================================================================
//
// HOW TO USE:
//   1. Navigate to the Atoms page in RSTO Design System 3.0
//   2. Open Scripter, paste and click Run
//   3. Check the console for a full log of every rename
//
// WHAT IT DOES:
//   - Renames inconsistent component/section names to match Storybook
//   - Fixes lowercase internal layer names to PascalCase
//   - Reports every rename and a summary at the end
//   - DRY RUN MODE: set DRY_RUN = true to preview without making changes
// ===========================================================================

const DRY_RUN = false;  // set to true to preview changes without applying them

// --- RENAME RULES ----------------------------------------------------------
// Format: { from: "exact current name", to: "new name", note: "why" }
// Matches are exact (case-sensitive). Order doesn't matter.

const RENAMES = [

  // ── Section/scaffold frame names → match Storybook exactly ──────────────
  { from: "Buttons",                    to: "Button",          note: "plural → singular (Storybook: RSTO/Atoms/Button)" },
  { from: "Badges",                     to: "Badge",           note: "plural → singular" },
  { from: "Checkboxes",                 to: "Checkbox",        note: "plural → singular" },
  { from: "Chips",                      to: "Chip",            note: "plural → singular" },
  { from: "Radio buttons",              to: "Radio",           note: "match Storybook: RSTO/Atoms/Radio" },
  { from: "Lists",                      to: "List",            note: "plural → singular" },
  { from: "Circular progress indicator",to: "CircularProgress",note: "match Storybook: RSTO/Atoms/CircularProgress" },
  { from: "Linear progress indicator",  to: "LinearProgress",  note: "match Storybook: RSTO/Atoms/LinearProgress" },
  { from: "Linear Progress",            to: "LinearProgress",  note: "match Storybook: RSTO/Atoms/LinearProgress" },
  { from: "Progress indicators",        to: "LinearProgress",  note: "old grouping name → match Storybook" },
  { from: "Date Picker",               to: "DatePicker",      note: "match Storybook: RSTO/Atoms/DatePicker" },
  { from: "Text Field",                to: "TextField",       note: "match Storybook: RSTO/Atoms/TextField" },
  { from: "Tabs horizontal",           to: "Tabs",            note: "match Storybook: RSTO/Atoms/Tabs" },
  { from: "Tooltip",                   to: "RstoTooltip",     note: "match Storybook: RSTO/Molecules/RstoTooltip" },

  // ── Lowercase internal layer names → PascalCase ──────────────────────────
  { from: "checkbox",     to: "Checkbox",   note: "internal layer → PascalCase" },
  { from: "radio",        to: "Radio",      note: "internal layer → PascalCase" },
  { from: "label",        to: "Label",      note: "internal layer → PascalCase" },
  { from: "input",        to: "Input",      note: "internal layer → PascalCase" },
  { from: "input__slot",  to: "_Input-Slot",note: "internal slot → private PascalCase" },
  { from: "textarea",     to: "Textarea",   note: "internal layer → PascalCase" },
  { from: "textarea__slot", to: "_Textarea-Slot", note: "internal slot → private PascalCase" },
  { from: "slider__thumb",to: "_Thumb",     note: "internal part → private PascalCase" },
  { from: "switch1",      to: "Switch-Track",   note: "internal part → descriptive name" },
  { from: "switch2",      to: "Switch-Thumb",   note: "internal part → descriptive name" },

  // ── Leftovers from old file / non-atom layers ────────────────────────────
  { from: ".Cota / horizontal",  to: "_Archive/Cota-Horizontal", note: "old layer → archived" },
  { from: "Status/Badge",        to: "Badge",                    note: "old name format → match Storybook" },
  { from: "Variant label",       to: "_Variant-Label",           note: "scaffold element → private" },

];
// --- END OF RENAME RULES ---------------------------------------------------


// -- Script logic -----------------------------------------------------------

const renameMap = {};
for (const rule of RENAMES) {
  renameMap[rule.from] = rule;
}

// Find all nodes on the current page
const allNodes = figma.currentPage.findAll();

let renamed = 0, skipped = 0, notFound = new Set(Object.keys(renameMap));

console.log(DRY_RUN ? "DRY RUN — no changes will be made\n" : "Applying renames...\n");

for (const node of allNodes) {
  const rule = renameMap[node.name];
  if (rule) {
    notFound.delete(rule.from);
    if (node.name === rule.to) {
      // Already correct
      skipped++;
    } else {
      console.log((DRY_RUN ? "[preview] " : "") + '"' + node.name + '" → "' + rule.to + '"  (' + rule.note + ')');
      if (!DRY_RUN) node.name = rule.to;
      renamed++;
    }
  }
}

// Report rules that didn't match anything
if (notFound.size > 0) {
  console.log("\nRules with no matching layers (may already be renamed or not on this page):");
  for (const name of notFound) {
    console.log("  ! Not found: \"" + name + "\"");
  }
}

const summary = DRY_RUN
  ? renamed + " renames previewed, " + skipped + " already correct"
  : renamed + " layers renamed, " + skipped + " already correct";

console.log("\n" + summary);
figma.notify(summary, { timeout: 4000 });
figma.closePlugin();
