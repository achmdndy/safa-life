import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createTheme } from '../lib/theme';
import { StatusBar } from "expo-status-bar";
import { colorScheme } from 'nativewind';

type ThemeVariant = 'green' | 'blue' | 'brown' | 'teal' | 'pink';

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  currentTheme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  themes: Record<ThemeVariant, { name: string; primary: string; secondary: string }>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme';
const DARK_MODE_STORAGE_KEY = '@app_dark_mode';

export const themes = {
  green: {
    name: 'Forest Green',
    primary: '#034C53',
    secondary: '#007074'
  },
  blue: {
    name: 'Ocean Blue', 
    primary: '#647FBC',
    secondary: '#91ADC8'
  },
  brown: {
    name: 'Earth Brown',
    primary: '#706233',
    secondary: '#B0926A'
  },
  teal: {
    name: 'Calm Teal',
    primary: '#89A8B2',
    secondary: '#B3C8CF'
  },
  pink: {
    name: 'Cherry Blossom Pink',
    primary: '#FF90BB',
    secondary: '#FFC1DA'
  }
};

function updateCSSVariables(theme: ThemeVariant) {
  if (typeof document !== 'undefined') {
    const selectedTheme = themes[theme];
    const themeColors = createTheme(selectedTheme.primary, selectedTheme.secondary);
    
    const root = document.documentElement;
    
    Object.entries(themeColors.light).forEach(([key, value]) => {
      if (key !== 'radius') {
        const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVar, value.replace('hsl(', '').replace(')', ''));
      }
    });
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentThemeDark, setCurrentThemeDark] = useState<"light" | "dark">("light");
  const [currentTheme, setCurrentTheme] = useState<ThemeVariant>('green');

  useEffect(() => {
    loadTheme();
    loadDarkMode();
  }, []);

  useEffect(() => {
    updateCSSVariables(currentTheme);
  }, [currentTheme]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && themes[savedTheme as ThemeVariant]) {
        setCurrentTheme(savedTheme as ThemeVariant);
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const loadDarkMode = async () => {
    try {
      const savedDarkMode = await AsyncStorage.getItem(DARK_MODE_STORAGE_KEY);
      if (savedDarkMode !== null) {
        const isDark = savedDarkMode === 'dark';
        setCurrentThemeDark(isDark ? 'dark' : 'light');
        colorScheme.set(isDark ? 'dark' : 'light');
      }
    } catch (error) {
      console.log('Error loading dark mode:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = currentThemeDark === "light" ? "dark" : "light";
      setCurrentThemeDark(newTheme);
      colorScheme.set(newTheme);
      await AsyncStorage.setItem(DARK_MODE_STORAGE_KEY, newTheme);
    } catch (error) {
      console.log('Error saving dark mode:', error);
    }
  };

  const setTheme = async (theme: ThemeVariant) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
      setCurrentTheme(theme);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes, theme: currentThemeDark, toggleTheme }}>
      <StatusBar style={currentThemeDark === "dark" ? "light" : "dark"} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}