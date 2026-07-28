import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

/** Material 3 light theme with a deep green brand primary. */
export const PaperLightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#043d2e',
    onPrimary: '#ffffff',
    primaryContainer: '#c7f2df',
    onPrimaryContainer: '#01221a',
    secondary: '#064e3b',
    secondaryContainer: '#a7f3d0',
    onSecondaryContainer: '#064e3b',
  },
};

/** Material 3 dark theme with a brighter green primary for contrast. */
export const PaperDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#10b981',
    onPrimary: '#01221a',
    primaryContainer: '#065f46',
    onPrimaryContainer: '#d1fae5',
    secondary: '#6ee7b7',
    secondaryContainer: '#064e3b',
    onSecondaryContainer: '#d1fae5',
  },
};
