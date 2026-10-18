import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
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

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  /** Text shown inside the button. */
  label: string;
  /** Visual style. Defaults to "primary". */
  variant?: ButtonVariant;
  /** Shows a spinner and blocks presses while an action is running. */
  loading?: boolean;
  /** Stretches the button to the full width of its parent. */
  fullWidth?: boolean;
  /** Optional extra style for the outer container. */
  style?: StyleProp<ViewStyle>;
}

interface VariantStyle {
  container: ViewStyle;
  text: TextStyle;
  spinnerColor: string;
}

/**
 * One lookup table instead of an if/else chain.
 * Adding a new variant means adding one entry here.
 */
const VARIANT_STYLES: Record<ButtonVariant, VariantStyle> = {
  primary: {
    container: { backgroundColor: colors.primary },
    text: { color: colors.textOnPrimary },
    spinnerColor: colors.textOnPrimary,
  },
  secondary: {
    container: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    text: { color: colors.primary },
    spinnerColor: colors.primary,
  },
  danger: {
    container: { backgroundColor: colors.danger },
    text: { color: colors.textOnPrimary },
    spinnerColor: colors.textOnPrimary,
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: colors.primary },
    spinnerColor: colors.primary,
  },
};

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  style,
  ...pressableProps
}) => {
  const isDisabled = disabled || loading;
  const variantStyle = VARIANT_STYLES[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyle.container,
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.spinnerColor} />
      ) : (
        <Text style={[styles.label, variantStyle.text]}>{label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    minHeight: TOUCH_TARGET,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
});