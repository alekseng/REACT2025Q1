import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Pagination } from './Pagination';
import { MemoryRouter } from 'react-router-dom';
import { StoreProvider } from '../../../app/providers/StoreProvider';
import {
  mockNavigate,
  mockParams,
} from '../../../shared/config/vitest/setupTests.ts';

describe('Pagination', async () => {
  mockParams.mockReturnValue({ page: '1' });

  it('Test render', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </StoreProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });
  });

  it('Test click by buttons', async () => {
    mockParams.mockReturnValue({ page: '2' });
    render(
      <StoreProvider>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </StoreProvider>
    );

    await waitFor(() => {
      userEvent.click(screen.getByText('>'));
      expect(mockNavigate).toHaveBeenCalledWith('/page/3');

      userEvent.click(screen.getByText('<'));
      expect(mockNavigate).toHaveBeenCalledWith('/page/1');
    });
  });
});
