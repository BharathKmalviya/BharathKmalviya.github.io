package com.bharathmalviya.portfolio.pages

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import com.varabyte.kobweb.compose.foundation.layout.Box
import com.varabyte.kobweb.compose.foundation.layout.Column
import com.varabyte.kobweb.compose.foundation.layout.Row
import com.varabyte.kobweb.compose.ui.Alignment
import com.varabyte.kobweb.compose.ui.Modifier
import com.varabyte.kobweb.compose.ui.graphics.Colors
import com.varabyte.kobweb.compose.ui.modifiers.*
import com.varabyte.kobweb.compose.ui.toAttrs
import com.varabyte.kobweb.core.Page
import com.varabyte.kobweb.core.data.add
import com.varabyte.kobweb.core.init.InitRoute
import com.varabyte.kobweb.core.init.InitRouteContext
import com.varabyte.kobweb.core.layout.Layout
import com.varabyte.kobweb.silk.components.forms.Button
import com.varabyte.kobweb.silk.components.icons.MoonIcon
import com.varabyte.kobweb.silk.components.icons.SunIcon
import com.varabyte.kobweb.silk.components.navigation.Link
import com.varabyte.kobweb.silk.components.navigation.UncoloredLinkVariant
import com.varabyte.kobweb.silk.components.text.SpanText
import com.varabyte.kobweb.silk.style.CssStyle
import com.varabyte.kobweb.silk.style.base
import com.varabyte.kobweb.silk.style.toAttrs
import com.varabyte.kobweb.silk.style.toModifier
import com.varabyte.kobweb.silk.theme.colors.ColorMode
import org.jetbrains.compose.web.css.cssRem
import org.jetbrains.compose.web.css.Position
import org.jetbrains.compose.web.dom.Div
import org.jetbrains.compose.web.dom.H1
import org.jetbrains.compose.web.dom.H2
import org.jetbrains.compose.web.dom.H3
import org.jetbrains.compose.web.dom.P
import org.jetbrains.compose.web.dom.Ul
import org.jetbrains.compose.web.dom.Li
import com.bharathmalviya.portfolio.HeadlineTextStyle
import com.bharathmalviya.portfolio.SubheadlineTextStyle
import com.bharathmalviya.portfolio.components.layouts.PageLayoutData
import com.bharathmalviya.portfolio.toSitePalette
import com.varabyte.kobweb.compose.foundation.layout.Arrangement
import com.varabyte.kobweb.compose.ui.graphics.Color
import org.jetbrains.compose.web.css.FlexWrap
import org.jetbrains.compose.web.css.LineStyle
import org.jetbrains.compose.web.css.percent
import org.jetbrains.compose.web.css.px

val SectionCardStyle = CssStyle.base {
    Modifier
        .fillMaxWidth()
        .padding(1.5.cssRem)
        .borderRadius(0.75.cssRem)
        .backgroundColor(
            if (colorMode.isLight) {
                Color.rgb(0xF8F9FA)
            } else {
                Color.rgb(0x1A1D24)
            }
        )
        .boxShadow(
            blurRadius = 0.5.cssRem,
            spreadRadius = 0.px,
            color = if (colorMode.isLight) {
                Colors.Black.copyf(alpha = 0.08f)
            } else {
                Colors.Black.copyf(alpha = 0.4f)
            }
        )
}

val SectionTitleStyle = CssStyle.base {
    Modifier
        .margin(bottom = 1.cssRem)
        .padding(bottom = 0.5.cssRem)
        .borderBottom(
            2.px,
            LineStyle.Solid,
            if (colorMode.isLight) {
                Color.rgb(0x3C83EF)
            } else {
                Color.rgb(0x5A9DFF)
            }
        )
}

val HeroSectionStyle = CssStyle.base {
    Modifier
        .fillMaxWidth()
        .padding(topBottom = 2.cssRem)
        .padding(leftRight = 2.cssRem)
        .textAlign(com.varabyte.kobweb.compose.css.TextAlign.Center)
}

val ContactLinkStyle = CssStyle.base {
    Modifier
        .padding(leftRight = 1.5.cssRem, topBottom = 0.75.cssRem)
        .borderRadius(0.5.cssRem)
        .backgroundColor(
            if (colorMode.isLight) {
                Color.rgb(0x3C83EF)
            } else {
                Color.rgb(0x5A9DFF)
            }
        )
        .color(Colors.White)
        .fontWeight(500)
}

val ListItemStyle = CssStyle.base {
    Modifier
        .margin(bottom = 0.5.cssRem)
        .lineHeight(1.7)
        .padding(left = 0.5.cssRem)
}

val ExperienceCardStyle = CssStyle.base {
    Modifier
        .padding(1.5.cssRem)
        .borderRadius(0.5.cssRem)
        .backgroundColor(
            if (colorMode.isLight) {
                Colors.White
            } else {
                Color.rgb(0x1A1D24)
            }
        )
        .borderLeft(
            4.px,
            LineStyle.Solid,
            if (colorMode.isLight) {
                Color.rgb(0x3C83EF)
            } else {
                Color.rgb(0x5A9DFF)
            }
        )
}

