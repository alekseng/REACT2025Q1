import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/styles/index.scss';
import App from './app/App.tsx';
import { ErrorBoundary } from './app/providers/ErrorBoundary';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error('Root element not found!');
}
