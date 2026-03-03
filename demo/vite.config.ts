import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/react-guide-step/',
  root: resolve(__dirname),
  resolve: {
    alias: {
      'react-guide-step': resolve(__dirname, '../src/index.ts'),
    },
  },
  build: {
    outDir: resolve(__dirname, '../docs'),
    emptyOutDir: true,
  },
});
