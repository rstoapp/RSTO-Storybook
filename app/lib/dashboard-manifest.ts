/**
 * dashboard-manifest.ts
 *
 * Type definitions for AI-generated dashboard manifests.
 *
 * An AI receives the user's natural-language query plus a description of
 * every widget type below, then returns a `DashboardManifest` object.
 * The `DynamicDashboard` renderer turns that manifest into real RSTO components.
 *
 * ── Layout model ────────────────────────────────────────────────────────────
 *
 *  DashboardManifest
 *  └── rows: DashboardRow[]          ← vertical stack of rows
 *       └── widgets: DashboardWidget[]  ← widgets sit side-by-side in a row
 *            └── span?: 3 | 4 | 6 | 8 | 12   ← MUI Grid column width (default 12)
 *
 *  A single-column row:  [{ type: 'heading', span: 12, ... }]
 *  A two-column row:     [{ type: 'chart', span: 6, ... }, { type: 'insight', span: 6, ... }]
 *  A three-column row:   [{ type: 'stat', span: 4, ... }, ...]
 *
 * ── AI usage notes ──────────────────────────────────────────────────────────
 *
 *  • Use 'heading' at the top of each logical section.
 *  • Use 'stat-row' for a quick KPI summary (3–5 numbers at a glance).
 *  • Use 'chart' for trend or distribution data.
 *    - 'bar'            → stacked vertical bars; good for comparing groups over time
 *    - 'line'           → percentage trend lines (y-axis is always 0–100 %)
 *    - 'horizontal-bar' → ranked categories; good for showing spread across groups
 *  • Use 'insight' for qualitative observations or AI-generated commentary.
 *  • Use 'info' for neutral contextual notes (blue card).
 *  • Use 'warning' for alerts, caveats, or data-quality flags (orange card).
 */

import { ChartData } from 'chart.js';

// ── Span ─────────────────────────────────────────────────────────────────────

/** MUI Grid column widths. 12 = full row, 6 = half, 4 = one-third, etc. */
export type WidgetSpan = 3 | 4 | 6 | 8 | 12;

// ── Widget definitions ────────────────────────────────────────────────────────

interface BaseWidget {
    /** MUI Grid column span. Defaults to 12 (full width). */
    span?: WidgetSpan;
}

/** Section heading with optional category chips. */
export interface HeadingWidget extends BaseWidget {
    type: 'heading';
    text: string;
    /** Short tags shown as outlined chips beneath the heading. */
    chips?: string[];
}

/** A horizontal row of key statistics (label + value pairs). */
export interface StatRowWidget extends BaseWidget {
    type: 'stat-row';
    stats: Array<{ label: string; value: string }>;
}

/** AI-generated or qualitative observation, rendered as a blue InsightCard. */
export interface InsightWidget extends BaseWidget {
    type: 'insight';
    /** Small uppercase label above the title. Defaults to "Insight". */
    insightName?: string;
    title: string;
    description: string;
}

/** Neutral contextual information, rendered as a blue InfoCard. */
export interface InfoWidget extends BaseWidget {
    type: 'info';
    heading: string;
    body: string;
}

/** Alert, caveat, or data-quality flag, rendered as an orange WarningCard. */
export interface WarningWidget extends BaseWidget {
    type: 'warning';
    heading: string;
    body: string;
}

/** A chart wrapped in a ChartCard. Provide Chart.js-compatible `data`. */
export interface ChartWidget extends BaseWidget {
    type: 'chart';
    /** Which chart variant to render. */
    chartType: 'bar' | 'line' | 'horizontal-bar';
    /** Small uppercase label in the card header. Defaults to "Chart". */
    chartName?: string;
    title: string;
    subtitle?: string;
    /** Chart.js ChartData object (labels + datasets). */
    data: ChartData;
}

/** Union of all renderable widget types. */
export type DashboardWidget =
    | HeadingWidget
    | StatRowWidget
    | InsightWidget
    | InfoWidget
    | WarningWidget
    | ChartWidget;

