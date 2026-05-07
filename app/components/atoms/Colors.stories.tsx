import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    rstoOrange,
    rstoBlue,
    rstoGreen,
    rstoGray,
    rstoRed,
    rstoNeutral,
    rstoBrown,
    rstoFunctional,
} from '../../theme/tokens';

// ─── Swatch ───────────────────────────────────────────────────────────────────

function Swatch({ color, label, sublabel }: { color: string; label: string; sublabel?: string }) {
    const isLight = isColorLight(color);
    return (
        <Box sx={{ width: 96, flexShrink: 0 }}>
            <Box
                sx={{
                    width: 96,
                    height: 56,
                    borderRadius: 1,
                    bgcolor: color,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    sx={{ color: isLight ? '#191919' : '#FFFFFF', fontWeight: 600, fontSize: 10 }}
                >
                    {color}
                </Typography>
            </Box>
            <Typography variant="caption" display="block" sx={{ mt: 0.5, fontWeight: 600, lineHeight: 1.3 }}>
                {label}
            </Typography>
            {sublabel && (
                <Typography variant="caption" display="block" color="text.secondary" sx={{ fontSize: 10, lineHeight: 1.3 }}>
                    {sublabel}
                </Typography>
            )}
        </Box>
    );
}

/** Rough luminance check to pick readable hex overlay text */
function isColorLight(hex: string): boolean {
    const clean = hex.replace('#', '');
    if (clean.length < 6) return true;
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

// ─── Scale row ────────────────────────────────────────────────────────────────

function ScaleRow({ name, scale }: { name: string; scale: Record<string, string> }) {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="overline" sx={{ mb: 1, display: 'block', color: 'text.secondary' }}>
                {name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {Object.entries(scale).map(([token, value]) => (
                    <Swatch key={token} color={value} label={token} />
                ))}
            </Box>
        </Box>
    );
}

// ─── Usage reference table ────────────────────────────────────────────────────

const usageRows: { component: string; role: string; token: string; value: string }[] = [
    // ── Buttons ──────────────────────────────────────────────────────────────
    { component: 'Button (primary)',      role: 'Fill',            token: 'rstoBrown._60',          value: rstoBrown._60 },
    { component: 'Button (primary)',      role: 'Hover fill',      token: 'rstoBrown._70',          value: rstoBrown._70 },
    { component: 'Button (primary)',      role: 'Disabled fill',   token: 'rstoNeutral.bone',       value: rstoNeutral.bone },
    { component: 'Button (primary)',      role: 'Disabled text',   token: 'rstoNeutral.stone',      value: rstoNeutral.stone },
    { component: 'Button (secondary)',    role: 'Border',          token: 'rstoNeutral.stone',      value: rstoNeutral.stone },
    { component: 'Button (secondary)',    role: 'Text',            token: 'rstoNeutral.shadow',     value: rstoNeutral.shadow },
    { component: 'Button (secondary)',    role: 'Hover fill',      token: 'rstoNeutral.bone',       value: rstoNeutral.bone },
    { component: 'Button (destructive)',  role: 'Fill',            token: 'rstoOrange._60',         value: rstoOrange._60 },
    { component: 'Button (destructive)',  role: 'Hover fill',      token: 'rstoOrange._70',         value: rstoOrange._70 },
    // ── Tabs ─────────────────────────────────────────────────────────────────
    { component: 'Tab indicator',      role: 'Indicator line',    token: 'rstoOrange._50',        value: rstoOrange._50 },
    { component: 'Tab label',          role: 'Inactive text',     token: 'rstoNeutral.shadow',    value: rstoNeutral.shadow },
    { component: 'Tab label',          role: 'Active text',       token: 'rstoNeutral.ink',       value: rstoNeutral.ink },
    // ── Chips ─────────────────────────────────────────────────────────────────
    { component: 'Chip (primary)',      role: 'Fill',              token: 'rstoBlue._70',          value: rstoBlue._70 },
    { component: 'Chip (secondary)',    role: 'Fill',              token: 'rstoOrange._70',        value: rstoOrange._70 },
    { component: 'Chip (default)',      role: 'Fill',              token: 'rstoGray._30',          value: rstoGray._30 },
    // ── Cards ─────────────────────────────────────────────────────────────────
    { component: 'Card',               role: 'Border',            token: 'rstoNeutral.sand',      value: rstoNeutral.sand },
    { component: 'Card (elevation)',    role: 'Shadow',            token: 'rstoGray.shadow',       value: rstoGray.shadow },
    // ── Links ─────────────────────────────────────────────────────────────────
    { component: 'Link',               role: 'Text & underline',  token: 'rstoBlue._70',          value: rstoBlue._70 },
    // ── Alerts ────────────────────────────────────────────────────────────────
    { component: 'Alert (success)',     role: 'Background',        token: 'rstoGreen._10',         value: rstoGreen._10 },
    { component: 'Alert (success)',     role: 'Border',            token: 'rstoGreen._30',         value: rstoGreen._30 },
    { component: 'Alert (success)',     role: 'Left stripe',       token: 'rstoGreen._60',         value: rstoGreen._60 },
    { component: 'Alert (error)',       role: 'Background',        token: 'rstoRed._10',           value: rstoRed._10 },
    { component: 'Alert (error)',       role: 'Border',            token: 'rstoRed._30',           value: rstoRed._30 },
    { component: 'Alert (error)',       role: 'Left stripe',       token: 'rstoRed._60',           value: rstoRed._60 },
    // ── Surfaces ──────────────────────────────────────────────────────────────
    { component: 'Page background',    role: 'Surface',           token: 'rstoNeutral.paper',     value: rstoNeutral.paper },
    { component: 'Card background',    role: 'Surface',           token: '#FDFAF4 (warm card)',   value: '#FDFAF4' },
    // ── Text ──────────────────────────────────────────────────────────────────
    { component: 'Body text',          role: 'Primary text',      token: 'rstoNeutral.ink',       value: rstoNeutral.ink },
    { component: 'Supporting text',    role: 'Secondary text',    token: 'rstoNeutral.shadow',    value: rstoNeutral.shadow },
    { component: 'Disabled text',      role: 'Disabled',          token: 'rstoNeutral.stone',     value: rstoNeutral.stone },
    // ── Focus & status ────────────────────────────────────────────────────────
    { component: 'Focus ring',         role: 'Outline',           token: 'rstoBrown._60',         value: rstoBrown._60 },
    { component: 'Success badge',      role: 'Fill',              token: 'rstoFunctional.success', value: rstoFunctional.success },
    { component: 'Status — positive',  role: 'Fill',              token: 'rstoFunctional.statusPositive', value: rstoFunctional.statusPositive },
    { component: 'Status — moderate',  role: 'Fill',              token: 'rstoFunctional.statusModerate', value: rstoFunctional.statusModerate },
    { component: 'Status — warning',   role: 'Fill',              token: 'rstoFunctional.statusWarning',  value: rstoFunctional.statusWarning },
    { component: 'Status — critical',  role: 'Fill',              token: 'rstoFunctional.statusCritical', value: rstoFunctional.statusCritical },
];

function UsageReference() {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Token usage reference</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Which token each component uses — defined in <code>palette.ts</code> and <code>components.ts</code>.
                Charts have their own token layer in <code>chart-theme.ts</code> — see <strong>Foundation › Chart Palette</strong>.
            </Typography>
            <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <Box component="thead">
                    <Box component="tr" sx={{ borderBottom: '2px solid', borderColor: 'divider' }}>
                        {['Component', 'Role', 'Token', 'Value'].map(h => (
                            <Box component="th" key={h} sx={{ textAlign: 'left', pb: 1, pr: 3, fontWeight: 700 }}>{h}</Box>
                        ))}
                    </Box>
                </Box>
                <Box component="tbody">
                    {usageRows.map((row, i) => (
                        <Box component="tr" key={i} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                            <Box component="td" sx={{ py: 0.75, pr: 3, fontWeight: row.role === 'Fill' || row.role === 'Surface' ? 600 : 400 }}>{row.component}</Box>
                            <Box component="td" sx={{ py: 0.75, pr: 3, color: 'text.secondary' }}>{row.role}</Box>
                            <Box component="td" sx={{ py: 0.75, pr: 3, fontFamily: 'monospace', fontSize: 12 }}>{row.token}</Box>
                            <Box component="td" sx={{ py: 0.75 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 20, height: 20, borderRadius: 0.5, bgcolor: row.value, border: '1px solid', borderColor: 'divider', flexShrink: 0 }} />
                                    <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{row.value}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

// ─── Palette story ────────────────────────────────────────────────────────────

function RawPalette() {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Raw palette scales</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Primitive tokens in <code>tokens.ts</code> — the full RSTO palette.
                See the <strong>Usage reference</strong> story for which tokens each component uses.
            </Typography>
            <ScaleRow name="Orange / Ochre" scale={rstoOrange} />
            <ScaleRow name="Blue / Sky" scale={rstoBlue} />
            <ScaleRow name="Green / Saltbush" scale={rstoGreen} />
            <ScaleRow name="Neutral (Outback)" scale={rstoNeutral} />
            <ScaleRow name="Brown / Bark" scale={rstoBrown} />
            <ScaleRow name="Gray (UI neutral)" scale={rstoGray} />
            <ScaleRow name="Red (error / danger)" scale={rstoRed} />
            <ScaleRow
                name="Functional / Status"
                scale={rstoFunctional as unknown as Record<string, string>}
            />
        </Box>
    );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
    title: 'RSTO/Foundation/Colors',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
**RSTO colour system**

All tokens live in \`tokens.ts\`. \`palette.ts\` maps them to MUI palette roles.
\`components.ts\` applies them to individual MUI component overrides.

Chart colours are managed separately in \`chart-theme.ts\` — see **Foundation › Chart Palette**.
                `,
            },
        },
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const RawScales: Story = {
    render: () => <RawPalette />,
    name: 'Raw scales (tokens.ts)',
};

export const UsageRef: Story = {
    render: () => <UsageReference />,
    name: 'Usage reference',
};
