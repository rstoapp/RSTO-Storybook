# RSTO App — Pending Changes

Design and component decisions made in Storybook that need to be applied back to rsto-app.

---

## Tooltip icon

**File:** `src/components/molecules/RstoTooltip/index.tsx`

Replace `HelpOutlineIcon` with `InfoOutlinedIcon` as the default icon for all tooltip variants.

```tsx
// Before
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// ...
<HelpOutlineIcon sx={{ fontSize: '16px', color: variant === 'insight' ? 'rstoBlue._50' : 'inherit' }} />

// After
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// ...
<InfoOutlinedIcon sx={{ fontSize: '16px', color: variant === 'insight' ? 'rstoBlue._50' : 'inherit' }} />
```

---

## Typography scale

**File:** `src/app/theme/typography.ts` (or equivalent theme file)

### Bebas Neue — h1 only
Bebas Neue is difficult to read. Restrict it to h1 only (major RSTO product headings). Remove from h2 and h3.

### Updated scale

| Variant | Font | Size | Weight | Line height |
|---|---|---|---|---|
| h1 | Bebas Neue | 3rem (48px) | — | 3.5rem |
| h2 | Inter | 2rem (32px) | 700 | 2.5rem |
| h3 | Inter | 1.5rem (24px) | 700 | 2rem |
| h4 | Inter | 1.25rem (20px) | 600 | 1.75rem |
| h5 | Inter | 1.125rem (18px) | 600 | 1.5rem |
| h6 | Inter | 1rem (16px) | 600 | 1.5rem |
| body1 | Inter | 1rem (16px) | — | 1.5rem |
| body2 | Inter | 0.875rem (14px) | — | 1.375rem |
| subtitle1 | Inter | 0.875rem (14px) | — | 1.375rem |
| subtitle2 | Inter | 0.75rem (12px) | — | 1.25rem |
| button | Inter | 0.875rem (14px) | 600 | 1.25rem |
| caption | Inter | 0.75rem (12px) | — | 1.125rem |
| overline | Inter | 0.625rem (10px) | 600 | 1rem |

**Reason:** Previous scale had h4 (1.5rem) equal to h2 (1.5rem), and h4/h5 only 2px apart — no visible hierarchy. body1 line-height was 1.375 (too tight, standard is 1.5x).

---

## Accordion border radius on hover

**File:** `src/components/molecules/Accordion/index.tsx`

MUI's Accordion internally overrides `borderRadius` on `:first-of-type` and `:last-of-type` children, causing the hover orange border to appear with square corners. Fix by overriding those selectors and adding `overflow: hidden`.

```tsx
const StyledAccordion = styled(MuiAccordion)(({ theme }) => ({
    borderRadius: '8px',
    '&:first-of-type': { borderRadius: '8px' },  // add
    '&:last-of-type': { borderRadius: '8px' },    // add
    overflow: 'hidden',                            // add
    // ... rest unchanged
}));
```

---
