# Android-Developer Material 3 Expressive Theme — Design Spec

## Context

The portfolio's React rewrite needs a visual identity. The site owner is an Android
developer, and wants that background reflected directly in the design — not a generic
"Material-inspired" look, but a portfolio that feels "almost real as Google," built with
Google's own Material 3 Expressive design language.

## Decision Summary

- **Component library**: `@material/web` — Google's official Material 3 Web Components.
  This replaces the shadcn/ui direction set in the original constitution (v1.0.0/1.1.0).
- **SSR helper**: none. `@lit-labs/nextjs` was considered but rejected — it's an
  experimental "Lit Labs" package with no confirmed Next.js 16 support (its own
  `package.json` caps at Next.js 15). Material Web components render as standard React
  Client Components instead, accepting a brief first-paint hydration flash (see
  Technical Risk below).
- **Layout/spacing**: Tailwind CSS, used around Material Web components for page layout,
  grids, and spacing — not to restyle the components' internals.
- **Motion**: Framer Motion, for page-level orchestration (scroll-triggered entrances,
  section transitions) beyond what Material Web's own components animate internally.
  Motion curves are sourced from Material 3's published spring-physics motion spec,
  not generic CSS ease curves.
- **Color**: Seed color `#3DDC84` — Android's fixed brand green, deliberately chosen from
  before the Material You dynamic-color system. Run through Google's Material Color
  Utilities algorithm, using the **`SchemeVibrant`** scheme variant, to generate the full
  official M3 tonal palette for both light and dark modes. (Not `SchemeExpressive` — despite
  the name matching this project's design-language goal, that specific algorithm is
  "intentionally detached from the source color" by design and turns the green seed into a
  brown/orange primary. Discovered and corrected during implementation; see the
  implementation plan's Global Constraints for the verified comparison.) Theme switching
  stays on `next-themes`.
- **Typography**: Roboto Flex — Material 3's public web typeface (Google Sans is
  Google-internal-only and not licensed for outside use), loaded via `next/font/google`.
- **Iconography**: Material Symbols — Google's icon font, built to pair natively with
  Material Web components. Replaces Lucide React. Loaded via the `material-symbols` npm
  package (self-hosted CSS + font files, Apache-2.0), not `next/font/google` — Google's
  regular-typeface catalog that `next/font/google` draws from doesn't include Material
  Symbols at all; it lives in a separate icon-font catalog. Discovered during Task 3's
  implementation; see the implementation plan for the full correction.
- **Shape & elevation**: M3 Expressive's expressive shape system (varied shapes, not just
  rounded rectangles) and tonal-surface-plus-shadow elevation. No blur/glassmorphism.
- **Hero & cards**: The previous Kobweb site's typewriter hero-text effect and
  frosted-glass cards are retired, replaced by M3 Expressive's own expressive type-scale
  headline with spring-based entrance motion, and tonal-elevated M3 surfaces for cards.

## Rationale

- The site owner is an Android developer — Material Design is their home turf, and the
  explicit goal was authenticity ("almost real as Google"), not a Material-*inspired*
  restyle.
- Real ripple/state-layer interaction physics are only available from Google's actual
  implementation. A restyled-shadcn/ui alternative was explicitly considered and rejected
  in favor of this higher-fidelity, higher-effort path.
- **Correction after further research**: the original version of this rationale also
  cited "long-term fidelity to Google's own future component updates" as a reason to
  prefer `@material/web`. That's weaker than stated — Google's Material Web team
  announced `@material/web` is now in **maintenance mode**
  (`material-components/material-web` discussion #5642, 2026-05-19): engineers were
  reassigned to Google's internal Wiz framework, "new features and components are no
  longer planned," and PRs aren't accepted by default. The library still works and ships
  real Google-authored components today — that part of the fidelity argument holds — but
  it will very likely **not** receive new M3 Expressive shape/component updates from
  Google going forward. Decision after weighing this: proceed with `@material/web` anyway
  — "authentic today, not actively evolving" is an acceptable trade for a personal
  portfolio that doesn't need years of upstream feature growth under it.
- Frosted glass/blur is an iOS/Windows visual convention, not part of Material's design
  language (which expresses elevation through tonal surfaces and shadows) — keeping it
  would undercut the authenticity goal.

## Technical Risk & Mitigation

- **Risk**: `@material/web` components are Web Components (Lit-based), not native React.
  The site builds via Next.js static export (`output: 'export'`) — each page is
  pre-rendered to HTML once at build time. Without help, Web Components render as empty
  custom-element tags in that pre-rendered HTML until client JS loads and registers them:
  a brief flash on first paint, and no content for anything that doesn't execute JS.
- **Mitigation considered and rejected**: `@lit-labs/nextjs` would pre-render the
  components' shadow-DOM content into the static HTML, eliminating the flash — but it's
  an experimental "Lit Labs" package whose `package.json` only declares support for
  Next.js 13/14/15 (not the 16 this project requires), and whose own docs say it's only
  been tested against 13/14. Taking on an unverified dependency to fix a cosmetic
  first-paint detail was judged not worth it.
- **Accepted trade-off**: Material Web components render as standard React Client
  Components (`'use client'`) with no SSR helper. They show a brief hydration flash on
  first paint — the same category of behavior as any client-rendered component tree, not
  a functional defect. Page text/SEO is unaffected, since that comes from Next's Metadata
  API, not component internals. React 19 (used by Next.js 16) also resolved most of the
  historical friction passing complex props into custom elements from React.
- **Residual gap**: the first-paint flash described above. Revisit `@lit-labs/nextjs` (or
  whatever SSR story Lit ships by then) later if it proves visually bothersome in
  practice — nothing about skipping it now forecloses that.

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
- `@material/web`'s stable (non-`labs/`) components confirmed available as of this
  writing (button, checkbox, chips, dialog, divider, fab, icon, iconbutton, list, menu,
  progress, radio, select, slider, switch, tabs, textfield) may still reflect the
  "classic" M3 shape system rather than the newer Expressive shape refresh — some
  Expressive-specific shapes/components (e.g. card) currently only exist under
  `@material/web/labs/`, which carries its own experimental-stability caveat. Whether a
  given section needs a `labs/` component is a call to make per-component during
  implementation, not decided wholesale here.
