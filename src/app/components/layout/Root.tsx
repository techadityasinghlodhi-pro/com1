import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Root() {
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        backgroundColor: '#0B0F17',
        color: '#F0F6FC',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0" style={{ marginLeft: '240px' }}>
        <Header />
        <main
          className="flex-1 overflow-y-auto"
          style={{ paddingTop: '64px', backgroundColor: '#0B0F17' }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
