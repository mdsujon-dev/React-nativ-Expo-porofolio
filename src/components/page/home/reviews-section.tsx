import { View } from 'react-native';
import { Avatar, Card, Icon, Text, useTheme } from 'react-native-paper';

import { useReviewHeader } from '@/api/dynamic-content';
import { useReviews } from '@/api/reviews';
import { SectionHeader } from '@/components/shared';
import { primaryShadow } from '@/constants/shadow';

/** Star row for a review rating. */
function Stars({ rating }: { rating: number }) {
  return (
    <View className="flex-row gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} source={i < rating ? 'star' : 'star-outline'} size={16} color="#f59e0b" />
      ))}
    </View>
  );
}

/** Client testimonials — header is backend-driven, cards come from /reviews. */
export function ReviewsSection() {
  const theme = useTheme();
  const { content, active } = useReviewHeader();
  const { data: reviews } = useReviews();

  // Hide when the header is toggled off or there are no active reviews.
  if (!active || !reviews || reviews.length === 0) return null;

  return (
    <View className="px-5">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      <View className="gap-3">
        {reviews.map((review) => (
          <Card key={review._id} mode="elevated" style={primaryShadow(theme.colors.primary)}>
            <Card.Content style={{ gap: 10, paddingVertical: 18 }}>
              <Icon source="format-quote-open" size={26} color={theme.colors.primary} />
              <Text variant="bodyMedium" style={{ opacity: 0.8, lineHeight: 21 }}>
                {review.content}
              </Text>
              {typeof review.rating === 'number' ? <Stars rating={review.rating} /> : null}
              <View className="mt-1 flex-row items-center gap-3">
                <Avatar.Text
                  size={40}
                  label={(review.name || '?').charAt(0).toUpperCase()}
                />
                <View className="flex-1">
                  <Text variant="titleSmall" style={{ fontWeight: '800' }}>
                    {review.name}
                  </Text>
                  <Text variant="bodySmall" style={{ opacity: 0.65 }}>
                    {[review.role, review.company].filter(Boolean).join(' · ')}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
}
