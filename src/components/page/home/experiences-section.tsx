import { View } from 'react-native';
import { Avatar, Card, Icon, Text, useTheme } from 'react-native-paper';

import { useExperience } from '@/api/dynamic-content';
import { SectionHeader } from '@/components/shared';
import { primaryShadow } from '@/constants/shadow';

/** Work experience with achievements (backend-driven). */
export function ExperiencesSection() {
  const theme = useTheme();
  const { content } = useExperience();

  return (
    <View className="px-5">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      <View className="gap-3">
        {content.items.map((item) => (
          <Card key={item.key} mode="elevated" style={primaryShadow(theme.colors.primary)}>
            <Card.Title
              title={item.role}
              titleStyle={{ fontWeight: '700' }}
              subtitle={`${item.company} · ${item.period}`}
              left={(props) => <Avatar.Icon {...props} size={40} icon={item.icon} />}
            />
            <Card.Content style={{ gap: 8 }}>
              {item.achievements.map((achievement) => (
                <View key={achievement} className="flex-row gap-2">
                  <View style={{ marginTop: 3 }}>
                    <Icon source="check-circle" size={16} color={theme.colors.primary} />
                  </View>
                  <Text variant="bodySmall" style={{ flex: 1, opacity: 0.8 }}>
                    {achievement}
                  </Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
}
