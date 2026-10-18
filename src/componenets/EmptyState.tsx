import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fontSize, fontWeight, spacing } from '../theme/theme';
import { Button } from './Button';

interface EmptyStateProps {
  /** Short headline, e.g. "No customers found". */
  title: string;
  /** One or two sentences explaining why it is empty and what to do. */
  message?: string;
  /** Large symbol shown above the title. Defaults to a neutral one. */
  icon?: string;
  /** Label of the optional action button, e.g. "Add customer". */
  actionLabel?: string;
  /** Called when the action button is pressed. Needs actionLabel too. */
  onAction?: () => void;
  /** Extra style for the outer container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Shown in place of a list when there is nothing to display.
 * An empty screen with no explanation looks broken, so every list
 * in the app uses this to say what happened and what to do next.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon = '\u2205',
  actionLabel,
  onAction,
  style,
}) => {
  const showAction = Boolean(actionLabel && onAction);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.icon} accessibilityElementsHidden>
        {icon}
      </Text>

      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      {showAction && (
        <Button
          label={actionLabel as string}
          onPress={onAction}
          variant="secondary"
          style={styles.action}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  icon: {
    fontSize: 48,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  message: {
    marginTop: spacing.sm,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  action: {
    marginTop: spacing.lg,
  },
});