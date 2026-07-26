import { View } from 'react-native';
import { Avatar, Card, Chip, Text } from 'react-native-paper';

const SKILL_GROUPS: { title: string; icon: string; skills: string[] }[] = [
  {
    title: 'Frontend',
    icon: 'cellphone',
    skills: ['React Native', 'React', 'Expo', 'NativeWind', 'TypeScript'],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'PostgreSQL'],
  },
  {
    title: 'Tools',
    icon: 'tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'EAS'],
  },
  {
    title: 'Soft Skills',
    icon: 'account-heart',
    skills: ['Communication', 'Teamwork', 'Problem Solving', 'Adaptability'],
  },
  {
    title: 'Other',
    icon: 'dots-horizontal',
    skills: ['Reanimated', 'CI / CD', 'Jest', 'Agile'],
  },
];

/** Skills grouped into categories, each in a Material card. */
export function SkillsSection() {
  return (
    <View className="px-5">
      <Text variant="titleLarge" style={{ fontWeight: '800', marginBottom: 12 }}>
        Skills
      </Text>

      <View className="gap-3">
        {SKILL_GROUPS.map((group) => (
          <Card key={group.title} mode="elevated">
            <Card.Content>
              <View className="mb-3 flex-row items-center gap-3">
                <Avatar.Icon size={34} icon={group.icon} />
                <Text variant="titleMedium" style={{ fontWeight: '700' }}>
                  {group.title}
                </Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Chip key={skill} mode="flat" compact>
                    {skill}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
}
