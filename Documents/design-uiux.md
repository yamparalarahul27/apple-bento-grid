# design-uiux
- **Purpose**: UI aesthetic, tokens, typography, component guidance.
- **Read when**: Designing new pages/components; aligning visuals.

## Tokens (current)
- Colors: primary blue (#4091ff range), accent purple (#d389ff range), success #22c55e, warning #facc15, danger #ef4444.
- Surface: background hsl var(--background); foreground hsl var(--foreground); muted/border vars in globals.
- Fonts: sans/mono from Geist (set in layout). Tailwind font families map to CSS vars.
- Shadows: `shadow-card-sm` for cards.

## Typography
- Headings: use Tailwind font-semibold; sizes 2xl–6xl for hero, 3xl for section titles.
- Body: text-slate-600/700 for secondary copy; 16–18px preferred.

## Components
- Buttons: rounded-full, gradient primary (blue→indigo) for CTAs; outlined neutral for secondary.
- Cards: rounded-2xl, border-slate-200/80, subtle shadow, optional gradient overlays.
- Badges: rounded-full, small uppercase text.

## Layout rules
- Max width ~6xl; sections spaced with gap-10–16.
- Use grid split for hero (content + panel); cards in 3-column responsive grids.

## Update rules
- Revise when tokens change or new components are standardized.
