import { defineConfig } from 'vitest/config';
import svgr from 'vite-plugin-svgr';

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
        'src/app/App.tsx',
        'src/main.tsx',
      ],
    },
  },
  plugins: [svgr()],
});
