import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { type ComponentProps } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import '@/global.css';
import { PaperDarkTheme, PaperLightTheme } from '@/constants/paper-theme';
import { ThemeProvider, useThemePreference } from '@/context/theme-provider';

type MCIName = ComponentProps<typeof MaterialCommunityIcons>['name'];

// Use @expo/vector-icons for Paper's icons so no extra font loading is needed.
const paperSettings = {
  icon: ({ name, color, size }: { name: string; color?: string; size?: number }) => (
    <MaterialCommunityIcons name={name as MCIName} color={color} size={size} />
  ),
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}

function RootNavigator() {
  const { scheme } = useThemePreference();
  const isDark = scheme === 'dark';

  return (
    <PaperProvider theme={isDark ? PaperDarkTheme : PaperLightTheme} settings={paperSettings}>
      <NavThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </NavThemeProvider>
    </PaperProvider>
  );
}
