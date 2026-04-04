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
