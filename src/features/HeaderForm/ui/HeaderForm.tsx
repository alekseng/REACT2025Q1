import { Input } from '../../../shared/ui/Input/Input';
import { Button } from '../../../shared/ui/Button/Button';
import cls from './HeaderForm.module.scss';
import React, { useState } from 'react';

interface HeaderFormProps {
  onSearch: (query: string) => void;
}

export const HeaderForm = ({ onSearch }: HeaderFormProps) => {
  const [query, setQuery] = useState('');

  const queryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className={cls.form} onSubmit={handleSubmit}>
      <Input onChange={queryChange} value={query} placeholder="Search..." />
      <Button type="submit">Search</Button>
    </form>
  );
};
