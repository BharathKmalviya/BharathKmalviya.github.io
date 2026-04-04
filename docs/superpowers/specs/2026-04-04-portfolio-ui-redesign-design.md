# Portfolio UI Redesign — Design Spec

**Date:** 2026-04-04  
**Scope:** Full visual overhaul of the Kobweb portfolio site — one-pager with Hero, About, and Contact sections.

---

## Goal

Transform the existing minimal portfolio into a modern, premium-feeling single-page site with an Android/dev-tech aesthetic: deep dark navy base, Android green (`#3DDC84`) as the primary accent, electric cyan as secondary, frosted glass cards, and a typewriter hero animation.

---

## Approach

Full page overhaul (Approach A): update color tokens, rewrite `Index.kt` hero/about/contact, add animations, upgrade NavHeader to frosted glass sticky bar, keep architecture flat (no new files beyond existing structure).

---

## Color System

### Light Mode
| Token | Value |
|---|---|
| Background | `#F0FFF4` (soft mint white) |
| Surface / Card | `#FFFFFF` |
| Near Background | `#E8F5E9` |
| Brand Primary | `#1B873A` (Android green, accessible on light) |
| Brand Accent | `#00BCD4` (cyan) |
| Text Primary | `#0D1B2A` |
| Text Muted | `#64748B` |

### Dark Mode
| Token | Value |
|---|---|
| Background | `#0A0F1E` (deep navy) |
| Surface / Card | `#0D1B2A` (dark blue-black) |
| Near Background | `#111827` |
| Brand Primary | `#3DDC84` (Android green) |
| Brand Accent | `#00E5FF` (electric cyan) |
| Text Primary | `#E2E8F0` |
| Text Muted | `#94A3B8` |

`SiteTheme.kt` is updated to reflect these. `SitePalette` gains a `textMuted` and `accent` field alongside existing `brand.primary` and `brand.accent`.

---

## Hero Section

Full-viewport-height (`100vh`), centered column layout.

### Elements (top to bottom)
1. **Eyebrow badge** — pill with text `< Android Engineer />`, monospace font, Android green border + text, subtle green box-shadow glow
2. **Name heading** — `Bharath K Malviya` at `4rem` bold; the surname gets a subtle green→cyan CSS text gradient
3. **Typewriter line** — cycles through 3 phrases using CSS `steps()` animation + `overflow: hidden` + `white-space: nowrap` technique:
   - `"6 Years of Android Experience"`
   - `"Kotlin • Jetpack Compose • MVVM"`
   - `"Building apps people love"`
   — cyan color, monospace font, blinking `|` cursor via a separate `Keyframes` blink animation
4. **Location chip** — `📍 Rajasthan, India`, small muted pill
5. **CTA row** — two buttons:
   - `View My Work` — filled Android green, dark text, hover: slightly brighter green + `scale(1.02)`
   - `Get In Touch` — ghost/outline in cyan, hover: fills cyan background

### Background
- Linear gradient: `#0A0F1E → #0D2137` (dark) / `#E8F5E9 → #F0FFF4` (light)
- Faint dot-grid pattern overlaid at `5%` opacity using a CSS `radial-gradient` background-image trick (no image asset needed)
- Subtle radial glow at center: Android green at `8%` opacity, `50% 50%`, `600px` radius

### Animations
- Name fades in upward (`translateY(20px) → 0`, `opacity 0 → 1`, `600ms ease-out`)
- Typewriter starts after `400ms` delay
- All animations wrapped in `@media (prefers-reduced-motion: reduce)` override that disables them

---

## About Summary Section

- Section label: `// about_me` in small cyan monospace above heading
- Heading: `"About Me"` with an animated green underline that slides in from left on scroll (CSS `scaleX(0 → 1)` on the `::after` pseudo-element)
- Frosted glass card:
  - `backdrop-filter: blur(12px)`
  - Background: `rgba(13, 27, 42, 0.6)` dark / `rgba(255, 255, 255, 0.7)` light
  - Border: `1px solid rgba(61, 220, 132, 0.2)` (Android green at 20%)
  - Border radius: `1rem`
  - Padding: `2rem`
- Paragraph text: same as current — results-driven Android engineer summary. Line height `1.8`, max `65ch`.

---

## Contact Section

- Section label: `// connect` in cyan monospace
- Heading: `"Let's Connect"`
- Icon-only circular buttons in a centered row, `gap: 1.5rem`:

| Platform | Icon | Link |
|---|---|---|
| LinkedIn | LinkedIn SVG | `https://linkedin.com/in/bharath-k-malviya` |
| GitHub | GitHub SVG | `https://github.com/BharathKmalviya` |
| Twitter/X | X SVG | `https://x.com/BharathKmalviya` |
| Email | Mail SVG | `mailto:Bharathkmalviya@gmail.com` |

- Button size: `56px` circle
- Default: glass background, Android green icon
- Hover: fills Android green, icon turns dark navy, `scale(1.1)`, green glow shadow (`box-shadow: 0 0 16px rgba(61,220,132,0.5)`)
- Silk `Tooltip` shows platform name on hover (already available in NavHeader, reuse pattern)
- SVG icons inlined as Kobweb `@Composable` functions in `widgets/SocialIcons.kt` (new file)

---

## NavHeader

- `position: sticky; top: 0; z-index: 100`
- Frosted glass: `backdrop-filter: blur(16px)`, background `rgba(10, 15, 30, 0.8)` dark / `rgba(240, 255, 244, 0.85)` light
- Bottom border: `1px solid rgba(61, 220, 132, 0.2)`
- Left: `Bharath` in bold white + `<K/>` in Android green (monospace, smaller) — dev branding touch
- Right: `Home` | `About` nav links (muted color, Android green on hover) + theme toggle
- No scroll-opacity change (keep it simple — the blur already handles depth perception)

---

## Footer

- Single centered line: `© 2026 Bharath K Malviya · Built with Kobweb`
- Top border: `1px solid rgba(61, 220, 132, 0.15)`
- Text: muted color, `0.875rem`

---

## Overall Layout

- Container max-width: `72rem` (up from `60rem`)
- Hero is edge-to-edge (no side padding in `PageLayout` for the first child)
- Section vertical spacing: `5rem` gap between sections
- `PageLayout.kt`: hero slot is full-bleed; remaining sections get `leftRight: 2rem` padding

---

## Files Changed

| File | Change |
|---|---|
| `SiteTheme.kt` | New color tokens, `textMuted` + `accent` on `SitePalette` |
| `AppStyles.kt` | Typewriter + blink + fade-in `Keyframes`; updated global font |
| `Index.kt` | Full rewrite: hero, about, contact sections |
| `NavHeader.kt` | Frosted glass, sticky, `<K/>` branding |
| `PageLayout.kt` | Max-width `72rem`, full-bleed hero support |
| `Footer.kt` | Minimal restyling |
| `widgets/SocialIcons.kt` | New file: inline SVG icon composables |

---

## Out of Scope

- No resume sections (Skills, Experience, Education) — intentional minimal one-pager
- No scroll animations triggered by IntersectionObserver (JS interop) — CSS-only animations only
- No page transitions
- No `/about` markdown page changes
