"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface ColorTheme {
  id: string;
  label: string;
  labelFa: string;
  primary: string;
  secondary: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: "blue",
    label: "Blue",
    labelFa: "آبی",
    primary: "#5d87ff",
    secondary: "#49beff",
  },
  {
    id: "purple",
    label: "Purple",
    labelFa: "بنفش",
    primary: "#7c3aed",
    secondary: "#a78bfa",
  },
  {
    id: "green",
    label: "Green",
    labelFa: "سبز",
    primary: "#10b981",
    secondary: "#34d399",
  },
  {
    id: "teal",
    label: "Teal",
    labelFa: "فیروزه‌ای",
    primary: "#0d9488",
    secondary: "#2dd4bf",
  },
  {
    id: "orange",
    label: "Orange",
    labelFa: "نارنجی",
    primary: "#f97316",
    secondary: "#fb923c",
  },
  {
    id: "rose",
    label: "Rose",
    labelFa: "صورتی",
    primary: "#e11d48",
    secondary: "#fb7185",
  },
];

interface ThemeCustomizerCtx {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeCustomizerContext = createContext<ThemeCustomizerCtx>({
  colorTheme: COLOR_THEMES[0],
  setColorTheme: () => {},
});

const STORAGE_KEY = "ta-color-theme";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

function alphaColor(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function darken(hex: string, amount = 0.2): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgb(${Math.round(r * (1 - amount))}, ${Math.round(g * (1 - amount))}, ${Math.round(b * (1 - amount))})`;
}

function applyColorTheme(theme: ColorTheme) {
  const root = document.documentElement;
  const p = theme.primary;
  const s = theme.secondary;

  // Core brand colors
  root.style.setProperty("--primary", p);
  root.style.setProperty("--secondary", s);

  // Light tint variants (12% opacity in light, 20% in dark)
  const isDark = root.classList.contains("dark");
  const tintAlpha = isDark ? 0.2 : 0.12;
  const lightprimary = alphaColor(p, tintAlpha);
  const lightsecondary = alphaColor(s, tintAlpha);
  root.style.setProperty("--lightprimary", lightprimary);
  root.style.setProperty("--lightsecondary", lightsecondary);

  // Emphasis (80% darkened)
  root.style.setProperty("--primary-emphasis", darken(p, 0.2));
  root.style.setProperty("--secondary-emphasis", darken(s, 0.2));

  // Accent (used by Shadcn components for hover/focus rings)
  root.style.setProperty("--accent", lightprimary);
  root.style.setProperty("--accent-foreground", p);
  root.style.setProperty("--ring", lightprimary);

  // Sidebar active / hover states
  root.style.setProperty("--sidebar-primary", p);
  root.style.setProperty("--sidebar-accent", lightprimary);
  root.style.setProperty("--sidebar-accent-foreground", p);
}

export function ThemeCustomizerProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(
    COLOR_THEMES[0],
  );

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const found = saved ? COLOR_THEMES.find((t) => t.id === saved) : null;
    const initial = found ?? COLOR_THEMES[0];
    setColorThemeState(initial);
    applyColorTheme(initial);
  }, []);

  // Re-apply when system switches dark/light so tint alpha stays correct
  useEffect(() => {
    const observer = new MutationObserver(() => {
      applyColorTheme(colorTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [colorTheme]);

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    applyColorTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme.id);
  };

  return (
    <ThemeCustomizerContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ThemeCustomizerContext.Provider>
  );
}

export const useColorTheme = () => useContext(ThemeCustomizerContext);
