# Android-Developer Material 3 Expressive Theme — Design Spec

## Context

The portfolio's React rewrite needs a visual identity. The site owner is an Android
developer, and wants that background reflected directly in the design — not a generic
"Material-inspired" look, but a portfolio that feels "almost real as Google," built with
Google's own Material 3 Expressive design language.

## Decision Summary

- **Component library**: `@material/web` — Google's official Material 3 Web Components.
  This replaces the shadcn/ui direction set in the original constitution (v1.0.0/1.1.0).
- **SSR helper**: `@lit-labs/nextjs` — Lit's official Next.js integration, needed so the
  components render real markup inside the site's static export instead of empty
  custom-element tags (see Technical Risk below).
- **Layout/spacing**: Tailwind CSS, used around Material Web components for page layout,
  grids, and spacing — not to restyle the components' internals.
- **Motion**: Framer Motion, for page-level orchestration (scroll-triggered entrances,
  section transitions) beyond what Material Web's own components animate internally.
  Motion curves are sourced from Material 3's published spring-physics motion spec,
  not generic CSS ease curves.
- **Color**: Seed color `#3DDC84` — Android's fixed brand green, deliberately chosen from
  before the Material You dynamic-color system. Run through Google's Material Color
  Utilities algorithm to generate the full official M3 tonal palette for both light and
  dark modes. Theme switching stays on `next-themes`.
- **Typography**: Roboto Flex — Material 3's public web typeface (Google Sans is
  Google-internal-only and not licensed for outside use), loaded via `next/font/google`.
- **Iconography**: Material Symbols — Google's icon font, built to pair natively with
  Material Web components. Replaces Lucide React, also loaded via `next/font/google`.
- **Shape & elevation**: M3 Expressive's expressive shape system (varied shapes, not just
  rounded rectangles) and tonal-surface-plus-shadow elevation. No blur/glassmorphism.
- **Hero & cards**: The previous Kobweb site's typewriter hero-text effect and
  frosted-glass cards are retired, replaced by M3 Expressive's own expressive type-scale
  headline with spring-based entrance motion, and tonal-elevated M3 surfaces for cards.

## Rationale

- The site owner is an Android developer — Material Design is their home turf, and the
  explicit goal was authenticity ("almost real as Google"), not a Material-*inspired*
  restyle.
- Real ripple/state-layer interaction physics, and long-term fidelity to Google's own
  future component updates, are only available from Google's actual implementation. A
  restyled-shadcn/ui alternative was explicitly considered and rejected in favor of this
  higher-fidelity, higher-effort path.
- Frosted glass/blur is an iOS/Windows visual convention, not part of Material's design
  language (which expresses elevation through tonal surfaces and shadows) — keeping it
  would undercut the authenticity goal.

## Technical Risk & Mitigation

- **Risk**: `@material/web` components are Web Components (Lit-based), not native React.
  The site builds via Next.js static export (`output: 'export'`) — each page is
  pre-rendered to HTML once at build time. Without help, Web Components render as empty
  custom-element tags in that pre-rendered HTML until client JS loads and registers them:
  a brief flash on first paint, and no content for anything that doesn't execute JS.
- **Mitigation**: `@lit-labs/nextjs` pre-renders the components' actual shadow-DOM content
  into the static HTML, eliminating the flash. React 19 (used by Next.js 16) also
  resolved most of the historical friction passing complex props into custom elements
  from React.
- **Residual gap**: none identified beyond normal implementation effort — this path uses
  Google's actual component code, not an approximation of it.

## What This Replaces From the Original Stack Decision

- shadcn/ui — superseded; Material Web supplies the real components instead.
- Lucide React icons — superseded by Material Symbols, for visual consistency with
  Material Web components.
- The previous typewriter hero-text effect and frosted-glass card styling — retired in
  favor of M3 Expressive's own hero/card treatment.

## What Stays Unchanged

- Next.js 16 (App Router), TypeScript, static export for GitHub Pages hosting.
- EmailJS + React Hook Form + Zod for the contact form.
- `next-themes` for light/dark mode switching.
- Next.js Metadata API + `next/font` for SEO/font loading.

## Out of Scope / Follow-Ups for Implementation Planning

- Exact M3 Expressive motion-spec values (spring stiffness/damping per interaction type)
  need to be pulled from Google's published M3 motion tokens during implementation, not
  guessed.
- An accessibility pass specifically for the Web Components (focus management, ARIA
  behavior) should be verified once components are in place, per constitution Principle V.
- Which specific Material Web components are needed for which sections is decided
  screen-by-screen during implementation, per constitution Principle II (incremental,
  confirmed delivery) — this spec covers the design-system decision, not a full
  component inventory.
