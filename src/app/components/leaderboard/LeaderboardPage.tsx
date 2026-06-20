import { useState, type ReactNode } from 'react';
import { Trophy, Flame, Star, TrendingUp, Code2, BookOpen, Database, Brain, Medal } from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  avatar: string;
  name: string;
  title: string;
  streak: number;
  consistencyScore: number;
  lcSolved: number;
  pagesRead: number;
  sqlSolved: number;
  badges: string[];
  statusEmoji: string;
  heatmap: number[];
  xp: number;
}

function generateHeatmap(): number[] {
  return Array.from({ length: 30 }, () => {
    const r = Math.random();
    if (r < 0.1) return 0;
    if (r < 0.3) return 1;
    if (r < 0.55) return 2;
    if (r < 0.8) return 3;
    return 4;
  });
}

const heatColors = ['#161E2B', '#0C4A2A', '#156B3A', '#1D9E54', '#22C55E'];

const users: LeaderboardUser[] = [
  { rank: 1, avatar: 'SJ', name: 'Siddharth J.', title: 'SWE @ Google', streak: 87, consistencyScore: 98, lcSolved: 512, pagesRead: 2840, sqlSolved: 198, badges: ['🏆 Champion', '🔥 Streak King', '📚 Scholar'], statusEmoji: '🚀', heatmap: generateHeatmap(), xp: 28400 },
  { rank: 2, avatar: 'PM', name: 'Priya M.', title: 'ML Engineer', streak: 64, consistencyScore: 95, lcSolved: 437, pagesRead: 1940, sqlSolved: 156, badges: ['⚡ Speedcoder', '📖 Avid Reader'], statusEmoji: '💡', heatmap: generateHeatmap(), xp: 22100 },
  { rank: 3, avatar: 'AK', name: 'Alex Kumar', title: 'Backend Dev', streak: 24, consistencyScore: 87, lcSolved: 312, pagesRead: 1240, sqlSolved: 89, badges: ['🎯 Consistent', '🧠 Deep Thinker'], statusEmoji: '⚡', heatmap: generateHeatmap(), xp: 14820 },
  { rank: 4, avatar: 'RK', name: 'Rahul K.', title: 'Full Stack Dev', streak: 19, consistencyScore: 82, lcSolved: 278, pagesRead: 980, sqlSolved: 72, badges: ['🌱 Growing'], statusEmoji: '💪', heatmap: generateHeatmap(), xp: 11200 },
  { rank: 5, avatar: 'AS', name: 'Anika S.', title: 'Data Analyst', streak: 31, consistencyScore: 79, lcSolved: 189, pagesRead: 1680, sqlSolved: 142, badges: ['📊 Data Queen', '📚 Scholar'], statusEmoji: '📈', heatmap: generateHeatmap(), xp: 10900 },
  { rank: 6, avatar: 'VN', name: 'Vikram N.', title: 'DevOps Eng.', streak: 15, consistencyScore: 74, lcSolved: 156, pagesRead: 720, sqlSolved: 45, badges: ['⚙️ Builder'], statusEmoji: '🛠️', heatmap: generateHeatmap(), xp: 8400 },
  { rank: 7, avatar: 'MT', name: 'Mia T.', title: 'Frontend Dev', streak: 11, consistencyScore: 71, lcSolved: 134, pagesRead: 890, sqlSolved: 38, badges: ['🎨 Designer'], statusEmoji: '✨', heatmap: generateHeatmap(), xp: 7200 },
  { rank: 8, avatar: 'KP', name: 'Karan P.', title: 'Student', streak: 8, consistencyScore: 68, lcSolved: 98, pagesRead: 540, sqlSolved: 29, badges: ['🌱 Newcomer'], statusEmoji: '📚', heatmap: generateHeatmap(), xp: 5100 },
  { rank: 9, avatar: 'LR', name: 'Lena R.', title: 'SWE @ Meta', streak: 42, consistencyScore: 91, lcSolved: 389, pagesRead: 1120, sqlSolved: 114, badges: ['🏆 Top Performer', '⚡ Fast Learner'], statusEmoji: '🌟', heatmap: generateHeatmap(), xp: 19800 },
  { rank: 10, avatar: 'JD', name: 'Jay D.', title: 'Backend Eng.', streak: 22, consistencyScore: 76, lcSolved: 201, pagesRead: 650, sqlSolved: 61, badges: ['🎯 Focused'], statusEmoji: '🎯', heatmap: generateHeatmap(), xp: 9300 },
];

const sortedUsers = [...users].sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 }));

