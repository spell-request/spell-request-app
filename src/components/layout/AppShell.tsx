import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar.tsx';
import { Footer } from './Footer.tsx';
import { useAuthStore } from '@/stores/authStore.ts';
import './AppShell.css';

export function AppShell() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="app-shell">
      {/* UI layer */}
      <div className="app-shell__ui">
        {isAuthenticated && <TopBar />}

        <main
          className={`app-shell__main ${isAuthenticated ? 'app-shell__main--authenticated' : ''}`}
        >
          <Outlet />
        </main>

        {isAuthenticated && <Footer />}
      </div>

      {/* CRT overlay (CSS-only) */}
      <div className="crt-overlay" />

      {/* Scanline effect */}
      <div className="scanline" />
    </div>
  );
}
