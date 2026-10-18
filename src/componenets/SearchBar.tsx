import React, { useRef } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {
  colors,
  fontSize,
  radius,
  spacing,
  TOUCH_TARGET,
} from '../theme/theme';

interface SearchBarProps
  extends Omit<TextInputProps, 'value' | 'onChangeText' | 'style'> {
  /** Current search text. The parent owns this value (controlled input). */
  value: string;
  /** Called on every keystroke with the new text. */
  onChangeText: (text: string) => void;
  /** Placeholder shown while the box is empty. */
  placeholder?: string;
  /** Extra style for the outer container. */
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * A search box with a clear (x) button.
 * It is "controlled": it stores nothing itself. The screen keeps the
 * search text in its own state and filters the list from it.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  containerStyle,
  ...inputProps
}) => {
  const inputRef = useRef<TextInput>(null);
  const hasText = value.length > 0;

  const handleClear = () => {
    onChangeText('');
    inputRef.current?.focus();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.icon} accessibilityElementsHidden>
        {'\u2315'}
      </Text>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        accessibilityLabel={placeholder}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="never"
        style={styles.input}
        {...inputProps}
      />

      {hasText && (
        <Pressable
          onPress={handleClear}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={8}
          style={styles.clearButton}
        >
          <Text style={styles.clearText}>{'\u2715'}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: TOUCH_TARGET,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  icon: {
    fontSize: fontSize.lg,
    color: colors.textMuted,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  clearButton: {
    width: 28,
    height: 28,
    marginLeft: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
});