import { useState } from 'react';
import {
  BarChart2, Plus, Code2, BookOpen, Brain, Dumbbell, PenLine,
  Heart, Globe, Database, Target, TrendingUp, Calendar, Flame,
} from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Tracker {
  id: string;
  name: string;
  unit: string;
  cadence: 'Daily' | 'Weekly' | 'Monthly';
  goal: number;
  current: number;
  streak: number;
  icon: typeof Code2;
  color: string;
  bg: string;
  weeklyData: { day: string; value: number }[];
  heatmap: number[];
}

function generateWeekly(goal: number): { day: string; value: number }[] {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => ({
    day,
    value: Math.round(goal * (0.5 + Math.random() * 0.9)),
  }));
}

function generateHeatmap(): number[] {
  return Array.from({ length: 56 }, () => {
    const r = Math.random();
    if (r < 0.15) return 0;
    if (r < 0.4) return 1;
    if (r < 0.65) return 2;
    if (r < 0.85) return 3;
    return 4;
  });
}

const trackers: Tracker[] = [
  { id: 't1', name: 'LeetCode', unit: 'Problems', cadence: 'Daily', goal: 3, current: 2, streak: 24, icon: Code2, color: '#34D399', bg: 'rgba(52,211,153,0.1)', weeklyData: generateWeekly(3), heatmap: generateHeatmap() },
  { id: 't2', name: 'SQL Practice', unit: 'Queries', cadence: 'Daily', goal: 5, current: 5, streak: 12, icon: Database, color: '#22D3EE', bg: 'rgba(34,211,238,0.1)', weeklyData: generateWeekly(5), heatmap: generateHeatmap() },
  { id: 't3', name: 'Reading', unit: 'Pages', cadence: 'Daily', goal: 30, current: 25, streak: 18, icon: BookOpen, color: '#C084FC', bg: 'rgba(192,132,252,0.1)', weeklyData: generateWeekly(30), heatmap: generateHeatmap() },
  { id: 't4', name: 'Gym', unit: 'Minutes', cadence: 'Daily', goal: 60, current: 0, streak: 7, icon: Dumbbell, color: '#FB923C', bg: 'rgba(251,146,60,0.1)', weeklyData: generateWeekly(60), heatmap: generateHeatmap() },
  { id: 't5', name: 'Writing', unit: 'Minutes', cadence: 'Daily', goal: 20, current: 20, streak: 31, icon: PenLine, color: '#FACC15', bg: 'rgba(250,204,21,0.1)', weeklyData: generateWeekly(20), heatmap: generateHeatmap() },
  { id: 't6', name: 'Meditation', unit: 'Minutes', cadence: 'Daily', goal: 15, current: 15, streak: 14, icon: Heart, color: '#F87171', bg: 'rgba(248,113,113,0.1)', weeklyData: generateWeekly(15), heatmap: generateHeatmap() },
  { id: 't7', name: 'Web Dev', unit: 'Hours', cadence: 'Daily', goal: 2, current: 1, streak: 9, icon: Globe, color: '#818CF8', bg: 'rgba(129,140,248,0.1)', weeklyData: generateWeekly(2), heatmap: generateHeatmap() },
  { id: 't8', name: 'System Design', unit: 'Problems', cadence: 'Weekly', goal: 3, current: 1, streak: 5, icon: Brain, color: '#34D399', bg: 'rgba(16,185,129,0.1)', weeklyData: generateWeekly(3), heatmap: generateHeatmap() },
];

const heatColors = ['#161E2B', '#0C4A2A', '#156B3A', '#1D9E54', '#22C55E'];

