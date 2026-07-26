import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';

import { PurpleGradient } from '@/constants/palette';

const logo = require('@/assets/logo/logo.png');

export type NavbarProps = {
  title?: string;
  onMenuPress?: () => void;
};

/** Glossy purple Material Appbar: wordmark logo on the left, menu action on the right. */
export function Navbar({ title = 'Sujon', onMenuPress }: NavbarProps) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={PurpleGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <Appbar.Header
        dark
        mode="small"
        statusBarHeight={insets.top}
        style={{ backgroundColor: 'transparent' }}>
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
    </LinearGradient>
  );
}
