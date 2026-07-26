import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ScreenContainerProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

/**
 * Full-bleed themed screen background. Top/bottom safe areas are handled by the
 * navbar and footer so their gradients can run edge to edge.
 */
export function ScreenContainer({ style, lightColor, darkColor, ...rest }: ScreenContainerProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ flex: 1, backgroundColor }, style]} {...rest} />;
}
