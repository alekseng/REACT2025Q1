import { CardList } from '../../../enteties/CardList';
import { Header } from '../../../widgets/Header';
import { useEffect, useState } from 'react';
import { fetchData } from '../../../shared/api/fetchData/fetchData.ts';
import { Result } from '../../../shared/api/types/types.ts';
import { useLocalStorage } from '../../../shared/lib/hooks/useLocalStorage/useLocalStorage.ts';
import { Loader } from '../../../shared/ui/Loader/Loader.tsx';
import { Pagination } from '../../../features/Pagination';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import cls from './MainPage.module.scss';

export const MainPage = () => {
  const [data, setData] = useState<Result[]>([]);
  const [query, setQuery] = useLocalStorage('aleksengQuery');
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    if (!Number(page) || Number(page) < 1) {
      navigate(`/not-found`);
      return;
    }
    if (page) {
      fetchData(+page, query).then((data) => {
        setData(data.results);
        setTotalPage(data.total_pages);
        if (Number(page) > data.total_pages) {
          navigate(`/not-found`);
          return;
        }
        setLoading(false);
      });
    }
  }, [page, query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    navigate(`/page/${1}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      navigate(`/page/${newPage}`);
    }
  };

  const handleCardClick = (id: string) => {
    navigate(`detail/${id}`);
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
          currentPage={Number(page)}
          onPageChange={handlePageChange}
        />
      )}

      <div className={cls.container}>
        {loading ? (
          <Loader />
        ) : (
          <CardList results={data} onCardClick={handleCardClick} />
        )}
        <Outlet />
      </div>
    </>
  );
};
