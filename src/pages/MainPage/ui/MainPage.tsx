import { CardList } from '../../../enteties/CardList';
import { Header } from '../../../widgets/Header';
import { Pagination } from '../../../features/Pagination';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import cls from './MainPage.module.scss';
import { useEffect } from 'react';
import { photosApi } from '../../../shared/api/fetchData/photosAPI.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/providers/StoreProvider/config/store.ts';

export const MainPage = () => {
  const query = useSelector((state: RootState) => state.search.query);
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const { data } = photosApi.useFetchPhotosQuery({
    page: page,
    query: query,
  });

  useEffect(() => {
    if (data?.total_pages) {
      if (
        !Number(page) ||
        Number(page) < 1 ||
        Number(page) > data?.total_pages
      ) {
        navigate(`/not-found`);
        return;
      }
    }
  }, [page, data, navigate]);

  return (
    <>
      <Header />
      <Pagination />
      <div className={cls.container}>
        <CardList />
        <Outlet />
      </div>
    </>
  );
};
