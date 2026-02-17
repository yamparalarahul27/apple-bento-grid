# design-uiux
- **Purpose**: UI aesthetic, tokens, typography, component guidance.
- **Read when**: Designing new pages/components; aligning visuals.

## Fonts
- **Primary (Headings)**: [Archivo](https://fonts.google.com/specimen/Archivo) (SemiExpanded for levels 1 & 2).
- **Secondary (Body/UI)**: [Inter](https://fonts.google.com/specimen/Inter).

## Typography Scale
| Element | Font | Weight | Size / LH | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **H1 / Hero** | Archivo SemiExpanded | ExtraBold | 72px / 88px | `text-balance` |
| **H2 / Section** | Archivo SemiExpanded | Regular | 48px / 56px | `text-balance` |
| **H3 / Block** | Archivo | Regular | 28px / 36px | |
| **Card Title** | Archivo | Regular | 20px / 28px | |
| **Label / Overline** | Inter | Semibold | 12px / 16px | +8% tracking |
| **Body / Default** | Inter | Regular | 16px / 24px | `text-pretty` |
| **Body / Small** | Inter | Regular | 14px / 20px | |
| **Button** | Inter | Semibold | 16px / 20px | |

## Spacing & Roundness
- **8px Grid**: All spacing (gutter, padding, margin, gap) MUST be multiples of 8px (4px, 8px, 16px, 24px, 32px, etc.).
- **Roundness**: Multiples of 4px: `rounded-sm` (4px), `rounded-lg` (8px), `rounded-xl` (12px), `rounded-2xl` (16px), `rounded-32px`, etc.
- **Flat Design**: No shadows or blurs. Every element should have a solid border or background.

### Card Padding
- **Large Section Cards**: `p-12` (48px) - Used for Credentials and CTA sections.
- **Standard/Feature Cards**: `p-10` (40px) - Used for Hero features and Playground cards.
- **Internal/Stat Cards**: `p-8` (32px) - Used for Hero stats and inner containers.

### Nested Card Formula
For nested cards, the outer border radius MUST follow this formula for visual harmony:
`OuterRadius = InnerRadius + Padding (Distance)`
*Example: If an inner card has `rounded-2xl` (16px) and the outer card has `p-10` (40px), the outer radius should be `rounded-[56px]`.*

## Colors
### Neutrals
- **Background**: `#F7EACB`
- **Surface**: `#FBF5E6`
- **Surface 2**: `#FEFCF7`
- **Border**: `#F2DCA8`

### Main Palette
- **Yellow (Primary)**: `#FFD23F`
- **Green 1**: `#008C4C`
- **Green 2**: `#2F6B3F`
- **Dark BG Green**: `#1B231D`

### Semantic Tokens
| Name | Hex | Usage |
| :--- | :--- | :--- |
| `surface_yellow` | `#FFECAF` | Soft background |
| `hover_yellow` | `#FFF6D8` | Hover state |
| `pressed_yellow` | `#FFDC68` | Active state |
| `border_yellow` | `#FFCB20` | Focus/Border |
| `green_1_hover` | `#275935` | |
| `green_1_pressed` | `#1F482A` | |
| `green_1_border` | `#5F8C6A` | |
| `green_2_hover` | `#00733E` | |
| `green_2_pressed` | `#005930` | |
| `green_2_border` | `#2FAE79` | |
| `bg_green_surface` | `#28342B` | |
| `bg_green_border` | `#36463A` | |

### Text
- **Light Mode (text_on_light)**: `#1B231D` (Dark BG Green)
- **Dark Mode (text_on_dark)**: `#F7EACB` (Background Cream)

## Components & Interactive Elements
- **Height**: Minimum height of 24px for all interactive elements (inputs, toggles, etc.). 
- **Icons**: Use [Lucide](https://lucide.dev/). Stroke weight must be configurable (default to 2px to match bold aesthetics).
- **Aesthetic**: Bold, high-contrast, flat illustrations (like the Toucan style).

## Layout Rules
- **Max Width**: `max-w-7xl` (aligned with previous conversations).
- **Dark Mode Support**: Use CSS variables or Tailwind `dark:` prefix to enable switching via app settings.
- **Section Spacing**: Large vertical gaps (gap-32+) to allow the layout to "breathe" on the cream background.
