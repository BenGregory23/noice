import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copy } from 'fs-extra';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Copy the _redirects file to the build output directory
    afterBuild: async () => {
      await copy('_redirects', 'dist/_redirects');
    },
  },
})
