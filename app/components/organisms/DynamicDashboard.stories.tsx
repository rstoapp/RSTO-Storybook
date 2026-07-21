import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DynamicDashboard from './DynamicDashboard';
import { DashboardManifest } from '../../lib/dashboard-manifest';
import { rstoOrange, rstoBlue, rstoGreen, rstoBrown } from '../../theme/tokens';

// ── Shared colours (token-derived — no palette has purple, brown is the 4th accent) ──
const ORANGE = rstoOrange._50; // #F28B2D
const BLUE = rstoBlue._70;     // #19788E
const GREEN = rstoGreen._50;   // #5D7A45
const BROWN = rstoBrown._50;   // #6F5340

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof DynamicDashboard> = {
    title: 'RSTO/Organisms/DynamicDashboard',
    component: DynamicDashboard,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ maxWidth: 1100, padding: 32 }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                component: `
**AI-generated dashboard renderer.**

An AI receives a natural-language query and returns a \`DashboardManifest\` JSON object.
\`DynamicDashboard\` turns that manifest into fully composed RSTO components — no hardcoded layouts.

### How the manifest works

\`\`\`
DashboardManifest
└── rows[]                      ← vertical stack of rows
     └── widgets[]              ← widgets sit side-by-side in a row
          └── span? (3|4|6|8|12) ← MUI Grid column width (default 12 = full row)
\`\`\`

### Widget types the AI can use

| type | Component | When to use |
|---|---|---|
| \`heading\` | HeadingWithChips | Section title + category chips |
| \`stat-row\` | StatPill (row) | 3–5 KPIs at a glance |
| \`chart\` (bar/line/horizontal-bar) | ChartCard + chart variant | Trend or distribution data |
| \`insight\` | InsightCard | AI observation or qualitative commentary |
| \`info\` | InfoCard | Neutral context note |
| \`warning\` | WarningCard | Alert, caveat, or data-quality flag |

### Validating AI output

\`\`\`tsx
import { validateManifest } from '@/lib/dashboard-manifest';
import DynamicDashboard from '@/components/organisms/DynamicDashboard';

const manifest = validateManifest(aiJsonResponse);   // throws on bad output
return <DynamicDashboard manifest={manifest} />;
\`\`\`
                `,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof DynamicDashboard>;

// ── Story 1: Service Provider Performance ─────────────────────────────────────
//
// Simulates: user asks "Show me Q1 2025 performance for Community Care providers"
// AI decides to surface: heading, KPIs, bar chart, insight, warning

const serviceProviderManifest: DashboardManifest = {
    title: 'Community Care — Q1 2025 Performance',
    description: 'Generated from: "Show me Q1 2025 performance for Community Care providers"',
    rows: [
        {
            widgets: [
                {
                    type: 'heading',
                    text: 'Q1 2025 Overview',
                    chips: ['Community Care', 'Q1 2025', 'All regions'],
                    span: 12,
                },
            ],
        },
        {
            widgets: [
                {
                    type: 'stat-row',
                    span: 12,
                    stats: [
                        { label: 'Active providers', value: '142' },
                        { label: 'Avg compliance score', value: '78%' },
                        { label: 'Submitted on time', value: '91%' },
                        { label: 'Requiring follow-up', value: '23' },
                    ],
                },
            ],
        },
        {
            widgets: [
                {
                    type: 'chart',
                    span: 8,
                    chartType: 'bar',
                    chartName: 'Provider compliance',
                    title: 'Compliance score by region',
                    subtitle: 'Average score across all Community Care providers, Q1 2025',
                    data: {
                        labels: ['Metro North', 'Metro South', 'Inner West', 'Outer West', 'Regional'],
                        datasets: [
                            {
                                label: 'Q4 2024',
                                data: [74, 71, 76, 68, 63],
                                backgroundColor: BLUE,
                            },
                            {
                                label: 'Q1 2025',
                                data: [81, 77, 82, 72, 67],
                                backgroundColor: ORANGE,
                            },
                        ],
                    },
                },
                {
                    type: 'insight',
                    span: 4,
                    insightName: 'AI insight',
                    title: 'Metro regions are consistently outperforming',
                    description:
                        'Metro North and Inner West have improved by 7+ points quarter-on-quarter. Regional providers remain below the 70% threshold and may benefit from targeted support.',
                },
            ],
        },
        {
            widgets: [
                {
                    type: 'warning',
                    span: 12,
                    heading: 'Data completeness caveat',
                    body: '11 providers in the Outer West region have not yet submitted Q1 data. The figures above reflect 131 of 142 providers. Final numbers may shift once submissions close on 31 March 2025.',
                },
            ],
        },
    ],
};

export const ServiceProviderPerformance: Story = {
    name: 'Service provider performance (Q1)',
    args: { manifest: serviceProviderManifest },
};

// ── Story 2: Indicator Detail ─────────────────────────────────────────────────
//
// Simulates: user asks "What does immunisation coverage look like?"
// AI decides to surface: heading, trend line, age breakdown, context note, insight

