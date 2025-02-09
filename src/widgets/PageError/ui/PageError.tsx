import { memo } from 'react';
import cls from './PageError.module.scss';
import { Button } from '../../../shared/ui/Button/Button.tsx';

export const PageError = memo(() => {
  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className={cls['page-error']}>
      <p>Something went wrong</p>
      <Button onClick={reloadPage}>Reload page</Button>
    </div>
  );
});

PageError.displayName = 'PageError';
