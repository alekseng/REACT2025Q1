import cls from './CardList.module.scss';
import { CardListItem } from './CardListItem.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { photosApi } from '../../../shared/api/fetchData/photosAPI.ts';
import { Loader } from '../../../shared/ui/Loader/Loader.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/providers/StoreProvider/config/store.ts';

export const CardList = () => {
  const query = useSelector((state: RootState) => state.search.query);
  const navigate = useNavigate();
  const { page } = useParams<{ page: string }>();
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = photosApi.useFetchPhotosQuery({
    page: page,
    query: query,
  });

  const handleClickOnCardList = () => {
    navigate(`/page/${page}`);
  };

  if (isFetching) {
    return <Loader data-testid="loader" />;
  }

  if (data?.results?.length === 0 && !isFetching) {
    return (
      <p className={cls['wrong-query']}>
        We did not find anything, try another query.
      </p>
    );
  }

  return (
    <div
      data-testid={'card-list'}
      onClick={() => handleClickOnCardList()}
      className={id ? cls['card-scrollable'] : cls.card}
    >
      {data?.results?.map((card) => (
        <CardListItem
          key={card.id}
          alt_description={card.alt_description}
          profile_name={card.user.name}
          urls={card.urls}
          profile_img={card.user.profile_image.small}
          id={card.id}
        />
      ))}
    </div>
  );
};