const filterTabs = [
  { key: 'overall', label: 'Overall', icon: Trophy },
  { key: 'leetcode', label: 'LeetCode', icon: Code2 },
  { key: 'reading', label: 'Reading', icon: BookOpen },
  { key: 'sql', label: 'SQL', icon: Database },
  { key: 'systemdesign', label: 'Sys Design', icon: Brain },
];

function MiniHeatmap({ data }: { data: number[] }) {
  const weeks: number[][] = [];
  for (let i = 0; i < 5; i++) weeks.push(data.slice(i * 6, i * 6 + 6));
  return (
    <div className="flex gap-0.5">
      {weeks.map((w, wi) => (
        <div key={wi} className="flex flex-col gap-0.5">
          {w.map((v, di) => (
            <div key={di} className="w-2 h-2 rounded-[2px]" style={{ backgroundColor: heatColors[v] }} />
          ))}
        </div>
      ))}
    </div>
  );
}

const rankStyle: Record<number, { color: string; bg: string; icon?: ReactNode }> = {
  1: { color: '#FACC15', bg: 'rgba(250,204,21,0.1)', icon: <Trophy size={14} style={{ color: '#FACC15' }} /> },
  2: { color: '#9CA3AF', bg: 'rgba(156,163,175,0.1)', icon: <Medal size={14} style={{ color: '#9CA3AF' }} /> },
  3: { color: '#FB923C', bg: 'rgba(251,146,60,0.1)', icon: <Medal size={14} style={{ color: '#FB923C' }} /> },
};

