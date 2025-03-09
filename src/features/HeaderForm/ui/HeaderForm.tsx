import { Input } from '../../../shared/ui/Input/Input';
import { Button } from '../../../shared/ui/Button/Button';
import cls from './HeaderForm.module.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/providers/StoreProvider/config/store.ts';
import { ButtonTheme } from '../../../shared/ui/Button/Button.types.ts';
import { useRouter } from 'next/router';

export const HeaderForm = () => {
  const query = useSelector((state: RootState) => state.search.query);
  const [newQuery, setNewQuery] = useState(query);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?page=1&query=${newQuery}`, undefined, { shallow: false });
  };

  return (
    <form data-testid="form" className={cls.form} onSubmit={handleSubmit}>
      <Input
        data-testid="input"
        onChange={(e) => setNewQuery(e.target.value)}
        value={newQuery}
        placeholder="Search..."
      />
      <Button data-testid="search" theme={ButtonTheme.SEARCH} type="submit" />
    </form>
  );
};
