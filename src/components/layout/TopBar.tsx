import { Link, useNavigate } from 'react-router-dom';
import { GlowText } from '@/components/ui/GlowText.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { useAuthStore } from '@/stores/authStore.ts';
import { MOCK_USER_PROFILE } from '@/utils/mockData.ts';
import { RANK_DISPLAY_NAMES } from '@/types/profile.ts';
import './TopBar.css';

export function TopBar() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuthStore();
  const profile = MOCK_USER_PROFILE;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="top-bar">
      <div className="top-bar__left">
        <Link to="/books" className="top-bar__logo">
          <GlowText as="span" intensity="high" pulse>
            SPELL REQUEST
          </GlowText>
        </Link>
      </div>

      <div className="top-bar__center">
        <nav className="top-bar__nav">
          <Link to="/books" className="top-bar__nav-link">
            Books
          </Link>
        </nav>
      </div>

      <div className="top-bar__right">
        <div className="top-bar__stats">
          {/* XP Display */}
          <div className="top-bar__stat">
            <span className="top-bar__stat-label">XP</span>
            <span className="top-bar__stat-value">
              {profile.xp.toLocaleString()}
            </span>
          </div>

          {/* Rank Badge */}
          <div className="top-bar__rank">
            <span className="top-bar__rank-icon">*</span>
            <span className="top-bar__rank-name">
              {RANK_DISPLAY_NAMES[profile.rank].toUpperCase()}
            </span>
          </div>

          {/* Streak */}
          <div className="top-bar__streak">
            <span className="top-bar__streak-icon">~</span>
            <span className="top-bar__streak-value">
              {profile.current_streak} days
            </span>
          </div>
        </div>

        <div className="top-bar__actions">
          <Link to="/profile">
            <Button variant="ghost" size="sm">
              Profile
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
