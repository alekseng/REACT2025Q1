import { CardList } from '@/enteties/CardList';
import { Header } from '@/widgets/Header';
import { Pagination } from '@/features/Pagination';
import { photosApi } from '@/shared/api/fetchData/photosAPI.ts';
import cls from './MainPage/ui/MainPage.module.scss';
import { store } from '@/app/providers/StoreProvider/config/store.ts';
import '@/app/styles/index.scss';
import { CheckedCardsBar } from '@/features/CheckedCardsBar';
import { DetailedCard } from '@/enteties/DetailedCard';
import { FetchData, Result } from '@/shared/api/types/types';
import { GetServerSidePropsContext } from 'next';

interface MainPageProps {
  data: FetchData;
  page: number;
  query: string;
  id: string;
  details: Result;
}

const MainPage = (props: MainPageProps) => {
  const { data, page, query, id, details } = props;
  return (
    <div className="app light">
      <Header />
      <Pagination data={data} page={page} query={query} />
      <div className={cls.container}>
        <CardList data={data} page={page} query={query} id={id} />
        {id && (
          <DetailedCard data={details} id={id} page={page} query={query} />
        )}
      </div>
      <CheckedCardsBar />
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const page = (context.query.page || '1') as string;
  const query = (context.query.query || 'cheetah') as string;
  const id = (context.query.detail || '') as string;

  try {
    const photosResponse = await store
      .dispatch(photosApi.endpoints.fetchPhotos.initiate({ page, query }))
      .unwrap();

    let detailsResponse = null;
    if (id) {
      detailsResponse = await store
        .dispatch(photosApi.endpoints.fetchDetailsPhoto.initiate({ id }))
        .unwrap();
    }

    return {
      props: {
        data: photosResponse || { results: [] },
        details: detailsResponse || null,
        page: Number(page),
        query: query,
        id: id,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        data: { results: [] },
        details: null,
        page: Number(page),
        query: query,
        id: id,
      },
    };
  }
}

export default MainPage;
