// vite.config.js
export default {
    //... other config
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('dist/assets/index-CdO6Jn9t.js')) {
              return 'index-CdO6Jn9t.js'; // Create a separate chunk for dist, the size is too big.
            }
          }
        }
      }
    }
  };