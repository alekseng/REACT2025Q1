import { AppProps } from 'next/app';
import { StrictMode } from 'react';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';
import '../app/styles/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <StoreProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </ErrorBoundary>
      </StoreProvider>
    </StrictMode>
  );
}

export default MyApp;
