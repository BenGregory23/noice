import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import { copyFileSync } from 'fs';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Hook to copy the _redirects file after build
  afterBuild: () => {
    const redirectsSource = resolve(__dirname, '_redirects');
    const redirectsDestination = resolve(__dirname, 'dist', '_redirects');
    copyFileSync(redirectsSource, redirectsDestination);
  },
})
