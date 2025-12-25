import { useState, useEffect } from 'react';

const THEME_KEY = 'airline-theme';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Инициализация темы
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialIsDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    setIsDarkMode(initialIsDark);
    document.documentElement.setAttribute('data-theme', initialIsDark ? 'dark' : 'light');
  }, []);

  // Переключение темы
  const toggleTheme = () => {
    const newIsDark = !isDarkMode;
    
    setIsDarkMode(newIsDark);
    document.documentElement.setAttribute('data-theme', newIsDark ? 'dark' : 'light');
    localStorage.setItem(THEME_KEY, newIsDark ? 'dark' : 'light');
  };

  return {
    isDarkMode,
    toggleTheme,
  };
};