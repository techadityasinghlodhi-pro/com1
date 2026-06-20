import { useState } from 'react';
import {
  Users, MessageSquare, CheckCircle2, Clock, TrendingUp, Star,
  AlertTriangle, BarChart2, Brain, BookOpen, Code2,
} from 'lucide-react';

const assignedMembers = [
  { id: 'm1', name: 'Alex Kumar', avatar: 'AK', role: 'core_member', streak: 24, consistency: 87, tasks: { done: 4, total: 6 }, status: 'active', lastSeen: '2h ago', track: 'System Design Mastery' },
  { id: 'm2', name: 'Rahul K.', avatar: 'RK', role: 'member', streak: 19, consistency: 82, tasks: { done: 3, total: 5 }, status: 'active', lastSeen: '5h ago', track: 'DSA Zero to Hero' },
  { id: 'm3', name: 'Anika S.', avatar: 'AS', role: 'member', streak: 31, consistency: 79, tasks: { done: 5, total: 5 }, status: 'active', lastSeen: 'Just now', track: 'SQL & Database Design' },
  { id: 'm4', name: 'Mia T.', avatar: 'MT', role: 'member', streak: 11, consistency: 71, tasks: { done: 1, total: 6 }, status: 'at_risk', lastSeen: '2d ago', track: 'DSA Zero to Hero' },
  { id: 'm5', name: 'Karan P.', avatar: 'KP', role: 'member', streak: 8, consistency: 68, tasks: { done: 2, total: 6 }, status: 'at_risk', lastSeen: '1d ago', track: 'DSA Zero to Hero' },
];

const pendingReviews = [
  { id: 'r1', member: 'Alex Kumar', avatar: 'AK', submission: 'Design a URL Shortener', track: 'System Design Mastery', submittedAt: '2h ago', urgent: false },
  { id: 'r2', member: 'Rahul K.', avatar: 'RK', submission: 'Binary Tree Problems - Week 3', track: 'DSA Zero to Hero', submittedAt: '1d ago', urgent: false },
  { id: 'r3', member: 'Mia T.', avatar: 'MT', submission: 'Arrays Module Final Challenge', track: 'DSA Zero to Hero', submittedAt: '3d ago', urgent: true },
];

