import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Enable Fast Refresh for better development experience
      fastRefresh: true,
    }),
    tailwindcss()
  ],
  
  // Performance optimizations
  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // Enable minification
    minify: 'esbuild',
    
    // Rollup options for better bundling
    rollupOptions: {
      output: {
        // Split chunks for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion', 'motion/react'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          utils: ['tailwind-merge', 'react-responsive']
        }
      }
    },
    
    // Source map for debugging (disable in production)
    sourcemap: mode === 'development',
    
    // Target modern browsers for better performance
    target: 'es2015'
  },

  // Development server optimizations
  server: {
    // Port configuration
    port: 3000,
    
    // Open browser automatically
    open: true,
    
    // Enable hot module replacement
    hmr: {
      overlay: false // Disable error overlay for better UX
    }
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'motion/react',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'tailwind-merge',
      'react-responsive',
      'react-scroll',
      'lucide-react'
    ],
    // Force specific dependencies to be pre-bundled
    force: true
  }
}))
