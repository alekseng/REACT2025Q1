import cls from './CardList.module.scss';
import { CardListItem } from './CardListItem.tsx';
import { FetchData } from '@/shared/api/types/types.ts';
import { useRouter } from 'next/router';

interface CardListProps {
  data: FetchData;
  page: number;
  query: string;
  id: string;
}

export const CardList = (props: CardListProps) => {
  const { data, page, query, id } = props;
  const router = useRouter();

  const handleClickOnCardList = () => {
    router.push(`/?page=${page}&query=${query}`);
  };

  if (!data?.results?.length) {
    return (
      <p className={cls['wrong-query']}>
        We did not find anything, try another query.
      </p>
    );
  }

  return (
    <div
      data-testid={'card-list'}
      onClick={handleClickOnCardList}
      className={id ? cls['card-scrollable'] : cls.card}
    >
      {data.results.map((card) => (
        <CardListItem
          page={page}
          query={query}
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
