import { View } from 'react-native';
import { Avatar, Card, Icon, Text, useTheme } from 'react-native-paper';

import { useServices } from '@/api/dynamic-content';
import { SectionHeader } from '@/components/shared';
import { primaryShadow } from '@/constants/shadow';

/** "Services I provide" — backend-driven; hidden unless the section is active. */
export function ServicesSection() {
  const theme = useTheme();
  const { content, active } = useServices();

  if (!active || content.items.length === 0) return null;

  return (
    <View className="px-5">
      <SectionHeader label={content.label} title={content.title} />

      <View className="gap-3">
        {content.items.map((item) => (
          <Card key={item.key} mode="elevated" style={primaryShadow(theme.colors.primary)}>
            <Card.Content style={{ gap: 10, paddingVertical: 18 }}>
              <View className="flex-row items-center gap-3">
                <Avatar.Icon size={44} icon={item.icon} />
                <Text variant="titleMedium" style={{ fontWeight: '800', flex: 1 }}>
                  {item.title}
                </Text>
              </View>
              <Text variant="bodyMedium" style={{ opacity: 0.7 }}>
                {item.description}
              </Text>
              <View className="mt-1 gap-2">
                {item.features.map((feature) => (
                  <View key={feature} className="flex-row items-center gap-2">
                    <Icon source="check-circle" size={16} color={theme.colors.primary} />
                    <Text variant="bodySmall" style={{ opacity: 0.85, flex: 1 }}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
}
