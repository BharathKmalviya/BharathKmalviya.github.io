# Portfolio UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio into a modern Android dev-themed one-pager with deep navy/Android green palette, typewriter hero, frosted glass cards, and icon-only contact buttons.

**Architecture:** Full overhaul of color tokens (`SiteTheme.kt`), global styles/keyframes (`AppStyles.kt`), and all UI composables. New `SocialIcons.kt` provides reusable SVG icon composables. Typewriter effect uses Kotlin coroutines + `LaunchedEffect`. All other animations are CSS-only via Kobweb `Keyframes`.

**Tech Stack:** Kobweb (Kotlin/JS), Jetpack Compose for Web, Silk design system, Kotlin coroutines (`kotlinx.coroutines`)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `SiteTheme.kt` | Modify | Color tokens: dark navy, Android green, cyan, textMuted, accent |
| `AppStyles.kt` | Modify | `BlinkCursorAnim`, `FadeInUpAnim` keyframes; reduced-motion override |
| `components/widgets/SocialIcons.kt` | **Create** | Inline SVG composables: LinkedIn, GitHub, TwitterX, Email |
| `components/layouts/PageLayout.kt` | Modify | Max-width `72rem`, remove outer padding |
| `components/sections/NavHeader.kt` | Modify | Sticky frosted glass bar, `<K/>` branding |
| `pages/Index.kt` | Modify | Full rewrite: HeroSection, AboutSection, ContactSection |
| `components/sections/Footer.kt` | Modify | Green top border, muted text, Kobweb link |

---

### Task 1: Update SiteTheme.kt with new color tokens

**Files:**
- Modify: `site/src/jsMain/kotlin/com/bharathmalviya/portfolio/SiteTheme.kt`

- [ ] **Step 1: Replace SiteTheme.kt**

`SitePalette` gains `accent` (cyan) and `textMuted` fields. Colors shift to Android green + deep navy.

```kotlin
package com.bharathmalviya.portfolio

import com.varabyte.kobweb.compose.ui.graphics.Color
import com.varabyte.kobweb.compose.ui.graphics.Colors
import com.varabyte.kobweb.silk.init.InitSilk
import com.varabyte.kobweb.silk.init.InitSilkContext
import com.varabyte.kobweb.silk.theme.colors.ColorMode
import com.varabyte.kobweb.silk.theme.colors.palette.background
import com.varabyte.kobweb.silk.theme.colors.palette.color
import com.varabyte.kobweb.silk.theme.colors.palette.link

class SitePalette(
    val nearBackground: Color,
    val cobweb: Color,
    val brand: Brand,
    val accent: Color,
    val textMuted: Color,
) {
    class Brand(
        val primary: Color,
        val accent: Color,
    )
}

object SitePalettes {
    val light = SitePalette(
        nearBackground = Color.rgb(0xE8F5E9),
        cobweb = Colors.LightGray,
        brand = SitePalette.Brand(
            primary = Color.rgb(0x1B873A),
            accent = Color.rgb(0xFCBA03),
        ),
        accent = Color.rgb(0x00BCD4),
        textMuted = Color.rgb(0x64748B),
    )
    val dark = SitePalette(
        nearBackground = Color.rgb(0x111827),
        cobweb = Colors.LightGray.inverted(),
        brand = SitePalette.Brand(
            primary = Color.rgb(0x3DDC84),
            accent = Color.rgb(0x00E5FF),
        ),
        accent = Color.rgb(0x00E5FF),
        textMuted = Color.rgb(0x94A3B8),
    )
}

fun ColorMode.toSitePalette(): SitePalette {
    return when (this) {
        ColorMode.LIGHT -> SitePalettes.light
        ColorMode.DARK -> SitePalettes.dark
    }
}

@InitSilk
fun initTheme(ctx: InitSilkContext) {
    ctx.theme.palettes.light.background = Color.rgb(0xF0FFF4)
    ctx.theme.palettes.light.color = Color.rgb(0x0D1B2A)
    ctx.theme.palettes.dark.background = Color.rgb(0x0A0F1E)
    ctx.theme.palettes.dark.color = Color.rgb(0xE2E8F0)
    ctx.theme.palettes.light.link.default = Color.rgb(0x1B873A)
    ctx.theme.palettes.dark.link.default = Color.rgb(0x3DDC84)
}
```

- [ ] **Step 2: Commit**

```bash
cd "F:/Projects/Web/Portfolio"
git add site/src/jsMain/kotlin/com/bharathmalviya/portfolio/SiteTheme.kt
git commit -m "feat: update color tokens to Android dev theme"
```

---

### Task 2: Add animation keyframes to AppStyles.kt

**Files:**
- Modify: `site/src/jsMain/kotlin/com/bharathmalviya/portfolio/AppStyles.kt`

- [ ] **Step 1: Replace AppStyles.kt**

Adds `BlinkCursorAnim` (CSS step blink), `FadeInUpAnim` (slide-up fade), and a `prefers-reduced-motion` override that disables all animations for users who prefer it.

