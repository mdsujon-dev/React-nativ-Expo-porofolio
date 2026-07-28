import { useState } from 'react';
import { View } from 'react-native';
import { Button, Card, HelperText, List, Text, TextInput } from 'react-native-paper';

import { SectionHeader } from '@/components/shared';

const INFO: { icon: string; label: string; value: string }[] = [
  { icon: 'email', label: 'Email', value: 'sujonthezoomit@gmail.com' },
  { icon: 'github', label: 'GitHub', value: '@sujon-258549' },
  { icon: 'map-marker', label: 'Location', value: 'Dhaka, Bangladesh' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** "Let's work together" — contact info plus a Material contact form. */
export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const emailValid = EMAIL_REGEX.test(email);
  const canSubmit = name.trim().length > 0 && emailValid && message.trim().length > 0;

  const update = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    if (sent) setSent(false);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <View className="px-5">
      <SectionHeader
        label="Get In Touch"
        title="Let's Work Together"
        subtitle="Have a project in mind? Send me a message and let's build it"
      />

      <Card mode="elevated">
        {INFO.map((item) => (
          <List.Item
            key={item.label}
            title={item.value}
            description={item.label}
            titleStyle={{ fontWeight: '700' }}
            left={(props) => <List.Icon {...props} icon={item.icon} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        ))}
      </Card>

      <Card mode="elevated" style={{ marginTop: 16 }}>
        <Card.Content>
          <View className="gap-3 py-1">
            <Text variant="titleMedium" style={{ fontWeight: '700' }}>
              Send a message
            </Text>

            <TextInput
              label="Name"
              value={name}
              onChangeText={update(setName)}
              mode="outlined"
              left={<TextInput.Icon icon="account" />}
            />

            <View>
              <TextInput
                label="Email"
                value={email}
                onChangeText={update(setEmail)}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={email.length > 0 && !emailValid}
                left={<TextInput.Icon icon="email" />}
              />
              <HelperText type="error" visible={email.length > 0 && !emailValid}>
                Please enter a valid email address
              </HelperText>
            </View>

            <TextInput
              label="Message"
              value={message}
              onChangeText={update(setMessage)}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={{ minHeight: 110 }}
            />

            <Button mode="contained" icon="send" onPress={handleSubmit} disabled={!canSubmit}>
              Send Message
            </Button>

            {sent ? (
              <HelperText type="info" visible style={{ textAlign: 'center' }}>
                ✅ Thanks! Your message has been sent.
              </HelperText>
            ) : null}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
