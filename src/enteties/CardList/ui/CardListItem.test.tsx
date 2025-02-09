import { fireEvent, render, screen } from '@testing-library/react';
import { CardListItem } from './CardListItem';
import { describe, it, expect, vi } from 'vitest';

const mockFn = vi.fn();

describe('CardListItem', () => {
  const mockCard = {
    id: '1',
    alt_description: 'Description',
    urls: { small: 'https://test.com/img.jpg' },
    onClick: mockFn,
  };

  it('Test render', () => {
    render(<CardListItem {...mockCard} />);
    const imgElement = screen.getByTestId('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'https://test.com/img.jpg');
  });

  it('calls onClick with correct id when clicked', () => {
    render(<CardListItem {...mockCard} />);

    const cardElement = screen.getByText('Description').closest('div');
    if (cardElement) {
      fireEvent.click(cardElement);
      expect(mockCard.onClick).toHaveBeenCalledWith('1');
    } else {
      throw new Error('Card element not found');
    }
  });
});
