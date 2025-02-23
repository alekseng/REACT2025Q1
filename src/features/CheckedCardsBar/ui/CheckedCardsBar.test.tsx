import { render, screen } from '@testing-library/react';
import { CheckedCardsBar } from './CheckedCardsBar';
import { describe, it, expect } from 'vitest';
import { renderWithTestStore } from '../../../shared/lib/tests/renderWithTestStore.tsx';
import cls from './CheckedCardsBar.module.scss';

describe('CheckedCardsBar', () => {
  it('not mount if state is empty', () => {
    render(
      renderWithTestStore({
        children: <CheckedCardsBar />,
      })
    );

    expect(screen.queryByTestId('checked-cards-bar')).toBeNull();
  });

  it('should display correct text when 1 element in state', async () => {
    render(
      renderWithTestStore({
        children: <CheckedCardsBar />,
        preloadedState: { checkedCards: { checkedCards: [1] } },
      })
    );

    expect(screen.queryByText('1 item is selected')).toBeInTheDocument();

    const cardsBar = await screen.findByTestId('checked-cards-bar');
    expect(cardsBar).toHaveClass(cls['visible']);
  });

  it('should display correct text when 2 elements in state', () => {
    render(
      renderWithTestStore({
        children: <CheckedCardsBar />,
        preloadedState: { checkedCards: { checkedCards: [1, 2] } },
      })
    );

    expect(screen.queryByText('2 items are selected')).toBeInTheDocument();
  });
});
