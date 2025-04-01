import { createContext, useContext, useEffect, useState, useMemo } from "react";

type Theme = "dark" | "light" | "system";

export type ThemeColor =
  | "theme-default"
  | "theme-zinc"
  | "theme-blue"
  | "theme-red"
  | "theme-green"
  | "theme-violet"
  | "theme-rose"
  | "theme-yellow"
  | "theme-orange";
export type Radius = "0rem" | "0.25rem" | "0.5rem" | "1rem" | "1.5rem" | "2rem";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColor?: ThemeColor;
  defaultRadius?: Radius;
  storageKey?: string;
  storageColorKey?: string;
  storageRadiusKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  color: ThemeColor;
  radius: Radius;
  setColor: (color: ThemeColor) => void;
  setTheme: (theme: Theme) => void;
  setRadius: (radius: Radius) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultColor = "theme-default",
  defaultRadius = "0.5rem",
  storageKey = "vite-ui-theme",
  storageColorKey = "vite-ui-color",
  storageRadiusKey = "vite-ui-radius",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [color, setColor] = useState<ThemeColor>(defaultColor);
  const [radius, setRadius] = useState<Radius>(defaultRadius);

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    const storedColor = localStorage.getItem(
      storageColorKey
    ) as ThemeColor | null;
    const storedRadius = localStorage.getItem(
      storageRadiusKey
    ) as Radius | null;

    if (storedTheme) setTheme(storedTheme);
    if (storedColor) setColor(storedColor);
    if (storedRadius) setRadius(storedRadius);
  }, [storageKey, storageColorKey, storageRadiusKey]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Xóa class cũ
    root.classList.remove("light", "dark");
    body.classList.remove(
      "theme-zinc",
      "theme-blue",
      "theme-red",
      "theme-green",
      "theme-violet",
      "theme-rose",
      "theme-yellow",
      "theme-orange"
    );

    // Áp dụng theme
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Áp dụng color
    body.classList.add(color);

    // Thêm biến CSS --radius
    body.style.setProperty("--radius", radius);
  }, [theme, color, radius]);

  const value = useMemo(
    () => ({
      theme,
      color,
      radius,
      setTheme: (newTheme: Theme) => {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
      },
      setColor: (newColor: ThemeColor) => {
        localStorage.setItem(storageColorKey, newColor);
        setColor(newColor);
      },
      setRadius: (newRadius: Radius) => {
        localStorage.setItem(storageRadiusKey, newRadius);
        setRadius(newRadius);
      },
    }),
    [theme, color, radius, storageKey, storageColorKey, storageRadiusKey]
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
