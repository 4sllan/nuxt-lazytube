import { describe, it, expect } from 'vitest'
import { getYouTubeID } from '../src/runtime/utils'

describe('LazyYoutube Component Logic', () => {
  describe('Video ID Extraction', () => {
    it('should extract YouTube ID from standard URL', () => {
      expect(getYouTubeID('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
    })

    it('should extract YouTube ID from short URL', () => {
      expect(getYouTubeID('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
    })

    it('should extract YouTube ID from embed URL', () => {
      expect(getYouTubeID('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
    })

    it('should extract YouTube ID from v URL', () => {
      expect(getYouTubeID('https://www.youtube.com/v/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
    })

    it('should extract YouTube ID from vi URL', () => {
      expect(getYouTubeID('https://www.youtube.com/vi/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
    })

    it('should handle URL with additional parameters', () => {
      expect(getYouTubeID('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=120')).toBe('dQw4w9WgXcQ')
    })

    it('should return the input if no ID is found', () => {
      expect(getYouTubeID('invalid-url')).toBe('invalid-url')
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
