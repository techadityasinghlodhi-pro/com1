import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Code2, Flame, Brain, BookOpen, Trophy, ArrowRight, Github, Zap } from 'lucide-react';

const stats = [
  { label: 'Active Learners', value: '2,847' },
  { label: 'Problems Solved', value: '94,210' },
  { label: 'Books Tracked', value: '12,500+' },
  { label: 'Avg Streak', value: '18 Days' },
];

const features = [
  { icon: Brain, label: 'Spaced Repetition Engine', desc: 'Algorithmic Anki-style recall cycles' },
  { icon: BookOpen, label: 'Book Retention Matrix', desc: 'Page-granular 4-phase mastery tracking' },
  { icon: Flame, label: 'Streak & Gamification', desc: 'Consistency, accountability scoring' },
  { icon: Trophy, label: 'Global Leaderboard', desc: 'Community rankings & LinkedIn spotlights' },
];

export function GatekeeperPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleGoogleLogin() {
    setLoading(true);
    setTimeout(() => {
      navigate('/dashboard/member');
    }, 1200);
  }

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundColor: '#0B0F17',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#F0F6FC',
      }}
    >
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 border-r p-10"
        style={{ backgroundColor: '#0D1117', borderColor: '#1E2A3B' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: '#10B981' }}
          >
            <Code2 size={20} color="#000" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-semibold text-base" style={{ color: '#F0F6FC' }}>
              CodeSync
            </p>
            <p className="text-xs" style={{ color: '#4A6072' }}>
              Enterprise Learning Retention OS
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#4A6072' }}>
            Platform Modules
          </p>
          {features.map((f) => (
            <div key={f.label} className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}
              >
                <f.icon size={15} style={{ color: '#34D399' }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: '#C5D2DF' }}>
                  {f.label}
                </p>
                <p className="text-xs" style={{ color: '#4A6072' }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg p-3 border"
              style={{ backgroundColor: '#0B0F17', borderColor: '#1E2A3B' }}
            >
              <p className="text-lg font-semibold" style={{ color: '#34D399' }}>
                {s.value}
              </p>
              <p className="text-xs" style={{ color: '#4A6072' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2.5 mb-10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: '#10B981' }}
          >
            <Code2 size={18} color="#000" strokeWidth={2.5} />
          </div>
          <p className="font-semibold text-base" style={{ color: '#F0F6FC' }}>
            CodeSync
          </p>
        </div>

        <div className="w-full max-w-sm">
          {/* Heading */}
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-4 border"
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.07)',
                borderColor: 'rgba(16, 185, 129, 0.2)',
                color: '#34D399',
              }}
            >
              <Zap size={10} />
              <span>Secure Entry · /gatekeeper</span>
            </div>
            <h1
              className="text-2xl font-semibold mb-2"
              style={{ color: '#F0F6FC' }}
            >
              Welcome back
            </h1>
            <p className="text-sm" style={{ color: '#4A6072' }}>
              Sign in to your learning retention dashboard. Track, revise, and master everything.
            </p>
          </div>

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border text-sm font-medium transition-all"
            style={{
              backgroundColor: loading ? '#1A2332' : '#1A2332',
              borderColor: '#253347',
              color: '#F0F6FC',
            }}
          >
            {loading ? (
              <span
                className="w-4 h-4 rounded-full border-2 animate-spin"
                style={{ borderColor: '#253347', borderTopColor: '#34D399' }}
              />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            <span>{loading ? 'Authenticating...' : 'Continue with Google'}</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ backgroundColor: '#1E2A3B' }} />
            <span className="text-xs" style={{ color: '#4A6072' }}>
              or
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#1E2A3B' }} />
          </div>

          {/* Demo login buttons */}
          <div className="space-y-2">
            {[
              { label: 'Demo as Member', role: 'member', path: '/dashboard/member', color: '#34D399' },
              { label: 'Demo as Staff', role: 'core_member', path: '/dashboard/staff', color: '#C084FC' },
              { label: 'Demo as Admin', role: 'super_admin', path: '/dashboard/admin', color: '#22D3EE' },
            ].map((demo) => (
              <button
                key={demo.role}
                onClick={() => navigate(demo.path)}
                className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl border text-sm transition-all"
                style={{ backgroundColor: '#0F1623', borderColor: '#1E2A3B', color: '#8D98A9' }}
              >
                <span>{demo.label}</span>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-mono"
                    style={{ backgroundColor: '#1A2332', color: demo.color }}
                  >
                    {demo.role}
                  </span>
                  <ArrowRight size={13} />
                </div>
              </button>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-xs text-center mt-6" style={{ color: '#4A6072' }}>
            By signing in you agree to our{' '}
            <span className="underline cursor-pointer" style={{ color: '#34D399' }}>
              Terms
            </span>{' '}
            and{' '}
            <span className="underline cursor-pointer" style={{ color: '#34D399' }}>
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
