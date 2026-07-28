import { View } from 'react-native';
import { Avatar, Card, Chip, Text } from 'react-native-paper';

import { SectionHeader } from '@/components/shared';

const SKILL_GROUPS: { title: string; icon: string; skills: string[] }[] = [
  {
    title: 'Frontend',
    icon: 'cellphone',
    skills: ['React Native', 'React', 'Next.js', 'Expo', 'NativeWind', 'TypeScript'],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Tools',
    icon: 'tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'EAS', 'Docker'],
  },
  {
    title: 'Soft Skills',
    icon: 'account-heart',
    skills: ['Communication', 'Teamwork', 'Problem Solving', 'Adaptability'],
  },
];

/** Skills grouped into categories, each in a Material card. */
export function SkillsSection() {
  return (
    <View className="px-5">
      <SectionHeader
        label="Technical Skills & Expertise"
        title="Core Technologies & Proficiencies"
        subtitle="The tools and technologies I use to bring ideas to life"
      />

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
