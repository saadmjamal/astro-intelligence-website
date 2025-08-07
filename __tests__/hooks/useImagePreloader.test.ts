/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { useImagePreloader } from '@/hooks/useImagePreloader';

// Store original createElement before mocking
const originalCreateElement = document.createElement.bind(document);

// Mock DOM methods with proper DOM node structure
const createMockElement = (tagName: string) => {
  const element = originalCreateElement(tagName);
  if (tagName === 'img') {
    Object.defineProperty(element, 'addEventListener', {
      value: jest.fn(),
      writable: true,
    });
    Object.defineProperty(element, 'removeEventListener', {
      value: jest.fn(),
      writable: true,
    });
  }
  return element;
};

// Mock Image constructor
class MockImage {
  addEventListener = jest.fn();
  removeEventListener = jest.fn();
  src = '';
  
  constructor() {
    // Simulate async loading behavior
    setTimeout(() => {
      // We'll trigger load/error in tests
    }, 0);
  }
}

// Replace global Image with our mock
Object.defineProperty(global, 'Image', {
  value: MockImage,
  writable: true,
});

// Mock document.createElement to return proper DOM nodes
jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
  return createMockElement(tagName);
});

describe('useImagePreloader', () => {
  let mockImage: MockImage;
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockImage = new MockImage();
    (global.Image as any) = jest.fn(() => mockImage);
  });

  it('should preload a single image successfully', async () => {
    const { result } = renderHook(() => useImagePreloader());
    
    const preloadPromise = result.current.preloadImage('/test-image.jpg', {
      sizes: '100vw',
      priority: 'high',
    });

    // Simulate successful image load
    act(() => {
      const loadCall = mockImage.addEventListener.mock.calls.find(
        ([event]) => event === 'load'
      );
      if (loadCall) {
        const loadHandler = loadCall[1];
        loadHandler();
      }
    });

    const image = await preloadPromise;
    expect(image).toBe(mockImage);
  });

  it('should handle image load errors', async () => {
    const { result } = renderHook(() => useImagePreloader());
    
    const preloadPromise = result.current.preloadImage('/error-image.jpg');

    // Simulate image load error
    act(() => {
      const errorHandler = mockImage.addEventListener.mock.calls.find(
        ([event]) => event === 'error'
      )?.[1];
      errorHandler?.();
    });

    await expect(preloadPromise).rejects.toThrow('Failed to preload image');
  });

  it('should return cached image for subsequent requests', async () => {
    const { result } = renderHook(() => useImagePreloader());
    
    // First request
    const firstPromise = result.current.preloadImage('/cached-image.jpg');
    
    act(() => {
      const loadHandler = mockImage.addEventListener.mock.calls.find(
        ([event]) => event === 'load'
      )?.[1];
      loadHandler?.();
    });

    await firstPromise;

    // Second request should return cached result
    const secondPromise = result.current.preloadImage('/cached-image.jpg');
    const cachedImage = await secondPromise;
    
    expect(cachedImage).toBe(mockImage);
  });

  it('should batch preload multiple images', async () => {
    const { result } = renderHook(() => useImagePreloader());
    
    const images = [
      { src: '/image1.jpg', options: { priority: 'high' as const } },
      { src: '/image2.jpg', options: { priority: 'low' as const } },
    ];

    const batchPromise = result.current.preloadImages(images, {
      concurrency: 2,
      timeout: 5000,
    });

    // Simulate all images loading successfully
    act(() => {
      mockImage.addEventListener.mock.calls
        .filter(([event]) => event === 'load')
        .forEach(([, handler]) => handler());
    });

    const results = await batchPromise;
    expect(results).toHaveLength(2);
    expect(results.every(r => r.success)).toBe(true);
  });

  it('should provide cache statistics', () => {
    const { result } = renderHook(() => useImagePreloader());
    
    const stats = result.current.getCacheStats();
    expect(stats).toEqual({
      total: 0,
      loaded: 0,
      loading: 0,
      errors: 0,
    });
  });

  it('should clear cache when requested', async () => {
    const { result } = renderHook(() => useImagePreloader());
    
    // Add an image to cache
    const preloadPromise = result.current.preloadImage('/test-clear.jpg');
    
    act(() => {
      const loadHandler = mockImage.addEventListener.mock.calls.find(
        ([event]) => event === 'load'
      )?.[1];
      loadHandler?.();
    });

    await preloadPromise;

    // Verify cache has content
    let stats = result.current.getCacheStats();
    expect(stats.total).toBeGreaterThan(0);

    // Clear cache
    act(() => {
      result.current.clearCache();
    });

    // Verify cache is empty
    stats = result.current.getCacheStats();
    expect(stats.total).toBe(0);
  });
});