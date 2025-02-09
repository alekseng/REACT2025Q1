import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import { HeaderForm } from './HeaderForm';

const mockFn = vi.fn();

describe('HeaderForm', () => {
  it('Test render', async () => {
    render(<HeaderForm onSearch={mockFn} />);

    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  it('it should change query', async () => {
    render(<HeaderForm onSearch={mockFn} />);

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'cats' } });

    const sendBtn = screen.getByText('Search');
    await userEvent.click(sendBtn);
    expect(mockFn).toHaveBeenCalledWith('cats');
  });
});
