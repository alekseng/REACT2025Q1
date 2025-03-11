import { FetchData } from '@/shared/api/types/types.ts';
import cls from './Pagination.module.scss';
import { Button } from '../../../shared/ui/Button/Button.tsx';
import { useRouter } from 'next/router';
import { ButtonTheme } from '../../../shared/ui/Button/Button.types.ts';

interface PaginationProps {
  data: FetchData;
  page: number;
  query: string;
}

export const Pagination = (props: PaginationProps) => {
  const { data, page, query } = props;
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    router.push(`/?page=${newPage}&query=${query}`);
  };

  if (!data?.total_pages) {
    return '';
  }

  return (
    <div data-testid="pagination" className={cls.pagination}>
      <Button
        theme={ButtonTheme.CIRCLE}
        disabled={Number(page) === 1}
        onClick={() => handlePageChange(Number(page) - 1)}
      >
        {'<'}
      </Button>
      <span> {page} </span> / <span> {data?.total_pages} </span>
      <Button
        theme={ButtonTheme.CIRCLE}
        disabled={Number(page) >= data?.total_pages}
        onClick={() => handlePageChange(Number(page) + 1)}
      >
        {'>'}
      </Button>
    </div>
  );
};
