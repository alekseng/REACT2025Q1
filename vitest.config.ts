import { defineConfig } from 'vitest/config';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/shared/config/vitest/setupTests.ts',
    coverage: {
      provider: 'istanbul',
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/__tests__/setup.ts',
      ],
    },
    alias: {
      '\\.svg\\?react$': './src/shared/mocks/svgMock.ts',
    },
  },
  plugins: [svgr(), react()],
});
