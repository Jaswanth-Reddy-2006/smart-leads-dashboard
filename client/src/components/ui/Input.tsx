import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelClassName?: string;
}

export function Input({ label, error, className = '', labelClassName = '', ...props }: InputProps): JSX.Element {
  return (
    <label className="block space-y-2">
      {label ? (
        <span className={`text-sm font-medium text-slate-700 dark:text-slate-300 ${labelClassName}`}>{label}</span>
      ) : null}
      <input
        className={`h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 ${className}`}
        {...props}
      />
      {error ? <p className="text-xs text-red-600 dark:text-red-300">{error}</p> : null}
    </label>
  );
}
