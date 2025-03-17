import cls from './Cards.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/providers/StoreProvider/config/store.ts';
import { Card } from './Card.tsx';

export const Cards = () => {
  const items = useSelector((state: RootState) => state.form.form);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={cls.container}>
      {items.map((el, ind) => {
        return <Card el={el} key={ind} />;
      })}
    </div>
  );
};
