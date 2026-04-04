# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

All commands run from the `site/` directory:

```bash
cd site

# Start dev server with live reload (press Q to stop)
kobweb run

# Export as static site for production
kobweb export --layout static

# Test production build locally
kobweb run --env prod --layout static
```

Exported files land in `site/.kobweb/site/` and are deployed to GitHub Pages.

## Architecture

This is a **Kobweb** (Kotlin/JS + Jetpack Compose for Web) static portfolio site. There is no backend — frontend-only.

### Key Patterns

- **`@Page`** annotation on a `@Composable` function auto-generates a route from its file path (e.g., `pages/Index.kt` → `/`)
- **`@Layout`** annotation applies a layout wrapper to a page
- **`@App`** marks the top-level app entry point (`AppEntry.kt`)
- **`@InitSilk`** functions run at startup to configure the Silk design system (theme colors, global styles)
- **`CssStyle`** defines reusable Kotlin-idiomatic CSS; apply with `.toModifier()` or `.toAttrs()`
- **`Modifier`** chains CSS/HTML attributes (same mental model as Compose `Modifier`)

### Theming

- `SiteTheme.kt` — defines `SitePalette` and `SitePalettes` (light/dark color tokens). Access via `ColorMode.current.toSitePalette()`
- `AppEntry.kt` — persists color mode to `localStorage` under key `"portfolio:colorMode"`, initializes from system preference
- Silk's built-in palette keys (`background`, `color`, `link`) are overridden in `initTheme()`

### File Layout

```
site/src/jsMain/kotlin/com/bharathmalviya/portfolio/
├── AppEntry.kt          # @App entry, color mode persistence, global body style
├── AppStyles.kt         # Global CssStyle declarations (HeadlineTextStyle, etc.)
├── SiteTheme.kt         # SitePalette, SitePalettes, initTheme
├── components/
│   ├── layouts/         # PageLayout.kt, MarkdownLayout.kt — page wrappers
│   ├── sections/        # NavHeader.kt, Footer.kt — shared structural sections
│   └── widgets/         # IconButton.kt — reusable small UI pieces
└── pages/
    └── Index.kt         # Home page (all portfolio sections inline)

site/src/jsMain/resources/
├── markdown/            # Markdown pages (About.md → /about)
└── public/              # Static assets served at root
```

### Adding Pages

- Kotlin page: create a `@Page @Composable` function in `pages/`, apply `@Layout(PageLayout::class)`
- Markdown page: drop a `.md` file in `resources/markdown/`, add frontmatter `layout: PageLayout` to use the standard layout

## Prerequisites

- JDK 11+
- Kobweb CLI (`curl -sSL https://kobweb.dev/install.sh | sh`)
