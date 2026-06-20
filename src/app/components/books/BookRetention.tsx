import { useState, useMemo } from 'react';
import { BookOpen, ChevronDown, CheckCircle2, Clock, AlertCircle, Zap, Plus, RefreshCw } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  category: string;
  coverColor: string;
}

const books: Book[] = [
  { id: 'b1', title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', totalPages: 562, category: 'System Design', coverColor: '#1D4ED8' },
  { id: 'b2', title: 'Clean Code', author: 'Robert C. Martin', totalPages: 431, category: 'Engineering', coverColor: '#7C3AED' },
  { id: 'b3', title: 'The Algorithm Design Manual', author: 'Steven S. Skiena', totalPages: 730, category: 'Algorithms', coverColor: '#B45309' },
];

// Phase colors (4-phase green progression)
const phaseColors = {
  0: '#161E2B',        // unread
  1: '#D1FAE5',        // Phase 1: Read Once (Light Mint)
  2: '#6EE7B7',        // Phase 2: Quick Revision (Medium Sage)
  3: '#10B981',        // Phase 3: Deep Revision (Strong Grass)
  4: '#065F46',        // Phase 4: Mastered (Dark Emerald)
};

// Generate page phases for a book
function generatePagePhases(totalPages: number): number[] {
  const phases: number[] = new Array(totalPages).fill(0);
  // Simulate read progress: first 145 pages with various phases
  for (let i = 0; i < 145; i++) {
    if (i < 25) phases[i] = 4;        // mastered
    else if (i < 49) phases[i] = 3;   // deep revised
    else if (i < 79) phases[i] = 2;   // quick revised
    else if (i < 121) phases[i] = 1;  // read once
    else if (i < 145) phases[i] = 1;  // read once (just added)
  }
  return phases;
}

interface RetentionTask {
  id: string;
  type: 'quick-revise' | 'deep-reread' | 'retention-lock' | 'read';
  label: string;
  detail: string;
  source: string;
  cycle: string;
  done: boolean;
  tooltip: string;
}

const retentionTasks: RetentionTask[] = [
  {
    id: 't1', type: 'quick-revise', label: 'Quick Revise: Pages 30–45',
    detail: 'DDIA Chapter 2 · Replication', source: 'Book Retention', cycle: 'Day 2 Cycle',
    done: true, tooltip: 'Auto-scheduled from Day 2 of your read cycle on Jun 18',
  },
  {
    id: 't2', type: 'deep-reread', label: 'Deep Re-read: Pages 10–25',
    detail: 'DDIA Chapter 1 · Reliability', source: 'Book Retention', cycle: 'Day 3 Cycle',
    done: false, tooltip: 'Auto-scheduled from Day 3 of your read cycle on Jun 17',
  },
  {
    id: 't3', type: 'retention-lock', label: 'Retention Lock: System Design Lecture Ep.4',
    detail: 'CAP Theorem Deep Dive', source: 'Lecture Recall', cycle: 'Day 7 Cycle',
    done: false, tooltip: 'Auto-scheduled from Day 7 of your lecture cycle on Jun 13',
  },
  {
    id: 't4', type: 'read', label: 'New Read: Pages 120–145',
    detail: 'DDIA Chapter 5 · Replication Lag', source: 'Book Retention', cycle: 'Day 1',
    done: false, tooltip: 'Continue reading — Day 2 revision will auto-schedule tomorrow',
  },
  {
    id: 't5', type: 'retention-lock', label: 'Retention Lock: Clean Code Ch.3 Pages 40–55',
    detail: 'Functions & Clean Abstractions', source: 'Book Retention', cycle: 'Day 14 Cycle',
    done: false, tooltip: 'Auto-scheduled from Day 14 of your read cycle on Jun 6',
  },
];

const taskTypeStyle: Record<string, { color: string; bg: string; border: string; label: string }> = {
  'quick-revise': { color: '#22D3EE', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)', label: 'Quick Revise' },
  'deep-reread': { color: '#C084FC', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.2)', label: 'Deep Re-read' },
  'retention-lock': { color: '#34D399', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', label: 'Retention Lock' },
  'read': { color: '#FB923C', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.2)', label: 'New Read' },
};

export function BookRetention() {
  const [selectedBook, setSelectedBook] = useState<Book>(books[0]);
  const [taskStates, setTaskStates] = useState<Record<string, boolean>>(
    Object.fromEntries(retentionTasks.map((t) => [t.id, t.done]))
  );
  const [tooltipTask, setTooltipTask] = useState<string | null>(null);

  const pagePhases = useMemo(() => generatePagePhases(selectedBook.totalPages), [selectedBook]);

  // Group into blocks of PAGES_PER_BLOCK for the heatmap
  const PAGES_PER_BLOCK = 1;
  const COLS = 25;
  const totalBlocks = Math.min(500, selectedBook.totalPages);
  const blocks = pagePhases.slice(0, totalBlocks);

  const pagesRead = pagePhases.filter((p) => p > 0).length;
  const masteredPages = pagePhases.filter((p) => p === 4).length;

  return (
    <div className="p-6" style={{ backgroundColor: '#0B0F17', minHeight: '100%' }}>
      {/* Page header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={18} style={{ color: '#34D399' }} />
          <h1 className="text-lg font-semibold" style={{ color: '#F0F6FC' }}>
            Book & Lecture Spaced Repetition
          </h1>
        </div>
        <p className="text-sm" style={{ color: '#4A6072' }}>
          Page-granular 4-phase mastery matrix. Auto-injected revision tasks — zero manual scheduling.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left: Book selector + heatmap */}
        <div className="xl:col-span-2 space-y-4">
          {/* Active book selector card */}
          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <div className="flex items-center gap-4">
              {/* Book thumbnail */}
              <div
                className="w-16 h-20 rounded-lg flex items-end justify-center pb-2 shrink-0"
                style={{ backgroundColor: selectedBook.coverColor }}
              >
                <BookOpen size={20} color="rgba(255,255,255,0.7)" />
              </div>

              {/* Book info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider mb-0.5" style={{ color: '#4A6072' }}>
                  Active Book
                </p>
                <h2 className="text-base font-semibold truncate" style={{ color: '#F0F6FC' }}>
                  {selectedBook.title}
                </h2>
                <p className="text-sm" style={{ color: '#8D98A9' }}>
                  {selectedBook.author}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ backgroundColor: '#1A2332', color: '#8D98A9' }}
                  >
                    {selectedBook.category}
                  </span>
                  <span className="text-xs" style={{ color: '#34D399' }}>
                    Pages 120–145 read today
                  </span>
                  <span className="text-xs" style={{ color: '#4A6072' }}>
                    {pagesRead}/{selectedBook.totalPages} pages
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="flex-1 h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: '#1A2332' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(pagesRead / selectedBook.totalPages) * 100}%`,
                        background: 'linear-gradient(90deg, #065F46, #10B981)',
                      }}
                    />
                  </div>
                  <span className="text-xs" style={{ color: '#4A6072' }}>
                    {Math.round((pagesRead / selectedBook.totalPages) * 100)}%
                  </span>
                </div>
              </div>

              {/* Book switcher */}
              <div className="shrink-0">
                <div className="space-y-1">
                  {books.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBook(b)}
                      className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-xs border transition-all text-left"
                      style={{
                        backgroundColor: selectedBook.id === b.id ? '#1A2332' : 'transparent',
                        borderColor: selectedBook.id === b.id ? '#253347' : 'transparent',
                        color: selectedBook.id === b.id ? '#F0F6FC' : '#4A6072',
                      }}
                    >
                      <div className="w-3 h-4 rounded-sm shrink-0" style={{ backgroundColor: b.coverColor }} />
                      <span className="truncate max-w-[120px]">{b.title.split(' ').slice(0, 3).join(' ')}…</span>
                    </button>
                  ))}
                  <button
                    className="flex items-center gap-1.5 w-full px-2 py-1.5 rounded-lg text-xs border border-dashed"
                    style={{ borderColor: '#253347', color: '#4A6072' }}
                  >
                    <Plus size={11} />
                    <span>Add Book</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Page Matrix Heatmap */}
          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>
                  Page Mastery Matrix
                </p>
                <span className="text-xs" style={{ color: '#4A6072' }}>
                  {totalBlocks} pages · {masteredPages} mastered
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw size={12} style={{ color: '#4A6072' }} />
                <span className="text-xs" style={{ color: '#4A6072' }}>
                  Live state
                </span>
              </div>
            </div>

            {/* Grid */}
            <div
              className="grid gap-px overflow-hidden"
              style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
            >
              {blocks.map((phase, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-[1px] cursor-pointer transition-transform hover:scale-125"
                  style={{
                    backgroundColor: phaseColors[phase as keyof typeof phaseColors],
                    minWidth: 0,
                    minHeight: 0,
                  }}
                  title={`Page ${idx + 1} · Phase ${phase}`}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 pt-3 border-t flex-wrap" style={{ borderColor: '#1E2A3B' }}>
              <span className="text-xs" style={{ color: '#4A6072' }}>
                Phase Legend:
              </span>
              {[
                { phase: 0, label: 'Unread' },
                { phase: 1, label: 'Read Once' },
                { phase: 2, label: 'Quick Revision' },
                { phase: 3, label: 'Deep Revision' },
                { phase: 4, label: 'Mastered' },
              ].map((l) => (
                <div key={l.phase} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-3 rounded-sm border"
                    style={{
                      backgroundColor: phaseColors[l.phase as keyof typeof phaseColors],
                      borderColor: '#1E2A3B',
                    }}
                  />
                  <span className="text-xs" style={{ color: '#8D98A9' }}>
                    {l.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-3 mt-3 pt-3 border-t" style={{ borderColor: '#1E2A3B' }}>
              {[
                { label: 'Mastered', value: masteredPages, color: '#065F46' },
                { label: 'Deep Revised', value: pagePhases.filter(p => p === 3).length, color: '#10B981' },
                { label: 'Quick Revised', value: pagePhases.filter(p => p === 2).length, color: '#6EE7B7' },
                { label: 'Read Once', value: pagePhases.filter(p => p === 1).length, color: '#D1FAE5' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-base font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs" style={{ color: '#4A6072' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Today's Retention Queue */}
        <div className="space-y-4">
          <div
            className="rounded-xl border"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <div className="px-4 pt-4 pb-3 border-b" style={{ borderColor: '#1E2A3B' }}>
              <div className="flex items-center gap-2 mb-1">
                <Zap size={14} style={{ color: '#FACC15' }} />
                <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>
                  Today's Automated Retention Queue
                </p>
              </div>
              <p className="text-xs" style={{ color: '#4A6072' }}>
                System-generated · No manual scheduling
              </p>
            </div>

            <div className="p-4 space-y-2">
              {retentionTasks.map((task) => {
                const style = taskTypeStyle[task.type];
                const isDone = taskStates[task.id];
                return (
                  <div
                    key={task.id}
                    className="relative rounded-lg border p-3 transition-all cursor-pointer"
                    style={{
                      backgroundColor: isDone ? 'rgba(16,185,129,0.04)' : '#0B0F17',
                      borderColor: isDone ? 'rgba(16,185,129,0.15)' : '#1E2A3B',
                    }}
                    onClick={() => setTaskStates((prev) => ({ ...prev, [task.id]: !prev[task.id] }))}
                    onMouseEnter={() => setTooltipTask(task.id)}
                    onMouseLeave={() => setTooltipTask(null)}
                  >
                    {/* Tooltip */}
                    {tooltipTask === task.id && (
                      <div
                        className="absolute bottom-full left-0 mb-1.5 z-10 px-2.5 py-1.5 rounded-lg border text-xs w-56"
                        style={{ backgroundColor: '#1A2332', borderColor: '#253347', color: '#8D98A9' }}
                      >
                        <AlertCircle size={10} className="inline mr-1" style={{ color: '#34D399' }} />
                        {task.tooltip}
                      </div>
                    )}

                    <div className="flex items-start gap-2.5">
                      {/* Checkbox */}
                      <div
                        className="w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all"
                        style={{
                          backgroundColor: isDone ? '#10B981' : 'transparent',
                          borderColor: isDone ? '#10B981' : '#253347',
                        }}
                      >
                        {isDone && (
                          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                            <path d="M1 3.5L3.5 6L8 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm"
                          style={{
                            color: isDone ? '#4A6072' : '#C5D2DF',
                            textDecoration: isDone ? 'line-through' : 'none',
                          }}
                        >
                          {task.label}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: '#4A6072' }}>
                          {task.detail}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span
                            className="text-xs px-1.5 py-0.5 rounded border font-medium"
                            style={{ backgroundColor: style.bg, borderColor: style.border, color: style.color }}
                          >
                            {style.label}
                          </span>
                          <div className="flex items-center gap-1 text-xs" style={{ color: '#4A6072' }}>
                            <Clock size={9} />
                            <span>{task.cycle}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming auto-schedule */}
          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#4A6072' }}>
              Auto-Scheduled Upcoming
            </p>
            <div className="space-y-2">
              {[
                { day: 'Tomorrow', task: 'Quick Revise: Pages 120–145', color: '#22D3EE' },
                { day: 'Jun 22', task: 'Deep Re-read: Pages 120–145', color: '#C084FC' },
                { day: 'Jun 27', task: 'Retention: Pages 120–145', color: '#34D399' },
                { day: 'Jun 27', task: 'Deep Re-read: Pages 80–100', color: '#C084FC' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs shrink-0" style={{ color: '#4A6072', minWidth: '52px' }}>
                    {item.day}
                  </span>
                  <span className="text-xs truncate" style={{ color: '#8D98A9' }}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
