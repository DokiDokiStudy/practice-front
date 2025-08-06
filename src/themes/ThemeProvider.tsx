import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Theme, getCurrentTheme } from "./themes";
import { useLocation } from "@tanstack/react-router";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>(() =>
    getCurrentTheme(location.pathname)
  );

  // 경로가 변경될 때마다 테마 업데이트
  useEffect(() => {
    const newTheme = getCurrentTheme(location.pathname);
    setTheme(newTheme);
  }, [location.pathname]);

  // CSS 변수로 테마 적용
  useEffect(() => {
    const root = document.documentElement;

    // CSS 변수 업데이트
    root.style.setProperty("--theme-primary", theme.colors.primary);
    root.style.setProperty("--theme-primary-dark", theme.colors.primaryDark);
    root.style.setProperty("--theme-primary-light", theme.colors.primaryLight);
    root.style.setProperty("--theme-secondary", theme.colors.secondary);
    root.style.setProperty("--theme-background", theme.colors.background);
    root.style.setProperty("--theme-surface", theme.colors.surface);
    root.style.setProperty("--theme-surface-hover", theme.colors.surfaceHover);
    root.style.setProperty("--theme-text", theme.colors.text);
    root.style.setProperty(
      "--theme-text-secondary",
      theme.colors.textSecondary
    );
    root.style.setProperty("--theme-accent", theme.colors.accent);
    root.style.setProperty("--theme-border", theme.colors.border);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("ThemeProvider Error임");
  }
  return context;
};
