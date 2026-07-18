# Bharath Malviya Portfolio Constitution

<!--
Sync Impact Report
Version change: 3.0.0 → 3.1.0
Modified principles: none
Added principles:
  - VIII. Browser-Verified UI/UX Regression Testing — Playwright E2E suite
    required in CI for touch/hover/viewport/accessibility behavior unit tests
    cannot observe
Added sections: none
Modified sections:
  - Technology & Hosting Constraints — added Playwright/@axe-core testing stack
Removed sections: none
Templates requiring updates: ⚠ plan/spec templates unchanged (generic)
Follow-up TODOs: none
-->

<!--
Sync Impact Report (previous)
Version change: 2.1.0 → 3.0.0
Modified principles:
  - III. Typed, Material-Web Component-Based UI → III. Typed, Component-Based UI
    (MAJOR: `@material/web` / Material Symbols / M3 token pipeline removed;
    production UI is a custom terminal aesthetic with native HTML controls)
  - V. Accessible, Responsive, Themeable by Default — production ships dark
    terminal only; light theme is optional future work, not a cutover blocker
Added principles: none
Added sections: none
Modified sections:
  - Technology & Hosting Constraints — Next.js static export + Framer Motion +
    JetBrains Mono terminal design; contact is copy-email + mailto; deploy via
    GitHub Actions building `out/` to Pages
Removed sections: none
Templates requiring updates: ⚠ plan/spec templates unchanged (generic)
Follow-up TODOs: historical M3 design docs retained under docs/superpowers/specs
  for archive; production source of truth is this constitution + live code
-->

# Bharath Malviya Portfolio Constitution

## Core Principles

### I. Static-Only Deployment (NON-NEGOTIABLE)

The site MUST build to fully static output deployable on GitHub Pages (Next.js
`output: 'export'`). No feature MAY depend on a Node/edge server, API route,
ISR, or SSR at request time. Any capability that would normally need a
backend (contact form submission, analytics ingestion, etc.) MUST be
implemented through a third-party client-side service (e.g. EmailJS) rather
than an in-repo server endpoint.

**Rationale**: `bharathmalviya.com` is live on GitHub Pages (custom domain,
HTTPS enforced, deployed from `master` via GitHub Actions). The architecture
must fit that host.

### II. Incremental, Confirmed Delivery (NON-NEGOTIABLE)

Work MUST proceed as a sequence of small, single-purpose steps. Each step
MUST be completed and confirmed with the user before the next one begins.
Multiple unrelated changes or unresolved decisions MUST NOT be bundled into
a single pass.

**Rationale**: Explicit user directive — interactive, step-by-step delivery
for a single maintainer who reviews each change.

### III. Typed, Component-Based UI

All application code MUST be TypeScript. UI MUST be composed from focused
React components, laid out with Tailwind CSS utility classes, and MUST prefer
native HTML controls styled to the terminal design system unless a library is
justified under Principle IV.

The production visual system is a **dark terminal aesthetic**: near-black
surfaces, neon Android green `#3DDC84`, JetBrains Mono typography, Framer
Motion for restrained page motion, and `prefers-reduced-motion` support.

**Rationale**: The owner chose a developer-terminal identity over Material
Web for the live site. Custom chrome keeps the look coherent without a
deprecated Material Web dependency. Full content and section structure live
in `src/data/portfolio.ts`.

### IV. Minimal Dependency Footprint

A new library MUST be added only when a concrete, currently-in-progress
screen or feature needs it — never speculatively. Heavier optional libraries
(GSAP, Lenis, React Three Fiber/Drei, tsparticles, Contentlayer, Recharts,
etc.) MUST stay excluded unless a specific section requires them.

**Rationale**: Bundle size and load time affect first impressions on a
recruiter-facing portfolio.

### V. Accessible, Responsive, Production Dark Theme

Every page MUST be responsive across mobile, tablet, and desktop widths and
MUST meet baseline accessibility standards (semantic HTML, full keyboard
navigability, sufficient color contrast).

Production ships a **dark terminal theme** as the only theme. A light theme
MAY be added later; it is not required for `master` deployment.

