import { defineConfig } from 'vite';
/*import {resolve} from 'path';*/

import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
/*let __dirname;*/
export default defineConfig({
  /*resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },*/
  plugins: [vue()],
})
