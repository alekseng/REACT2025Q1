import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, Mock } from 'vitest';
import { DetailedCard } from './DetailedCard';
import { StoreProvider } from '../../../app/providers/StoreProvider';
import { server } from '../../../shared/mocks/server.ts';
import { http, HttpResponse } from 'msw';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: vi.fn(),
  };
});

describe('DetailedCard', () => {
  it('should display Loader when no data', async () => {
    (useParams as Mock).mockReturnValue({ page: '1' });
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
    (useParams as Mock).mockReturnValue({ page: '1' });
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
    (useParams as Mock).mockReturnValue({ id: 'test-id', page: '1' });

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
    (useParams as Mock).mockReturnValue({ id: 'test-id', page: '1' });

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
