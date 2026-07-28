import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { Avatar, Chip, Text, useTheme } from 'react-native-paper';

import { useSkills } from '@/api/dynamic-content';
import { SectionHeader } from '@/components/shared';
import { glassStyle } from '@/constants/glass';

/** Skills grouped into categories, each in a frosted-glass card (backend-driven). */
export function SkillsSection() {
  const theme = useTheme();
  const { content } = useSkills();
  const glass = glassStyle(theme.dark);
  const chipBg = theme.dark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.55)';

  return (
    <View className="px-5">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      <View className="gap-3">
        {content.groups.map((group) => (
          <View key={group.key} style={glass.container}>
            <LinearGradient
              colors={glass.sheen}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <View style={{ padding: 16 }}>
              <View className="mb-3 flex-row items-center gap-3">
                <Avatar.Icon
                  size={34}
                  icon={group.icon}
                  color="#fff"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <Text variant="titleMedium" style={{ fontWeight: '800' }}>
                  {group.title}
                </Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Chip
                    key={skill}
                    mode="flat"
                    compact
                    style={{ backgroundColor: chipBg }}>
                    {skill}
                  </Chip>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
