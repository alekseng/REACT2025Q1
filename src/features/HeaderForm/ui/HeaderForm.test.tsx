import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { HeaderForm } from './HeaderForm';
import { StoreProvider } from '../../../app/providers/StoreProvider';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}));

describe('HeaderForm', () => {
  it('Test render', async () => {
    render(
      <StoreProvider>
        <HeaderForm />
      </StoreProvider>
    );

    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  it('it should change query', async () => {
    const { push } = useRouter();
    render(
      <StoreProvider>
        <HeaderForm />
      </StoreProvider>
    );

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'cats' } });

    const sendBtn = screen.getByTestId('search');
    await userEvent.click(sendBtn);

    expect(push).toHaveBeenCalledWith(`/?page=1&query=cats`, undefined, {
      shallow: false,
    });
  });
});
