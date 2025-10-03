import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
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
