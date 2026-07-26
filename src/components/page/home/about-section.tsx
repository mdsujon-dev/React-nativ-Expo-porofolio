import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

/** "About me" Material card. */
export function AboutSection() {
  return (
    <View className="px-5">
      <Text variant="titleLarge" style={{ fontWeight: '800', marginBottom: 12 }}>
        About
      </Text>
      <Card mode="elevated">
        <Card.Content>
          <Text variant="bodyMedium">
            I build fast, delightful mobile apps with React Native and Expo. I care about clean
            architecture, smooth animations and pixel-perfect UI on both iOS and Android — turning
            ideas into polished products people love to use.
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}
