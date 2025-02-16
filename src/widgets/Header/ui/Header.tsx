import { BugButton } from '../../../app/providers/ErrorBoundary';
import { memo } from 'react';
import cls from './Header.module.scss';
import { HeaderForm } from '../../../features/HeaderForm';
import { ThemeSwitcher } from '../../ThemeSwitcher';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header = memo((props: HeaderProps) => {
  const { onSearch } = props;

  return (
    <header data-testid="header" className={cls.header}>
      <BugButton />
      <HeaderForm onSearch={onSearch} />
      <ThemeSwitcher />
    </header>
  );
});

Header.displayName = 'Header';
