import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { type ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'light' | 'dark';

/**
 * The app's theme is driven by NativeWind's color-scheme store so that JS
 * (themed colors) and `dark:` utility classes always stay in sync, and the
 * user can override the system preference at runtime.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/** Access + control the theme preference. */
export function useThemePreference() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();
  const scheme: ColorScheme = colorScheme ?? 'light';

  return {
    scheme,
    setMode: (mode: ThemeMode) => setColorScheme(mode),
    toggle: toggleColorScheme,
  };
}

/** The resolved color scheme, used by themed components. */
export function useColorSchemeValue(): ColorScheme {
  const { colorScheme } = useNativewindColorScheme();
  return colorScheme ?? 'light';
}