Neon accents MUST NOT be used as primary body text on black — accents and
labels only. `prefers-reduced-motion` MUST disable or skip non-essential
animation (including the hero typewriter).

**Rationale**: Public professional site; dark-only matches the approved
terminal brand for launch.

### VI. Mentor-Guided Development (NON-NEGOTIABLE)

The user is new to web development and MUST NOT be assumed to already know
web-specific concepts. Explanations MUST start from fundamentals, state
*why*, and call out suboptimal approaches with better alternatives.

**Rationale**: Explicit user directive for collaborative teaching.

### VII. Documentation-First Change Management (NON-NEGOTIABLE)

Any new convention, architectural decision, or lasting instruction MUST be
written into the appropriate project `.md` file when introduced. Documentation
MUST stay current with the live implementation.

**Rationale**: Sessions are discontinuous; docs carry decisions forward.

### VIII. Browser-Verified UI/UX Regression Testing

A Playwright E2E suite (`e2e/*.spec.ts`) MUST run in CI on every PR to
`master`, alongside unit tests, as a required check. Any UI/UX bug found
through manual or screenshot review (mobile viewport issues, touch/hover CSS
behavior, scrollbar/overflow glitches, active-state logic, accessibility
regressions) MUST get a regression test in this suite, not just a one-off
fix — jsdom-based unit tests cannot observe real browser CSS media features
(`hover`, `pointer`), touch interaction, or rendered scrollbars.

**Rationale**: Explicit user directive after two shipped bugs (a visible
mobile scrollbar and a stuck touch-hover nav state) that unit tests alone
could not have caught; the owner should not have to manually re-check this
class of regression on every change.

## Technology & Hosting Constraints

- **Framework/Language**: Next.js 16 (App Router, `output: 'export'`),
  TypeScript, Tailwind CSS v4.
- **Motion**: Framer Motion for scroll/entrance orchestration and typewriter
  reduced-motion handling.
- **Typography**: JetBrains Mono via `next/font/google`.
- **Testing**: Vitest for unit logic; Playwright + `@axe-core/playwright` for
  E2E/UI-UX/accessibility regression coverage, run in CI on every PR.
- **Visual design**: Dark terminal — `#070807` / surface panels, neon
  `#3DDC84`, ambient CSS atmosphere. Content source: `src/data/portfolio.ts`.
- **Contact**: Copy-email button + `mailto:` (no server). EmailJS MAY be
  added later, client-side only.
- **SEO**: Next.js Metadata API, JSON-LD Person, `robots.ts`, `sitemap.ts`.
- **Hosting**: GitHub Pages, custom domain `bharathmalviya.com`
  (`public/CNAME`), `.nojekyll` for `_next` assets, deployed from `master`
  by `.github/workflows/deploy.yml` (pnpm build → `out/` → Pages).
- **Branching**: `master` is production. Feature work uses `feature/*`.
  `archive/kobweb-kotlin` is frozen historical reference and MUST NOT be
  modified.

## Repository & Publishing Standards

- Public repository — production-quality code, history, and docs.
- Secrets MUST NEVER be committed.
- Prefer maintainable solutions over hacks.
- Record licensing/attribution for third-party assets.
- Security, accessibility, and SEO considered per feature.

## Development Workflow

- One concrete outcome per step; confirm before continuing (Principle II).
- Separate required work from optional polish when presenting to the user.
- Explain tradeoffs before choosing among valid approaches.
- Confirm new libraries against Principle IV before adding.
- Update docs with the implementation when decisions change (Principle VII).
- Verify external facts (DNS, Pages, deploy) rather than assuming.

## Governance

This constitution supersedes ad hoc practice. Amendments require explicit
user approval and a version bump:

- **MAJOR**: Backward-incompatible principle removal or redefinition.
- **MINOR**: New principle/section or materially expanded guidance.
- **PATCH**: Clarifications and non-semantic refinements.

`/speckit-plan` and `/speckit-tasks` output MUST verify compliance; unresolved
violations go in Complexity Tracking with justification.

**Version**: 3.1.0 | **Ratified**: 2026-07-17 | **Last Amended**: 2026-07-18
