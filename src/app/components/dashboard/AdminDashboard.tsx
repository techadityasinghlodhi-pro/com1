import { useState } from 'react';
import {
  Shield, Users, BarChart2, Server, AlertTriangle, CheckCircle2,
  TrendingUp, Database, Lock, Activity, Zap, RefreshCw,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const platformStats = [
  { label: 'Total Users', value: '2,847', sub: '+124 this month', icon: Users, color: '#34D399' },
  { label: 'Active Today', value: '1,203', sub: '42.3% DAU rate', icon: Activity, color: '#22D3EE' },
  { label: 'Tasks Completed', value: '18,429', sub: 'Today', icon: CheckCircle2, color: '#C084FC' },
  { label: 'Problems Solved', value: '4,821', sub: 'Today across all users', icon: Zap, color: '#FACC15' },
  { label: 'Core Members', value: '24', sub: 'Staff & Mentors', icon: Shield, color: '#FB923C' },
  { label: 'Avg Streak', value: '18.4d', sub: 'Platform average', icon: TrendingUp, color: '#F87171' },
];

const activityData = [
  { day: 'Jun 14', users: 1020, tasks: 14200 },
  { day: 'Jun 15', users: 1142, tasks: 15800 },
  { day: 'Jun 16', users: 980, tasks: 13400 },
  { day: 'Jun 17', users: 1310, tasks: 17600 },
  { day: 'Jun 18', users: 1224, tasks: 16900 },
  { day: 'Jun 19', users: 1089, tasks: 15200 },
  { day: 'Jun 20', users: 1203, tasks: 18429 },
];

const systemStatus = [
  { service: 'Supabase Auth', status: 'healthy', latency: '12ms' },
  { service: 'PostgreSQL DB', status: 'healthy', latency: '8ms' },
  { service: 'Redis Cache', status: 'healthy', latency: '2ms' },
  { service: 'Daily Task Cron (04:00 AM)', status: 'healthy', latency: 'Last run: OK' },
  { service: 'GitHub Webhook Sync', status: 'degraded', latency: '340ms' },
  { service: 'RLS Policy Engine', status: 'healthy', latency: 'Active' },
];

const recentUsers = [
  { name: 'Jay D.', avatar: 'JD', role: 'member', joined: '2h ago', streak: 0, email: 'jay@example.com' },
  { name: 'Lena R.', avatar: 'LR', role: 'core_member', joined: '1d ago', streak: 42, email: 'lena@example.com' },
  { name: 'Tom K.', avatar: 'TK', role: 'member', joined: '2d ago', streak: 3, email: 'tom@example.com' },
  { name: 'Sara M.', avatar: 'SM', role: 'member', joined: '3d ago', streak: 7, email: 'sara@example.com' },
];

const roleColor: Record<string, { color: string; bg: string }> = {
  member: { color: '#8D98A9', bg: '#1A2332' },
  core_member: { color: '#C084FC', bg: 'rgba(192,132,252,0.1)' },
  super_admin: { color: '#FACC15', bg: 'rgba(250,204,21,0.1)' },
};

const statusColor: Record<string, string> = {
  healthy: '#34D399',
  degraded: '#FACC15',
  down: '#F87171',
};

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'system'>('overview');

  return (
    <div className="p-6" style={{ backgroundColor: '#0B0F17', minHeight: '100%' }}>
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <Shield size={18} style={{ color: '#FACC15' }} />
          <h1 className="text-lg font-semibold" style={{ color: '#F0F6FC' }}>
            Admin Panel
          </h1>
          <span
            className="text-xs px-2 py-0.5 rounded-full ml-1"
            style={{ backgroundColor: 'rgba(250,204,21,0.1)', color: '#FACC15', border: '1px solid rgba(250,204,21,0.2)' }}
          >
            super_admin
          </span>
        </div>
        <p className="text-sm" style={{ color: '#4A6072' }}>
          Platform metrics, user management, system health monitoring
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5">
        {(['overview', 'users', 'system'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize border transition-all"
            style={{
              backgroundColor: activeTab === tab ? '#1A2332' : 'transparent',
              borderColor: activeTab === tab ? '#253347' : 'transparent',
              color: activeTab === tab ? '#F0F6FC' : '#4A6072',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* Platform stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {platformStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border p-4"
                style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs" style={{ color: '#4A6072' }}>{s.label}</p>
                  <s.icon size={14} style={{ color: s.color }} />
                </div>
                <p className="text-2xl font-bold" style={{ color: '#F0F6FC' }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: '#4A6072' }}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Activity charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
            >
              <p className="text-sm font-semibold mb-3" style={{ color: '#F0F6FC' }}>Daily Active Users</p>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={activityData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34D399" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#34D399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2A3B" />
                  <XAxis dataKey="day" tick={{ fill: '#4A6072', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#4A6072', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #253347', borderRadius: 8, fontSize: 11 }} />
                  <Area type="monotone" dataKey="users" stroke="#10B981" fill="url(#userGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
            >
              <p className="text-sm font-semibold mb-3" style={{ color: '#F0F6FC' }}>Daily Tasks Completed</p>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={activityData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="taskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C084FC" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#C084FC" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2A3B" />
                  <XAxis dataKey="day" tick={{ fill: '#4A6072', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#4A6072', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #253347', borderRadius: 8, fontSize: 11 }} />
                  <Area type="monotone" dataKey="tasks" stroke="#C084FC" fill="url(#taskGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div
          className="rounded-xl border"
          style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#1E2A3B' }}>
            <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>All Users</p>
            <button
              className="px-3 py-1 rounded-lg text-xs border"
              style={{ backgroundColor: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.2)', color: '#34D399' }}
            >
              Invite Member
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: '#1E2A3B' }}>
            {recentUsers.map((u) => {
              const rs = roleColor[u.role];
              return (
                <div key={u.email} className="flex items-center gap-4 px-4 py-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: '#1A2332', color: '#34D399', border: '1px solid rgba(16,185,129,0.2)' }}
                  >
                    {u.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm" style={{ color: '#C5D2DF' }}>{u.name}</p>
                    <p className="text-xs" style={{ color: '#4A6072' }}>{u.email} · Joined {u.joined}</p>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ backgroundColor: rs.bg, color: rs.color }}
                  >
                    {u.role}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      className="px-2 py-1 rounded text-xs border"
                      style={{ borderColor: '#1E2A3B', color: '#4A6072' }}
                    >
                      Edit Role
                    </button>
                    <button
                      className="px-2 py-1 rounded text-xs border"
                      style={{ borderColor: 'rgba(248,113,113,0.2)', color: '#F87171' }}
                    >
                      Suspend
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="space-y-4">
          <div
            className="rounded-xl border"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: '#1E2A3B' }}>
              <Server size={14} style={{ color: '#22D3EE' }} />
              <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>System Health</p>
              <div className="flex items-center gap-1.5 ml-auto">
                <RefreshCw size={12} style={{ color: '#4A6072' }} />
                <span className="text-xs" style={{ color: '#4A6072' }}>Updated 30s ago</span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {systemStatus.map((s) => (
                <div key={s.service} className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: statusColor[s.status],
                      boxShadow: s.status === 'healthy' ? `0 0 6px ${statusColor[s.status]}` : 'none',
                    }}
                  />
                  <p className="flex-1 text-sm" style={{ color: '#C5D2DF' }}>{s.service}</p>
                  <span
                    className="text-xs px-2 py-0.5 rounded capitalize"
                    style={{
                      backgroundColor: `${statusColor[s.status]}15`,
                      color: statusColor[s.status],
                    }}
                  >
                    {s.status}
                  </span>
                  <span className="text-xs" style={{ color: '#4A6072' }}>{s.latency}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RLS Policies */}
          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Lock size={14} style={{ color: '#34D399' }} />
              <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>RLS Policy Status</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                'public.user_roles',
                'public.trackers',
                'public.learning_objects',
                'public.heatmaps',
                'public.daily_tasks',
                'public.study_tracks',
              ].map((table) => (
                <div
                  key={table}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{ backgroundColor: '#0B0F17', border: '1px solid #1E2A3B' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#34D399' }} />
                  <span className="text-xs font-mono" style={{ color: '#8D98A9' }}>{table}</span>
                  <span className="ml-auto text-xs" style={{ color: '#34D399' }}>RLS ON</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