export function LeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState('overall');

  const sorted = [...sortedUsers].sort((a, b) => {
    if (activeFilter === 'leetcode') return b.lcSolved - a.lcSolved;
    if (activeFilter === 'reading') return b.pagesRead - a.pagesRead;
    if (activeFilter === 'sql') return b.sqlSolved - a.sqlSolved;
    if (activeFilter === 'systemdesign') return b.consistencyScore - a.consistencyScore;
    return b.xp - a.xp;
  }).map((u, i) => ({ ...u, rank: i + 1 }));

  function getMetric(user: LeaderboardUser): { value: string | number; label: string } {
    if (activeFilter === 'leetcode') return { value: user.lcSolved, label: 'problems' };
    if (activeFilter === 'reading') return { value: user.pagesRead, label: 'pages' };
    if (activeFilter === 'sql') return { value: user.sqlSolved, label: 'queries' };
    if (activeFilter === 'systemdesign') return { value: `${user.consistencyScore}%`, label: 'score' };
    return { value: user.xp.toLocaleString(), label: 'XP' };
  }

  return (
    <div className="p-6" style={{ backgroundColor: '#0B0F17', minHeight: '100%' }}>
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={18} style={{ color: '#FACC15' }} />
          <h1 className="text-lg font-semibold" style={{ color: '#F0F6FC' }}>
            Global Leaderboard
          </h1>
        </div>
        <p className="text-sm" style={{ color: '#4A6072' }}>
          Real-time community rankings across all learning metrics
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-5 overflow-x-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap border transition-all shrink-0"
            style={{
              backgroundColor: activeFilter === tab.key ? '#1A2332' : 'transparent',
              borderColor: activeFilter === tab.key ? '#253347' : 'transparent',
              color: activeFilter === tab.key ? '#F0F6FC' : '#4A6072',
            }}
          >
            <tab.icon size={12} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {sorted.slice(0, 3).map((user) => {
          const rs = rankStyle[user.rank] || { color: '#4A6072', bg: '#1A2332' };
          return (
            <div
              key={user.rank}
              className="rounded-xl border p-4 text-center relative"
              style={{
                backgroundColor: '#0F1623',
                borderColor: user.rank === 1 ? 'rgba(250,204,21,0.3)' : '#1E2A3B',
              }}
            >
              {user.rank === 1 && (
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: '#FACC15', color: '#000' }}
                >
                  👑 #1
                </div>
              )}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2"
                style={{ backgroundColor: rs.bg, color: rs.color, border: `2px solid ${rs.color}50` }}
              >
                {user.avatar}
              </div>
              <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>
                {user.name}
              </p>
              <p className="text-xs mb-2" style={{ color: '#4A6072' }}>
                {user.title}
              </p>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Flame size={11} style={{ color: '#FB923C' }} />
                <span className="text-xs" style={{ color: '#FB923C' }}>{user.streak}d</span>
              </div>
              <p className="text-lg font-bold" style={{ color: rs.color }}>
                {getMetric(user).value}
              </p>
              <p className="text-xs" style={{ color: '#4A6072' }}>
                {getMetric(user).label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Full leaderboard table */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
      >
        {/* Table header */}
        <div
          className="grid items-center gap-3 px-4 py-3 border-b text-xs font-semibold uppercase tracking-wider"
          style={{
            borderColor: '#1E2A3B',
            color: '#4A6072',
            gridTemplateColumns: '40px 2.5fr 1.2fr 80px 80px 0.8fr',
          }}
        >
          <span>#</span>
          <span>Player</span>
          <span>30-Day Heatmap</span>
          <span>Streak</span>
          <span>Consistency</span>
          <span>Score</span>
        </div>

        {/* Rows */}
        <div className="divide-y" style={{ borderColor: '#1E2A3B' }}>
          {sorted.map((user) => {
            const rs = rankStyle[user.rank];
            const isMe = user.name === 'Alex Kumar';
            return (
              <div
                key={user.rank}
                className="grid items-center gap-3 px-4 py-3 transition-all"
                style={{
                  gridTemplateColumns: '40px 2.5fr 1.2fr 80px 80px 0.8fr',
                  backgroundColor: isMe ? 'rgba(16,185,129,0.04)' : 'transparent',
                  borderLeft: isMe ? '2px solid rgba(16,185,129,0.3)' : '2px solid transparent',
                }}
              >
                {/* Rank */}
                <div className="flex items-center justify-center">
                  {rs ? (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: rs.bg }}
                    >
                      {rs.icon}
                    </div>
                  ) : (
                    <span className="text-sm font-medium" style={{ color: '#4A6072' }}>
                      {user.rank}
                    </span>
                  )}
                </div>

                {/* Player info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      backgroundColor: rs ? rs.bg : '#1A2332',
                      color: rs ? rs.color : '#8D98A9',
                      border: `1px solid ${rs ? rs.color + '40' : '#253347'}`,
                    }}
                  >
                    {user.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium truncate" style={{ color: isMe ? '#34D399' : '#C5D2DF' }}>
                        {user.name}
                        {isMe && <span className="ml-1 text-xs" style={{ color: '#34D399' }}>(you)</span>}
                      </p>
                      <span className="text-sm">{user.statusEmoji}</span>
                    </div>
                    <p className="text-xs truncate" style={{ color: '#4A6072' }}>
                      {user.title}
                    </p>
                    <div className="flex gap-1 mt-0.5 flex-wrap">
                      {user.badges.slice(0, 2).map((b) => (
                        <span
                          key={b}
                          className="text-xs px-1.5 py-0 rounded"
                          style={{ backgroundColor: '#1A2332', color: '#8D98A9' }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Heatmap */}
                <MiniHeatmap data={user.heatmap} />

                {/* Streak */}
                <div className="flex items-center gap-1.5">
                  <Flame size={13} style={{ color: '#FB923C' }} />
                  <span className="text-sm font-medium" style={{ color: '#FB923C' }}>
                    {user.streak}d
                  </span>
                </div>

                {/* Consistency */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: '#4A6072' }}>
                      {user.consistencyScore}%
                    </span>
                  </div>
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: '#1A2332' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${user.consistencyScore}%`,
                        backgroundColor: user.consistencyScore >= 90 ? '#34D399' : user.consistencyScore >= 75 ? '#FACC15' : '#FB923C',
                      }}
                    />
                  </div>
                </div>

                {/* Score/metric */}
                <div className="text-right">
                  <p className="text-sm font-bold" style={{ color: rs ? rs.color : '#F0F6FC' }}>
                    {getMetric(user).value}
                  </p>
                  <p className="text-xs" style={{ color: '#4A6072' }}>
                    {getMetric(user).label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LinkedIn spotlight teaser */}
      <div
        className="mt-5 rounded-xl border p-4 flex items-center gap-4"
        style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'rgba(10,102,194,0.15)' }}
        >
          <Star size={18} style={{ color: '#0A66C2' }} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>
            LinkedIn Spotlight Generator
          </p>
          <p className="text-xs" style={{ color: '#4A6072' }}>
            Auto-generate shareable achievement cards: Top Performer, Streak Milestone, Monthly Progress
          </p>
        </div>
        <button
          className="px-3 py-1.5 rounded-lg text-xs font-medium border shrink-0"
          style={{ backgroundColor: 'rgba(10,102,194,0.1)', borderColor: 'rgba(10,102,194,0.25)', color: '#0A66C2' }}
        >
          Generate Card
        </button>
      </div>
    </div>
  );
}
