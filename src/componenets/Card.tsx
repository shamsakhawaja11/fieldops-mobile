import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { colors, radius, shadows, spacing } from '../theme/theme';

interface CardProps extends ViewProps {
  /**
   * When provided, the whole card becomes tappable
   * (for example, opening a customer's detail screen).
   */
  onPress?: () => void;
  /** Extra style for the outer container. */
  style?: StyleProp<ViewStyle>;
  /** Accessibility description read by screen readers for tappable cards. */
  accessibilityLabel?: string;
}

/**
 * A white rounded surface with a soft shadow.
 * It is the base container for list rows, detail sections, and
 * dashboard tiles. If onPress is given it behaves like a button,
 * otherwise it is a plain View.
 */
export const Card: React.FC<CardProps> = ({
  onPress,
  style,
  children,
  accessibilityLabel,
  ...viewProps
}) => {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [
          styles.card,
          pressed && styles.pressed,
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[styles.card, style]} {...viewProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});