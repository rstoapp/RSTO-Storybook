// ===========================================================================
// RSTO CHART TOKEN SYNC - Figma Variables
// ===========================================================================
//
// HOW TO USE:
//   1. Open Scripter (Plugins > Scripter)
//   2. Paste this script and click Run
//   3. Re-run whenever chart-theme.ts changes
//
// WHAT IT DOES:
//   - Adds chart colour tokens to the "RSTO Design Tokens" collection
//   - Organised under a chart/ prefix — appears as a separate group
//   - 5 groups: surface, semantic, stack, series, heatmap
//   - Only writes variables whose values have changed (no duplicates)
//
// SOURCE: app/components/organisms/charts/chart-theme.ts
// ===========================================================================

const COLLECTION_NAME = "Chart Tokens";

// --- UPDATE THIS SECTION WHEN chart-theme.ts CHANGES ----------------------

const CHART_TOKENS = {

  // ── Neutral surface tokens (the P object in chart-theme.ts) ──────────────
  // Used for backgrounds, gridlines, labels, tooltips — not data colours.
  "chart/surface/paper":   "#FFFFFF",  // Card background
  "chart/surface/frost":   "#FAF8F4",  // Skeleton/loading background
  "chart/surface/linen":   "#F7F3ED",  // Empty state background
  "chart/surface/bone":    "#EEE8DF",  // Gridlines, tooltip background
  "chart/surface/sand":    "#E0D8CC",  // Card border, tooltip border
  "chart/surface/stone":   "#A0A49C",  // Reference lines, decorative
  "chart/surface/shadow":  "#8A7B6A",  // Axis ticks, legend text — 4.8:1 AA
  "chart/surface/earth":   "#5C4F3A",  // Tooltip body text
  "chart/surface/bark":    "#3D3028",  // Card title
  "chart/surface/ink":     "#2C2416",  // Tooltip title, filter values
  "chart/surface/orange":  "#C06010",  // RSTO brand orange — decorative elements
  "chart/surface/eyebrow": "#9A4D0A",  // Eyebrow label + icon — 4.5:1 AA

  // ── Semantic RAG palette ──────────────────────────────────────────────────
  // Use when colour carries meaning (performance status, fidelity).
  // Apply consistently across all chart types.
  //
  // Progression: On track → Neutral → Caution → Needs attention
  //              Cool (sage)           Warm (rust)
  "chart/semantic/positive":  "#3A5E52",  // Deep sage  — On track / above threshold
  "chart/semantic/neutral":   "#4A8EA8",  // Teal-blue  — Right direction / neutral
  "chart/semantic/caution":   "#C07840",  // Burnt clay — Below threshold / caution
  "chart/semantic/attention": "#8C3A18",  // Deep rust  — Critical / needs attention
  "chart/semantic/reference": "#A0A49C",  // Stone 50   — Reference lines / totals

  // ── Stacked bar series ────────────────────────────────────────────────────
  // For BarChart and WeeklyAttendanceChart stacked series.
  // stack/1 = bottom/dominant → stack/5 = top/smallest
  // Cool (positive) → warm (concern) direction.
  "chart/stack/1": "#3A5E52",  // Deep sage  (Sage 70)   — dominant/positive
  "chart/stack/2": "#567A6E",  // Mid sage   (Sage 60)
  "chart/stack/3": "#4A8EA8",  // Teal-blue  (Blue 55)
  "chart/stack/4": "#C07840",  // Burnt clay (Amber 55)
  "chart/stack/5": "#8C3A18",  // Deep rust  (Amber 75)  — top/concern

  // ── Multi-series palette ──────────────────────────────────────────────────
  // For LineChart and MultiLineChart.
  // Assign by performance rank: series/1 = highest, series/6 = lowest.
  // series/3 and series/6 are decorative only (low contrast on white).
  "chart/series/1": "#2E6878",  // Blue 70   — top performer (5.8:1 AAA)
  "chart/series/2": "#5A9EAF",  // Blue 55   — mid-range
  "chart/series/3": "#8BBFCC",  // Blue 38   — decorative only
  "chart/series/4": "#8F4E2A",  // Amber 75  — contrasting warm
  "chart/series/5": "#D4844A",  // Amber 55  — mid-warm
  "chart/series/6": "#E8B48A",  // Amber 35  — decorative only

  // ── Heatmap scale (WeeklyAttendanceChart / attendance) ───────────────────
  // 10 steps ordered by hours attended. Sage (high) → amber (low) → stone (absent).
  // heatmap/01 = highest attendance, heatmap/10 = did not attend.
  "chart/heatmap/01": "#284E44",  // Sage 80  — 30+ hrs        (on track)
  "chart/heatmap/02": "#3D6860",  // Sage 70  — 25-<30 hrs
  "chart/heatmap/03": "#567A6E",  // Sage 60  — 15-<25 hrs
  "chart/heatmap/04": "#80A89C",  // Sage 40  — 13-<15 hrs
  "chart/heatmap/05": "#A0C4BA",  // Sage 28  — 10-<13 hrs
  "chart/heatmap/06": "#CAD8D0",  // Sage 18  — 8-<10 hrs
  "chart/heatmap/07": "#E8B48A",  // Amber 35 — 6-<8 hrs
  "chart/heatmap/08": "#C07840",  // Amber 55 — 4-<6 hrs
  "chart/heatmap/09": "#8C3A18",  // Deep rust — <4 hrs       (critical)
  "chart/heatmap/10": "#A0A49C",  // Stone 50  — Did not attend (always 55% opacity)
};

