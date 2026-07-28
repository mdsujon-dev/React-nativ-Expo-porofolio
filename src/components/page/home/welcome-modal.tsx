import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { Button, Chip, IconButton, Text } from 'react-native-paper';

import { useWelcomeModal } from '@/api/dynamic-content';
import { BrandGradient } from '@/constants/palette';

export type WelcomeModalProps = {
  /** Scroll the page to a section key (Home/About/Skills/Projects/Experience/Contact). */
  onNavigate?: (key: string) => void;
};

/** Map a backend quick-link id/label to a home-page scroll key. */
const SECTION_KEYS: Record<string, string> = {
  projects: 'Projects',
  skills: 'Skills',
  experience: 'Experience',
  about: 'About',
  contact: 'Contact',
  reviews: 'Contact',
};

/** One-time welcome popup shown on launch when `welcome_modal` is active. */
export function WelcomeModal({ onNavigate }: WelcomeModalProps) {
  const { content, active, isSuccess } = useWelcomeModal();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Open once, after the content has loaded and only if the section is active.
  useEffect(() => {
    if (isSuccess && active && !dismissed) setVisible(true);
  }, [isSuccess, active, dismissed]);

  const close = () => {
    setVisible(false);
    setDismissed(true);
  };

  const go = (key?: string) => {
    close();
    if (key && onNavigate) onNavigate(key);
  };

  if (!active) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
      <Pressable
        onPress={close}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          backgroundColor: 'rgba(0,0,0,0.55)',
        }}>
        <Pressable onPress={() => {}} style={{ width: '100%', maxWidth: 420 }}>
          <View style={{ borderRadius: 24, overflow: 'hidden' }}>
            <LinearGradient colors={BrandGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <View style={{ padding: 24, gap: 12 }}>
                <View className="flex-row items-center justify-between">
                  <View
                    style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
                    className="rounded-full px-3 py-1">
                    <Text style={{ color: '#fff', fontWeight: '800', fontSize: 11, letterSpacing: 1 }}>
                      {content.badge.toUpperCase()}
                    </Text>
                  </View>
                  <IconButton icon="close" iconColor="#fff" size={22} onPress={close} />
                </View>

                <Text style={{ color: '#fff', fontSize: 26, fontWeight: '900' }}>{content.title}</Text>
                {content.description ? (
                  <Text style={{ color: 'rgba(255,255,255,0.9)' }} variant="bodyMedium">
                    {content.description}
                  </Text>
                ) : null}

                {content.quickLinks.length > 0 ? (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8, paddingVertical: 4 }}>
                    {content.quickLinks.map((link) => (
                      <Chip
                        key={link.id}
                        icon={link.icon}
                        onPress={() => go(SECTION_KEYS[link.id.toLowerCase()])}
                        style={{ backgroundColor: 'rgba(255,255,255,0.16)' }}
                        textStyle={{ color: '#fff' }}>
                        {link.label}
                      </Chip>
                    ))}
                  </ScrollView>
                ) : null}

                <Button
                  mode="contained"
                  buttonColor="#ffffff"
                  textColor="#043d2e"
                  icon="hand-wave"
                  style={{ marginTop: 4 }}
                  onPress={() => go(SECTION_KEYS[content.ctaLink.toLowerCase()] ?? 'Contact')}>
                  {content.ctaText}
                </Button>
              </View>
            </LinearGradient>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
