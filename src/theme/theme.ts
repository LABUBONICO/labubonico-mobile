import { MD3LightTheme } from "react-native-paper";
import {
  DefaultTheme as NavigationDefault,
  Theme as NavigationTheme,
} from "@react-navigation/native";

const baseTheme = MD3LightTheme;

const fonts = {
  ...baseTheme.fonts,
  // Editorial styles
  displayMedium: {
    fontFamily: "PPEditorialNew",
    fontSize: 24,
  },
  // Headline styles
  headlineLarge: {
    fontFamily: "SwitzerBold",
    fontSize: 32,
    lineHeight: 38,
  },
  headlineMedium: {
    fontFamily: "SwitzerBold",
    fontSize: 20,
    lineHeight: 24,
  },
  titleLarge: {
    fontFamily: "SwitzerBold",
    fontSize: 16,
    lineHeight: 19,
  },
  titleMedium: {
    fontFamily: "SwitzerSemibold",
    fontSize: 16,
    lineHeight: 19,
  },
  bodyLarge: {
    fontFamily: "SwitzerRegular",
    fontSize: 16,
    lineHeight: 19,
  },
  bodyMedium: {
    fontFamily: "SwitzerBold",
    fontSize: 14,
    lineHeight: 17,
  },
  labelLarge: {
    fontFamily: "SwitzerSemibold",
    fontSize: 14,
    lineHeight: 17,
  },
  labelMedium: {
    fontFamily: "SwitzerRegular",
    fontSize: 14,
    lineHeight: 17,
  },
  labelSmall: {
    fontFamily: "SwitzerBold",
    fontSize: 12,
    lineHeight: 14,
  },
};
const borderRadius = {
  sm: 12,
  md: 20,
  lg: 28,
  xl: 32,
  full: 9999,
};
const spacing = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
};
const colors = {
  ...baseTheme.colors,
  primary: "#FFD93D",
  onPrimary: "#000000",
  secondary: "#C75FFE",
  onSecondary: "#FFFFFF",
  background: "#FDFBF9",
  text: "#000000",
  surface: "#F6F1E9",
  success: "#1FC56F",
  error: "#E74C3C",
  outline: "#FFD93D",
};
const buttons = {
  contained: {
    mode: "contained" as const,
    buttonColor: colors.primary,
    textColor: colors.onPrimary,
    style: { width: "100%" as any },
    contentStyle: { padding: spacing.lg },
    labelStyle: fonts.headlineMedium,
  },
  outlined: {
    mode: "outlined" as const,
    textColor: colors.onPrimary,
    style: { width: "100%" as any, borderColor: colors.onPrimary },
    contentStyle: { padding: spacing.lg },
    labelStyle: fonts.headlineMedium,
    borderWidth: 1,
  },
};

const paperTheme = {
  ...baseTheme,
  roundness: 9999,
  spacing,
  borderRadius,
  colors,
  fonts,
  buttons,
};

const navigationTheme: NavigationTheme = {
  ...NavigationDefault,
  colors: {
    ...NavigationDefault.colors,
    background: paperTheme.colors.background,
    card: paperTheme.colors.background,
    primary: paperTheme.colors.primary,
    text: paperTheme.colors.onSurface,
    border: paperTheme.colors.outline,
    notification: paperTheme.colors.primary,
  },
};

export { paperTheme, navigationTheme };
