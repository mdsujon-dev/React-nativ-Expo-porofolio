import { type ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, type ModalProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export type BaseModalProps = Omit<ModalProps, 'visible' | 'children'> & {
  visible: boolean;
  title?: string;
  onClose: () => void;
  children?: ReactNode;
};

/** Reusable centered modal with a dimmed backdrop and themed card. */
export function BaseModal({ visible, title, onClose, children, ...rest }: BaseModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} {...rest}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* Swallow presses on the card so they don't close the modal. */}
        <Pressable style={styles.cardPress} onPress={() => {}}>
          <ThemedView style={styles.card}>
            {title ? (
              <ThemedText type="subtitle" style={styles.title}>
                {title}
              </ThemedText>
            ) : null}
            {children}
          </ThemedView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cardPress: {
    width: '100%',
    maxWidth: 420,
  },
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  title: {
    marginBottom: 4,
  },
});
