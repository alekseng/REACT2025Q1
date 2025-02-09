import { fireEvent, render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { PageError } from './PageError';

const reloadMock = vi.fn();
const originalLocation = globalThis.location;
globalThis.location = { ...originalLocation, reload: reloadMock };

describe('PageError', () => {
  it('Test render', async () => {
    render(<PageError />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('it should reload page', async () => {
    render(<PageError />);

    const sendBtn = screen.getByText('Reload page');
    fireEvent.click(sendBtn);
    expect(reloadMock).toHaveBeenCalled();
  });
});
