import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ChartLegend from './ChartLegend';
import {
    STACK_COLORS,
    SERIES_COLORS,
    SERIES_NAMES,
    SEMANTIC,
    SEMANTIC_LABELS,
    HEATMAP_COLORS,
    HEATMAP_NAMES,
} from './chart-theme';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
    title: 'RSTO/Organisms/Charts/ChartLegend',
    component: ChartLegend,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'keyboard', enabled: true },
                ],
            },
        },
        viewport: {
            viewports: {
                mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
                tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
                desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
            },
        },
        docs: {
            description: {
                component: `
**ChartLegend** — standalone React legend component for RSTO charts.

Renders outside the Chart.js canvas as real DOM elements, giving full MUI token
access, keyboard focus order, and screen-reader text. Charts using this component
must set \`plugins: { legend: { display: false } }\` to suppress the Chart.js
built-in legend.

### Design spec (matches \`makeLegend()\`)
- Swatch: 11×11 px, \`borderRadius: 3\` — rounded square
- Text: Open Sans, 11 px, \`P.shadow\` (\`#8A7B6A\`)
- Layout: flex-row, \`align: 'start'\`, wrapping, 14 px gap (standard density)

### Density variants
| Preset | Font | Gap |
|--------|------|-----|
| \`compact\`  | 10 px | 10 px |
| \`standard\` | 11 px | 14 px |
| \`generous\` | 13 px | 20 px |

### When to use
Place immediately below the chart canvas (inside ChartCard). Pass
\`items\` built from the same dataset colors used in the chart so
the legend stays in sync automatically.
                `,
            },
        },
    },
    argTypes: {
        density: {
            control: 'select',
            options: ['compact', 'standard', 'generous'],
        },
    },
} satisfies Meta<typeof ChartLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Standard density — four stacked bar series (BarChart default). */
export const StackColors: Story = {
    name: 'Stack series (BarChart)',
    args: {
        items: STACK_COLORS.map((color, i) => ({
            label: `Series ${i + 1}`,
            color,
        })),
        density: 'standard',
    },
};

/** Six multi-series colours used in LineChart and MultiLineChart. */
export const SeriesColors: Story = {
    name: 'Multi-series (LineChart)',
    args: {
        items: SERIES_COLORS.map((color, i) => ({
            label: SERIES_NAMES[i],
            color,
        })),
        density: 'standard',
    },
};

/** Four-level RAG semantic palette. */
export const SemanticColors: Story = {
    name: 'Semantic RAG palette',
    args: {
        items: (Object.keys(SEMANTIC) as Array<keyof typeof SEMANTIC>).map((key) => ({
            label: SEMANTIC_LABELS[key],
            color: SEMANTIC[key],
        })),
        density: 'standard',
    },
    parameters: {
        docs: {
            description: {
                story: 'Use when colour carries meaning — On track / Neutral / Caution / Needs attention / Reference.',
            },
        },
    },
};

/** Ten-step heatmap scale for WeeklyAttendanceChart. */
export const HeatmapColors: Story = {
    name: 'Heatmap scale (WeeklyAttendanceChart)',
    args: {
        items: HEATMAP_COLORS.map((color, i) => ({
            label: HEATMAP_NAMES[i],
            color,
        })),
        density: 'standard',
    },
    parameters: {
        docs: {
            description: {
                story: '10-step attendance scale from Forest green (30+ hrs) to Stone 50 (Did not attend). Wraps naturally for narrow containers.',
            },
        },
    },
};

/** Compact density — for data-dense dashboard panels. */
export const DensityCompact: Story = {
    name: 'Density — Compact',
    args: {
        items: STACK_COLORS.map((color, i) => ({ label: `Series ${i + 1}`, color })),
        density: 'compact',
    },
    parameters: {
        docs: { description: { story: '10 px font, 10 px gap — for dense layouts where vertical space is tight.' } },
    },
};

/** Generous density — for hero or print views. */
export const DensityGenerous: Story = {
    name: 'Density — Generous',
    args: {
        items: STACK_COLORS.map((color, i) => ({ label: `Series ${i + 1}`, color })),
        density: 'generous',
    },
    parameters: {
        docs: { description: { story: '13 px font, 20 px gap — for summary cards or print contexts.' } },
    },
};
