import { defineConfig } from 'vitest/config'
import { join } from 'node:path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Resolve imports de Nuxt 4 dentro da lib
      '#imports': join(__dirname, 'src'),
      '#runtime': join(__dirname, 'src/runtime'),
      '#modules': join(__dirname, 'src/module.ts'),
      '@': join(__dirname, 'src/runtime')
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom', // ambiente leve para testes de Vue/Nuxt
    include: ['test/**/*.test.ts'], // apenas arquivos de teste da lib
    exclude: ['playground/**', 'test/e2e/**'], // ignora playground e testes e2e
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: ['playground/**', 'test/e2e/**']
    }
  }
})