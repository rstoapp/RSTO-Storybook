/**
 * RSTO — Weekly Attendance Chart Figma Plugin  v3
 *
 * Changes vs v2:
 *  - Data synced with current ReferenceScaleWithTotalLine story (~835/week full-term)
 *  - X-axis labels: CCW 45° (Chart.js applies -labelRotation internally, so
 *    maxRotation:45 → actual canvas rotation = -45° CCW). Right end of label
 *    anchors to bar tick; text extends lower-left. Requires xt.width, so we
 *    append to frame first then compute the relativeTransform.
 *  - White bar strokes removed (Chart.js 0.5px border is sub-pixel; looks clean
 *    in browser but 1px in Figma was too prominent).
 *  - Y_MAX = 1000 to match Chart.js auto-scale for ~835 max total.
 *
 * Install: Plugins › Development › Import plugin from manifest… → select manifest.json
 * Run:     Plugins › Development › RSTO — Weekly Attendance Chart
 */

// ── Layout ─────────────────────────────────────────────────────────────────────
const FRAME_W = 1300;
const FRAME_H = 900;
const ML = 84;   // left  (Y-axis labels)
const MR = 40;   // right
const MT = 52;   // top
const MB = 300;  // bottom (x-axis labels + legend)
const CW = FRAME_W - ML - MR;   // 1176
const CH = FRAME_H - MT - MB;   // 548

// ── Palette ─────────────────────────────────────────────────────────────────────
const HEATMAP_COLORS = [
  '#1E5C3A', // 30+ hrs
  '#3A8C5A', // 25–<30
  '#72B890', // 15–<25
  '#4A9090', // 13–<15
  '#5A9EAF', // 10–<13
  '#E8A855', // 8–<10
  '#C87030', // 6–<8
  '#A04820', // 4–<6
  '#7A2808', // <4
  '#A0A49C', // Did not attend
];

const HEATMAP_NAMES = [
  '30+ hrs', '25–<30 hrs', '15–<25 hrs', '13–<15 hrs', '10–<13 hrs',
  '8–<10 hrs', '6–<8 hrs', '4–<6 hrs', '<4 hrs', 'Did not attend',
];

const STONE_50 = '#A0A49C';
const BONE     = '#EEE8DF';
const FROST    = '#FAF8F4';
const SHADOW   = '#8A7B6A';
const EARTH    = '#5C4F3A';
const WHITE    = '#FFFFFF';

const TOP_RADIUS = 4;
const Y_MAX      = 1000; // matches Chart.js auto-scale for ~835 max total

// ── Data — synced with ReferenceScaleWithTotalLine story ──────────────────────
// Proportional distribution per full term week (~835 total):
//   30+: 23% · 25–30: 6.5% · 15–25: 18% · 13–15: 20.5% · 10–13: 18%
//   8–10: 5% · 6–8: 2.5% · 4–6: 1.8% · <4: 1.2% · DnA: 3.5%
// Pattern: term weeks ~835 · mid-term break wk10–11 ~505/455 · Dec ~300/0 · Jan recovery
const REF_WEEKS = [
  '28 Jul 2025',  '4 Aug 2025',  '11 Aug 2025', '18 Aug 2025', '25 Aug 2025',
  '1 Sept 2025',  '8 Sept 2025', '15 Sept 2025','22 Sept 2025','29 Sept 2025',
  '6 Oct 2025',  '13 Oct 2025', '20 Oct 2025', '27 Oct 2025',
  '3 Nov 2025',  '10 Nov 2025', '17 Nov 2025', '24 Nov 2025',
  '1 Dec 2025',   '8 Dec 2025', '15 Dec 2025', '22 Dec 2025', '29 Dec 2025',
  '5 Jan 2026',  '12 Jan 2026', '19 Jan 2026', '26 Jan 2026',
];

