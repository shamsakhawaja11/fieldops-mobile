import React, { forwardRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {
  colors,
  fontSize,
  fontWeight,
  radius,
  spacing,
  TOUCH_TARGET,
} from '../theme/theme';

interface TextFieldProps extends TextInputProps {
  /** Label shown above the input. */
  label: string;
  /** Validation message. When present, the field turns red. */
  error?: string;
  /** Small helper text shown below the input when there is no error. */
  hint?: string;
  /** Adds a red asterisk next to the label. */
  required?: boolean;
  /** Extra style for the outer wrapper (spacing between fields, etc.). */
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * A labeled text input with error and hint support.
 * forwardRef lets a parent focus this field programmatically,
 * for example moving from "phone" to "address" when the user
 * presses "Next" on the keyboard.
 */
export const TextField = forwardRef<TextInput, TextFieldProps>(
  (
    {
      label,
      error,
      hint,
      required = false,
      containerStyle,
      multiline,
      style,
      onFocus,
      onBlur,
      ...inputProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasError = Boolean(error);

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>

        <TextInput
          ref={ref}
          multiline={multiline}
          placeholderTextColor={colors.textMuted}
          accessibilityLabel={label}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            styles.input,
            multiline && styles.multiline,
            isFocused && styles.inputFocused,
            hasError && styles.inputError,
            style,
          ]}
          {...inputProps}
        />

        {hasError ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : hint ? (
          <Text style={styles.hintText}>{hint}</Text>
        ) : null}
      </View>
    );
  },
);

TextField.displayName = 'TextField';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  required: {
    color: colors.danger,
  },
  input: {
    minHeight: TOUCH_TARGET,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  multiline: {
    minHeight: 96,
    paddingTop: spacing.sm + 2,
    textAlignVertical: 'top',
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    marginTop: spacing.xs,
    fontSize: fontSize.xs,
    color: colors.danger,
  },
  hintText: {
    marginTop: spacing.xs,
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
});