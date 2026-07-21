# RSTO Design System — React / Next.js / MUI Reference

Stack-specific implementation rules for the RSTO design system in React projects using MUI (Material-UI) and Next.js.

---

## Stack Detection

This reference applies when:
- `package.json` includes `react`, `next`, and `@mui/material`
- Files use `.tsx` or `.jsx` extensions
- MUI components are imported from `@mui/material`

---

## Token Access

Import the rstoTheme and access tokens through MUI's theme system:

```typescript
import rstoTheme from '@/app/theme';
import { useTheme } from '@mui/material/styles';

// In components
const theme = useTheme();
const primaryColor = theme.palette.primary.main; // rstoBlue._80
const shadowText = theme.palette.text.secondary;  // rstoNeutral.shadow
```

### Direct Token Imports (when needed)

```typescript
import { colours } from '@/app/theme/palette';

// Access raw color scales
colours.rstoOrange._50   // #F28B2D
colours.rstoBlue._70     // #2D6B7A
colours.rstoNeutral.sand // #E8DCC6
```

---

## Component Rules

### 1. MUI-First Principle

**Always check MUI first.** If MUI provides a primitive (Button, Chip, Card, Alert, Tooltip, etc.), use it styled via `rstoTheme`. Never re-implement.

```tsx
// ❌ BAD — reimplements what MUI already does
export function StatusTag({ label }: { label: string }) {
  return <span className="rounded-full bg-orange-100 px-2 py-1">{label}</span>;
}

// ✅ GOOD — uses MUI Chip styled via rstoTheme
import { Chip } from '@mui/material';

export function StatusTag({ label }: { label: string }) {
  return <Chip label={label} color="primary" size="small" />;
}
```

### 2. Thin RSTO Wrappers (when needed)

Only create a wrapper when RSTO-specific defaults are required. The wrapper must delegate to MUI.

```tsx
// ✅ GOOD — sets RSTO defaults, delegates everything else to MUI
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

export function RstoTooltip({ 
  placement = 'top', 
  arrow = true, 
  ...props 
}: TooltipProps) {
  return <Tooltip placement={placement} arrow={arrow} {...props} />;
}
```

```tsx
// ❌ BAD — reimplements tooltip behavior from scratch
export function RstoTooltip({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open && <div className="tooltip">{title}</div>}
    </div>
  );
}
```

### 3. Styling Method: Theme-First

Prefer theme overrides in `app/theme/components.ts` over local `sx` props.

**Priority:**
1. **Theme override** — Component-wide default styling
2. **`sx` prop** — Instance-specific overrides
3. **Inline `style`** — Never use (breaks theme integration)

```tsx
// ✅ GOOD — uses theme's MuiButton override
<Button color="primary">Save</Button>

// ✅ ACCEPTABLE — instance-specific override via sx
<Button sx={{ borderRadius: 4 }}>Special Button</Button>

// ❌ BAD — inline style bypasses theme
<Button style={{ backgroundColor: '#1D4552' }}>Save</Button>
```

### 4. Color Access

```tsx
// ✅ GOOD — uses theme palette
<Box sx={{ 
  backgroundColor: theme.palette.background.paper,  // rstoNeutral.paper
  color: theme.palette.text.primary,                // rstoNeutral.ink
}} />

// ✅ ACCEPTABLE — direct token access when theme doesn't expose it
import { colours } from '@/app/theme/palette';

<Box sx={{ 
  borderColor: colours.rstoNeutral.sand,  // #E8DCC6
}} />

// ❌ BAD — hard-coded hex value
<Box sx={{ backgroundColor: '#E8DCC6' }} />
```

### 5. Spacing

Use `theme.spacing()` — never hard-coded pixel values.

```tsx
// ✅ GOOD
<Box sx={{ 
  padding: theme.spacing(2),      // 16px
  marginBottom: theme.spacing(3), // 24px
  gap: theme.spacing(1.5),        // 12px
}} />

// ❌ BAD
<Box sx={{ 
  padding: '16px',
  marginBottom: '24px',
}} />
```

---

## Component Hierarchy (Atomic Design)

### Atoms — `app/components/atoms/`
MUI primitives styled entirely via `rstoTheme`. **No wrapper component needed** unless RSTO-specific prop defaults are required.

Represented by story files only: `Button.stories.tsx`, `Alert.stories.tsx`, `Chip.stories.tsx`

```tsx
// Button.stories.tsx demonstrates MUI Button with rstoTheme
import { Button } from '@mui/material';

export const Primary: Story = {
  render: () => <Button color="primary">Save</Button>,
};
```

### Molecules — `app/components/molecules/`
Thin RSTO wrappers or stateless combinations of 2-3 atoms.

