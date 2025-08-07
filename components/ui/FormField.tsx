import { cn } from '@/lib/utils';
import React from 'react';

interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  className?: string;
  fieldId?: string;
}

export function FormField({
  children,
  label,
  helperText,
  error = false,
  errorMessage,
  required = false,
  className,
  fieldId,
}: FormFieldProps) {
  const helperId = fieldId ? `${fieldId}-helper` : undefined;
  const errorId = fieldId ? `${fieldId}-error` : undefined;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={fieldId}
          className="mb-2 block text-sm font-medium text-foreground"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}
      
      <div className="relative">
        {children}
      </div>

      {(helperText || (error && errorMessage)) && (
        <div className="mt-2 space-y-1">
          {error && errorMessage ? (
            <p
              id={errorId}
              className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
              role="alert"
            >
              <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errorMessage}
            </p>
          ) : (
            helperText && (
              <p
                id={helperId}
                className="text-sm text-muted-foreground"
              >
                {helperText}
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}

interface FloatingLabelFieldProps {
  children: React.ReactNode;
  label: string;
  value?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  className?: string;
  fieldId?: string;
}

export function FloatingLabelField({
  children,
  label,
  value,
  error = false,
  errorMessage,
  required = false,
  className,
  fieldId,
}: FloatingLabelFieldProps) {
  const hasValue = Boolean(value && value.length > 0);
  const errorId = fieldId ? `${fieldId}-error` : undefined;

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative">
        {children}
        <label
          htmlFor={fieldId}
          className={cn(
            'absolute left-3 transition-all duration-200 pointer-events-none',
            'text-muted-foreground',
            {
              // Floating state
              '-top-2 left-2 text-xs bg-background px-1 text-primary': hasValue,
              // Default state
              'top-3 text-sm': !hasValue,
              // Error state
              'text-red-500': error,
            }
          )}
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      </div>

      {error && errorMessage && (
        <p
          id={errorId}
          className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
          role="alert"
        >
          <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errorMessage}
        </p>
      )}
    </div>
  );
}