import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Use relative paths so the site works on GitHub Pages subpaths and Cloudflare Pages
  base: '/Team-Terrabloom/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', '@react-three/drei'],
  },
  resolve: {
    alias: {
      'three/examples/js/libs/stats.min': 'three/examples/jsm/libs/stats.module.js',
    },
  },
});
