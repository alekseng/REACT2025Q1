import { BugButton } from '../../../app/providers/ErrorBoundary';
import { memo } from 'react';
import cls from './Header.module.scss';
import { HeaderForm } from '../../../features/HeaderForm';

export const Header = memo(() => {
  return (
    <header className={cls.header}>
      <BugButton />
      <HeaderForm />
    </header>
  );
});

Header.displayName = 'Header';
