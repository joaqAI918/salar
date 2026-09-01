# SALAR — Design System

Color grading & finishing studio, Santiago de Chile. The system is a dark grading suite:
one warm near-black canvas, one salt-white type color, and all chroma confined to the
studio's actual material — separated R/G/B channels of additive light.

## Tokens

### Color
| Token | Value | Use |
|---|---|---|
| `--canvas` | `#0B0A08` | Page background (warm near-black) |
| `--band` | `#14120E` | Lifted section band (the only "elevation") |
| `--ink` | `#EDE6DA` | THE type color. Headings, body, links, buttons |
| `--muted` | `#8A8172` | Secondary text, mono metadata |
| `--hairline` | `#262219` | 1px dividers and outlines |
| `--ch-r` | `#FF2222` | Red channel — artifact only |
| `--ch-g` | `#22FF44` | Green channel — artifact only |
| `--ch-b` | `#2255FF` | Blue channel — artifact only |

**Hard rule:** the channel triplet appears ONLY in the channel-split type artifact, grade
reveal fringes, RGB-parade divider, and channel plates. Never on a button, link, icon,
hover state, or any UI control. Everything interactive is `--ink`.

Channel layers always composite with `mix-blend-mode: screen` on dark ground — overlap of
all three reads as white (additive light, physically honest).

### Type
| Layer | Family | Weight | Notes |
|---|---|---|---|
| Display | Fraunces (opsz 144) | 340–400 | `-0.03em` tracking, line-height 0.95–1.05 |
| Body/UI | Archivo | 400 | line-height 1.7 body, 1.4 UI |
| Metadata | Fragment Mono | 400 | uppercase, `+0.08em` tracking |

No weight above 400 anywhere. Hierarchy comes from scale: display ≥ 6× body.

Scale (fluid): display `clamp(4rem, 12vw, 10rem)` · display-sm `clamp(2.5rem, 6vw, 4.5rem)`
· heading `clamp(1.5rem, 2.6vw, 2rem)` · body-lg `1.25rem` · body `1.0625rem` · mono-label
`0.8125rem`.

### Space & surface
- Spacing tokens: 8 / 16 / 24 / 40 / 64 / 96 / 128 / 176 px. Section gap
  `clamp(96px, 12vw, 176px)`.
- Grid: 12 columns, max-width 1440px, gutter `clamp(16px, 3vw, 40px)`.
- Border-radius: **0 everywhere.** Box-shadow: **none, ever.** Depth = `--band` contrast
  + `--hairline` 1px lines.
- Grain: one fixed SVG `feTurbulence` overlay, ≤ 3% opacity, whole site.

### Motion
- ONE easing: `cubic-bezier(0.65, 0, 0.15, 1)` — "focus pull". No other curve may exist.
- Animate `transform` and `opacity` only. No springs, no bounce, no overshoot; motion
  always converges/settles in one direction.
- Durations: hovers ≥ 300ms · reveals 600–900ms · ambient channel drift 6–8s.
- `prefers-reduced-motion: reduce` → all content renders in final converged/graded state,
  zero animation, no exceptions.

## Components
- **Ghost nav link:** `--ink` text, mono, uppercase, no border; hover = opacity 0.6 shift.
- **Wordmark:** channel-split type; converged at rest in nav, splits ≤ 3px on hover.
- **Section header:** mono label (`01 / TRABAJO`) above a Fraunces display line, hairline
  rule beneath.
- **Work row (imaged):** still under `linear-gradient(to top, #0B0A08 · 60%→0)` overlay +
  grain; log→grade reveal on viewport entry.
- **Work row (type-only):** oversized Fraunces title + mono metadata, hairline separators.
- **Wipe slider (case study):** keyboard-operable `role="slider"`, hairline handle,
  mono LOG / GRADE labels.
- **Oversized mailto:** display-scale `--ink` link, underline on hover only.

## Voice
English, short declarative sentences; light as a material; technical terms (printer
lights, Rec.709, LUT, HDR trim) used sparingly and correctly. Spanish for section labels,
tagline, sign-off. Never marketing superlatives.
