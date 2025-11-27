import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button.tsx';
import { Input } from '@/components/ui/Input.tsx';
import { GlowText } from '@/components/ui/GlowText.tsx';
import { TypingText } from '@/components/ui/TypingText.tsx';
import { useAuthStore } from '@/stores/authStore.ts';
import './AuthPages.css';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    clearError();

    // Validation
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }
    if (!username.trim()) {
      setFormError('Wizard name is required');
      return;
    }
    if (username.length < 3) {
      setFormError('Wizard name must be at least 3 characters');
      return;
    }
    if (!password) {
      setFormError('Password is required');
      return;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    try {
      await register(email, username, password);
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
            GRIMOIRE
          </GlowText>
        </Link>

        {/* Welcome message */}
        <div className="auth-page__message">
          <TypingText
            text="A new apprentice approaches. Speak your name to begin the initiation..."
            speed={20}
          />
        </div>

        {/* Register form */}
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
            type="text"
            label="Wizard Name"
            placeholder="arcane_coder"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            hint="This will be your identity in the realm (3+ characters)"
          />

          <Input
            type="password"
            label="Secret Phrase"
            placeholder="Create your secret phrase"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            hint="At least 6 characters"
          />

          <Input
            type="password"
            label="Confirm Secret Phrase"
            placeholder="Repeat your secret phrase"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
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
            Begin Initiation
          </Button>
        </form>

        {/* Login link */}
        <div className="auth-page__footer">
          <span className="auth-page__footer-text">
            Already initiated?
          </span>
          <Link to="/login" className="auth-page__footer-link">
            Return to the sanctum
          </Link>
        </div>
      </div>
    </div>
  );
}
