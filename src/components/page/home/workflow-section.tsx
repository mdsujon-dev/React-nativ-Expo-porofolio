import { View } from 'react-native';
import { Avatar, Card, Text, useTheme } from 'react-native-paper';

import { useWorkflow } from '@/api/dynamic-content';
import { SectionHeader } from '@/components/shared';
import { primaryShadow } from '@/constants/shadow';

/** "How I work" — numbered process steps, backend-driven. */
export function WorkflowSection() {
  const theme = useTheme();
  const { content, active } = useWorkflow();

  if (!active || content.steps.length === 0) return null;

  return (
    <View className="px-5">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      <View className="gap-3">
        {content.steps.map((step) => (
          <Card key={step.key} mode="elevated" style={primaryShadow(theme.colors.primary, false)}>
            <Card.Content style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16 }}>
              <View className="items-center" style={{ width: 48 }}>
                <Avatar.Icon size={40} icon={step.icon} />
                <Text
                  variant="labelSmall"
                  style={{ color: theme.colors.primary, fontWeight: '900', marginTop: 4 }}>
                  {step.stepNumber}
                </Text>
              </View>
              <View className="flex-1 gap-1">
                <Text variant="titleMedium" style={{ fontWeight: '800' }}>
                  {step.title}
                </Text>
                <Text variant="bodySmall" style={{ opacity: 0.7 }}>
                  {step.description}
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
}
