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
            colorMode.toSitePalette().brand.primary.toRgb().copyf(alpha = 0.15f)
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
