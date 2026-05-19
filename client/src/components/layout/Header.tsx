import { Download, Moon, Plus, Sun } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { useAuthStore } from '../../store/authStore';

interface HeaderProps {
  onCreate: () => void;
  onExport: () => void;
  isExporting: boolean;
}

export function Header({ onCreate, onExport, isExporting }: HeaderProps): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-4 py-4 backdrop-blur lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Leads</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Track, filter, and qualify sales opportunities.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          {isAdmin ? (
            <Button variant="secondary" onClick={onExport} disabled={isExporting}>
              <Download size={16} />
              {isExporting ? 'Exporting...' : 'Export CSV'}
            </Button>
          ) : null}
          {isAdmin ? (
            <Button onClick={onCreate}>
              <Plus size={16} />
              Create lead
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
