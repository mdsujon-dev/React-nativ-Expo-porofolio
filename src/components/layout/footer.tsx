import { Linking, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Divider, IconButton, Text, TouchableRipple } from 'react-native-paper';

import { useFooter } from '@/api/dynamic-content';
import { BrandColor } from '@/constants/palette';

export type FooterProps = {
  onNavigate?: (section: string) => void;
};

/** Map a footer quick-link href (e.g. "#about") to a home-page scroll key. */
const SCROLL_KEYS: Record<string, string> = {
  home: 'Home',
  about: 'About',
  skills: 'Skills',
  projects: 'Projects',
  experience: 'Experience',
  contact: 'Contact',
};

const scrollKeyFor = (href: string) => SCROLL_KEYS[href.replace(/^#/, '').toLowerCase()];

const openLink = (url?: string) => {
  if (url) Linking.openURL(url).catch(() => {});
};

/** Solid deep-green footer — brand blurb, quick links, socials and a bottom bar (backend-driven). */
export function Footer({ onNavigate }: FooterProps) {
  const insets = useSafeAreaInsets();
  const { content } = useFooter();
  const year = new Date().getFullYear();

  return (
    <View style={{ backgroundColor: BrandColor, paddingBottom: insets.bottom + 14 }}>
      <View className="px-6 pt-10">
        <View className="items-center gap-2">
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: '900' }}>Sujon.dev</Text>
          {content.description ? (
            <Text
              style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}
              variant="bodySmall"
              numberOfLines={4}>
              {content.description}
            </Text>
          ) : null}
        </View>

        {content.quickLinks.length > 0 ? (
          <View className="mt-6 flex-row flex-wrap justify-center gap-x-6 gap-y-2">
            {content.quickLinks.map((link) => {
              const key = scrollKeyFor(link.href);
              return (
                <TouchableRipple
                  key={link.key}
                  onPress={() => (key ? onNavigate?.(key) : undefined)}
                  borderless>
                  <Text style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>{link.name}</Text>
                </TouchableRipple>
              );
            })}
          </View>
        ) : null}

        {content.socials.length > 0 ? (
          <View className="mt-5 flex-row justify-center gap-2">
            {content.socials.map((social) => (
              <IconButton
                key={social.key}
                icon={social.icon}
                iconColor="#ffffff"
                size={22}
                mode="contained-tonal"
                containerColor="rgba(255,255,255,0.15)"
                accessibilityLabel={social.label}
                onPress={() => openLink(social.url)}
              />
            ))}
          </View>
        ) : null}

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
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }} numberOfLines={1}>
            {content.copyrightText ? `© ${year} ${content.copyrightText}` : `© ${year} Sujon`}
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Made with 💚</Text>
        </View>
      </View>
    </View>
  );
}
