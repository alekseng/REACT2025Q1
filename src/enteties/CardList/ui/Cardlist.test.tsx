import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';
import { describe, it, expect, vi, Mock } from 'vitest';
import { emptyMockResults, mockProps } from '../types/testTypes.ts';
import { MemoryRouter, useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import cls from './CardList.module.scss';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: vi.fn(),
  };
});

describe('CardList', () => {
  it('Test render', () => {
    (useParams as Mock).mockReturnValue({ page: '1' });
    render(
      <MemoryRouter>
        <CardList results={mockProps.results} onCardClick={() => {}} />
      </MemoryRouter>
    );

    const image = screen.getByAltText('Description 1');
    expect(image).toBeInTheDocument();

    const profileImage = screen.getByAltText('User');
    expect(profileImage).toBeInTheDocument();
  });

  it('should navigate if clicked by list ', async () => {
    render(
      <MemoryRouter>
        <CardList results={mockProps.results} onCardClick={() => {}} />
      </MemoryRouter>
    );
    const cardList = await screen.findByTestId('card-list');
    expect(cardList).toBeInTheDocument();
    await userEvent.click(cardList);

    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });

  it('should apply card-scrollable class when id', async () => {
    (useParams as Mock).mockReturnValue({ id: 'test-id' });
    render(
      <MemoryRouter>
        <CardList results={mockProps.results} onCardClick={() => {}} />
      </MemoryRouter>
    );

    const cardList = await screen.findByTestId('card-list');

    expect(cardList).toHaveClass(cls['card-scrollable']);
  });

  it('should apply card class when not id', async () => {
    (useParams as Mock).mockReturnValue({});
    render(
      <MemoryRouter>
        <CardList results={mockProps.results} onCardClick={() => {}} />
      </MemoryRouter>
    );

    const cardList = await screen.findByTestId('card-list');

    expect(cardList).toHaveClass(cls['card']);
  });

  it('Should work correct with empty result', () => {
    (useParams as Mock).mockReturnValue({ page: '1' });
    render(
      <MemoryRouter>
        <CardList results={emptyMockResults} onCardClick={() => {}} />)
      </MemoryRouter>
    );

    const text = 'No data found.';

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
