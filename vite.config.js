import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'; // 1. Import the plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
    visualizer({
      open: true, // 2. This opens the stats.html file automatically after build
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),

  ],
 
})
