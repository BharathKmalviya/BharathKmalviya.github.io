# Deployment — GitHub Pages

## Current production setup (verified)

| Setting | Value |
| --- | --- |
| Repo | `BharathKmalviya/BharathKmalviya.github.io` |
| Pages build | **GitHub Actions** (`build_type: workflow`) |
| Branch | `master` |
| Custom domain | `bharathmalviya.com` (HTTPS enforced) |
| Live URL | https://bharathmalviya.com |

Pages uses Actions; feature changes deploy through the workflow after merging to `master`.

## How deploy works after merge

1. Open a PR: the feature branch → `master`.
2. Workflow **Deploy to GitHub Pages** runs on the PR: `lint` + unit tests + Playwright E2E tests + `next build` (static `out/`). **No deploy** on PRs.
3. Merge the PR to `master`.
4. Same workflow runs on `push` to `master`: builds again, uploads `out/`, deploys to Pages.
5. Custom domain comes from `public/CNAME` → copied to `out/CNAME` in the artifact.

## Local check before PR

```bash
pnpm install
pnpm run lint
pnpm run test
pnpm run build
# confirm:
#   out/index.html
#   out/CNAME          → bharathmalviya.com
#   out/.nojekyll
#   out/_next/
```

## Manual redeploy

**Actions → Deploy to GitHub Pages → Run workflow** (`workflow_dispatch`) on `master`.

## Analytics

Firebase Analytics uses committed public web-app configuration; no Firebase admin
credential or additional Actions environment variable is required. Production
collection starts after this change reaches `master` and Pages deploys successfully.
Development and preview hosts are excluded. See [analytics.md](analytics.md) for
the project identifiers, event catalog, and manual DebugView checks.

## Historical Kobweb site

The former Kobweb site is archived on `archive/kobweb-kotlin`. Production now
builds the Next.js static export; the archive branch is not part of deployment.
