# M3 Expressive Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the Next.js portfolio project and wire up the Material 3 Expressive design system foundation (real M3 color tokens seeded from Android's brand green, Roboto Flex typography, Material Symbols icons, and Google's official Material Web components) so it's provably working end-to-end before any actual portfolio content (hero, projects, contact) gets built.

**Architecture:** A static-export Next.js 16 App Router project. A small Node script generates the official M3 Expressive color scheme (light + dark) from a seed color using Google's own color-science library and writes it as CSS custom properties that both Tailwind-styled layout and `@material/web` components read from. `next-themes` toggles between the light/dark token sets. Material Web components are used as plain React Client Components — no SSR helper (see constitution Principle III and the design spec's Technical Risk section for why).

**Tech Stack:** Next.js 16 (App Router, TypeScript, static export), Tailwind CSS v4, `@material/material-color-utilities`, `@material/web`, `next-themes`, `next/font/google` (Roboto Flex + Material Symbols Outlined), Vitest (unit tests), pnpm.

## Global Constraints

- Site MUST build to fully static output (`output: 'export'`) — no server/API routes at request time. (Constitution Principle I)
- UI MUST be built from `@material/web` components, laid out with Tailwind; fully custom components only when Material Web has no equivalent. (Constitution Principle III)
- No library gets added speculatively — everything in this plan is used by the task that adds it. (Constitution Principle IV)
- Every page MUST support light/dark themes via `next-themes` and meet baseline accessibility (semantic HTML, keyboard navigable, sufficient contrast). (Constitution Principle V)
- Seed color is `#3DDC84` (Android's fixed brand green, pre-Material You); typography is Roboto Flex; icons are Material Symbols; scheme variant is M3 **Expressive**, not a default/TonalSpot scheme. (Design spec: `docs/superpowers/specs/2026-07-17-android-material3-theme-design.md`)
- No `@lit-labs/nextjs` — it's unverified on Next.js 16. Material Web components render as plain Client Components; a brief first-paint hydration flash is an accepted trade-off, not a bug to fix in this plan.
- Package manager is pnpm.
- No AI attribution in any commit.

---

### Task 1: Scaffold the Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore` (merge with existing), `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `public/*` (default assets)
- Modify: `README.md` (create-next-app will try to create its own; ours must survive)

**Interfaces:**
- Produces: a running Next.js App Router project at the repo root, buildable with `pnpm run build` into `out/`. Later tasks add files under `src/` and edit `src/app/layout.tsx` / `src/app/globals.css`.

- [ ] **Step 1: Back up the existing README so the scaffold tool can't clobber it**

```bash
cp README.md README.md.bak
```

- [ ] **Step 2: Run create-next-app in the repo root**

```bash
pnpm create next-app@latest . --typescript --eslint --tailwind --app --src-dir --import-alias "@/*" --no-turbopack --use-pnpm
```

Expected: prompts are pre-answered by the flags above; it reports something like `Success! Created portfolio at F:\Projects\Web\Portfolio`. It will have overwritten `README.md` with its own generic content.

- [ ] **Step 3: Restore the real README and remove the backup**

```bash
mv README.md.bak README.md
```

Run `git status --short` and confirm `README.md` shows no diff (it's back to what it was before Step 1).

- [ ] **Step 4: Configure static export in `next.config.ts`**

```ts
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 5: Verify the scaffold builds and exports**

```bash
pnpm run build
```

Expected: build succeeds and ends with Next.js writing static files to `out/`. Run `ls out/index.html` (or `Test-Path out/index.html` on PowerShell) to confirm the file exists.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 16 App Router project with static export"
```

---

### Task 2: Generate M3 Expressive color tokens and wire up theme switching

**Files:**
- Create: `scripts/theme-tokens.mjs`, `scripts/theme-tokens.test.mjs`, `scripts/generate-theme-tokens.mjs`, `src/styles/md-color-tokens.css` (generated, not hand-edited), `src/components/theme-provider.tsx`
- Modify: `src/app/globals.css`, `src/app/layout.tsx`, `package.json` (add `vitest`, `@material/material-color-utilities`, `next-themes`; add a `generate:theme` script)

**Interfaces:**
- Consumes: nothing from Task 1 beyond the scaffolded project structure.
- Produces: `generateTokens(seedHex: string, isDark: boolean, contrastLevel?: number): Record<string, string>` (exported from `scripts/theme-tokens.mjs`, maps a `--md-sys-color-*` CSS variable name to a `#rrggbb` hex string) and `ThemeProvider` (exported from `src/components/theme-provider.tsx`, a React component taking `{ children: ReactNode }`). Task 4 relies on the `--md-sys-color-*` variables existing globally and on `ThemeProvider` wrapping the app.

- [ ] **Step 1: Install the color and theme packages**

```bash
pnpm add @material/material-color-utilities next-themes
pnpm add -D vitest
```

- [ ] **Step 2: Write the failing test for the token generator**

Create `scripts/theme-tokens.test.mjs`:

```js
import {describe, expect, it} from 'vitest';
import {generateTokens} from './theme-tokens.mjs';

const SEED = '#3DDC84';
const HEX_PATTERN = /^#[0-9a-f]{6}$/i;

describe('generateTokens', () => {
  it('returns a hex value for every expected color role', () => {
    const tokens = generateTokens(SEED, false);
    expect(Object.keys(tokens).length).toBeGreaterThan(30);
    for (const value of Object.values(tokens)) {
      expect(value).toMatch(HEX_PATTERN);
    }
  });

  it('uses the --md-sys-color- prefix Material Web reads', () => {
    const tokens = generateTokens(SEED, false);
    for (const name of Object.keys(tokens)) {
      expect(name.startsWith('--md-sys-color-')).toBe(true);
    }
  });

  it('produces a different primary tone for dark mode', () => {
    const light = generateTokens(SEED, false);
    const dark = generateTokens(SEED, true);
    expect(light['--md-sys-color-primary']).not.toBe(dark['--md-sys-color-primary']);
  });

  it('is deterministic for the same seed and mode', () => {
    const first = generateTokens(SEED, false);
    const second = generateTokens(SEED, false);
    expect(first).toEqual(second);
  });
});
```

- [ ] **Step 3: Run the test and confirm it fails**

```bash
npx vitest run scripts/theme-tokens.test.mjs
```

Expected: FAIL — `Cannot find module './theme-tokens.mjs'` (the module doesn't exist yet).

- [ ] **Step 4: Implement the token generator**

Create `scripts/theme-tokens.mjs`:

```js
import {
  Hct,
  MaterialDynamicColors,
  SchemeExpressive,
  argbFromHex,
  hexFromArgb,
} from '@material/material-color-utilities';

const dynamicColors = new MaterialDynamicColors();

// The standard M3 color roles that are always defined (not the newer
// "fixed"/"dim" roles, which can be `undefined` depending on spec version).
const COLOR_ROLES = [
  'primary', 'onPrimary', 'primaryContainer', 'onPrimaryContainer', 'inversePrimary',
  'secondary', 'onSecondary', 'secondaryContainer', 'onSecondaryContainer',
  'tertiary', 'onTertiary', 'tertiaryContainer', 'onTertiaryContainer',
  'error', 'onError', 'errorContainer', 'onErrorContainer',
  'background', 'onBackground',
  'surface', 'onSurface', 'surfaceVariant', 'onSurfaceVariant',
  'surfaceDim', 'surfaceBright',
  'surfaceContainerLowest', 'surfaceContainerLow', 'surfaceContainer',
  'surfaceContainerHigh', 'surfaceContainerHighest',
  'outline', 'outlineVariant',
  'inverseSurface', 'inverseOnSurface',
  'shadow', 'scrim', 'surfaceTint',
];

function toKebabCase(role) {
  return role.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * @param {string} seedHex e.g. '#3DDC84'
 * @param {boolean} isDark
 * @param {number} [contrastLevel] -1 (low) to 1 (high); 0 is M3 standard contrast.
 * @returns {Record<string, string>} CSS variable name -> '#rrggbb' hex value
 */
export function generateTokens(seedHex, isDark, contrastLevel = 0.0) {
  const sourceHct = Hct.fromInt(argbFromHex(seedHex));
  const scheme = new SchemeExpressive(sourceHct, isDark, contrastLevel);

  const tokens = {};
  for (const role of COLOR_ROLES) {
    const dynamicColor = dynamicColors[role]();
    tokens[`--md-sys-color-${toKebabCase(role)}`] = hexFromArgb(dynamicColor.getArgb(scheme));
  }
  return tokens;
}
```

- [ ] **Step 5: Run the test and confirm it passes**

```bash
npx vitest run scripts/theme-tokens.test.mjs
```

Expected: PASS, 4 tests.

- [ ] **Step 6: Write the CSS-generating script**

Create `scripts/generate-theme-tokens.mjs`:

```js
import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {generateTokens} from './theme-tokens.mjs';

const SEED = '#3DDC84';
const OUTPUT_PATH = fileURLToPath(new URL('../src/styles/md-color-tokens.css', import.meta.url));

function toCssBlock(selector, tokens) {
  const lines = Object.entries(tokens).map(([name, value]) => `  ${name}: ${value};`);
  return `${selector} {\n${lines.join('\n')}\n}\n`;
}

const light = generateTokens(SEED, false);
const dark = generateTokens(SEED, true);

const css =
  '/* Generated by scripts/generate-theme-tokens.mjs — do not edit by hand. */\n' +
  toCssBlock(':root', light) +
  '\n' +
  toCssBlock(':root.dark', dark);

mkdirSync(dirname(OUTPUT_PATH), {recursive: true});
writeFileSync(OUTPUT_PATH, css);
console.log(`Wrote ${Object.keys(light).length} light + ${Object.keys(dark).length} dark tokens to ${OUTPUT_PATH}`);
```

Add a script to `package.json`'s `"scripts"` block:

```json
"generate:theme": "node scripts/generate-theme-tokens.mjs"
```

- [ ] **Step 7: Run the generator and inspect the output**

```bash
pnpm run generate:theme
```

Expected: console output `Wrote 35 light + 35 dark tokens to .../src/styles/md-color-tokens.css`, and the file exists with two rule blocks, `:root { ... }` and `:root.dark { ... }`, each containing `--md-sys-color-primary: #......;` etc.

- [ ] **Step 8: Create the theme provider**

Create `src/components/theme-provider.tsx`:

```tsx
'use client';

import {ThemeProvider as NextThemesProvider} from 'next-themes';
import type {ReactNode} from 'react';

export function ThemeProvider({children}: {children: ReactNode}) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
```

- [ ] **Step 9: Wire the generated tokens and the theme provider into the app**

Replace the contents of `src/app/globals.css` with:

```css
@import "tailwindcss";
@import "../styles/md-color-tokens.css";

:root {
  --md-icon-font: var(--font-material-symbols);
}

body {
  background-color: var(--md-sys-color-background);
  color: var(--md-sys-color-on-surface);
}
```

(The `--md-icon-font` line is inert until Task 3 defines `--font-material-symbols` — that's expected, not an error.)

Replace the contents of `src/app/layout.tsx` with:

```tsx
import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Bharath K Malviya',
  description: 'Android developer portfolio',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

`suppressHydrationWarning` on `<html>` is required by `next-themes`: it sets the `dark` class on the client before React hydrates, which would otherwise log a harmless-but-noisy hydration mismatch warning.

- [ ] **Step 10: Verify the build still passes**

```bash
pnpm run build
```

Expected: succeeds, same as Task 1's Step 5.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: generate M3 Expressive color tokens and wire up theme switching"
```

---

### Task 3: Load Roboto Flex and Material Symbols via next/font/google

**Files:**
- Create: `src/app/fonts.ts`
- Modify: `src/app/layout.tsx`, `src/app/globals.css`

**Interfaces:**
- Consumes: `src/app/layout.tsx` from Task 2 (Step 9's version).
- Produces: `robotoFlex` and `materialSymbolsOutlined` (exported from `src/app/fonts.ts`, each a `next/font` result object with a `.variable` string property). Task 4's verification page relies on the Material Symbols CSS variable being active globally so `<md-icon>` ligature text renders as icons instead of literal words.

- [ ] **Step 1: Define the fonts**

Create `src/app/fonts.ts`:

```ts
import {Material_Symbols_Outlined, Roboto_Flex} from 'next/font/google';

export const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
  display: 'swap',
});

// display: 'block' (not 'swap') so a fallback font never briefly renders the
// icon's ligature name (e.g. literal text "settings") before the icon font loads.
export const materialSymbolsOutlined = Material_Symbols_Outlined({
  subsets: ['latin'],
  variable: '--font-material-symbols',
  display: 'block',
});
```

- [ ] **Step 2: Apply the font variables in the root layout**

Replace the contents of `src/app/layout.tsx` with:

```tsx
import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';
import {materialSymbolsOutlined, robotoFlex} from './fonts';

export const metadata: Metadata = {
  title: 'Bharath K Malviya',
  description: 'Android developer portfolio',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${robotoFlex.variable} ${materialSymbolsOutlined.variable}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Apply Roboto Flex as the base body typeface**

In `src/app/globals.css`, update the `body` rule to add the font family:

```css
body {
  background-color: var(--md-sys-color-background);
  color: var(--md-sys-color-on-surface);
  font-family: var(--font-roboto-flex), system-ui, sans-serif;
}
```

- [ ] **Step 4: Verify the build still passes**

```bash
pnpm run build
```

Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: load Roboto Flex and Material Symbols via next/font/google"
```

---

### Task 4: Install Material Web and verify the full theme pipeline

**Files:**
- Create: `src/types/material-web.d.ts`, `src/components/material-web-demo.tsx`
- Modify: `src/app/page.tsx`, `package.json` (add `@material/web`)

**Interfaces:**
- Consumes: `--md-sys-color-*` tokens (Task 2), `--font-roboto-flex` / `--font-material-symbols` (Task 3), `ThemeProvider` (Task 2).
- Produces: nothing further tasks depend on — this task's deliverable is the end-to-end proof that the design system works, ahead of building real portfolio content in future plans.

- [ ] **Step 1: Install Material Web**

```bash
pnpm add @material/web
```

- [ ] **Step 2: Declare the custom elements for TypeScript**

Create `src/types/material-web.d.ts`:

```ts
import type {DetailedHTMLProps, HTMLAttributes} from 'react';

type MdElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  label?: string;
  value?: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'md-filled-button': MdElementProps;
      'md-outlined-button': MdElementProps;
      'md-outlined-text-field': MdElementProps;
      'md-icon': MdElementProps;
    }
  }
}

export {};
```

- [ ] **Step 3: Create the verification component**

Create `src/components/material-web-demo.tsx`:

```tsx
'use client';

import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/icon/icon.js';
import '@material/web/textfield/outlined-text-field.js';

export function MaterialWebDemo() {
  return (
    <div className="flex flex-col items-start gap-4 p-8">
      <md-outlined-text-field label="Your name" />
      <div className="flex gap-4">
        <md-outlined-button>
          <md-icon slot="icon">arrow_back</md-icon>
          Back
        </md-outlined-button>
        <md-filled-button>
          Next
          <md-icon slot="icon">arrow_forward</md-icon>
        </md-filled-button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Render it from the home page**

Replace the contents of `src/app/page.tsx` with:

```tsx
import {MaterialWebDemo} from '@/components/material-web-demo';

export default function Home() {
  return (
    <main>
      <MaterialWebDemo />
    </main>
  );
}
```

- [ ] **Step 5: Build and export**

```bash
pnpm run build
```

Expected: succeeds and writes `out/index.html`.

- [ ] **Step 6: Confirm the static HTML contains the custom element tags**

```bash
grep -o "<md-filled-button[^>]*>" out/index.html
```

Expected: at least one match — confirms Next's static export serialized the custom element tags themselves (the shallow-render case described in the design spec's Technical Risk section; their internal shadow-DOM content is what only appears after client hydration).

- [ ] **Step 7: Run it in the browser and verify visually**

```bash
pnpm run dev
```

Open `http://localhost:3000` and confirm:
- A text field, an outlined button with a back arrow icon, and a filled button with a forward arrow icon are visible and styled (rounded shape, correct colors) — not unstyled/plain HTML.
- The icons render as actual arrow glyphs, not the literal words "arrow_back" / "arrow_forward".
- Toggling the OS/browser dark mode preference (or, if no toggle UI exists yet, running `document.documentElement.classList.add('dark')` in the browser devtools console) swaps the button/field colors to the dark M3 tokens generated in Task 2.
- The filled button's background is a shade of green traceable back to the `#3DDC84` seed, not a generic Material purple.

If any of these don't hold, stop and debug before moving on — this task is the proof that every earlier task actually works together, and nothing past this point in future plans should be built on an unverified foundation.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: install Material Web and verify the M3 Expressive theme pipeline"
```
