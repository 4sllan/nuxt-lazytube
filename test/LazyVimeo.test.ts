import { describe, it, expect } from 'vitest'
import { getVimeoID } from '../src/runtime/utils'

describe('LazyVimeo Component Logic', () => {
  describe('Video ID Extraction', () => {
    it('should extract Vimeo ID from standard URL', () => {
      expect(getVimeoID('https://vimeo.com/123456789')).toBe('123456789')
    })

    it('should extract Vimeo ID from URL with path', () => {
      expect(getVimeoID('https://vimeo.com/channels/staffpicks/123456789')).toBe('123456789')
    })

    it('should extract Vimeo ID from player URL', () => {
      expect(getVimeoID('https://player.vimeo.com/video/123456789')).toBe('123456789')
    })
  })

  describe('Props Validation', () => {
    it('should validate aspectRatio format correctly', () => {
      const validFormats = ['16:9', '4:3', '1:1', '21:9']
      const invalidFormats = ['16', 'invalid', '16:9:9']

      validFormats.forEach(format => {
        expect(/^\d+:\d+$/u.test(format)).toBe(true)
      })

      invalidFormats.forEach(format => {
        expect(/^\d+:\d+$/u.test(format)).toBe(false)
      })
    })
  })
})