```kotlin
package com.bharathmalviya.portfolio

import com.varabyte.kobweb.compose.css.ScrollBehavior
import com.varabyte.kobweb.compose.css.TextAlign
import com.varabyte.kobweb.compose.ui.Modifier
import com.varabyte.kobweb.compose.ui.graphics.Colors
import com.varabyte.kobweb.compose.ui.modifiers.*
import com.varabyte.kobweb.compose.ui.styleModifier
import com.varabyte.kobweb.silk.components.forms.ButtonStyle
import com.varabyte.kobweb.silk.components.forms.ButtonVars
import com.varabyte.kobweb.silk.components.layout.HorizontalDividerStyle
import com.varabyte.kobweb.silk.init.InitSilk
import com.varabyte.kobweb.silk.init.InitSilkContext
import com.varabyte.kobweb.silk.style.CssStyle
import com.varabyte.kobweb.silk.style.addVariantBase
import com.varabyte.kobweb.silk.style.animation.Keyframes
import com.varabyte.kobweb.silk.style.base
import com.varabyte.kobweb.silk.theme.colors.palette.color
import com.varabyte.kobweb.silk.theme.colors.palette.toPalette
import com.varabyte.kobweb.silk.theme.modifyStyleBase
import org.jetbrains.compose.web.css.*

val BlinkCursorAnim = Keyframes {
    from { Modifier.opacity(1) }
    to { Modifier.opacity(0) }
}

val FadeInUpAnim = Keyframes {
    from {
        Modifier
            .opacity(0)
            .translateY(20.px)
    }
    to {
        Modifier
            .opacity(1)
            .translateY(0.px)
    }
}

@InitSilk
fun initSiteStyles(ctx: InitSilkContext) {
    ctx.stylesheet.registerStyle("html") {
        cssRule(CSSMediaQuery.MediaFeature("prefers-reduced-motion", StylePropertyValue("no-preference"))) {
            Modifier.scrollBehavior(ScrollBehavior.Smooth)
        }
    }

    ctx.stylesheet.registerStyleBase("body") {
        Modifier
            .fontFamily(
                "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
                "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"
            )
            .fontSize(18.px)
            .lineHeight(1.5)
    }

    // Disable animations for users who prefer reduced motion
    ctx.stylesheet.registerStyle("*") {
        cssRule(CSSMediaQuery.MediaFeature("prefers-reduced-motion", StylePropertyValue("reduce"))) {
            Modifier.styleModifier {
                property("animation", "none !important")
                property("transition", "none !important")
            }
        }
    }

    ctx.theme.modifyStyleBase(HorizontalDividerStyle) {
        Modifier.fillMaxWidth()
    }
}

val HeadlineTextStyle = CssStyle.base {
    Modifier
        .fontSize(4.cssRem)
        .textAlign(TextAlign.Center)
        .lineHeight(1.2)
}

val SubheadlineTextStyle = CssStyle.base {
    Modifier
        .fontSize(1.cssRem)
        .textAlign(TextAlign.Center)
        .color(colorMode.toPalette().color.toRgb().copyf(alpha = 0.8f))
}

val CircleButtonVariant = ButtonStyle.addVariantBase {
    Modifier.padding(0.px).borderRadius(50.percent)
}

val UncoloredButtonVariant = ButtonStyle.addVariantBase {
    Modifier.setVariable(ButtonVars.BackgroundDefaultColor, Colors.Transparent)
}
```

- [ ] **Step 2: Commit**

```bash
git add site/src/jsMain/kotlin/com/bharathmalviya/portfolio/AppStyles.kt
git commit -m "feat: add blink cursor and fade-in-up keyframe animations"
```

---

### Task 3: Create SocialIcons.kt with inline SVG composables

**Files:**
- Create: `site/src/jsMain/kotlin/com/bharathmalviya/portfolio/components/widgets/SocialIcons.kt`

- [ ] **Step 1: Create the file**

```kotlin
package com.bharathmalviya.portfolio.components.widgets

import androidx.compose.runtime.Composable
import com.varabyte.kobweb.compose.ui.Modifier
import com.varabyte.kobweb.compose.ui.toAttrs
import org.jetbrains.compose.web.svg.Path
import org.jetbrains.compose.web.svg.Svg

@Composable
fun LinkedInIcon(modifier: Modifier = Modifier) {
    Svg(attrs = modifier.toAttrs {
        attr("viewBox", "0 0 24 24")
        attr("fill", "currentColor")
        attr("width", "22")
        attr("height", "22")
    }) {
        Path(attrs = {
            attr(
                "d",
                "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 " +
                "1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 " +
                "3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 " +
                "1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" +
                "M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 " +
                "24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            )
        })
    }
}

@Composable
fun GitHubIcon(modifier: Modifier = Modifier) {
    Svg(attrs = modifier.toAttrs {
        attr("viewBox", "0 0 24 24")
        attr("fill", "currentColor")
        attr("width", "22")
        attr("height", "22")
    }) {
        Path(attrs = {
            attr(
                "d",
                "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261" +
                ".793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333" +
                "-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 " +
                "2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467" +
                "-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 " +
                "1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 " +
                "2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 " +
                "1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 " +
                "2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
            )
        })
    }
}

@Composable
fun TwitterXIcon(modifier: Modifier = Modifier) {
    Svg(attrs = modifier.toAttrs {
        attr("viewBox", "0 0 24 24")
        attr("fill", "currentColor")
        attr("width", "22")
        attr("height", "22")
    }) {
        Path(attrs = {
            attr(
                "d",
                "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 " +
                "6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.624 5.905-5.624zm-1.161 " +
                "17.52h1.833L7.084 4.126H5.117z"
            )
        })
    }
}

@Composable
fun EmailIcon(modifier: Modifier = Modifier) {
    Svg(attrs = modifier.toAttrs {
        attr("viewBox", "0 0 24 24")
        attr("fill", "none")
        attr("stroke", "currentColor")
        attr("stroke-width", "2")
        attr("stroke-linecap", "round")
        attr("stroke-linejoin", "round")
        attr("width", "22")
        attr("height", "22")
    }) {
        Path(attrs = {
            attr("d", "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z")
        })
        Path(attrs = {
            attr("d", "m22 6-10 7L2 6")
        })
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add site/src/jsMain/kotlin/com/bharathmalviya/portfolio/components/widgets/SocialIcons.kt
git commit -m "feat: add SVG social icon composables"
```

