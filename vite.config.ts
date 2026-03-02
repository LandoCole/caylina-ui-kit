import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'caylina-ui.js',
    },
    // Bundle everything — no externals for CDN use
    rollupOptions: {
      treeshake: {
        moduleSideEffects: true,
      },
    },
    minify: 'esbuild',
    target: 'es2021',
  },
  plugins: [
    {
      name: 'copy-tokens',
      closeBundle() {
        copyFileSync(
          resolve(__dirname, 'src/tokens.css'),
          resolve(__dirname, 'dist/tokens.css')
        );
      },
    },
  ],
});
