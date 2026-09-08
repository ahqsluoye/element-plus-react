import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: {
            '@qsxy/element-plus-react': path.resolve(__dirname, 'src/components'),
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
    test: {
        environment: 'jsdom',
        globals: true,
        include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
        setupFiles: ['./scripts/test-setup.ts'],
    },
});
