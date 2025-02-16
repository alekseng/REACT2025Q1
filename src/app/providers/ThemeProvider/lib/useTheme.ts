import { useContext } from 'react';
import { Theme, ThemeContext } from './ThemeContext.ts';

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme?.(newTheme);
  };

  return { theme, toggleTheme };
};