function MiniHeatmap({ data }: { data: number[] }) {
  const weeks = [];
  for (let i = 0; i < 8; i++) {
    weeks.push(data.slice(i * 7, i * 7 + 7));
  }
  return (
    <div className="flex gap-0.5">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-0.5">
          {week.map((val, di) => (
            <div
              key={di}
              className="w-2.5 h-2.5 rounded-[2px]"
              style={{ backgroundColor: heatColors[val] }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function TrackerPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedTracker, setExpandedTracker] = useState<string | null>(null);

  return (
    <div className="p-6" style={{ backgroundColor: '#0B0F17', minHeight: '100%' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 size={18} style={{ color: '#34D399' }} />
            <h1 className="text-lg font-semibold" style={{ color: '#F0F6FC' }}>
              Universal Tracker Engine
            </h1>
          </div>
          <p className="text-sm" style={{ color: '#4A6072' }}>
            Unlimited tracking channels · Daily, weekly & monthly cadences
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium"
          style={{ backgroundColor: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.2)', color: '#34D399' }}
        >
          <Plus size={15} />
          <span>New Tracker</span>
        </button>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Active Trackers', value: trackers.length, icon: Target, color: '#34D399' },
          { label: 'Completed Today', value: trackers.filter(t => t.current >= t.goal).length, icon: TrendingUp, color: '#22D3EE' },
          { label: 'Longest Streak', value: '31d', icon: Flame, color: '#FB923C' },
          { label: 'This Week', value: `${trackers.length * 6}/56`, icon: Calendar, color: '#C084FC' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border p-3"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs" style={{ color: '#4A6072' }}>{s.label}</p>
              <s.icon size={13} style={{ color: s.color }} />
            </div>
            <p className="text-xl font-bold" style={{ color: '#F0F6FC' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tracker Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {trackers.map((tracker) => {
          const pct = Math.min(100, Math.round((tracker.current / tracker.goal) * 100));
          const completed = tracker.current >= tracker.goal;
          const expanded = expandedTracker === tracker.id;

          return (
            <div
              key={tracker.id}
              className="rounded-xl border transition-all"
              style={{ backgroundColor: '#0F1623', borderColor: completed ? 'rgba(16,185,129,0.2)' : '#1E2A3B' }}
            >
              {/* Card header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: tracker.bg }}
                    >
                      <tracker.icon size={16} style={{ color: tracker.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>
                        {tracker.name}
                      </p>
                      <p className="text-xs" style={{ color: '#4A6072' }}>
                        {tracker.cadence} · {tracker.unit}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {completed && (
                      <div
                        className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs"
                        style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: '#34D399' }}
                      >
                        <span>✓</span>
                        <span>Done</span>
                      </div>
                    )}
                    <div
                      className="flex items-center gap-1 text-xs"
                      style={{ color: '#FB923C' }}
                    >
                      <Flame size={11} />
                      <span>{tracker.streak}d</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs" style={{ color: '#4A6072' }}>
                      {tracker.current}/{tracker.goal} {tracker.unit}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: tracker.color }}>
                      {pct}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: '#1A2332' }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: completed ? '#10B981' : tracker.color,
                      }}
                    />
                  </div>
                </div>

                {/* Mini heatmap */}
                <MiniHeatmap data={tracker.heatmap} />
              </div>

              {/* Expand button */}
              <button
                className="w-full flex items-center justify-between px-4 py-2 border-t text-xs transition-all"
                style={{ borderColor: '#1E2A3B', color: '#4A6072' }}
                onClick={() => setExpandedTracker(expanded ? null : tracker.id)}
              >
                <span>Weekly Breakdown</span>
                <span style={{ transform: expanded ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▾</span>
              </button>

              {/* Expanded chart */}
              {expanded && (
                <div className="px-4 pb-4">
                  <ResponsiveContainer width="100%" height={80}>
                    <BarChart data={tracker.weeklyData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                      <XAxis dataKey="day" tick={{ fill: '#4A6072', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #253347', borderRadius: 8, fontSize: 11 }}
                        itemStyle={{ color: tracker.color }}
                        labelStyle={{ color: '#8D98A9' }}
                      />
                      <Bar
                        dataKey="value"
                        fill={tracker.color}
                        radius={[3, 3, 0, 0]}
                        opacity={0.8}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          );
        })}

        {/* Add tracker placeholder */}
        <button
          onClick={() => setShowAddModal(true)}
          className="rounded-xl border-2 border-dashed p-8 flex flex-col items-center justify-center gap-2 transition-all"
          style={{ borderColor: '#1E2A3B', minHeight: '180px' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: '#1A2332' }}
          >
            <Plus size={18} style={{ color: '#4A6072' }} />
          </div>
          <p className="text-sm" style={{ color: '#4A6072' }}>
            Add Custom Tracker
          </p>
          <p className="text-xs" style={{ color: '#253347' }}>
            Any metric, any cadence
          </p>
        </button>
      </div>

      {/* Add tracker modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="rounded-2xl border p-6 w-full max-w-md"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold mb-4" style={{ color: '#F0F6FC' }}>
              New Tracker
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Tracker Name', placeholder: 'e.g., Deep Work Hours' },
                { label: 'Unit', placeholder: 'e.g., Hours, Pages, Problems' },
                { label: 'Daily Goal', placeholder: 'e.g., 2' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-medium mb-1 block" style={{ color: '#8D98A9' }}>
                    {f.label}
                  </label>
                  <input
                    placeholder={f.placeholder}
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                    style={{ backgroundColor: '#0B0F17', borderColor: '#1E2A3B', color: '#F0F6FC' }}
                  />
                </div>
              ))}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 rounded-lg border text-sm"
                  style={{ borderColor: '#1E2A3B', color: '#4A6072' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: '#10B981', color: '#000' }}
                >
                  Create Tracker
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
