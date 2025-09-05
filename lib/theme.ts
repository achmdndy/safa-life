import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";

function hexToHsl(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function createTheme(primaryColor: string, secondaryColor: string) {
  const primaryHsl = hexToHsl(primaryColor);
  const secondaryHsl = hexToHsl(secondaryColor);
  
  return {
    light: {
      background: "hsl(0 0% 98%)",
      foreground: "hsl(0 0% 3.9%)",
      card: "hsl(0 0% 100%)",
      cardForeground: "hsl(0 0% 3.9%)",
      popover: "hsl(0 0% 100%)",
      popoverForeground: "hsl(0 0% 3.9%)",
      primary: `hsl(${primaryHsl})`,
      primaryForeground: "hsl(0 0% 98%)",
      secondary: `hsl(${secondaryHsl})`,
      secondaryForeground: "hsl(0 0% 9%)",
      muted: "hsl(0 0% 96.1%)",
      mutedForeground: "hsl(0 0% 45.1%)",
      accent: `hsl(${secondaryHsl})`,
      accentForeground: "hsl(0 0% 9%)",
      destructive: "hsl(0 84.2% 60.2%)",
      border: "hsl(0 0% 89.8%)",
      input: "hsl(0 0% 89.8%)",
      ring: `hsl(${primaryHsl})`,
      radius: "0.625rem",
      chart1: "hsl(12 76% 61%)",
      chart2: "hsl(173 58% 39%)",
      chart3: "hsl(197 37% 24%)",
      chart4: "hsl(43 74% 66%)",
      chart5: "hsl(27 87% 67%)",
    },
    dark: {
      background: "hsl(0 0% 3.9%)",
      foreground: "hsl(0 0% 98%)",
      card: "hsl(0 0% 8%)",
      cardForeground: "hsl(0 0% 98%)",
      popover: "hsl(0 0% 8%)",
      popoverForeground: "hsl(0 0% 98%)",
      primary: `hsl(${primaryHsl})`,
      primaryForeground: "hsl(0 0% 9%)",
      secondary: `hsl(${secondaryHsl})`,
      secondaryForeground: "hsl(0 0% 98%)",
      muted: "hsl(0 0% 14.9%)",
      mutedForeground: "hsl(0 0% 63.9%)",
      accent: `hsl(${secondaryHsl})`,
      accentForeground: "hsl(0 0% 98%)",
      destructive: "hsl(0 70.9% 59.4%)",
      border: "hsl(0 0% 14.9%)",
      input: "hsl(0 0% 14.9%)",
      ring: `hsl(${primaryHsl})`,
      radius: "0.625rem",
      chart1: "hsl(220 70% 50%)",
      chart2: "hsl(160 60% 45%)",
      chart3: "hsl(30 80% 55%)",
      chart4: "hsl(280 65% 60%)",
      chart5: "hsl(340 75% 55%)",
    },
  };
}

// Default theme (keeping backward compatibility)
export const THEME = createTheme('#A8BBA3', '#F7F4EA');

export const NAV_THEME: Record<"light" | "dark", Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};