---

### Task 4: Update PageLayout.kt — expand max-width and remove outer padding

**Files:**
- Modify: `site/src/jsMain/kotlin/com/bharathmalviya/portfolio/components/layouts/PageLayout.kt`

- [ ] **Step 1: Replace PageLayout.kt**

Removes the outer `padding` from the `Box` (hero section will own its own padding) and bumps max-width from `60rem` to `72rem`.

```kotlin
package com.bharathmalviya.portfolio.components.layouts

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import com.varabyte.kobweb.compose.foundation.layout.Box
import com.varabyte.kobweb.compose.foundation.layout.Column
import com.varabyte.kobweb.compose.foundation.layout.ColumnScope
import com.varabyte.kobweb.compose.ui.Alignment
import com.varabyte.kobweb.compose.ui.Modifier
import com.varabyte.kobweb.compose.ui.modifiers.*
import com.varabyte.kobweb.core.PageContext
import com.varabyte.kobweb.core.data.getValue
import com.varabyte.kobweb.core.layout.Layout
import kotlinx.browser.document
import org.jetbrains.compose.web.css.cssRem
import org.jetbrains.compose.web.css.vh

class PageLayoutData(val title: String)

@Composable
@Layout
fun PageLayout(ctx: PageContext, content: @Composable ColumnScope.() -> Unit) {
    val data = ctx.data.getValue<PageLayoutData>()
    LaunchedEffect(data.title) {
        document.title = data.title
    }

    Box(
        Modifier
            .fillMaxWidth()
            .minHeight(100.vh),
        contentAlignment = Alignment.Center
    ) {
        Column(
            Modifier
                .fillMaxWidth()
                .maxWidth(72.cssRem),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            content()
        }
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add site/src/jsMain/kotlin/com/bharathmalviya/portfolio/components/layouts/PageLayout.kt
git commit -m "feat: expand page layout max-width to 72rem and remove outer padding"
```

---

### Task 5: Update NavHeader.kt — frosted glass sticky bar with `<K/>` branding

**Files:**
- Modify: `site/src/jsMain/kotlin/com/bharathmalviya/portfolio/components/sections/NavHeader.kt`

- [ ] **Step 1: Replace NavHeader.kt**

Key changes: `NavHeaderStyle` gets `position: sticky`, `backdrop-filter: blur(16px)`, transparent background, green bottom border. Brand link changes from `"Bharath K Malviya"` to `Bharath` + `<K/>` in Android green monospace.

