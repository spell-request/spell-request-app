import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell.tsx';
import { IntroPage, LoginPage, RegisterPage, BooksPage } from '@/pages/index.ts';
import { useAuthStore } from '@/stores/authStore.ts';

// Import global styles
import '@/styles/globals.css';
import '@/styles/crt.css';
import '@/styles/animations.css';

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Public route wrapper (redirects if already authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/books" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Intro page - accessible to all */}
        <Route path="/" element={<IntroPage />} />

        {/* Public routes (login/register) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Protected routes with AppShell layout */}
        <Route element={<AppShell />}>
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <BooksPage />
              </ProtectedRoute>
            }
          />
          {/* Placeholder routes for future pages */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <PlaceholderPage title="Profile" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books/:bookId"
            element={
              <ProtectedRoute>
                <PlaceholderPage title="Mission Hub" />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch all - redirect to intro */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// Placeholder component for future pages
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 100px)',
        padding: '2rem',
        color: '#33FF33',
        fontFamily: 'VT323, monospace',
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          textShadow: '0 0 10px #33FF33',
          marginBottom: '1rem',
        }}
      >
        {title}
      </h1>
      <p style={{ color: '#1a801a' }}>
        [ Coming Soon ]
      </p>
    </div>
  );
}

export default App;
