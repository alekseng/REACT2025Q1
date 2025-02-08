import cls from './CardList.module.scss';
import { FetchData } from '../../../shared/api/types/types.ts';
import { CardListItem } from './CardListItem.tsx';

export const CardList = (props: FetchData) => {
  const { results } = props;

  return (
    <div className={cls.card}>
      {results?.map((card) => (
        <CardListItem
          key={card.id}
          alt_description={card.alt_description}
          urls={card.urls}
        />
      ))}
    </div>
  );
};
