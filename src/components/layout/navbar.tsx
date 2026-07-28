import { Image } from 'expo-image';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';

import { BrandColor } from '@/constants/palette';

const logo = require('@/assets/logo/logo.png');

export type NavbarProps = {
  title?: string;
  onMenuPress?: () => void;
};

/** Solid deep-green Material Appbar: wordmark logo left, menu action right. */
export function Navbar({ title = 'Sujon', onMenuPress }: NavbarProps) {
  const insets = useSafeAreaInsets();

  return (
    <Appbar.Header
      dark
      elevated
      mode="small"
      statusBarHeight={insets.top}
      style={{ backgroundColor: BrandColor }}>
      <View className="ml-3">
        <Image
          source={logo}
          style={{ width: 132, height: 34 }}
          contentFit="contain"
          accessibilityLabel={title}
        />
      </View>
      <Appbar.Content title="" />
      <Appbar.Action icon="menu" onPress={onMenuPress} accessibilityLabel="Open menu" />
    </Appbar.Header>
  );
}
