import { describe, it, expect, vi } from 'vitest'
import { defineNuxtModule, addComponent, useLogger, createResolver } from '@nuxt/kit'

// Mock @nuxt/kit
vi.mock('@nuxt/kit', () => ({
  defineNuxtModule: (options: any) => options,
  addComponent: vi.fn(),
  useLogger: vi.fn(() => ({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  })),
  createResolver: vi.fn(() => ({
    resolve: vi.fn((path: string) => path)
  }))
}))

describe('Nuxt Module', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should have correct module name', async () => {
    const module = await import('../src/module.ts')
    expect(module.default.meta.name).toBe('nuxt-lazytube')
  })

  it('should have correct config key', async () => {
    const module = await import('../src/module.ts')
    expect(module.default.meta.configKey).toBe('NuxtLazytube')
  })

  it('should have Nuxt compatibility >=3.0.0', async () => {
    const module = await import('../src/module.ts')
    expect(module.default.meta.compatibility.nuxt).toBe('>=3.0.0')
  })

  it('should register LazyYoutube component', async () => {
    const { addComponent: mockAddComponent } = await import('@nuxt/kit')
    const module = await import('../src/module.ts')
    
    // Mock nuxt context
    const mockNuxt = {
      options: {}
    }
    
    // Call setup function
    module.default.setup({}, mockNuxt)
    
    // Check if addComponent was called for LazyYoutube
    expect(mockAddComponent).toHaveBeenCalledWith({
      name: 'lazy-youtube',
      filePath: './runtime/LazyYoutube.vue',
      pascalName: 'LazyYoutube',
      global: true,
      mode: 'client'
    })
  })

  it('should register LazyVimeo component', async () => {
    const { addComponent: mockAddComponent } = await import('@nuxt/kit')
    const module = await import('../src/module.ts')
    
    // Mock nuxt context
    const mockNuxt = {
      options: {}
    }
    
    // Call setup function
    module.default.setup({}, mockNuxt)
    
    // Check if addComponent was called for LazyVimeo
    expect(mockAddComponent).toHaveBeenCalledWith({
      name: 'lazy-vimeo',
      filePath: './runtime/LazyVimeo.vue',
      pascalName: 'LazyVimeo',
      global: true,
      mode: 'client'
    })
  })

  it('should register both components', async () => {
    const { addComponent: mockAddComponent } = await import('@nuxt/kit')
    const module = await import('../src/module.ts')
    
    // Mock nuxt context
    const mockNuxt = {
      options: {}
    }
    
    // Call setup function
    module.default.setup({}, mockNuxt)
    
    // Check if addComponent was called twice (once for each component)
    expect(mockAddComponent).toHaveBeenCalledTimes(2)
  })

  it('should accept module options', async () => {
    const module = await import('../src/module.ts')
    const mockOptions = {
      // Any future module options would go here
    }
    
    const mockNuxt = {
      options: {}
    }
    
    // Should not throw when options are provided
    expect(() => {
      module.default.setup(mockOptions, mockNuxt)
    }).not.toThrow()
  })
})
