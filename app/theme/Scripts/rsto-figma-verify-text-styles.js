// ===========================================================================
// RSTO TEXT STYLE VERIFIER
// Run in Scripter — outputs a comparison table to the console showing
// every Typography/* style with its actual Figma values vs expected values.
// ===========================================================================

const EXPECTED = {
  "Typography/h1":       { family: "Fraunces",   style: "Regular",  size: 32, lineHeight: 40,  letterSpacing: 2  },
  "Typography/h2":       { family: "Open Sans",   style: "Bold",     size: 32, lineHeight: 40,  letterSpacing: -1 },
  "Typography/h3":       { family: "Open Sans",   style: "Bold",     size: 24, lineHeight: 32,  letterSpacing: 0  },
  "Typography/h4":       { family: "Open Sans",   style: "SemiBold", size: 20, lineHeight: 28,  letterSpacing: 0  },
  "Typography/h5":       { family: "Open Sans",   style: "SemiBold", size: 18, lineHeight: 24,  letterSpacing: 0  },
  "Typography/h6":       { family: "Open Sans",   style: "SemiBold", size: 16, lineHeight: 24,  letterSpacing: 0  },
  "Typography/body1":    { family: "Open Sans",   style: "Regular",  size: 16, lineHeight: 24,  letterSpacing: 1  },
  "Typography/body2":    { family: "Open Sans",   style: "Regular",  size: 14, lineHeight: 22,  letterSpacing: 1  },
  "Typography/button":      { family: "Open Sans",   style: "SemiBold", size: 14, lineHeight: 20,  letterSpacing: 2  },
  "Typography/chart-title":  { family: "Open Sans",   style: "SemiBold", size: 14, lineHeight: 20,  letterSpacing: 0  },
  "Typography/filter-label": { family: "Open Sans",   style: "Regular",  size: 11, lineHeight: 11,  letterSpacing: 0  },
  "Typography/chart-body":   { family: "Open Sans",   style: "Regular",  size: 12, lineHeight: 20,  letterSpacing: 0  },
  "Typography/caption":  { family: "Open Sans",   style: "Regular",  size: 12, lineHeight: 18,  letterSpacing: 2  },
  "Typography/overline": { family: "Open Sans",   style: "SemiBold", size: 11, lineHeight: 16,  letterSpacing: 8  },
  "Typography/eyebrow":  { family: "Open Sans",   style: "SemiBold", size: 11, lineHeight: 11,  letterSpacing: 3  },
};

const styles = figma.getLocalTextStyles()
  .filter(s => s.name.startsWith("Typography/"))
  .sort((a, b) => a.name.localeCompare(b.name));

let allPass = true;
const rows = [];

for (const s of styles) {
  const exp = EXPECTED[s.name];
  if (!exp) {
    rows.push({ name: s.name, status: "? UNKNOWN", detail: "not in expected list" });
    continue;
  }

  const lh = s.lineHeight.unit === "PIXELS" ? s.lineHeight.value : "auto";
  const ls = s.letterSpacing.unit === "PERCENT" ? s.letterSpacing.value : 0;

  const checks = [
    { prop: "family",        got: s.fontName.family,     exp: exp.family        },
    { prop: "weight",        got: s.fontName.style,      exp: exp.style         },
    { prop: "size",          got: s.fontSize,            exp: exp.size          },
    { prop: "lineHeight",    got: lh,                    exp: exp.lineHeight    },
    { prop: "letterSpacing", got: Math.round(ls * 10) / 10, exp: exp.letterSpacing },
  ];

  const fails = checks.filter(c => c.got !== c.exp);

  if (fails.length === 0) {
    rows.push({ name: s.name, status: "PASS", detail: s.fontName.family + " " + s.fontName.style + " " + s.fontSize + "/" + lh + " +" + ls + "%" });
  } else {
    allPass = false;
    const detail = fails.map(f => f.prop + ": got " + f.got + " expected " + f.exp).join(" | ");
    rows.push({ name: s.name, status: "FAIL", detail });
  }
}

// Check for missing styles
for (const name of Object.keys(EXPECTED)) {
  if (!styles.find(s => s.name === name)) {
    allPass = false;
    rows.push({ name, status: "MISSING", detail: "style not found in file" });
  }
}

console.log("=== RSTO Typography Style Verification ===\n");
for (const row of rows) {
  const icon = row.status === "PASS" ? "✓" : row.status === "MISSING" ? "!" : row.status === "FAIL" ? "x" : "?";
  console.log(icon + " " + row.status.padEnd(8) + row.name.padEnd(28) + row.detail);
}
console.log("\n" + (allPass ? "All styles pass." : "Some styles need attention — check above."));

figma.notify(allPass ? "All text styles verified" : "Some styles need fixing — check Scripter console", { timeout: 4000 });
figma.closePlugin();
