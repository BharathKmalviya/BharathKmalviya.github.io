# Terminal-on-M3 Portfolio Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the portfolio into a dark terminal-skinned single page (typewriter hero, project code cards, tech stack, GitHub graph, blog list, copy-email contact) while keeping Material Web for interactive controls and Android seed green `#3DDC84` as the neon accent.

**Architecture:** Keep the existing Next.js 16 static-export App Router app. Add a typed static data module, small presentational section components, and CSS variable overrides that turn M3 dark tokens into a near-black / neon terminal skin. No new runtime APIs; contribution graph is an `<img>` with a fallback card.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, `@material/web`, Framer Motion, `next-themes`, `next/font/google` (Roboto Flex + JetBrains Mono), Material Symbols, Vitest.

## Global Constraints

- Static export only (`output: 'export'`) — no API routes. (Constitution I)
- Prefer `@material/web` for buttons/chips/icon buttons; custom UI allowed for typewriter, terminal chrome, code previews. (Constitution III v2.1.0)
- No speculative dependencies. (Constitution IV)
- Dark-first terminal; respect `prefers-reduced-motion`; neon not used as body text. (Constitution V)
- Package manager: pnpm. No AI attribution in commits.
- Spec: `docs/superpowers/specs/2026-07-18-terminal-m3-portfolio-design.md`
- Constitution: `.specify/memory/constitution.md` v2.1.0

## File Map

| Path | Responsibility |
| --- | --- |
| `src/data/portfolio.ts` | Typed profile, projects, tech, blog placeholders |
| `src/app/fonts.ts` | Roboto Flex + JetBrains Mono CSS variables |
| `src/app/globals.css` | Terminal skin tokens + base page styles |
| `src/components/ui/typewriter.tsx` | Hero typewriter with reduced-motion path |
| `src/components/ui/code-preview-card.tsx` | Project card with code chrome |
| `src/components/ui/copy-email-button.tsx` | Clipboard + fallback |
| `src/components/sections/*.tsx` | One file per page section |
| `src/components/portfolio-page.tsx` | Compose nav + sections |
| `src/lib/clipboard.ts` | Pure clipboard helper (unit-tested) |

---

### Task 1: Portfolio data module + clipboard helper

**Files:**
- Create: `src/data/portfolio.ts`
- Create: `src/lib/clipboard.ts`
- Create: `src/lib/clipboard.test.ts`

**Interfaces:**
- Produces:
  - `export type Project = { id: string; title: string; blurb: string; filename: string; snippet: string; tags: string[]; repoUrl?: string; storeUrl?: string; isPlaceholder: boolean }`
  - `export type BlogPost = { id: string; title: string; date: string; excerpt: string; href: string; isPlaceholder: boolean }`
  - `export type TechItem = { id: string; label: string; icon: string }` (Material Symbol ligature name)
  - `export const portfolio = { name, role, location, email, githubUser, socials, about, typewriterLines, projects, tech, blog }`
  - `export async function copyText(text: string): Promise<'copied' | 'failed'>`

- [ ] **Step 1: Write the failing clipboard test**

```ts
import {describe, expect, it, vi, beforeEach} from 'vitest';
import {copyText} from './clipboard';

describe('copyText', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns copied when clipboard.writeText resolves', async () => {
    vi.stubGlobal('navigator', {
      clipboard: {writeText: vi.fn().mockResolvedValue(undefined)},
    });
    await expect(copyText('a@b.com')).resolves.toBe('copied');
  });

  it('returns failed when clipboard is missing', async () => {
    vi.stubGlobal('navigator', {});
    await expect(copyText('a@b.com')).resolves.toBe('failed');
  });
});
```

- [ ] **Step 2: Run test — expect FAIL (module missing)**

```bash
pnpm exec vitest run src/lib/clipboard.test.ts
```

Expected: FAIL resolving `./clipboard`.

- [ ] **Step 3: Implement clipboard helper + portfolio data**

`src/lib/clipboard.ts`:

