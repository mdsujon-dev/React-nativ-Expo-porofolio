import { View } from 'react-native';
import { Avatar, Card, Icon, Text, useTheme } from 'react-native-paper';

import { SectionHeader } from '@/components/shared';

const EXPERIENCES: {
  role: string;
  company: string;
  period: string;
  achievements: string[];
}[] = [
  {
    role: 'Senior React Native Developer',
    company: 'Zoomit',
    period: '2023 — Present',
    achievements: [
      'Led mobile development and built a reusable UI component system.',
      'Improved app performance and reduced crash rate significantly.',
      'Shipped features used by thousands of users across iOS & Android.',
    ],
  },
  {
    role: 'Mobile App Developer',
    company: 'Freelance',
    period: '2021 — 2023',
    achievements: [
      'Delivered cross-platform apps for startups with Expo.',
      'Implemented offline-first sync and smooth animations.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Agency',
    period: '2020 — 2021',
    achievements: [
      'Built responsive web apps with React and Next.js.',
      'Collaborated closely with designers to ship pixel-perfect UI.',
    ],
  },
];

/** Work experience with achievements. */
export function ExperiencesSection() {
  const theme = useTheme();

  return (
    <View className="px-5">
      <SectionHeader
        label="Career Journey"
        title="Work Experience"
        subtitle="Roles and impact across my professional journey"
      />

      <View className="gap-3">
        {EXPERIENCES.map((item) => (
          <Card key={item.role} mode="elevated">
            <Card.Title
              title={item.role}
              titleStyle={{ fontWeight: '700' }}
              subtitle={`${item.company} · ${item.period}`}
              left={(props) => <Avatar.Icon {...props} size={40} icon="briefcase" />}
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
