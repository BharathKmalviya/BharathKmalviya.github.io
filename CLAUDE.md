# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

This portfolio is being rewritten as a React app on the `feature/react-portfolio` branch. The previous Kobweb (Kotlin/JS) implementation is preserved on the `archive/kobweb-kotlin` branch for reference. `master` will be merged/overridden with this branch once the rewrite is complete.

## Tech Stack & Design

- **Stack**: Next.js 16 (App Router, static export), TypeScript, Tailwind CSS v4, Material Web (`@material/web`) + `@lit-labs/nextjs`, Framer Motion, `next-themes`, EmailJS + React Hook Form + Zod (contact form). Hosted on GitHub Pages (`bharathmalviya.com`).
- **Visual design**: Material 3 Expressive, authentically Google-styled (not Material-*inspired*) — reflects the site owner's background as an Android developer. Seed color is Android's fixed brand green `#3DDC84` (pre-Material You), typography is Roboto Flex, icons are Material Symbols.
- **Full detail**: project principles and constraints are ratified in `.specify/memory/constitution.md`; the theme decision and its rationale are in `docs/superpowers/specs/2026-07-17-android-material3-theme-design.md`. Treat both as the source of truth — update them whenever a decision changes, don't just repeat context in chat.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
