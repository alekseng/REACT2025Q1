import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import { Pagination } from './Pagination';

const mockFn = vi.fn();

describe('Pagination', () => {
  it('Test render', async () => {
    render(
      <Pagination currentPage={'2'} onPageChange={mockFn} totalPage={10} />
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('Test click by buttons', async () => {
    render(
      <Pagination currentPage={'2'} onPageChange={mockFn} totalPage={10} />
    );

    const increaseBtn = screen.getByText('>');
    await userEvent.click(increaseBtn);
    expect(mockFn).toHaveBeenCalledWith(3);

    const decreaseBtn = screen.getByText('<');
    await userEvent.click(decreaseBtn);
    expect(mockFn).toHaveBeenCalledWith(1);
  });
});
