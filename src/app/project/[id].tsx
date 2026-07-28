import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Icon,
  IconButton,
  type MD3Theme,
  Text,
  useTheme,
} from 'react-native-paper';

import { useProject, type ProjectTechnologies } from '@/api/projects';
import { ScreenContainer } from '@/components/layout';
import { primaryShadow } from '@/constants/shadow';

const openUrl = (url?: string) => {
  if (url) Linking.openURL(url).catch(() => {});
};

const TECH_GROUPS: { key: keyof ProjectTechnologies; label: string; icon: string }[] = [
  { key: 'frontend', label: 'Frontend', icon: 'cellphone' },
  { key: 'backend', label: 'Backend', icon: 'server' },
  { key: 'database', label: 'Database', icon: 'database' },
  { key: 'tools', label: 'Tools', icon: 'tools' },
];

/** Professional project details screen with hero image, overview, tech and more. */
export default function ProjectDetailsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: project, isLoading, isError } = useProject(id);

  if (isLoading) {
    return (
      <ScreenContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </ScreenContainer>
    );
  }

  if (isError || !project) {
    return (
      <ScreenContainer
        style={{ alignItems: 'center', justifyContent: 'center', gap: 14, padding: 24 }}>
        <Icon source="alert-circle-outline" size={40} color={theme.colors.error} />
        <Text variant="titleMedium">Project not found</Text>
        <Button mode="contained-tonal" icon="arrow-left" onPress={() => router.back()}>
          Go back
        </Button>
      </ScreenContainer>
    );
  }

  const meta = [
    project.duration ? { icon: 'clock-outline', text: project.duration } : null,
    project.role ? { icon: 'account-outline', text: project.role } : null,
  ].filter(Boolean) as { icon: string; text: string }[];

  const hasTech =
    !!project.technologies &&
    TECH_GROUPS.some((g) => (project.technologies?.[g.key]?.length ?? 0) > 0);

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero image with gradient overlay + floating back button + title */}
        <View style={{ height: 300 }}>
          <Image
            source={{ uri: project.thumbnail }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.85)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={{ position: 'absolute', top: insets.top + 4, left: 4 }}>
            <IconButton
              icon="arrow-left"
              iconColor="#fff"
              size={26}
              mode="contained"
              containerColor="rgba(0,0,0,0.35)"
              onPress={() => router.back()}
            />
          </View>
          <View style={{ position: 'absolute', left: 20, right: 20, bottom: 18, gap: 8 }}>
            <View className="flex-row">
              <Chip
                compact
                textStyle={{ color: '#fff', fontWeight: '700' }}
                style={{ backgroundColor: 'rgba(255,255,255,0.22)' }}>
                {project.category}
              </Chip>
            </View>
            <Text style={{ color: '#fff', fontSize: 28, fontWeight: '900' }}>{project.title}</Text>
            {meta.length > 0 ? (
              <View className="flex-row flex-wrap gap-x-4 gap-y-1">
                {meta.map((m) => (
                  <View key={m.text} className="flex-row items-center gap-1.5">
                    <Icon source={m.icon} size={15} color="rgba(255,255,255,0.9)" />
                    <Text style={{ color: 'rgba(255,255,255,0.9)' }} variant="bodySmall">
                      {m.text}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </View>

        <View className="gap-5 px-5 pt-5">
          {/* Action buttons */}
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

          {/* Overview */}
          <Section title="Overview" icon="text-box-outline" theme={theme}>
            <Text variant="bodyMedium" style={{ opacity: 0.8, lineHeight: 22 }}>
              {project.shortDescription}
            </Text>
          </Section>

          {/* Long description */}
          {project.longDescription ? (
            <Section title="About this project" icon="information-outline" theme={theme}>
              <Text variant="bodyMedium" style={{ opacity: 0.78, lineHeight: 22 }}>
                {project.longDescription.trim()}
              </Text>
            </Section>
          ) : null}

          {/* Key features */}
          {project.features?.length ? (
            <Section title="Key Features" icon="star-outline" theme={theme}>
              <View className="gap-2">
                {project.features.map((feature) => (
                  <View key={feature} className="flex-row gap-2">
                    <View style={{ marginTop: 3 }}>
                      <Icon source="check-circle" size={16} color={theme.colors.primary} />
                    </View>
                    <Text variant="bodyMedium" style={{ flex: 1, opacity: 0.82 }}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </Section>
          ) : null}

          {/* Tech stack */}
          {hasTech ? (
            <Section title="Tech Stack" icon="layers-triple-outline" theme={theme}>
              <View className="gap-3">
                {TECH_GROUPS.map((group) => {
                  const items = project.technologies?.[group.key] ?? [];
                  if (items.length === 0) return null;
                  return (
                    <View key={group.key} className="gap-2">
                      <View className="flex-row items-center gap-2">
                        <Icon source={group.icon} size={16} color={theme.colors.primary} />
                        <Text variant="labelLarge" style={{ fontWeight: '800' }}>
                          {group.label}
                        </Text>
                      </View>
                      <View className="flex-row flex-wrap gap-2">
                        {items.map((tech) => (
                          <Chip key={tech} mode="flat" compact>
                            {tech}
                          </Chip>
                        ))}
                      </View>
                    </View>
                  );
                })}
              </View>
            </Section>
          ) : null}

          {/* Challenges & solutions */}
          {project.challenges ? (
            <Section title="Challenges" icon="alert-decagram-outline" theme={theme}>
              <Text variant="bodyMedium" style={{ opacity: 0.8, lineHeight: 22 }}>
                {project.challenges}
              </Text>
            </Section>
          ) : null}
          {project.solutions ? (
            <Section title="Solutions" icon="lightbulb-on-outline" theme={theme}>
              <Text variant="bodyMedium" style={{ opacity: 0.8, lineHeight: 22 }}>
                {project.solutions}
              </Text>
            </Section>
          ) : null}

          {/* Gallery */}
          {project.gallery?.length ? (
            <Section title="Gallery" icon="image-multiple-outline" theme={theme}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}>
                {project.gallery.map((uri) => (
                  <Image
                    key={uri}
                    source={{ uri }}
                    style={{ width: 260, height: 160, borderRadius: 14 }}
                    contentFit="cover"
                  />
                ))}
              </ScrollView>
            </Section>
          ) : null}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

/** A titled content block used throughout the details page. */
function Section({
  title,
  icon,
  theme,
  children,
}: {
  title: string;
  icon: string;
  theme: MD3Theme;
  children: React.ReactNode;
}) {
  return (
    <Card mode="elevated" style={primaryShadow(theme.colors.primary, false)}>
      <Card.Content style={{ gap: 12, paddingVertical: 18 }}>
        <View className="flex-row items-center gap-2">
          <Icon source={icon} size={18} color={theme.colors.primary} />
          <Text variant="titleMedium" style={{ fontWeight: '800' }}>
            {title}
          </Text>
        </View>
        {children}
      </Card.Content>
    </Card>
  );
}
