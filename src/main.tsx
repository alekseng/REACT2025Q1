import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/styles/index.scss';
import App from './app/App.tsx';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { StoreProvider } from './app/providers/StoreProvider';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <StoreProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ErrorBoundary>
      </StoreProvider>
    </StrictMode>
  );
} else {
  console.error('Root element not found!');
}
