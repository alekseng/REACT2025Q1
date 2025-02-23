import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';
import { MemoryRouter } from 'react-router-dom';
import { StoreProvider } from '../../../app/providers/StoreProvider';

describe('Header', () => {
  it('Test render', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </StoreProvider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
