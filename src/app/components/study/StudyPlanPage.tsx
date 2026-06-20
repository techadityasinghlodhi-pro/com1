import { useState } from 'react';
import { GraduationCap, CheckCircle2, Clock, MessageSquare, Star, Lock, ArrowRight, User, BookOpen } from 'lucide-react';

interface StudyTrack {
  id: string;
  title: string;
  mentor: string;
  status: 'active' | 'completed' | 'archived';
  progress: number;
  totalModules: number;
  completedModules: number;
  startDate: string;
  tags: string[];
  color: string;
}

interface Module {
  id: string;
  trackId: string;
  title: string;
  type: 'video' | 'reading' | 'problem' | 'project';
  status: 'done' | 'in_progress' | 'locked';
  day: number;
}

interface FeedbackItem {
  id: string;
  mentor: string;
  avatar: string;
  message: string;
  timestamp: string;
  module: string;
  type: 'review' | 'approval' | 'suggestion';
}

const tracks: StudyTrack[] = [
  {
    id: 'tr1', title: 'System Design Mastery', mentor: 'Arjun Mehta', status: 'active',
    progress: 62, totalModules: 24, completedModules: 15,
    startDate: 'May 1, 2026', tags: ['System Design', 'Architecture', 'Scalability'], color: '#34D399',
  },
  {
    id: 'tr2', title: 'DSA Zero to Hero', mentor: 'Priya Shah', status: 'active',
    progress: 44, totalModules: 60, completedModules: 26,
    startDate: 'Apr 10, 2026', tags: ['LeetCode', 'Algorithms', 'Data Structures'], color: '#22D3EE',
  },
  {
    id: 'tr3', title: 'SQL & Database Design', mentor: 'Arjun Mehta', status: 'completed',
    progress: 100, totalModules: 18, completedModules: 18,
    startDate: 'Feb 1, 2026', tags: ['SQL', 'PostgreSQL', 'Database'], color: '#C084FC',
  },
];

const modules: Module[] = [
  { id: 'm1', trackId: 'tr1', title: 'CAP Theorem & Consistency Models', type: 'video', status: 'done', day: 1 },
  { id: 'm2', trackId: 'tr1', title: 'Consistent Hashing Deep Dive', type: 'reading', status: 'done', day: 3 },
  { id: 'm3', trackId: 'tr1', title: 'Design a URL Shortener', type: 'problem', status: 'done', day: 5 },
  { id: 'm4', trackId: 'tr1', title: 'Load Balancing Strategies', type: 'video', status: 'in_progress', day: 7 },
  { id: 'm5', trackId: 'tr1', title: 'Database Sharding Techniques', type: 'reading', status: 'locked', day: 9 },
  { id: 'm6', trackId: 'tr1', title: 'Design Twitter / Instagram', type: 'problem', status: 'locked', day: 12 },
  { id: 'm7', trackId: 'tr1', title: 'Caching Layers & Redis', type: 'video', status: 'locked', day: 14 },
  { id: 'm8', trackId: 'tr1', title: 'Message Queues & Kafka', type: 'reading', status: 'locked', day: 16 },
];

const feedback: FeedbackItem[] = [
  {
    id: 'f1', mentor: 'Arjun Mehta', avatar: 'AM',
    message: 'Great work on the URL shortener design! Your base62 encoding approach is exactly right. One suggestion: consider adding a cache layer (Redis) between the read path to handle 100K+ QPS. Also check your replication lag analysis — you missed mentioning async vs sync replication.',
    timestamp: '2 hours ago', module: 'Design a URL Shortener', type: 'review',
  },
  {
    id: 'f2', mentor: 'Priya Shah', avatar: 'PS',
    message: 'Milestone approved ✓ — DSA Phase 1 (Arrays & Strings) is complete. Moving you to Phase 2: Trees & Graphs. Your LeetCode retention queue will auto-update with Phase 2 problems starting tomorrow.',
    timestamp: 'Yesterday', module: 'Phase 1 Completion', type: 'approval',
  },
  {
    id: 'f3', mentor: 'Arjun Mehta', avatar: 'AM',
    message: 'For Load Balancing (Module 4): Before you watch the lecture, try to sketch your own mental model first. Write: what happens when one server goes down? How does the balancer detect it? Then watch and compare. This helps lock the concept deeper.',
    timestamp: '3 days ago', module: 'Load Balancing Strategies', type: 'suggestion',
  },
];