// --- END OF CHART TOKEN SECTION --------------------------------------------


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

function valuesMatch(current, next) {
  const close = (a, b) => Math.abs(a - b) < 0.002;
  return close(current.r, next.r)
      && close(current.g, next.g)
      && close(current.b, next.b)
      && close(current.a || 1, next.a);
}

// Get or create the Chart Tokens collection
let collection = figma.variables.getLocalVariableCollections()
  .find(c => c.name === COLLECTION_NAME);

if (!collection) {
  collection = figma.variables.createVariableCollection(COLLECTION_NAME);
  collection.renameMode(collection.modes[0].modeId, "Default");
  console.log('Created new collection: ' + COLLECTION_NAME);
} else {
  console.log('Found existing collection: ' + COLLECTION_NAME);
}

{
  const modeId = collection.modes[0].modeId;

  // Index existing chart variables by name
  const existingVars = {};
  for (const v of figma.variables.getLocalVariables('COLOR')) {
    if (v.variableCollectionId === collection.id) {
      existingVars[v.name] = v;
    }
  }

  let created = 0, updated = 0, skipped = 0, errors = 0;

  for (const [name, hex] of Object.entries(CHART_TOKENS)) {
    try {
      const rgba = hexToRgba(hex);
      let variable = existingVars[name];

      if (!variable) {
        variable = figma.variables.createVariable(name, collection, 'COLOR');
        variable.setValueForMode(modeId, rgba);
        created++;
        console.log('  + Created: ' + name);
      } else {
        const current = variable.valuesByMode[modeId];
        if (current && valuesMatch(current, rgba)) {
          skipped++;
        } else {
          variable.setValueForMode(modeId, rgba);
          updated++;
          console.log('  ~ Updated: ' + name + '  (' + hex + ')');
        }
      }
    } catch (e) {
      errors++;
      console.error('  Error on ' + name + ': ' + e.message);
    }
  }

  const summary = created + ' created, ' + updated + ' updated, '
    + skipped + ' unchanged'
    + (errors > 0 ? ', ' + errors + ' errors' : '');

  console.log('Chart tokens synced: ' + summary);
  figma.notify('Chart tokens synced — ' + summary, { timeout: 4000 });
  figma.closePlugin();
}
