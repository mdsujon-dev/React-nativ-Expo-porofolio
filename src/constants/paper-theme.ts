import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

/** Material 3 light theme with a deep green brand primary. */
export const PaperLightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#047857',
    onPrimary: '#ffffff',
    primaryContainer: '#d1fae5',
    onPrimaryContainer: '#064e3b',
    secondary: '#059669',
    secondaryContainer: '#a7f3d0',
    onSecondaryContainer: '#064e3b',
  },
};

/** Material 3 dark theme with a brighter green primary for contrast. */
export const PaperDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#34d399',
    onPrimary: '#022c22',
    primaryContainer: '#065f46',
    onPrimaryContainer: '#d1fae5',
    secondary: '#6ee7b7',
    secondaryContainer: '#064e3b',
    onSecondaryContainer: '#d1fae5',
  },
};
