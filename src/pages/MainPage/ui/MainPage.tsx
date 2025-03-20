import { CardList } from '../../../enteties/CardList';
import { useEffect, useState } from 'react';
import { fetchData } from '../../../shared/api/fetchData/fetchData.ts';
import { PurpleArray } from '../../../shared/api/types/types.ts';
import cls from './MainPage.module.scss';

export const MainPage = () => {
  const [data, setData] = useState<PurpleArray[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  if (data.length === 0) {
    return (
      <>
        <p className={cls.text}>We did not find anything.</p>
      </>
    );
  }

  return (
    <>
      {loading ? (
        <p className={cls.text}>Loading...</p>
      ) : (
        <CardList data={data} />
      )}
    </>
  );
};
