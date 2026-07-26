import { useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export type TextFieldProps = TextInputProps & {
  label?: string;
  error?: string;
};

/** Labeled, themed text input with focus + error states. */
export function TextField({ label, error, style, ...rest }: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const color = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');
  const icon = useThemeColor({}, 'icon');

  const borderColor = error ? '#e5484d' : focused ? tint : icon;

  return (
    <View style={styles.container}>
      {label ? <ThemedText type="defaultSemiBold">{label}</ThemedText> : null}
      <TextInput
        style={[styles.input, { color, borderColor }, style]}
        placeholderTextColor={icon}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
      {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    width: '100%',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  error: {
    color: '#e5484d',
    fontSize: 13,
  },
});