export function StaffDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'reviews'>('overview');

  return (
    <div className="p-6" style={{ backgroundColor: '#0B0F17', minHeight: '100%' }}>
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <Users size={18} style={{ color: '#C084FC' }} />
          <h1 className="text-lg font-semibold" style={{ color: '#F0F6FC' }}>
            Staff Panel
          </h1>
          <span
            className="text-xs px-2 py-0.5 rounded-full ml-1"
            style={{ backgroundColor: 'rgba(192,132,252,0.1)', color: '#C084FC', border: '1px solid rgba(192,132,252,0.2)' }}
          >
            core_member
          </span>
        </div>
        <p className="text-sm" style={{ color: '#4A6072' }}>
          Mentor view — review submissions, track member progress, issue feedback
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5">
        {(['overview', 'members', 'reviews'] as const).map((tab) => (
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
            {tab === 'reviews' ? `Pending Reviews (${pendingReviews.length})` : tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Assigned Members', value: assignedMembers.length, icon: Users, color: '#C084FC' },
              { label: 'Active Today', value: assignedMembers.filter(m => m.status === 'active').length, icon: CheckCircle2, color: '#34D399' },
              { label: 'At Risk', value: assignedMembers.filter(m => m.status === 'at_risk').length, icon: AlertTriangle, color: '#F87171' },
              { label: 'Pending Reviews', value: pendingReviews.length, icon: MessageSquare, color: '#FACC15' },
            ].map((s) => (
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
              </div>
            ))}
          </div>

          {/* Member list quick view */}
          <div
            className="rounded-xl border"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: '#1E2A3B' }}>
              <Users size={14} style={{ color: '#C084FC' }} />
              <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>My Mentees</p>
            </div>
            <div className="divide-y" style={{ borderColor: '#1E2A3B' }}>
              {assignedMembers.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-4 px-4 py-3"
                  style={{ backgroundColor: m.status === 'at_risk' ? 'rgba(248,113,113,0.02)' : 'transparent' }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: '#1A2332', color: '#34D399', border: '1px solid rgba(16,185,129,0.2)' }}
                  >
                    {m.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium" style={{ color: '#C5D2DF' }}>{m.name}</p>
                      {m.status === 'at_risk' && (
                        <span
                          className="text-xs px-1.5 py-0 rounded"
                          style={{ backgroundColor: 'rgba(248,113,113,0.1)', color: '#F87171' }}
                        >
                          At Risk
                        </span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: '#4A6072' }}>{m.track} · Last seen {m.lastSeen}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-medium" style={{ color: '#C5D2DF' }}>
                      {m.tasks.done}/{m.tasks.total} tasks
                    </p>
                    <p className="text-xs" style={{ color: '#4A6072' }}>{m.consistency}% consistency</p>
                  </div>
                  <div
                    className="w-16 h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: '#1A2332' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(m.tasks.done / m.tasks.total) * 100}%`,
                        backgroundColor: m.status === 'at_risk' ? '#F87171' : '#34D399',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {assignedMembers.map((m) => (
            <div
              key={m.id}
              className="rounded-xl border p-4"
              style={{
                backgroundColor: '#0F1623',
                borderColor: m.status === 'at_risk' ? 'rgba(248,113,113,0.2)' : '#1E2A3B',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: '#1A2332', color: '#34D399', border: '1px solid rgba(16,185,129,0.2)' }}
                >
                  {m.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>{m.name}</p>
                  <p className="text-xs" style={{ color: '#4A6072' }}>{m.role} · {m.lastSeen}</p>
                </div>
                <div className="ml-auto">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: m.status === 'active' ? '#34D399' : '#F87171' }}
                  />
                </div>
              </div>
              <p className="text-xs mb-3" style={{ color: '#8D98A9' }}>{m.track}</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: '#1A2332' }}>
                  <p className="text-base font-bold" style={{ color: '#FB923C' }}>{m.streak}d</p>
                  <p className="text-xs" style={{ color: '#4A6072' }}>Streak</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: '#1A2332' }}>
                  <p className="text-base font-bold" style={{ color: '#34D399' }}>{m.consistency}%</p>
                  <p className="text-xs" style={{ color: '#4A6072' }}>Score</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: '#1A2332' }}>
                  <p className="text-base font-bold" style={{ color: '#C5D2DF' }}>{m.tasks.done}/{m.tasks.total}</p>
                  <p className="text-xs" style={{ color: '#4A6072' }}>Tasks</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  className="flex-1 py-1.5 rounded-lg text-xs border"
                  style={{ backgroundColor: 'rgba(192,132,252,0.08)', borderColor: 'rgba(192,132,252,0.2)', color: '#C084FC' }}
                >
                  View Analytics
                </button>
                <button
                  className="flex-1 py-1.5 rounded-lg text-xs border"
                  style={{ backgroundColor: '#1A2332', borderColor: '#253347', color: '#8D98A9' }}
                >
                  Send Feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-3">
          {pendingReviews.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border p-4"
              style={{
                backgroundColor: '#0F1623',
                borderColor: r.urgent ? 'rgba(248,113,113,0.25)' : '#1E2A3B',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ backgroundColor: '#1A2332', color: '#34D399', border: '1px solid rgba(16,185,129,0.2)' }}
                >
                  {r.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>{r.member}</p>
                    {r.urgent && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: 'rgba(248,113,113,0.1)', color: '#F87171' }}
                      >
                        Overdue
                      </span>
                    )}
                    <span className="text-xs ml-auto" style={{ color: '#4A6072' }}>{r.submittedAt}</span>
                  </div>
                  <p className="text-sm" style={{ color: '#C5D2DF' }}>{r.submission}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#4A6072' }}>{r.track}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  className="flex-1 py-1.5 rounded-lg text-xs font-medium"
                  style={{ backgroundColor: '#10B981', color: '#000' }}
                >
                  Open & Review
                </button>
                <button
                  className="px-4 py-1.5 rounded-lg text-xs border"
                  style={{ borderColor: '#1E2A3B', color: '#4A6072' }}
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
