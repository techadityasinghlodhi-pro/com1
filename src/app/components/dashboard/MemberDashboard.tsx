import { useState, useMemo } from 'react';
import {
  Flame, Target, CheckCircle2, TrendingUp, Clock, BookOpen, Brain,
  Code2, ArrowRight, Zap, Calendar, Star, Lock, BarChart2,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

// Generate 365 days of heatmap data
function generateHeatmapData() {
  const data: number[] = [];
  for (let i = 0; i < 365; i++) {
    const rand = Math.random();
    if (rand < 0.15) data.push(0);
    else if (rand < 0.45) data.push(1);
    else if (rand < 0.70) data.push(2);
    else if (rand < 0.88) data.push(3);
    else data.push(4);
  }
  return data;
}

const heatmapData = generateHeatmapData();

const heatColors = ['#161E2B', '#0C4A2A', '#156B3A', '#1D9E54', '#22C55E'];

function HeatmapGrid() {
  const weeks = useMemo(() => {
    const w: number[][] = [];
    for (let i = 0; i < 52; i++) {
      w.push(heatmapData.slice(i * 7, i * 7 + 7));
    }
    return w;
  }, []);

  return (
    <div className="flex gap-0.5 overflow-x-auto">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-0.5">
          {week.map((val, di) => (
            <div
              key={di}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: heatColors[val] }}
              title={`Level ${val}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const weeklyTrend = [
  { day: 'Mon', score: 72 }, { day: 'Tue', score: 85 }, { day: 'Wed', score: 78 },
  { day: 'Thu', score: 91 }, { day: 'Fri', score: 88 }, { day: 'Sat', score: 76 },
  { day: 'Sun', score: 94 },
];

const todayTasks = [
  { id: 1, type: 'coding', label: 'Two Sum - Active Recall', tag: 'Easy', done: true, source: 'LeetCode Day 10' },
  { id: 2, type: 'coding', label: 'Merge Intervals - Active Recall', tag: 'Medium', done: false, source: 'LeetCode Day 10' },
  { id: 3, type: 'revision', label: 'Quick Revise: DDIA Ch.3 Pages 80-100', tag: 'Day 2', done: true, source: 'Book Retention' },
  { id: 4, type: 'reading', label: 'Read DDIA Ch.4 Pages 120-145', tag: 'Day 1', done: false, source: 'Book Retention' },
  { id: 5, type: 'recall', label: 'System Design: CAP Theorem Lecture Ep.5', tag: 'Day 7', done: false, source: 'Spaced Recall' },
  { id: 6, type: 'learning', label: 'Sliding Window Pattern - New Topic', tag: 'New', done: false, source: 'Study Plan' },
];

const metrics = [
  { label: 'Consistency Score', value: 87, color: '#10B981', sub: '+3 from last week' },
  { label: 'Accountability Score', value: 79, color: '#06B6D4', sub: '2 missed days this month' },
  { label: 'Productivity Score', value: 92, color: '#C084FC', sub: '1.8x daily baseline' },
];

const taskTypeColor: Record<string, string> = {
  coding: '#34D399',
  revision: '#22D3EE',
  reading: '#C084FC',
  recall: '#FACC15',
  learning: '#FB923C',
};

const taskTypeLabel: Record<string, string> = {
  coding: 'Coding',
  revision: 'Revision',
  reading: 'Reading',
  recall: 'Recall',
  learning: 'Learning',
};

export function MemberDashboard() {
  const [taskStates, setTaskStates] = useState<Record<number, boolean>>(
    Object.fromEntries(todayTasks.map((t) => [t.id, t.done]))
  );

  const completedCount = Object.values(taskStates).filter(Boolean).length;

  return (
    <div className="p-6 space-y-5" style={{ backgroundColor: '#0B0F17', minHeight: '100%' }}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#4A6072' }}>
            Saturday, June 20, 2026
          </p>
          <h1 className="text-xl font-semibold" style={{ color: '#F0F6FC' }}>
            Good morning, Alex 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: '#4A6072' }}>
            Day 47 of your learning journey. Keep the streak alive.
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl border"
          style={{ backgroundColor: 'rgba(251, 146, 60, 0.07)', borderColor: 'rgba(251, 146, 60, 0.2)' }}
        >
          <Flame size={18} style={{ color: '#FB923C' }} />
          <div>
            <p className="text-lg font-bold leading-none" style={{ color: '#FB923C' }}>
              24
            </p>
            <p className="text-xs" style={{ color: '#4A6072' }}>
              Day Streak
            </p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Problems Solved', value: '312', sub: '+8 this week', icon: Code2, color: '#34D399', bg: 'rgba(16,185,129,0.07)' },
          { label: 'Books Tracked', value: '4', sub: '1,240 pages read', icon: BookOpen, color: '#22D3EE', bg: 'rgba(6,182,212,0.07)' },
          { label: 'Recall Sessions', value: '89', sub: '94% retention rate', icon: Brain, color: '#C084FC', bg: 'rgba(192,132,252,0.07)' },
          { label: 'Daily Goal', value: `${completedCount}/${todayTasks.length}`, sub: 'Tasks completed', icon: Target, color: '#FACC15', bg: 'rgba(250,204,21,0.07)' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border p-4"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs" style={{ color: '#4A6072' }}>
                {s.label}
              </p>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: s.bg }}
              >
                <s.icon size={14} style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: '#F0F6FC' }}>
              {s.value}
            </p>
            <p className="text-xs mt-1" style={{ color: '#4A6072' }}>
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Today's Tasks */}
        <div
          className="lg:col-span-2 rounded-xl border"
          style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
        >
          <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b" style={{ borderColor: '#1E2A3B' }}>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} style={{ color: '#34D399' }} />
              <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>
                Today's Task Queue
              </p>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={{ backgroundColor: '#1A2332', color: '#8D98A9' }}
              >
                {completedCount}/{todayTasks.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ width: '80px', backgroundColor: '#1A2332' }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(completedCount / todayTasks.length) * 100}%`,
                    backgroundColor: '#10B981',
                  }}
                />
              </div>
              <span className="text-xs" style={{ color: '#4A6072' }}>
                {Math.round((completedCount / todayTasks.length) * 100)}%
              </span>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer"
                style={{
                  backgroundColor: taskStates[task.id] ? 'rgba(16,185,129,0.04)' : '#0B0F17',
                  borderColor: taskStates[task.id] ? 'rgba(16,185,129,0.15)' : '#1E2A3B',
                }}
                onClick={() =>
                  setTaskStates((prev) => ({ ...prev, [task.id]: !prev[task.id] }))
                }
              >
                <div
                  className="w-4 h-4 rounded flex items-center justify-center border transition-all shrink-0"
                  style={{
                    backgroundColor: taskStates[task.id] ? '#10B981' : 'transparent',
                    borderColor: taskStates[task.id] ? '#10B981' : '#253347',
                  }}
                >
                  {taskStates[task.id] && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3.5 6L8 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm truncate"
                    style={{
                      color: taskStates[task.id] ? '#4A6072' : '#C5D2DF',
                      textDecoration: taskStates[task.id] ? 'line-through' : 'none',
                    }}
                  >
                    {task.label}
                  </p>
                  <p className="text-xs" style={{ color: '#4A6072' }}>
                    {task.source}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{
                      backgroundColor: `${taskTypeColor[task.type]}15`,
                      color: taskTypeColor[task.type],
                      border: `1px solid ${taskTypeColor[task.type]}25`,
                    }}
                  >
                    {taskTypeLabel[task.type]}
                  </span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: '#1A2332', color: '#8D98A9' }}
                  >
                    {task.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score panel */}
        <div className="space-y-3">
          {/* Weekly trend chart */}
          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} style={{ color: '#34D399' }} />
              <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>
                Weekly Score
              </p>
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={weeklyTrend} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: '#4A6072', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #253347', borderRadius: 8, fontSize: 12 }}
                  itemStyle={{ color: '#34D399' }}
                  labelStyle={{ color: '#8D98A9' }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#scoreGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Score metrics */}
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border p-4"
              style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs" style={{ color: '#8D98A9' }}>
                  {m.label}
                </p>
                <p className="text-sm font-bold" style={{ color: m.color }}>
                  {m.value}%
                </p>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden mb-1.5"
                style={{ backgroundColor: '#1A2332' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${m.value}%`, backgroundColor: m.color }}
                />
              </div>
              <p className="text-xs" style={{ color: '#4A6072' }}>
                {m.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Heatmap */}
      <div
        className="rounded-xl border p-4"
        style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={14} style={{ color: '#34D399' }} />
            <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>
              Overall Commitment Heatmap
            </p>
            <span className="text-xs" style={{ color: '#4A6072' }}>
              Last 12 months
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: '#4A6072' }}>
              Less
            </span>
            {heatColors.map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
            ))}
            <span className="text-xs" style={{ color: '#4A6072' }}>
              More
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <HeatmapGrid />
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: '#1E2A3B' }}>
          <p className="text-xs" style={{ color: '#4A6072' }}>
            247 active days in 2025–2026
          </p>
          <p className="text-xs" style={{ color: '#34D399' }}>
            Top 8% of all CodeSync learners
          </p>
        </div>
      </div>
    </div>
  );
}
