import { useThemeContext } from "./ThemeProvider";

export const useTheme = () => {
  const { theme, setTheme } = useThemeContext();

  const classes = {
    navBackground: "bg-gradient-to-r",
    navBackgroundStyle: {
      background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.primaryLight})`,
    },
    navText: "text-white",
    navHover: "hover:text-white hover:opacity-80",
    pageBackground: `bg-gradient-to-br ${theme.colors.backgroundGradient}`,
    surface: "bg-white/90 backdrop-blur-md",
    surfaceBorder: "border",
    surfaceBorderStyle: { borderColor: theme.colors.border },
    buttonPrimary: "text-white font-bold shadow-md transition",
    buttonPrimaryStyle: {
      background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.primaryLight})`,
    },
    buttonPrimaryHoverStyle: {
      background: `linear-gradient(to right, ${theme.colors.primaryDark}, ${theme.colors.primary})`,
    },
    inputBackground: "bg-opacity-20",
    inputBackgroundStyle: { backgroundColor: theme.colors.accent },
    inputBorder: "border",
    inputBorderStyle: { borderColor: theme.colors.border },
    inputTextStyle: { color: theme.colors.text },
    inputPlaceholderStyle: {
      "--tw-placeholder-opacity": "0.6",
      color: theme.colors.textSecondary,
    },
    inputFocus: "focus:outline-none focus:ring-2",
    inputFocusStyle: {
      "--tw-ring-color": theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    textPrimaryStyle: { color: theme.colors.text },
    textSecondaryStyle: { color: theme.colors.textSecondary },
    title: "font-extrabold tracking-tight drop-shadow-sm",
    titleStyle: { color: theme.colors.primary },
    label: "font-semibold",
    labelStyle: { color: theme.colors.text },
  };

  return { theme, setTheme, classes };
};