```ts
export async function copyText(text: string): Promise<'copied' | 'failed'> {
  try {
    if (!navigator?.clipboard?.writeText) return 'failed';
    await navigator.clipboard.writeText(text);
    return 'copied';
  } catch {
    return 'failed';
  }
}
```

`src/data/portfolio.ts` — include real profile fields already on the site:

```ts
export type Project = {
  id: string;
  title: string;
  blurb: string;
  filename: string;
  snippet: string;
  tags: string[];
  repoUrl?: string;
  storeUrl?: string;
  isPlaceholder: boolean;
};

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  href: string;
  isPlaceholder: boolean;
};

export type TechItem = {id: string; label: string; icon: string};

export const portfolio = {
  name: 'Bharath K Malviya',
  role: 'Android Engineer',
  location: 'Mumbai, India',
  email: 'Bharathkmalviya@gmail.com',
  githubUser: 'BharathKmalviya',
  about:
    'Results-driven Android Engineer with 6 years of experience in designing, developing, and optimizing mobile applications. Proficient in Java, Kotlin, and Android SDK, with expertise in MVVM architecture, Dependency Injection (Dagger Hilt), Jetpack Components, and Firebase.',
  typewriterLines: [
    'Bharath K Malviya',
    'Android Engineer · Mumbai',
    'Building apps that feel native.',
  ],
  socials: [
    {href: 'https://linkedin.com/in/bharath-k-malviya', label: 'LinkedIn'},
    {href: 'https://github.com/BharathKmalviya', label: 'GitHub'},
    {href: 'https://x.com/BharathKmalviya', label: 'Twitter/X'},
    {href: 'mailto:Bharathkmalviya@gmail.com', label: 'Email'},
  ],
  projects: [
    {
      id: 'p1',
      title: 'Compose Sample Vault',
      blurb: 'Placeholder — Jetpack Compose patterns and Material 3 demos.',
      filename: 'HomeScreen.kt',
      snippet: `@Composable\nfun HomeScreen() {\n  Scaffold { /* ... */ }\n}`,
      tags: ['Kotlin', 'Compose', 'M3'],
      repoUrl: 'https://github.com/BharathKmalviya',
      isPlaceholder: true,
    },
    {
      id: 'p2',
      title: 'Offline-first Notes',
      blurb: 'Placeholder — Room + WorkManager sync sketch.',
      filename: 'NotesRepository.kt',
      snippet: `class NotesRepository(\n  private val dao: NoteDao,\n) {\n  fun observe() = dao.observeAll()\n}`,
      tags: ['Room', 'Hilt', 'Kotlin'],
      repoUrl: 'https://github.com/BharathKmalviya',
      isPlaceholder: true,
    },
    {
      id: 'p3',
      title: 'Firebase Auth Gate',
      blurb: 'Placeholder — secure session bootstrap.',
      filename: 'AuthViewModel.kt',
      snippet: `class AuthViewModel @Inject constructor(\n  private val auth: FirebaseAuth,\n) : ViewModel()`,
      tags: ['Firebase', 'MVVM'],
      repoUrl: 'https://github.com/BharathKmalviya',
      isPlaceholder: true,
    },
  ] satisfies Project[],
  tech: [
    {id: 'kotlin', label: 'Kotlin', icon: 'code'},
    {id: 'compose', label: 'Jetpack Compose', icon: 'widgets'},
    {id: 'android', label: 'Android SDK', icon: 'android'},
    {id: 'firebase', label: 'Firebase', icon: 'local_fire_department'},
    {id: 'hilt', label: 'Hilt', icon: 'hub'},
    {id: 'room', label: 'Room', icon: 'storage'},
  ] satisfies TechItem[],
  blog: [
    {
      id: 'b1',
      title: 'Why Compose state is not just LiveData',
      date: '2026-06-01',
      excerpt: 'Placeholder post — thinking in snapshots and side effects.',
      href: '#',
      isPlaceholder: true,
    },
    {
      id: 'b2',
      title: 'Shipping Material You without losing brand green',
      date: '2026-05-12',
      excerpt: 'Placeholder — seed colors vs dynamic color.',
      href: '#',
      isPlaceholder: true,
    },
  ] satisfies BlogPost[],
};
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
pnpm exec vitest run src/lib/clipboard.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/data/portfolio.ts src/lib/clipboard.ts src/lib/clipboard.test.ts
git commit -m "feat: add portfolio data module and clipboard helper"
```

