import '@testing-library/jest-dom';

import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../../mocks/server.ts';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
