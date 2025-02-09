import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { Header } from './Header';

const mockFn = vi.fn();

describe('Header', () => {
  it('Test render', async () => {
    render(<Header onSearch={mockFn} />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
