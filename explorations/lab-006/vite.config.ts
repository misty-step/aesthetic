import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Lanes C and D import the shipped aesthetic.css from the repo root.
  server: {
    fs: {
      allow: [path.resolve(__dirname, '../..')],
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        a: path.resolve(__dirname, 'a.html'),
        b: path.resolve(__dirname, 'b.html'),
        c: path.resolve(__dirname, 'c.html'),
        d: path.resolve(__dirname, 'd.html'),
      },
    },
  },
});
