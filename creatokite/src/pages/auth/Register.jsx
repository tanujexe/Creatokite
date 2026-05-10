import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Zap,
  Mail,
  Lock,
  User,
  Building2,
  Check,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import PageTransition from '../../components/common/PageTransition';

export default function Register() {
  const [searchParams] = useSearchParams();
  const requestedRole = searchParams.get('role');
  const initialRole =
    requestedRole === 'brand' || requestedRole === 'admin'
      ? requestedRole
      : 'creator';

  const [role, setRole] = useState(initialRole);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { registerWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) return toast.error('Fill in all fields');
    if (password.length < 6)
      return toast.error('Password must be at least 6 characters');

    if (role === 'admin') {
      const envCode = import.meta.env.VITE_ADMIN_INVITE_CODE || '';
      if (!inviteCode || inviteCode !== envCode) {
        return toast.error('Invalid admin invite code');
      }
    }

    setLoading(true);
    try {
      // Save role hint for immediate redirection in App.jsx
      localStorage.setItem('creatokite:lastRole', role);
      
      await registerWithEmail(email, password, name, role, { companyName });
      toast.success('Account created! Welcome to Creatokite 🎉');
      navigate(role === 'admin' ? '/admin' : role === 'brand' ? '/brand' : '/creator');
    } catch (err) {
      toast.error(err.message || friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setGoogleLoading(true);
    try {
      if (role === 'admin') {
        const envCode = import.meta.env.VITE_ADMIN_INVITE_CODE || '';
        if (!inviteCode || inviteCode !== envCode) {
          return toast.error('Invalid admin invite code for Google signup');
        }
      }
      // Save role hint for immediate redirection in App.jsx
      localStorage.setItem('creatokite:lastRole', role);
      
      await loginWithGoogle(role);
      toast.success('Welcome to Creatokite! 🎉');
      navigate(role === 'admin' ? '/admin' : role === 'brand' ? '/brand' : '/creator');
    } catch (err) {
      toast.error(err.message || 'Google signup failed.');
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        <div
          className="hidden lg:flex lg:w-[45%] relative overflow-hidden items-center justify-center p-12"
          style={{ background: 'linear-gradient(135deg, #0B0F1A 0%, #111827 100%)' }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-15"
            style={{ background: 'radial-gradient(ellipse, #F97316 0%, transparent 70%)' }}
          />
          <div className="relative z-10 max-w-sm">
            <Link to="/" className="flex items-center gap-2 mb-10">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-xl">Creatokite</span>
            </Link>
            <h2 className="font-display text-3xl font-bold mb-3">
              Join India's creator economy revolution
            </h2>
            <p className="text-slate-400 mb-8 text-sm">
              Whether you're a creator, brand, or admin, Creatokite helps you
              build authentic connections that drive real results.
            </p>
            <ul className="space-y-3">
              {[
                'No minimum follower requirement',
                'AI-powered creator matching',
                'Secure escrow payment system',
                'Verified brand partnerships',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-brand-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
  
        <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
          <div className="w-full max-w-md py-8">
            <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-xl">Creatokite</span>
            </Link>
  
            <h1 className="font-display text-3xl font-bold mb-2">Create account</h1>
            <p className="text-slate-400 mb-8">
              Already have one?{' '}
              <Link to="/login" className="text-brand-400 hover:text-brand-300 transition-colors font-medium">
                Log in
              </Link>
            </p>
  
            {step === 1 && (
              <>
                <p className="text-sm font-medium text-slate-300 mb-3">I want to join as a…</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {[
                    { value: 'creator', icon: User, label: 'Creator', desc: 'Earn from campaigns' },
                    { value: 'brand', icon: Building2, label: 'Brand', desc: 'Run campaigns' },
                    { value: 'admin', icon: ShieldCheck, label: 'Admin', desc: 'Manage platform' },
                  ].map(({ value, icon: Icon, label, desc }) => (
                    <button
                      key={value}
                      onClick={() => setRole(value)}
                      className={`relative p-4 rounded-2xl border text-left transition-all ${
                        role === value
                          ? 'border-brand-500/50 bg-brand-500/10'
                          : 'border-white/10 glass hover:border-white/20'
                      }`}
                    >
                      {role === value && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <Icon className={`w-6 h-6 mb-3 ${role === value ? 'text-brand-400' : 'text-slate-400'}`} />
                      <p className="font-semibold text-sm mb-0.5">{label}</p>
                      <p className="text-xs text-slate-500">{desc}</p>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="btn-brand w-full flex items-center justify-center gap-2"
                >
                  Continue as {role === 'creator' ? 'Creator' : role === 'brand' ? 'Brand' : 'Admin'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
  
            {step === 2 && (
              <>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-brand-400 hover:text-brand-300 mb-6 flex items-center gap-1 transition-colors"
                >
                  ← Back
                </button>
  
                <button
                  onClick={handleGoogleSignup}
                  disabled={googleLoading}
                  className="btn-outline w-full flex items-center justify-center gap-3 mb-5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  {googleLoading ? 'Signing up...' : 'Sign up with Google'}
                </button>
  
                <div className="relative flex items-center mb-5">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="px-3 text-xs text-slate-500 uppercase tracking-wider">or continue with email</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
  
                {role === 'admin' && (
                  <div className="mb-5">
                    <label htmlFor="inviteCode" className="block text-sm font-medium text-slate-300 mb-1.5">Admin Invite Code</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        id="inviteCode"
                        name="inviteCode"
                        type="text"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        placeholder="Enter admin invite code"
                        className="input-field pl-10"
                        required
                      />
                    </div>
                  </div>
                )}
  
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                      {role === 'brand' ? 'Your Name' : role === 'admin' ? 'Admin Name' : 'Creator Name'}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        className="input-field pl-10"
                        required
                      />
                    </div>
                  </div>
  
                  {role === 'brand' && (
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-slate-300 mb-1.5">Company Name</label>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            id="companyName"
                            name="companyName"
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Your company"
                            className="input-field pl-10"
                          />
                        </div>
                    </div>
                  )}
  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        id="email"
                        name="email"
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
                    <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        id="password"
                        name="password"
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="input-field pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                        Creating account...
                      </span>
                    ) : (
                      <>
                        Create account <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
  
                  <p className="text-xs text-slate-500 text-center">
                    By signing up you agree to our{' '}
                    <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
                      Terms
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function friendlyError(code) {
  const map = {
    'auth/email-already-in-use': 'This email is already registered. Try logging in.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-email': 'Invalid email address.',
  };
  return map[code] || 'Registration failed. Please try again.';
}
