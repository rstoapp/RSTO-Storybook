---
name: rsto-storybook-design-system
description: RSTO design system enforcer for React/Next.js/MUI projects. Clean production-matched palette (orange primary, pure white backgrounds, pure grays), Fraunces display for h1 only (readable alternative to Bebas Neue) + Open Sans for all other text, MUI-first component strategy, atomic design hierarchy, and accessibility-first patterns. Triggers on UI component creation, theme customization, color/spacing/typography updates, button/chip/card/alert styling, responsive layout, Storybook story creation, or design system questions.
---

# RSTO Storybook Design System

Enforces the RSTO design system for React/Next.js projects using MUI (Material-UI). Matches rsto-app production implementation (updated 2026-07-14).

---

## When to Load

Load this skill when:
- Creating or modifying UI components
- Styling buttons, chips, cards, alerts, tooltips, or other MUI primitives
- Defining color, spacing, or typography tokens
- Building responsive layouts or charts
- Creating Storybook stories
- Questions about RSTO design patterns or theme usage
- Starting work on any UI task in an RSTO project

---

## Design Character

**Mood:** Clean, accessible, production-matched  
**Palette:** Orange (primary #F28B2D), blue (secondary), pure grays and whites  
**Typography:** Fraunces (display serif, h1 only for readability) + Open Sans (h2-h6, body sans-serif)  
**Component Strategy:** MUI-first → thin RSTO wrapper → custom (in order of preference)  
**Atomic Hierarchy:** Atoms (MUI primitives) → Molecules (2-3 atom combinations) → Organisms (complex sections) → Pages  
**Accessibility:** WCAG 2.2 AA minimum

---

## Procedure

### 1. Load token reference

→ Read [./references/tokens.md](./references/tokens.md)

This contains:
- Complete color palette (rstoOrange, rstoBlue, rstoGreen, rstoNeutral, rstoBrown, rstoGray, rstoRed, rstoFunctional)
- Typography scale (h1–h6, body1–2, button, caption, overline, eyebrow)
- Spacing scale (theme.spacing)
- Elevation levels
- Border tokens and radii
- Breakpoints (xs, sm, md, lg, xl)

### 2. Load stack-specific reference

This project uses **React + Next.js + MUI** → Read [./references/react-next-mui.md](./references/react-next-mui.md)

This contains:
- Token access patterns (`theme.palette.*`, `colours.*` imports)
- MUI-first component rules
- Atomic design file structure
- Styling methods (theme overrides > sx prop > never inline style)
- Responsive design patterns
- Next.js + MUI integration
- Storybook story requirements
- Self-audit checklist (15 items)

---

## Hard Rules

Apply these constraints to every component:

### Colors
1. **Never hard-code hex values** — Use `theme.palette.*` or `colours.*` imports
2. **Use pure neutrals** — Use `rstoGray` scale for backgrounds and text; pure white (#FFFFFF) for page/card backgrounds
3. **Primary = RSTO orange** — `rstoOrange._50` (#F28B2D) for primary buttons, tabs, warnings
4. **Secondary = blue** — `rstoBlue._70` (#19788E) for secondary actions
5. **Text = pure black/gray** — `rstoGray.black` (#191919) for body, `rstoGray._90` (#474747) for secondary

### Spacing
6. **Never hard-code pixels** — Use `theme.spacing()` for all padding, margin, gap values
7. **Base unit = 8px** — `theme.spacing(1)` = 8px, `theme.spacing(2)` = 16px, etc.

### Typography
8. **Display font (Fraunces) for h1 only** — More readable than Bebas Neue; all other text uses Open Sans
9. **Always use MUI Typography** — `<Typography variant="h1">` not `<h1 style={{...}}>`
10. **Eyebrow style via sx** — Not a MUI variant; use `eyebrowSx` import

### Components
11. **MUI-first** — If MUI has it (Button, Chip, Card, Alert, Tooltip), use it styled via theme; never reimplement
12. **Thin wrappers only** — Only create `RstoComponent` wrapper when RSTO-specific defaults are needed; always delegate to MUI
13. **No drop shadows on buttons** — `boxShadow: 'none'` enforced in theme
14. **Button border radius = 8px** — Theme override, don't change locally
15. **Cards default flat** — Use `variant="elevation"` only for hierarchy (sparingly)

### Layout
16. **Responsive via MUI props** — `{ xs: 12, lg: 6 }` not `@media` queries
17. **Sidebar layouts use lg={6}** — Never `md={6}` for 2-up charts with AppSideMenu (content too narrow)
18. **Chart minimum width: 560px** — Below this, axis labels illegible

### Atomic Design
19. **Atoms = MUI primitives** — Story-only files (`Button.stories.tsx`), no wrapper unless RSTO defaults needed
20. **Molecules = 2-3 atoms** — `RstoChip`, `InfoCard`, stateless combinations
21. **Organisms = complex sections** — `AppSideMenu`, `ChartCard`, may have local state

### Storybook
22. **Every component needs .stories.tsx** — With `tags: ['autodocs']` for auto-generated docs
23. **Cover all variants** — One story per meaningful prop combination
24. **No ThemeProvider in stories** — Pre-wrapped via `.storybook/preview.tsx`

### Accessibility
25. **WCAG 2.2 AA minimum** — All text/background combos must meet 4.5:1 contrast
26. **AAA on primary button** — Deep teal (#1D4552) on white = 8.1:1
27. **ChartCard requires titleTooltip** — Never render without explanation

---

## Component Checklist

Before marking a component done, audit against these 15 items (from the stack reference):

- [ ] 1. Uses MUI primitive or thin wrapper, never reimplements from scratch
- [ ] 2. All colors via `theme.palette.*` or `colours.*`, no hard-coded hex
- [ ] 3. All spacing via `theme.spacing()`, no pixel values
- [ ] 4. No inline `style` prop — uses `sx` or theme overrides only
- [ ] 5. Typography uses MUI `<Typography variant="...">` (or `eyebrowSx`)
- [ ] 6. Responsive props use MUI syntax: `{ xs: 12, lg: 6 }`
- [ ] 7. Buttons have no drop shadow (`boxShadow: 'none'`)
- [ ] 8. Cards use `variant="elevation"` only when needed (default flat)
- [ ] 9. If chart, `titleTooltip` prop required
- [ ] 10. Has `.stories.tsx` with `tags: ['autodocs']` and all variants
- [ ] 11. Self-contained — no implicit context or parent dependencies
- [ ] 12. Correct atomic hierarchy (atom/molecule/organism)
- [ ] 13. If sidebar layout, chart grids use `lg={6}` not `md={6}`
- [ ] 14. No accessibility violations (aria-label, sufficient contrast)
- [ ] 15. Follows MUI-first → thin wrapper → custom order

---

## Common Patterns

### Import Tokens
```typescript
import rstoTheme from '@/app/theme';
import { useTheme } from '@mui/material/styles';
import { colours } from '@/app/theme/palette';

const theme = useTheme();
theme.palette.primary.main    // rstoBlue._80 (#1D4552)
colours.rstoNeutral.sand      // #E8DCC6
```

### MUI Components with Theme
```tsx
// Buttons
<Button variant="contained" color="primary">Save</Button>
<Button variant="outlined" color="secondary">Cancel</Button>
<Button variant="contained" color="error">Delete</Button>

// Chips
<Chip label="Active" color="primary" />      // Dusk blue fill
<Chip label="Draft" color="secondary" />     // Deep rust fill
<Chip label="Archived" color="default" />    // Neutral gray

// Cards
<Card>Content</Card>                         // Flat, sand border
<Card variant="elevation">Content</Card>     // With shadow

// Alerts
<Alert severity="success">Saved</Alert>      // Green scale
<Alert severity="error">Failed</Alert>       // Red scale
```

### Typography
```tsx
<Typography variant="h1">Gowrie Victoria</Typography>
<Typography variant="body1">Body text</Typography>
<Typography variant="caption" color="text.secondary">Hint</Typography>

// Eyebrow style (not a MUI variant)
import { eyebrowSx } from '@/app/theme/typography';
<Typography sx={eyebrowSx}>ANC - Routine Care</Typography>
```

### Responsive Layout
```tsx
<Grid container spacing={3}>
  <Grid item xs={12} lg={6}>  {/* 1-up mobile, 2-up desktop */}
    <ChartCard title="Attendance" titleTooltip="Weekly attendance rates" />
  </Grid>
</Grid>

<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
  <Button>Export</Button>
  <Button>Filter</Button>
</Stack>
```

### Thin RSTO Wrapper
```tsx
// Only when RSTO-specific defaults are needed
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

export function RstoTooltip({ 
  placement = 'top',   // RSTO default
  arrow = true,        // RSTO default
  ...props 
}: TooltipProps) {
  return <Tooltip placement={placement} arrow={arrow} {...props} />;
}
```

---

## Example: Creating a New Component

**Task:** Build a status badge component

**Process:**
1. **Check MUI** — Does MUI have it? → Yes, `Chip`
2. **Check theme** — Does `rstoTheme` style it? → Yes, `MuiChip` variants in `components.ts`
3. **Decision:** Use MUI Chip directly, no wrapper needed

```tsx
// StatusBadge.stories.tsx
import { Chip } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Chip,
  tags: ['autodocs'],
  title: 'Atoms/StatusBadge',
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: { label: 'Active', color: 'primary' },
};

export const Draft: Story = {
  args: { label: 'Draft', color: 'secondary' },
};

export const Archived: Story = {
  args: { label: 'Archived', color: 'default' },
};
```

**No component file needed** — MUI Chip + rstoTheme is sufficient.

---

## References

- **Token reference:** [./references/tokens.md](./references/tokens.md)
- **React/Next.js/MUI reference:** [./references/react-next-mui.md](./references/react-next-mui.md)

---

## Notes

- This skill was generated from the RSTO Storybook theme system
- Source: `/Users/daniellebennett/Documents/RSTO Storybook/app/theme/`
- Fonts loaded via Google Fonts in `globals.css`
- All stories pre-wrapped in rstoTheme via `.storybook/preview.tsx`
- Target audience: Developers building UI components for RSTO platform (service provider dashboards, community insights)
