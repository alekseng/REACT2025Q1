import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { HeaderForm } from './HeaderForm';
import { MemoryRouter } from 'react-router-dom';
import { StoreProvider } from '../../../app/providers/StoreProvider';
import { mockNavigate } from '../../../shared/config/vitest/setupTests.ts';

describe('HeaderForm', () => {
  it('Test render', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <HeaderForm />
        </MemoryRouter>
      </StoreProvider>
    );

    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  it('it should change query', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <HeaderForm />
        </MemoryRouter>
      </StoreProvider>
    );

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'cats' } });

    const sendBtn = screen.getByText('Search');
    await userEvent.click(sendBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });
});
