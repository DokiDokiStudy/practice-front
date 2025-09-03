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

  useEffect(() => {
    setTheme(getCurrentTheme(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const c = theme.colors;

    root.style.setProperty("--theme-primary", c.primary);
    root.style.setProperty("--theme-primary-dark", c.primaryDark);
    root.style.setProperty("--theme-primary-light", c.primaryLight);
    root.style.setProperty("--theme-secondary", c.secondary);
    root.style.setProperty("--theme-background", c.background);
    root.style.setProperty("--theme-surface", c.surface);
    root.style.setProperty("--theme-surface-hover", c.surfaceHover);
    root.style.setProperty("--theme-text", c.text);
    root.style.setProperty("--theme-text-secondary", c.textSecondary);
    root.style.setProperty("--theme-accent", c.accent);
    root.style.setProperty("--theme-border", c.border);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("ThemeProvider is missing");
  return ctx;
};
