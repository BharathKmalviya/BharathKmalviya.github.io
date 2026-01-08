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
                    SpanText("📧 Bharathkmalviya@gmail.com")
                    SpanText(" | ")
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

            // Core Competencies
            Column(SectionCardStyle.toModifier()) {
                H2(SectionTitleStyle.toAttrs()) {
                    SpanText("Core Competencies")
                }
                Ul(Modifier.lineHeight(1.8).toAttrs()) {
                    Li(ListItemStyle.toAttrs()) {
                        SpanText("Mobile Application Architecture")
                    }
                    Li(ListItemStyle.toAttrs()) {
                        SpanText("User Experience Design & Optimization")
                    }
                    Li(ListItemStyle.toAttrs()) {
                        SpanText("Agile Development & Scrum Methodologies")
                    }
                }
            }

            // Technical Skills
            Column(SectionCardStyle.toModifier()) {
                H2(SectionTitleStyle.toAttrs()) {
                    SpanText("Technical Skills")
                }
                Column(Modifier.gap(0.1.cssRem)) {
                    P(Modifier.lineHeight(1.7).toAttrs()) {
                        SpanText("Programming Languages: ", Modifier.fontWeight(600).color(sitePalette.brand.primary))
                        SpanText("Java, Kotlin")
                    }
                    P(Modifier.lineHeight(1.7).toAttrs()) {
                        SpanText("Architectural Patterns: ", Modifier.fontWeight(600).color(sitePalette.brand.primary))
                        SpanText("MVVM")
                    }
                    P(Modifier.lineHeight(1.7).toAttrs()) {
                        SpanText("Dependency Injection: ", Modifier.fontWeight(600).color(sitePalette.brand.primary))
                        SpanText("Dagger Hilt")
                    }
                    P(Modifier.lineHeight(1.7).toAttrs()) {
                        SpanText(
                            "UI Frameworks & Components: ",
                            Modifier.fontWeight(600).color(sitePalette.brand.primary)
                        )
                        SpanText("Jetpack Components, Jetpack Compose")
                    }
                    P(Modifier.lineHeight(1.7).toAttrs()) {
                        SpanText(
                            "Asynchronous Programming: ",
                            Modifier.fontWeight(600).color(sitePalette.brand.primary)
                        )
                        SpanText("RxJava, Kotlin Coroutines")
                    }
                    P(Modifier.lineHeight(1.7).toAttrs()) {
                        SpanText("Database Management: ", Modifier.fontWeight(600).color(sitePalette.brand.primary))
                        SpanText("Room Database, Realm Database, Firebase Firestore")
                    }
                    P(Modifier.lineHeight(1.7).toAttrs()) {
                        SpanText(
                            "Networking & API Integration: ",
                            Modifier.fontWeight(600).color(sitePalette.brand.primary)
                        )
                        SpanText("REST APIs, Retrofit")
                    }
                    P(Modifier.lineHeight(1.7).toAttrs()) {
                        SpanText(
                            "Cloud & Backend Services: ",
                            Modifier.fontWeight(600).color(sitePalette.brand.primary)
                        )
                        SpanText("Firebase (Authentication, Firestore, Realtime Database, Cloud Messaging)")
                    }
                    P(Modifier.lineHeight(1.7).toAttrs()) {
                        SpanText("Real-Time Communication: ", Modifier.fontWeight(600).color(sitePalette.brand.primary))
                        SpanText("XMPP Chat, Agora SDK (Audio/Video Calls)")
                    }
                    P(Modifier.lineHeight(1.7).toAttrs()) {
                        SpanText("Multimedia & Streaming: ", Modifier.fontWeight(600).color(sitePalette.brand.primary))
                        SpanText("Exoplayer")
                    }
                    P(Modifier.lineHeight(1.7).toAttrs()) {
                        SpanText(
                            "Task Scheduling & Management: ",
                            Modifier.fontWeight(600).color(sitePalette.brand.primary)
                        )
                        SpanText("Work Manager")
                    }
                    P(Modifier.lineHeight(1.7).toAttrs()) {
                        SpanText("Version Control & CI/CD: ", Modifier.fontWeight(600).color(sitePalette.brand.primary))
                        SpanText("Git, GitHub")
                    }
                    P(Modifier.lineHeight(1.7).toAttrs()) {
                        SpanText(
                            "Cross-Device & Platform Development: ",
                            Modifier.fontWeight(600).color(sitePalette.brand.primary)
                        )
                        SpanText("Android TV, Mobile-to-TV Sync")
                    }
                    P(Modifier.lineHeight(1.7).toAttrs()) {
                        SpanText(
                            "Project Management & Collaboration: ",
                            Modifier.fontWeight(600).color(sitePalette.brand.primary)
                        )
                        SpanText("Agile, Jira")
                    }
                }
            }

            // Work Experience
            Column(SectionCardStyle.toModifier()) {
                H2(SectionTitleStyle.toAttrs()) {
                    SpanText("Work Experience")
                }
                Column(Modifier.gap(2.cssRem)) {
                    // GTS INFOSOFT
                    Div(ExperienceCardStyle.toAttrs()) {
                        H3(Modifier.margin(bottom = 0.5.cssRem).color(sitePalette.brand.primary).toAttrs()) {
                            SpanText("Android Engineer | GTS INFOSOFT LLP")
                        }
                        P(
                            Modifier.margin(bottom = 0.75.cssRem).color(sitePalette.brand.primary).fontWeight(500)
                                .toAttrs()
                        ) {
                            SpanText("Jan 2020 - Nov 2024 | Rajasthan, India")
                        }
                        P(
                            Modifier.margin(bottom = 0.5.cssRem).fontWeight(600).color(sitePalette.brand.primary)
                                .toAttrs()
                        ) {
                            SpanText("Responsibilities:")
                        }
                        Ul(Modifier.margin(bottom = 0.75.cssRem).lineHeight(1.7).toAttrs()) {
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Engineered and optimized database architectures for complex reminder systems, ensuring seamless synchronization with server components")
                            }
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Integrated RxJava & Kotlin Coroutines to improve asynchronous processing and application performance")
                            }
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Designed & developed real-time gaming applications leveraging Firebase")
                            }
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Worked on Android TV applications enabling synchronized live video streaming")
                            }
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Led end-to-end development of financial advisory platforms with XMPP-based chat and Agora SDK-powered audio/video calling")
                            }
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Developed high-performance, scalable Android applications")
                            }
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Collaborated with UX designers & product managers to deliver intuitive user experiences")
                            }
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Managed multiple concurrent projects, consistently delivering solutions ahead of deadlines")
                            }
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Created restaurant management systems with dynamic receipt printing via Printer SDKs")
                            }
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Implemented offline-first architecture for low-connectivity environments")
                            }
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Spearheaded database performance optimizations")
                            }
                        }
                        P(
                            Modifier.margin(bottom = 0.5.cssRem).fontWeight(600).color(sitePalette.brand.primary)
                                .toAttrs()
                        ) {
                            SpanText("Achievements:")
                        }
                        Ul(Modifier.lineHeight(1.7).toAttrs()) {
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Successfully helped launch 2 Android applications")
                            }
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Played a key role in launching a live gaming app with significant downloads")
                            }
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Improved application performance and user engagement")
                            }
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Recognized as \"Impactful Performer\" (May 2022)")
                            }
                        }
                    }

                    // Suncity Techno
                    Div(ExperienceCardStyle.toAttrs()) {
                        H3(Modifier.margin(bottom = 0.5.cssRem).color(sitePalette.brand.primary).toAttrs()) {
                            SpanText("Android Developer | Suncity Techno Pvt. Ltd.")
                        }
                        P(
                            Modifier.margin(bottom = 0.75.cssRem).color(sitePalette.brand.primary).fontWeight(500)
                                .toAttrs()
                        ) {
                            SpanText("Oct 2019 - Jan 2020 | Rajasthan, India")
                        }
                        P(
                            Modifier.margin(bottom = 0.5.cssRem).fontWeight(600).color(sitePalette.brand.primary)
                                .toAttrs()
                        ) {
                            SpanText("Responsibilities:")
                        }
                        Ul(Modifier.lineHeight(1.7).toAttrs()) {
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Developed & maintained 2 Android applications using Java and Android SDK")
                            }
                            Li(ListItemStyle.toAttrs()) {
                                SpanText("Managed activity lifecycles, UI design, and API integrations")
                            }
                        }
                    }
                }
            }

            // Education
            Column(SectionCardStyle.toModifier()) {
                H2(SectionTitleStyle.toAttrs()) {
                    SpanText("Education")
                }
                Column(Modifier.gap(0.1.cssRem)) {
                    P {
                        SpanText("MCA", Modifier.fontWeight(600).color(sitePalette.brand.primary))
                        SpanText(" | Manipal University, Jaipur, Rajasthan | March 2024 | CGPA: 8.13")
                    }
                    P {
                        SpanText("BCA", Modifier.fontWeight(600).color(sitePalette.brand.primary))
                        SpanText(" | Davangere University, Government Science College, Chitradurga, Karnataka | June 2019 | CGPA: 6.27")
                    }
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
