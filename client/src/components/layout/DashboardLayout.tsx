import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  header: ReactNode;
  children: ReactNode;
}

export function DashboardLayout({ header, children }: DashboardLayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <Sidebar />
      <main className="lg:pl-60">
        {header}
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
