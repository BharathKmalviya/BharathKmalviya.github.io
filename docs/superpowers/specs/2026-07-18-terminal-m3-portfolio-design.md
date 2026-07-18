# Terminal Skin on Material 3 — Portfolio Expansion Design

## Context

The React portfolio rewrite currently ships a partial Material 3 Expressive
page (hero name block, About, Connect) on `feature/react-portfolio`. The
owner requested a fuller developer portfolio: typewriter hero, project cards
with code previews, tech-stack grid, GitHub contribution graph, blog list,
and a contact area with copy-email.

After clarifying, the chosen direction is **not** a pure black-hat terminal
rewrite and **not** a pure M3 expansion. It is **Approach 3**: a **terminal
skin** (near-black background, neon green accents, monospace accents) layered
on top of the existing Material 3 token/component stack.

This supersedes the purely tonal M3 landing look for the main portfolio
surface. The Android seed green `#3DDC84` remains the accent source so the
site still reads as “Android developer,” not generic cyberpunk purple.

**Speckit sync:** Constitution amended to **v2.1.0** (2026-07-18) for
terminal-on-M3 presentation, Principle III client-component correction, and
copy-email contact guidance. `CLAUDE.md` Tech Stack & Design updated to match.

## Decision Summary

| Topic | Decision |
| --- | --- |
| Visual system | Terminal skin on M3 tokens: `#0A0A0A` surfaces, neon `#3DDC84` accents, thin neon borders; no frosted glass |
| Components | Keep `@material/web` for interactive controls (buttons, chips, icon buttons); restyle via CSS variables / theme overrides |
| Typography | Roboto Flex for UI; JetBrains Mono (or equivalent `next/font` mono) for typewriter, code previews, `// section` labels |
| Theme | Dark-first terminal for this pass; light mode not required in v1 |
| Layout | Single static scroll page (`PortfolioPage` + section components) |
| Content | Static typed module `src/data/portfolio.ts` with polished placeholders (`isPlaceholder: true`) |
| Hero | Hybrid: M3/terminal chrome + monospace typewriter tagline under the name |
| Contact | Copy-email button + `mailto:` link; EmailJS form deferred |
| GitHub graph | Client-side image embed (static chart URL) + profile link; no GitHub API |
| Hosting | Unchanged: Next.js `output: 'export'`, GitHub Pages |
| Motion | Framer Motion section reveals + typewriter; respect `prefers-reduced-motion` |

## Page Structure (top → bottom)

1. **Minimal nav** — section anchors; optional theme control deferred.
2. **Hero** — full-viewport terminal window; prompt + typewriter lines (name, role, short tagline); blinking cursor; primary CTA to projects/contact.
3. **About** — existing bio content, restyled into the terminal/M3 surface language.
4. **Projects** — grid of code-preview cards: window chrome (`filename.kt`), monospace snippet, title, one-line blurb, tech chips, GitHub/Play links.
5. **Tech stack** — icon + label grid (Kotlin, Jetpack Compose, Android, Firebase, etc.).
6. **GitHub contributions** — embedded contribution graph image for `BharathKmalviya` with caption + profile link.
7. **Blog** — list rows: date · title · excerpt · link (placeholders until real posts).
8. **Contact** — mono email display, Copy button, mailto fallback, existing social icons.

## Architecture

```
src/
  data/portfolio.ts          # typed placeholders + real profile links
  components/
    portfolio-page.tsx       # composes sections
    sections/
      hero-terminal.tsx
      about-section.tsx
      projects-section.tsx
      tech-stack-section.tsx
      github-graph-section.tsx
      blog-section.tsx
      contact-section.tsx
    ui/
      typewriter.tsx
      code-preview-card.tsx
      copy-email-button.tsx
  app/globals.css            # terminal skin tokens + Material Web overrides
```

- **Data flow:** build-time static data only. No runtime fetches except the
  contribution-graph `<img>` URL (browser loads the image).
