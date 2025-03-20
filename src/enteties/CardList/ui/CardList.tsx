import cls from './CardList.module.scss';
import { PurpleArray } from '../../../shared/api/types/types.ts';
import { CardListItem } from './CardListItem.tsx';

interface CardListProps {
  data: PurpleArray[];
}

export const CardList = (props: CardListProps) => {
  const { data } = props;

  return (
    <div className={cls.cards}>
      {data.map((card) => (
        <CardListItem
          name={card.name.common}
          population={card.population}
          region={card.region}
          img={card.flags.png}
          key={card.name.common}
        />
      ))}
    </div>
  );
};
