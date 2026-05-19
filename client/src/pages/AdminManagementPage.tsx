import { useState, useEffect, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { UserPlus, Shield, Mail, Calendar, ArrowRight, User as UserIcon } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useAuthStore } from '../store/authStore';
import { fetchAdmins, createAdmin } from '../api/auth.api';
import { User } from '../types/auth.types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function AdminManagementPage(): JSX.Element {
  const { user, isAuthenticated } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  
  const [admins, setAdmins] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Authentication & authorization checks
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const loadAdmins = async () => {
    setIsLoadingList(true);
    try {
      const data = await fetchAdmins();
      setAdmins(data);
    } catch (err: any) {
      console.error('Failed to load admins', err);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await createAdmin({ name, email, password, role: 'admin' });
      setSuccess('Administrator account created successfully!');
      setName('');
      setEmail('');
      setPassword('');
      await loadAdmins(); // Refresh admin list
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create administrator.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const header = (
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-4 py-4 backdrop-blur lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <Shield className="text-indigo-500 h-6 w-6" /> Admin Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Create new administrators and monitor existing admin credentials.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
        </div>
      </div>
    </header>
  );

  return (
    <DashboardLayout header={header}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Admin List Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4">
              <h2 className="font-semibold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <Shield size={18} className="text-indigo-500" />
                Active Administrators
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              {isLoadingList ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent mb-4"></div>
                  <p className="text-sm">Fetching administrator accounts...</p>
                </div>
              ) : admins.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <p className="text-sm">No administrators found.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/20">
                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Administrator</th>
                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email Address</th>
                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Role</th>
                      <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {admins.map((admin) => (
                      <tr 
                        key={admin._id}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/10 font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/25">
                              {admin.name.slice(0, 1).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium text-slate-900 dark:text-slate-50 flex items-center gap-1.5">
                                {admin.name}
                                {admin._id === user?._id && (
                                  <span className="inline-block rounded bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-500/25">
                                    You
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-1.5">
                            <Mail size={14} className="text-slate-400 dark:text-slate-500" />
                            {admin.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                            <Shield size={12} />
                            {admin.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-slate-400 dark:text-slate-500" />
                            {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Create Admin Form Card */}
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <UserPlus size={20} className="text-indigo-500" />
                Add Administrator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Provide credentials for the new administrator. They will instantly gain full admin privileges.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400">
                  {success}
                </div>
              )}

              <Input
                label="Admin Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g., Sarah Smith"
              />
              <Input
                label="Admin Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="sarah@example.com"
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />

              <Button
                type="submit"
                className="w-full flex justify-center items-center gap-2 mt-2 group"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Admin...' : 'Create Admin Account'}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
