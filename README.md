# Portfolio — bharathmalviya.com

Production personal site for **Bharath Malviya**, Senior Android Developer at MagicDecor.

**Live:** [https://bharathmalviya.com](https://bharathmalviya.com)

## Stack

- Next.js 16 (App Router, static export)
- TypeScript, Tailwind CSS v4, Framer Motion
- Dark terminal UI (JetBrains Mono, neon `#3DDC84`)
- Hosted on GitHub Pages from `master`

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

- Constitution: `.specify/memory/constitution.md` (v3.0.0)
- Agent notes: `CLAUDE.md`
- Historical design notes: `docs/superpowers/specs/` (includes superseded Material 3 exploration)

## Author

**Bharath Malviya**

- LinkedIn: [bharath-k-malviya](https://www.linkedin.com/in/bharath-k-malviya)
- GitHub: [BharathKmalviya](https://github.com/BharathKmalviya)
- X: [@BharathKmalviya](https://x.com/BharathKmalviya)