val ThemeToggleButtonStyle = CssStyle.base {
    Modifier
        .position(Position.Fixed)
        .top(1.5.cssRem)
        .right(1.5.cssRem)
        .zIndex(1000)
        .padding(0.75.cssRem)
        .borderRadius(50.percent)
        .backgroundColor(
            if (colorMode.isLight) {
                Color.rgb(0xF8F9FA)
            } else {
                Color.rgb(0x1A1D24)
            }
        )
        .boxShadow(
            blurRadius = 0.5.cssRem,
            spreadRadius = 0.px,
            color = if (colorMode.isLight) {
                Colors.Black.copyf(alpha = 0.1f)
            } else {
                Colors.Black.copyf(alpha = 0.3f)
            }
        )
}

@InitRoute
fun initHomePage(ctx: InitRouteContext) {
    ctx.data.add(PageLayoutData("Bharath K Malviya - Portfolio"))
}

@Page
@Layout(".components.layouts.PageLayout")
@Composable
fun Index() {
    val sitePalette = ColorMode.current.toSitePalette()
    var colorMode by ColorMode.currentState

    Box(Modifier.fillMaxWidth()) {
        // Theme Toggle Button
        Button(
            onClick = { colorMode = colorMode.opposite },
            ThemeToggleButtonStyle.toModifier()
        ) {
            if (colorMode.isLight) {
                MoonIcon()
            } else {
                SunIcon()
            }
        }

        Column(Modifier.fillMaxWidth().gap(2.cssRem)) {
            // Hero Section
            Column(HeroSectionStyle.toModifier(), horizontalAlignment = Alignment.CenterHorizontally) {
                H1(HeadlineTextStyle.toAttrs()) {
                    SpanText(
                        "Bharath K Malviya",
                        Modifier.color(sitePalette.brand.primary)
                    )
                }
                Div(SubheadlineTextStyle.toAttrs()) {
                    SpanText("Android Engineer | 6 Years of Experience")
                }
                Div(Modifier.margin(top = 1.cssRem).toAttrs()) {
                    SpanText("📍 Rajasthan, India")
                }
            }

            // Profile Summary
            Column(SectionCardStyle.toModifier()) {
                H2(SectionTitleStyle.toAttrs()) {
                    SpanText("Profile Summary")
                }
                P(Modifier.lineHeight(1.7).toAttrs()) {
                    SpanText(
                        "Results-driven Android Engineer with 6 years of experience in designing, developing, and optimizing mobile applications. " +
                                "Proficient in Java, Kotlin, and Android SDK, with expertise in MVVM architecture, Dependency Injection (Dagger Hilt), " +
                                "Jetpack Components, and Firebase."
                    )
                }
            }

            // Social Media & Contact
            Column(SectionCardStyle.toModifier(), horizontalAlignment = Alignment.CenterHorizontally) {
                H2(SectionTitleStyle.toAttrs()) {
                    SpanText("Connect With Me")
                }
                Row(
                    Modifier
                        .gap(1.cssRem)
                        .flexWrap(FlexWrap.Wrap),
                    horizontalArrangement = Arrangement.Center
                ) {
                    Link(
                        "https://linkedin.com/in/bharath-k-malviya",
                        "LinkedIn",
                        ContactLinkStyle.toModifier(),
                        variant = UncoloredLinkVariant
                    )
                    Link(
                        "https://github.com/BharathKmalviya",
                        "GitHub",
                        ContactLinkStyle.toModifier(),
                        variant = UncoloredLinkVariant
                    )
                    Link(
                        "http://bharathmalviya.com/",
                        "Portfolio",
                        ContactLinkStyle.toModifier(),
                        variant = UncoloredLinkVariant
                    )
                    Link(
                        "https://x.com/BharathKmalviya",
                        "Twitter/X",
                        ContactLinkStyle.toModifier(),
                        variant = UncoloredLinkVariant
                    )
                    Link(
                        "mailto:Bharathkmalviya@gmail.com",
                        "Email",
                        ContactLinkStyle.toModifier(),
                        variant = UncoloredLinkVariant
                    )
                }
            }

            // Credits
            Column(
                Modifier
                    .fillMaxWidth()
                    .padding(top = 2.cssRem)
                    .textAlign(com.varabyte.kobweb.compose.css.TextAlign.Center),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                P(Modifier.color(sitePalette.brand.primary).fontSize(0.875.cssRem).toAttrs()) {
                    SpanText("Built with ")
                    Link(
                        "https://github.com/varabyte/kobweb",
                        "Kobweb",
                        Modifier.color(sitePalette.brand.primary),
                        variant = UncoloredLinkVariant
                    )
                    SpanText(" - A Kotlin/JS web framework")
                }
            }
        }
    }
}
