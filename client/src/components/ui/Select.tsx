import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export function Select({ label, error, className = '', children, ...props }: SelectProps): JSX.Element {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span> : null}
      <select
        className={`h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 ${className}`}
        {...props}
      >
        {children}
      </select>
      {error ? <p className="text-xs text-red-500 dark:text-red-300">{error}</p> : null}
    </label>
  );
}