```kotlin
package com.bharathmalviya.portfolio.components.sections

import androidx.compose.runtime.*
import com.varabyte.kobweb.browser.dom.ElementTarget
import com.varabyte.kobweb.compose.css.FontWeight
import com.varabyte.kobweb.compose.css.functions.clamp
import com.varabyte.kobweb.compose.foundation.layout.Column
import com.varabyte.kobweb.compose.foundation.layout.Row
import com.varabyte.kobweb.compose.foundation.layout.Spacer
import com.varabyte.kobweb.compose.ui.Alignment
import com.varabyte.kobweb.compose.ui.Modifier
import com.varabyte.kobweb.compose.ui.graphics.Color
import com.varabyte.kobweb.compose.ui.graphics.Colors
import com.varabyte.kobweb.compose.ui.modifiers.*
import com.varabyte.kobweb.compose.ui.styleModifier
import com.varabyte.kobweb.silk.components.icons.CloseIcon
import com.varabyte.kobweb.silk.components.icons.HamburgerIcon
import com.varabyte.kobweb.silk.components.icons.MoonIcon
import com.varabyte.kobweb.silk.components.icons.SunIcon
import com.varabyte.kobweb.silk.components.navigation.Link
import com.varabyte.kobweb.silk.components.navigation.UncoloredLinkVariant
import com.varabyte.kobweb.silk.components.navigation.UndecoratedLinkVariant
import com.varabyte.kobweb.silk.components.overlay.Overlay
import com.varabyte.kobweb.silk.components.overlay.OverlayVars
import com.varabyte.kobweb.silk.components.overlay.PopupPlacement
import com.varabyte.kobweb.silk.components.overlay.Tooltip
import com.varabyte.kobweb.silk.components.text.SpanText
import com.varabyte.kobweb.silk.style.CssStyle
import com.varabyte.kobweb.silk.style.animation.Keyframes
import com.varabyte.kobweb.silk.style.animation.toAnimation
import com.varabyte.kobweb.silk.style.base
import com.varabyte.kobweb.silk.style.breakpoint.Breakpoint
import com.varabyte.kobweb.silk.style.breakpoint.displayIfAtLeast
import com.varabyte.kobweb.silk.style.breakpoint.displayUntil
import com.varabyte.kobweb.silk.style.toModifier
import com.varabyte.kobweb.silk.theme.colors.ColorMode
import com.bharathmalviya.portfolio.components.widgets.IconButton
import com.bharathmalviya.portfolio.toSitePalette
import org.jetbrains.compose.web.css.*

val NavHeaderStyle = CssStyle.base {
    Modifier
        .fillMaxWidth()
        .padding(topBottom = 0.875.cssRem, leftRight = 1.5.cssRem)
        .position(Position.Sticky)
        .top(0.px)
        .zIndex(100)
        .borderBottom(
            1.px,
            LineStyle.Solid,
            if (colorMode.isLight) {
                Color.rgb(0x1B873A).copyf(alpha = 0.2f)
            } else {
                Color.rgb(0x3DDC84).copyf(alpha = 0.2f)
            }
        )
        .styleModifier {
            property("backdrop-filter", "blur(16px)")
            property("-webkit-backdrop-filter", "blur(16px)")
            property(
                "background-color",
                if (colorMode.isLight) "rgba(240,255,244,0.85)" else "rgba(10,15,30,0.85)"
            )
        }
}

@Composable
private fun NavLink(path: String, text: String) {
    val sitePalette = ColorMode.current.toSitePalette()
    Link(
        path,
        text,
        Modifier
            .color(sitePalette.textMuted)
            .styleModifier { property("transition", "color 0.2s ease") },
        variant = UndecoratedLinkVariant.then(UncoloredLinkVariant)
    )
}

@Composable
private fun MenuItems() {
    NavLink("/", "Home")
    NavLink("/about", "About")
}

@Composable
private fun ColorModeButton() {
    var colorMode by ColorMode.currentState
    IconButton(onClick = { colorMode = colorMode.opposite }) {
        if (colorMode.isLight) MoonIcon() else SunIcon()
    }
    Tooltip(ElementTarget.PreviousSibling, "Toggle color mode", placement = PopupPlacement.BottomRight)
}

@Composable
private fun HamburgerButton(onClick: () -> Unit) {
    IconButton(onClick) { HamburgerIcon() }
}

@Composable
private fun CloseButton(onClick: () -> Unit) {
    IconButton(onClick) { CloseIcon() }
}

val SideMenuSlideInAnim = Keyframes {
    from { Modifier.translateX(100.percent) }
    to { Modifier }
}

enum class SideMenuState {
    CLOSED, OPEN, CLOSING;
    fun close() = when (this) {
        CLOSED -> CLOSED
        OPEN -> CLOSING
        CLOSING -> CLOSING
    }
}

@Composable
fun NavHeader() {
    val sitePalette = ColorMode.current.toSitePalette()

    Row(NavHeaderStyle.toModifier(), verticalAlignment = Alignment.CenterVertically) {
        // Brand: "Bharath <K/>"
        Link(
            "/",
            modifier = Modifier,
            variant = UndecoratedLinkVariant.then(UncoloredLinkVariant)
        ) {
            Row(Modifier.gap(0.3.cssRem), verticalAlignment = Alignment.CenterVertically) {
                SpanText(
                    "Bharath",
                    Modifier.fontSize(1.25.cssRem).fontWeight(FontWeight.Bold)
                )
                SpanText(
                    "<K/>",
                    Modifier
                        .fontSize(0.875.cssRem)
                        .color(sitePalette.brand.primary)
                        .styleModifier {
                            property("font-family", "'Courier New', Courier, monospace")
                        }
                )
            }
        }

        Spacer()

        Row(
            Modifier.gap(1.5.cssRem).displayIfAtLeast(Breakpoint.MD),
            verticalAlignment = Alignment.CenterVertically
        ) {
            MenuItems()
            ColorModeButton()
        }

        Row(
            Modifier.fontSize(1.5.cssRem).gap(1.cssRem).displayUntil(Breakpoint.MD),
            verticalAlignment = Alignment.CenterVertically
        ) {
            var menuState by remember { mutableStateOf(SideMenuState.CLOSED) }
            ColorModeButton()
            HamburgerButton(onClick = { menuState = SideMenuState.OPEN })
            if (menuState != SideMenuState.CLOSED) {
                SideMenu(
                    menuState,
                    close = { menuState = menuState.close() },
                    onAnimationEnd = {
                        if (menuState == SideMenuState.CLOSING) menuState = SideMenuState.CLOSED
                    }
                )
            }
        }
    }
}

@Composable
private fun SideMenu(menuState: SideMenuState, close: () -> Unit, onAnimationEnd: () -> Unit) {
    Overlay(
        Modifier
            .setVariable(OverlayVars.BackgroundColor, Colors.Transparent)
            .onClick { close() }
    ) {
        key(menuState) {
            Column(
                Modifier
                    .fillMaxHeight()
                    .width(clamp(8.cssRem, 33.percent, 10.cssRem))
                    .align(Alignment.CenterEnd)
                    .padding(top = 1.cssRem, leftRight = 1.cssRem)
                    .gap(1.5.cssRem)
                    .backgroundColor(ColorMode.current.toSitePalette().nearBackground)
                    .animation(
                        SideMenuSlideInAnim.toAnimation(
                            duration = 200.ms,
                            timingFunction = if (menuState == SideMenuState.OPEN)
                                AnimationTimingFunction.EaseOut else AnimationTimingFunction.EaseIn,
                            direction = if (menuState == SideMenuState.OPEN)
                                AnimationDirection.Normal else AnimationDirection.Reverse,
                            fillMode = AnimationFillMode.Forwards
                        )
                    )
                    .borderRadius(topLeft = 2.cssRem)
                    .onClick { it.stopPropagation() }
                    .onAnimationEnd { onAnimationEnd() },
                horizontalAlignment = Alignment.End
            ) {
                CloseButton(onClick = { close() })
                Column(
                    Modifier.padding(right = 0.75.cssRem).gap(1.5.cssRem).fontSize(1.4.cssRem),
                    horizontalAlignment = Alignment.End
                ) {
                    MenuItems()
                }
            }
        }
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add site/src/jsMain/kotlin/com/bharathmalviya/portfolio/components/sections/NavHeader.kt
git commit -m "feat: frosted glass sticky navbar with Android green branding"
```

