import { Image } from 'expo-image';
import { View } from 'react-native';
import { Avatar, Card, Text, useTheme } from 'react-native-paper';

import { useTrust } from '@/api/dynamic-content';
import { SectionHeader } from '@/components/shared';
import { primaryShadow } from '@/constants/shadow';

/** Social proof — headline stats plus a row of brand logos, backend-driven. */
export function TrustSection() {
  const theme = useTheme();
  const { content, active } = useTrust();

  if (!active || (content.stats.length === 0 && content.brands.length === 0)) return null;

  return (
    <View className="px-5">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      {content.stats.length > 0 ? (
        <View className="flex-row flex-wrap gap-3">
          {content.stats.map((stat) => (
            <Card
              key={stat.key}
              mode="elevated"
              style={{ flexGrow: 1, flexBasis: '46%', ...primaryShadow(theme.colors.primary, false) }}>
              <Card.Content style={{ alignItems: 'center', gap: 4, paddingVertical: 16 }}>
                <Avatar.Icon size={38} icon={stat.icon} />
                <Text variant="titleLarge" style={{ fontWeight: '900' }}>
                  {stat.value}
                </Text>
                <Text variant="bodySmall" style={{ opacity: 0.7, textAlign: 'center' }}>
                  {stat.label}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      ) : null}

      {content.brands.length > 0 ? (
        <View className="mt-4 flex-row flex-wrap items-center justify-center gap-4">
          {content.brands.map((brand) => (
            <Image
              key={brand.key}
              source={{ uri: brand.image }}
              style={{ width: 84, height: 34, opacity: 0.85 }}
              contentFit="contain"
              accessibilityLabel={brand.name}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
