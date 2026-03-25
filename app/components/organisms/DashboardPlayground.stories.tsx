'use client';
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CodeIcon from '@mui/icons-material/Code';
import DashboardIcon from '@mui/icons-material/Dashboard';

import DynamicDashboard from './DynamicDashboard';
import { DashboardManifest, validateManifest } from '../../lib/dashboard-manifest';

// ── Colours ───────────────────────────────────────────────────────────────────
const ORANGE = '#E07B39';
const BLUE = '#1B6CA8';
const GREEN = '#4D8613';
const PURPLE = '#9C27B0';

// ── Pre-written manifests (stand-ins for AI responses) ────────────────────────

const EXAMPLE_MANIFESTS: Record<string, DashboardManifest> = {
    'Show me Q1 2025 performance for Community Care providers': {
        title: 'Community Care — Q1 2025 Performance',
        description: 'Generated from: "Show me Q1 2025 performance for Community Care providers"',
        rows: [
            {
                widgets: [
                    {
                        type: 'heading',
                        text: 'Q1 2025 Overview',
                        chips: ['Community Care', 'Q1 2025', 'All regions'],
                    },
                ],
            },
            {
                widgets: [
                    {
                        type: 'stat-row',
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
                                { label: 'Q4 2024', data: [74, 71, 76, 68, 63], backgroundColor: BLUE },
                                { label: 'Q1 2025', data: [81, 77, 82, 72, 67], backgroundColor: ORANGE },
                            ],
                        },
                    },
                    {
                        type: 'insight',
                        span: 4,
                        insightName: 'AI insight',
                        title: 'Metro regions are consistently outperforming',
                        description:
                            'Metro North and Inner West improved by 7+ points quarter-on-quarter. Regional providers remain below the 70% threshold and may benefit from targeted support.',
                    },
                ],
            },
            {
                widgets: [
                    {
                        type: 'warning',
                        heading: 'Data completeness caveat',
                        body: '11 providers in Outer West have not yet submitted Q1 data. Figures reflect 131 of 142 providers.',
                    },
                ],
            },
        ],
    },

    'What does immunisation coverage look like?': {
        title: 'Immunisation Coverage',
        description: 'Generated from: "What does immunisation coverage look like?"',
        rows: [
            {
                widgets: [
                    {
                        type: 'heading',
                        text: 'Immunisation Coverage Rate',
                        chips: ['Child Health', 'Preventive Care', '2019–2023'],
                    },
                ],
            },
            {
                widgets: [
                    {
                        type: 'stat-row',
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
                                { label: 'RSTO region', data: [72, 74, 76, 80, 84], borderColor: ORANGE, backgroundColor: 'transparent' },
                                { label: 'National average', data: [75, 76, 77, 79, 82], borderColor: BLUE, backgroundColor: 'transparent' },
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
                                { label: 'Coverage', data: [91, 84, 76, 62], backgroundColor: [ORANGE, BLUE, GREEN, PURPLE] },
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
                        body: 'Measured as the percentage of children who received all age-appropriate vaccines within the recommended schedule. Data sourced from the Australian Immunisation Register (AIR), updated quarterly.',
                    },
                    {
                        type: 'insight',
                        span: 6,
                        insightName: 'AI insight',
                        title: 'Coverage is rising but the 15–24 age group needs attention',
                        description:
                            'The RSTO region improved 12 percentage points since 2019, outpacing the national average. The 15–24 cohort sits at 62% — well below target — suggesting adolescent catch-up programs may be needed.',
                    },
                ],
            },
        ],
    },

    'Show me regional compliance scores': {
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
                            'The gap between the highest (Metro North, 88%) and lowest (Regional, 64%) regions suggests uneven resourcing. Targeted support in Regional and Outer West could have the greatest system-wide impact.',
                    },
                ],
            },
        ],
    },
};

const EXAMPLE_QUERIES = Object.keys(EXAMPLE_MANIFESTS);

// ── Playground component ──────────────────────────────────────────────────────

