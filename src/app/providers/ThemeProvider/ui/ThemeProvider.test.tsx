import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from './ThemeProvider.tsx';
import { Theme, ThemeContext } from '../lib/ThemeContext.ts';

describe('ThemeProvider', () => {
  it('should display theme', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => {
            return <div data-testid="theme">{theme}</div>;
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent(Theme.LIGHT);
  });
});
