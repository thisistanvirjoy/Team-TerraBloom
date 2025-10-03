import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// Set base path via env for different hosts
// Cloudflare Pages (root): leave empty or set VITE_BASE='/'
// GitHub Pages (project): set VITE_BASE='/<repo>/' e.g. '/Team-TerraBloom/'
const base = process.env.VITE_BASE || '/';

export default defineConfig({
  base,
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
