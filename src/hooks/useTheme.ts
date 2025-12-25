import { useState, useEffect } from 'react';

const THEME_KEY = 'airline-theme';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Инициализация темы
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  // Переключение темы
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  return {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme,
  };
};