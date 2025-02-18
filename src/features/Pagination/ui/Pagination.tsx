import cls from './Pagination.module.scss';
import { Button } from '../../../shared/ui/Button/Button.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { photosApi } from '../../../shared/api/fetchData/photosAPI.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/providers/StoreProvider/config/store.ts';

export const Pagination = () => {
  const query = useSelector((state: RootState) => state.search.query);
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const { data } = photosApi.useFetchPhotosQuery({
    page: page,
    query: query,
  });

  const handlePageChange = (newPage: number) => {
    navigate(`/page/${newPage}`);
  };

  if (!data?.total_pages) {
    return '';
  }

  return (
    <div data-testid="pagination" className={cls.pagination}>
      <Button
        disabled={Number(page) === 1}
        onClick={() => handlePageChange(Number(page) - 1)}
      >
        {'<'}
      </Button>
      <span> {page} </span> / <span> {data?.total_pages} </span>
      <Button
        disabled={Number(page) >= data?.total_pages}
        onClick={() => handlePageChange(Number(page) + 1)}
      >
        {'>'}
      </Button>
    </div>
  );
};
