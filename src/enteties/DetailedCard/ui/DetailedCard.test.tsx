import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DetailedCard } from './DetailedCard';
import { StoreProvider } from '../../../app/providers/StoreProvider';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}));

describe('DetailedCard', () => {
  it('renders details after successful fetch', async () => {
    const mockData = {
      created_at: '2024-02-10T00:00:00Z',
      urls: { regular: 'https://example.com/image.jpg' },
      alt_description: 'Test Image',
      description: 'A beautiful test image',
      user: { name: 'Test User' },
      likes: 42,
      id: 'asd',
    };
    render(
      <StoreProvider>
        <DetailedCard data={mockData} id={'asd'} page={1} query={'cats'} />
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
    const mockData = {
      created_at: '2024-02-10T00:00:00Z',
      urls: { regular: 'https://example.com/image.jpg' },
      alt_description: 'Test Image',
      description: '',
      user: { name: 'Test User' },
      likes: 42,
      id: 'asd',
    };

    render(
      <StoreProvider>
        <DetailedCard data={mockData} id={'asd'} page={1} query={'cats'} />
      </StoreProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Image')).toBeInTheDocument();
    });
  });

  it('navigates back on close button click', async () => {
    const { push } = useRouter();
    const mockData = {
      created_at: '2024-02-10T00:00:00Z',
      urls: { regular: 'https://example.com/image.jpg' },
      alt_description: 'Test Image',
      description: 'A beautiful test image',
      user: { name: 'Test User' },
      likes: 42,
      id: 'asd',
    };
    render(
      <StoreProvider>
        <DetailedCard data={mockData} id={'asd'} page={1} query={'cats'} />
      </StoreProvider>
    );

    const closeButton = await screen.findByTestId('button');
    expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);

    expect(push).toHaveBeenCalledWith(`/?page=1&query=cats`);
  });
});
