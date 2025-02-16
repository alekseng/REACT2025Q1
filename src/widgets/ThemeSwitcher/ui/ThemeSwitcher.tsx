import { Button } from '../../../shared/ui/Button/Button.tsx';
import { ButtonTheme } from '../../../shared/ui/Button/Button.types.ts';
import { Theme, useTheme } from '../../../app/providers/ThemeProvider';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} theme={ButtonTheme.PRIMARY}>
      {theme === Theme.DARK ? 'dark' : 'light'}
    </Button>
  );
};
