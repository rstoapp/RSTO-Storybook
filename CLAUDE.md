# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Before writing any UI code, load the `rsto-storybook-design-system` skill.

## Commands

```bash
# Development
npm run dev              # Next.js dev server
npm run storybook        # Storybook dev server (port 6006)

# Build
npm run build            # Next.js production build
npm run build-storybook  # Build static Storybook

# Test & Lint
npm run lint             # ESLint
npx vitest               # Run all Storybook component tests (uses Playwright/Chromium)
npx vitest --reporter=verbose  # Run tests with details

# Visual regression
npm run chromatic        # Push to Chromatic for visual diffing
```

---

## Component Strategy

### 1. Always use MUI — never write raw HTML primitives

MUI is the UI primitive layer for this project. **Never re-implement what MUI already provides** (buttons, chips, cards, alerts, tooltips, etc.). Always go through MUI first:

1. **Check if MUI has it** — browse the [MUI component docs](https://mui.com/components/). If it exists, use it directly styled via `rstoTheme`.
2. **If RSTO-specific defaults are needed**, create a thin wrapper (e.g. `RstoChip`, `RstoTooltip`) that sets those defaults and delegates everything else to MUI.
3. **Only then** reach for a fully custom component.

```tsx
// Bad — re-implements what MUI already handles
export function StatusTag({ label }: { label: string }) {
  return <span className="rounded-full bg-orange-100 px-2 py-1 text-sm">{label}</span>;
}

// Good — uses MUI Chip styled via rstoTheme
import { Chip } from '@mui/material';

export function StatusTag({ label }: { label: string }) {
  return <Chip label={label} color="primary" size="small" />;
}
```

### 2. Custom wrappers must compose MUI primitives

When a custom component is necessary, build it by composing MUI components. Avoid re-implementing styling, accessibility, or behaviour that MUI already provides.

```tsx
// Good — composes MUI primitives, adds RSTO-specific defaults
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

export function RstoTooltip({ placement = 'top', arrow = true, ...props }: TooltipProps) {
  return <Tooltip placement={placement} arrow={arrow} {...props} />;
}
```

```tsx
// Bad — reimplements tooltip behaviour from scratch
export function RstoTooltip({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open && <div className="absolute bg-black text-white p-1 rounded text-xs">{title}</div>}
    </div>
  );
}
```

---

## Atomic Design Structure

### Atoms — `app/components/atoms/`

MUI components used directly, styled entirely through `rstoTheme`. No custom wrapper needed.

- Represented by story files only: `Button.stories.tsx`, `Alert.stories.tsx`, `Chip.stories.tsx`, `Card.stories.tsx`, `Typography.stories.tsx`, `Spacing.stories.tsx`
- Do not create a wrapper component unless RSTO-specific prop defaults are required.

### Molecules — `app/components/molecules/`

Thin RSTO wrappers over one MUI primitive, or stateless combinations of 2–3 atoms with a single job.

Examples: `RstoChip`, `RstoTooltip`, `HtmlTooltip`, `DataProcessingAlert`, `InfoCard`, `WarningCard`, `InsightCard`, `MenuItem`, `Accordion`

### Organisms — `app/components/organisms/`

Complex compositions that may include molecules, atoms, and local state. Can represent a section of a page.

Examples: `SideMenu` (list of MenuItems), `charts/ChartCard` (chart + title/layout wrapper)

Charts follow a specific layered pattern:
`BaseChart` → `BarChart` / `LineChart` / `HorizontalBarChart` → `ChartCard`

The `charts/` subdirectory lives under `organisms/` since ChartCard is the organism; the base/variant chart components are its sub-components.

### Templates / Pages — `app/components/pages/`

Page-level layout components that wire up organisms into a full view.

Examples: `ServiceProvider`

### File structure

```
app/components/
  atoms/                    # Story-only files, no component wrappers
  molecules/
    ComponentName.tsx
    ComponentName.stories.tsx
  organisms/
    ComponentName.tsx
    ComponentName.stories.tsx
    charts/                 # Grouped subdirectory (organism with multiple sub-components)
  pages/
    PageName.stories.tsx
```

---

## Decomposing Complex Requests

When asked to build something non-trivial, analyse the request first and break it down before writing any code:

1. **Identify the atoms** — which pieces map directly to existing MUI primitives (`Button`, `Chip`, `Card`, `Alert`, etc.) styled via the theme?
2. **Group atoms into molecules** — which small, stateless combinations form a coherent UI unit and need RSTO-specific defaults?
3. **Compose molecules/atoms into organisms** — which sections have their own identity or local state?
4. **Wire organisms into a template** — the top-level layout that assembles everything into a page.

### Decision checklist

| What you're building | Where it lives |
|---|---|
| MUI primitive styled via theme only | Story-only file in `app/components/` |
| MUI primitive with RSTO-specific defaults | Molecule wrapper in `app/components/` |
| Stateless combination of 2+ atoms/molecules | Molecule in `app/components/` |
| Section with local state or multiple molecules | Organism in `app/components/` |
| Full page layout | Template in `app/components/pages/` |

> A request like *"build a dashboard header"* should result in: atoms (`Avatar`, `Button`) + molecules (`NavMenu`, `UserWidget`) + an organism (`DashboardHeader`) — not one monolithic component.

---

## Storybook Stories

Every component — atom, molecule, organism, or template — must have a `.stories.tsx` file.

### Rules

- **Always enable autodocs** — every story file must include `tags: ['autodocs']` in its meta so Storybook auto-generates a docs page from props and stories.
- **Cover all variants** — every prop that changes appearance or behaviour needs at least one story demonstrating it.
- **Cover all states** — loading, error, empty, disabled, etc. where applicable.
- **One story per meaningful combination** — avoid a single "kitchen sink" story; prefer named stories that are self-explanatory.
- **All stories are pre-wrapped** in `rstoTheme` via `.storybook/preview.tsx` — do not add `ThemeProvider` inside individual stories.

```tsx
// Good — autodocs enabled, each variant gets its own named story
const meta = {
  component: RstoChip,
  tags: ['autodocs'],
} satisfies Meta<typeof RstoChip>;

export const Primary: Story = { args: { color: 'primary' } };
export const Outlined: Story = { args: { variant: 'outlined' } };
export const Disabled: Story = { args: { disabled: true } };
```

```tsx
// Bad — no autodocs, single story requires manual prop tweaking
const meta = {
  component: RstoChip,
} satisfies Meta<typeof RstoChip>;

export const Default: Story = { args: {} };
```

---

## Component Independence

Each component must be self-contained and work in isolation.

- **No implicit context** — do not rely on a parent component, global state, or a specific page to render correctly. Supply everything needed via props.
- **No side effects at render time** — avoid triggering network requests, mutations, or navigation as a side-effect of rendering.
- **Portable** — dropping a component into Storybook, a test, or a different page must work without extra setup.

---

## Theme System (`app/theme/`)

The MUI theme is the central design token layer. All colour, typography, and component styling decisions live here — not in inline styles or CSS classes.

- **`palette.ts`** — Brand colours with 5-level tint scale (`_80` darkest → `_10` lightest): `rstoOrange` (primary), `rstoGray`, `rstoBlue`, `rstoGreen`, `rstoRed`, `rstoFunctional`
- **`typography.ts`** — Full type scale; Bebas Neue for `h1` only, Inter for everything else. Fonts loaded via Google Fonts in `globals.css`
- **`components.ts`** — MUI component overrides (Button, Card, Chip, Tabs, Alert, Link)
- **`index.ts`** — Assembles and exports `rstoTheme` via `createTheme()`

When adding a new component style, prefer a theme override in `components.ts` over a local `sx` prop.

---

## Layout & Responsive

### Breakpoints in use

MUI defaults apply. The two breakpoints that matter for dashboard layouts:

| Breakpoint | Width  | Meaning in this system          |
|------------|--------|---------------------------------|
| `sm`       | 600px  | Smallest tablet / large phone   |
| `lg`       | 1200px | Sidebar + content comfortably fits |

### Chart grids

| Layout context              | Grid prop | Result                        |
|-----------------------------|-----------|-------------------------------|
| Full-bleed (no sidebar)     | `md={6}`  | 2-up from 900px               |
| With sidebar (~288px wide)  | `lg={6}`  | 2-up from 1200px              |
| Any                         | `xs={12}` | 1-up below the above          |

**Rule:** Never use `md={6}` in a layout that includes `AppSideMenu` or `DashboardLayout`. The remaining content pane is too narrow at 900px — charts clip and legends become illegible. Always use `lg={6}`.

**Minimum chart container width: ~560px.** Below this, axis labels, legends, and tick marks become unreadable. Document this constraint in the `ChartCard` story `docs.description`.

**`ChartCard` tooltip is mandatory.** Every `ChartCard` must include a `titleTooltip` prop explaining what the chart measures. Never render a `ChartCard` without one.

### Sidebar responsive behaviour — implemented in `AppSideMenu`

| Viewport | Sidebar state | Width |
|---|---|---|
| ≥ `md` (900px+) | Expanded — full label nav | 270px |
| `sm`–`md` (600–899px) | Auto-collapsed — icon rail only | 68px |
| < `sm` (< 600px) | **Not yet implemented** — intended: hidden, full-screen `Drawer` via hamburger |

`AppSideMenu` uses `useMediaQuery(theme.breakpoints.down('md'))` to auto-collapse below 900px. The user can still expand or collapse manually at any width — the breakpoint only sets the default. The user override resets whenever the breakpoint changes.

#### Still to implement: mobile Drawer (< 600px)
- Below `sm`: `AppSideMenu` should not render inline. The consuming page should render a hamburger icon that opens an MUI `Drawer` (temporary, anchored left).
- `DashboardLayout` needs `display: { xs: 'block', lg: 'flex' }` and `IndexContainer` `display: { xs: 'none', sm: 'block' }`.
- Until this is done, avoid showing the page story at < 600px.

#### Content at mobile widths
| Component      | Mobile behaviour                                              |
|----------------|---------------------------------------------------------------|
| Chart grid     | Already handled — `xs={12}` forces 1-up                      |
| `InsightCard`  | Reflowing card — no change needed                             |
| Stat chips row | Wrap is already set (`flexWrap="wrap"`) — no change needed    |
| Page header    | Stack vertically: `direction={{ xs: 'column', sm: 'row' }}`  |
| Export/period buttons | Move into a `...` overflow menu or below the heading at xs |

#### Storybook story requirements
When implementing the mobile sidebar, add a `Mobile` story to `ServiceProvider.stories.tsx`:

```tsx
export const Mobile: Story = {
    name: 'Gowrie Victoria — Mobile (414px)',
    parameters: {
        viewport: { defaultViewport: 'mobile1' },
        layout: 'fullscreen',
    },
    render: () => <ServiceProviderPage />,
};
```

---

## Pending Changes

`CHANGES.md` tracks design decisions ready to apply to `rsto-app` but not yet merged — check it before modifying `RstoTooltip`, accordion styles, or the typography scale.
