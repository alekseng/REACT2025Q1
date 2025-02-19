import { render, screen, waitFor } from '@testing-library/react';
import { CardList } from './CardList';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { StoreProvider } from '../../../app/providers/StoreProvider';
import cls from './CardList.module.scss';
import { server } from '../../../shared/mocks/server.ts';
import { http, HttpResponse } from 'msw';
import {
  mockNavigate,
  mockParams,
} from '../../../shared/config/vitest/setupTests.ts';

describe('CardList', () => {
  it('Test render', async () => {
    mockParams.mockReturnValue({ page: '1' });
    render(
      <StoreProvider>
        <MemoryRouter>
          <CardList />
        </MemoryRouter>
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
    render(
      <StoreProvider>
        <MemoryRouter>
          <CardList />
        </MemoryRouter>
      </StoreProvider>
    );
    const cardList = await screen.findByTestId('card-list');
    expect(cardList).toBeInTheDocument();
    await userEvent.click(cardList);

    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });

  it('should apply card-scrollable class when id', async () => {
    mockParams.mockReturnValue({ id: 'test-id' });
    render(
      <StoreProvider>
        <MemoryRouter>
          <CardList />
        </MemoryRouter>
      </StoreProvider>
    );

    const cardList = await screen.findByTestId('card-list');

    expect(cardList).toHaveClass(cls['card-scrollable']);
  });

  it('should apply card class when not id', async () => {
    mockParams.mockReturnValue({});
    render(
      <StoreProvider>
        <MemoryRouter>
          <CardList />
        </MemoryRouter>
      </StoreProvider>
    );

    const cardList = await screen.findByTestId('card-list');

    expect(cardList).toHaveClass(cls['card']);
  });

  it('should display message when no data', async () => {
    mockParams.mockReturnValue({ page: '1' });

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
        <MemoryRouter>
          <CardList />
        </MemoryRouter>
      </StoreProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText('We did not find anything, try another query.')
      ).toBeInTheDocument();
    });
  });
});
