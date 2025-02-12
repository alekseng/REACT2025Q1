import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, Mock } from 'vitest';
import { DetailedCard } from './DetailedCard';
import { fetchDetailedCard } from '../model/services/fetchDetailedCard/fetchDetailedCard.ts';

vi.mock('../model/services/fetchDetailedCard/fetchDetailedCard', () => ({
  fetchDetailedCard: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: 'test-id', page: '1' }),
  };
});

describe('DetailedCard', () => {
  it('renders details after successful fetch', async () => {
    const mockData = {
      created_at: '2024-02-10T00:00:00Z',
      urls: { regular: 'https://example.com/image.jpg' },
      alt_description: 'Test Image',
      description: 'A beautiful test image',
      user: { name: 'Test User' },
      likes: 42,
    };

    (fetchDetailedCard as Mock).mockResolvedValue(mockData);
    render(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('A beautiful test image')).toBeInTheDocument();
      expect(screen.getByText('Author: Test User')).toBeInTheDocument();
      expect(screen.getByText('Likes: 42')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        'https://example.com/image.jpg'
      );
    });
  });

  it('renders details with no description', async () => {
    const mockData = {
      created_at: '2024-02-10T00:00:00Z',
      urls: { full: 'https://example.com/image.jpg' },
      alt_description: 'Test Image',
      description: '',
      user: { name: 'Test User' },
      likes: 42,
    };

    (fetchDetailedCard as Mock).mockResolvedValue(mockData);
    render(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Image')).toBeInTheDocument();
    });
  });

  it('navigates back on close button click', async () => {
    render(
      <MemoryRouter>
        <DetailedCard />
      </MemoryRouter>
    );

    const closeButton = await screen.findByTestId('button');
    expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });
});
