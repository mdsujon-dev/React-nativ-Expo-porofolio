import { useState } from 'react';
import { View } from 'react-native';
import { Button, Card, HelperText, List, Text, TextInput, useTheme } from 'react-native-paper';

import { useSendMessage } from '@/api/contact';
import { useContact } from '@/api/dynamic-content';
import { SectionHeader } from '@/components/shared';
import { primaryShadow } from '@/constants/shadow';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** "Let's work together" — contact info plus a Material contact form. */
export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const theme = useTheme();
  const { mutate, isPending, isSuccess, isError, error, reset } = useSendMessage();
  const { content } = useContact();

  const emailValid = EMAIL_REGEX.test(email);
  const canSubmit =
    name.trim().length > 0 &&
    emailValid &&
    subject.trim().length > 0 &&
    message.trim().length > 0;

  const update = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    if (isSuccess || isError) reset();
  };

  const handleSubmit = () => {
    if (!canSubmit || isPending) return;
    mutate(
      {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
        },
      }
    );
  };

  return (
    <View className="px-5">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      <Card mode="elevated" style={primaryShadow(theme.colors.primary)}>
        {content.info.map((item) => (
          <List.Item
            key={item.key}
            title={item.value}
            description={item.label}
            titleStyle={{ fontWeight: '700' }}
            left={(props) => <List.Icon {...props} icon={item.icon} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        ))}
      </Card>

      <Card mode="elevated" style={{ marginTop: 16, ...primaryShadow(theme.colors.primary) }}>
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
              outlineStyle={{ borderRadius: 12 }}
              left={<TextInput.Icon icon="account" />}
            />

            <View>
              <TextInput
                label="Email"
                value={email}
                onChangeText={update(setEmail)}
                mode="outlined"
                outlineStyle={{ borderRadius: 12 }}
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
              label="Subject"
              value={subject}
              onChangeText={update(setSubject)}
              mode="outlined"
              outlineStyle={{ borderRadius: 12 }}
              left={<TextInput.Icon icon="format-title" />}
            />

            <TextInput
              label="Message"
              value={message}
              onChangeText={update(setMessage)}
              mode="outlined"
              outlineStyle={{ borderRadius: 12 }}
              multiline
              numberOfLines={4}
              style={{ minHeight: 110 }}
            />

            <Button
              mode="contained"
              icon="send"
              onPress={handleSubmit}
              loading={isPending}
              disabled={!canSubmit || isPending}>
              Send Message
            </Button>

            {isSuccess ? (
              <HelperText type="info" visible style={{ textAlign: 'center' }}>
                ✅ Thanks! Your message has been sent.
              </HelperText>
            ) : null}
            {isError ? (
              <HelperText type="error" visible style={{ textAlign: 'center' }}>
                {error instanceof Error ? error.message : 'Something went wrong. Please try again.'}
              </HelperText>
            ) : null}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
