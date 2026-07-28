import type { ViewStyle } from 'react-native';

/**
 * Frosted-glass card styling (glassmorphism). Because there's no colorful layer
 * behind these cards to actually blur, we fake the effect convincingly with a
 * translucent fill, a bright hairline border and a diagonal sheen gradient
 * (rendered separately with `sheen`). Theme-aware via the `dark` flag.
 */
export function glassStyle(dark: boolean): {
  container: ViewStyle;
  sheen: readonly [string, string, string];
} {
  return {
    container: {
      borderRadius: 18,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: dark ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.85)',
      backgroundColor: dark ? 'rgba(30,41,59,0.35)' : 'rgba(255,255,255,0.45)',
      // Soft ambient lift so the glass appears to float.
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: dark ? 0.35 : 0.12,
      shadowRadius: 16,
      elevation: 4,
    },
    sheen: dark
      ? ['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.03)', 'rgba(255,255,255,0)']
      : ['rgba(255,255,255,0.75)', 'rgba(255,255,255,0.25)', 'rgba(255,255,255,0.05)'],
  };
}
