import { BugButton } from '../../../app/providers/ErrorBoundary';
import { memo } from 'react';
import cls from './Header.module.scss';
import { HeaderForm } from '../../../features/HeaderForm';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header = memo((props: HeaderProps) => {
  const { onSearch } = props;

  return (
    <header className={cls.header}>
      <BugButton />
      <HeaderForm onSearch={onSearch} />
    </header>
  );
});

Header.displayName = 'Header';