- **Material Web:** continue client-component rendering; accept brief
  hydration flash (existing project decision — no `@lit-labs/nextjs`).
- **Dependencies:** prefer zero new libraries. Typewriter is a custom local
  component/hook. Contribution graph uses an external static chart image
  URL for `BharathKmalviya` (ghchart-style CDN); if that host proves
  unreliable during implementation, swap to a checked-in SVG snapshot.
  Either path must degrade gracefully via the fallback card.

## Component Behavior

### Typewriter

- Types sequential lines into the hero terminal.
- On `prefers-reduced-motion: reduce`, render the final text immediately
  (cursor optional/static).
- Does not block keyboard focus; CTAs remain reachable during animation.

### Code preview cards

- Presentational cards; interaction is link navigation (GitHub / store).
- Snippets are short, illustrative Kotlin/Android-flavored placeholders —
  not live-editable editors.
- Cards are justified here as **interaction containers** (links + chips),
  consistent with project UI rules for non-hero surfaces.

### Copy email

1. Prefer `navigator.clipboard.writeText`.
2. On failure (insecure context, permission denied): select the email text
   and announce “Select and copy manually” via `aria-live`.
3. Success feedback: brief “Copied” state on the button (Material snackbar
   optional; button label change is enough for v1).

### GitHub graph

- Primary: `<img>` pointing at a static contribution chart URL for
  `BharathKmalviya`.
- On error/`onError`: replace with a compact fallback card linking to
  `https://github.com/BharathKmalviya` — no broken-image layout jump
  (reserved min-height).

## Content Rules

- Placeholder projects/posts MUST set `isPlaceholder: true`.
- Copy MUST NOT claim shipped products or publications that do not exist.
- Profile facts already on the page stay authoritative: name
  **Bharath K Malviya**, Android Engineer, Mumbai; social URLs and
  `Bharathkmalviya@gmail.com` as currently used.

## Error Handling & Accessibility

| Risk | Mitigation |
| --- | --- |
| Clipboard failure | Manual-select fallback + live region |
| Graph image failure | Fallback card + profile link |
| Motion sensitivity | Skip typewriter; show final text |
| Contrast | Neon for accents/labels; body text uses high-contrast on-surface (not neon-on-black body paragraphs) |
| Keyboard | Full tab order through nav, CTAs, card links, copy/mailto |
| Static export | No API routes, no EmailJS in this pass, no server-side GitHub API |

## Out of Scope (this pass)

- EmailJS contact form (explicitly deferred).
- Separate `/blog` or `/projects` routes.
- Light-mode terminal variant.
- Live GitHub API contribution fetching.
- Replacing Material Web with a different component library.
- Speckit/constitution amendment for this visual system (done in v2.1.0).

## Relationship to Prior Specs

- `2026-07-17-android-material3-theme-design.md` remains the source for
  seed color, Material Color Utilities / `SchemeVibrant`, Material Web,
  Roboto Flex, and Material Symbols.
- This document **overlays** a terminal presentation layer and expands
  page sections. Where the prior spec retired the Kobweb typewriter, this
  document **reintroduces a typewriter** as a deliberate hybrid accent
  under the terminal skin — scoped to the hero, not a return to frosted-glass cards.
- `2026-04-04-portfolio-ui-redesign-design.md` is historical for the earlier
  redesign pass; do not treat it as current visual truth.

## Verification

- Desktop + mobile: full scroll through all sections.
- Typewriter + reduced-motion path.
- Copy email success and forced-failure path.
- Graph image blocked → fallback visible.
- `npm run lint` and `npm run build` (static export succeeds).

## Mentorship Note

This approach trades pure Material authenticity for a stronger “developer
terminal” first impression. That is a conscious compromise: Material Web
still supplies interaction physics and tokens, while CSS skinning carries
the neon/terminal mood. If the skin starts fighting Material components
(unreadable chips, broken ripples), prefer adjusting tokens over forking
custom button primitives.
