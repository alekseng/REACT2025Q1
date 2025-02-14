import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import { vi, describe, Mock, expect, it } from 'vitest';
import { MainPage } from './MainPage';
import { fetchData } from '../../../shared/api/fetchData/fetchData';
import userEvent from '@testing-library/user-event';
import { mockResults } from '../../../enteties/CardList/types/testTypes';

vi.mock('../../../shared/api/fetchData/fetchData', () => ({
  fetchData: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: vi.fn(),
  };
});

describe('MainPage', () => {
  it('should display loader when loading data', async () => {
    (useParams as Mock).mockReturnValue({ page: '1' });
    (fetchData as Mock).mockResolvedValue({
      results: [],
      total_pages: 1,
    });

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should navigate to not found page when page incorrect', async () => {
    (useParams as Mock).mockReturnValue({ page: 0 });
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/not-found');
  });

  it('should navigate to "not found page" if the page is larger than the maximum number of pages', async () => {
    (useParams as Mock).mockReturnValue({ page: '3' });
    (fetchData as Mock).mockResolvedValue({
      results: [],
      total_pages: 2,
    });

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/not-found');
  });

  it('should display message when no data', async () => {
    (useParams as Mock).mockReturnValue({ page: '1' });
    (fetchData as Mock).mockResolvedValue({
      results: [],
      total_pages: 1,
    });

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      const message = screen.getByText(
        'We did not find anything, try another query.'
      );
      expect(message).toBeInTheDocument();
    });
  });

  it('should search new query and navigate to new page', async () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    const input = screen.getByTestId('input');
    await userEvent.type(input, 'new search{enter}');

    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });

  it('should navigate to next page', async () => {
    (fetchData as Mock).mockResolvedValue({
      results: mockResults,
      total_pages: 2,
    });
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      const paginationButton = screen.getByText('>');
      userEvent.click(paginationButton);

      expect(mockNavigate).toHaveBeenCalledWith('/page/2');
    });
  });

  it('should navigate to detailed card', async () => {
    (fetchData as Mock).mockResolvedValue({
      results: mockResults,
      total_pages: 1,
    });
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      const item = screen.getByTestId('item-container');
      userEvent.click(item);

      expect(mockNavigate).toHaveBeenCalledWith('detail/1');
    });
  });
});
