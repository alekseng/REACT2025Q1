import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainPage } from '../../pages/MainPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { PageError } from '../../widgets/PageError';
import { DetailedCard } from '../../enteties/DetailedCard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/page/1" replace />,
  },
  {
    path: '/page/:page',
    element: <MainPage />,
    errorElement: <PageError />,
    children: [
      {
        path: 'detail/:id',
        element: <DetailedCard />,
      },
    ],
  },
  {
    path: '/not-found',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
