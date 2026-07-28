import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Divider, IconButton, Text } from 'react-native-paper';

import { BrandColor } from '@/constants/palette';

const SOCIALS: { icon: string; label: string }[] = [
  { icon: 'github', label: 'GitHub' },
  { icon: 'linkedin', label: 'LinkedIn' },
  { icon: 'email', label: 'Email' },
];

/** Solid deep-green footer that runs to the bottom edge of the screen. */
export function Footer() {
  const insets = useSafeAreaInsets();
  const year = new Date().getFullYear();

  return (
    <View style={{ backgroundColor: BrandColor, paddingBottom: insets.bottom + 20 }}>
      <View className="items-center gap-3 px-6 pt-9">
        <Text variant="titleLarge" style={{ color: '#fff', fontWeight: '900' }}>
          Sujon.dev
        </Text>

        <Text variant="bodySmall" style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
          Full Stack Developer — let&apos;s build something great together.
        </Text>

        <View className="flex-row gap-2">
          {SOCIALS.map((social) => (
            <IconButton
              key={social.label}
              icon={social.icon}
              iconColor="#ffffff"
              size={22}
              mode="contained-tonal"
              containerColor="rgba(255,255,255,0.15)"
              accessibilityLabel={social.label}
              onPress={() => {}}
            />
          ))}
        </View>

        <Divider style={{ backgroundColor: 'rgba(255,255,255,0.2)', alignSelf: 'stretch' }} />

        <Text variant="bodySmall" style={{ color: 'rgba(255,255,255,0.7)' }}>
          {`© ${year} Sujon. All rights reserved.`}
        </Text>
      </View>
    </View>
  );
}
