import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  function dashboardPath() {
    if (!profile) return '/creator';
    if (profile.role === 'brand') return '/brand';
    if (profile.role === 'admin') return '/admin';
    return '/creator';
  }

  const navLinks = [
    { label: 'For Creators', href: '#creators' },
    { label: 'For Brands', href: '#brands' },
    { label: 'How it Works', href: '#how' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-shadow">
            <Zap className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            Creato<span className="text-gradient">kite</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <button
              onClick={() => navigate(dashboardPath())}
              className="btn-brand text-sm py-2 px-5"
            >
              Dashboard →
            </button>
          ) : (
            <>
              <Link to="/login" className="btn-outline text-sm py-2 px-5">
                Log in
              </Link>
              <Link to="/register" className="btn-brand  text-sm py-2 px-5">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-white/5 mt-2 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            {user ? (
              <button
                onClick={() => {
                  navigate(dashboardPath());
                  setOpen(false);
                }}
                className="btn-brand text-sm"
              >
                Dashboard →
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-outline text-sm text-center"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="btn-brand  text-sm text-center"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
