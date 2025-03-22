import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/styles/index.css';
import App from './app/App.tsx';
import { CountryFilterProvider } from './app/providers/CountryFilterProvider';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <CountryFilterProvider>
        <App />
      </CountryFilterProvider>
    </StrictMode>
  );
} else {
  console.error('Root element not found!');
}
