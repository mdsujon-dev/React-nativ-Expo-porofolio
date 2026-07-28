import { LinearGradient } from 'expo-linear-gradient';
import { Linking, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';

import { useHero } from '@/api/dynamic-content';
import { BrandGradient } from '@/constants/palette';

export type HeroSectionProps = {
  onHire?: () => void;
  onViewWork?: () => void;
};

const openLink = (url?: string) => {
  if (url) Linking.openURL(url).catch(() => {});
};

/** Glossy green hero: greeting, tagline, CTA buttons and social icons (backend-driven). */
export function HeroSection({ onHire, onViewWork }: HeroSectionProps) {
  const { content } = useHero();

  return (
    <LinearGradient
      colors={BrandGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}>
      <View className="items-center px-6 pb-10 pt-[92px]">
        <Text
          variant="displaySmall"
          style={{ color: '#fff', fontWeight: '900', textAlign: 'center' }}>
          {content.greeting}
        </Text>
        <Text
          variant="titleMedium"
          style={{ color: 'rgba(255,255,255,0.92)', marginTop: 8, textAlign: 'center' }}>
          {content.tagline}
        </Text>

        <View className="mt-6 flex-row gap-3">
          <Button
            mode="contained"
            buttonColor="#ffffff"
            textColor="#065f46"
            icon={content.primaryCta.icon}
            onPress={onHire}>
            {content.primaryCta.text}
          </Button>
          <Button
            mode="outlined"
            textColor="#ffffff"
            style={{ borderColor: 'rgba(255,255,255,0.7)' }}
            icon={content.secondaryCta.icon}
            onPress={content.secondaryCta.link ? () => openLink(content.secondaryCta.link) : onViewWork}>
            {content.secondaryCta.text}
          </Button>
        </View>

        <View className="mt-4 flex-row flex-wrap justify-center gap-1">
          {content.socials.map((social) => (
            <IconButton
              key={social.key}
              icon={social.icon}
              iconColor="#fff"
              size={24}
              onPress={() => openLink(social.url)}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
}