// ── Row & Manifest ────────────────────────────────────────────────────────────

/** A horizontal row of widgets. Each widget's `span` controls relative width. */
export interface DashboardRow {
    widgets: DashboardWidget[];
}

/**
 * The top-level manifest produced by the AI and consumed by `DynamicDashboard`.
 *
 * Example:
 * ```json
 * {
 *   "title": "Service Provider Performance — Q1 2025",
 *   "description": "Summary of Community Care provider metrics for Q1.",
 *   "rows": [
 *     { "widgets": [{ "type": "heading", "text": "Q1 Overview", "chips": ["Community Care", "Q1 2025"] }] },
 *     { "widgets": [
 *         { "type": "stat-row", "stats": [{ "label": "Providers", "value": "142" }, { "label": "Avg score", "value": "78%" }] }
 *     ]},
 *     { "widgets": [
 *         { "type": "chart", "span": 6, "chartType": "bar", "title": "Score by region", "data": { ... } },
 *         { "type": "insight", "span": 6, "title": "Metro regions outperforming", "description": "..." }
 *     ]}
 *   ]
 * }
 * ```
 */
export interface DashboardManifest {
    /** Optional dashboard title shown above the content. */
    title?: string;
    /** One-line description of what question this dashboard answers. */
    description?: string;
    rows: DashboardRow[];
}

// ── Runtime validation guards ─────────────────────────────────────────────────

const VALID_TYPES = new Set(['heading', 'stat-row', 'insight', 'info', 'warning', 'chart']);
const VALID_CHART_TYPES = new Set(['bar', 'line', 'horizontal-bar']);
const VALID_SPANS = new Set([3, 4, 6, 8, 12]);

function isValidSpan(span: unknown): span is WidgetSpan {
    return span === undefined || VALID_SPANS.has(span as number);
}

function validateWidget(widget: unknown, rowIndex: number, widgetIndex: number): DashboardWidget {
    if (typeof widget !== 'object' || widget === null) {
        throw new Error(`Row ${rowIndex}, widget ${widgetIndex}: expected an object.`);
    }

    const w = widget as Record<string, unknown>;

    if (!VALID_TYPES.has(w.type as string)) {
        throw new Error(
            `Row ${rowIndex}, widget ${widgetIndex}: unknown type "${w.type}". Valid types: heading, stat-row, insight, info, warning, chart.`
        );
    }

    if (!isValidSpan(w.span)) {
        throw new Error(
            `Row ${rowIndex}, widget ${widgetIndex}: invalid span "${w.span}". Valid values: 3, 4, 6, 8, 12.`
        );
    }

    if (w.type === 'chart' && !VALID_CHART_TYPES.has(w.chartType as string)) {
        throw new Error(
            `Row ${rowIndex}, widget ${widgetIndex}: invalid chartType "${w.chartType}". Valid: bar, line, horizontal-bar.`
        );
    }

    return w as unknown as DashboardWidget;
}

/**
 * Validates an AI-generated manifest at runtime.
 * Throws a descriptive error if the manifest is malformed.
 * Returns the manifest typed as `DashboardManifest` if valid.
 */
export function validateManifest(raw: unknown): DashboardManifest {
    if (typeof raw !== 'object' || raw === null) {
        throw new Error('Manifest must be a non-null object.');
    }

    const manifest = raw as Record<string, unknown>;

    if (!Array.isArray(manifest.rows)) {
        throw new Error('Manifest must have a "rows" array.');
    }

    manifest.rows.forEach((row: unknown, rowIndex: number) => {
        if (typeof row !== 'object' || row === null || !Array.isArray((row as Record<string, unknown>).widgets)) {
            throw new Error(`Row ${rowIndex}: must have a "widgets" array.`);
        }
        (row as Record<string, unknown[]>).widgets.forEach((widget, widgetIndex) => {
            validateWidget(widget, rowIndex, widgetIndex);
        });
    });

    return raw as DashboardManifest;
}
