import { useState } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SectionShell from '../../components/dashboard/SectionShell';
import StatCard from '../../components/dashboard/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import {
  TrendingUp,
  Users,
  Megaphone,
  IndianRupee,
  Search,
  Plus,
  Eye,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { brandRoiData, creatorPool } from '../../utils/mockData';

/* ---------- sub-components ---------- */
function BrandStats() {
  const stats = [
    { label: 'Total Reach This Month', value: '4.2M', change: '+32%', up: true, icon: Eye, color: 'blue' },
    { label: 'Active Creators', value: '24', change: '+6', up: true, icon: Users, color: 'blue' },
    { label: 'Campaign ROI', value: '4.8×', change: '+1.2', up: true, icon: TrendingUp, color: 'blue' },
    { label: 'Total Spend', value: '₹3.2L', change: '+18%', up: true, icon: IndianRupee, color: 'blue' },
  ];
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}

function ROIChart() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-semibold text-lg">Campaign Performance</h3>
          <p className="text-xs text-slate-500">Reach & Engagement by campaign</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={brandRoiData} barGap={6}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="campaign" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
          <Tooltip
            contentStyle={{ background: '#111827', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 12, color: '#f1f5f9' }}
          />
          <Bar dataKey="reach" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Reach" />
          <Bar dataKey="engagement" fill="#F97316" radius={[4, 4, 0, 0]} name="Engagements" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

function CreatorDiscovery() {
  const [query, setQuery] = useState('');
  const filtered = creatorPool.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.niche.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg">Creator Discovery</h3>
        <Sparkles className="w-4 h-4 text-purple-400" />
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search creators or niche..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field pl-10 py-2.5 text-sm"
        />
      </div>
      <div className="space-y-3">
        {filtered.map((c, idx) => (
          <motion.div 
            key={c.id} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-brand-500/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-gold-400 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold truncate">{c.name}</p>
                  {c.verified && <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />}
                </div>
                <p className="text-xs text-slate-500 truncate">{c.niche}</p>
              </div>
              <Button variant="outline" className="py-1.5 px-3 h-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity">Invite</Button>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[
                { label: 'Followers', val: c.followers },
                { label: 'Eng. Rate', val: c.er },
                { label: 'Trust', val: `${c.trust}/100` },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <p className="text-xs font-semibold text-slate-200">{m.val}</p>
                  <p className="text-[10px] text-slate-500">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

function Overview() {
  const { profile } = useAuth();
  return (
    <SectionShell 
      title={`${profile?.displayName || 'Brand'} Dashboard`}
      subtitle="Manage your creator campaigns"
      actions={
        <Button variant="brand" className="text-sm">
          <Plus className="w-4 h-4" /> Launch Campaign
        </Button>
      }
    >
      <BrandStats />
      <div className="grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          <ROIChart />
        </div>
        <div>
          <CreatorDiscovery />
        </div>
      </div>
    </SectionShell>
  );
}

export default function BrandDashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="discover" element={<CreatorDiscovery />} />
        <Route path="*" element={<Overview />} />
      </Routes>
    </DashboardLayout>
  );
}
