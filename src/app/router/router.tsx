import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../../pages/MainPage';
import { UncontrolledForm } from '../../features/UncontrolledForm';
import { ControlledForm } from '../../features/ControlledForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'uncontrolled-form',
    element: <UncontrolledForm />,
  },
  {
    path: 'controlled-form',
    element: <ControlledForm />,
  },
]);
