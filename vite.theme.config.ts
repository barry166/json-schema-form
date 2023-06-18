import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  build: {
    emptyOutDir: false,
    lib: {
      // entry: {
      //   theme: 'src/lib/theme-default/index.tsx'
      // },
      entry: 'src/lib/theme-default/index.tsx'
      ,
      name: '[name]',
      fileName: (format) => `theme/[name].${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue'], // 如果库依赖了外部库，可以在这里指定为外部依赖，例如 Vue
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})