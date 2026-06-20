import { NavLink } from 'react-router';
import {
  LayoutDashboard, ListChecks, Brain, BookOpen, GraduationCap,
  BarChart2, Trophy, PenLine, Settings, Code2, Users, Shield,
  ChevronRight, Flame,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/member' },
  { label: 'Daily Tasks', icon: ListChecks, path: '/daily-tasks', badge: 5 },
  { label: 'Retention Queue', icon: Brain, path: '/leetcode-queue' },
  { label: 'Book Retention', icon: BookOpen, path: '/books' },
  { label: 'Study Plan', icon: GraduationCap, path: '/study-plan' },
  { label: 'Trackers', icon: BarChart2, path: '/trackers' },
  { label: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
  { label: 'Journal', icon: PenLine, path: '/journal' },
];

const adminItems = [
  { label: 'Staff Panel', icon: Users, path: '/dashboard/staff', color: '#C084FC' },
  { label: 'Admin Panel', icon: Shield, path: '/dashboard/admin', color: '#C084FC' },
];

export function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 h-full flex flex-col z-20 border-r"
      style={{ width: '240px', backgroundColor: '#0D1117', borderColor: '#1E2A3B' }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b shrink-0" style={{ borderColor: '#1E2A3B' }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#10B981' }}
          >
            <Code2 size={15} color="#000" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-semibold text-sm tracking-tight" style={{ color: '#F0F6FC' }}>
              CodeSync
            </p>
            <p className="text-xs" style={{ color: '#4A6072' }}>
              Retention OS
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        <p
          className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider"
          style={{ color: '#4A6072' }}
        >
          Learning
        </p>
        <div className="space-y-0.5 mb-5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-100 border"
              style={({ isActive }) => ({
                backgroundColor: isActive ? 'rgba(16, 185, 129, 0.07)' : 'transparent',
                color: isActive ? '#34D399' : '#8D98A9',
                borderColor: isActive ? 'rgba(16, 185, 129, 0.18)' : 'transparent',
              })}
            >
              <item.icon size={15} strokeWidth={1.75} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: '#10B981', color: '#000' }}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <p
          className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider"
          style={{ color: '#4A6072' }}
        >
          Management
        </p>
        <div className="space-y-0.5">
          {adminItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all border"
              style={({ isActive }) => ({
                backgroundColor: isActive ? 'rgba(192, 132, 252, 0.07)' : 'transparent',
                color: isActive ? '#C084FC' : '#4A6072',
                borderColor: isActive ? 'rgba(192, 132, 252, 0.18)' : 'transparent',
              })}
            >
              <item.icon size={15} strokeWidth={1.75} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-2 py-3 border-t shrink-0" style={{ borderColor: '#1E2A3B' }}>
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm border border-transparent transition-all mb-1"
          style={{ color: '#4A6072' }}
        >
          <Settings size={15} strokeWidth={1.75} />
          <span>Settings</span>
        </NavLink>

        <div
          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer"
          style={{ backgroundColor: '#1A2332' }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              color: '#34D399',
              border: '1px solid rgba(16, 185, 129, 0.25)',
            }}
          >
            AK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs truncate" style={{ color: '#F0F6FC' }}>
              Alex Kumar
            </p>
            <p className="text-xs truncate" style={{ color: '#4A6072' }}>
              core_member
            </p>
          </div>
          <Flame size={13} style={{ color: '#FB923C' }} />
        </div>
      </div>
    </aside>
  );
}
