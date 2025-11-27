import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button.tsx';
import { Input } from '@/components/ui/Input.tsx';
import { GlowText } from '@/components/ui/GlowText.tsx';
import { TypingText } from '@/components/ui/TypingText.tsx';
import { useAuthStore } from '@/stores/authStore.ts';
import './AuthPages.css';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    clearError();

    // Basic validation
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }
    if (!password) {
      setFormError('Password is required');
      return;
    }

    try {
      await login(email, password);
      navigate('/books');
    } catch {
      // Error is handled by the store
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        {/* Logo */}
        <Link to="/" className="auth-page__logo">
          <GlowText as="h1" intensity="high" pulse>
            SPELL REQUEST
          </GlowText>
        </Link>

        {/* Welcome message */}
        <div className="auth-page__message">
          <TypingText
            text="Welcome back, wizard. Enter your credentials to continue your journey..."
            speed={20}
          />
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="auth-page__form">
          <Input
            type="email"
            label="Email"
            placeholder="wizard@grimoire.dev"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter your secret phrase"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          {(formError || error) && (
            <div className="auth-page__error">
              <span className="auth-page__error-icon">[!]</span>
              {formError || error}
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            glowEffect
          >
            Enter the Sanctum
          </Button>
        </form>

        {/* Register link */}
        <div className="auth-page__footer">
          <span className="auth-page__footer-text">
            New to the arcane arts?
          </span>
          <Link to="/register" className="auth-page__footer-link">
            Begin your training
          </Link>
        </div>

        {/* Demo credentials hint */}
        <div className="auth-page__hint">
          <span className="auth-page__hint-label">[ Hint ]</span>
          <span className="auth-page__hint-text">
            Use any email and password (6+ chars) to enter
          </span>
        </div>
      </div>
    </div>
  );
}
