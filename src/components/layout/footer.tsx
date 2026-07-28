import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Divider, IconButton, Text, TouchableRipple } from 'react-native-paper';

import { BrandColor } from '@/constants/palette';

const LINKS = ['Home', 'About', 'Projects', 'Contact'];

const SOCIALS: { icon: string; label: string }[] = [
  { icon: 'github', label: 'GitHub' },
  { icon: 'linkedin', label: 'LinkedIn' },
  { icon: 'email', label: 'Email' },
];

export type FooterProps = {
  onNavigate?: (section: string) => void;
};

/** Solid deep-green footer: brand, quick links, socials and a bottom bar. */
export function Footer({ onNavigate }: FooterProps) {
  const insets = useSafeAreaInsets();
  const year = new Date().getFullYear();

  return (
    <View style={{ backgroundColor: BrandColor, paddingBottom: insets.bottom + 14 }}>
      <View className="px-6 pt-10">
        <View className="items-center gap-2">
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: '900' }}>
            Sujon<Text style={{ color: '#6ee7b7' }}>.dev</Text>
          </Text>
          <Text
            style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}
            variant="bodySmall">
            Full Stack Developer building fast, scalable web & mobile apps.
          </Text>
        </View>

        <View className="mt-6 flex-row flex-wrap justify-center gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <TouchableRipple key={link} onPress={() => onNavigate?.(link)} borderless>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>{link}</Text>
            </TouchableRipple>
          ))}
        </View>

        <View className="mt-5 flex-row justify-center gap-2">
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

        <View className="items-center">
          <Button
            mode="text"
            compact
            icon="arrow-up"
            textColor="#ffffff"
            onPress={() => onNavigate?.('Home')}>
            Back to top
          </Button>
        </View>

        <Divider style={{ backgroundColor: 'rgba(255,255,255,0.18)', marginVertical: 14 }} />

        <View className="flex-row items-center justify-between">
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
            {`© ${year} Sujon`}
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Made with 💚</Text>
        </View>
      </View>
    </View>
  );
}
