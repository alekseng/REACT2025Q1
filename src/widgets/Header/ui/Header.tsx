import { BugButton } from '../../../app/providers/ErrorBoundary';
import { memo } from 'react';
import cls from './Header.module.scss';
import { HeaderForm } from '../../../features/HeaderForm';
import { ThemeSwitcher } from '../../ThemeSwitcher';

export const Header = memo(() => {
  return (
    <header data-testid="header" className={cls.header}>
      <BugButton />
      <ThemeSwitcher />
      <HeaderForm />
    </header>
  );
});

Header.displayName = 'Header';
