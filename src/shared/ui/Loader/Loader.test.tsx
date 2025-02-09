import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';
import { describe, it, expect } from 'vitest';

describe('Loader', () => {
  it('Test render', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
