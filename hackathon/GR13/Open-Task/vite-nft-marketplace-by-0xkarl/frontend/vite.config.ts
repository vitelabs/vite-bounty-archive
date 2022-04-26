import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';

import { compilerOptions } from './tsconfig.json';

const paths: Record<string, string[]> = compilerOptions['paths'];
const alias = Object.entries(paths).reduce((acc, [key, [value]]) => {
  const aliasKey = key.substring(0, key.length - 2);
  const path = value.substring(0, value.length - 2);
  return {
    ...acc,
    [aliasKey]: resolve(__dirname, path),
  };
}, {});

export default defineConfig({
  resolve: {
    alias,
  },
  plugins: [
    react(),
    inject({
      modules: { Buffer: ['buffer', 'Buffer'] },
    }),
  ],
  define: {},
});