---

### Task 6: Rewrite Index.kt — Hero, About, Contact

**Files:**
- Modify: `site/src/jsMain/kotlin/com/bharathmalviya/portfolio/pages/Index.kt`

- [ ] **Step 1: Replace Index.kt with the full redesigned page**

The page is split into three private composable functions: `HeroSection`, `AboutSection`, `ContactSection`. The typewriter effect uses `LaunchedEffect` + coroutine `delay` to type/delete phrases. Dot-grid background is done with layered CSS `background-image`. Social icon buttons use `<a>` tags wrapping the SVG composables.

```kotlin
package com.bharathmalviya.portfolio.pages

import androidx.compose.runtime.*
import com.varabyte.kobweb.compose.css.TextAlign
import com.varabyte.kobweb.compose.foundation.layout.*
import com.varabyte.kobweb.compose.ui.Alignment
import com.varabyte.kobweb.compose.ui.Modifier
import com.varabyte.kobweb.compose.ui.graphics.Color
import com.varabyte.kobweb.compose.ui.graphics.Colors
import com.varabyte.kobweb.compose.ui.modifiers.*
import com.varabyte.kobweb.compose.ui.styleModifier
import com.varabyte.kobweb.compose.ui.toAttrs
import com.varabyte.kobweb.core.Page
import com.varabyte.kobweb.core.data.add
import com.varabyte.kobweb.core.init.InitRoute
import com.varabyte.kobweb.core.init.InitRouteContext
import com.varabyte.kobweb.core.layout.Layout
import com.varabyte.kobweb.silk.components.navigation.Link
import com.varabyte.kobweb.silk.components.navigation.UncoloredLinkVariant
import com.varabyte.kobweb.silk.components.text.SpanText
import com.varabyte.kobweb.silk.style.animation.toAnimation
import com.varabyte.kobweb.silk.theme.colors.ColorMode
import com.bharathmalviya.portfolio.BlinkCursorAnim
import com.bharathmalviya.portfolio.FadeInUpAnim
import com.bharathmalviya.portfolio.SitePalette
import com.bharathmalviya.portfolio.components.layouts.PageLayoutData
import com.bharathmalviya.portfolio.components.widgets.EmailIcon
import com.bharathmalviya.portfolio.components.widgets.GitHubIcon
import com.bharathmalviya.portfolio.components.widgets.LinkedInIcon
import com.bharathmalviya.portfolio.components.widgets.TwitterXIcon
import com.bharathmalviya.portfolio.toSitePalette
import kotlinx.coroutines.delay
import org.jetbrains.compose.web.css.*
import org.jetbrains.compose.web.dom.*

private val typewriterPhrases = listOf(
    "6 Years of Android Experience",
    "Kotlin • Jetpack Compose • MVVM",
    "Building apps people love"
)

@InitRoute
fun initHomePage(ctx: InitRouteContext) {
    ctx.data.add(PageLayoutData("Bharath K Malviya - Portfolio"))
}

@Page
@Layout(".components.layouts.PageLayout")
@Composable
fun Index() {
    val colorMode = ColorMode.current
    val sitePalette = colorMode.toSitePalette()

    Column(Modifier.fillMaxWidth().gap(5.cssRem)) {
        HeroSection(colorMode, sitePalette)
        AboutSection(colorMode, sitePalette)
        ContactSection(colorMode, sitePalette)
    }
}

@Composable
private fun HeroSection(colorMode: ColorMode, sitePalette: SitePalette) {
    var displayText by remember { mutableStateOf("") }
    var phraseIndex by remember { mutableStateOf(0) }

    LaunchedEffect(Unit) {
        delay(400)
        while (true) {
            val phrase = typewriterPhrases[phraseIndex]
            for (i in 1..phrase.length) {
                displayText = phrase.substring(0, i)
                delay(60)
            }
            delay(1800)
            for (i in phrase.length downTo 0) {
                displayText = phrase.substring(0, i)
                delay(30)
            }
            delay(300)
            phraseIndex = (phraseIndex + 1) % typewriterPhrases.size
        }
    }

    Box(
        Modifier
            .fillMaxWidth()
            .minHeight(100.vh)
            .styleModifier {
                if (colorMode.isLight) {
                    property(
                        "background-image",
                        "radial-gradient(ellipse at 50% 50%, rgba(27,135,58,0.06) 0%, transparent 60%), " +
                        "radial-gradient(rgba(27,135,58,0.04) 1px, transparent 1px), " +
                        "linear-gradient(135deg, #E8F5E9, #F0FFF4)"
                    )
                } else {
                    property(
                        "background-image",
                        "radial-gradient(ellipse at 50% 50%, rgba(61,220,132,0.08) 0%, transparent 60%), " +
                        "radial-gradient(rgba(61,220,132,0.05) 1px, transparent 1px), " +
                        "linear-gradient(135deg, #0A0F1E, #0D2137)"
                    )
                }
                property("background-size", "100% 100%, 30px 30px, 100% 100%")
            },
        contentAlignment = Alignment.Center
    ) {
        Column(
            Modifier
                .padding(2.cssRem)
                .animation(
                    FadeInUpAnim.toAnimation(
                        duration = 600.ms,
                        timingFunction = AnimationTimingFunction.EaseOut,
                        fillMode = AnimationFillMode.Forwards
                    )
                ),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Eyebrow badge
            Div(
                Modifier
                    .margin(bottom = 1.5.cssRem)
                    .padding(leftRight = 1.cssRem, topBottom = 0.4.cssRem)
                    .borderRadius(2.cssRem)
                    .border(1.px, LineStyle.Solid, sitePalette.brand.primary.copyf(alpha = 0.6f))
                    .color(sitePalette.brand.primary)
                    .fontSize(0.875.cssRem)
                    .styleModifier {
                        property("font-family", "'Courier New', Courier, monospace")
                        property(
                            "box-shadow",
                            if (colorMode.isLight) "0 0 12px rgba(27,135,58,0.15)"
                            else "0 0 16px rgba(61,220,132,0.2)"
                        )
                        property("display", "inline-block")
                    }
                    .toAttrs()
            ) {
                SpanText("< Android Engineer />")
            }

            // Name heading — "Malviya" gets gradient
            H1(
                Modifier
                    .margin(top = 0.px, bottom = 1.cssRem)
                    .fontSize(4.cssRem)
                    .fontWeight(800)
                    .lineHeight(1.2)
                    .textAlign(TextAlign.Center)
                    .toAttrs()
            ) {
                SpanText("Bharath K ")
                Span(
                    Modifier
                        .styleModifier {
                            val grad = if (colorMode.isLight) "#1B873A, #00BCD4" else "#3DDC84, #00E5FF"
                            property("background", "linear-gradient(135deg, $grad)")
                            property("-webkit-background-clip", "text")
                            property("-webkit-text-fill-color", "transparent")
                            property("background-clip", "text")
                        }
                        .toAttrs()
                ) {
                    SpanText("Malviya")
                }
            }

            // Typewriter line with blinking cursor
            Row(
                Modifier.margin(bottom = 1.5.cssRem).minHeight(2.cssRem),
                verticalAlignment = Alignment.CenterVertically
            ) {
                SpanText(
                    displayText,
                    Modifier
                        .color(sitePalette.accent)
                        .fontSize(1.125.cssRem)
                        .styleModifier { property("font-family", "'Courier New', Courier, monospace") }
                )
                SpanText(
                    "|",
                    Modifier
                        .color(sitePalette.accent)
                        .fontSize(1.125.cssRem)
                        .animation(
                            BlinkCursorAnim.toAnimation(
                                duration = 1.s,
                                iterationCount = AnimationIterationCount.infinite,
                                timingFunction = AnimationTimingFunction.StepEnd
                            )
                        )
                )
            }

            // Location chip
            Div(
                Modifier
                    .margin(bottom = 2.cssRem)
                    .padding(leftRight = 0.75.cssRem, topBottom = 0.35.cssRem)
                    .borderRadius(2.cssRem)
                    .backgroundColor(sitePalette.brand.primary.copyf(alpha = 0.12f))
                    .color(sitePalette.brand.primary)
                    .fontSize(0.875.cssRem)
                    .styleModifier { property("display", "inline-block") }
                    .toAttrs()
            ) {
                SpanText("📍 Rajasthan, India")
            }

            // CTA buttons
            Row(Modifier.gap(1.cssRem)) {
                Link(
                    "#about",
                    "View My Work",
                    Modifier
                        .padding(leftRight = 1.75.cssRem, topBottom = 0.875.cssRem)
                        .borderRadius(0.5.cssRem)
                        .backgroundColor(sitePalette.brand.primary)
                        .color(if (colorMode.isLight) Colors.White else Color.rgb(0x0A0F1E))
                        .fontWeight(600)
                        .fontSize(1.cssRem)
                        .styleModifier { property("transition", "opacity 0.2s ease") },
                    variant = UncoloredLinkVariant
                )
                Link(
                    "mailto:Bharathkmalviya@gmail.com",
                    "Get In Touch",
                    Modifier
                        .padding(leftRight = 1.75.cssRem, topBottom = 0.875.cssRem)
                        .borderRadius(0.5.cssRem)
                        .border(2.px, LineStyle.Solid, sitePalette.accent)
                        .color(sitePalette.accent)
                        .fontWeight(600)
                        .fontSize(1.cssRem)
                        .styleModifier { property("transition", "opacity 0.2s ease") },
                    variant = UncoloredLinkVariant
                )
            }
        }
    }
}

@Composable
private fun AboutSection(colorMode: ColorMode, sitePalette: SitePalette) {
    Column(
        Modifier
            .fillMaxWidth()
            .padding(leftRight = 2.cssRem)
    ) {
        SpanText(
            "// about_me",
            Modifier
                .color(sitePalette.accent)
                .fontSize(0.875.cssRem)
                .margin(bottom = 0.5.cssRem)
                .styleModifier { property("font-family", "'Courier New', Courier, monospace") }
        )
        H2(
            Modifier
                .fontSize(2.cssRem)
                .fontWeight(700)
                .margin(top = 0.px, bottom = 1.5.cssRem)
                .toAttrs()
        ) {
            SpanText("About Me")
        }
        // Frosted glass card
        Div(
            Modifier
                .fillMaxWidth()
                .padding(2.cssRem)
                .borderRadius(1.cssRem)
                .border(1.px, LineStyle.Solid, sitePalette.brand.primary.copyf(alpha = 0.2f))
                .styleModifier {
                    property("backdrop-filter", "blur(12px)")
                    property("-webkit-backdrop-filter", "blur(12px)")
                    property(
                        "background-color",
                        if (colorMode.isLight) "rgba(255,255,255,0.7)" else "rgba(13,27,42,0.6)"
                    )
                }
                .toAttrs()
        ) {
            P(Modifier.lineHeight(1.8).margin(0.px).toAttrs()) {
                SpanText(
                    "Results-driven Android Engineer with 6 years of experience in designing, " +
                    "developing, and optimizing mobile applications. Proficient in Java, Kotlin, " +
                    "and Android SDK, with expertise in MVVM architecture, Dependency Injection " +
                    "(Dagger Hilt), Jetpack Components, and Firebase."
                )
            }
        }
    }
}

@Composable
private fun ContactSection(colorMode: ColorMode, sitePalette: SitePalette) {
    Column(
        Modifier
            .fillMaxWidth()
            .padding(leftRight = 2.cssRem, bottom = 3.cssRem),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        SpanText(
            "// connect",
            Modifier
                .color(sitePalette.accent)
                .fontSize(0.875.cssRem)
                .margin(bottom = 0.5.cssRem)
                .styleModifier { property("font-family", "'Courier New', Courier, monospace") }
        )
        H2(
            Modifier
                .fontSize(2.cssRem)
                .fontWeight(700)
                .margin(top = 0.px, bottom = 2.cssRem)
                .toAttrs()
        ) {
            SpanText("Let's Connect")
        }
        Row(Modifier.gap(1.5.cssRem)) {
            SocialIconButton(
                href = "https://linkedin.com/in/bharath-k-malviya",
                label = "LinkedIn",
                colorMode = colorMode,
                sitePalette = sitePalette
            ) { LinkedInIcon() }
            SocialIconButton(
                href = "https://github.com/BharathKmalviya",
                label = "GitHub",
                colorMode = colorMode,
                sitePalette = sitePalette
            ) { GitHubIcon() }
            SocialIconButton(
                href = "https://x.com/BharathKmalviya",
                label = "Twitter/X",
                colorMode = colorMode,
                sitePalette = sitePalette
            ) { TwitterXIcon() }
            SocialIconButton(
                href = "mailto:Bharathkmalviya@gmail.com",
                label = "Email",
                colorMode = colorMode,
                sitePalette = sitePalette
            ) { EmailIcon() }
        }
    }
}

@Composable
private fun SocialIconButton(
    href: String,
    label: String,
    colorMode: ColorMode,
    sitePalette: SitePalette,
    icon: @Composable () -> Unit
) {
    A(
        href = href,
        attrs = Modifier
            .width(56.px)
            .height(56.px)
            .borderRadius(50.percent)
            .border(1.px, LineStyle.Solid, sitePalette.brand.primary.copyf(alpha = 0.4f))
            .color(sitePalette.brand.primary)
            .styleModifier {
                property("display", "flex")
                property("align-items", "center")
                property("justify-content", "center")
                property("backdrop-filter", "blur(8px)")
                property("-webkit-backdrop-filter", "blur(8px)")
                property(
                    "background-color",
                    if (colorMode.isLight) "rgba(255,255,255,0.5)" else "rgba(13,27,42,0.5)"
                )
                property("transition", "all 0.2s ease")
                property("cursor", "pointer")
                property("text-decoration", "none")
            }
            .toAttrs {
                attr("target", "_blank")
                attr("rel", "noopener noreferrer")
                attr("aria-label", label)
                attr("title", label)
            }
    ) {
        icon()
    }
}
```

