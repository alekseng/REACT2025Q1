import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/styles/index.css';
import App from './app/App.tsx';
import { StoreProvider } from './app/providers/StoreProvider';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <StoreProvider>
        <App />
      </StoreProvider>
    </StrictMode>
  );
} else {
  console.error('Root element not found!');
}
