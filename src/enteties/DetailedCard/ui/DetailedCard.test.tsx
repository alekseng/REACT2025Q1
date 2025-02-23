import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { DetailedCard } from './DetailedCard';
import { StoreProvider } from '../../../app/providers/StoreProvider';
import { server } from '../../../shared/mocks/server.ts';
import { http, HttpResponse } from 'msw';
import {
  mockNavigate,
  mockParams,
} from '../../../shared/config/vitest/setupTests.ts';

describe('DetailedCard', () => {
  it('should display Loader when no data', async () => {
    mockParams.mockReturnValue({ page: '1' });
    render(
      <StoreProvider>
        <MemoryRouter>
          <DetailedCard />
        </MemoryRouter>
      </StoreProvider>
    );

    const loader = await screen.findByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('renders details after successful fetch', async () => {
    mockParams.mockReturnValue({ page: '1' });
    render(
      <StoreProvider>
        <MemoryRouter>
          <DetailedCard />
        </MemoryRouter>
      </StoreProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('A beautiful test image')).toBeInTheDocument();
      expect(screen.getByText('Author: Test User')).toBeInTheDocument();
      expect(screen.getByText('Likes: 42')).toBeInTheDocument();
      expect(screen.getByText('Created: 10.02.2024')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        'https://example.com/image.jpg'
      );
    });
  });

  it('renders details with no description', async () => {
    mockParams.mockReturnValue({ id: 'test-id', page: '1' });

    server.use(
      http.get('https://api.unsplash.com/photos/:id', async () => {
        return HttpResponse.json({
          created_at: '2024-02-10T00:00:00Z',
          urls: { regular: 'https://example.com/image.jpg' },
          alt_description: 'Test Image',
          description: '',
          user: { name: 'Test User' },
          likes: 42,
        });
      })
    );

    render(
      <StoreProvider>
        <MemoryRouter>
          <DetailedCard />
        </MemoryRouter>
      </StoreProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Image')).toBeInTheDocument();
    });
  });

  it('navigates back on close button click', async () => {
    mockParams.mockReturnValue({ id: 'test-id', page: '1' });

    render(
      <StoreProvider>
        <MemoryRouter>
          <DetailedCard />
        </MemoryRouter>
      </StoreProvider>
    );

    const closeButton = await screen.findByTestId('button');
    expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });
});