const moduleTypeColor: Record<string, string> = {
  video: '#F87171',
  reading: '#C084FC',
  problem: '#34D399',
  project: '#FACC15',
};

const moduleTypeLabel: Record<string, string> = {
  video: '📹 Video',
  reading: '📄 Reading',
  problem: '💻 Problem',
  project: '🛠 Project',
};

const feedbackTypeStyle: Record<string, { color: string; bg: string; label: string }> = {
  review: { color: '#22D3EE', bg: 'rgba(6,182,212,0.08)', label: 'Code Review' },
  approval: { color: '#34D399', bg: 'rgba(16,185,129,0.08)', label: '✓ Approved' },
  suggestion: { color: '#FACC15', bg: 'rgba(250,204,21,0.08)', label: '💡 Suggestion' },
};

export function StudyPlanPage() {
  const [selectedTrack, setSelectedTrack] = useState<string>('tr1');
  const activeTrack = tracks.find((t) => t.id === selectedTrack)!;
  const trackModules = modules.filter((m) => m.trackId === selectedTrack);

  return (
    <div className="p-6" style={{ backgroundColor: '#0B0F17', minHeight: '100%' }}>
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap size={18} style={{ color: '#34D399' }} />
          <h1 className="text-lg font-semibold" style={{ color: '#F0F6FC' }}>
            Study Plan & Mentor Ecosystem
          </h1>
        </div>
        <p className="text-sm" style={{ color: '#4A6072' }}>
          Active study tracks, mentor feedback loops, and immutable milestone tracking
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left: Track list + Module pipeline */}
        <div className="xl:col-span-2 space-y-4">
          {/* Track cards */}
          <div className="space-y-3">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className="w-full rounded-xl border p-4 text-left transition-all"
                style={{
                  backgroundColor: selectedTrack === track.id ? '#131C2B' : '#0F1623',
                  borderColor: selectedTrack === track.id ? track.color + '40' : '#1E2A3B',
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: track.status === 'active' ? track.color : '#4A6072' }}
                      />
                      <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>
                        {track.title}
                      </p>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded capitalize"
                        style={{
                          backgroundColor: track.status === 'active' ? `${track.color}15` : '#1A2332',
                          color: track.status === 'active' ? track.color : '#4A6072',
                        }}
                      >
                        {track.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: '#4A6072' }}>
                      <User size={10} />
                      <span>Mentor: {track.mentor}</span>
                      <span>·</span>
                      <Clock size={10} />
                      <span>Since {track.startDate}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold" style={{ color: track.color }}>
                      {track.progress}%
                    </p>
                    <p className="text-xs" style={{ color: '#4A6072' }}>
                      {track.completedModules}/{track.totalModules}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 flex-wrap mb-2">
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: '#1A2332', color: '#8D98A9' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: '#1A2332' }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${track.progress}%`, backgroundColor: track.color }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Module pipeline for selected track */}
          <div
            className="rounded-xl border"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: '#1E2A3B' }}>
              <BookOpen size={14} style={{ color: activeTrack.color }} />
              <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>
                {activeTrack.title} — Module Pipeline
              </p>
            </div>
            <div className="p-4 space-y-2">
              {trackModules.map((mod) => (
                <div
                  key={mod.id}
                  className="flex items-center gap-3 p-3 rounded-lg border transition-all"
                  style={{
                    backgroundColor: mod.status === 'in_progress' ? 'rgba(34,211,238,0.04)' : '#0B0F17',
                    borderColor: mod.status === 'in_progress' ? 'rgba(34,211,238,0.2)' : '#1E2A3B',
                    opacity: mod.status === 'locked' ? 0.5 : 1,
                  }}
                >
                  <div className="shrink-0">
                    {mod.status === 'done' && (
                      <CheckCircle2 size={16} style={{ color: '#34D399' }} />
                    )}
                    {mod.status === 'in_progress' && (
                      <div
                        className="w-4 h-4 rounded-full border-2 border-cyan-400 flex items-center justify-center"
                        style={{ borderColor: '#22D3EE' }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#22D3EE' }} />
                      </div>
                    )}
                    {mod.status === 'locked' && (
                      <Lock size={14} style={{ color: '#4A6072' }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm"
                      style={{
                        color: mod.status === 'done' ? '#4A6072' : '#C5D2DF',
                        textDecoration: mod.status === 'done' ? 'line-through' : 'none',
                      }}
                    >
                      {mod.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs" style={{ color: moduleTypeColor[mod.type] }}>
                        {moduleTypeLabel[mod.type]}
                      </span>
                      <span className="text-xs" style={{ color: '#4A6072' }}>
                        Day {mod.day}
                      </span>
                    </div>
                  </div>
                  {mod.status !== 'locked' && (
                    <button
                      className="shrink-0 px-2 py-1 rounded text-xs border"
                      style={{
                        backgroundColor: mod.status === 'in_progress' ? 'rgba(34,211,238,0.08)' : 'transparent',
                        borderColor: mod.status === 'in_progress' ? 'rgba(34,211,238,0.2)' : '#1E2A3B',
                        color: mod.status === 'in_progress' ? '#22D3EE' : '#4A6072',
                      }}
                    >
                      {mod.status === 'in_progress' ? 'Continue' : 'Review'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Mentor feedback */}
        <div className="space-y-4">
          <div
            className="rounded-xl border"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: '#1E2A3B' }}>
              <MessageSquare size={14} style={{ color: '#34D399' }} />
              <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>
                Mentor Feedback
              </p>
              <span
                className="ml-auto text-xs px-1.5 py-0.5 rounded-full"
                style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: '#34D399' }}
              >
                {feedback.length} new
              </span>
            </div>
            <div className="p-4 space-y-4">
              {feedback.map((fb) => {
                const ts = feedbackTypeStyle[fb.type];
                return (
                  <div key={fb.id} className="space-y-2">
                    <div className="flex items-start gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ backgroundColor: '#1A2332', color: '#34D399', border: '1px solid rgba(16,185,129,0.2)' }}
                      >
                        {fb.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-xs font-semibold" style={{ color: '#C5D2DF' }}>
                            {fb.mentor}
                          </p>
                          <span className="text-xs" style={{ color: '#4A6072' }}>
                            {fb.timestamp}
                          </span>
                        </div>
                        <p className="text-xs mb-1" style={{ color: '#4A6072' }}>
                          on: {fb.module}
                        </p>
                        <div
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs mb-2"
                          style={{ backgroundColor: ts.bg, color: ts.color }}
                        >
                          <span>{ts.label}</span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: '#8D98A9' }}>
                          {fb.message}
                        </p>
                      </div>
                    </div>
                    <div className="h-px" style={{ backgroundColor: '#1E2A3B' }} />
                  </div>
                );
              })}
            </div>

            {/* Reply input */}
            <div className="px-4 pb-4">
              <div
                className="flex items-center gap-2 border rounded-lg px-3 py-2"
                style={{ backgroundColor: '#0B0F17', borderColor: '#1E2A3B' }}
              >
                <input
                  placeholder="Reply to mentor..."
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#4A6072]"
                  style={{ color: '#8D98A9' }}
                />
                <button
                  className="shrink-0 px-2 py-1 rounded text-xs font-medium"
                  style={{ backgroundColor: '#10B981', color: '#000' }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Star size={14} style={{ color: '#FACC15' }} />
              <p className="text-sm font-semibold" style={{ color: '#F0F6FC' }}>
                Milestones
              </p>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Phase 1: Foundations', status: 'done', date: 'May 14' },
                { label: 'Phase 2: Intermediate', status: 'done', date: 'Jun 1' },
                { label: 'Phase 3: Advanced Design', status: 'in_progress', date: 'Jun 30' },
                { label: 'Phase 4: Mock Interviews', status: 'locked', date: 'Jul 20' },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-3">
                  <div>
                    {m.status === 'done' && <CheckCircle2 size={14} style={{ color: '#34D399' }} />}
                    {m.status === 'in_progress' && (
                      <div className="w-3.5 h-3.5 rounded-full border-2" style={{ borderColor: '#22D3EE' }} />
                    )}
                    {m.status === 'locked' && <Lock size={12} style={{ color: '#4A6072' }} />}
                  </div>
                  <p className="flex-1 text-xs" style={{ color: m.status === 'done' ? '#4A6072' : '#C5D2DF', textDecoration: m.status === 'done' ? 'line-through' : 'none' }}>
                    {m.label}
                  </p>
                  <span className="text-xs" style={{ color: '#4A6072' }}>
                    {m.date}
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
