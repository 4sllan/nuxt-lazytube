import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  getYouTubeID,
  getVimeoID,
  calcAspect,
  isPostMessageSupported,
  getYoutubeThumbnail,
  getVimeoThumbnail
} from '../src/runtime/utils'

describe('Utils', () => {
  describe('getYouTubeID', () => {
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

  describe('getVimeoID', () => {
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

  describe('calcAspect', () => {
    it('should calculate aspect ratio for 16:9', () => {
      expect(calcAspect('16:9')).toBe(56.25)
    })

    it('should calculate aspect ratio for 4:3', () => {
      expect(calcAspect('4:3')).toBe(75)
    })

    it('should calculate aspect ratio for 1:1', () => {
      expect(calcAspect('1:1')).toBe(100)
    })

    it('should calculate aspect ratio for 21:9', () => {
      expect(calcAspect('21:9')).toBeCloseTo(42.86, 2)
    })

    it('should return default 56.25 for invalid format', () => {
      expect(calcAspect('16')).toBe(56.25)
    })
  })

  describe('isPostMessageSupported', () => {
    it('should return true when postMessage is available', () => {
      expect(isPostMessageSupported()).toBe(true)
    })
  })

  describe('getYoutubeThumbnail', () => {
    it('should return high quality thumbnail URL by default', () => {
      expect(getYoutubeThumbnail('dQw4w9WgXcQ')).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg')
    })

    it('should return default quality thumbnail', () => {
      expect(getYoutubeThumbnail('dQw4w9WgXcQ', 'default')).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg')
    })

    it('should return medium quality thumbnail', () => {
      expect(getYoutubeThumbnail('dQw4w9WgXcQ', 'medium')).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg')
    })

    it('should return high quality thumbnail', () => {
      expect(getYoutubeThumbnail('dQw4w9WgXcQ', 'high')).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg')
    })

    it('should return standard quality thumbnail', () => {
      expect(getYoutubeThumbnail('dQw4w9WgXcQ', 'standard')).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/sddefault.jpg')
    })

    it('should return maxres quality thumbnail', () => {
      expect(getYoutubeThumbnail('dQw4w9WgXcQ', 'maxres')).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg')
    })

    it('should return false for empty video ID', () => {
      expect(getYoutubeThumbnail('')).toBe(false)
    })

    it('should return false for undefined video ID', () => {
      expect(getYoutubeThumbnail(undefined as any)).toBe(false)
    })
  })

  describe('getVimeoThumbnail', () => {
    it('should return high quality thumbnail URL by default', () => {
      expect(getVimeoThumbnail('123456789')).toBe('https://i.vimeocdn.com/video/123456789_640x360.jpg')
    })

    it('should return default quality thumbnail', () => {
      expect(getVimeoThumbnail('123456789', 'default')).toBe('https://i.vimeocdn.com/video/123456789_200x150.jpg')
    })

    it('should return medium quality thumbnail', () => {
      expect(getVimeoThumbnail('123456789', 'medium')).toBe('https://i.vimeocdn.com/video/123456789_295x166.jpg')
    })

    it('should return high quality thumbnail', () => {
      expect(getVimeoThumbnail('123456789', 'high')).toBe('https://i.vimeocdn.com/video/123456789_640x360.jpg')
    })

    it('should return standard quality thumbnail', () => {
      expect(getVimeoThumbnail('123456789', 'standard')).toBe('https://i.vimeocdn.com/video/123456789_960x540.jpg')
    })

    it('should return maxres quality thumbnail', () => {
      expect(getVimeoThumbnail('123456789', 'maxres')).toBe('https://i.vimeocdn.com/video/123456789_1280x720.jpg')
    })

    it('should return false for empty video ID', () => {
      expect(getVimeoThumbnail('')).toBe(false)
    })

    it('should return false for undefined video ID', () => {
      expect(getVimeoThumbnail(undefined as any)).toBe(false)
    })
  })
})