const REF_DATA = [
  // 30+ hrs
  [ 97,195,190,192,195,191,195,192,191,115,105,191,195,190,192,195,192,191,195,190,180, 70,  0, 70, 70, 72,125],
  // 25–<30 hrs
  [ 27, 55, 55, 54, 55, 54, 55, 55, 54, 33, 30, 54, 55, 55, 54, 55, 55, 54, 55, 55, 52, 20,  0, 20, 20, 20, 35],
  // 15–<25 hrs
  [ 76,150,150,149,150,147,150,148,149, 90, 82,147,150,148,149,150,148,148,150,150,141, 54,  0, 54, 55, 57, 98],
  // 13–<15 hrs (dominant middle band ~20.5%)
  [ 86,170,171,169,170,167,170,171,169,103, 93,167,170,171,169,170,171,168,170,171,160, 62,  0, 62, 63, 64,112],
  // 10–<13 hrs (second-largest ~18%)
  [ 76,150,149,149,150,147,150,148,149, 91, 82,147,150,148,149,150,148,148,150,148,141, 54,  0, 54, 55, 56, 98],
  // 8–<10 hrs (orange threshold ~5%)
  [ 21, 42, 42, 42, 42, 41, 42, 42, 41, 25, 23, 41, 42, 42, 42, 42, 42, 41, 42, 42, 39, 15,  0, 15, 15, 16, 27],
  // 6–<8 hrs
  [ 11, 21, 21, 20, 21, 20, 21, 20, 20, 13, 11, 20, 21, 21, 20, 21, 21, 20, 21, 21, 20,  8,  0,  8,  8,  8, 14],
  // 4–<6 hrs
  [  8, 15, 15, 15, 15, 15, 15, 15, 15,  9,  8, 15, 15, 15, 15, 15, 15, 15, 15, 15, 14,  5,  0,  5,  5,  6, 10],
  // <4 hrs
  [  5, 10, 10, 10, 10, 10, 10, 10, 10,  6,  6, 10, 10, 10, 10, 10, 10, 10, 10, 10,  9,  4,  0,  4,  4,  4,  7],
  // Did not attend
  [ 13, 27, 32, 30, 27, 28, 27, 34, 32, 20, 15, 28, 27, 35, 30, 27, 33, 35, 27, 33, 29,  8,  0,  8, 10, 12, 19],
];

// ── Derived ────────────────────────────────────────────────────────────────────
const NUM_WEEKS = REF_WEEKS.length; // 27

const TOTALS = Array.from({ length: NUM_WEEKS }, (_, i) =>
  REF_DATA.reduce((s, band) => s + band[i], 0)
);

const BAR_GAP = 4;
const BAR_W   = (CW - BAR_GAP * (NUM_WEEKS - 1)) / NUM_WEEKS;

// ── Coordinate helpers ─────────────────────────────────────────────────────────
const barLeft    = (i) => ML + i * (BAR_W + BAR_GAP);
const barCenterX = (i) => barLeft(i) + BAR_W / 2;
const chartBot   = ()  => MT + CH;
const valToY     = (v) => MT + CH * (1 - v / Y_MAX);

// ── Paint helper ───────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16) / 255,
    g: parseInt(hex.slice(3, 5), 16) / 255,
    b: parseInt(hex.slice(5, 7), 16) / 255,
  };
}
function paint(hex, opacity = 1) {
  return { type: 'SOLID', color: hexToRgb(hex), opacity };
}

// ── Rotation helper ────────────────────────────────────────────────────────────
// Chart.js calls ctx.rotate(-labelRotation * π/180) so maxRotation:45 renders
// as CCW 45° in canvas. The label's RIGHT end sits at the tick; text extends
// lower-left. We anchor local(W, 0) [top-right] to (ax, ay).
//
// CCW 45° relativeTransform in Figma (y-down, CW-positive):
//   a = cos(-45°) =  0.7071   b = -sin(-45°) = 0.7071
//   c = sin(-45°) = -0.7071   d =  cos(-45°) = 0.7071
//
// Solving for tx, ty so local(W, 0) → (ax, ay):
//   tx = ax - 0.7071·W
//   ty = ay + 0.7071·W

const C45 = Math.cos(45 * Math.PI / 180); // 0.70711

