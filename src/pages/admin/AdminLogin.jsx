import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabaseClient.js';
import logoImg from '../../assets/logo/hezek-logo.svg';

export default function AdminLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect back to where the admin was trying to go, or default to /admin.
  const from = location.state?.from?.pathname || '/admin';

  async function onSubmit({ email, password }) {
    setLoading(true);
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError('Invalid email or password.');
      setLoading(false);
    } else {
      navigate(from, { replace: true });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-mist px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <img
            src={logoImg}
            alt="HezekHealth"
            style={{ height: '140px', width: 'auto', display: 'block' }}
          />
        </div>
        <div className="rounded-card bg-white p-8 shadow-card">
          <h1 className="font-display text-xl font-bold text-brand-blue">Admin Sign In</h1>
          <p className="mt-1 text-sm text-brand-ink/50">Hezek Health Dashboard</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-ink">
                Email
              </label>
              <input
                {...register('email', { required: 'Email is required.' })}
                type="email"
                autoComplete="email"
                className="w-full rounded-xl border border-brand-blue/20 px-4 py-3 text-sm focus:border-brand-teal focus:outline-none"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-brand-ink">
                Password
              </label>
              <input
                {...register('password', { required: 'Password is required.' })}
                type="password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-brand-blue/20 px-4 py-3 text-sm focus:border-brand-teal focus:outline-none"
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            {authError && (
              <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{authError}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-brand-blue py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}