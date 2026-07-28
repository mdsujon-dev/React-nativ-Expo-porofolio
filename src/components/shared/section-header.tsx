import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export type SectionHeaderProps = {
  label: string;
  title: string;
  subtitle?: string;
};

/**
 * Consistent centered section header used across every section to give the
 * page a cohesive "flow": a small green pill label, a bold title and subtitle.
 */
export function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  const theme = useTheme();

  return (
    <View className="mb-5 items-center">
      <View
        style={{ backgroundColor: theme.colors.primaryContainer }}
        className="mb-3 rounded-full px-3 py-1">
        <Text
          variant="labelSmall"
          style={{ color: theme.colors.onPrimaryContainer, fontWeight: '800', letterSpacing: 1 }}>
          {label.toUpperCase()}
        </Text>
      </View>

      <Text variant="headlineSmall" style={{ fontWeight: '900', textAlign: 'center' }}>
        {title}
      </Text>

      {subtitle ? (
        <Text
          variant="bodyMedium"
          style={{ opacity: 0.7, textAlign: 'center', marginTop: 6, paddingHorizontal: 8 }}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