- [ ] **Step 2: Start dev server and visually verify**

```bash
cd "F:/Projects/Web/Portfolio/site" && kobweb run
```

Open `http://localhost:8080`. Check:
- Hero fills viewport with gradient + subtle dot grid
- `< Android Engineer />` pill badge renders in Android green with glow
- Name: `Bharath K` in normal color, `Malviya` in green→cyan gradient
- Typewriter cycles through 3 phrases with blinking `|` cursor
- `📍 Rajasthan, India` location chip renders
- Two CTA buttons: filled green `View My Work`, outline cyan `Get In Touch`
- `// about_me` label + frosted glass card
- `// connect` label + 4 circular icon buttons
- NavHeader: `Bharath <K/>` branding, sticky, frosted glass

Press `Q` to stop.

- [ ] **Step 3: Commit**

```bash
cd "F:/Projects/Web/Portfolio"
git add site/src/jsMain/kotlin/com/bharathmalviya/portfolio/pages/Index.kt
git commit -m "feat: rewrite index page with hero typewriter, about, and contact sections"
```

---

### Task 7: Update Footer.kt

**Files:**
- Modify: `site/src/jsMain/kotlin/com/bharathmalviya/portfolio/components/sections/Footer.kt`

- [ ] **Step 1: Replace Footer.kt**

