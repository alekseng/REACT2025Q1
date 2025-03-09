import { Button } from '../../../shared/ui/Button/Button.tsx';
import cls from './DetailedCard.module.scss';
import { ButtonTheme } from '../../../shared/ui/Button/Button.types.ts';
import { useRouter } from 'next/router';
import { Result } from '@/shared/api/types/types.ts';

interface DetailedCardProps {
  page: number;
  query: string;
  id: string;
  data: Result;
}

export const DetailedCard = (props: DetailedCardProps) => {
  const { data, query, id, page } = props;
  const router = useRouter();
  const handleClose = () => {
    router.push(`/?page=${page}&query=${query}`);
  };

  let date;

  if (data) {
    date = new Date(data.created_at).toLocaleDateString();
  }

  return (
    <div className={cls.container} key={id}>
      <div className={cls.header}>
        <p>Details</p>
        <Button
          theme={ButtonTheme.CLOSE}
          data-testid="button"
          onClick={() => {
            handleClose();
          }}
        ></Button>
      </div>

      <img
        className={cls.img}
        src={data.urls.regular}
        alt={data.alt_description}
      />
      <h3 className={cls.heading}>
        {data.description || data.alt_description}
      </h3>
      <p className={cls.text}>Author: {data.user.name}</p>
      <p className={cls.text}>Likes: {data.likes}</p>
      <p className={cls.text}>Created: {date}</p>
    </div>
  );
};
