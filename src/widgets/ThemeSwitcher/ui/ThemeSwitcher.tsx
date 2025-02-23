import { Button } from '../../../shared/ui/Button/Button.tsx';
import { ButtonTheme } from '../../../shared/ui/Button/Button.types.ts';
import { Theme, useTheme } from '../../../app/providers/ThemeProvider';
import LightIcon from '../../../shared/assets/svg/light_mode.svg?react';
import DarkIcon from '../../../shared/assets/svg/dark_mode.svg?react';
import cls from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      className={cls.right}
      onClick={toggleTheme}
      theme={ButtonTheme.CLEAR}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
};
