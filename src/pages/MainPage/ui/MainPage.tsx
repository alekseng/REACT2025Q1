import { CardList } from '../../../enteties/CardList';
import { Header } from '../../../widgets/Header';
import { useEffect, useState } from 'react';
import { fetchData } from '../../../shared/api/fetchData/fetchData.ts';
import { Result } from '../../../shared/api/types/types.ts';
import cls from './MainPage.module.scss';
import { useLocalStorage } from '../../../shared/lib/hooks/useLocalStorage/useLocalStorage.ts';

export const MainPage = () => {
  const [data, setData] = useState<Result[]>([]);
  const [query, setQuery] = useLocalStorage('aleksengQuery');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(1, query).then((data) => {
      setData(data.results);
      setLoading(false);
    });
  });

  const handleSearch = async (newQuery: string) => {
    setLoading(true);
    setQuery(newQuery);
    const result = await fetchData(1, newQuery);
    setData(result.results);
    setLoading(false);
  };

  if (data.length === 0) {
    return (
      <>
        <Header onSearch={handleSearch} />
        <p className={cls['wrong-query']}>
          We did not find anything, try another query.
        </p>
      </>
    );
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      {loading ? <p>Loading...</p> : <CardList results={data} />}
    </>
  );
};
