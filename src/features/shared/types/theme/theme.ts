/**
 * Design tokens for the whole app.
 * Screens and components never hardcode a color, a margin, or a font size.
 * They read from here, so a redesign means editing this one file.
 */

export const colors = {
  // Brand
  primary: '#1E6FD9',
  primaryDark: '#1553A8',
  primaryLight: '#E6F0FC',

  // Neutrals
  background: '#F5F7FA',
  surface: '#FFFFFF',
  border: '#E1E5EB',
  textPrimary: '#1A2230',
  textSecondary: '#5B6677',
  textMuted: '#8A94A6',
  textOnPrimary: '#FFFFFF',

  // Feedback
  success: '#1F9D55',
  successLight: '#E3F5EA',
  warning: '#D98A0B',
  warningLight: '#FDF1DC',
  danger: '#D63B3B',
  dangerLight: '#FBE5E5',
  info: '#2B7FBF',
  infoLight: '#E2F0FA',
} as const;

/**
 * Spacing scale based on a 4px grid.
 * Use spacing.md instead of the raw number 16.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/** Minimum comfortable touch target (in dp) for any tappable element. */
export const TOUCH_TARGET = 44;

/** Shadow presets. iOS uses shadow*, Android uses elevation. */
export const shadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
} as const;

export const theme = {
  colors,
  spacing,
  radius,
  fontSize,
  fontWeight,
  shadows,
  TOUCH_TARGET,
} as const;

export type Theme = typeof theme;