# Portfolio — bharathmalviya.com

Production personal site for **Bharath Malviya**, Senior Android Developer at MagicDecor.

**Live:** [https://bharathmalviya.com](https://bharathmalviya.com)

## Stack

- Next.js 16 (App Router, static export)
- TypeScript, Tailwind CSS v4
- Dark Android palette with JetBrains Mono headings, Inter body copy, and `#3DDC84` accents
- Plain project writeups; no simulated shell, placeholder app screens, or glass effects
- Hosted on GitHub Pages from `master`
- Firebase Analytics for production page views and contact actions

## Develop

```bash
pnpm install
pnpm dev
```

```bash
pnpm run lint
pnpm run build   # writes static site to out/
```

## Deploy

Pushes / merges to `master` run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) (pnpm build → upload `out/` → GitHub Pages). Custom domain: `public/CNAME`.

PRs targeting `master` run lint, tests, and build only (no deploy) so CI can verify before merge.

See [docs/deployment.md](docs/deployment.md) for the full checklist and verified Pages settings.

## Content

Edit `src/data/portfolio.ts` for profile copy, experience, education, skills, and SEO.

## Docs

- Constitution: `.specify/memory/constitution.md` (v3.1.0)
- Agent notes: `CLAUDE.md`
- Analytics setup and manual verification: [docs/analytics.md](docs/analytics.md)
- Current presentation and content rules: [docs/portfolio-presentation.md](docs/portfolio-presentation.md)
- Historical design notes: `docs/superpowers/specs/` (Material 3 and simulated-terminal explorations)

## Author

**Bharath Malviya**

- LinkedIn: [bharath-k-malviya](https://www.linkedin.com/in/bharath-k-malviya)
- GitHub: [BharathKmalviya](https://github.com/BharathKmalviya)
- X: [@BharathKmalviya](https://x.com/BharathKmalviya)
