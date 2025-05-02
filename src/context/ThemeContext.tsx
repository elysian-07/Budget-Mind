
import React, { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for stored theme preference or system preference
    const storedTheme = localStorage.getItem("theme") as Theme;
    if (storedTheme) {
      return storedTheme;
    }
    
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    // Update localStorage and apply theme to document
    localStorage.setItem("theme", theme);
    
    const root = window.document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);

    // Additional theme-specific styling
    const updateThemeColors = () => {
      if (theme === "dark") {
        root.style.setProperty('--sidebar-background', '252 50% 15%');
        root.style.setProperty('--sidebar-foreground', '252 80% 75%');
        root.style.setProperty('--sidebar-primary', '252 80% 65%');
        root.style.setProperty('--sidebar-accent', '252 30% 25%');
        root.style.setProperty('--sidebar-border', '252 30% 20%');
        
        // Additional dark theme colors
        root.style.setProperty('--card-bg', '240 17% 14%');
        root.style.setProperty('--card-border', '240 17% 20%');
        root.style.setProperty('--hover-bg', '240 17% 18%');
        root.style.setProperty('--button-hover', '252 75% 55%');
      } else {
        root.style.setProperty('--sidebar-background', '252 80% 98%');
        root.style.setProperty('--sidebar-foreground', '252 80% 30%');
        root.style.setProperty('--sidebar-primary', '252 80% 75%');
        root.style.setProperty('--sidebar-accent', '252 82% 95%');
        root.style.setProperty('--sidebar-border', '252 80% 90%');
        
        // Additional light theme colors
        root.style.setProperty('--card-bg', '0 0% 100%');
        root.style.setProperty('--card-border', '220 13% 95%');
        root.style.setProperty('--hover-bg', '220 13% 97%');
        root.style.setProperty('--button-hover', '252 75% 70%');
      }
    };

    updateThemeColors();
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
