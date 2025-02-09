import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../../pages/MainPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { PageError } from '../../widgets/PageError';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <PageError />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