Green `1px` top border at 15% opacity, muted copyright text, Kobweb link in brand primary.

```kotlin
package com.bharathmalviya.portfolio.components.sections

import androidx.compose.runtime.Composable
import com.varabyte.kobweb.compose.css.TextAlign
import com.varabyte.kobweb.compose.foundation.layout.Box
import com.varabyte.kobweb.compose.ui.Alignment
import com.varabyte.kobweb.compose.ui.Modifier
import com.varabyte.kobweb.compose.ui.modifiers.*
import com.varabyte.kobweb.compose.ui.toAttrs
import com.varabyte.kobweb.silk.components.navigation.Link
import com.varabyte.kobweb.silk.components.navigation.UncoloredLinkVariant
import com.varabyte.kobweb.silk.components.text.SpanText
import com.varabyte.kobweb.silk.style.CssStyle
import com.varabyte.kobweb.silk.style.base
import com.varabyte.kobweb.silk.style.toModifier
import com.varabyte.kobweb.silk.theme.colors.ColorMode
import com.bharathmalviya.portfolio.toSitePalette
import org.jetbrains.compose.web.css.*
import org.jetbrains.compose.web.dom.Span

val FooterStyle = CssStyle.base {
    Modifier
        .fillMaxWidth()
        .padding(topBottom = 1.5.cssRem, leftRight = 2.cssRem)
        .borderTop(
            1.px,
            LineStyle.Solid,
            colorMode.toSitePalette().brand.primary.copyf(alpha = 0.15f)
        )
}

@Composable
fun Footer(modifier: Modifier = Modifier) {
    val sitePalette = ColorMode.current.toSitePalette()
    Box(FooterStyle.toModifier().then(modifier), contentAlignment = Alignment.Center) {
        Span(Modifier.textAlign(TextAlign.Center).toAttrs()) {
            SpanText(
                "© 2026 Bharath K Malviya · Built with ",
                Modifier.color(sitePalette.textMuted).fontSize(0.875.cssRem)
            )
            Link(
                "https://github.com/varabyte/kobweb",
                "Kobweb",
                Modifier.color(sitePalette.brand.primary).fontSize(0.875.cssRem),
                variant = UncoloredLinkVariant
            )
        }
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add site/src/jsMain/kotlin/com/bharathmalviya/portfolio/components/sections/Footer.kt
git commit -m "feat: restyle footer with green top border and muted text"
```

