import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  css: ['src/styles/global.css'],
  vite: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    },
    ssr: {
      external: ['react', 'react-dom']
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
    resolve: {
      alias: {
        'react': 'react',
        'react-dom': 'react-dom'
      }
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        external: ['astro:*'],
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom']
          }
        }
      }
    }
  },
  output: 'static',
  build: {
    format: 'file',
    inlineStylesheets: 'auto'
  },
  server: {
    host: true
  }
});
