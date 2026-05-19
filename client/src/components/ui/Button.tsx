import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-500 disabled:bg-blue-600/40 shadow-[0_0_24px_rgba(37,99,235,0.22)]',
  secondary: 'bg-slate-950 text-slate-100 border border-blue-500/30 hover:bg-blue-950/50 hover:border-blue-400/60',
  ghost: 'text-slate-300 hover:bg-blue-500/10 hover:text-white',
  danger: 'bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/20',
};

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
