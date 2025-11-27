import { useNavigate } from 'react-router-dom';
import { GlowText } from '@/components/ui/GlowText.tsx';
import { TypingText } from '@/components/ui/TypingText.tsx';
import { BookCard } from '@/components/books/BookCard.tsx';
import { MOCK_BOOKS, MOCK_USER_PROFILE } from '@/utils/mockData.ts';
import type { Book } from '@/types/book.ts';
import './BooksPage.css';

export function BooksPage() {
  const navigate = useNavigate();
  const profile = MOCK_USER_PROFILE;

  const handleBookSelect = (book: Book) => {
    // Navigate to the book's mission hub
    navigate(`/books/${book.id}`);
  };

  // Calculate overall progress
  const totalBooks = MOCK_BOOKS.length;
  const completedBooks = MOCK_BOOKS.filter(b => b.status === 'completed').length;
  const inProgressBooks = MOCK_BOOKS.filter(b => b.status === 'in_progress').length;

  return (
    <div className="books-page">
      {/* Header section */}
      <header className="books-page__header">
        <div className="books-page__title-section">
          <GlowText as="h1" intensity="high">
            Library of Arcane Knowledge
          </GlowText>
          <div className="books-page__subtitle">
            <TypingText
              text={`Welcome, ${profile.username}. Choose your next tome of wisdom...`}
              speed={25}
            />
          </div>
        </div>

        <div className="books-page__stats">
          <div className="books-page__stat">
            <span className="books-page__stat-value">{totalBooks}</span>
            <span className="books-page__stat-label">Total Books</span>
          </div>
          <div className="books-page__stat">
            <span className="books-page__stat-value">{inProgressBooks}</span>
            <span className="books-page__stat-label">In Progress</span>
          </div>
          <div className="books-page__stat">
            <span className="books-page__stat-value">{completedBooks}</span>
            <span className="books-page__stat-label">Completed</span>
          </div>
        </div>
      </header>

      {/* Books grid */}
      <section className="books-page__grid">
        {MOCK_BOOKS.map((book, index) => (
          <div
            key={book.id}
            className="books-page__card-wrapper"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <BookCard book={book} onSelect={handleBookSelect} />
          </div>
        ))}
      </section>

      {/* Legend */}
      <footer className="books-page__legend">
        <span className="books-page__legend-title">[ Legend ]</span>
        <div className="books-page__legend-items">
          <span className="books-page__legend-item">
            <span className="books-page__legend-icon books-page__legend-icon--available">{'[>]'}</span>
            Available
          </span>
          <span className="books-page__legend-item">
            <span className="books-page__legend-icon books-page__legend-icon--progress">[~]</span>
            In Progress
          </span>
          <span className="books-page__legend-item">
            <span className="books-page__legend-icon books-page__legend-icon--completed">[*]</span>
            Completed
          </span>
          <span className="books-page__legend-item">
            <span className="books-page__legend-icon books-page__legend-icon--locked">[X]</span>
            Locked
          </span>
        </div>
      </footer>
    </div>
  );
}
