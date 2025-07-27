import { SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  variant?: 'full' | 'icon';
}

export function Logo({ variant = 'full', ...props }: LogoProps) {
  if (variant === 'icon') {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
        <path
          d="M20 8L24.5 16.5L34 18L27 25L28.5 34L20 29.5L11.5 34L13 25L6 18L15.5 16.5L20 8Z"
          fill="currentColor"
        />
        <circle cx="20" cy="20" r="3" fill="#0a0e23" />
      </svg>
    );
  }

  return (
    <svg
      width="200"
      height="40"
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        {/* Icon */}
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
        <path
          d="M20 8L24.5 16.5L34 18L27 25L28.5 34L20 29.5L11.5 34L13 25L6 18L15.5 16.5L20 8Z"
          fill="currentColor"
        />
        <circle cx="20" cy="20" r="3" fill="#0a0e23" />
        
        {/* Text */}
        <text
          x="50"
          y="26"
          fontFamily="Orbitron, sans-serif"
          fontSize="20"
          fontWeight="700"
          fill="currentColor"
        >
          ASTRO
        </text>
      </g>
    </svg>
  );
}