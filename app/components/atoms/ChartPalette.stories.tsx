import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Box, Stack, Typography, Tooltip } from '@mui/material';
import {
    P,
    STACK_COLORS,
    SERIES_COLORS,
    SEMANTIC,
    SEMANTIC_LABELS,
    HEATMAP_COLORS,
} from '../organisms/charts/chart-theme';

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
                        border: '1px solid rgba(0,0,0,0.06)',
                    }}
                />
                <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#3D3028', lineHeight: 1.3 }}>
                    {label}
                </Typography>
                {sublabel && (
                    <Typography sx={{ fontSize: 10, color: '#8A7B6A', lineHeight: 1.2 }}>
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
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#3D3028' }}>{title}</Typography>
                {description && (
                    <Typography sx={{ fontSize: 12, color: '#8A7B6A', maxWidth: 560 }}>{description}</Typography>
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
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#3D3028' }}>Three-level usage example</Typography>
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
                <Typography sx={{ fontSize: 11, color: '#8A7B6A' }}>
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

export const HeatmapScale: StoryObj = {
    name: 'Heatmap scale (attendance)',
    parameters: {
        docs: {
            description: {
                story: 'Ten-step scale for WeeklyAttendanceChart. Runs dark sage → light sage → warm neutral. Bottom band (index 0) = highest attendance; index 8 = "Did not attend" (55% opacity); index 9 = "Total enrolled".',
            },
        },
    },
    render: () => (
        <Stack spacing={3} sx={{ p: 3 }}>
            <Section
                title="Heatmap scale — 10 attendance bands"
                description="Dark → light top to bottom. Index 8 = 'Did not attend' (rendered at 55% opacity). Index 9 = 'Total enrolled' (stone)."
            >
                {HEATMAP_COLORS.map((color, i) => (
                    <Swatch key={color} color={color} label={`Band ${i}`} sublabel={color} />
                ))}
            </Section>
        </Stack>
    ),
};
