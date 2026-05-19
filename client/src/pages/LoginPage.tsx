import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Sparkles,
} from 'lucide-react';
import { login } from '../api/auth.api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const { isAuthenticated, setAuth } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const auth = await login({ email, password });
      setAuth(auth.user, auth.token);
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,102,255,0.32),transparent_30%),linear-gradient(180deg,#000_0%,#020814_58%,#001c47_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:70px_70px]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
        <section className="hidden px-10 py-10 lg:flex lg:flex-col">
          <Link to="/" className="inline-flex items-center gap-3 text-sm font-semibold text-slate-300 hover:text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
              <ArrowLeft size={17} />
            </span>
            Back to assignment overview
          </Link>

          <div className="mt-20 max-w-xl">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white shadow-[0_0_34px_rgba(37,99,235,0.48)]">
              <Sparkles size={23} />
            </span>
            <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-blue-300">ServiceHive themed</p>
            <h1 className="mt-4 text-5xl font-bold tracking-normal">Smart leads access for reviewers.</h1>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Sign in to test the lead dashboard, protected routes, filtering, pagination, CSV export, and professional
              lead-management workflows.
            </p>
          </div>

          <div className="mt-auto grid gap-3">
            {['JWT token handling', 'Secure access rules', 'Backend-filtered lead data'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4">
                <CheckCircle2 size={18} className="text-blue-300" />
                <span className="text-sm font-medium text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-[0_0_28px_rgba(37,99,235,0.45)]">
                  <BarChart3 size={18} />
                </span>
                <span>
                  <span className="block text-sm font-bold uppercase leading-tight tracking-wide">ServiceHive</span>
                  <span className="block text-xs font-medium text-blue-300">Smart Leads Dashboard</span>
                </span>
              </Link>
            </div>

            <div className="rounded-lg border border-blue-400/20 bg-white/[0.055] p-6 shadow-[0_0_60px_rgba(0,92,255,0.14)] backdrop-blur sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">Welcome back</p>
                  <h2 className="mt-3 text-3xl font-bold text-white">Sign in to GigFlow</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Use your account credentials to continue.</p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600/15 text-blue-300">
                  <LockKeyhole size={21} />
                </span>
              </div>

              <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
                {error ? (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm font-medium text-red-200">
                    {error}
                  </div>
                ) : null}

                <Input
                  autoComplete="email"
                  className="border-white/10 bg-black/45 text-white placeholder:text-slate-500"
                  label="Email address"
                  labelClassName="text-slate-200"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />

                <div className="relative">
                  <Input
                    autoComplete="current-password"
                    className="border-white/10 bg-black/45 pr-11 text-white placeholder:text-slate-500"
                    label="Password"
                    labelClassName="text-slate-200"
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <button
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute bottom-0 right-0 flex h-11 w-11 items-center justify-center rounded-r-lg text-slate-400 hover:text-white"
                    onClick={() => setShowPassword((current) => !current)}
                    type="button"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <Button className="h-11 w-full text-base" type="submit" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                  {!isLoading ? <ArrowRight size={18} /> : null}
                </Button>
              </form>

              <div className="mt-6 rounded-lg border border-blue-400/20 bg-blue-500/10 p-3">
                <p className="text-sm leading-6 text-slate-200">
                  Sign in once. Access permissions are resolved securely after authentication from the user account stored
                  in the database.
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-slate-400">
              Need an account?{' '}
              <Link className="font-bold text-blue-300 hover:text-blue-200" to="/register">
                Create one
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
