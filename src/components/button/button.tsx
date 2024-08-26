import React, { ComponentPropsWithoutRef } from 'react';

export type Color = 'blue' | 'red' | 'yellow' | 'emerald' | 'gray';

interface Props extends ComponentPropsWithoutRef<'button'> {
  className?: string;
  children?: React.ReactNode;
  color?: Color;
  variant?: 'contained' | 'outlined';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Button: React.FC<Props> = ({
  className,
  children,
  color = 'blue',
  variant = 'contained',
  size,
  ...props
}) => {
  const getStyle = () => {
    switch (variant) {
      case 'contained':
        switch (color) {
          case 'blue':
            return 'bg-blue-500 hover:bg-blue-600';
          case 'red':
            return 'bg-red-500 hover:bg-red-600';
          case 'yellow':
            return 'bg-yellow-500 hover:bg-yellow-600';
          case 'emerald':
            return 'bg-emerald-500 hover:bg-emerald-600';
          case 'gray':
            return 'bg-gray-500 hover:bg-gray-600';
        }
        break;
      case 'outlined':
        switch (color) {
          case 'blue':
            return 'border-2 border-blue-500 text-blue-500 hover:border-blue-400 hover:bg-blue-400/10 hover:text-blue-400';
          case 'red':
            return 'border-2 border-red-500 text-red-500 hover:border-red-400 hover:bg-red-400/10 hover:text-red-400';
          case 'yellow':
            return 'border-2 border-yellow-500 text-yellow-500 hover:border-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-400';
          case 'emerald':
            return 'border-2 border-emerald-500 text-emerald-500 hover:border-emerald-400 hover:bg-emerald-400/10 hover:text-emerald-400';
          case 'gray':
            return 'border-2 border-gray-500 text-gray-500 hover:border-gray-400 hover:bg-gray-400/10 hover:text-gray-400';
        }
        break;
    }
  };

  const getSize = () => {
    switch (size) {
      case 'xs':
        return 'max-w-xs';
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-md';
      case 'lg':
        return 'max-w-lg';
      case 'xl':
        return 'max-w-xl';
    }
    return;
  };

  return (
    <button
      {...props}
      className={`flex flex-row flex-nowrap 
            gap-2 items-center justify-center
            rounded
            w-full p-2 
						transition-all
						${getSize()}
						${getStyle()}
						${className}`}
    >
      {children}
    </button>
  );
};
