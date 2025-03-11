import { fireEvent, render, screen } from '@testing-library/react';
import { CardListItem } from './CardListItem';
import { describe, it, expect } from 'vitest';
import { StoreProvider } from '../../../app/providers/StoreProvider';
import { useRouter } from 'next/router';
import { vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}));

describe('CardListItem', () => {
  const mockCard = {
    page: 1,
    query: 'cats',
    id: '1',
    alt_description: 'Description',
    urls: { small: 'https://test.com/img.jpg' },
    profile_name: 'Test name',
    profile_img: 'https://test.com/profile/img.jpg',
  };

  it('Test render', () => {
    render(
      <StoreProvider>
        <CardListItem {...mockCard} />
      </StoreProvider>
    );
    const imgElement = screen.getByTestId('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'https://test.com/img.jpg');
  });

  it('calls onClick with correct id when clicked', () => {
    const { push } = useRouter();

    render(
      <StoreProvider>
        <CardListItem {...mockCard} />
      </StoreProvider>
    );

    fireEvent.click(screen.getByTestId('item-container'));
    expect(push).toHaveBeenCalledWith(
      `/?page=${mockCard.page}&query=${mockCard.query}&detail=${mockCard.id}`
    );
  });

  it('should call onClick when the checkbox is clicked', () => {
    render(
      <StoreProvider>
        <CardListItem {...mockCard} />
      </StoreProvider>
    );

    fireEvent.click(screen.getByTestId('checkbox'));
  });
});
