import { useState } from 'react';
import {
  Brain, Lock, Zap, AlertTriangle, Github, FolderOpen, FileText,
  Code2, RefreshCw, ToggleLeft, ToggleRight, PlayCircle, Clock,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend, ReferenceLine,
} from 'recharts';

interface Problem {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'learning' | 'locked' | 'due';
  lockDay: number;
  source: 'YouTube Solution' | 'AI Editorial' | 'LeetCode Editorial';
  tags: string[];
  topic: string;
}

const problems: Problem[] = [
  { id: 'p1', name: 'Two Sum', difficulty: 'Easy', status: 'due', lockDay: 10, source: 'AI Editorial', tags: ['Hash Map'], topic: 'Arrays' },
  { id: 'p2', name: 'Merge Intervals', difficulty: 'Medium', status: 'locked', lockDay: 4, source: 'YouTube Solution', tags: ['Sorting'], topic: 'Arrays' },
  { id: 'p3', name: 'LRU Cache', difficulty: 'Medium', status: 'locked', lockDay: 7, source: 'YouTube Solution', tags: ['Design'], topic: 'Design' },
  { id: 'p4', name: 'Binary Tree Level Order', difficulty: 'Medium', status: 'locked', lockDay: 2, source: 'AI Editorial', tags: ['BFS'], topic: 'Trees' },
  { id: 'p5', name: 'Coin Change', difficulty: 'Medium', status: 'locked', lockDay: 9, source: 'LeetCode Editorial', tags: ['DP'], topic: 'DP' },
  { id: 'p6', name: 'Word Search II', difficulty: 'Hard', status: 'locked', lockDay: 6, source: 'YouTube Solution', tags: ['Trie', 'DFS'], topic: 'Graphs' },
  { id: 'p7', name: 'Serialize and Deserialize', difficulty: 'Hard', status: 'locked', lockDay: 1, source: 'YouTube Solution', tags: ['Tree', 'BFS'], topic: 'Trees' },
  { id: 'p8', name: 'Valid Parentheses', difficulty: 'Easy', status: 'learning', lockDay: 0, source: 'AI Editorial', tags: ['Stack'], topic: 'Stack' },
  { id: 'p9', name: 'Number of Islands', difficulty: 'Medium', status: 'learning', lockDay: 0, source: 'YouTube Solution', tags: ['DFS', 'BFS'], topic: 'Graphs' },
  { id: 'p10', name: 'Trapping Rain Water', difficulty: 'Hard', status: 'due', lockDay: 10, source: 'LeetCode Editorial', tags: ['Two Pointer'], topic: 'Arrays' },
  { id: 'p11', name: 'Longest Palindrome', difficulty: 'Medium', status: 'locked', lockDay: 5, source: 'AI Editorial', tags: ['DP', 'String'], topic: 'DP' },
  { id: 'p12', name: 'Course Schedule', difficulty: 'Medium', status: 'locked', lockDay: 3, source: 'YouTube Solution', tags: ['Topological Sort'], topic: 'Graphs' },
];

// Memory retention curve data over 30 days
const retentionData = Array.from({ length: 31 }, (_, day) => ({
  day,
  without: Math.round(100 * Math.exp(-0.12 * day)),
  withSR: day === 0
    ? 100
    : day <= 2 ? Math.max(85, Math.round(100 * Math.exp(-0.12 * day)) + 20)
    : day <= 3 ? Math.max(80, Math.round(100 * Math.exp(-0.12 * day)) + 18)
    : day <= 7 ? Math.max(72, Math.round(100 * Math.exp(-0.12 * day)) + 22)
    : day <= 14 ? Math.max(68, Math.round(100 * Math.exp(-0.12 * day)) + 25)
    : Math.max(65, Math.round(100 * Math.exp(-0.12 * day)) + 28),
}));

const difficultyColor = { Easy: '#34D399', Medium: '#FACC15', Hard: '#F87171' };
const difficultyBg = { Easy: 'rgba(52,211,153,0.1)', Medium: 'rgba(250,204,21,0.1)', Hard: 'rgba(248,113,113,0.1)' };

