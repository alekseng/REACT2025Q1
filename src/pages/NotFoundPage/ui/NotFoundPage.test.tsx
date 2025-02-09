import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NotFoundPage } from './NotFoundPage';
import { MemoryRouter } from 'react-router-dom';

describe('NotFoundPage', () => {
  it('Test render', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
