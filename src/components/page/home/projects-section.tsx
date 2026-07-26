import { LinearGradient } from 'expo-linear-gradient';
import { Linking, View } from 'react-native';
import { Avatar, Button, Card, Chip, Icon, Text, useTheme } from 'react-native-paper';

import { PurpleGradient } from '@/constants/palette';

const PROJECTS: {
  title: string;
  category: string;
  icon: string;
  description: string;
  tags: string[];
  demoUrl: string;
  codeUrl: string;
}[] = [
  {
    title: 'MealBox Services',
    category: 'Full Stack App',
    icon: 'silverware-fork-knife',
    description:
      'A full-stack food delivery web app connecting customers with meal providers using Next.js, Node and MongoDB.',
    tags: ['next js', 'node js', 'express', 'shadcn', 'tailwind', 'mongoose', 'mongodb', 'jwt', 'argon js'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/sujon-258549',
  },
  {
    title: 'Mobile Commerce',
    category: 'React Native App',
    icon: 'cart',
    description:
      'A cross-platform shopping experience with cart, checkout, Stripe payments and push notifications.',
    tags: ['react native', 'expo', 'stripe', 'reanimated', 'zustand'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/sujon-258549',
  },
  {
    title: 'Task Manager',
    category: 'Productivity App',
    icon: 'check-circle',
    description:
      'An offline-first productivity app with local persistence, reminders and background sync.',
    tags: ['react native', 'sqlite', 'expo', 'notifications'],
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com/sujon-258549',
  },
];

/** Project cards: cover, category label, title, description, tags and actions. */
export function ProjectsSection() {
  const theme = useTheme();

  const openUrl = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View className="px-5">
      <Text variant="titleLarge" style={{ fontWeight: '800', marginBottom: 12 }}>
        Projects
      </Text>

      <View className="gap-4">
        {PROJECTS.map((project) => (
          <Card key={project.title} mode="elevated" style={{ overflow: 'hidden' }}>
            <LinearGradient
              colors={PurpleGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ height: 140, alignItems: 'center', justifyContent: 'center' }}>
              <Avatar.Icon
                size={56}
                icon={project.icon}
                color="#ffffff"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              />
            </LinearGradient>

            <Card.Content style={{ paddingTop: 16, gap: 8 }}>
              <View className="flex-row items-center gap-2">
                <Icon source="rocket-launch" size={16} color={theme.colors.primary} />
                <Text
                  variant="labelMedium"
                  style={{ color: theme.colors.primary, fontWeight: '800', letterSpacing: 1 }}>
                  {project.category.toUpperCase()}
                </Text>
              </View>

              <Text variant="titleLarge" style={{ fontWeight: '800' }}>
                {project.title}
              </Text>
              <Text variant="bodyMedium" style={{ opacity: 0.7 }}>
                {project.description}
              </Text>

              <View className="mt-1 flex-row flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Chip key={tag} mode="flat" compact>
                    {tag}
                  </Chip>
                ))}
              </View>
            </Card.Content>

            <View className="flex-row gap-3 px-4 pb-4 pt-3">
              <Button
                mode="contained"
                icon="open-in-new"
                onPress={() => openUrl(project.demoUrl)}
                style={{ flex: 1 }}>
                Live Demo
              </Button>
              <Button
                mode="contained-tonal"
                icon="github"
                onPress={() => openUrl(project.codeUrl)}
                style={{ flex: 1 }}>
                View Code
              </Button>
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
}
