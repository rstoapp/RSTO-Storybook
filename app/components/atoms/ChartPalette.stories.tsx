import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Box, Stack, Typography, Tooltip } from '@mui/material';
import {
    P,
    STACK_COLORS,
    SERIES_COLORS,
    SEMANTIC,
    SEMANTIC_LABELS,
    HEATMAP_COLORS,
    CHART_FONT_FAMILY,
    CHART_FONT_SIZES,
} from '../organisms/charts/chart-theme';
import { eyebrowSx } from '../../theme/typography';

const meta: Meta = {
    title: 'RSTO/Foundation/Chart Palette',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
**RSTO Chart Design System — Colour Reference**

All chart colours come from \`chart-theme.ts\`. This page documents every palette,
its intended use, and the semantic rules that govern colour assignment.

---

### Semantic colour rules

When chart colour carries **meaning** (RAG status, fidelity level, outcome
classification), always use the \`SEMANTIC\` palette and follow this order:

| Colour | Token | Meaning |
|---|---|---|
| 🟢 Sage green | \`SEMANTIC.positive\` | On track / implemented to evidence |
| 🔵 Blue | \`SEMANTIC.neutral\` | Neutral / partial / right direction |
| 🟠 Amber | \`SEMANTIC.caution\` | Needs improvement / below threshold |

> **Never use rust/brown (\`SEMANTIC.attention\`) for fidelity or RAG charts.**
> Reserve \`attention\` only for critical/alarm states where a fourth level is required.

---

### Descriptive (non-semantic) charts

Use \`STACK_COLORS\` (sage–blue cool tones) for stacked bars where segments are
categories, not performance levels. Use \`SERIES_COLORS\` for multi-line charts
where each series represents a distinct cohort.
                `,
            },
        },
    },
};

export default meta;

// ─── Shared swatch component ─────────────────────────────────────────────────

