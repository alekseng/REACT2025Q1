import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';
import { describe, it, expect } from 'vitest';
import { emptyMockResults, mockProps } from '../types/testTypes.ts';

describe('CardList', () => {
  it('Test render', () => {
    render(<CardList results={mockProps.results} onCardClick={() => {}} />);

    const cardItems = screen.getAllByRole('img');
    expect(cardItems).toHaveLength(2);

    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('Should work correct with empty result', () => {
    render(<CardList results={emptyMockResults} onCardClick={() => {}} />);

    const text = 'No data found.';

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
