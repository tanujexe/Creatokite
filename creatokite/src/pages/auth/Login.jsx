import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Zap, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import PageTransition from '../../components/common/PageTransition';

export default function Login() {
  const [searchParams] = useSearchParams();
  const requestedRole = searchParams.get('role');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [role, setRole] = useState(
    requestedRole === 'brand' || requestedRole === 'admin'
      ? requestedRole
      : localStorage.getItem('creatokite:lastRole') || 'creator'
  );
  const { loginWithEmail, loginWithGoogle } = useAuth();

  useEffect(() => {
    if (requestedRole === 'brand' || requestedRole === 'admin') {
      setRole(requestedRole);
    }
  }, [requestedRole]);

  async function handleEmailLogin(e) {
    e.preventDefault();
    if (!email || !password) return toast.error('Fill in all fields');
    setLoading(true);
    try {
      localStorage.setItem('creatokite:lastRole', role);
      await loginWithEmail(email, password);
      toast.success('Welcome back!');
    } catch (err) {
      toast.error(err.message || friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    try {
      localStorage.setItem('creatokite:lastRole', role);
      await loginWithGoogle();
      toast.success('Welcome!');
    } catch (err) {
      toast.error('Google login failed. Try again.');
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Left visual */}
        <div
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12"
          style={{
            background: 'linear-gradient(135deg, #0B0F1A 0%, #111827 100%)',
          }}
        >
          {/* Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(ellipse, #F97316 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-brand-500 mx-auto flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(249,115,22,0.4)]">
              <Zap className="w-8 h-8 text-white" fill="currentColor" />
            </div>
            <h2 className="font-display text-4xl font-bold mb-4">
              Welcome back to <span className="text-gradient">Creatokite</span>
            </h2>
            <p className="text-slate-400 mb-8">
              India's creator economy platform — where micro-creators earn real
              money.
            </p>
            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '5K+', label: 'Creators' },
                { value: '₹1.2Cr', label: 'Paid Out' },
                { value: '92%', label: 'Success Rate' },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4">
                  <div className="font-display text-xl font-bold text-gradient">
                    {s.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Right — Form */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Logo (mobile only) */}
            <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-xl">Creatokite</span>
            </Link>
  
            <h1 className="font-display text-3xl font-bold mb-2">Log in</h1>
            <p className="text-slate-400 mb-8">
              Don't have an account?{' '}
              <Link
                to={`/register?role=${role}`}
                className="text-brand-400 hover:text-brand-300 transition-colors font-medium"
              >
                Sign up free
              </Link>
            </p>
  
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
              {['creator', 'brand', 'admin'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRole(item)}
                  className={`rounded-xl border px-3 py-2 text-xs font-medium capitalize transition-colors ${
                    role === item
                      ? 'border-brand-500 bg-brand-500/10 text-brand-300'
                      : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
  
            {/* Google login */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="btn-outline w-full flex items-center justify-center gap-3 mb-6 py-3.5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {googleLoading ? 'Signing in...' : 'Continue with Google'}
            </button>
  
            {/* Divider */}
            <div className="relative flex items-center mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="px-3 text-xs text-slate-500">
                or continue with email as {role}
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
  
            {/* Email form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    className="input-field pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPass ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
  
              <button
                type="submit"
                disabled={loading}
                className="btn-brand w-full flex items-center justify-center gap-2 py-3.5 mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <>
                    Log in <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function friendlyError(code) {
  const map = {
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/invalid-credential': 'Invalid email or password.',
  };
  return map[code] || 'Login failed. Please try again.';
}
