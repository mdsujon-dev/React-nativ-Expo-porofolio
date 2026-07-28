import { View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';

import { SectionHeader } from '@/components/shared';

const STATS: { icon: string; value: string; label: string }[] = [
  { icon: 'briefcase-check', value: '3+', label: 'Years Exp.' },
  { icon: 'rocket-launch', value: '20+', label: 'Projects' },
  { icon: 'account-group', value: '15+', label: 'Clients' },
];

/** About / profile section: headline, photo, bio and quick stats. */
export function ProfileSection() {
  return (
    <View className="px-5">
      <SectionHeader
        label="About Me"
        title="Expert Full Stack Developer"
        subtitle="Building scalable web & mobile solutions that users love"
      />

      <Card mode="elevated">
        <Card.Content style={{ alignItems: 'center', gap: 12, paddingVertical: 22 }}>
          <Avatar.Icon size={96} icon="account" />
          <Text variant="titleLarge" style={{ fontWeight: '800' }}>
            Sujon
          </Text>
          <Text variant="bodyMedium" style={{ opacity: 0.7, textAlign: 'center' }}>
            I build fast, delightful web & mobile apps with React, React Native, Node and modern
            tooling. I care about clean architecture, performance and pixel-perfect UI on every
            platform.
          </Text>
        </Card.Content>
      </Card>

      <View className="mt-3 flex-row gap-3">
        {STATS.map((stat) => (
          <Card key={stat.label} mode="elevated" style={{ flex: 1 }}>
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
