import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {
  colors,
  fontSize,
  fontWeight,
  radius,
  shadows,
  spacing,
} from '../theme/theme';

/** Diameter of the round button. Larger than TOUCH_TARGET on purpose. */
const FAB_SIZE = 56;

interface FloatingActionButtonProps {
  /** Called when the button is pressed. */
  onPress: () => void;
  /** Screen reader description, e.g. "Add customer". Required for icon-only buttons. */
  accessibilityLabel: string;
  /** Symbol shown inside the button. Defaults to a plus sign. */
  icon?: string;
  /** Extra style, mainly to adjust the position. */
  style?: StyleProp<ViewStyle>;
}

/**
 * A round button that floats over the bottom-right corner of a screen.
 * It is the standard place for the primary "create" action on a list.
 * Because it is positioned absolutely, it must be rendered as a sibling
 * of the list, inside a parent View that fills the screen.
 */
export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  accessibilityLabel,
  icon = '+',
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={styles.icon}>{icon}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
    // A floating button should look more raised than a card.
    elevation: 6,
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
    transform: [{ scale: 0.96 }],
  },
  icon: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.regular,
    color: colors.textOnPrimary,
    // Plus signs sit slightly low in most fonts; this centers it visually.
    marginTop: -2,
  },
});