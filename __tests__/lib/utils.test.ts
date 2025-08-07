import { cn } from '@/lib/utils';

describe('utils', () => {
  describe('cn function', () => {
    it('merges class names correctly', () => {
      const result = cn('base-class', 'additional-class');
      expect(result).toBe('base-class additional-class');
    });

    it('handles conditional classes', () => {
      const isActive = true;
      const result = cn('base', isActive && 'active');
      expect(result).toBe('base active');
    });

    it('handles false values', () => {
      const isActive = false;
      const result = cn('base', isActive && 'active');
      expect(result).toBe('base');
    });

    it('merges tailwind classes correctly', () => {
      const result = cn('px-2 py-1', 'px-4');
      expect(result).toBe('py-1 px-4');
    });

    it('handles arrays', () => {
      const result = cn(['base', 'array']);
      expect(result).toBe('base array');
    });

    it('handles undefined and null', () => {
      const result = cn('base', undefined, null, 'end');
      expect(result).toBe('base end');
    });

    it('removes duplicate classes', () => {
      const result = cn('text-red-500', 'text-blue-500');
      expect(result).toBe('text-blue-500');
    });

    it('handles complex tailwind merging', () => {
      const result = cn(
        'bg-red-500 hover:bg-red-600',
        'bg-blue-500 hover:bg-blue-600'
      );
      expect(result).toBe('bg-blue-500 hover:bg-blue-600');
    });

    it('preserves non-conflicting classes', () => {
      const result = cn('text-lg font-bold', 'text-red-500');
      expect(result).toBe('text-lg font-bold text-red-500');
    });

    it('handles empty strings', () => {
      const result = cn('', 'base', '', 'end');
      expect(result).toBe('base end');
    });

    it('handles no arguments', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('handles objects from clsx', () => {
      const result = cn('base', { active: true, disabled: false });
      expect(result).toBe('base active');
    });
  });
});