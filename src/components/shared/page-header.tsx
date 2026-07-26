import { StyleSheet, View, type ViewProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';

export type PageHeaderProps = ViewProps & {
  title: string;
  subtitle?: string;
};

/** Page-level heading block: title with an optional subtitle. */
export function PageHeader({ title, subtitle, style, ...rest }: PageHeaderProps) {
  return (
    <View style={[styles.container, style]} {...rest}>
      <ThemedText type="title">{title}</ThemedText>
      {subtitle ? (
        <ThemedText type="subtitle" style={styles.subtitle}>
          {subtitle}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    paddingVertical: 16,
  },
  subtitle: {
    opacity: 0.7,
  },
});
