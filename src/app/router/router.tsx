import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../../pages/MainPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { DetailedCard } from '../../enteties/DetailedCard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'detail/:id',
    element: <DetailedCard />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
