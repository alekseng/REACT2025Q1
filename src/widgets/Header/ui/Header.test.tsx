import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';
import { StoreProvider } from '../../../app/providers/StoreProvider';

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}));

describe('Header', () => {
  it('Test render', async () => {
    render(
      <StoreProvider>
        <Header />
      </StoreProvider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
