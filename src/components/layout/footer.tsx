import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, TouchableRipple } from 'react-native-paper';

import { PurpleGradient } from '@/constants/palette';

const LINKS = ['GitHub', 'LinkedIn', 'Email'];

/** Glossy purple footer that runs to the bottom edge of the screen. */
export function Footer() {
  const insets = useSafeAreaInsets();
  const year = new Date().getFullYear();

  return (
    <LinearGradient
      colors={PurpleGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ paddingBottom: insets.bottom + 20 }}>
      <View className="items-center gap-4 px-6 pt-8">
        <Text variant="titleLarge" style={{ color: '#fff', fontWeight: '900' }}>
          Sujon
        </Text>

        <View className="flex-row flex-wrap justify-center gap-6">
          {LINKS.map((link) => (
            <TouchableRipple key={link} onPress={() => {}} borderless>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>{link}</Text>
            </TouchableRipple>
          ))}
        </View>

        <Text variant="bodySmall" style={{ color: 'rgba(255,255,255,0.7)' }}>
          {`© ${year} Sujon. All rights reserved.`}
        </Text>
      </View>
    </LinearGradient>
  );
}
