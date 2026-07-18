<!--
Sync Impact Report
Version change: 2.0.0 → 2.1.0
Modified principles:
  - III. Typed, Material-Web Component-Based UI — corrected stale
    `@lit-labs/nextjs` requirement (client components + accepted hydration
    flash); rationale updated for terminal skin over Material tokens while
    retaining `@material/web` for interactive controls.
  - V. Accessible, Responsive, Themeable by Default — clarified dark-first
    terminal presentation for the current rewrite pass; light theme remains
    required before `master` cutover.
Added principles: none
Added sections: none
Modified sections:
  - Technology & Hosting Constraints — visual design system now Terminal
    skin on Material 3 (seed `#3DDC84`, Roboto Flex + JetBrains Mono);
    contact/forms: copy-email + mailto for current pass, EmailJS deferred;
    pointed primary visual spec to
    `docs/superpowers/specs/2026-07-18-terminal-m3-portfolio-design.md`
    (M3 token foundation still in 2026-07-17 spec).
Removed sections: none
Templates requiring updates:
  - `.specify/templates/plan-template.md` ✅ no constitution-specific
    content to change (generic Constitution Check gate)
  - `.specify/templates/spec-template.md` ✅ no change
  - `.specify/templates/tasks-template.md` ✅ no change
  - `CLAUDE.md` ✅ updated Tech Stack & Design
Follow-up TODOs: none
-->

<!--
Sync Impact Report (previous amendment, retained for history)
Version change: 2.0.0 → 2.0.1
Modified principles:
  - III. Typed, Material-Web Component-Based UI — corrected: dropped the
    `@lit-labs/nextjs` SSR requirement. That package is Lit Labs
    (experimental) and only declares support for Next.js 13/14/15, not the
    16 this project requires — using it would have traded an unverified
    dependency for a cosmetic benefit. Material Web components now render
    as standard React Client Components and accept the brief first-paint
    hydration flash (same category of behavior as any client-rendered
    component tree) instead.
Added principles: none
Added sections: none
Modified sections:
  - Technology & Hosting Constraints — Framework/Language bullet: removed
    `@lit-labs/nextjs`.
Removed sections: none
Templates requiring updates: none beyond the previous amendment's list
Follow-up TODOs: none — correction fully specified in
  docs/superpowers/specs/2026-07-17-android-material3-theme-design.md
Note: footer version was not bumped in that pass; 2.1.0 absorbs the
Principle III body correction that was still stale in-repo.
-->

<!--
Sync Impact Report (previous amendment, retained for history)
Version change: 1.1.0 → 2.0.0
Modified principles:
  - III. Typed, Component-Based UI → III. Typed, Material-Web Component-Based UI
    (backward-incompatible: shadcn/ui replaced by Google's official Material Web
    (`@material/web`) component library — MAJOR bump per Governance policy)
Added principles: none
Added sections: none
Modified sections:
  - Technology & Hosting Constraints — Framework/Language bullet: removed
    shadcn/ui, added `@material/web` + `@lit-labs/nextjs`; icons bullet:
    Lucide React → Material Symbols; added a Visual Design System bullet
    pointing to the design spec.
Removed sections: none
Follow-up TODOs: none — decision fully specified in
  docs/superpowers/specs/2026-07-17-android-material3-theme-design.md
-->

<!--
Sync Impact Report (previous amendment, retained for history)
Version change: 1.0.0 → 1.1.0
Modified principles: none renamed or redefined
Added principles:
  - VI. Mentor-Guided Development (NON-NEGOTIABLE)
  - VII. Documentation-First Change Management (NON-NEGOTIABLE)
Added sections:
  - Repository & Publishing Standards
Modified sections:
  - Development Workflow — expanded with four new bullets (required vs.
    optional task separation, tradeoff explanation before choosing an
    approach, briefly explaining new tools before use, keeping
    implementation and documentation updated together)
Removed sections: none
Follow-up TODOs: none — all placeholders resolved from repository context and conversation history
-->

# Bharath K Malviya Portfolio Constitution

## Core Principles

### I. Static-Only Deployment (NON-NEGOTIABLE)

The site MUST build to fully static output deployable on GitHub Pages (Next.js
`output: 'export'`). No feature MAY depend on a Node/edge server, API route,
ISR, or SSR at request time. Any capability that would normally need a
backend (contact form submission, analytics ingestion, etc.) MUST be
implemented through a third-party client-side service (e.g. EmailJS) rather
than an in-repo server endpoint.

**Rationale**: `bharathmalviya.com` is already live on GitHub Pages
(confirmed via DNS and the GitHub Pages API — custom domain, HTTPS enforced,
deployed from `master` via a GitHub Actions workflow). Changing the hosting
provider is out of scope for this rewrite; the architecture must fit the
host that already exists, not the other way around.