Examples: `RstoChip`, `RstoTooltip`, `InfoCard`, `MenuItem`

```tsx
// RstoChip.tsx
import Chip, { ChipProps } from '@mui/material/Chip';

export function RstoChip({ size = 'small', ...props }: ChipProps) {
  return <Chip size={size} {...props} />;
}
```

### Organisms — `app/components/organisms/`
Complex compositions with local state, representing a page section.

Examples: `AppSideMenu`, `DynamicDashboard`, `charts/ChartCard`

```tsx
// ChartCard.tsx
import { Card, CardContent, Typography, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export function ChartCard({ title, titleTooltip, children }) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h4">{title}</Typography>
          <Tooltip title={titleTooltip} arrow>
            <InfoOutlinedIcon fontSize="small" />
          </Tooltip>
        </Box>
        {children}
      </CardContent>
    </Card>
  );
}
```

### Templates / Pages — `app/components/pages/`
Page-level layouts assembling organisms.

Example: `ServiceProvider.stories.tsx`

---

## Typography

```tsx
// ✅ GOOD — uses MUI Typography with variant
<Typography variant="h1">Gowrie Victoria</Typography>
<Typography variant="body1">Supporting text</Typography>
<Typography variant="caption" color="text.secondary">
  Last updated 2024
</Typography>

// ✅ GOOD — eyebrow style via sx (not a MUI variant)
import { eyebrowSx } from '@/app/theme/typography';

<Typography sx={eyebrowSx}>ANC - Routine Care</Typography>

// ❌ BAD — unstyled div with className
<div className="text-xl font-bold">Heading</div>
```

---

## Responsive Design

Use MUI's responsive prop syntax with theme breakpoints:

```tsx
// ✅ GOOD — responsive grid
<Grid container spacing={3}>
  <Grid item xs={12} lg={6}>  {/* 1-up mobile, 2-up desktop */}
    <ChartCard title="Attendance" />
  </Grid>
</Grid>

// ✅ GOOD — responsive Stack direction
<Stack 
  direction={{ xs: 'column', sm: 'row' }}
  spacing={2}
>
  <Button>Export</Button>
  <Button>Filter</Button>
</Stack>

// ❌ BAD — hard-coded @media query
<Box sx={{
  '@media (max-width: 900px)': { flexDirection: 'column' }
}} />
```

**Critical rule:** In layouts with `AppSideMenu`, always use `lg={6}` for 2-up charts (not `md={6}` — sidebar makes content too narrow).

---

## Hard Rules

1. **Never hard-code colors** — Use `theme.palette.*` or `colours.*` imports
2. **Never hard-code spacing** — Use `theme.spacing()`
3. **Never use inline `style`** — Use `sx` prop or theme overrides
4. **Never re-implement MUI primitives** — Check MUI docs first
5. **No drop shadows on buttons** — `boxShadow: 'none'` is enforced in theme
6. **Buttons have 8px border radius** — Theme override, don't change locally
7. **Cards default to flat** — Use `variant="elevation"` only when hierarchy is needed
8. **ChartCard requires titleTooltip** — Never render without explanation
9. **Chart minimum width: 560px** — Below this, axis labels become illegible
10. **Primary button is deep teal** (`rstoBlue._80`) with 8.1:1 contrast (AAA)

---

## Storybook Integration

Every component must have a `.stories.tsx` file with:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { RstoChip } from './RstoChip';

const meta = {
  component: RstoChip,
  tags: ['autodocs'],  // ← REQUIRED — auto-generates docs page
} satisfies Meta<typeof RstoChip>;

export default meta;
type Story = StoryObj<typeof meta>;