function Swatch({
    color,
    label,
    sublabel,
    wide = false,
}: {
    color: string;
    label: string;
    sublabel?: string;
    wide?: boolean;
}) {
    return (
        <Tooltip title={color} placement="top" arrow>
            <Stack spacing={0.5} sx={{ width: wide ? 140 : 96 }}>
                <Box
                    sx={{
                        width: '100%',
                        height: 40,
                        borderRadius: '6px',
                        backgroundColor: color,
                        border: `1px solid ${P.sand}`,
                    }}
                />
                <Typography sx={{ ...eyebrowSx, color: P.bark, lineHeight: 1.3 }}>
                    {label}
                </Typography>
                {sublabel && (
                    <Typography variant="caption" sx={{ color: P.shadow, lineHeight: 1.2 }}>
                        {sublabel}
                    </Typography>
                )}
            </Stack>
        </Tooltip>
    );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
    return (
        <Stack spacing={2}>
            <Stack spacing={0.5}>
                <Typography variant="subtitle2" sx={{ color: P.bark }}>{title}</Typography>
                {description && (
                    <Typography variant="caption" sx={{ color: P.shadow, maxWidth: 560 }}>{description}</Typography>
                )}
            </Stack>
            <Stack direction="row" flexWrap="wrap" gap={2}>
                {children}
            </Stack>
        </Stack>
    );
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const SemanticPalette: StoryObj = {
    name: 'Semantic palette (RAG / fidelity)',
    parameters: {
        docs: {
            description: {
                story: `
Use when colour carries meaning. Apply the three-level rule consistently:
**green = on track**, **blue = neutral/partial**, **orange = needs improvement**.
Only add \`attention\` (fourth level) for critical/alarm states.
                `,
            },
        },
    },
    render: () => (
        <Stack spacing={4} sx={{ p: 3 }}>
            <Section
                title="Semantic palette — RAG / fidelity"
                description="Apply in this order: green → blue → orange. Never use rust/brown for three-level fidelity charts."
            >
                <Swatch color={SEMANTIC.positive}  label="Positive"  sublabel={`On track · ${SEMANTIC.positive}`}  wide />
                <Swatch color={SEMANTIC.neutral}   label="Neutral"   sublabel={`Partial · ${SEMANTIC.neutral}`}    wide />
                <Swatch color={SEMANTIC.caution}   label="Caution"   sublabel={`Needs improvement · ${SEMANTIC.caution}`} wide />
                <Swatch color={SEMANTIC.attention} label="Attention" sublabel={`Critical (4th level only) · ${SEMANTIC.attention}`} wide />
                <Swatch color={SEMANTIC.reference} label="Reference" sublabel={`Total / reference lines · ${SEMANTIC.reference}`} wide />
            </Section>

            <Stack spacing={1.5}>
                <Typography variant="subtitle2" sx={{ color: P.bark }}>Three-level usage example</Typography>
                <Stack direction="row" spacing={0} sx={{ height: 32, borderRadius: '6px', overflow: 'hidden', width: 360 }}>
                    {[
                        { color: SEMANTIC.positive,  label: SEMANTIC_LABELS.positive,  flex: 5 },
                        { color: SEMANTIC.neutral,   label: SEMANTIC_LABELS.neutral,   flex: 3 },
                        { color: SEMANTIC.caution,   label: SEMANTIC_LABELS.caution,   flex: 2 },
                    ].map(({ color, label, flex }) => (
                        <Tooltip key={label} title={label} placement="top" arrow>
                            <Box sx={{ flex, backgroundColor: color, opacity: 0.88 }} />
                        </Tooltip>
                    ))}
                </Stack>
                <Typography variant="caption" sx={{ color: P.shadow }}>
                    Green · Blue · Orange — Program fidelity, outcome classification, RAG status
                </Typography>
            </Stack>
        </Stack>
    ),
};

export const StackColors: StoryObj = {
    name: 'Stack colours (stacked bars)',
    parameters: {
        docs: {
            description: {
                story: 'Cool sage–blue tones for stacked bars where segments are categories, not performance levels. Assign bottom → top (stack.1 = dominant/largest, stack.4 = smallest).',
            },
        },
    },
    render: () => (
        <Stack spacing={3} sx={{ p: 3 }}>
            <Section
                title="Stack colours — sage/blue cool tones"
                description="Use for stacked bar charts (BarChart, WeeklyAttendanceChart). stack.1 = bottom/dominant → stack.4 = top/smallest."
            >
                {STACK_COLORS.map((color, i) => (
                    <Swatch key={color} color={color} label={`stack.${i + 1}`} sublabel={color} />
                ))}
            </Section>
        </Stack>
    ),
};

export const SeriesColors: StoryObj = {
    name: 'Series colours (multi-line)',
    parameters: {
        docs: {
            description: {
                story: 'Multi-series palette for LineChart and MultiLineChart. Assign by performance rank: Series 1 (Blue 70) = top performer, Series 6 (Amber 35) = lowest. Avoid Series 3 and 6 for primary data — use only as decorative/low-signal.',
            },
        },
    },
    render: () => (
        <Stack spacing={3} sx={{ p: 3 }}>
            <Section
                title="Series colours — blue → amber"
                description="For multi-line charts. Assign highest performer → Series 1 (darkest blue). Series 3 and 6 are light/decorative — avoid for primary data."
            >
                {SERIES_COLORS.map((color, i) => (
                    <Swatch key={color} color={color} label={`Series ${i + 1}`} sublabel={color} />
                ))}
            </Section>
        </Stack>
    ),
};

export const NeutralSurfaces: StoryObj = {
    name: 'Neutral surfaces',
    parameters: {
        docs: {
            description: {
                story: 'Warm neutral tokens used for chart surfaces, text, and borders. All sourced from `P` in `chart-theme.ts`.',
            },
        },
    },
    render: () => (
        <Stack spacing={3} sx={{ p: 3 }}>
            <Section
                title="Neutral surface tokens (P)"
                description="Used for card backgrounds, borders, axis ticks, tooltips, and text. Do not use these for data series."
            >
                <Swatch color={P.paper}  label="paper"  sublabel="Card bg" />
                <Swatch color={P.bone}   label="bone"   sublabel="Gridlines" />
                <Swatch color={P.sand}   label="sand"   sublabel="Card border" />
                <Swatch color={P.stone}  label="stone"  sublabel="Reference lines" />
                <Swatch color={P.shadow} label="shadow" sublabel="Axis / legend text" />
                <Swatch color={P.earth}  label="earth"  sublabel="Tooltip body" />
                <Swatch color={P.bark}   label="bark"   sublabel="Card title" />
                <Swatch color={P.ink}    label="ink"    sublabel="Tooltip title" />
                <Swatch color={P.o50}    label="o50"    sublabel="Brand orange" />
            </Section>
        </Stack>
    ),
};

export const ChartTypography: StoryObj = {
    name: 'Chart typography',
    parameters: {
        docs: {
            description: {
                story: `
All chart text is set in **Open Sans** (sourced from \`CHART_FONT_FAMILY\` in \`chart-theme.ts\`).
Sizes and weights are defined in \`CHART_FONT_SIZES\` and applied via Chart.js \`font\` option objects —
they are intentionally separate from the MUI typography scale, which Chart.js never reads.

| Role | Size | Weight | Colour token |
|---|---|---|---|
| Axis tick | 11 px | Regular 400 | \`P.shadow\` |
| Legend label | 11 px | Regular 400 | \`P.shadow\` |
| Tooltip title | 12 px | SemiBold 600 | \`P.ink\` |
| Tooltip body | 11 px | Regular 400 | \`P.earth\` |
| Tooltip footer | 11 px | Regular 400 | \`P.earth\` |

> **Compact density** drops axis and legend text to **9.5 px / 10 px** via the
> \`density: 'compact'\` option in \`makeScales\` and \`makeLegend\`.
                `,
            },
        },
    },
    render: () => {
        const ff = CHART_FONT_FAMILY;
        const rows: { role: string; sample: string; size: number; weight: number | string; color: string; token: string }[] = [
            { role: 'Axis tick',      sample: '100  200  300  400  500',   size: CHART_FONT_SIZES.axisLabel,    weight: 400, color: P.shadow, token: 'P.shadow' },
            { role: 'Legend label',   sample: '30+ hrs · 25–<30 hrs · Did not attend', size: CHART_FONT_SIZES.legend, weight: 400, color: P.shadow, token: 'P.shadow' },
            { role: 'Tooltip title',  sample: '28 Jul 2025',               size: CHART_FONT_SIZES.tooltipTitle, weight: 600, color: P.ink,    token: 'P.ink'    },
            { role: 'Tooltip body',   sample: '30+ hrs: 195 children',     size: CHART_FONT_SIZES.tooltipBody,  weight: 400, color: P.earth,  token: 'P.earth'  },
            { role: 'Tooltip footer', sample: 'Total enrolled: 835',        size: CHART_FONT_SIZES.tooltipBody,  weight: 400, color: P.earth,  token: 'P.earth'  },
        ];

        return (
            <Stack spacing={3} sx={{ p: 3 }}>
                <Stack spacing={0.5}>
                    <Typography variant="subtitle2" sx={{ color: P.bark }}>
                        Chart typography — Open Sans
                    </Typography>
                    <Typography variant="caption" sx={{ color: P.shadow, maxWidth: 560 }}>
                        All roles use <code style={{ fontSize: 11 }}>CHART_FONT_FAMILY</code> and{' '}
                        <code style={{ fontSize: 11 }}>CHART_FONT_SIZES</code> from{' '}
                        <code style={{ fontSize: 11 }}>chart-theme.ts</code>, passed directly to Chart.js font option objects.
                    </Typography>
                </Stack>

                <Box
                    sx={{
                        border: `1px solid ${P.sand}`,
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }}
                >
                    {/* Header row */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '140px 1fr 72px 80px 120px',
                            px: 2,
                            py: 1,
                            backgroundColor: P.frost,
                            borderBottom: `1px solid ${P.bone}`,
                        }}
                    >
                        {['Role', 'Sample', 'Size', 'Weight', 'Colour token'].map((h) => (
                            <Typography key={h} variant="overline" sx={{ color: P.shadow }}>
                                {h}
                            </Typography>
                        ))}
                    </Box>

                    {rows.map(({ role, sample, size, weight, color, token }, idx) => (
                        <Box
                            key={role}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '140px 1fr 72px 80px 120px',
                                px: 2,
                                py: 1.5,
                                alignItems: 'center',
                                borderBottom: idx < rows.length - 1 ? `1px solid ${P.bone}` : 'none',
                            }}
                        >
                            <Typography sx={{ ...eyebrowSx, color: P.earth }}>
                                {role}
                            </Typography>
                            <Typography sx={{ fontFamily: ff, fontSize: size, fontWeight: weight, color }}>
                                {sample}
                            </Typography>
                            <Typography variant="caption" sx={{ color: P.shadow }}>
                                {size} px
                            </Typography>
                            <Typography variant="caption" sx={{ color: P.shadow }}>
                                {weight === 600 ? 'SemiBold 600' : 'Regular 400'}
                            </Typography>
                            <Stack direction="row" spacing={0.75} alignItems="center">
                                <Box sx={{ width: 12, height: 12, borderRadius: '2px', backgroundColor: color, border: `1px solid ${P.sand}`, flexShrink: 0 }} />
                                <Typography variant="caption" sx={{ color: P.shadow, fontFamily: 'monospace' }}>
                                    {token}
                                </Typography>
                            </Stack>
                        </Box>
                    ))}
                </Box>

                {/* Compact density note */}
                <Box sx={{ borderLeft: `3px solid ${P.bone}`, pl: 1.5 }}>
                    <Typography sx={{ ...eyebrowSx, color: P.earth, mb: 0.25 }}>
                        Compact density
                    </Typography>
                    <Typography variant="caption" sx={{ color: P.shadow }}>
                        Pass <code style={{ fontSize: 10 }}>density: &apos;compact&apos;</code> to{' '}
                        <code style={{ fontSize: 10 }}>makeScales()</code> and{' '}
                        <code style={{ fontSize: 10 }}>makeLegend()</code> to drop axis text to{' '}
                        <strong>9.5 px</strong> and legend text to <strong>10 px</strong> for space-constrained panels.
                    </Typography>
                </Box>
            </Stack>
        );
    },
};

export const HeatmapScale: StoryObj = {
    name: 'Heatmap scale (attendance)',
    parameters: {
        docs: {
            description: {
                story: 'Ten-step scale for WeeklyAttendanceChart. Runs deep green → mid green → light green → teal bridge → sky blue → warm amber → deep rust. Green = on track (good/go). Orange threshold begins at index 5 (8–<10 hrs). Index 9 = "Did not attend" (55% opacity).',
            },
        },
    },
    render: () => (
        <Stack spacing={3} sx={{ p: 3 }}>
            <Section
                title="Heatmap scale — 10 attendance bands"
                description="Deep teal-blue → sky blue → sage green → warm amber → deep rust. Index 5 = orange threshold (8–<10 hrs). Index 9 = 'Did not attend' (55% opacity)."
            >
                {HEATMAP_COLORS.map((color, i) => (
                    <Swatch key={color} color={color} label={`Band ${i}`} sublabel={color} />
                ))}
            </Section>
        </Stack>
    ),
};
