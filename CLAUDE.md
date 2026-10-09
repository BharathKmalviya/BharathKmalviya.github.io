# CLAUDE.md

Guidance for agents working in this repository.

## Status

**Production site** for [bharathmalviya.com](https://bharathmalviya.com). Production code lives on `master`; feature branches merge through PR checks before Pages deployment. Previous Kobweb site is frozen on `archive/kobweb-kotlin` — do not modify that branch.

## Tech Stack & Design

- **Stack**: Next.js 16 (App Router, `output: 'export'`), TypeScript, Tailwind CSS v4. Contact is copy-email + `mailto:`. GitHub Pages + custom domain.
- **Visual design**: Retain the constitution's dark palette, Android green `#3DDC84`, JetBrains Mono, and native controls. The current presentation uses plain project writeups, solid surfaces, and Inter body copy. Simulated shell commands, window chrome, typewriters, ambient effects, and placeholder screens were removed at the owner's request. See `docs/portfolio-presentation.md`; historical terminal design documents are archived context.
- **Content**: `src/data/portfolio.ts` is the single source for copy, experience, education, skills, and SEO keywords.
- **Analytics**: Firebase project `bharathmalviya-portfolio`; browser-only, best effort, production-domain collection. Keep event parameters fixed and free of personal data. See `docs/analytics.md` for setup and manual verification. GitHub Pages remains the host.
- **Source of truth**: `.specify/memory/constitution.md` (v4.0.0). The owner approved publication of the revised presentation on 2026-10-09. Static hosting, accessibility, and CI requirements remain in force; future constitution amendments require explicit approval.

## Testing

- **Unit**: `pnpm test` (Vitest) for pure logic (e.g. `src/lib/*.test.ts`).
- **E2E**: `pnpm test:e2e` (Playwright, `e2e/*.spec.ts`) against `pnpm dev` — real-browser coverage for things unit tests can't see: touch/hover CSS behavior, mobile viewport layout, nav active-state, basic accessibility (axe-core). Any bug caught in a screenshot review (like a stuck hover state or a stray scrollbar) should get a regression test here, not just a one-off fix.
- Both run in CI (`.github/workflows/deploy.yml`) on every PR to `master` — required to pass before merge.

## Git Workflow

Single-maintainer, public repo:

- **`master`**: live production only — merge when build passes and the feature is verified in-browser.
- **`feature/*`**: active work.
- **`archive/*`**: frozen reference — never modify.
- **Commits**: `feat:`, `fix:`, `docs:`, `chore:` — no AI attribution / no `Co-authored-by` for tools.
- **Deploy**: `.github/workflows/deploy.yml` on push to `master`.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
