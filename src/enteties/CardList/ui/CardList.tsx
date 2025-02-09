import cls from './CardList.module.scss';
import { FetchData } from '../../../shared/api/types/types.ts';
import { CardListItem } from './CardListItem.tsx';

interface CardListProps extends FetchData {
  onCardClick: (id: string) => void;
}

export const CardList = (props: CardListProps) => {
  const { results, onCardClick } = props;

  return (
    <div className={cls.card}>
      {results?.map((card) => (
        <CardListItem
          key={card.id}
          alt_description={card.alt_description}
          urls={card.urls}
          id={card.id}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};