function ccwLabel(ax, ay, W) {
  return [
    [ C45,  C45, ax - C45 * W],
    [-C45,  C45, ay + C45 * W],
  ];
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  await figma.loadFontAsync({ family: 'Open Sans', style: 'Regular' });

  // Root frame
  const frame = figma.createFrame();
  frame.name         = 'WeeklyAttendanceChart / Reference Scale — Jul 2025–Jan 2026';
  frame.resize(FRAME_W, FRAME_H);
  frame.fills        = [paint(WHITE)];
  frame.clipsContent = false;
  figma.currentPage.appendChild(frame);

  // ── Chart-area frost background ───────────────────────────────────────────────
  const bg = figma.createRectangle();
  bg.name  = '_chart-bg';
  bg.resize(CW, CH);
  bg.x     = ML;
  bg.y     = MT;
  bg.fills = [paint(FROST)];
  frame.appendChild(bg);

  // ── Y-axis gridlines + tick labels ───────────────────────────────────────────
  for (let v = 0; v <= Y_MAX; v += 100) {
    const gy = valToY(v);

    const gl = figma.createRectangle();
    gl.name  = `gridline — ${v}`;
    gl.resize(CW, 1);
    gl.x     = ML;
    gl.y     = gy;
    gl.fills = [paint(BONE)];
    frame.appendChild(gl);

    const yt = figma.createText();
    frame.appendChild(yt);
    yt.name                = `y-label — ${v}`;
    yt.fontName            = { family: 'Open Sans', style: 'Regular' };
    yt.fontSize            = 11;
    yt.textAlignHorizontal = 'RIGHT';
    yt.resize(66, 16);
    yt.fills               = [paint(SHADOW)];
    yt.characters          = String(v);
    yt.x                   = ML - 76;
    yt.y                   = gy - 8;
  }

  // ── Stacked bars ──────────────────────────────────────────────────────────────
  const topBand = Array.from({ length: NUM_WEEKS }, (_, i) => {
    for (let j = 9; j >= 0; j--) if (REF_DATA[j][i] > 0) return j;
    return -1;
  });

  for (let i = 0; i < NUM_WEEKS; i++) {
    let cumH = 0;
    const bx = barLeft(i);

    for (let j = 0; j <= 9; j++) {
      const val = REF_DATA[j][i];
      if (val === 0) continue;

      const barH  = Math.max((val / Y_MAX) * CH, 1);
      const op    = j === 9 ? 0.55 : 0.92;
      const isTop = j === topBand[i];

      const rect = figma.createRectangle();
      rect.name   = `${REF_WEEKS[i]} | ${HEATMAP_NAMES[j]}`;
      rect.resize(BAR_W, barH);
      rect.x      = bx;
      rect.y      = chartBot() - cumH - barH;
      rect.fills  = [paint(HEATMAP_COLORS[j], op)];
      // No stroke — Chart.js 0.5px border is sub-pixel and visually clean;
      // 1px in Figma was too prominent.

      if (isTop) {
        rect.topLeftRadius  = TOP_RADIUS;
        rect.topRightRadius = TOP_RADIUS;
      }

      frame.appendChild(rect);
      cumH += barH;
    }
  }

  // ── Reference line (Total number of children) ─────────────────────────────────
  const lineVerts = REF_WEEKS.map((_, i) => ({
    x:               barCenterX(i),
    y:               valToY(TOTALS[i]),
    strokeCap:       'ROUND',
    strokeJoin:      'ROUND',
    cornerRadius:    0,
    handleMirroring: 'NONE',
  }));

  const lineSegs = lineVerts.slice(1).map((_, i) => ({ start: i, end: i + 1 }));

  const refLine = figma.createVector();
  refLine.name  = 'Total number of children — line';
  await refLine.setVectorNetworkAsync({ vertices: lineVerts, segments: lineSegs, regions: [] });
  refLine.fills        = [];
  refLine.strokes      = [paint(STONE_50)];
  refLine.strokeWeight = 2;
  refLine.dashPattern  = [4, 3];
  frame.appendChild(refLine);

  // Data-point circles (diameter 9, white 2 px outside stroke)
  for (let i = 0; i < NUM_WEEKS; i++) {
    const D  = 9;
    const cx = barCenterX(i);
    const cy = valToY(TOTALS[i]);

    const dot = figma.createEllipse();
    dot.name         = `ref-point — ${REF_WEEKS[i]}`;
    dot.resize(D, D);
    dot.x            = cx - D / 2;
    dot.y            = cy - D / 2;
    dot.fills        = [paint(STONE_50)];
    dot.strokes      = [paint(WHITE)];
    dot.strokeWeight = 2;
    dot.strokeAlign  = 'OUTSIDE';
    frame.appendChild(dot);
  }

  // ── X-axis labels — CCW 45° via relativeTransform ────────────────────────────
  // append FIRST so xt.width reflects font metrics, then set the transform.
  // Anchor: text top-right → (barCenterX, chartBot + 6). Text extends lower-left.
  const LABEL_ANCHOR_Y = chartBot() + 6;

  for (let i = 0; i < NUM_WEEKS; i++) {
    const xt = figma.createText();
    frame.appendChild(xt);
    xt.name       = `x-label — ${REF_WEEKS[i]}`;
    xt.fontName   = { family: 'Open Sans', style: 'Regular' };
    xt.fontSize   = 11;
    xt.fills      = [paint(SHADOW)];
    xt.characters = REF_WEEKS[i];
    // width is now accurate — compute CCW transform anchored at top-right
    xt.relativeTransform = ccwLabel(barCenterX(i), LABEL_ANCHOR_Y, xt.width);
  }

  // ── Legend ────────────────────────────────────────────────────────────────────
  const LEGEND_Y    = FRAME_H - 110;
  const SWATCH_SZ   = 12;
  const LEGEND_COLS = 5;
  const COL_W       = CW / LEGEND_COLS;

  for (let j = 0; j < HEATMAP_NAMES.length; j++) {
    const col = j % LEGEND_COLS;
    const row = Math.floor(j / LEGEND_COLS);
    const lx  = ML + col * COL_W;
    const ly  = LEGEND_Y + row * 24;
    const op  = j === 9 ? 0.55 : 1;

    const sw = figma.createRectangle();
    sw.name         = `legend-swatch — ${HEATMAP_NAMES[j]}`;
    sw.resize(SWATCH_SZ, SWATCH_SZ);
    sw.x            = lx;
    sw.y            = ly + 3;
    sw.fills        = [paint(HEATMAP_COLORS[j], op)];
    sw.cornerRadius = 2;
    frame.appendChild(sw);

    const lb = figma.createText();
    frame.appendChild(lb);
    lb.name       = `legend-label — ${HEATMAP_NAMES[j]}`;
    lb.fontName   = { family: 'Open Sans', style: 'Regular' };
    lb.fontSize   = 11;
    lb.fills      = [paint(EARTH)];
    lb.characters = HEATMAP_NAMES[j];
    lb.x          = lx + SWATCH_SZ + 6;
    lb.y          = ly;
  }

  // Reference-line legend entry
  const refLY = LEGEND_Y + 2 * 24;
  const refLX = ML;

  const refSw = figma.createRectangle();
  refSw.name   = 'legend-swatch — Total number of children';
  refSw.resize(20, 2);
  refSw.x      = refLX + 1;
  refSw.y      = refLY + 9;
  refSw.fills  = [paint(STONE_50)];
  frame.appendChild(refSw);

  const refLb = figma.createText();
  frame.appendChild(refLb);
  refLb.name       = 'legend-label — Total number of children';
  refLb.fontName   = { family: 'Open Sans', style: 'Regular' };
  refLb.fontSize   = 11;
  refLb.fills      = [paint(EARTH)];
  refLb.characters = 'Total number of children';
  refLb.x          = refLX + 27;
  refLb.y          = refLY;

  // ── Done ─────────────────────────────────────────────────────────────────────
  figma.viewport.scrollAndZoomIntoView([frame]);
  figma.closePlugin('Weekly Attendance Chart generated ✓');
}

main().catch((err) => figma.closePlugin(`Error: ${err.message}`));
