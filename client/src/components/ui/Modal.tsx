import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ title, isOpen, onClose, children }: ModalProps): JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur">
      <section className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 shadow-soft">
        <header className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-50">{title}</h2>
          <button 
            type="button" 
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 border border-slate-700/50 hover:bg-slate-700 hover:text-slate-100 transition shadow-sm outline-none focus:ring-2 focus:ring-indigo-500" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={22} className="stroke-[2.5]" />
          </button>
        </header>
        <div className="p-5">{children}</div>
      </section>
    </div>
  );
}