const immunisationManifest: DashboardManifest = {
    title: 'Immunisation Coverage',
    description: 'Generated from: "What does immunisation coverage look like?"',
    rows: [
        {
            widgets: [
                {
                    type: 'heading',
                    text: 'Immunisation Coverage Rate',
                    chips: ['Child Health', 'Preventive Care', '2019–2023'],
                    span: 12,
                },
            ],
        },
        {
            widgets: [
                {
                    type: 'stat-row',
                    span: 12,
                    stats: [
                        { label: 'Current coverage', value: '84%' },
                        { label: 'National target', value: '95%' },
                        { label: 'Gap to target', value: '11 pts' },
                        { label: '5-year change', value: '+12 pts' },
                    ],
                },
            ],
        },
        {
            widgets: [
                {
                    type: 'chart',
                    span: 6,
                    chartType: 'line',
                    chartName: 'Coverage trend',
                    title: 'Coverage rate over time',
                    subtitle: 'Percentage of children immunised on schedule, 2019–2023',
                    data: {
                        labels: ['2019', '2020', '2021', '2022', '2023'],
                        datasets: [
                            {
                                label: 'RSTO region',
                                data: [72, 74, 76, 80, 84],
                                borderColor: ORANGE,
                                backgroundColor: 'transparent',
                            },
                            {
                                label: 'National average',
                                data: [75, 76, 77, 79, 82],
                                borderColor: BLUE,
                                backgroundColor: 'transparent',
                            },
                        ],
                    },
                },
                {
                    type: 'chart',
                    span: 6,
                    chartType: 'horizontal-bar',
                    chartName: 'By age group',
                    title: 'Coverage by age group',
                    subtitle: 'Percentage immunised, 2023',
                    data: {
                        labels: ['Under 1 year', '1–4 years', '5–14 years', '15–24 years'],
                        datasets: [
                            {
                                label: 'Coverage',
                                data: [91, 84, 76, 62],
                                backgroundColor: [ORANGE, BLUE, GREEN, BROWN],
                            },
                        ],
                    },
                },
            ],
        },
        {
            widgets: [
                {
                    type: 'info',
                    span: 6,
                    heading: 'About this indicator',
                    body: 'Immunisation coverage is measured as the percentage of children who received all age-appropriate vaccines within the recommended schedule. Data is sourced from the Australian Immunisation Register (AIR) and updated quarterly.',
                },
                {
                    type: 'insight',
                    span: 6,
                    insightName: 'AI insight',
                    title: 'Coverage is rising but the 15–24 age group needs attention',
                    description:
                        'The RSTO region has improved by 12 percentage points since 2019, outpacing the national average increase of 7 points. However, the 15–24 cohort sits at 62% — well below target — suggesting adolescent catch-up programs may be needed.',
                },
            ],
        },
    ],
};

export const IndicatorImmunisation: Story = {
    name: 'Indicator deep-dive (immunisation)',
    args: { manifest: immunisationManifest },
};

// ── Story 3: Minimal single-chart dashboard ───────────────────────────────────
//
// Simulates a simple query: "Show me regional breakdown of compliance scores"
// AI keeps it lean — just a heading, one chart, one insight.

const minimalManifest: DashboardManifest = {
    title: 'Regional Compliance Breakdown',
    description: 'Generated from: "Show me regional compliance scores"',
    rows: [
        {
            widgets: [
                {
                    type: 'heading',
                    text: 'Regional Compliance Scores',
                    chips: ['All providers', '2023'],
                },
            ],
        },
        {
            widgets: [
                {
                    type: 'chart',
                    chartType: 'horizontal-bar',
                    chartName: 'Regional breakdown',
                    title: 'Compliance score by region',
                    subtitle: 'Percentage of providers meeting the compliance threshold, 2023',
                    data: {
                        labels: ['Metro North', 'Inner West', 'Metro South', 'Outer West', 'Regional'],
                        datasets: [
                            {
                                label: 'Compliance',
                                data: [88, 83, 79, 72, 64],
                                backgroundColor: [ORANGE, ORANGE, BLUE, BLUE, GREEN],
                            },
                        ],
                    },
                },
            ],
        },
        {
            widgets: [
                {
                    type: 'insight',
                    insightName: 'AI insight',
                    title: 'Regional providers are 24 points below Metro North',
                    description:
                        'The gap between the highest (Metro North, 88%) and lowest (Regional, 64%) regions suggests uneven resourcing or support. Targeted intervention in Regional and Outer West could have the greatest system-wide impact.',
                },
            ],
        },
    ],
};

export const MinimalSingleChart: Story = {
    name: 'Minimal — single chart + insight',
    args: { manifest: minimalManifest },
};

// ── Story 4: Render error state ───────────────────────────────────────────────
//
// Shows what happens when the AI returns malformed output.

export const ErrorState: Story = {
    name: 'Error — malformed AI output',
    args: {
        manifest: { rows: [] },
        error:
            'Row 0, widget 1: unknown type "heatmap". Valid types: heading, stat-row, insight, info, warning, chart. ' +
            'The AI response has been logged. Please try rephrasing your question.',
    },
};