// One story per meaningful variant
export const Primary: Story = { args: { color: 'primary', label: 'Active' } };
export const Secondary: Story = { args: { color: 'secondary', label: 'Draft' } };
export const Disabled: Story = { args: { disabled: true, label: 'Inactive' } };
```

All stories are pre-wrapped in `rstoTheme` via `.storybook/preview.tsx` — do not add `ThemeProvider` inside stories.

---

## Self-Audit Checklist

Before marking a component done, verify:

- [ ] 1. Component uses MUI primitive (or thin wrapper), never reimplements from scratch
- [ ] 2. All colors accessed via `theme.palette.*` or `colours.*`, no hard-coded hex
- [ ] 3. All spacing via `theme.spacing()`, no pixel values
- [ ] 4. No inline `style` prop — uses `sx` or theme overrides only
- [ ] 5. Typography uses MUI `<Typography variant="...">` (or `eyebrowSx` for eyebrow)
- [ ] 6. Responsive props use MUI syntax: `{ xs: 12, lg: 6 }`, not `@media` queries
- [ ] 7. Buttons have no drop shadow (`boxShadow: 'none'` is theme default)
- [ ] 8. Cards use `variant="elevation"` only when hierarchy is needed (default flat)
- [ ] 9. If chart component, `titleTooltip` prop is required and documented
- [ ] 10. Component has `.stories.tsx` with `tags: ['autodocs']` and covers all variants
- [ ] 11. Component is self-contained — no implicit context or parent dependencies
- [ ] 12. Correct atomic hierarchy: atoms = MUI primitives, molecules = 2-3 atoms, organisms = complex compositions
- [ ] 13. If in a sidebar layout, chart grids use `lg={6}` (not `md={6}`)
- [ ] 14. No accessibility violations (`aria-label` where needed, sufficient contrast)
- [ ] 15. Follows MUI-first → thin wrapper → custom (in that order of preference)

---

## Common Patterns

### Button Variants

```tsx
// Primary (deep teal fill)
<Button variant="contained" color="primary">Save</Button>

// Secondary (outlined sand border, earth text)
<Button variant="outlined" color="secondary">Cancel</Button>

// Destructive (terracotta fill)
<Button variant="contained" color="error">Delete</Button>
```

### Chips

```tsx
// Primary (dusk blue fill)
<Chip label="Active" color="primary" />

// Secondary (deep rust fill)
<Chip label="Draft" color="secondary" />

// Default (neutral gray)
<Chip label="Archived" color="default" />
```

### Cards

```tsx
// Default (flat, sand border)
<Card>
  <CardContent>Content</CardContent>
</Card>

// Elevated (with shadow)
<Card variant="elevation">
  <CardContent>Content</CardContent>
</Card>
```

### Alerts

```tsx
// Success (green scale)
<Alert severity="success">Data saved successfully</Alert>

// Error (red scale)
<Alert severity="error">Upload failed</Alert>
```

### Tooltips

```tsx
import { RstoTooltip } from '@/app/components/molecules/RstoTooltip';

// RSTO default: placement="top", arrow=true
<RstoTooltip title="Explanation text">
  <InfoOutlinedIcon />
</RstoTooltip>
```

---

## File Structure

```
app/
  theme/
    tokens.ts          ← Raw color/font tokens (single source of truth)
    palette.ts         ← MUI palette mapping
    typography.ts      ← Type scale
    components.ts      ← MUI component overrides
    index.ts           ← Assembled rstoTheme
  components/
    atoms/
      Button.stories.tsx       ← Story-only, no wrapper
      Alert.stories.tsx
      Chip.stories.tsx
    molecules/
      RstoChip.tsx
      RstoChip.stories.tsx
      InfoCard.tsx
      InfoCard.stories.tsx
    organisms/
      AppSideMenu.tsx
      AppSideMenu.stories.tsx
      charts/
        ChartCard.tsx
        ChartCard.stories.tsx
    pages/
      ServiceProvider.stories.tsx
```

---

## Next.js Integration

MUI + Next.js requires Emotion cache configuration:

```tsx
// layout.tsx
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import rstoTheme from '@/app/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={rstoTheme}>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

Font loading via Google Fonts in `globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600&family=Open+Sans:wght@400;600;700&display=swap');
```

---

## Common Mistakes to Avoid

1. **❌ Creating a custom Button when MUI Button exists**
   - ✅ Use `<Button color="primary">` styled via theme

2. **❌ Hard-coding `#1D4552` in component**
   - ✅ Use `theme.palette.primary.main` or `colours.rstoBlue._80`

3. **❌ `padding: '16px'` in sx prop**
   - ✅ `padding: theme.spacing(2)`

4. **❌ `<h1 style={{ fontSize: '32px' }}>`**
   - ✅ `<Typography variant="h1">`

5. **❌ Creating a molecule that does an organism's job**
   - ✅ Check atomic hierarchy: molecules = 2-3 atoms, organisms = complex sections

6. **❌ Using `md={6}` for charts in sidebar layout**
   - ✅ Use `lg={6}` — content too narrow at `md` with sidebar

7. **❌ ChartCard without titleTooltip**
   - ✅ Always include tooltip explaining what the chart measures

8. **❌ Story without `tags: ['autodocs']`**
   - ✅ Always include for auto-generated docs page

9. **❌ Reimplementing tooltip behavior with `useState` and `onMouseEnter`**
   - ✅ Use MUI Tooltip or RstoTooltip wrapper

10. **❌ Adding ThemeProvider inside a story**
    - ✅ Stories are pre-wrapped via `.storybook/preview.tsx`
