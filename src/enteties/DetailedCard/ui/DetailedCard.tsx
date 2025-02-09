import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../shared/ui/Loader/Loader.tsx';
import { Result } from '../../../shared/api/types/types.ts';
import { Button } from '../../../shared/ui/Button/Button.tsx';
import { fetchDetailedCard } from '../model/services/fetchDetailedCard/fetchDetailedCard.ts';
import cls from './DetailedCard.module.scss';

export const DetailedCard = () => {
  const navigate = useNavigate();
  const { page } = useParams<{ page: string }>();
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<Result | null>(null);

  useEffect(() => {
    if (id) {
      fetchDetailedCard(id, navigate).then((data) => {
        setDetail(data);
      });
    }
  }, [id]);

  const handleClose = () => {
    navigate(`/page/${page}`);
  };

  if (!detail) {
    return <Loader />;
  }

  const date = new Date(detail.created_at).toLocaleDateString();

  return (
    <div className={cls.container} key={id}>
      <div className={cls.header}>
        <p>Details</p>
        <Button
          data-testid="button"
          onClick={() => {
            handleClose();
          }}
        >
          Close
        </Button>
      </div>

      <img
        className={cls.img}
        src={detail.urls.full}
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
