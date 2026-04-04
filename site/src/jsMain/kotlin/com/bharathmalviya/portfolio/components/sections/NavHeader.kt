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
