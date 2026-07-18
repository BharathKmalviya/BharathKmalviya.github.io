# Deployment — GitHub Pages

## Current production setup (verified)

| Setting | Value |
| --- | --- |
| Repo | `BharathKmalviya/BharathKmalviya.github.io` |
| Pages build | **GitHub Actions** (`build_type: workflow`) |
| Branch | `master` |
| Custom domain | `bharathmalviya.com` (HTTPS enforced) |
| Live URL | https://bharathmalviya.com |

No change needed in **Settings → Pages** when merging this Next.js rewrite — it already uses Actions, not “Deploy from a branch”.

## How deploy works after merge

1. Open a PR: `feature/react-portfolio` → `master`.
2. Workflow **Deploy to GitHub Pages** runs on the PR: `lint` + `test` + `next build` (static `out/`). **No deploy** on PRs.
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

## Replacing Kobweb

`master` today still builds the Kobweb site. Merging this branch replaces `.github/workflows/deploy.yml` with the Next.js pipeline and removes the Gradle/Kobweb tree from `master`. That is expected for cutover.