### II. Incremental, Confirmed Delivery (NON-NEGOTIABLE)

Work MUST proceed as a sequence of small, single-purpose steps. Each step
MUST be completed and confirmed with the user before the next one begins.
Multiple unrelated changes or unresolved decisions MUST NOT be bundled into
a single pass.

**Rationale**: Explicit user directive — "we'll go step by step no advance
at once." This project is driven interactively by one person who wants to
review and steer each step, not receive a large unreviewed batch of work.

### III. Typed, Material-Web Component-Based UI

All application code MUST be TypeScript. UI MUST be built primarily from
Google's official Material Web (`@material/web`) components, rendered as
standard React Client Components (a brief first-paint hydration flash is an
accepted trade-off — no `@lit-labs/nextjs` SSR helper), and laid out/spaced
with Tailwind CSS utility classes. Fully custom components MAY be used when
Material Web has no equivalent (e.g. typewriter, code-preview chrome) or when
composing/styling an existing Material Web component cannot meet the need.

The portfolio's **presentation layer** is a terminal skin (near-black
surfaces, neon green accents from the Android seed, monospace accents)
applied via CSS variables and theme overrides on top of Material 3 tokens.
Interactive controls SHOULD remain Material Web so ripple/state-layer
behavior is preserved under the skin.

**Rationale**: The owner is an Android developer — Material Web keeps real
Google interaction physics. The approved visual direction
(Approach 3 / terminal-on-M3) deliberately layers a developer-terminal mood
on those tokens rather than replacing the component library. Full detail in
`docs/superpowers/specs/2026-07-18-terminal-m3-portfolio-design.md`; M3
token foundation remains in
`docs/superpowers/specs/2026-07-17-android-material3-theme-design.md`.

### IV. Minimal Dependency Footprint

A new library MUST be added only when a concrete, currently-in-progress
screen or feature needs it — never speculatively for anticipated future use.
Heavier optional libraries identified during stack review (GSAP, Lenis,
React Three Fiber/Drei, tsparticles, Contentlayer, Recharts, etc.) MUST stay
excluded from the default stack and MUST be introduced individually, only
when a specific section genuinely requires them.

**Rationale**: A personal portfolio's bundle size and load time directly
affect a recruiter's or hiring manager's first impression. Front-loading
animation/CMS/chart libraries "just in case" was flagged as unnecessary bloat
during the stack evaluation for this project.

### V. Accessible, Responsive, Themeable by Default

Every page MUST be responsive across mobile, tablet, and desktop widths,
MUST meet baseline accessibility standards (semantic HTML, full keyboard
navigability, sufficient color contrast), and MUST support theme switching
via `next-themes` with a persisted user preference.

The current rewrite pass ships a **dark-first terminal** presentation as the
primary experience. A polished light theme MUST still be provided before the
feature branch replaces `master`; until then, dark-first is acceptable.

Neon accents MUST NOT be used as primary body text on black — accents and
labels only; body copy uses high-contrast on-surface colors.
`prefers-reduced-motion` MUST disable or skip non-essential animation
(including the hero typewriter).

**Rationale**: Baseline expectation for a public-facing professional
portfolio; carried over from the previous Kobweb implementation. Dark-first
timing reflects the approved terminal-skin pass without dropping the
long-term themeable requirement.

### VI. Mentor-Guided Development (NON-NEGOTIABLE)

The user is new to web development and MUST NOT be assumed to already know
web-specific concepts, tooling, or best practices. Every explanation MUST
start from fundamentals before advancing to more sophisticated concepts, and
MUST state *why* a decision or technique is used, not only *what* it does.
When the user proposes or picks a suboptimal approach, it MUST be called out
explicitly, together with a better alternative and the reasoning behind it,
rather than silently implemented or silently corrected. Industry best
practices MUST be introduced progressively, one at a time, rather than all
at once.

**Rationale**: Explicit user directive establishing the collaboration model
for this project — the goal is not only a finished portfolio but for the
user to grow as a web developer through the process, which requires
deliberate teaching rather than silent execution.

### VII. Documentation-First Change Management (NON-NEGOTIABLE)

Any new convention, architectural decision, workflow, coding standard, or
instruction that matters beyond the current step MUST be written into the
appropriate project `.md` file at the time it is introduced, not deferred.
Project documentation MUST be treated as the single source of truth for
decisions already made, so the user does not need to repeat context in
future sessions. Documentation MUST be kept organized, concise, and current
— reviewed and updated as the project evolves rather than left to drift
from the actual implementation.

