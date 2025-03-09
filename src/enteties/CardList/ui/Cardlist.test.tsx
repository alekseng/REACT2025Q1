import { render, screen, waitFor } from '@testing-library/react';
import { CardList } from './CardList';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { StoreProvider } from '../../../app/providers/StoreProvider';
import cls from './CardList.module.scss';
import { server } from '../../../shared/mocks/server.ts';
import { http, HttpResponse } from 'msw';
import { emptyMockResults, mockProps } from '../types/testTypes.ts';
import { useRouter } from 'next/router';
import React from 'react';
vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}));

describe('CardList', () => {
  it('Test render', async () => {
    // mockParams.mockReturnValue({ page: '1' });
    render(
      <StoreProvider>
        <CardList query="asd" page={1} id="sad" data={mockProps} />
      </StoreProvider>
    );

    await waitFor(() => {
      const image = screen.getByAltText('Description 1');
      expect(image).toBeInTheDocument();

      const profileImage = screen.getByAltText('User');
      expect(profileImage).toBeInTheDocument();
    });
  });

  it('should close detailed card if clicked by list ', async () => {
    const { push } = useRouter();
    render(
      <StoreProvider>
        <CardList query="asd" page={1} id="sad" data={mockProps} />
      </StoreProvider>
    );
    const cardList = await screen.findByTestId('card-list');
    expect(cardList).toBeInTheDocument();
    await userEvent.click(cardList);

    expect(push).toHaveBeenCalledWith(`/?page=1&query=asd`);
  });

  it('should apply card-scrollable class when id', async () => {
    render(
      <StoreProvider>
        <CardList query="asd" page={1} id="sad" data={mockProps} />
      </StoreProvider>
    );

    const cardList = await screen.findByTestId('card-list');

    expect(cardList).toHaveClass(cls['card-scrollable']);
  });

  it('should apply card class when not id', async () => {
    render(
      <StoreProvider>
        <CardList query="asd" page={1} id="" data={mockProps} />
      </StoreProvider>
    );

    const cardList = await screen.findByTestId('card-list');

    expect(cardList).toHaveClass(cls['card']);
  });

  it('should display message when no data', async () => {
    server.use(
      http.get('https://api.unsplash.com/search/photos', async () => {
        return HttpResponse.json({
          results: [],
          total: 0,
          total_pages: 0,
        });
      })
    );

    render(
      <StoreProvider>
        <CardList
          query="asd"
          page={1}
          id="sad"
          data={{ results: emptyMockResults }}
        />
      </StoreProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText('We did not find anything, try another query.')
      ).toBeInTheDocument();
    });
  });
});
