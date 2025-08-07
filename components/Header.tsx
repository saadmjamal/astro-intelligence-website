'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Search } from 'lucide-react';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Scripts', href: '/scripts' },
  { name: 'Research Lab', href: '/lab' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

  // Keyboard navigation for mobile menu
  const navRef = useKeyboardNavigation({
    onEscape: () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    },
    trapFocus: mobileMenuOpen
  });

  // Focus management for mobile menu
  useEffect(() => {
    if (mobileMenuOpen && firstMenuItemRef.current) {
      firstMenuItemRef.current.focus();
    }
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 z-[100] w-full bg-black/95 backdrop-blur-md border-b border-tech-accent/20 safe-area-top">
      <nav ref={navRef as React.RefObject<HTMLElement>} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-tech-accent hover:text-accent-hover transition-colors focus-ring rounded-md dynamic-scale touch-target"
              aria-label="Astro Intelligence - Go to homepage"
            >
              <Logo variant="full" className="h-8 w-auto sm:h-10 gpu-accelerated" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'metlab-nav-item text-sm font-medium transition-colors focus-ring rounded-md px-2 py-1',
                  pathname === item.href ? 'text-tech-accent active' : 'text-secondary-foreground hover:text-white'
                )}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-4">
            <Button variant="ghost" size="sm" asChild className="p-2">
              <Link href="/search" aria-label="Search the site">
                <Search className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <ThemeToggle />
            
            <SignedOut>
              <Button variant="ghost" size="sm" asChild data-testid="nav-signin">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button size="sm" asChild data-testid="nav-signup">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </SignedOut>
            
            <SignedIn>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              className="text-secondary-foreground hover:bg-accent-muted hover:text-tech-accent touch-target focus-ring inline-flex items-center justify-center rounded-md p-2 dynamic-scale"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu - Full screen overlay */}
        <div
          id="mobile-menu"
          className={cn(
            'fixed inset-0 z-[200] lg:hidden transition-all duration-300 ease-in-out',
            mobileMenuOpen 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
          )}
          aria-hidden={!mobileMenuOpen}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setMobileMenuOpen(false);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Close mobile menu"
          />
          
          {/* Mobile menu content */}
          <div 
            className={cn(
              'absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-md border-l border-tech-accent/20 safe-area-top safe-area-bottom transition-transform duration-300 ease-in-out',
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="text-lg font-semibold text-white">Menu</div>
              <button
                type="button"
                className="touch-target focus-ring rounded-md p-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col py-6">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  ref={index === 0 ? firstMenuItemRef : undefined}
                  href={item.href}
                  className={cn(
                    'mobile-nav-item mx-4 mb-1 hover:bg-gray-800/60 hover:text-tech-accent rounded-lg transition-all duration-200 touch-focus',
                    pathname === item.href 
                      ? 'mobile-nav-item-active bg-tech-green/10 text-tech-green border-l-4 border-tech-green' 
                      : 'text-gray-200 hover:text-white'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* User Actions */}
            <div className="px-6 py-4 border-t border-gray-800 mt-auto">
              <div className="space-y-3">
                <SignedOut>
                  <Button variant="secondary" size="md" className="w-full mobile-button" asChild>
                    <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                  </Button>
                  <Button size="md" className="w-full mobile-button" asChild>
                    <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                  </Button>
                </SignedOut>
                
                <SignedIn>
                  <Button size="md" className="w-full mobile-button" asChild>
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                  </Button>
                  <div className="flex justify-center pt-3 border-t border-gray-800 mt-4">
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "h-12 w-12 border border-gray-700"
                        }
                      }}
                    />
                  </div>
                </SignedIn>
                
                <div className="flex justify-center pt-3">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
