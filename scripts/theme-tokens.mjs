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
