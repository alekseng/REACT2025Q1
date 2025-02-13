import cls from './CardList.module.scss';
import { FetchData } from '../../../shared/api/types/types.ts';
import { CardListItem } from './CardListItem.tsx';
import { useNavigate, useParams } from 'react-router-dom';

interface CardListProps extends FetchData {
  onCardClick: (id: string) => void;
}

export const CardList = (props: CardListProps) => {
  const { results, onCardClick } = props;
  const navigate = useNavigate();
  const { page } = useParams<{ page: string }>();
  const { id } = useParams<{ id: string }>();

  if (!results?.length) {
    return <div className={cls.card}>No data found.</div>;
  }

  const handleClickOnCardList = () => {
    navigate(`/page/${page}`);
  };

  return (
    <div
      data-testid={'card-list'}
      onClick={() => handleClickOnCardList()}
      className={id ? cls['card-scrollable'] : cls.card}
    >
      {results?.map((card) => (
        <CardListItem
          key={card.id}
          alt_description={card.alt_description}
          profile_name={card.user.name}
          urls={card.urls}
          profile_img={card.user.profile_image.small}
          id={card.id}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};
