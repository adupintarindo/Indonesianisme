'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-itb-blue text-pearl-white hover:bg-sky-blue focus-visible:outline-gold',
  secondary:
    'border-2 border-itb-blue text-itb-blue hover:bg-itb-blue/10 focus-visible:outline-itb-blue',
  accent:
    'bg-gold text-deep-navy hover:bg-gold-light focus-visible:outline-gold',
  ghost: 'text-pearl-white hover:bg-white/10 focus-visible:outline-gold',
  dark: 'bg-deep-navy text-gold border border-gold hover:bg-warm-gray/20 focus-visible:outline-gold',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
};

const iconSizes: Record<ButtonSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export const Button = ({
  children,
  onClick,
  disabled,
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  type = 'button',
  className = '',
  variant = 'primary',
  size = 'md',
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const iconComponent = Icon && (
    <Icon className={iconSizes[size]} />
  );

  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={combinedClassName}
    >
      {iconPosition === 'left' && iconComponent}
      {loading && (
        <svg
          className="animate-spin"
          style={{ width: iconSizes[size].split(' ')[0].replace('w-', '') + 'px', height: iconSizes[size].split(' ')[1].replace('h-', '') + 'px' }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!loading && children}
      {iconPosition === 'right' && !loading && iconComponent}
    </button>
  );
};

export default Button;
