import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';
import { useTheme } from './providers/ThemeProvider';
import { CheckedCardsBar } from '../features/CheckedCardsBar';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <RouterProvider router={router} />
      <CheckedCardsBar />
    </div>
  );
}

export default App;
