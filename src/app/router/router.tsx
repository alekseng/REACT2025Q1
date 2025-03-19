import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../../pages/MainPage';
import { NotFoundPage } from '../../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
