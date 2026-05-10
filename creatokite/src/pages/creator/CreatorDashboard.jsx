import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SectionShell from '../../components/dashboard/SectionShell';
import StatCard from '../../components/dashboard/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import {
  TrendingUp,
  IndianRupee,
  Megaphone,
  Star,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { creatorEarningsData, creatorCampaigns, availableCampaigns } from '../../utils/mockData';

/* ---------- sub-components ---------- */
function StatsRow() {
  const stats = [
    { label: 'Total Earnings', value: '₹42,800', change: '+18%', up: true, icon: IndianRupee },
    { label: 'Active Campaigns', value: '3', change: '+1', up: true, icon: Megaphone },
    { label: 'Trust Score', value: '87/100', change: '+5', up: true, icon: Star },
    { label: 'Avg. Engagement', value: '6.2%', change: '+0.8%', up: true, icon: TrendingUp },
  ];
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}

function EarningsChart() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-lg">Earnings Overview</h3>
          <p className="text-xs text-slate-500 mt-0.5">Last 7 months</p>
        </div>
        <Badge variant="green">+28% vs last period</Badge>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={creatorEarningsData}>
          <defs>
            <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
          <Tooltip
            contentStyle={{ background: '#111827', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 12, color: '#f1f5f9' }}
            formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Earnings']}
          />
          <Area type="monotone" dataKey="amount" stroke="#F97316" strokeWidth={2.5} fill="url(#earningsGrad)" dot={{ fill: '#F97316', strokeWidth: 0, r: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

function CampaignList() {
  const statusConfig = {
    active: { variant: 'green', label: 'Active', icon: CheckCircle2 },
    review: { variant: 'yellow', label: 'In Review', icon: RefreshCw },
    pending: { variant: 'blue', label: 'Pending', icon: Clock },
    completed: { variant: 'orange', label: 'Completed', icon: Star },
  };

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-lg">My Campaigns</h3>
        <Button variant="ghost" className="text-xs p-0 h-auto" onClick={() => {}}>View all →</Button>
      </div>
      <div className="space-y-3">
        {creatorCampaigns.map((c, idx) => {
          const cfg = statusConfig[c.status];
          return (
            <motion.div 
              key={c.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center font-bold text-brand-400 text-sm flex-shrink-0">
                  {c.brand[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{c.brand}</p>
                  <p className="text-xs text-slate-500">{c.deliverable}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-brand-400">₹{c.budget.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 justify-end"><Clock className="w-3 h-3" /> {c.deadline}</p>
                </div>
                <Badge variant={cfg.variant} icon={cfg.icon}>{cfg.label}</Badge>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}

function AvailableCampaigns() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-lg">Recommended for You</h3>
        <Sparkles className="w-4 h-4 text-purple-400" />
      </div>
      <div className="space-y-3">
        {availableCampaigns.map((c) => (
          <div key={c.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-brand-500/20 transition-all group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-500/15 border border-brand-500/20 flex items-center justify-center font-bold text-brand-400 text-xs">
                  {c.brand[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{c.brand}</p>
                  <p className="text-xs text-slate-500">{c.niche} · {c.followers} followers</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-brand-400">{c.budget}</p>
                <p className="text-xs text-slate-500">{c.slots} slots left</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-xs text-slate-500">AI Match</div>
                <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${c.match}%`, background: 'linear-gradient(90deg, #F97316, #FBBF24)' }} />
                </div>
                <span className="text-xs font-semibold text-brand-400">{c.match}%</span>
              </div>
              <Button variant="ghost" className="text-xs p-0 h-auto opacity-0 group-hover:opacity-100">Apply Now →</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ProfileCompletion() {
  const steps = [
    { label: 'Basic info', done: true },
    { label: 'Social accounts', done: true },
    { label: 'Niche & interests', done: true },
    { label: 'Portfolio samples', done: false },
    { label: 'Bank account', done: false },
  ];
  const done = steps.filter((s) => s.done).length;
  const pct = Math.round((done / steps.length) * 100);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold">Profile Completion</h3>
        <span className="font-display text-xl font-bold text-gradient">{pct}%</span>
      </div>
      <div className="progress-bar mb-4">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <ul className="space-y-2">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5 text-sm">
            {s.done ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-slate-600 flex-shrink-0" />}
            <span className={s.done ? 'text-slate-300' : 'text-slate-500'}>{s.label}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------- Main Overview ---------- */
function Overview() {
  const { profile } = useAuth();
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Hey, {profile?.displayName?.split(' ')[0] || 'Creator'} 👋</h1>
          <p className="text-slate-400 text-sm mt-1">Here's your performance at a glance</p>
        </div>
        <Badge variant="green">Profile Active</Badge>
      </div>

      <StatsRow />

      <div className="grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          <EarningsChart />
          <CampaignList />
        </div>
        <div className="space-y-5">
          <ProfileCompletion />
          <AvailableCampaigns />
        </div>
      </div>
    </div>
  );
}

function CampaignsPage() {
  return (
    <SectionShell title="Campaigns" subtitle="Track active, pending, and completed creator campaigns">
      <div className="grid xl:grid-cols-2 gap-5">
        <CampaignList />
        <AvailableCampaigns />
      </div>
    </SectionShell>
  );
}

/* ---------- Page wrapper ---------- */
export default function CreatorDashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="campaigns" element={<CampaignsPage />} />
        <Route path="*" element={<Overview />} />
      </Routes>
    </DashboardLayout>
  );
}