const githubFolders = [
  { name: 'Arrays', files: ['notes.md', 'two-sum.cpp', 'merge-intervals.cpp', 'trapping-rain-water.cpp'] },
  { name: 'Trees', files: ['notes.md', 'binary-tree-level-order.cpp', 'serialize-deserialize.cpp'] },
  { name: 'Graphs', files: ['notes.md', 'number-of-islands.cpp', 'course-schedule.cpp', 'word-search-ii.cpp'] },
  { name: 'DP', files: ['notes.md', 'coin-change.cpp', 'longest-palindrome.cpp'] },
];

export function LeetCodeQueue() {
  const [autoExport, setAutoExport] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['Arrays']));
  const [activeTab, setActiveTab] = useState<'all' | 'due' | 'locked' | 'learning'>('all');

  const inLearning = problems.filter((p) => p.status === 'learning').length;
  const locked = problems.filter((p) => p.status === 'locked').length;
  const due = problems.filter((p) => p.status === 'due').length;

  const filtered = problems.filter((p) => {
    if (activeTab === 'all') return true;
    return p.status === activeTab;
  });

  function toggleFolder(name: string) {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  return (
    <div className="p-6" style={{ backgroundColor: '#0B0F17', minHeight: '100%' }}>
      {/* Page header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <Brain size={18} style={{ color: '#34D399' }} />
          <h1 className="text-lg font-semibold" style={{ color: '#F0F6FC' }}>
            LeetCode Retention Queue
          </h1>
        </div>
        <p className="text-sm" style={{ color: '#4A6072' }}>
          10-day active recall pipeline. Problems auto-inject on Day 10 for independent solving.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'In Learning Mode', value: inLearning, icon: Brain, color: '#22D3EE', bg: 'rgba(6,182,212,0.08)', borderColor: 'rgba(6,182,212,0.2)' },
          { label: 'Locked · 10-Day Hold', value: locked, icon: Lock, color: '#FACC15', bg: 'rgba(250,204,21,0.07)', borderColor: 'rgba(250,204,21,0.18)' },
          { label: 'Due Today', value: due, icon: AlertTriangle, color: '#F87171', bg: 'rgba(248,113,113,0.08)', borderColor: 'rgba(248,113,113,0.2)' },
        ].map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-4 rounded-xl border px-4 py-3"
            style={{ backgroundColor: s.bg, borderColor: s.borderColor }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${s.color}18` }}
            >
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: s.color }}>
                {s.value}
              </p>
              <p className="text-xs" style={{ color: '#8D98A9' }}>
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        {/* Left - Problem Table */}
        <div
          className="xl:col-span-3 rounded-xl border"
          style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
        >
          {/* Tabs */}
          <div className="flex items-center gap-1 px-4 pt-4 pb-3 border-b" style={{ borderColor: '#1E2A3B' }}>
            {(['all', 'due', 'locked', 'learning'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all"
                style={{
                  backgroundColor: activeTab === tab ? '#1A2332' : 'transparent',
                  color: activeTab === tab ? '#F0F6FC' : '#4A6072',
                  border: activeTab === tab ? '1px solid #253347' : '1px solid transparent',
                }}
              >
                {tab === 'all' ? `All (${problems.length})` : tab === 'due' ? `Due Today (${due})` : tab === 'locked' ? `Locked (${locked})` : `Learning (${inLearning})`}
              </button>
            ))}
          </div>

          {/* Table header */}
          <div
            className="grid gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: '#4A6072', gridTemplateColumns: '2fr 1.4fr 1fr 0.7fr' }}
          >
            <span>Problem</span>
            <span>Status</span>
            <span>Source</span>
            <span>Action</span>
          </div>

          {/* Problem rows */}
          <div className="divide-y" style={{ borderColor: '#1E2A3B' }}>
            {filtered.map((p) => (
              <div
                key={p.id}
                className="grid items-center gap-2 px-4 py-3 transition-all"
                style={{
                  gridTemplateColumns: '2fr 1.4fr 1fr 0.7fr',
                  backgroundColor: p.status === 'due' ? 'rgba(248,113,113,0.03)' : 'transparent',
                }}
              >
                {/* Name + tags */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm truncate" style={{ color: '#C5D2DF' }}>
                      {p.name}
                    </p>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded font-medium shrink-0"
                      style={{
                        backgroundColor: difficultyBg[p.difficulty],
                        color: difficultyColor[p.difficulty],
                      }}
                    >
                      {p.difficulty}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-0.5 flex-wrap">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-1 rounded"
                        style={{ backgroundColor: '#1A2332', color: '#556478' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  {p.status === 'due' && (
                    <div
                      className="flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs font-semibold animate-pulse"
                      style={{
                        backgroundColor: 'rgba(248,113,113,0.1)',
                        borderColor: 'rgba(248,113,113,0.3)',
                        color: '#F87171',
                      }}
                    >
                      <Zap size={11} />
                      <span>DUE TODAY</span>
                    </div>
                  )}
                  {p.status === 'locked' && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Lock size={10} style={{ color: '#FACC15' }} />
                        <span className="text-xs" style={{ color: '#FACC15' }}>
                          Day {p.lockDay}/10
                        </span>
                      </div>
                      <div
                        className="h-1 rounded-full overflow-hidden"
                        style={{ backgroundColor: '#1A2332', width: '80px' }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(p.lockDay / 10) * 100}%`,
                            backgroundColor: p.lockDay >= 8 ? '#F87171' : '#FACC15',
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {p.status === 'learning' && (
                    <div
                      className="flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs"
                      style={{
                        backgroundColor: 'rgba(6,182,212,0.08)',
                        borderColor: 'rgba(6,182,212,0.2)',
                        color: '#22D3EE',
                      }}
                    >
                      <Brain size={10} />
                      <span>Learning</span>
                    </div>
                  )}
                </div>

                {/* Source */}
                <div className="flex items-center gap-1 min-w-0">
                  {p.source === 'YouTube Solution' && (
                    <PlayCircle size={11} style={{ color: '#F87171', shrink: 0 }} />
                  )}
                  {p.source === 'AI Editorial' && (
                    <Zap size={11} style={{ color: '#34D399', shrink: 0 }} />
                  )}
                  {p.source === 'LeetCode Editorial' && (
                    <FileText size={11} style={{ color: '#FB923C', shrink: 0 }} />
                  )}
                  <span className="text-xs truncate" style={{ color: '#4A6072' }}>
                    {p.source.replace(' Solution', '').replace(' Editorial', '')}
                  </span>
                </div>

                {/* Action */}
                <button
                  disabled={p.status !== 'due'}
                  className="px-2 py-1 rounded-lg text-xs font-medium border transition-all"
                  style={{
                    backgroundColor: p.status === 'due' ? 'rgba(16,185,129,0.1)' : '#0B0F17',
                    borderColor: p.status === 'due' ? 'rgba(16,185,129,0.25)' : '#1E2A3B',
                    color: p.status === 'due' ? '#34D399' : '#253347',
                    cursor: p.status === 'due' ? 'pointer' : 'not-allowed',
                  }}
                >
                  {p.status === 'due' ? 'Solve' : <Lock size={10} />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="xl:col-span-2 space-y-4">
          {/* GitHub Notebook */}
          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Github size={15} style={{ color: '#F0F6FC' }} />
                <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>
                  GitHub Notebook Sync
                </p>
              </div>
              <button
                onClick={() => setAutoExport((v) => !v)}
                className="flex items-center gap-1.5 text-xs"
                style={{ color: autoExport ? '#34D399' : '#4A6072' }}
              >
                {autoExport ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                <span>Auto-Export</span>
              </button>
            </div>

            <div
              className="rounded-lg p-3 mb-3 border font-mono text-xs"
              style={{ backgroundColor: '#0B0F17', borderColor: '#1E2A3B' }}
            >
              <div className="flex items-center gap-2 mb-2" style={{ color: '#4A6072' }}>
                <Github size={11} />
                <span>developer-notebook/</span>
              </div>
              {githubFolders.map((folder) => (
                <div key={folder.name} className="ml-2">
                  <button
                    onClick={() => toggleFolder(folder.name)}
                    className="flex items-center gap-1.5 py-0.5 w-full text-left transition-colors"
                    style={{ color: '#22D3EE' }}
                  >
                    <FolderOpen size={12} />
                    <span>{folder.name}/</span>
                  </button>
                  {expandedFolders.has(folder.name) && (
                    <div className="ml-4 space-y-0.5">
                      {folder.files.map((file) => (
                        <div
                          key={file}
                          className="flex items-center gap-1.5 py-0.5"
                          style={{ color: file === 'notes.md' ? '#C084FC' : '#8D98A9' }}
                        >
                          <FileText size={11} />
                          <span>{file}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs" style={{ color: '#4A6072' }}>
                <RefreshCw size={11} />
                <span>Last synced: 2 hours ago</span>
              </div>
              <button
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border"
                style={{ backgroundColor: 'rgba(16,185,129,0.07)', borderColor: 'rgba(16,185,129,0.2)', color: '#34D399' }}
              >
                <Github size={11} />
                <span>View Repo</span>
              </button>
            </div>
          </div>

          {/* Memory Retention Curve */}
          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Brain size={14} style={{ color: '#C084FC' }} />
              <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>
                Retention Curve · 30 Days
              </p>
            </div>
            <p className="text-xs mb-3" style={{ color: '#4A6072' }}>
              Ebbinghaus vs CodeSync Spaced Repetition
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={retentionData} margin={{ top: 0, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2A3B" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#4A6072', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: 'Days', position: 'insideBottom', offset: -2, fill: '#4A6072', fontSize: 10 }}
                />
                <YAxis
                  tick={{ fill: '#4A6072', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A2332', border: '1px solid #253347', borderRadius: 8, fontSize: 11 }}
                  itemStyle={{ color: '#F0F6FC' }}
                  labelStyle={{ color: '#4A6072' }}
                  formatter={(v: number) => [`${v}%`]}
                />
                <ReferenceLine x={2} stroke="#253347" strokeDasharray="3 3" />
                <ReferenceLine x={3} stroke="#253347" strokeDasharray="3 3" />
                <ReferenceLine x={7} stroke="#253347" strokeDasharray="3 3" />
                <ReferenceLine x={14} stroke="#253347" strokeDasharray="3 3" />
                <ReferenceLine x={30} stroke="#253347" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="without"
                  stroke="#F87171"
                  strokeWidth={1.5}
                  dot={false}
                  name="No repetition"
                  strokeDasharray="4 2"
                />
                <Line
                  type="monotone"
                  dataKey="withSR"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                  name="CodeSync SR"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-0.5" style={{ backgroundColor: '#F87171', borderTop: '2px dashed #F87171' }} />
                <span className="text-xs" style={{ color: '#4A6072' }}>No repetition</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-0.5" style={{ backgroundColor: '#10B981' }} />
                <span className="text-xs" style={{ color: '#4A6072' }}>CodeSync SR</span>
              </div>
            </div>

            {/* Review schedule indicators */}
            <div className="mt-3 pt-3 border-t" style={{ borderColor: '#1E2A3B' }}>
              <p className="text-xs mb-2" style={{ color: '#4A6072' }}>
                Review Schedule
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'Day 2', color: '#22D3EE' },
                  { label: 'Day 3', color: '#34D399' },
                  { label: 'Day 7', color: '#10B981' },
                  { label: 'Day 14', color: '#059669' },
                  { label: 'Day 30', color: '#047857' },
                ].map((phase) => (
                  <div
                    key={phase.label}
                    className="flex items-center gap-1 px-2 py-0.5 rounded text-xs border"
                    style={{
                      backgroundColor: `${phase.color}10`,
                      borderColor: `${phase.color}30`,
                      color: phase.color,
                    }}
                  >
                    <Clock size={9} />
                    <span>{phase.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