**Rationale**: Explicit user directive. Sessions on this project are
discontinuous; without documentation carrying decisions forward, the same
context and rationale would need to be re-explained every session.

## Technology & Hosting Constraints

- **Framework/Language**: Next.js 16 (App Router), TypeScript, Tailwind CSS
  v4, `@material/web` (rendered as client components, no SSR helper).
- **Icons**: Material Symbols (pairs natively with Material Web components).
- **Visual design system**: Terminal skin on Material 3 tokens — near-black
  surfaces, neon accents from Android's fixed brand green (`#3DDC84`,
  pre-Material You) via Material Color Utilities (`SchemeVibrant`),
  Roboto Flex for UI chrome, JetBrains Mono (or equivalent `next/font`
  monospace) for typewriter / code previews / section labels. Primary
  presentation spec:
  `docs/superpowers/specs/2026-07-18-terminal-m3-portfolio-design.md`.
  Token-generation foundation:
  `docs/superpowers/specs/2026-07-17-android-material3-theme-design.md`.
- **Animation**: Framer Motion is the default for page-level orchestration
  (scroll entrances, section transitions, typewriter) beyond what Material
  Web animates internally. GSAP MAY be added later, scoped to a specific
  complex scroll-triggered timeline only — not as a blanket dependency.
- **Contact/forms**: Current pass — copy-email button + `mailto:` link (no
  form). EmailJS + React Hook Form + Zod remain the planned path when a
  contact form ships, still client-side only per Static-Only Deployment.
- **Theme**: `next-themes`; dark-first terminal for the current pass; light
  theme required before `master` cutover.
- **SEO**: Next.js Metadata API; `next/font` for font loading.
- **Hosting**: GitHub Pages, custom domain `bharathmalviya.com` (CNAME file
  at repo root), deployed via a GitHub Actions workflow that builds the
  static export and publishes it with `actions/deploy-pages`.
- **Branching**: Active rewrite work happens on `feature/react-portfolio`.
  The previous Kobweb (Kotlin/JS) implementation remains on
  `archive/kobweb-kotlin` for reference only. `master` is only updated once
  the rewrite is ready to fully replace the live site.

## Repository & Publishing Standards

- This repository is public on GitHub. Code, commit history, documentation,
  and folder structure MUST meet production-quality, professional standards
  suitable for external viewers (recruiters, other engineers) — not
  personal-scratchpad quality.
- Secrets, API keys, tokens, credentials, or other sensitive information
  MUST NEVER be committed, in code, configuration, or documentation.
- Maintainable, readable, scalable solutions MUST be preferred over quick
  hacks, even under time pressure.
- Licensing and attribution MUST be considered and recorded for any
  third-party code, assets, fonts, or content included in the repository.
- Security, accessibility, and SEO MUST be considered for each feature as it
  is built, not retrofitted afterward (accessibility baseline: Principle V;
  SEO tooling: Technology & Hosting Constraints above).

## Development Workflow

- Each step of work targets one concrete, narrow outcome (e.g. "scaffold the
  Next.js project," "build the hero section") and stops for confirmation
  before the next step starts, per Principle II.
- Work presented to the user MUST clearly separate required tasks from
  optional/nice-to-have improvements.
- When more than one valid implementation approach exists, the tradeoffs
  MUST be explained and a recommendation given, rather than an approach
  being chosen silently.
- Before adding any library not already named in Technology & Hosting
  Constraints, confirm it is needed by the feature currently being built.
- Before using a new tool, framework, or library for the first time, its
  purpose MUST be briefly explained.
- When a decision changes, both the implementation and the documentation
  describing it MUST be updated together, per Principle VII.
- Before assuming a fact about external state (hosting provider, DNS,
  deployment status, etc.), verify it directly (e.g. `dig`/`curl`/`gh api`)
  rather than relying on memory or assumption — this project's hosting setup
  was previously misremembered and had to be re-verified this way.

## Governance

This constitution supersedes ad hoc practice for this project. Amendments
require the user's explicit approval and MUST update this file along with a
version bump per the semantic versioning policy below:

- **MAJOR**: Backward-incompatible principle removal or redefinition.
- **MINOR**: A new principle or section is added, or existing guidance is
  materially expanded.
- **PATCH**: Wording clarifications, typo fixes, non-semantic refinements.

Any `/speckit-plan` or `/speckit-tasks` output MUST verify compliance with
these principles before proceeding; unresolved violations MUST be recorded
in that artifact's Complexity Tracking section with a justification.

**Version**: 2.1.0 | **Ratified**: 2026-07-17 | **Last Amended**: 2026-07-18
