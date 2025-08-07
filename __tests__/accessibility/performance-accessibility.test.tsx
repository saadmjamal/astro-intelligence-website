import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock performance API for testing
Object.defineProperty(window, 'performance', {
  value: {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByType: jest.fn(() => []),
    getEntriesByName: jest.fn(() => []),
  },
  writable: true,
});

// Mock IntersectionObserver
Object.defineProperty(window, 'IntersectionObserver', {
  value: class MockIntersectionObserver {
    constructor(callback: any) {
      this.callback = callback;
    }
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    callback: any;
  },
  writable: true,
});

describe('Performance and Accessibility Integration Tests', () => {
  describe('Animation and Reduced Motion', () => {
    it('respects prefers-reduced-motion settings', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
        writable: true,
      });

      const AnimatedComponent = () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        return (
          <div 
            className={prefersReducedMotion ? 'motion-reduce' : 'animate-fade-in'}
            data-testid="animated-element"
          >
            Animated Content
          </div>
        );
      };

      render(<AnimatedComponent />);
      
      const element = screen.getByTestId('animated-element');
      expect(element).toHaveClass('motion-reduce');
    });

    it('provides alternative feedback for animations', () => {
      const LoadingComponent = () => {
        const [isLoading, setIsLoading] = React.useState(true);

        React.useEffect(() => {
          const timer = setTimeout(() => setIsLoading(false), 1000);
          return () => clearTimeout(timer);
        }, []);

        return (
          <div>
            {isLoading ? (
              <div role="status" aria-live="polite">
                <span className="sr-only">Loading content, please wait...</span>
                <div 
                  className="animate-spin" 
                  aria-hidden="true"
                  data-testid="loading-spinner"
                >
                  ⟳
                </div>
              </div>
            ) : (
              <div role="status" aria-live="polite">
                Content loaded successfully
              </div>
            )}
          </div>
        );
      };

      render(<LoadingComponent />);
      
      expect(screen.getByText('Loading content, please wait...')).toBeInTheDocument();
      expect(screen.getByTestId('loading-spinner')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Large Dataset Accessibility', () => {
    it('handles virtualized lists accessibly', async () => {
      const VirtualizedList = ({ items }: { items: string[] }) => {
        const [visibleItems, setVisibleItems] = React.useState(items.slice(0, 10));
        const [hasMore, setHasMore] = React.useState(items.length > 10);

        const loadMore = () => {
          const currentLength = visibleItems.length;
          const newItems = items.slice(0, currentLength + 10);
          setVisibleItems(newItems);
          setHasMore(newItems.length < items.length);
        };

        return (
          <div role="region" aria-label="Search results" aria-live="polite">
            <div role="status" className="sr-only">
              Showing {visibleItems.length} of {items.length} results
            </div>
            
            <ul role="list" aria-label="Results list">
              {visibleItems.map((item, index) => (
                <li 
                  key={index} 
                  role="listitem"
                  tabIndex={0}
                  aria-posinset={index + 1}
                  aria-setsize={items.length}
                >
                  {item}
                </li>
              ))}
            </ul>
            
            {hasMore && (
              <button 
                onClick={loadMore}
                aria-describedby="load-more-description"
              >
                Load More Results
              </button>
            )}
            <div id="load-more-description" className="sr-only">
              Load {Math.min(10, items.length - visibleItems.length)} more results
            </div>
          </div>
        );
      };

      const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
      render(<VirtualizedList items={items} />);

      // Check initial state
      expect(screen.getByText('Showing 10 of 100 results')).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(10);
      
      // Check ARIA attributes for virtual list
      listItems.forEach((item, index) => {
        expect(item).toHaveAttribute('aria-posinset', String(index + 1));
        expect(item).toHaveAttribute('aria-setsize', '100');
        expect(item).toHaveAttribute('tabIndex', '0');
      });

      // Test load more functionality
      const loadMoreButton = screen.getByRole('button', { name: /load more/i });
      fireEvent.click(loadMoreButton);

      await waitFor(() => {
        expect(screen.getByText('Showing 20 of 100 results')).toBeInTheDocument();
      });
    });

    it('provides accessible infinite scrolling', () => {
      const InfiniteScrollList = () => {
        const [items, setItems] = React.useState(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));
        const [isLoading, setIsLoading] = React.useState(false);

        const loadMore = React.useCallback(() => {
          setIsLoading(true);
          setTimeout(() => {
            setItems(prev => [
              ...prev,
              ...Array.from({ length: 20 }, (_, i) => `Item ${prev.length + i + 1}`)
            ]);
            setIsLoading(false);
          }, 500);
        }, []);

        return (
          <div role="region" aria-label="Infinite scroll list">
            <div role="status" aria-live="polite" className="sr-only">
              {isLoading ? 'Loading more items...' : `${items.length} items loaded`}
            </div>
            
            <ul role="list">
              {items.map((item, index) => (
                <li key={index} role="listitem" tabIndex={0}>
                  {item}
                </li>
              ))}
            </ul>
            
            {isLoading && (
              <div role="status" aria-live="polite">
                <span className="sr-only">Loading more content...</span>
                <div aria-hidden="true">Loading...</div>
              </div>
            )}
            
            <button 
              onClick={loadMore}
              disabled={isLoading}
              aria-label={isLoading ? 'Loading more items...' : 'Load more items'}
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        );
      };

      render(<InfiniteScrollList />);
      
      expect(screen.getByText('20 items loaded')).toBeInTheDocument();
      
      const loadButton = screen.getByRole('button');
      fireEvent.click(loadButton);
      
      expect(screen.getByText('Loading more items...')).toBeInTheDocument();
      expect(loadButton).toBeDisabled();
    });
  });

  describe('Performance Impact of Accessibility Features', () => {
    it('measures performance impact of ARIA live regions', async () => {
      const startTime = performance.now();
      
      const LiveRegionTest = () => {
        const [messages, setMessages] = React.useState<string[]>([]);

        const addMessage = () => {
          setMessages(prev => [...prev, `Message ${prev.length + 1}`]);
        };

        return (
          <div>
            <button onClick={addMessage}>Add Message</button>
            
            {/* Multiple live regions to test performance */}
            <div role="log" aria-live="polite" aria-label="Messages log">
              {messages.map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
            </div>
            
            <div role="status" aria-live="polite">
              {messages.length} messages total
            </div>
          </div>
        );
      };

      render(<LiveRegionTest />);
      
      const button = screen.getByRole('button');
      
      // Add multiple messages quickly
      for (let i = 0; i < 10; i++) {
        fireEvent.click(button);
      }

      await waitFor(() => {
        expect(screen.getByText('10 messages total')).toBeInTheDocument();
      });

      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Performance should be reasonable (< 100ms for 10 updates)
      expect(duration).toBeLessThan(100);
    });

    it('optimizes focus management performance', () => {
      const FocusIntensiveComponent = () => {
        const [activeIndex, setActiveIndex] = React.useState(0);
        const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

        const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = Math.min(index + 1, items.length - 1);
            setActiveIndex(nextIndex);
            // Focus management should be efficient
            const nextElement = document.querySelector(`[data-index="${nextIndex}"]`) as HTMLElement;
            nextElement?.focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = Math.max(index - 1, 0);
            setActiveIndex(prevIndex);
            const prevElement = document.querySelector(`[data-index="${prevIndex}"]`) as HTMLElement;
            prevElement?.focus();
          }
        };

        return (
          <div role="listbox" aria-label="Large list">
            {items.map((item, index) => (
              <div
                key={index}
                data-index={index}
                role="option"
                tabIndex={activeIndex === index ? 0 : -1}
                aria-selected={activeIndex === index}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onClick={() => setActiveIndex(index)}
              >
                {item}
              </div>
            ))}
          </div>
        );
      };

      const startTime = performance.now();
      render(<FocusIntensiveComponent />);
      const endTime = performance.now();

      // Rendering 100 focusable items should be fast
      expect(endTime - startTime).toBeLessThan(50);

      // Verify structure
      const listbox = screen.getByRole('listbox');
      const options = screen.getAllByRole('option');
      
      expect(options).toHaveLength(100);
      expect(options[0]).toHaveAttribute('tabIndex', '0');
      expect(options[1]).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Memory Management for Accessibility', () => {
    it('cleans up event listeners properly', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

      const KeyboardHandlerComponent = () => {
        React.useEffect(() => {
          const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
              console.log('Escape pressed');
            }
          };

          document.addEventListener('keydown', handleKeyDown);
          
          return () => {
            document.removeEventListener('keydown', handleKeyDown);
          };
        }, []);

        return <div>Keyboard handler component</div>;
      };

      const { unmount } = render(<KeyboardHandlerComponent />);
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });

    it('manages ARIA live region updates efficiently', async () => {
      const LiveRegionManager = () => {
        const [updates, setUpdates] = React.useState<string[]>([]);
        const updateQueueRef = React.useRef<string[]>([]);

        const addUpdate = React.useCallback((message: string) => {
          updateQueueRef.current.push(message);
          
          // Debounce updates to prevent overwhelming screen readers
          setTimeout(() => {
            if (updateQueueRef.current.length > 0) {
              setUpdates(prev => [...prev, ...updateQueueRef.current]);
              updateQueueRef.current = [];
            }
          }, 100);
        }, []);

        return (
          <div>
            <button onClick={() => addUpdate(`Update ${Date.now()}`)}>
              Add Update
            </button>
            
            <div role="status" aria-live="polite">
              {updates.slice(-1)[0]} {/* Only show latest update */}
            </div>
            
            <div className="sr-only">
              Total updates: {updates.length}
            </div>
          </div>
        );
      };

      render(<LiveRegionManager />);
      
      const button = screen.getByRole('button');
      
      // Rapidly trigger updates
      for (let i = 0; i < 5; i++) {
        fireEvent.click(button);
      }

      await waitFor(() => {
        expect(screen.getByText('Total updates: 5')).toBeInTheDocument();
      }, { timeout: 1000 });
    });
  });

  describe('High Contrast and Theme Performance', () => {
    it('efficiently switches between themes while maintaining accessibility', () => {
      const ThemeSwitcher = () => {
        const [theme, setTheme] = React.useState<'light' | 'dark' | 'high-contrast'>('dark');

        const getThemeClasses = () => {
          switch (theme) {
            case 'light':
              return 'bg-white text-black';
            case 'dark':
              return 'bg-black text-white';
            case 'high-contrast':
              return 'bg-black text-white border-white border-2';
            default:
              return 'bg-black text-white';
          }
        };

        return (
          <div className={getThemeClasses()} data-testid="themed-container">
            <button onClick={() => setTheme('light')}>Light Theme</button>
            <button onClick={() => setTheme('dark')}>Dark Theme</button>
            <button onClick={() => setTheme('high-contrast')}>High Contrast</button>
            
            <div role="status" aria-live="polite" className="sr-only">
              Current theme: {theme}
            </div>
          </div>
        );
      };

      render(<ThemeSwitcher />);
      
      const container = screen.getByTestId('themed-container');
      const highContrastButton = screen.getByRole('button', { name: /high contrast/i });

      fireEvent.click(highContrastButton);

      expect(container).toHaveClass('bg-black');
      expect(screen.getByText('Current theme: high-contrast')).toBeInTheDocument();
    });
  });

  describe('Screen Reader Performance', () => {
    it('optimizes content for screen readers without impacting performance', () => {
      const OptimizedContent = () => {
        const [items] = React.useState(Array.from({ length: 50 }, (_, i) => ({
          id: i,
          title: `Item ${i + 1}`,
          description: `Description for item ${i + 1}`,
          category: `Category ${Math.floor(i / 10) + 1}`,
        })));

        return (
          <div role="main" aria-labelledby="main-heading">
            <h1 id="main-heading">Optimized Content List</h1>
            
            <div role="status" aria-live="polite" className="sr-only">
              {items.length} items available
            </div>

            <div role="list" aria-label="Content items list">
              {items.map(item => (
                <article
                  key={item.id}
                  role="listitem"
                  aria-labelledby={`title-${item.id}`}
                  aria-describedby={`desc-${item.id} cat-${item.id}`}
                  tabIndex={0}
                >
                  <h2 id={`title-${item.id}`}>{item.title}</h2>
                  <p id={`desc-${item.id}`}>{item.description}</p>
                  <span id={`cat-${item.id}`} className="sr-only">
                    Category: {item.category}
                  </span>
                </article>
              ))}
            </div>
          </div>
        );
      };

      const startTime = performance.now();
      render(<OptimizedContent />);
      const endTime = performance.now();

      // Should render efficiently despite accessibility enhancements
      expect(endTime - startTime).toBeLessThan(100);

      // Verify accessibility structure
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByText('50 items available')).toBeInTheDocument();
      
      const articles = screen.getAllByRole('listitem');
      expect(articles).toHaveLength(50);
      
      // Check that each article has proper ARIA labeling
      articles.forEach((article, index) => {
        expect(article).toHaveAttribute('aria-labelledby', `title-${index}`);
        expect(article).toHaveAttribute('aria-describedby', `desc-${index} cat-${index}`);
      });
    });
  });
});