import { useState } from 'react';
import { Search, Bell, GitBranch, Flame, ChevronDown, Zap } from 'lucide-react';

export function Header() {
  const [searchVal, setSearchVal] = useState('');

  return (
    <header
      className="fixed top-0 right-0 h-16 flex items-center px-5 gap-4 border-b z-10"
      style={{
        left: '240px',
        backgroundColor: '#0D1117',
        borderColor: '#1E2A3B',
      }}
    >
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm"
          style={{ backgroundColor: '#0B0F17', borderColor: '#1E2A3B' }}
        >
          <Search size={13} style={{ color: '#4A6072' }} />
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search problems, books, trackers..."
            className="bg-transparent outline-none flex-1 text-sm placeholder:text-[#4A6072]"
            style={{ color: '#8D98A9' }}
          />
          <kbd
            className="hidden md:inline-flex px-1.5 py-0.5 text-xs rounded"
            style={{ backgroundColor: '#1E2A3B', color: '#4A6072', fontFamily: 'monospace' }}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2.5 ml-auto">
        {/* GitHub sync */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium"
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            borderColor: 'rgba(16, 185, 129, 0.2)',
            color: '#34D399',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: '#34D399', boxShadow: '0 0 4px #34D399' }}
          />
          <GitBranch size={12} />
          <span>Connected</span>
        </div>

        {/* Streak */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold"
          style={{
            backgroundColor: 'rgba(251, 146, 60, 0.07)',
            borderColor: 'rgba(251, 146, 60, 0.22)',
            color: '#FB923C',
          }}
        >
          <Flame size={13} />
          <span>24 Day Streak</span>
        </div>

        {/* XP indicator */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium"
          style={{
            backgroundColor: 'rgba(250, 204, 21, 0.06)',
            borderColor: 'rgba(250, 204, 21, 0.2)',
            color: '#FACC15',
          }}
        >
          <Zap size={12} />
          <span>4,820 XP</span>
        </div>

        {/* Notifications */}
        <button
          className="relative w-8 h-8 rounded-lg flex items-center justify-center border transition-colors"
          style={{ backgroundColor: '#0B0F17', borderColor: '#1E2A3B' }}
        >
          <Bell size={14} style={{ color: '#8D98A9' }} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: '#10B981' }}
          />
        </button>

        {/* Avatar */}
        <button
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-all"
          style={{ backgroundColor: '#0B0F17', borderColor: '#1E2A3B' }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              color: '#34D399',
              border: '1px solid rgba(16, 185, 129, 0.25)',
            }}
          >
            AK
          </div>
          <ChevronDown size={11} style={{ color: '#4A6072' }} />
        </button>
      </div>
    </header>
  );
}
