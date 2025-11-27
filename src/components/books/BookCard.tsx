import type { Book } from '@/types/book.ts';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { GlowText } from '@/components/ui/GlowText.tsx';
import './BookCard.css';

interface BookCardProps {
  book: Book;
  onSelect?: (book: Book) => void;
}

const difficultyConfig = {
  beginner: { stars: 1, label: 'Beginner', color: 'success' as const },
  intermediate: { stars: 2, label: 'Intermediate', color: 'primary' as const },
  advanced: { stars: 3, label: 'Advanced', color: 'warning' as const },
  expert: { stars: 4, label: 'Expert', color: 'error' as const },
};

const statusConfig = {
  locked: { icon: '[X]', label: 'Locked' },
  available: { icon: '[>]', label: 'Available' },
  in_progress: { icon: '[~]', label: 'In Progress' },
  completed: { icon: '[*]', label: 'Completed' },
};

export function BookCard({ book, onSelect }: BookCardProps) {
  const difficulty = difficultyConfig[book.difficulty];
  const status = statusConfig[book.status];
  const isLocked = book.status === 'locked';
  const progressPercent = book.total_missions > 0
    ? Math.round((book.completed_missions / book.total_missions) * 100)
    : 0;

  return (
    <Card
      variant={isLocked ? 'default' : 'interactive'}
      glowEffect={!isLocked}
      className={`book-card book-card--${book.status}`}
      onClick={() => !isLocked && onSelect?.(book)}
    >
      <CardHeader>
        <div className="book-card__header">
          <span className={`book-card__status book-card__status--${book.status}`}>
            {status.icon}
          </span>
          <GlowText
            as="h3"
            intensity={isLocked ? 'low' : 'medium'}
            className="book-card__title"
          >
            {book.title}
          </GlowText>
        </div>
        <span className="book-card__author">by {book.author}</span>
      </CardHeader>

      <CardContent>
        <p className="book-card__description">{book.description}</p>

        <div className="book-card__meta">
          <div className="book-card__difficulty">
            <span className="book-card__meta-label">Difficulty:</span>
            <span className={`book-card__stars book-card__stars--${difficulty.color}`}>
              {'*'.repeat(difficulty.stars)}
              {'_'.repeat(4 - difficulty.stars)}
            </span>
          </div>

          <div className="book-card__missions">
            <span className="book-card__meta-label">Missions:</span>
            <span className="book-card__meta-value">
              {book.completed_missions}/{book.total_missions}
            </span>
          </div>

          <div className="book-card__xp">
            <span className="book-card__meta-label">XP Reward:</span>
            <span className="book-card__meta-value">+{book.xp_reward}</span>
          </div>

          <div className="book-card__time">
            <span className="book-card__meta-label">Est. Time:</span>
            <span className="book-card__meta-value">{book.estimated_hours}h</span>
          </div>
        </div>

        {/* Progress bar for in-progress books */}
        {book.status === 'in_progress' && (
          <div className="book-card__progress">
            <div className="book-card__progress-bar">
              <div
                className="book-card__progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="book-card__progress-text">{progressPercent}%</span>
          </div>
        )}

        {/* Tags */}
        <div className="book-card__tags">
          {book.tags.map((tag) => (
            <span key={tag} className="book-card__tag">
              [{tag}]
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        {isLocked ? (
          <Button variant="secondary" disabled fullWidth>
            Locked
          </Button>
        ) : book.status === 'completed' ? (
          <Button variant="secondary" fullWidth onClick={() => onSelect?.(book)}>
            Review
          </Button>
        ) : book.status === 'in_progress' ? (
          <Button variant="primary" fullWidth onClick={() => onSelect?.(book)}>
            Continue
          </Button>
        ) : (
          <Button variant="primary" fullWidth onClick={() => onSelect?.(book)}>
            Begin Study
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
