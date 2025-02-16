import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';
import { useTheme } from './providers/ThemeProvider';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
