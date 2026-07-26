import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

/** Material 3 light theme with a purple brand primary. */
export const PaperLightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#7c3aed',
    onPrimary: '#ffffff',
    primaryContainer: '#ede9fe',
    onPrimaryContainer: '#4c1d95',
    secondary: '#8b5cf6',
    secondaryContainer: '#ddd6fe',
    onSecondaryContainer: '#4c1d95',
  },
};

/** Material 3 dark theme with a lighter purple primary for contrast. */
export const PaperDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#a78bfa',
    onPrimary: '#2e1065',
    primaryContainer: '#5b21b6',
    onPrimaryContainer: '#ede9fe',
    secondary: '#c4b5fd',
    secondaryContainer: '#4c1d95',
    onSecondaryContainer: '#ede9fe',
  },
};
