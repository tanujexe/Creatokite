import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Zap,
  LayoutDashboard,
  Megaphone,
  BarChart2,
  Wallet,
  Users,
  Settings,
  LogOut,
  Bell,
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
  FileText,
  ShieldCheck,
  Package,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const roleLinks = {
  creator: [
    { icon: LayoutDashboard, label: 'Overview', to: '/creator' },
    { icon: Megaphone, label: 'Campaigns', to: '/creator/campaigns' },
    { icon: Wallet, label: 'Earnings', to: '/creator/earnings' },
    { icon: BarChart2, label: 'Analytics', to: '/creator/analytics' },
    { icon: Star, label: 'My Profile', to: '/creator/profile' },
    { icon: FileText, label: 'Submissions', to: '/creator/submissions' },
  ],
  brand: [
    { icon: LayoutDashboard, label: 'Overview', to: '/brand' },
    { icon: Megaphone, label: 'Campaigns', to: '/brand/campaigns' },
    { icon: Search, label: 'Find Creators', to: '/brand/discover' },
    { icon: BarChart2, label: 'Analytics', to: '/brand/analytics' },
    { icon: Package, label: 'Assets', to: '/brand/assets' },
    { icon: FileText, label: 'Reports', to: '/brand/reports' },
  ],
  admin: [
    { icon: LayoutDashboard, label: 'Overview', to: '/admin' },
    { icon: Users, label: 'All Users', to: '/admin/users' },
    { icon: Megaphone, label: 'Campaigns', to: '/admin/campaigns' },
    { icon: UserCheck, label: 'Verify', to: '/admin/verify' },
    { icon: ShieldCheck, label: 'Trust Score', to: '/admin/trust' },
    { icon: BarChart2, label: 'Analytics', to: '/admin/analytics' },
  ],
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { profile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const role = profile?.role || 'creator';
  const links = roleLinks[role] || roleLinks.creator;

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-base-800 border border-white/10 text-slate-300"
      >
        <Zap className="w-5 h-5 text-brand-400" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen flex flex-col transition-all duration-300 z-50 border-r border-white/5
          ${collapsed ? 'w-[72px]' : 'w-[240px]'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ background: '#0B0F1A' }}
      >
        {/* Logo */}
        <div
          className={`flex items-center gap-3 p-4 border-b border-white/5 ${collapsed ? 'justify-center' : ''}`}
        >
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-lg tracking-tight">
              Creato<span className="text-gradient">kite</span>
            </span>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {links.map(({ icon: Icon, label, to }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`sidebar-link ${active ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{label}</span>}
                {!collapsed && active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-white/5 space-y-1">
          {/* Notifications */}
          <Link
            to={`/${role}/notifications`}
            onClick={() => setMobileOpen(false)}
            className={`sidebar-link ${collapsed ? 'justify-center px-0' : ''}`}
            title={collapsed ? 'Notifications' : undefined}
          >
            <Bell className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Notifications</span>}
            {!collapsed && (
              <span className="ml-auto badge badge-orange text-xs">3</span>
            )}
          </Link>

          {/* Settings */}
          <Link
            to={`/${role}/settings`}
            onClick={() => setMobileOpen(false)}
            className={`sidebar-link ${collapsed ? 'justify-center px-0' : ''}`}
            title={collapsed ? 'Settings' : undefined}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Settings</span>}
          </Link>

          {/* User profile */}
          <div
            className={`flex items-center gap-3 px-2 py-3 ${collapsed ? 'justify-center' : ''}`}
          >
            {profile?.photoURL ? (
              <img
                src={profile.photoURL}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-white/10"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-brand-400">
                  {profile?.displayName?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
            )}
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">
                  {profile?.displayName || 'User'}
                </p>
                <p className="text-xs text-slate-500 capitalize">{role}</p>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`sidebar-link w-full hover:text-red-400 hover:bg-red-500/5 ${collapsed ? 'justify-center px-0' : ''}`}
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Log out</span>}
          </button>
        </div>

        {/* Collapse toggle (Desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-base-700 border border-white/10 items-center justify-center text-slate-400 hover:text-white hover:border-brand-500/50 transition-all"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </aside>
    </>
  );
}
