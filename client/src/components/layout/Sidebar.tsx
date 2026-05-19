import { BarChart3, LogOut, Users, UserPlus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export function Sidebar(): JSX.Element {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  
  const isAdmin = user?.role === 'admin';
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 lg:flex">
      <div className="flex h-16 items-center gap-3 px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 text-white">
          <BarChart3 size={22} />
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-50">Smart Leads</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Sales dashboard</p>
        </div>
      </div>
      <nav className="mt-5 px-3 space-y-1">
        <Link 
          className={`flex items-center gap-3 border-l-2 px-3 py-2 text-sm font-medium transition-all ${
            isActive('/dashboard') 
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold' 
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400'
          }`} 
          to="/dashboard"
        >
          <Users size={18} />
          Leads
        </Link>
        {isAdmin ? (
          <Link 
            className={`flex items-center gap-3 border-l-2 px-3 py-2 text-sm font-medium transition-all ${
              isActive('/admins') 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold' 
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`} 
            to="/admins"
          >
            <UserPlus size={18} />
            Admin Panel
          </Link>
        ) : null}
      </nav>
      <div className="mt-auto border-t border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 font-semibold text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 text-sm">
              {user?.name.slice(0, 1).toUpperCase() ?? 'U'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-50" title={user?.name}>
                {user?.name}
              </p>
              {user ? (
                <span className="inline-block mt-0.5 rounded px-1.5 py-0.25 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/25">
                  {user.role}
                </span>
              ) : null}
            </div>
          </div>
          <button 
            type="button"
            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-red-500 dark:hover:text-red-400 shrink-0 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50 transition cursor-pointer" 
            onClick={logout} 
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
