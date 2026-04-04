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