function Playground() {
    const [query, setQuery] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [manifest, setManifest] = React.useState<DashboardManifest | null>(null);
    const [rawJson, setRawJson] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [showJson, setShowJson] = React.useState(true);

    function simulate(q: string) {
        setError(null);
        setManifest(null);
        setRawJson(null);
        setLoading(true);

        // Simulate AI latency
        setTimeout(() => {
            setLoading(false);

            const matched = EXAMPLE_MANIFESTS[q];
            if (!matched) {
                setError(
                    `No pre-written manifest for this query. In production, this would call your LLM API with the component catalog as the system prompt and return a DashboardManifest JSON.`
                );
                return;
            }

            // Simulate what the AI returns (raw JSON string)
            const json = JSON.stringify(matched, null, 2);
            setRawJson(json);

            // Validate it (as you would with real AI output)
            try {
                const validated = validateManifest(JSON.parse(json));
                setManifest(validated);
            } catch (e) {
                setError(String(e));
            }
        }, 800);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (query.trim()) simulate(query.trim());
    }

    return (
        <Stack spacing={3}>
            {/* Header */}
            <Stack spacing={0.5}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <AutoAwesomeIcon sx={{ color: 'rstoOrange._50', fontSize: 20 }} />
                    <Typography variant="h5" fontWeight={700}>
                        Dashboard Playground
                    </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                    Type a query to see the full input → manifest → dashboard flow.
                    Try one of the example queries or write your own.
                </Typography>
            </Stack>

            {/* Example chips */}
            <Stack direction="row" flexWrap="wrap" gap={1}>
                {EXAMPLE_QUERIES.map((q) => (
                    <Chip
                        key={q}
                        label={q}
                        variant="outlined"
                        size="small"
                        onClick={() => { setQuery(q); simulate(q); }}
                        sx={{ cursor: 'pointer' }}
                    />
                ))}
            </Stack>

            {/* Query input */}
            <form onSubmit={handleSubmit}>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                    <TextField
                        fullWidth
                        label="Ask a question"
                        placeholder='e.g. "Show me Q1 2025 performance for Community Care providers"'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        size="small"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!query.trim() || loading}
                        startIcon={loading ? <CircularProgress size={14} color="inherit" /> : <AutoAwesomeIcon />}
                        sx={{ whiteSpace: 'nowrap', minWidth: 140 }}
                    >
                        {loading ? 'Generating…' : 'Generate'}
                    </Button>
                </Stack>
            </form>

            {/* Error */}
            {error && !loading && (
                <Alert severity="warning" sx={{ fontFamily: 'monospace', fontSize: 13 }}>
                    {error}
                </Alert>
            )}

            {/* Output: JSON + Dashboard */}
            {(rawJson || manifest) && !loading && (
                <Stack spacing={2}>
                    <Divider />

                    {/* Toggle */}
                    <Stack direction="row" spacing={1}>
                        <Button
                            size="small"
                            variant={showJson ? 'contained' : 'outlined'}
                            startIcon={<CodeIcon />}
                            onClick={() => setShowJson(true)}
                        >
                            AI response (JSON)
                        </Button>
                        <Button
                            size="small"
                            variant={!showJson ? 'contained' : 'outlined'}
                            startIcon={<DashboardIcon />}
                            onClick={() => setShowJson(false)}
                        >
                            Rendered dashboard
                        </Button>
                    </Stack>

                    {/* JSON pane */}
                    {showJson && rawJson && (
                        <Paper
                            variant="outlined"
                            sx={{ p: 2, backgroundColor: '#1e1e1e', borderRadius: 2, overflow: 'auto', maxHeight: 500 }}
                        >
                            <Box
                                component="pre"
                                sx={{ m: 0, fontFamily: 'monospace', fontSize: 12, color: '#d4d4d4', whiteSpace: 'pre-wrap' }}
                            >
                                {rawJson}
                            </Box>
                        </Paper>
                    )}

                    {/* Dashboard pane */}
                    {!showJson && manifest && (
                        <DynamicDashboard manifest={manifest} />
                    )}
                </Stack>
            )}
        </Stack>
    );
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta = {
    title: 'RSTO/Organisms/DashboardPlayground',
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
An interactive demo of the full **query → manifest → dashboard** pipeline.

Click an example query chip (or type your own) to simulate what happens when an AI receives a
natural-language question and returns a \`DashboardManifest\`. Toggle between the raw JSON response
and the rendered dashboard to see both sides of the flow.

In production, the \`simulate()\` function in this playground would be replaced with a real
API call to your LLM endpoint, with the component catalog baked into the system prompt.
                `,
            },
        },
    },
};

export default meta;

export const Default: StoryObj = {
    name: 'Playground',
    render: () => <Playground />,
};
