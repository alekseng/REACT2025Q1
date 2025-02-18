import { Input } from '../../../shared/ui/Input/Input';
import { Button } from '../../../shared/ui/Button/Button';
import cls from './HeaderForm.module.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { photosApi } from '../../../shared/api/fetchData/photosAPI.ts';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  RootState,
} from '../../../app/providers/StoreProvider/config/store.ts';
import { searchActions } from '../../../shared/model/searchSlice.ts';

export const HeaderForm = () => {
  const [newQuery, setNewQuery] = useState('');
  const query = useSelector((state: RootState) => state.search.query);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  photosApi.useFetchPhotosQuery({
    page: '1',
    query: query,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(searchActions.setQuery(newQuery));
    navigate(`/page/${1}`);
  };

  return (
    <form data-testid="form" className={cls.form} onSubmit={handleSubmit}>
      <Input
        data-testid="input"
        onChange={(e) => setNewQuery(e.target.value)}
        value={newQuery}
        placeholder="Search..."
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
