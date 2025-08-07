import { Inter, Orbitron } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap', 
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  preload: true,
  fallback: ['system-ui', 'arial'],
});