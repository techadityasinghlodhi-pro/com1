import { useState } from 'react';
import { ListChecks, Code2, RefreshCw, BookOpen, Brain, Zap, Clock, Calendar, CheckCircle2, Lock } from 'lucide-react';

interface DailyTask {
  id: string;
  category: 'coding' | 'revision' | 'reading' | 'recall' | 'learning';
  label: string;
  detail: string;
  source: string;
  tag: string;
  priority: 'urgent' | 'normal' | 'low';
  estimatedMin: number;
}

const todayDate = 'Saturday, June 20, 2026';
const generatedAt = '04:00 AM · Auto-generated';

const tasks: DailyTask[] = [
  // Coding (10-day active recall)
  { id: 'c1', category: 'coding', label: 'Two Sum — Active Recall Test', detail: 'Must solve independently. No hints allowed.', source: 'LeetCode 10-Day Hold', tag: 'Easy', priority: 'urgent', estimatedMin: 25 },
  { id: 'c2', category: 'coding', label: 'Trapping Rain Water — Active Recall Test', detail: 'Previously learned via LeetCode Editorial. Day 10 today.', source: 'LeetCode 10-Day Hold', tag: 'Hard', priority: 'urgent', estimatedMin: 40 },
  // Revision
  { id: 'r1', category: 'revision', label: 'Quick Revise: DDIA Pages 30–45', detail: 'Replication & Consistency chapter. Phase 2 revision.', source: 'Book Retention', tag: 'Day 2', priority: 'normal', estimatedMin: 20 },
  { id: 'r2', category: 'revision', label: 'Quick Revise: CAP Theorem Notes', detail: 'System Design study track, mentor-assigned.', source: 'Study Plan', tag: 'Review', priority: 'normal', estimatedMin: 15 },
  // Reading
  { id: 'rd1', category: 'reading', label: 'Read DDIA Pages 120–145', detail: 'Chapter 5: Replication Lag — new read session.', source: 'Book Retention', tag: 'Day 1', priority: 'normal', estimatedMin: 30 },
  { id: 'rd2', category: 'reading', label: 'Read Clean Code Ch.4 Pages 68–80', detail: 'Comments & Formatting chapter.', source: 'Book Retention', tag: 'Day 1', priority: 'low', estimatedMin: 20 },
  // Recall
  { id: 'rc1', category: 'recall', label: 'Recall: System Design Lecture Ep.4 — CAP', detail: 'Day 7 retention lock. Re-watch or recall from memory.', source: 'Lecture Recall', tag: 'Day 7', priority: 'normal', estimatedMin: 35 },
  { id: 'rc2', category: 'recall', label: 'Deep Re-read: DDIA Pages 10–25', detail: 'Chapter 1 deep revision — Phase 3 cycle.', source: 'Book Retention', tag: 'Day 3', priority: 'normal', estimatedMin: 25 },
  // Learning goals
  { id: 'lg1', category: 'learning', label: 'New Topic: Sliding Window Pattern', detail: 'Study plan module. Watch resource → mark as "Learned" to start 10-day hold.', source: 'Study Plan Module', tag: 'New', priority: 'low', estimatedMin: 45 },
  { id: 'lg2', category: 'learning', label: 'Load Balancing Strategies — Module 4', detail: 'System Design track. In progress.', source: 'Study Plan', tag: 'In Progress', priority: 'low', estimatedMin: 40 },
];

const categoryConfig: Record<string, { label: string; icon: typeof Code2; color: string; bg: string; border: string }> = {
  coding: { label: "Today's Coding Tasks", icon: Code2, color: '#34D399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.18)' },
  revision: { label: "Today's Revision Tasks", icon: RefreshCw, color: '#22D3EE', bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.18)' },
  reading: { label: "Today's Reading Tasks", icon: BookOpen, color: '#C084FC', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.18)' },
  recall: { label: "Today's Recall Tasks", icon: Brain, color: '#FACC15', bg: 'rgba(250,204,21,0.08)', border: 'rgba(250,204,21,0.18)' },
  learning: { label: "Today's Learning Goals", icon: Zap, color: '#FB923C', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.18)' },
};

const priorityStyle: Record<string, string> = {
  urgent: '#F87171',
  normal: '#8D98A9',
  low: '#4A6072',
};

const categories = ['coding', 'revision', 'reading', 'recall', 'learning'] as const;

