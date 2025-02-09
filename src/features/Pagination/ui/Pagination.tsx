import cls from './Pagination.module.scss';
import { Button } from '../../../shared/ui/Button/Button.tsx';

interface PaginationProps<T> {
  totalPage: number;
  currentPage: T;
  onPageChange: (newPage: number) => void;
}

export const Pagination = (props: PaginationProps<string>) => {
  const { totalPage, currentPage, onPageChange } = props;

  return (
    <div className={cls.pagination}>
      <Button
        disabled={+currentPage === 1}
        onClick={() => onPageChange(+currentPage - 1)}
      >
        {'<'}
      </Button>
      <span> {currentPage} </span> / <span> {totalPage} </span>
      <Button
        disabled={+currentPage >= totalPage}
        onClick={() => onPageChange(+currentPage + 1)}
      >
        {'>'}
      </Button>
    </div>
  );
};
