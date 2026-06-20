import { createBrowserRouter, Navigate } from 'react-router';
import { Root } from './components/layout/Root';
import { GatekeeperPage } from './components/auth/GatekeeperPage';
import { MemberDashboard } from './components/dashboard/MemberDashboard';
import { StaffDashboard } from './components/dashboard/StaffDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { LeetCodeQueue } from './components/leetcode/LeetCodeQueue';
import { BookRetention } from './components/books/BookRetention';
import { TrackerPage } from './components/trackers/TrackerPage';
import { LeaderboardPage } from './components/leaderboard/LeaderboardPage';
import { StudyPlanPage } from './components/study/StudyPlanPage';
import { DailyTasksPage } from './components/daily/DailyTasksPage';

export const router = createBrowserRouter([
  { path: '/gatekeeper', Component: GatekeeperPage },
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, element: <Navigate to="/dashboard/member" replace /> },
      { path: 'dashboard/member', Component: MemberDashboard },
      { path: 'dashboard/staff', Component: StaffDashboard },
      { path: 'dashboard/admin', Component: AdminDashboard },
      { path: 'leetcode-queue', Component: LeetCodeQueue },
      { path: 'books', Component: BookRetention },
      { path: 'trackers', Component: TrackerPage },
      { path: 'leaderboard', Component: LeaderboardPage },
      { path: 'study-plan', Component: StudyPlanPage },
      { path: 'daily-tasks', Component: DailyTasksPage },
    ],
  },
]);
