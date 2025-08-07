'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

// Animation preferences context
interface AnimationContextType {
  reducedMotion: boolean;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType>({
  reducedMotion: false,
  animationsEnabled: true,
  setAnimationsEnabled: () => {},
});

export const useAnimationPreferences = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimationPreferences must be used within AnimationProvider');
  }
  return context;
};

interface AnimationProviderProps {
  children: React.ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    // Check user's motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setAnimationsEnabled(false);
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Add CSS class for reduced motion
  useEffect(() => {
    document.documentElement.classList.toggle('motion-reduce', !animationsEnabled || reducedMotion);
  }, [animationsEnabled, reducedMotion]);

  const contextValue: AnimationContextType = {
    reducedMotion,
    animationsEnabled: animationsEnabled && !reducedMotion,
    setAnimationsEnabled,
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </AnimationContext.Provider>
  );
};

// Performance-optimized motion components
import { m } from 'framer-motion';

// Create a motion object that matches the expected API
export const motion = {
  div: m.div,
  section: m.section,
  article: m.article,
  header: m.header,
  footer: m.footer,
  nav: m.nav,
  main: m.main,
  aside: m.aside,
  h1: m.h1,
  h2: m.h2,
  h3: m.h3,
  h4: m.h4,
  h5: m.h5,
  h6: m.h6,
  p: m.p,
  span: m.span,
  a: m.a,
  img: m.img,
  button: m.button,
  ul: m.ul,
  ol: m.ol,
  li: m.li,
  form: m.form,
  input: m.input,
  textarea: m.textarea,
  select: m.select,
  label: m.label,
  svg: m.svg,
  path: m.path,
  g: m.g,
  circle: m.circle,
  rect: m.rect,
  line: m.line,
  polyline: m.polyline,
  polygon: m.polygon,
};