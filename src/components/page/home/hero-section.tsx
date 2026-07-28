import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';

import { BrandGradient } from '@/constants/palette';

export type HeroSectionProps = {
  onHire?: () => void;
  onViewWork?: () => void;
};

/** Glossy green hero: greeting, tagline, CTA buttons and social icons. */
export function HeroSection({ onHire, onViewWork }: HeroSectionProps) {
  return (
    <LinearGradient
      colors={BrandGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}>
      <View className="items-center px-6 pb-10 pt-6">
        <View className="rounded-full bg-white/20 px-4 py-1.5">
          <Text variant="labelMedium" style={{ color: '#fff', fontWeight: '800', letterSpacing: 1 }}>
            WELCOME TO MY PORTFOLIO
          </Text>
        </View>

        <Text
          variant="displaySmall"
          style={{ color: '#fff', fontWeight: '900', marginTop: 16, textAlign: 'center' }}>
          Hi, I&apos;m Sujon
        </Text>
        <Text
          variant="titleMedium"
          style={{ color: 'rgba(255,255,255,0.92)', marginTop: 8, textAlign: 'center' }}>
          Full Stack Developer building fast, scalable web & mobile apps
        </Text>

        <View className="mt-6 flex-row gap-3">
          <Button
            mode="contained"
            buttonColor="#ffffff"
            textColor="#059669"
            icon="briefcase"
            onPress={onHire}>
            Hire Me
          </Button>
          <Button
            mode="outlined"
            textColor="#ffffff"
            style={{ borderColor: 'rgba(255,255,255,0.7)' }}
            icon="folder-open"
            onPress={onViewWork}>
            View Work
          </Button>
        </View>

        <View className="mt-4 flex-row gap-1">
          <IconButton icon="github" iconColor="#fff" size={24} onPress={() => {}} />
          <IconButton icon="linkedin" iconColor="#fff" size={24} onPress={() => {}} />
          <IconButton icon="email" iconColor="#fff" size={24} onPress={() => {}} />
        </View>
      </View>
    </LinearGradient>
  );
}
