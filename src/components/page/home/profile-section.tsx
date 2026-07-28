import { View } from 'react-native';
import { Avatar, Card, Text, useTheme } from 'react-native-paper';

import { useAbout } from '@/api/dynamic-content';
import { SectionHeader } from '@/components/shared';
import { primaryShadow } from '@/constants/shadow';

/** About / profile section: headline, photo, bio and quick stats (backend-driven). */
export function ProfileSection() {
  const theme = useTheme();
  const { content } = useAbout();

  return (
    <View className="px-5">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      <Card mode="elevated" style={primaryShadow(theme.colors.primary)}>
        <Card.Content style={{ alignItems: 'center', gap: 12, paddingVertical: 22 }}>
          <Text variant="titleLarge" style={{ fontWeight: '800' }}>
            {content.name}
          </Text>
          <Text variant="bodyMedium" style={{ opacity: 0.7, textAlign: 'center' }}>
            {content.bio}
          </Text>
        </Card.Content>
      </Card>

      <View className="mt-3 flex-row gap-3">
        {content.stats.map((stat) => (
          <Card
            key={stat.label}
            mode="elevated"
            style={{ flex: 1, ...primaryShadow(theme.colors.primary, false) }}>
            <Card.Content style={{ alignItems: 'center', gap: 4, paddingVertical: 16 }}>
              <Avatar.Icon size={40} icon={stat.icon} />
              <Text variant="titleMedium" style={{ fontWeight: '900' }}>
                {stat.value}
              </Text>
              <Text variant="bodySmall" style={{ opacity: 0.7, textAlign: 'center' }}>
                {stat.label}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
}
