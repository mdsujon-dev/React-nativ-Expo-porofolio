import { View } from 'react-native';
import { Card, List, Text, useTheme } from 'react-native-paper';

import { useFaq } from '@/api/dynamic-content';
import { SectionHeader } from '@/components/shared';
import { primaryShadow } from '@/constants/shadow';

/** Frequently asked questions as collapsible accordions, backend-driven. */
export function FaqSection() {
  const theme = useTheme();
  const { content, active } = useFaq();

  if (!active || content.items.length === 0) return null;

  return (
    <View className="px-5">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      <Card mode="elevated" style={{ overflow: 'hidden', ...primaryShadow(theme.colors.primary) }}>
        <List.AccordionGroup>
          {content.items.map((item, index) => (
            <View key={item.key}>
              {index > 0 ? <View style={{ height: 1, backgroundColor: theme.colors.surfaceVariant }} /> : null}
              <List.Accordion
                id={item.key}
                title={item.question}
                titleNumberOfLines={3}
                titleStyle={{ fontWeight: '700', fontSize: 15 }}
                left={(props) => <List.Icon {...props} icon="help-circle-outline" />}>
                <View className="px-4 pb-3 pt-1">
                  <Text variant="bodyMedium" style={{ opacity: 0.75 }}>
                    {item.answer}
                  </Text>
                </View>
              </List.Accordion>
            </View>
          ))}
        </List.AccordionGroup>
      </Card>
    </View>
  );
}
