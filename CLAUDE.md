# CLAUDE.md

Guidance for agents working in this repository.

## Status

**Production site** for [bharathmalviya.com](https://bharathmalviya.com). Active code lives on `feature/react-portfolio` until merged to `master` (Pages deploy). Previous Kobweb site is frozen on `archive/kobweb-kotlin` — do not modify that branch.

## Tech Stack & Design

- **Stack**: Next.js 16 (App Router, `output: 'export'`), TypeScript, Tailwind CSS v4, Framer Motion. Contact is copy-email + `mailto:`. GitHub Pages + custom domain.
- **Visual design**: Dark terminal aesthetic — near-black surfaces, neon Android green `#3DDC84`, JetBrains Mono, native HTML buttons. No Material Web.
- **Content**: `src/data/portfolio.ts` is the single source for copy, experience, education, skills, and SEO keywords.
- **Source of truth**: `.specify/memory/constitution.md` (v3.1.0). Update it when lasting decisions change.

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
