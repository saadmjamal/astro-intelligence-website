import { cn } from '@/lib/utils';
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'outlined' | 'filled' | 'ghost';
  error?: boolean;
  label?: string;
  helperText?: string;
  required?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant = 'default',
      error = false,
      label,
      helperText,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(7)}`;
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
            {props.required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            'w-full px-3 py-3 text-gray-900 placeholder-gray-500 dark:text-gray-100 dark:placeholder-gray-400',
            'interactive',
            'input-focus',
            'resize-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            {
              // Variants
              'dark:bg-navy-800 dark:border-navy-600 focus:border-magenta-500 focus:ring-magenta-500 dark:focus:ring-magenta-400 rounded-md border border-gray-300 bg-white':
                variant === 'default',
              'dark:border-navy-600 focus:border-magenta-500 focus:ring-magenta-500 dark:focus:ring-magenta-400 rounded-md border-2 border-gray-300 bg-transparent':
                variant === 'outlined',
              'dark:bg-navy-900 focus:ring-magenta-500 dark:focus:ring-magenta-400 rounded-md border-0 bg-gray-100':
                variant === 'filled',
              'dark:border-navy-600 focus:border-magenta-500 rounded-none border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0':
                variant === 'ghost',
              // Error state
              'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400':
                error,
            },
            className
          )}
          {...props}
        />
        {helperText && (
          <p
            id={error ? errorId : helperId}
            className={cn(
              'mt-1 text-sm',
              error ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
            )}
            role={error ? 'alert' : undefined}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;