---

### Task 2: Terminal skin tokens + JetBrains Mono

**Files:**
- Modify: `src/app/fonts.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: CSS vars `--font-jetbrains-mono`, `--terminal-bg` (`#0A0A0A`), `--terminal-neon` (use `#3DDC84` or `var(--md-sys-color-primary)` in dark), body uses black canvas + mono utility class `.font-mono-terminal`.

- [ ] **Step 1: Add JetBrains Mono beside Roboto Flex**

```ts
import {JetBrains_Mono, Roboto_Flex} from 'next/font/google';

export const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});
```

- [ ] **Step 2: Apply both variables on `<html>`**

In `layout.tsx`:

```tsx
import {jetbrainsMono, robotoFlex} from './fonts';

// className={`${robotoFlex.variable} ${jetbrainsMono.variable}`}
// ThemeProvider: force dark for this pass via attribute default — keep next-themes;
// set defaultTheme="dark" enableSystem={false} in theme-provider if not already.
```

- [ ] **Step 3: Replace white canvas with terminal base in `globals.css`**

```css
@import "tailwindcss";
@import "../styles/md-color-tokens.css";

:root {
  --terminal-bg: #0a0a0a;
  --terminal-neon: #3ddc84;
  --terminal-border: color-mix(in srgb, var(--terminal-neon) 35%, transparent);
}

html,
body {
  background-color: var(--terminal-bg);
  color: var(--md-sys-color-on-surface);
  font-family: var(--font-roboto-flex), system-ui, sans-serif;
}

.font-mono-terminal {
  font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
}

/* Material Web buttons — nudge toward neon primary on dark */
md-filled-button {
  --md-filled-button-container-color: var(--terminal-neon);
  --md-filled-button-label-text-color: #00391f;
}
```

Ensure `ThemeProvider` defaults to `dark` for this pass (constitution: dark-first).

- [ ] **Step 4: Visually verify in dev**

```bash
pnpm dev
```

Open the app — page background must be near-black, not white.

- [ ] **Step 5: Commit**

```bash
git add src/app/fonts.ts src/app/layout.tsx src/app/globals.css src/components/theme-provider.tsx
git commit -m "feat: add terminal skin tokens and JetBrains Mono"
```

---

### Task 3: Typewriter + Copy email UI primitives

**Files:**
- Create: `src/components/ui/typewriter.tsx`
- Create: `src/components/ui/copy-email-button.tsx`

**Interfaces:**
- Consumes: `copyText` from `@/lib/clipboard`; `portfolio.email`
- Produces:
  - `Typewriter({ lines: string[]; className?: string })`
  - `CopyEmailButton({ email: string })`

- [ ] **Step 1: Implement `Typewriter`**

Client component: type characters with `setInterval` / `requestAnimationFrame`; on `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, render `lines.join('\n')` immediately. Show a blinking `▌` cursor via CSS animation that is disabled under reduced motion.

- [ ] **Step 2: Implement `CopyEmailButton`**

Use `<md-filled-tonal-button>` or `<md-outlined-button>` (ensure Material Web button is imported/registered the same way other MD components are in this repo). On click: `const result = await copyText(email)`; if `copied`, set label to `Copied` for 2s; if `failed`, set `aria-live` region text to `Select and copy manually` and call `document.getElementById('contact-email')?.focus()` / select the email text node.

- [ ] **Step 3: Smoke-check in a temporary render or Story-less page section later** — proceed once TypeScript compiles:

```bash
pnpm exec tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/typewriter.tsx src/components/ui/copy-email-button.tsx
git commit -m "feat: add typewriter and copy-email primitives"
```

---

### Task 4: Code preview card + section components

**Files:**
- Create: `src/components/ui/code-preview-card.tsx`
- Create: `src/components/sections/hero-terminal.tsx`
- Create: `src/components/sections/about-section.tsx`
- Create: `src/components/sections/projects-section.tsx`
- Create: `src/components/sections/tech-stack-section.tsx`
- Create: `src/components/sections/github-graph-section.tsx`
- Create: `src/components/sections/blog-section.tsx`
- Create: `src/components/sections/contact-section.tsx`

**Interfaces:**
- Consumes: `portfolio` from `@/data/portfolio`
- Produces: named section exports used by `PortfolioPage`

- [ ] **Step 1: `CodePreviewCard`**

Props: `project: Project`. Render terminal window chrome (traffic-light dots optional — keep minimal: filename bar), `<pre className="font-mono-terminal">` with snippet, title, blurb, `md-assist-chip` or plain tag spans for tags, links for repo/store.

- [ ] **Step 2: Hero**

Full-viewport section with border `1px solid var(--terminal-border)`, prompt `guest@portfolio:~$`, `<Typewriter lines={portfolio.typewriterLines} />`, CTA `md-filled-button` scrolling to `#projects` and `#contact`.

- [ ] **Step 3: About / Projects / Tech / Blog / Contact**

- About: existing bio from `portfolio.about`, label `// about`.
- Projects: `id="projects"` grid of `CodePreviewCard`.
- Tech: grid of Material Symbol + label; hover neon border.
- Blog: list rows date · title · excerpt.
- Contact: `id="contact"` email span `id="contact-email"`, `<CopyEmailButton />`, `<a href={mailto:...}>`, social icons (reuse existing `social-icons.tsx`).

- [ ] **Step 4: GitHub graph section**

```tsx
const src = `https://ghchart.rshah.org/3ddc84/${portfolio.githubUser}`;
// img onError → setFailed(true) → render fallback card linking to github.com/{user}
```

Reserve `min-h` so layout does not jump.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/code-preview-card.tsx src/components/sections
git commit -m "feat: add terminal portfolio section components"
```

---

### Task 5: Compose page + minimal nav + verify

**Files:**
- Modify: `src/components/portfolio-page.tsx` (replace arch/white layout with terminal composition)
- Optionally modify: `src/app/page.tsx` if it only re-exports `PortfolioPage`

**Interfaces:**
- Consumes: all section components from Task 4

- [ ] **Step 1: Rewrite `PortfolioPage` composition**

Order: sticky/minimal nav anchors → Hero → About → Projects → Tech → GitHub → Blog → Contact. Use Framer Motion `whileInView` reveals with reduced-motion safe defaults (or skip motion when reduced). Remove the white arch panel from the prior M3 landing experiment.

- [ ] **Step 2: Manual verification checklist**

1. Desktop + mobile scroll through all sections.
2. Typewriter runs; with OS reduced-motion, full text shows immediately.
3. Copy email success path.
4. Block graph URL in DevTools → fallback card appears.
5. `pnpm run lint` and `pnpm run build` — `out/index.html` exists.

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio-page.tsx src/app/page.tsx
git commit -m "feat: compose terminal-skinned portfolio page"
```

---

## Spec coverage check

| Spec requirement | Task |
| --- | --- |
| Terminal skin / neon / mono | 2 |
| Typewriter hero + reduced motion | 3, 4 |
| Project code preview cards | 4 |
| Tech stack grid | 4 |
| GitHub graph + fallback | 4 |
| Blog list placeholders | 1, 4 |
| Copy email + mailto | 1, 3, 4 |
| Static export / no EmailJS | Global + 5 |
| Data module placeholders | 1 |
| Compose single page | 5 |

## Placeholder scan

No TBD steps; graph host is specified (`ghchart.rshah.org` with `#3ddc84`); Material button registration must follow existing repo pattern (inspect how other MD elements are imported when implementing Task 3).