export function DailyTasksPage() {
  const [taskStates, setTaskStates] = useState<Record<string, boolean>>({});

  const completedCount = Object.values(taskStates).filter(Boolean).length;
  const totalMin = tasks.reduce((sum, t) => sum + t.estimatedMin, 0);
  const completedMin = tasks
    .filter((t) => taskStates[t.id])
    .reduce((sum, t) => sum + t.estimatedMin, 0);

  return (
    <div className="p-6" style={{ backgroundColor: '#0B0F17', minHeight: '100%' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ListChecks size={18} style={{ color: '#34D399' }} />
            <h1 className="text-lg font-semibold" style={{ color: '#F0F6FC' }}>
              Daily Task Queue
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs" style={{ color: '#4A6072' }}>
              <Calendar size={11} />
              <span>{todayDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: '#34D399' }}>
              <Zap size={11} />
              <span>{generatedAt}</span>
            </div>
          </div>
        </div>

        {/* Overall progress */}
        <div
          className="flex items-center gap-4 px-4 py-3 rounded-xl border"
          style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
        >
          <div>
            <p className="text-2xl font-bold" style={{ color: '#34D399' }}>
              {completedCount}/{tasks.length}
            </p>
            <p className="text-xs" style={{ color: '#4A6072' }}>
              Tasks done
            </p>
          </div>
          <div className="w-px h-8" style={{ backgroundColor: '#1E2A3B' }} />
          <div>
            <p className="text-base font-semibold" style={{ color: '#F0F6FC' }}>
              ~{Math.round((totalMin - completedMin) / 60)}h {(totalMin - completedMin) % 60}m
            </p>
            <p className="text-xs" style={{ color: '#4A6072' }}>
              remaining
            </p>
          </div>
          <div className="w-px h-8" style={{ backgroundColor: '#1E2A3B' }} />
          <div>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center relative"
              style={{ border: '2px solid #1E2A3B' }}
            >
              <svg className="absolute inset-0" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="#1E2A3B" strokeWidth="3" />
                <circle
                  cx="24" cy="24" r="20" fill="none"
                  stroke="#10B981" strokeWidth="3"
                  strokeDasharray={`${(completedCount / tasks.length) * 125.66} 125.66`}
                  strokeLinecap="round"
                  transform="rotate(-90 24 24)"
                />
              </svg>
              <p className="text-xs font-bold" style={{ color: '#34D399' }}>
                {Math.round((completedCount / tasks.length) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Task categories */}
      <div className="space-y-5">
        {categories.map((cat) => {
          const catTasks = tasks.filter((t) => t.category === cat);
          if (catTasks.length === 0) return null;
          const cfg = categoryConfig[cat];
          const catDone = catTasks.filter((t) => taskStates[t.id]).length;

          return (
            <div key={cat}>
              {/* Category header */}
              <div
                className="flex items-center gap-3 mb-3 px-3 py-2 rounded-lg border"
                style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
              >
                <cfg.icon size={15} style={{ color: cfg.color }} />
                <p className="text-sm font-semibold" style={{ color: cfg.color }}>
                  {cfg.label}
                </p>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full ml-auto"
                  style={{ backgroundColor: `${cfg.color}15`, color: cfg.color }}
                >
                  {catDone}/{catTasks.length}
                </span>
              </div>

              {/* Task list */}
              <div className="space-y-2">
                {catTasks.map((task) => {
                  const done = taskStates[task.id] ?? false;
                  return (
                    <div
                      key={task.id}
                      className="flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer"
                      style={{
                        backgroundColor: done ? 'rgba(16,185,129,0.03)' : '#0F1623',
                        borderColor: task.priority === 'urgent' && !done
                          ? 'rgba(248,113,113,0.3)'
                          : done ? 'rgba(16,185,129,0.12)' : '#1E2A3B',
                      }}
                      onClick={() =>
                        setTaskStates((prev) => ({ ...prev, [task.id]: !prev[task.id] }))
                      }
                    >
                      {/* Checkbox */}
                      <div
                        className="w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all"
                        style={{
                          backgroundColor: done ? '#10B981' : 'transparent',
                          borderColor: done ? '#10B981' : task.priority === 'urgent' ? '#F87171' : '#253347',
                        }}
                      >
                        {done && (
                          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                            <path d="M1 3.5L3.5 6L8 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className="text-sm font-medium"
                            style={{
                              color: done ? '#4A6072' : '#C5D2DF',
                              textDecoration: done ? 'line-through' : 'none',
                            }}
                          >
                            {task.label}
                            {task.priority === 'urgent' && !done && (
                              <span
                                className="ml-2 text-xs px-1.5 py-0.5 rounded font-semibold"
                                style={{ backgroundColor: 'rgba(248,113,113,0.12)', color: '#F87171' }}
                              >
                                URGENT
                              </span>
                            )}
                          </p>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <Clock size={10} style={{ color: '#4A6072' }} />
                            <span className="text-xs" style={{ color: '#4A6072' }}>
                              ~{task.estimatedMin}m
                            </span>
                          </div>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: '#4A6072' }}>
                          {task.detail}
                        </p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span
                            className="text-xs px-1.5 py-0.5 rounded border"
                            style={{
                              backgroundColor: `${cfg.color}10`,
                              borderColor: `${cfg.color}20`,
                              color: cfg.color,
                            }}
                          >
                            {task.source}
                          </span>
                          <span
                            className="text-xs px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: '#1A2332', color: '#8D98A9' }}
                          >
                            {task.tag}
                          </span>
                          <div className="flex items-center gap-1 ml-auto">
                            <Zap size={9} style={{ color: '#4A6072' }} />
                            <span className="text-xs" style={{ color: '#4A6072' }}>
                              Auto-injected
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div
        className="mt-6 rounded-xl border p-3 flex items-center gap-3"
        style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
      >
        <Zap size={14} style={{ color: '#34D399' }} />
        <p className="text-xs" style={{ color: '#4A6072' }}>
          All tasks are <span style={{ color: '#34D399' }}>auto-generated</span> at 04:00 AM daily based on your spaced repetition pipeline. You never manually schedule a revision date. CodeSync is your automated learning conductor.
        </p>
      </div>
    </div>
  );
}
