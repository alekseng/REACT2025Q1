import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { MainPage } from './MainPage';
import { StoreProvider } from '../../../app/providers/StoreProvider';
import {
  mockNavigate,
  mockParams,
} from '../../../shared/config/vitest/setupTests.ts';

describe('MainPage', () => {
  it('should navigate to not found page when page incorrect', async () => {
    mockParams.mockReturnValue({ page: 0 });
    render(
      <StoreProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </StoreProvider>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/not-found');
    });
  });

  it('should navigate to "not found page" if the page is larger than the maximum number of pages', async () => {
    mockParams.mockReturnValue({ page: 4 });

    render(
      <StoreProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </StoreProvider>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/not-found');
    });
  });

  it('should navigate to "not found page" if the page is not a number', async () => {
    mockParams.mockReturnValue({ page: 'not correct number' });

    render(
      <StoreProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </StoreProvider>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/not-found');
    });
  });
});
