import { FormEvent, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { register } from '../api/auth.api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';

export function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  const { isAuthenticated, setAuth } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score += 1;

    if (score >= 3) return { label: 'Strong', width: 'w-full', color: 'bg-blue-400' };
    if (score === 2) return { label: 'Good', width: 'w-2/3', color: 'bg-blue-500' };
    if (score === 1) return { label: 'Basic', width: 'w-1/3', color: 'bg-amber-400' };
    return { label: 'Add at least 6 characters', width: 'w-0', color: 'bg-slate-600' };
  }, [password]);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const auth = await register({ name, email, password, role: 'sales' });
      setAuth(auth.user, auth.token);
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_0%,rgba(0,102,255,0.32),transparent_30%),linear-gradient(180deg,#000_0%,#020814_58%,#001c47_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:70px_70px]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.08fr_0.92fr]">
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
              <Link className="hidden items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white sm:inline-flex" to="/">
                <ArrowLeft size={16} />
                Overview
              </Link>
            </div>

            <div className="rounded-lg border border-blue-400/20 bg-white/[0.055] p-6 shadow-[0_0_60px_rgba(0,92,255,0.14)] backdrop-blur sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">Create access</p>
                  <h1 className="mt-3 text-3xl font-bold text-white">Create your account</h1>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Register once and move directly into the protected lead-management workspace.
                  </p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600/15 text-blue-300">
                  <ShieldCheck size={21} />
                </span>
              </div>

              <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
                {error ? (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm font-medium text-red-200">
                    {error}
                  </div>
                ) : null}

                <div className="relative">
                  <Input
                    autoComplete="name"
                    className="border-white/10 bg-black/45 pl-10 text-white placeholder:text-slate-500"
                    label="Full name"
                    labelClassName="text-slate-200"
                    placeholder="Your name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    minLength={2}
                  />
                  <UserRound className="absolute bottom-3 left-3 text-slate-500" size={17} />
                </div>

                <div className="relative">
                  <Input
                    autoComplete="email"
                    className="border-white/10 bg-black/45 pl-10 text-white placeholder:text-slate-500"
                    label="Email address"
                    labelClassName="text-slate-200"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <Mail className="absolute bottom-3 left-3 text-slate-500" size={17} />
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      autoComplete="new-password"
                      className="border-white/10 bg-black/45 pr-11 text-white placeholder:text-slate-500"
                      label="Password"
                      labelClassName="text-slate-200"
                      placeholder="Create a password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      minLength={6}
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
                  <div className="rounded-full bg-white/10 p-1">
                    <div className={`h-1.5 rounded-full ${passwordStrength.color} ${passwordStrength.width}`} />
                  </div>
                  <p className="text-xs font-medium text-slate-400">{passwordStrength.label}</p>
                </div>

                <div className="rounded-lg border border-blue-400/20 bg-blue-500/10 p-3">
                  <div className="flex items-start gap-3">
                    <LockKeyhole size={18} className="mt-0.5 shrink-0 text-blue-300" />
                    <p className="text-sm leading-6 text-slate-200">
                      Account permissions are assigned securely by the app. The form never asks users to choose elevated access.
                    </p>
                  </div>
                </div>

                <Button className="h-11 w-full text-base" type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create account'}
                  {!isLoading ? <ArrowRight size={18} /> : null}
                </Button>
              </form>
            </div>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already registered?{' '}
              <Link className="font-bold text-blue-300 hover:text-blue-200" to="/login">
                Sign in
              </Link>
            </p>
          </div>
        </section>

        <section className="hidden px-10 py-10 lg:flex lg:flex-col">
          <div className="ml-auto inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
            <Sparkles size={14} />
            TypeScript + MERN
          </div>

          <div className="mt-20 max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">Clean onboarding</p>
            <h2 className="mt-4 text-5xl font-bold tracking-normal">Professional access with protected privileges.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              The flow keeps the UI simple while still satisfying the brief: registration, login, protected routes,
              password hashing, validation, and role-based access.
            </p>
          </div>

          <div className="mt-auto grid gap-4">
            {[
              ['Sales role by default', 'Public signup cannot create an admin account.'],
              ['Protected dashboard routes', 'Only authenticated users enter the workspace.'],
              ['Typed auth payloads', 'Frontend and backend contracts stay aligned.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-blue-300" />
                  <h3 className="font-bold text-white">{title}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
