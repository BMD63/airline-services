import { useState, useEffect } from 'react';

const THEME_KEY = 'airline-theme';

export const useTheme = () => {
  // Инициализируем состояние начальным значением
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Применяем тему при изменении isDarkMode
  useEffect(() => {
    const root = document.documentElement;
    
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [isDarkMode]);

  // Слушаем изменения системной темы (только если нет сохраненной)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Меняем тему только если пользователь не выбирал вручную
      if (!localStorage.getItem(THEME_KEY)) {
        setIsDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return {
    isDarkMode,
    toggleTheme,
  };
};