---

### Task 8: Final verification and production export

- [ ] **Step 1: Run full visual pass in dev**

```bash
cd "F:/Projects/Web/Portfolio/site" && kobweb run
```

At `http://localhost:8080` verify all of:

| Check | Expected |
|---|---|
| Dark mode (default) | Deep navy `#0A0F1E` bg, dot grid visible |
| Light mode (toggle) | Soft mint `#F0FFF4` bg, dark green text |
| `< Android Engineer />` badge | Pill with green border + glow |
| Name gradient | `Malviya` in green→cyan gradient |
| Typewriter | Cycles all 3 phrases, blinking cursor |
| Location chip | Green-tinted pill |
| CTA buttons | Filled green + outline cyan, side by side |
| NavHeader | Sticky on scroll, frosted blur, `Bharath <K/>` |
| About card | Frosted glass border, paragraph readable |
| Contact row | 4 circular icon buttons, icons correct |
| Footer | Thin green top border, muted + Kobweb link |
| Mobile `<768px` | Hamburger menu appears, layout stacks |

- [ ] **Step 2: Export as static site**

Press `Q` to stop dev server, then:

```bash
kobweb export --layout static
```

Expected output: `Export complete` with no compilation errors. Files in `site/.kobweb/site/`.

- [ ] **Step 3: Final commit**

```bash
cd "F:/Projects/Web/Portfolio"
git add -A
git commit -m "feat: complete portfolio UI redesign — Android dev theme, typewriter hero, frosted glass"
```
