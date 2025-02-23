import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../../shared/ui/Loader/Loader.tsx';
import { Button } from '../../../shared/ui/Button/Button.tsx';
import cls from './DetailedCard.module.scss';
import { ButtonTheme } from '../../../shared/ui/Button/Button.types.ts';
import { photosApi } from '../../../shared/api/fetchData/photosAPI.ts';

export const DetailedCard = () => {
  const navigate = useNavigate();
  const { page, id } = useParams<{ page: string; id: string }>();
  const { data, isFetching } = photosApi.useFetchDetailsPhotoQuery({
    id: id,
  });

  const handleClose = () => {
    navigate(`/page/${page}`);
  };

  if (isFetching) {
    return <Loader data-testid="loader" />;
  }

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
        src={data?.urls.regular}
        alt={data?.alt_description}
      />
      <h3 className={cls.heading}>
        {data?.description || data?.alt_description}
      </h3>
      <p className={cls.text}>Author: {data?.user.name}</p>
      <p className={cls.text}>Likes: {data?.likes}</p>
      <p className={cls.text}>Created: {date}</p>
    </div>
  );
};
