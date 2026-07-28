import { View } from 'react-native';
import { Avatar, Card, Chip, Text, useTheme } from 'react-native-paper';

import { useEducation } from '@/api/dynamic-content';
import { SectionHeader } from '@/components/shared';
import { primaryShadow } from '@/constants/shadow';

/** Academic background — degrees, institutions and grades, backend-driven. */
export function EducationSection() {
  const theme = useTheme();
  const { content, active } = useEducation();

  if (!active || content.items.length === 0) return null;

  return (
    <View className="px-5">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      <View className="gap-3">
        {content.items.map((item) => (
          <Card key={item.key} mode="elevated" style={primaryShadow(theme.colors.primary)}>
            <Card.Title
              title={item.degree}
              titleNumberOfLines={2}
              titleStyle={{ fontWeight: '800' }}
              subtitle={`${item.institution}${item.period ? ` · ${item.period}` : ''}`}
              left={(props) => <Avatar.Icon {...props} size={40} icon={item.icon} />}
            />
            <Card.Content style={{ gap: 8 }}>
              {item.grade ? (
                <View className="flex-row">
                  <Chip mode="flat" compact icon="star">
                    {item.grade}
                  </Chip>
                </View>
              ) : null}
              {item.description ? (
                <Text variant="bodySmall" style={{ opacity: 0.75 }}>
                  {item.description}
                </Text>
              ) : null}
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
}
