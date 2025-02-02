

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  // Fallback in case the variable is not defined
  const backendUrl = https://mern-estate-deploy.vercel.app/ ;
  console.log('Backend URL:', backendUrl);

  return {
    server: {
      proxy: {
        '/api': {
          target: backendUrl, // Use the loaded variable
          secure: false,
        },
      },
    },
    plugins: [react()],
  };
});
