# RSTO Design Tokens

Complete token reference extracted from the RSTO Storybook theme system.
**Matches rsto-app production implementation** (updated 2026-07-14).

---

## Color Palette

### Neutrals (Pure Gray Scale)
Pure whites and grays for surface and text colors.

| Token | Value | Role | CSS Var |
|-------|-------|------|---------|
| `rstoNeutral.paper` | `#FFFFFF` | Page background | `--n-paper` |
| `rstoNeutral.bone` | `#FCFCFC` | Card backgrounds | `--n-bone` |
| `rstoNeutral.sand` | `#F3F3F3` | Rules, borders | `--n-sand` |
| `rstoNeutral.stone` | `#D1D1D1` | Tertiary text, disabled state | `--n-stone` |
| `rstoNeutral.shadow` | `#474747` | Secondary text | `--n-shadow` |
| `rstoNeutral.earth` | `#191919` | Body text alternative | `--n-earth` |
| `rstoNeutral.ink` | `#191919` | Headlines, primary text | `--n-ink` |

### Orange (Brand Primary)
RSTO primary orange scale.

| Token | Value | Role |
|-------|-------|------|
| `rstoOrange._10` | `#FDF1E2` | Lightest tint |
| `rstoOrange._20` | `#F8D9B0` | |
| `rstoOrange._30` | `#F0B174` | |
| `rstoOrange._40` | `#E8934A` | |
| `rstoOrange._50` | `#F28B2D` | **Primary orange** — primary buttons, tabs, warnings |
| `rstoOrange._60` | `#D87214` | Darker orange — hover states |
| `rstoOrange._70` | `#A53F00` | Deep orange — active states |
| `rstoOrange._80` | `#730C00` | Darkest orange |

### Blue (Secondary Accent)
Blue accent scale for secondary actions and info states.

| Token | Value | Role | Contrast |
|-------|-------|------|----------|
| `rstoBlue._10` | `#E8F2F4` | Light blue hover fill | |
| `rstoBlue._20` | `#C3DDE2` | |  |
| `rstoBlue._30` | `#9CC5CE` | | |
| `rstoBlue._40` | `#7AB8C5` | | |
| `rstoBlue._50` | `#65C4DB` | **Light blue** — info alerts | |
| `rstoBlue._60` | `#4CAAC1` | Mid blue — secondary buttons, chips | |
| `rstoBlue._70` | `#19788E` | Dark blue — links, borders | |
| `rstoBlue._80` | `#00455C` | Darkest blue | |

### Green / Saltbush
Desaturated bushland greens. Success states, positive indicators.

| Token | Value | Role |
|-------|-------|------|
| `rstoGreen._10` | `#EDF0E5` | Success alert background |
| `rstoGreen._20` | `#D4DCBC` | |
| `rstoGreen._30` | `#A8B48A` | Success alert border |
| `rstoGreen._40` | `#7F9165` | |
| `rstoGreen._50` | `#5D7A45` | Eucalyptus — on-track status |
| `rstoGreen._60` | `#475F34` | Mulga — success alert stripe |
| `rstoGreen._70` | `#2D3D20` | |

### Brown / Bark
Red ochre, pindan, bark. Warm tertiary accents, data vis.

| Token | Value | Role |
|-------|-------|------|
| `rstoBrown._10` | `#F0E4D5` | |
| `rstoBrown._20` | `#D8C4A6` | |
| `rstoBrown._30` | `#B8997A` | |
| `rstoBrown._40` | `#96735A` | |
| `rstoBrown._50` | `#6F5340` | Bark |
| `rstoBrown._60` | `#4F3A2C` | |
| `rstoBrown._70` | `#2D1F16` | |

### Gray (Pure Neutral)
Pure gray scale. MUI defaults, non-brand surfaces.

| Token | Value | Role |
|-------|-------|------|
| `rstoGray.white` | `#FFFFFF` | Pure white |
| `rstoGray._20` | `#FCFCFC` | |
| `rstoGray._30` | `#F3F3F3` | Default chip fill |
| `rstoGray._40` | `#EFEFEF` | |
| `rstoGray._50` | `#EAEAEA` | |
| `rstoGray._60` | `#D1D1D1` | |
| `rstoGray._70` | `#A3A3A3` | |
| `rstoGray._80` | `#757575` | |
| `rstoGray._90` | `#474747` | Default chip text |
| `rstoGray.black` | `#191919` | Pure black |
| `rstoGray.shadow` | `#1919190D` | Card elevation shadow |

### Red (Error States)
Error, danger, critical alerts.

| Token | Value | Role |
|-------|-------|------|
| `rstoRed._10` | `#FCEBEB` | Error alert background |
| `rstoRed._20` | `#F6C3C3` | |
| `rstoRed._30` | `#F19A9A` | Error alert border |
| `rstoRed._40` | `#EB7272` | |
| `rstoRed._50` | `#E23636` | |
| `rstoRed._60` | `#AF0303` | Error alert stripe, icon |
| `rstoRed._70` | `#7C0000` | |
| `rstoRed._80` | `#490000` | |

### Functional / Status
Semantic status colors.

