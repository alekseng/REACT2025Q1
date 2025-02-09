import { render, screen } from '@testing-library/react';
import { Input } from './Input';
import { describe, it, expect } from 'vitest';

describe('Input', () => {
  it('Test render', () => {
    render(<Input />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });
});
