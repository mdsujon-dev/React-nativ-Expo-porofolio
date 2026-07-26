import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Modal, Pressable, StyleSheet, View } from 'react-native';
import { Divider, Drawer, Icon, IconButton, Surface, Switch, Text } from 'react-native-paper';

import { PurpleGradient } from '@/constants/palette';
import { useThemePreference } from '@/context/theme-provider';

const PANEL_WIDTH = Math.min(320, Dimensions.get('window').width * 0.82);

const ITEMS: { label: string; icon: string }[] = [
  { label: 'Home', icon: 'home' },
  { label: 'About', icon: 'account' },
  { label: 'Skills', icon: 'star' },
  { label: 'Experience', icon: 'briefcase' },
  { label: 'Projects', icon: 'folder' },
  { label: 'Contact', icon: 'email' },
];

export type SideDrawerProps = {
  visible: boolean;
  onClose: () => void;
  /** Called with the tapped section key so the page can scroll to it. */
  onNavigate?: (section: string) => void;
};

/** Top-most right-side slide-in drawer built with Paper components. */
export function SideDrawer({ visible, onClose, onNavigate }: SideDrawerProps) {
  const translateX = useRef(new Animated.Value(PANEL_WIDTH)).current;
  const backdrop = useRef(new Animated.Value(0)).current;
  const { scheme, toggle } = useThemePreference();
  const isDark = scheme === 'dark';

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateX, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.timing(backdrop, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, translateX, backdrop]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateX, { toValue: PANEL_WIDTH, duration: 200, useNativeDriver: true }),
      Animated.timing(backdrop, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(({ finished }) => {
      if (finished) onClose();
    });
  };

  const handleNavigate = (section: string) => {
    onNavigate?.(section);
    handleClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={handleClose}>
      <View style={styles.root}>
        <Animated.View style={[styles.backdrop, { opacity: backdrop }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
        </Animated.View>

        <Animated.View style={[styles.panel, { transform: [{ translateX }] }]}>
          <Surface style={styles.panelInner} elevation={2}>
            <LinearGradient
              colors={PurpleGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.header}>
              <View style={styles.headerRow}>
                <Text variant="labelLarge" style={styles.headerLabel}>
                  MENU
                </Text>
                <IconButton icon="close" iconColor="#fff" size={22} onPress={handleClose} />
              </View>
              <Text variant="headlineSmall" style={styles.headerName}>
                Sujon
              </Text>
              <Text style={styles.headerTagline}>Portfolio</Text>
            </LinearGradient>

            <Drawer.Section showDivider={false} style={styles.items}>
              {ITEMS.map((item) => (
                <Drawer.Item
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  onPress={() => handleNavigate(item.label)}
                />
              ))}
            </Drawer.Section>

            <View style={styles.spacer} />
            <Divider />

            <Pressable style={styles.themeRow} onPress={toggle}>
              <Icon source={isDark ? 'weather-night' : 'weather-sunny'} size={24} />
              <Text variant="bodyLarge" style={styles.themeText}>
                {isDark ? 'Dark mode' : 'Light mode'}
              </Text>
              <Switch value={isDark} onValueChange={toggle} />
            </Pressable>
          </Surface>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 9999,
    elevation: 9999,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  panel: {
    width: PANEL_WIDTH,
    height: '100%',
  },
  panelInner: {
    flex: 1,
  },
  header: {
    paddingTop: 48,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLabel: {
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 1,
  },
  headerName: {
    color: '#fff',
    fontWeight: '800',
    marginTop: 8,
  },
  headerTagline: {
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  items: {
    paddingTop: 8,
  },
  spacer: {
    flex: 1,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 18,
    paddingBottom: 28,
  },
  themeText: {
    flex: 1,
  },
});
