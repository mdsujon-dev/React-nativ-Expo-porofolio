import { router } from 'expo-router';
import { Linking, View } from 'react-native';
import { ActivityIndicator, Button, Card, Chip, Icon, Text, useTheme } from 'react-native-paper';

import { useProjectHeader } from '@/api/dynamic-content';
import { projectTags, useProjects, type Project } from '@/api/projects';
import { SectionHeader } from '@/components/shared';
import { primaryShadow } from '@/constants/shadow';

/** Projects loaded live from the backend, with loading + error states. */
export function ProjectsSection() {
  const theme = useTheme();
  const { data: projects, isLoading, isError, error, refetch, isFetching } = useProjects();
  const { content: header } = useProjectHeader();

  const openUrl = (url?: string) => {
    if (url) Linking.openURL(url).catch(() => {});
  };

  return (
    <View className="px-5">
      <SectionHeader label={header.label} title={header.title} subtitle={header.subtitle} />

      {isLoading ? (
        <View className="items-center py-10">
          <ActivityIndicator />
        </View>
      ) : null}

      {isError ? (
        <Card mode="elevated">
          <Card.Content style={{ alignItems: 'center', gap: 10, paddingVertical: 24 }}>
            <Icon source="cloud-off-outline" size={32} color={theme.colors.error} />
            <Text variant="bodyMedium" style={{ textAlign: 'center', opacity: 0.8 }}>
              {error instanceof Error ? error.message : "Couldn't load projects"}
            </Text>
            <Button mode="contained-tonal" icon="refresh" loading={isFetching} onPress={() => refetch()}>
              Retry
            </Button>
          </Card.Content>
        </Card>
      ) : null}

      <View className="gap-4">
        {projects?.map((project: Project) => (
          <Card
            key={project._id}
            mode="elevated"
            onPress={() => router.push(`/project/${project._id}`)}
            style={{ overflow: 'hidden', ...primaryShadow(theme.colors.primary) }}>
            <Card.Cover source={{ uri: project.thumbnail }} style={{ height: 220 }} />

            <Card.Content style={{ paddingTop: 20, paddingBottom: 4, gap: 10 }}>
              <View className="flex-row items-center gap-2">
                <Icon source="rocket-launch" size={16} color={theme.colors.primary} />
                <Text
                  variant="labelMedium"
                  style={{ color: theme.colors.primary, fontWeight: '800', letterSpacing: 1 }}>
                  {project.category?.toUpperCase()}
                </Text>
              </View>

              <Text variant="titleLarge" style={{ fontWeight: '800' }}>
                {project.title}
              </Text>
              <Text variant="bodyMedium" numberOfLines={3} style={{ opacity: 0.7 }}>
                {project.shortDescription}
              </Text>

              <View className="mt-1 flex-row flex-wrap gap-2">
                {projectTags(project).map((tag) => (
                  <Chip key={tag} mode="flat" compact>
                    {tag}
                  </Chip>
                ))}
              </View>
            </Card.Content>

            <View className="gap-2 px-4 pb-4 pt-3">
              <View className="flex-row gap-3">
                <Button
                  mode="contained"
                  icon="open-in-new"
                  onPress={() => openUrl(project.liveUrl)}
                  disabled={!project.liveUrl}
                  style={{ flex: 1 }}>
                  Live Demo
                </Button>
                <Button
                  mode="contained-tonal"
                  icon="github"
                  onPress={() => openUrl(project.githubUrl)}
                  disabled={!project.githubUrl}
                  style={{ flex: 1 }}>
                  View Code
                </Button>
              </View>
              <Button
                mode="text"
                icon="arrow-right"
                contentStyle={{ flexDirection: 'row-reverse' }}
                onPress={() => router.push(`/project/${project._id}`)}>
                View Details
              </Button>
            </View>
          </Card>
        ))}
      </View>
    </View>
  );
}
