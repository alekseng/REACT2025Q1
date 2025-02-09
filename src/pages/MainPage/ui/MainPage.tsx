import { CardList } from '../../../enteties/CardList';
import { Header } from '../../../widgets/Header';
import { useEffect, useState } from 'react';
import { fetchData } from '../../../shared/api/fetchData/fetchData.ts';
import { Result } from '../../../shared/api/types/types.ts';
import { useLocalStorage } from '../../../shared/lib/hooks/useLocalStorage/useLocalStorage.ts';
import { Loader } from '../../../shared/ui/Loader/Loader.tsx';
import { Pagination } from '../../../features/Pagination';
import { useSearchParams } from 'react-router-dom';
import cls from './MainPage.module.scss';

export const MainPage = () => {
  const [data, setData] = useState<Result[]>([]);
  const [query, setQuery] = useLocalStorage('aleksengQuery');
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setLoading(true);
    fetchData(currentPage, query).then((data) => {
      setData(data.results);
      setTotalPage(data.total_pages);
      setLoading(false);
    });
  }, [currentPage, query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setSearchParams({ page: String(newPage) });
    }
  };

  if (data.length === 0 && !loading) {
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
      {loading ? (
        ''
      ) : (
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      {loading ? <Loader /> : <CardList results={data} />}
    </>
  );
};
