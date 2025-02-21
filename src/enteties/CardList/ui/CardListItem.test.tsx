import { fireEvent, render, screen } from '@testing-library/react';
import { CardListItem } from './CardListItem';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { mockNavigate } from '../../../shared/config/vitest/setupTests.ts';
import { StoreProvider } from '../../../app/providers/StoreProvider';

describe('CardListItem', () => {
  const mockCard = {
    id: '1',
    alt_description: 'Description',
    urls: { small: 'https://test.com/img.jpg' },
    profile_name: 'Test name',
    profile_img: 'https://test.com/profile/img.jpg',
  };

  it('Test render', () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <CardListItem {...mockCard} />
        </MemoryRouter>
      </StoreProvider>
    );
    const imgElement = screen.getByTestId('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'https://test.com/img.jpg');
  });

  it('calls onClick with correct id when clicked', () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <CardListItem {...mockCard} />
        </MemoryRouter>
      </StoreProvider>
    );

    fireEvent.click(screen.getByTestId('item-container'));
    expect(mockNavigate).toHaveBeenCalledWith('detail/1');
  });

  it('should call onClick when the checkbox is clicked', () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <CardListItem {...mockCard} />
        </MemoryRouter>
      </StoreProvider>
    );

    fireEvent.click(screen.getByTestId('checkbox'));
  });
});
