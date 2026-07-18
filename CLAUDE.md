# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

This portfolio is being rewritten as a React app on the `feature/react-portfolio` branch. The previous Kobweb (Kotlin/JS) implementation is preserved on the `archive/kobweb-kotlin` branch for reference. `master` will be merged/overridden with this branch once the rewrite is complete.

## Tech Stack & Design

- **Stack**: Next.js 16 (App Router, static export), TypeScript, Tailwind CSS v4, Material Web (`@material/web`, rendered as client components — a brief hydration flash on first paint is an accepted trade-off), Framer Motion, `next-themes`. Contact for the current pass is copy-email + `mailto:` (EmailJS + React Hook Form + Zod when a form ships). Hosted on GitHub Pages (`bharathmalviya.com`).
- **Visual design**: Terminal skin on Material 3 tokens — near-black surfaces, neon accents from Android seed `#3DDC84`, Roboto Flex + JetBrains Mono, Material Symbols. Interactive controls stay on `@material/web`; chrome/typewriter/code previews may be custom.
- **Full detail**: principles in `.specify/memory/constitution.md` (v2.1.0); presentation in `docs/superpowers/specs/2026-07-18-terminal-m3-portfolio-design.md`; M3 token foundation in `docs/superpowers/specs/2026-07-17-android-material3-theme-design.md`. Treat these as the source of truth — update them whenever a decision changes, don't just repeat context in chat.

## Git Workflow

Single-maintainer project — no PR process, no code review gate. Still keep history clean since the repo is public:

- **Branches**: `master` is the live, deployed site — only updated when a feature branch is complete and verified. `feature/*` branches (e.g. `feature/react-portfolio`) hold active work. `archive/*` branches (e.g. `archive/kobweb-kotlin`) are frozen historical reference and MUST NOT be modified.
- **Commits**: use the conventional prefixes already established in this repo's history — `feat:`, `fix:`, `docs:`, `chore:` — one logical change per commit, descriptive message body when the "why" isn't obvious from the subject line.
- **Merging to `master`**: only once a feature branch's work is complete and verified (build passes, feature reviewed in-browser per the project's verification practice), not mid-feature.
- **No AI attribution, ever**: commit messages MUST NOT include `Co-Authored-By`/`Co-authored-by` trailers or any mention of Claude, Anthropic, Cursor, or any AI tool. Commits MUST be authored as the human user, never under an AI identity. (This restates the global commit policy in this machine's user-level `CLAUDE.md` explicitly, so it holds even if that file isn't present.)

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
