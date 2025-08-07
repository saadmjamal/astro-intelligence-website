'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, value, onChange, placeholder = 'Select an option', error, disabled, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value || '');
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === selectedValue);

    const handleSelect = (optionValue: string) => {
      setSelectedValue(optionValue);
      setIsOpen(false);
      onChange?.(optionValue);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Update internal state when value prop changes
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className={cn(
            'flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left',
            'interactive',
            'input-focus',
            {
              'border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-800': !error,
              'border-red-500 dark:border-red-400': error,
              'opacity-50 cursor-not-allowed': disabled,
              'hover:border-gray-400 dark:hover:border-navy-600': !disabled && !error,
            },
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={props['aria-labelledby']}
        >
          <span className={cn('block truncate', !selectedOption && 'text-muted-foreground')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDownIcon
            className={cn(
              'h-5 w-5 text-gray-400 transition-transform',
              isOpen && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <div
            className={cn(
              'absolute z-10 mt-1 w-full overflow-auto rounded-lg bg-white dark:bg-navy-800',
              'border border-gray-200 dark:border-navy-700 shadow-lg',
              'max-h-60 py-1',
              'animate-in fade-in-0 zoom-in-95'
            )}
            role="listbox"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  'relative w-full cursor-pointer select-none py-2 pl-3 pr-9 text-left',
                  'transition-colors',
                  {
                    'bg-magenta text-white': option.value === selectedValue,
                    'hover:bg-gray-100 dark:hover:bg-navy-700': option.value !== selectedValue && !option.disabled,
                    'opacity-50 cursor-not-allowed': option.disabled,
                  }
                )}
                onClick={() => !option.disabled && handleSelect(option.value)}
                disabled={option.disabled}
                role="option"
                aria-selected={option.value === selectedValue}
              >
                <span className="block truncate">{option.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Hidden native select for form compatibility */}
        <select
          ref={ref}
          value={selectedValue}
          onChange={(e) => handleSelect(e.target.value)}
          className="sr-only"
          aria-hidden="true"
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };