import { Linking, View } from 'react-native';
import { ActivityIndicator, Button, Card, Chip, Icon, Text, useTheme } from 'react-native-paper';

import { projectTags, useProjects, type Project } from '@/api/projects';
import { SectionHeader } from '@/components/shared';

/** Projects loaded live from the backend, with loading + error states. */
export function ProjectsSection() {
  const theme = useTheme();
  const { data: projects, isLoading, isError, error, refetch, isFetching } = useProjects();

  const openUrl = (url?: string) => {
    if (url) Linking.openURL(url).catch(() => {});
  };

  return (
    <View className="px-5">
      <SectionHeader
        label="My Creative Works"
        title="Featured Projects"
        subtitle="A selection of things I've designed and built"
      />

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
          <Card key={project._id} mode="elevated" style={{ overflow: 'hidden' }}>
            <Card.Cover source={{ uri: project.thumbnail }} style={{ height: 160 }} />

            <Card.Content style={{ paddingTop: 16, gap: 8 }}>
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

            <View className="flex-row gap-3 px-4 pb-4 pt-3">
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
          </Card>
        ))}
      </View>
    </View>
  );
}
