import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useIntersectionObserver } from '../useIntersectionObserver';

// Mock IntersectionObserver
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

const mockIntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: mockObserve,
  unobserve: mockUnobserve,
  disconnect: mockDisconnect,
}));

window.IntersectionObserver = mockIntersectionObserver;

describe('useIntersectionObserver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates intersection observer with default options', () => {
    const callback = jest.fn();
    const elementRef = { current: document.createElement('div') };

    renderHook(() => useIntersectionObserver(elementRef, callback));

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.1,
        root: null,
        rootMargin: '0px',
      }
    );
    expect(mockObserve).toHaveBeenCalledWith(elementRef.current);
  });

  it('creates intersection observer with custom options', () => {
    const callback = jest.fn();
    const elementRef = { current: document.createElement('div') };
    const options = {
      threshold: 0.5,
      rootMargin: '50px',
    };

    renderHook(() => useIntersectionObserver(elementRef, callback, options));

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.5,
        root: null,
        rootMargin: '50px',
      }
    );
  });

  it('calls callback when intersection changes', () => {
    const callback = jest.fn();
    const elementRef = { current: document.createElement('div') };

    renderHook(() => useIntersectionObserver(elementRef, callback));

    // Get the callback passed to intersection observer
    const intersectionCallback = mockIntersectionObserver.mock.calls[0][0];
    
    // Simulate intersection entry
    const mockEntry = {
      isIntersecting: true,
      target: elementRef.current,
    };
    
    intersectionCallback([mockEntry]);

    expect(callback).toHaveBeenCalledWith(true, mockEntry);
  });

  it('handles multiple intersection entries', () => {
    const callback = jest.fn();
    const elementRef = { current: document.createElement('div') };

    renderHook(() => useIntersectionObserver(elementRef, callback));

    // Get the callback passed to intersection observer
    const intersectionCallback = mockIntersectionObserver.mock.calls[0][0];
    
    // Simulate multiple intersection entries
    const mockEntries = [
      { isIntersecting: true, target: elementRef.current },
      { isIntersecting: false, target: document.createElement('div') },
    ];
    
    intersectionCallback(mockEntries);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, true, mockEntries[0]);
    expect(callback).toHaveBeenNthCalledWith(2, false, mockEntries[1]);
  });

  it('disconnects observer on unmount', () => {
    const callback = jest.fn();
    const elementRef = { current: document.createElement('div') };

    const { unmount } = renderHook(() => 
      useIntersectionObserver(elementRef, callback)
    );

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('handles null element ref', () => {
    const callback = jest.fn();
    const elementRef = { current: null };

    renderHook(() => useIntersectionObserver(elementRef, callback));

    // Should not create observer or call observe
    expect(mockIntersectionObserver).not.toHaveBeenCalled();
    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('handles unsupported IntersectionObserver', () => {
    // Mock unsupported intersection observer
    const originalIntersectionObserver = window.IntersectionObserver;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).IntersectionObserver = undefined;

    const callback = jest.fn();
    const elementRef = { current: document.createElement('div') };

    renderHook(() => useIntersectionObserver(elementRef, callback));

    // Should call callback immediately as fallback
    expect(callback).toHaveBeenCalledWith(true, {});

    // Restore
    window.IntersectionObserver = originalIntersectionObserver;
  });

  it('recreates observer when options change', () => {
    const callback = jest.fn();
    const elementRef = { current: document.createElement('div') };
    
    const { rerender } = renderHook(
      ({ threshold }) => useIntersectionObserver(elementRef, callback, { threshold }),
      { initialProps: { threshold: 0.1 } }
    );

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
    expect(mockDisconnect).toHaveBeenCalledTimes(0);

    // Change threshold
    rerender({ threshold: 0.5 });

    // Should disconnect old observer and create new one
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(2);
  });

  it('handles element ref change', () => {
    const callback = jest.fn();
    
    const { rerender } = renderHook(
      ({ element }) => useIntersectionObserver({ current: element }, callback),
      { initialProps: { element: document.createElement('div') } }
    );

    expect(mockObserve).toHaveBeenCalledTimes(1);

    // Change element
    const newElement = document.createElement('div') as HTMLDivElement;
    rerender({ element: newElement });

    // Should observe new element
    expect(mockObserve).toHaveBeenCalledTimes(2);
    expect(mockObserve).toHaveBeenLastCalledWith(newElement);
  });
});