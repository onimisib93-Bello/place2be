# Place2Be Hotel & Suites — Design System (Master)

Generated with `ui-ux-pro-max` (`--design-system`, query: "luxury boutique hotel
hospitality resort pool nightlife Lagos"), then revised with the `frontend-design`
skill's "review against the brief" pass.

## What ui-ux-pro-max suggested, and what we changed

| Axis | Suggested | Final | Why |
|---|---|---|---|
| Pattern | Hero-centric + social proof | Kept | Direct bookings need a strong hero and real reviews. |
| Style | Liquid glass | Night-pool editorial | Glass is a generic premium default with contrast problems; this hotel's identity is its pool at night. |
| Colour | Navy `#1E3A8A` + gold `#CA8A04` | Abyss / Marble / Gold / Pool / Turf (below) | Navy + gold is the stock "luxury" pairing. These come from the property's own materials. |
| Type | Playfair Display SC / Karla | Bodoni Moda / Hanken Grotesk | Bodoni's hairline contrast echoes the tufted gold headboards; Playfair is the most common AI default. |
| Anti-pattern | Poor photos + complex booking | Respected | Source photos are small, so they're shown at native-ish sizes inside composed frames with grain. Booking takes one short form, then hands off to WhatsApp. |

## Palette (sourced from the property)

| Token | Hex | Source |
|---|---|---|
| `abyss` | `#071F22` | The pool at night: primary dark surface |
| `marble` | `#F1F2EE` | White marble with black veining (pool wall, floors): light surface |
| `vein` | `#17201E` | Marble veining: body text on light |
| `gold` | `#C7A257` | Tufted gold headboards: CTAs on dark, fine details |
| `pool` | `#3CC6D0` | Pool tile turquoise: focus rings, tiny highlights only |
| `turf` | `#29402F` | Poolside lounge turf: secondary dark surface |

## Type
- Display: **Bodoni Moda** (variable, 400–900). Large sizes only (≥ 28px), tight tracking.
- Text: **Hanken Grotesk** 400/500/600, 16–18px body, line-height 1.6.
- Scale (1.333): 14 / 16 / 18 / 24 / 32 / 42 / 56 / 75 / 100 / clamp hero.
- No all-caps eyebrow labels, no single-word italic accents, no "→" glued to buttons.

## Layout
- Pages alternate night bands (abyss) and day bands (marble), like an evening at the pool.
- Asymmetric 12-col grid; text left-aligned; imagery is allowed to break the grid.
- Photos are framed at or near native resolution; full-bleed only for video and for heavily graded images.

## Signature moment
The pool floor has **PLACE2BE** tiled into it. On the home page the GlyphPortal dives
through the word PLACE2BE into that pool: the hotel's own name becomes the doorway.
Every other motion stays quiet so this lands.

## Motion
- Ease: `[0.22, 1, 0.36, 1]` (out), 0.6–0.9s for reveals, 150–250ms for micro-interactions.
- One orchestrated moment per viewport. Reveals are line-masked headlines, not fade-ups on every card.
- `prefers-reduced-motion`: all scroll-driven effects fall back to static layouts.
