// ===========================================================================
// RSTO TEXT STYLE SYNC - Figma
// ===========================================================================
//
// HOW TO USE:
//   1. Open Scripter (Plugins > Scripter)
//   2. Paste this script and click Run
//   3. Re-run whenever typography.ts changes
//
// WHAT IT DOES:
//   - Creates or updates Figma Text Styles matching typography.ts
//   - Styles appear in the right sidebar under Styles > Text styles
//   - Grouped under "Typography/" so they stay organised
//   - Safe to re-run: updates existing styles, never duplicates
//
// TO UPDATE: edit the TEXT_STYLES array below to match typography.ts
// ===========================================================================

// --- UPDATE THIS SECTION WHEN TYPOGRAPHY CHANGES --------------------------
// Source: typography.ts
// rem base = 16px | lineHeight unit = PIXELS | letterSpacing unit = PERCENT
// fontWeight 400=Regular, 600=SemiBold, 700=Bold

const TEXT_STYLES = [
  {
    name:          "Typography/h1",
    family:        "Fraunces",
    style:         "Regular",
    size:          32,      // 2rem
    lineHeight:    40,      // 2.5rem
    letterSpacing: 2,       // 0.02em
    description:   "Display heading. Fraunces serif. 32/40 +2%"
  },
  {
    name:          "Typography/h2",
    family:        "Open Sans",
    style:         "Bold",
    size:          32,      // 2rem
    lineHeight:    40,      // 2.5rem
    letterSpacing: -1,      // -0.01em
    description:   "Section heading. Open Sans Bold. 32/40 -1%"
  },
  {
    name:          "Typography/h3",
    family:        "Open Sans",
    style:         "Bold",
    size:          24,      // 1.5rem
    lineHeight:    32,      // 2rem
    letterSpacing: 0,
    description:   "Subsection heading. Open Sans Bold. 24/32"
  },
  {
    name:          "Typography/h4",
    family:        "Open Sans",
    style:         "SemiBold",
    size:          20,      // 1.25rem
    lineHeight:    28,      // 1.75rem
    letterSpacing: 0,
    description:   "Card heading. Open Sans SemiBold. 20/28"
  },
  {
    name:          "Typography/h5",
    family:        "Open Sans",
    style:         "SemiBold",
    size:          18,      // 1.125rem
    lineHeight:    24,      // 1.5rem
    letterSpacing: 0,
    description:   "Small heading. Open Sans SemiBold. 18/24"
  },
  {
    name:          "Typography/h6",
    family:        "Open Sans",
    style:         "SemiBold",
    size:          16,      // 1rem
    lineHeight:    24,      // 1.5rem
    letterSpacing: 0,
    description:   "Label heading. Open Sans SemiBold. 16/24"
  },
  {
    name:          "Typography/body1",
    family:        "Open Sans",
    style:         "Regular",
    size:          16,      // 1rem
    lineHeight:    24,      // 1.5rem
    letterSpacing: 1,       // 0.01em
    description:   "Primary body text. Open Sans Regular. 16/24 +1%"
  },
  {
    name:          "Typography/body2",
    family:        "Open Sans",
    style:         "Regular",
    size:          14,      // 0.875rem
    lineHeight:    22,      // 1.375rem
    letterSpacing: 1,       // 0.01em
    description:   "Secondary body text. Open Sans Regular. 14/22 +1%"
  },
  {
    name:          "Typography/button",
    family:        "Open Sans",
    style:         "SemiBold",
    size:          14,      // 0.875rem
    lineHeight:    20,      // 1.25rem
    letterSpacing: 2,       // 0.02em
    description:   "Button label. Open Sans SemiBold. 14/20 +2%"
  },
  {
    name:          "Typography/caption",
    family:        "Open Sans",
    style:         "Regular",
    size:          12,      // 0.75rem
    lineHeight:    18,      // 1.125rem
    letterSpacing: 2,       // 0.02em
    description:   "Caption / helper text. Open Sans Regular. 12/18 +2%"
  },
  {
    name:          "Typography/overline",
    family:        "Open Sans",
    style:         "SemiBold",
    size:          11,      // 0.6875rem
    lineHeight:    16,      // 1rem
    letterSpacing: 8,       // 0.08em
    description:   "Overline label (uppercase). Open Sans SemiBold. 11/16 +8%"
  },
  {
    name:          "Typography/chart-title",
    family:        "Open Sans",
    style:         "SemiBold",
    size:          14,      // 0.875rem — same size as button/body2
    lineHeight:    20,      // lineHeight: 1.4 * 14 = 19.6px, rounded to 20
    letterSpacing: 0,       // 0 — chart text avoids button's +2% tracking
    description:   "ChartCard title. Open Sans SemiBold. 14/20 +0%. Differs from button only in letter spacing (0 vs 2%)."
  },
  {
    name:          "Typography/filter-label",
    family:        "Open Sans",
    style:         "Regular",
    size:          11,      // same size as eyebrow/overline
    lineHeight:    11,      // lineHeight: 1 — tight
    letterSpacing: 0,       // 0 — no tracking on filter labels
    description:   "FilterChip label portion (e.g. 'Site:'). Open Sans Regular. 11/11 +0%. Pair with eyebrow for the value portion."
  },
  {
    name:          "Typography/chart-body",
    family:        "Open Sans",
    style:         "Regular",
    size:          12,      // 11.5px rounded to 12 — Figma requires whole numbers
    lineHeight:    20,      // lineHeight: 1.65 * 11.5 = 18.975, rounded to 20
    letterSpacing: 0,
    description:   "Empty state body copy in charts. Open Sans Regular. 12/20 +0%. Used inside EmptyChartState."
  },
  {
    name:          "Typography/eyebrow",
    family:        "Open Sans",
    style:         "SemiBold",
    size:          11,      // same size as overline
    lineHeight:    11,      // lineHeight: 1 — tight, no extra space
    letterSpacing: 3,       // 0.03em — tighter than overline (0.08em), not uppercase
    description:   "Eyebrow label. Open Sans SemiBold. 11/11 +3%. NOT uppercase — used above chart titles, card labels."
  },
];
// --- END OF TYPOGRAPHY SECTION --------------------------------------------


// -- Script logic - no need to edit below this line ------------------------

async function main() {
  let created = 0, updated = 0, errors = 0;

  for (const def of TEXT_STYLES) {
    try {
      // Load font before doing anything with the style
      await figma.loadFontAsync({ family: def.family, style: def.style });

      // Find existing style by name
      let textStyle = figma.getLocalTextStyles().find(s => s.name === def.name);

      if (!textStyle) {
        textStyle = figma.createTextStyle();
        textStyle.name = def.name;
        created++;
        console.log("+ Created: " + def.name);
      } else {
        updated++;
        console.log("~ Updated: " + def.name);
      }

      textStyle.fontName        = { family: def.family, style: def.style };
      textStyle.fontSize        = def.size;
      textStyle.lineHeight      = { unit: "PIXELS", value: def.lineHeight };
      textStyle.letterSpacing   = { unit: "PERCENT", value: def.letterSpacing };
      textStyle.description     = def.description || "";

    } catch (e) {
      errors++;
      console.error("Error on " + def.name + ": " + e.message);
    }
  }

  const summary = "RSTO text styles synced - "
    + created + " created, "
    + updated + " updated"
    + (errors > 0 ? ", " + errors + " errors (check font names)" : "");

  console.log(summary);
  figma.notify(summary, { timeout: 4000 });
  figma.closePlugin();
}

main();
