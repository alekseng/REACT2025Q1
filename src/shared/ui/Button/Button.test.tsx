import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
  it('Test render', () => {
    render(<Button>text</Button>);
    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
