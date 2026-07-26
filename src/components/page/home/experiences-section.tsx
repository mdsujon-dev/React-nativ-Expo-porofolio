import { View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';

const EXPERIENCES = [
  {
    role: 'Senior React Native Developer',
    company: 'Zoomit',
    period: '2023 — Present',
    description: 'Leading mobile development, building reusable UI systems and shipping features.',
  },
  {
    role: 'Mobile App Developer',
    company: 'Freelance',
    period: '2021 — 2023',
    description: 'Delivered cross-platform apps for startups with Expo, animations and offline sync.',
  },
  {
    role: 'Frontend Developer',
    company: 'Agency',
    period: '2020 — 2021',
    description: 'Built responsive web apps with React and collaborated closely with designers.',
  },
];

/** Experience timeline as Material cards. */
export function ExperiencesSection() {
  return (
    <View className="px-5">
      <Text variant="titleLarge" style={{ fontWeight: '800', marginBottom: 12 }}>
        Experience
      </Text>
      <View className="gap-3">
        {EXPERIENCES.map((item) => (
          <Card key={item.role} mode="elevated">
            <Card.Title
              title={item.role}
              titleStyle={{ fontWeight: '700' }}
              subtitle={`${item.company} · ${item.period}`}
              left={(props) => <Avatar.Icon {...props} size={40} icon="briefcase" />}
            />
            <Card.Content>
              <Text variant="bodySmall">{item.description}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
}
