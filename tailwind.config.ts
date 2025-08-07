import type { Config } from 'tailwindcss';
import plugins from './tailwind.plugins.js';

const colors = {
  // Core brand colors - consistent with globals.css
  black: '#0A0A0B',
  white: '#FFFFFF',
  'tech-green': '#00FF94',
  'accent-hover': '#00E085',
  'accent-active': '#00CC76',
  
  // Primary palette
  navy: {
    50: '#e6e7ea',
    100: '#c0c2cb',
    200: '#9699a8',
    300: '#6b7085',
    400: '#4b516a',
    500: '#2b324f',
    600: '#1f2647',
    700: '#141a3d',
    800: '#0a0e23',
    900: '#06081a',
    950: '#030410',
  },
  
  // Magenta accent
  magenta: {
    DEFAULT: '#ff1aa8',
    50: '#ffe4f5',
    100: '#ffbce5',
    200: '#ff8fd3',
    300: '#ff62c1',
    400: '#ff3eb5',
    500: '#ff1aa8',
    600: '#e6179d',
    700: '#cc1490',
    800: '#b31183',
    900: '#800c5e',
    950: '#4d073a',
  },
  
  // Semantic colors
  gray: {
    50: '#F8F9FA',
    100: '#E9ECEF',
    200: '#DEE2E6',
    300: '#CED4DA',
    400: '#ADB5BD',
    500: '#6C757D',
    600: '#495057',
    700: '#343A40',
    800: '#212529',
    900: '#171717',
    950: '#0a0a0a',
  },
  
  // Semantic status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Text hierarchy - matches globals.css
  'text-primary': '#FFFFFF',
  'text-secondary': '#E9ECEF', 
  'text-muted': '#ADB5BD',
  'text-subtle': '#6C757D',
  
  // Border colors
  'border-default': '#343A40',
  'border-subtle': '#212529',
  
  // Background colors
  'bg-elevated': '#212529',
  'bg-card': '#111111',
  'accent-muted': 'rgba(0, 255, 148, 0.1)',
  
  // Primary system for components
  primary: {
    DEFAULT: '#00FF94',
    50: '#e6fff5',
    100: '#b3ffe0',
    200: '#80ffcc',
    300: '#4dffb8',
    400: '#1affa3',
    500: '#00FF94',
    600: '#00e085',
    700: '#00c276',
    800: '#00a366',
    900: '#008557',
    950: '#006647',
    foreground: '#000000',
  },
  
  // Secondary system
  secondary: {
    DEFAULT: '#6C757D',
    foreground: '#FFFFFF',
  },
  
  // Muted colors
  muted: {
    DEFAULT: '#212529',
    foreground: '#ADB5BD',
  },
  
  // Destructive colors
  destructive: {
    DEFAULT: '#ef4444',
    foreground: '#FFFFFF',
  },
  
  // Input colors
  input: '#343A40',
  ring: '#00FF94',
};

const spacing = {
  xs: '0.5rem', // 8px
  sm: '0.75rem', // 12px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
  '4xl': '6rem', // 96px
  '5xl': '8rem', // 128px
};

const typography = {
  // Enhanced scale with perfect 1.25 ratio and optimized line heights - Tailwind v3 compatible format
  xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
  sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
  base: ['1rem', { lineHeight: '1.6rem' }], // Consistent format with configuration object
  lg: ['1.125rem', { lineHeight: '1.7rem' }],
  xl: ['1.25rem', { lineHeight: '1.8rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.01em' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.015em' }],
  '5xl': ['3rem', { lineHeight: '3.2rem', letterSpacing: '-0.02em' }], // Better line height
  '6xl': ['3.75rem', { lineHeight: '4rem', letterSpacing: '-0.025em' }],
  '7xl': ['4.5rem', { lineHeight: '4.8rem', letterSpacing: '-0.03em' }],
  '8xl': ['6rem', { lineHeight: '6.4rem', letterSpacing: '-0.035em' }],
  '9xl': ['8rem', { lineHeight: '8.5rem', letterSpacing: '-0.04em' }],
};

const animation = {
  // Durations
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  // Timing functions
  timing: {
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'elastic-out': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      ringColor: colors,
      spacing,
      fontSize: typography as any,
      fontFamily: {
        heading: ['var(--font-orbitron)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      lineHeight: {
        'tight': '1.1',
        'snug': '1.2',
        'normal': '1.4',
        'relaxed': '1.6',
        'loose': '1.8',
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'tight': '-0.02em',
        'normal': '0em',
        'wide': '0.05em',
        'wider': '0.1em',
        'widest': '0.15em',
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        
        // Enhanced hierarchy shadows
        'hierarchy-low': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'hierarchy-medium': '0 4px 8px -2px rgb(0 0 0 / 0.1)',
        'hierarchy-high': '0 12px 24px -4px rgb(0 0 0 / 0.15)',
        'hierarchy-critical': '0 20px 40px -8px rgb(0 0 0 / 0.2)',
        
        // Enhanced glow effects
        glow: '0 0 20px rgba(255, 62, 181, 0.5)',
        'glow-sm': '0 0 10px rgba(255, 62, 181, 0.3)',
        'glow-lg': '0 0 40px rgba(255, 62, 181, 0.6)',
        'glow-xl': '0 0 60px rgba(255, 62, 181, 0.8)',
      },
      transitionDuration: animation.duration,
      transitionTimingFunction: animation.timing,
      animation: {
        'fade-in': 'fadeIn 500ms ease-out',
        'fade-out': 'fadeOut 500ms ease-in',
        'slide-up': 'slideUp 300ms ease-out',
        'slide-down': 'slideDown 300ms ease-out',
        'slide-left': 'slideLeft 300ms ease-out',
        'slide-right': 'slideRight 300ms ease-out',
        'zoom-in': 'zoomIn 200ms ease-out',
        'zoom-out': 'zoomOut 200ms ease-in',
        glow: 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        gradient: 'gradient 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        zoomOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        glow: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
            filter: 'brightness(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
            filter: 'brightness(1.2)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      screens: {
        xs: '475px',
        // Tailwind defaults:
        // sm: '640px',
        // md: '768px',
        // lg: '1024px',
        // xl: '1280px',
        // 2xl: '1536px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins,
} satisfies Config;
