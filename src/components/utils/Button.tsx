'use client';

import { ButtonHTMLAttributes, FC } from 'react';
import { MoonLoader } from 'react-spinners';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  isLoading = false,
  variant = 'primary',
  ...props
}) => {
  return (
    <button
      className={`bg-gray-600 text-white  min-h-[30px] min-w-[80px] m-2 rounded-lg font-semibold flex items-center justify-center ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <MoonLoader size={15} /> : children}
    </button>
  );
};
