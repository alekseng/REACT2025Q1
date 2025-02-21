import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { describe, it, expect } from 'vitest';

describe('Checkbox', () => {
  it('Test render', () => {
    render(<Checkbox />);
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
  });
});
