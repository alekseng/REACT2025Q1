import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './Pagination';
import { StoreProvider } from '../../../app/providers/StoreProvider';
import { mockProps } from '../../../enteties/CardList/types/testTypes.ts';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}));

describe('Pagination', async () => {
  it('Test render', async () => {
    render(
      <StoreProvider>
        <Pagination query="asd" page={2} data={mockProps} />
      </StoreProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });
  });

  it('Test click by buttons', async () => {
    const { push } = useRouter();
    render(
      <StoreProvider>
        <Pagination query="asd" page={2} data={mockProps} />
      </StoreProvider>
    );

    userEvent.click(screen.getByText('>'));
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/?page=3&query=asd');
    });

    userEvent.click(screen.getByText('<'));
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/?page=1&query=asd');
    });
  });
});