| Token | Value | Semantic Role |
|-------|-------|---------------|
| `rstoFunctional.success` | `#99D35F` | Success icon, badge fill |
| `rstoFunctional.error` | `#DA2E2E` | Error state |
| `rstoFunctional.statusPositive` | `#5D7A45` | On-track indicator |
| `rstoFunctional.statusModerate` | `#3E90A3` | Watch indicator |
| `rstoFunctional.statusWarning` | `#F28B2D` | Below-target indicator |
| `rstoFunctional.statusCritical` | `#A34E16` | Needs attention indicator |

---

## Typography

### Font Families
| Token | Value | Usage |
|-------|-------|-------|
| `fonts.display` | `"Fraunces", Georgia, "Times New Roman", serif` | H1 only |
| `fonts.body` | `"Open Sans", sans-serif` | All other text |

**Loading:** Both fonts loaded via Google Fonts in `globals.css`

### Type Scale

| Variant | Size | Line Height | Weight | Letter Spacing | Usage |
|---------|------|-------------|--------|----------------|-------|
| `h1` | 36px (2.25rem) | 44px (2.75rem) | 600 | 0.02em | Display font (Fraunces), page titles — more readable than Bebas Neue |
| `h2` | 24px (1.5rem) | 32px (2rem) | 700 | -0.01em | Section headings |
| `h3` | 20px (1.25rem) | 28px (1.75rem) | 700 | 0 | Subsection headings |
| `h4` | 24px (1.5rem) | 32px (2rem) | 600 | 0 | Card titles |
| `h5` | 22px (1.375rem) | 28px (1.75rem) | 600 | 0 | Small headings |
| `h6` | 16px (1rem) | 24px (1.5rem) | 600 | 0 | Inline headings |
| `body1` | 16px (1rem) | 24px (1.5rem) | 400 | 0.01em | Body copy (default) |
| `body2` | 14px (0.875rem) | 22px (1.375rem) | 400 | 0.01em | Supporting text |
| `button` | 14px (0.875rem) | 20px (1.25rem) | 600 | 0 | Buttons (no transform) |
| `caption` | 12px (0.75rem) | 18px (1.125rem) | 400 | 0.02em | Captions, hints |
| `overline` | 11px (0.6875rem) | 16px (1rem) | 600 | 0.08em | UPPERCASE labels |

### Custom Styles

**Eyebrow** (not a MUI variant — use via `sx` prop):
```typescript
{
  fontSize: '0.6875rem',    // 11px
  fontWeight: 600,
  lineHeight: 1,
  letterSpacing: '0.03em',
  textTransform: 'none',     // NOT uppercase (vs overline)
}
```
Usage: `<Typography sx={eyebrowSx}>ANC - Routine Care</Typography>`

---

## Spacing

MUI default spacing scale (1 unit = 8px):

| Token | Value | Common Usage |
|-------|-------|--------------|
| `theme.spacing(0.5)` | 4px | Tight internal padding |
| `theme.spacing(1)` | 8px | Button padding, icon spacing |
| `theme.spacing(1.5)` | 12px | Chip padding |
| `theme.spacing(2)` | 16px | Card padding, standard gaps |
| `theme.spacing(3)` | 24px | Section spacing |
| `theme.spacing(4)` | 32px | Major layout spacing |
| `theme.spacing(6)` | 48px | Page margins |

---

## Elevation

| Level | Token | Shadow | Usage |
|-------|-------|--------|-------|
| 0 | Default | `none` | Flat cards (default) |
| 1 | `variant="elevation"` | `0px 4px 4px 0px ${rstoGray.shadow}` | Elevated cards |

**Rule:** RSTO uses minimal elevation. Default cards have no shadow. Use `elevation` variant sparingly for hierarchy.

---

## Borders

| Token | Value | Usage |
|-------|-------|-------|
| Card border | `1px solid ${rstoNeutral.sand}` | Default card border |
| Button border | `1px solid ${rstoNeutral.sand}` | Secondary button |
| Focus ring | `2px solid ${rstoBlue._80}` | Interactive elements (via MUI) |

**Border radius:**
- Buttons: `8px`
- Cards: `2px` (theme default, via `borderRadius: 2`)

---

## Breakpoints

| Name | Min Width | Typical Usage |
|------|-----------|---------------|
| `xs` | 0px | Mobile (default) |
| `sm` | 600px | Tablet / large phone |
| `md` | 900px | Small desktop, sidebar auto-collapse point |
| `lg` | 1200px | Desktop with sidebar + 2-up charts |
| `xl` | 1440px | Wide desktop |

**Critical rule:** Never use `md={6}` in layouts with sidebar — charts become illegible below 1200px. Always use `lg={6}`.

---

## Theme Character

**Dominant surface:** Pure white (`#FFFFFF`)  
**Primary accent:** RSTO orange (`rstoOrange._50` #F28B2D)  
**Secondary accent:** Blue (`rstoBlue._70` #19788E)  
**Mood:** Clean, accessible, production-matched (updated 2026-07-14)

### Key Constraints

1. **MUI-first** — Never re-implement MUI primitives; always style via theme or thin wrappers
2. **Pure neutrals** — Use `rstoGray` scale for backgrounds and text
3. **No drop shadows** — Buttons use `boxShadow: 'none'`; cards default flat
4. **Atomic design** — Atoms (MUI primitives) → Molecules (RSTO wrappers) → Organisms (composed sections)
5. **Chart minimum width:** ~560px for legible axis labels
6. **Accessibility:** All interactive colors meet WCAG 2.2 AA minimum
7. **Fraunces for h1 only** — More readable than Bebas Neue; h2-h6 use Open Sans
