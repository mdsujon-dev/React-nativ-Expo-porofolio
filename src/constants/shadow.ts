import type { ViewStyle } from 'react-native';

/** Convert a hex color (#rgb or #rrggbb) to an rgba() string with the given alpha. */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return hex;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Soft, brand-tinted card shadow. Pass the theme's primary color so cards float
 * with a subtle green glow instead of a flat grey drop shadow.
 *
 * Uses the modern `boxShadow` style (RN 0.81 / new architecture — colored on
 * Android & web) together with the classic `shadow*` props so iOS gets the same
 * tinted shadow. `elevation` keeps a sensible fallback wherever `boxShadow` is
 * unsupported.
 *
 * @param color   Shadow color, typically `theme.colors.primary`.
 * @param intense `false` for lighter secondary cards (stat tiles, etc.).
 */
export function primaryShadow(color: string, intense = true): ViewStyle {
  const opacity = intense ? 0.35 : 0.22;
  const y = intense ? 10 : 6;
  const blur = intense ? 22 : 14;

  return {
    boxShadow: `0px ${y}px ${blur}px ${withAlpha(color, opacity)}`,
    shadowColor: color,
    shadowOffset: { width: 0, height: y },
    shadowOpacity: opacity,
    shadowRadius: blur / 2,
    elevation: intense ? 8 : 4,
  } as ViewStyle;
}
