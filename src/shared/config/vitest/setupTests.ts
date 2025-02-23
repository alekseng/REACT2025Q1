import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../../mocks/server.ts';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const mockNavigate = vi.fn();
const mockParams = vi.fn(() => ({}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: mockParams,
  };
});

export { mockNavigate, mockParams };
