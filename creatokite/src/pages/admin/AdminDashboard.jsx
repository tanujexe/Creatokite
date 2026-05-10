import { useMemo, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SectionShell from '../../components/dashboard/SectionShell';
import StatCard from '../../components/dashboard/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import {
  Users,
  Megaphone,
  IndianRupee,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Sparkles,
  Plus,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { platformGrowth, nicheDistribution, brandRoiData } from '../../utils/mockData';

/* ---------- sub-components ---------- */
function AdminStats() {
  const stats = [
    { label: 'Total Creators', value: '5,200', change: '+320 this week', up: true, icon: Users, color: 'brand' },
    { label: 'Active Campaigns', value: '312', change: '+28 this week', up: true, icon: Megaphone, color: 'blue' },
    { label: 'Total GMV', value: '₹1.8Cr', change: '+₹24L this week', up: true, icon: IndianRupee, color: 'green' },
    { label: 'Platform Health', value: '96%', change: 'All systems OK', up: true, icon: Activity, color: 'purple' },
  ];
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}

function GrowthChart() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-semibold text-lg">Platform Growth</h3>
          <p className="text-xs text-slate-500">Creators, Brands & Campaigns</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={platformGrowth}>
          <defs>
            <linearGradient id="creatorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 12, color: '#f1f5f9' }} />
          <Area type="monotone" dataKey="creators" stroke="#F97316" strokeWidth={2} fill="url(#creatorGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

function Overview() {
  return (
    <SectionShell title="Platform Overview" subtitle="Unified control for the Creatokite network">
      <AdminStats />
      <div className="grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-5">
          <GrowthChart />
        </div>
        <div className="space-y-5">
          <Card className="p-6 border-brand-500/20">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              <h3 className="font-display font-semibold text-lg">Quick Actions</h3>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-xs gap-2 py-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verify 12 Creators
              </Button>
              <Button variant="outline" className="w-full justify-start text-xs gap-2 py-2">
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" /> Review 3 Flags
              </Button>
              <Button variant="brand" className="w-full justify-start text-xs gap-2 py-2">
                <Plus className="w-3.5 h-3.5" /> Create Global Promo
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-purple-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="font-display font-semibold text-lg">AI Ops Insights</h3>
            </div>
            <div className="space-y-3 text-xs text-slate-300">
              <p>• Beauty niche campaigns have 2.4× higher ROI this month.</p>
              <p>• 3 creator profiles show suspicious engagement spikes.</p>
            </div>
          </Card>
        </div>
      </div>
    </SectionShell>
  );
}

function UserManagement() {
  const [users, setUsers] = useState([
    { id: '1', name: 'Priya Sharma', email: 'priya@example.com', role: 'creator', status: 'verified', joined: 'Oct 12, 2025' },
    { id: '2', name: 'Rahul Mehta', email: 'rahul@example.com', role: 'creator', status: 'pending', joined: 'Nov 05, 2025' },
    { id: '3', name: 'Nykaa Beauty', email: 'admin@nykaa.com', role: 'brand', status: 'verified', joined: 'Sep 20, 2025' },
    { id: '4', name: 'Karan Singh', email: 'karan@example.com', role: 'creator', status: 'suspended', joined: 'Dec 01, 2025' },
  ]);

  return (
    <SectionShell title="User Management" subtitle="Manage all creators, brands and staff accounts">
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center font-bold text-brand-400">
                        {u.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={u.role === 'brand' ? 'blue' : 'orange'} className="capitalize">{u.role}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {u.status === 'verified' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      ) : u.status === 'suspended' ? (
                        <XCircle className="w-3.5 h-3.5 text-red-500" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-yellow-500" />
                      )}
                      <span className={`text-xs capitalize ${
                        u.status === 'verified' ? 'text-green-500' : 
                        u.status === 'suspended' ? 'text-red-500' : 'text-yellow-500'
                      }`}>
                        {u.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">{u.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="outline" className="p-2 h-auto text-[10px]">Edit</Button>
                      <Button variant="danger" className="p-2 h-auto text-[10px]">Suspend</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </SectionShell>
  );
}

function CampaignManagement() {
  return (
    <SectionShell title="Campaign Operations" subtitle="Monitor and moderate active marketplace campaigns">
      <div className="grid md:grid-cols-2 gap-5">
        {brandRoiData.map((c, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold">{c.campaign}</h4>
                  <p className="text-xs text-slate-500">Spend: ₹{(c.spend/1000).toFixed(0)}K</p>
                </div>
              </div>
              <Badge variant="green">Active</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Reach</p>
                <p className="text-lg font-bold">{(c.reach/1000).toFixed(0)}K</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Eng. Rate</p>
                <p className="text-lg font-bold">{((c.engagement / c.reach) * 100).toFixed(1)}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex-1 py-2 text-xs">View Details</Button>
              <Button variant="danger" className="py-2 px-3 h-auto"><AlertTriangle className="w-4 h-4" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}

function Verification() {
  const pending = [
    { id: 1, name: 'Rahul Mehta', followers: '8.2K', niche: 'Tech', docs: ['ID', 'Social Link'] },
    { id: 2, name: 'Sanya Gupta', followers: '15.1K', niche: 'Fashion', docs: ['ID', 'Social Link', 'Bank'] },
  ];

  return (
    <SectionShell title="Creator Verification" subtitle="Review documentation and verify social identity">
      <div className="space-y-4">
        {pending.map((p) => (
          <Card key={p.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xl font-bold text-orange-400">
                  {p.name[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{p.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Users className="w-3 h-3" /> {p.followers}</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1"><Sparkles className="w-3 h-3" /> {p.niche}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 mr-4">
                  {p.docs.map(d => (
                    <span key={d} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-400">{d}</span>
                  ))}
                </div>
                <Button variant="outline" className="text-xs py-2">Reject</Button>
                <Button variant="brand" className="text-xs py-2 px-6">Verify Now</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="campaigns" element={<CampaignManagement />} />
        <Route path="verify" element={<Verification />} />
        <Route path="*" element={<Overview />} />
      </Routes>
    </DashboardLayout>
  );
}
