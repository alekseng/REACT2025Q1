import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../shared/ui/Loader/Loader.tsx';
import { Result } from '../../../shared/api/types/types.ts';
import { Button } from '../../../shared/ui/Button/Button.tsx';
import { fetchDetailedCard } from '../model/services/fetchDetailedCard/fetchDetailedCard.ts';
import cls from './DetailedCard.module.scss';
import { ButtonTheme } from '../../../shared/ui/Button/Button.types.ts';

export const DetailedCard = () => {
  const navigate = useNavigate();
  const { page } = useParams<{ page: string }>();
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<Result | null>(null);

  useEffect(() => {
    if (id) {
      setDetail(null);
      fetchDetailedCard(id, navigate).then((data) => {
        setDetail(data);
      });
    }
  }, [id]);

  const handleClose = () => {
    navigate(`/page/${page}`);
  };

  if (!detail) {
    return <Loader data-testid="loader" />;
  }

  const date = new Date(detail.created_at).toLocaleDateString();

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
        src={detail.urls.regular}
        alt={detail.alt_description}
      />
      <h3 className={cls.heading}>
        {detail.description || detail.alt_description}
      </h3>
      <p className={cls.text}>Author: {detail.user.name}</p>
      <p className={cls.text}>Likes: {detail.likes}</p>
      <p className={cls.text}>Created: {date}</p>
    </div>
  );
};
