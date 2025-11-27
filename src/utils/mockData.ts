import type { Book } from '@/types/book.ts';
import type { UserProfile, Badge } from '@/types/profile.ts';
import type { Mission } from '@/types/mission.ts';

// Mock Books Data
export const MOCK_BOOKS: Book[] = [
  {
    id: 'book-001',
    title: 'Design Patterns: The Arcane Grimoire',
    description:
      'Master the ancient patterns of software sorcery. Learn Factory, Singleton, Observer, and more through hands-on spell-fixing missions.',
    author: 'The Order of Clean Code',
    difficulty: 'intermediate',
    status: 'in_progress',
    cover_image: undefined,
    total_missions: 24,
    completed_missions: 5,
    xp_reward: 2400,
    estimated_hours: 20,
    tags: ['patterns', 'python', 'oop'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-11-01T00:00:00Z',
  },
  {
    id: 'book-002',
    title: 'Algorithms: Scrolls of Efficiency',
    description:
      'Unlock the secrets of algorithmic magic. From sorting spells to graph traversal rituals, become a master of computational efficiency.',
    author: 'The Algorithm Guild',
    difficulty: 'advanced',
    status: 'available',
    cover_image: undefined,
    total_missions: 30,
    completed_missions: 0,
    xp_reward: 3000,
    estimated_hours: 30,
    tags: ['algorithms', 'python', 'data-structures'],
    created_at: '2025-02-01T00:00:00Z',
    updated_at: '2025-11-15T00:00:00Z',
  },
  {
    id: 'book-003',
    title: 'Web Enchantments: Frontend Mastery',
    description:
      'Weave powerful web interfaces with React magic. Learn state management rituals, component incantations, and performance enchantments.',
    author: 'The Frontend Circle',
    difficulty: 'beginner',
    status: 'available',
    cover_image: undefined,
    total_missions: 18,
    completed_missions: 0,
    xp_reward: 1800,
    estimated_hours: 15,
    tags: ['react', 'typescript', 'frontend'],
    created_at: '2025-03-01T00:00:00Z',
    updated_at: '2025-11-20T00:00:00Z',
  },
  {
    id: 'book-004',
    title: 'Database Dungeons: SQL Sorcery',
    description:
      'Delve into the depths of data management. Master queries, optimize joins, and unlock the power of database magic.',
    author: 'The Data Keepers',
    difficulty: 'intermediate',
    status: 'locked',
    cover_image: undefined,
    total_missions: 20,
    completed_missions: 0,
    xp_reward: 2000,
    estimated_hours: 18,
    tags: ['sql', 'databases', 'postgresql'],
    created_at: '2025-04-01T00:00:00Z',
    updated_at: '2025-11-01T00:00:00Z',
  },
];

// Mock Missions for Design Patterns Book
export const MOCK_MISSIONS: Mission[] = [
  {
    id: 'mission-001',
    book_id: 'book-001',
    title: 'The Broken Forge',
    description:
      'The artifact creation spell is malfunctioning. Products emerge corrupted, their types jumbled. Fix the Factory Method pattern.',
    lore: 'In the depths of the Arcane Forge, the master artificer has left behind a corrupted creation spell. Items meant to be swords become shields, potions turn to smoke.',
    difficulty: 2,
    status: 'completed',
    xp_reward: 25,
    tasks_count: 3,
    order: 1,
    prerequisites: [],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-11-01T00:00:00Z',
  },
  {
    id: 'mission-002',
    book_id: 'book-001',
    title: 'The Abstract Forge',
    description:
      'Create a family of related artifacts without specifying their concrete classes. Master the Abstract Factory pattern.',
    lore: 'The Grand Artificer seeks to create themed sets of magical items. Light artifacts and Dark artifacts must be crafted with consistency.',
    difficulty: 3,
    status: 'available',
    xp_reward: 35,
    tasks_count: 4,
    order: 2,
    prerequisites: ['mission-001'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-11-01T00:00:00Z',
  },
  {
    id: 'mission-003',
    book_id: 'book-001',
    title: "The Observer's Web",
    description:
      'Create a magical notification system where multiple watchers respond to changes in a central crystal.',
    lore: 'The Seeing Stones network has fallen silent. Observers no longer receive updates from the Central Crystal. Restore the connection.',
    difficulty: 3,
    status: 'locked',
    xp_reward: 40,
    tasks_count: 5,
    order: 3,
    prerequisites: ['mission-002'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-11-01T00:00:00Z',
  },
  {
    id: 'mission-004',
    book_id: 'book-001',
    title: 'Strategy Shift',
    description:
      'The battle system needs different combat algorithms. Implement the Strategy pattern to switch fighting styles.',
    lore: 'Warriors must adapt. Sometimes aggression wins, sometimes defense. The war council needs a flexible tactical system.',
    difficulty: 2,
    status: 'locked',
    xp_reward: 30,
    tasks_count: 4,
    order: 4,
    prerequisites: ['mission-003'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-11-01T00:00:00Z',
  },
  {
    id: 'mission-005',
    book_id: 'book-001',
    title: 'Command & Conquer',
    description:
      'Encapsulate requests as objects. Create an undo system for the spell casting queue.',
    lore: 'Even the greatest wizards make mistakes. The Spell Queue needs a way to undo, redo, and queue magical commands.',
    difficulty: 4,
    status: 'locked',
    xp_reward: 50,
    tasks_count: 6,
    order: 5,
    prerequisites: ['mission-004'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-11-01T00:00:00Z',
  },
];

// Mock Badges
export const MOCK_BADGES: Badge[] = [
  {
    id: 'badge-001',
    name: 'First Spell',
    description: 'Complete your first mission',
    icon: 'scroll',
    earned_at: '2025-01-20T00:00:00Z',
    category: 'milestone',
  },
  {
    id: 'badge-002',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: 'fire',
    earned_at: '2025-02-01T00:00:00Z',
    category: 'achievement',
  },
  {
    id: 'badge-003',
    name: 'Book Worm',
    description: 'Complete your first book',
    icon: 'book',
    earned_at: '2025-03-15T00:00:00Z',
    category: 'milestone',
  },
  {
    id: 'badge-004',
    name: 'Speed Caster',
    description: 'Complete a mission in under 5 minutes',
    icon: 'lightning',
    earned_at: '2025-04-10T00:00:00Z',
    category: 'achievement',
  },
];

// Mock User Profile
export const MOCK_USER_PROFILE: UserProfile = {
  user_id: 'user-001',
  username: 'arcane_coder',
  avatar_url: undefined,
  rank: 'acolyte',
  xp: 1250,
  xp_to_next_rank: 1500,
  current_streak: 5,
  longest_streak: 12,
  total_missions_completed: 15,
  total_books_completed: 1,
  total_time_spent: 510, // minutes
  total_tests_passed: 127,
  badges: MOCK_BADGES,
  member_since: '2025-01-15T00:00:00Z',
};

// Helper function to get book by ID
export function getBookById(id: string): Book | undefined {
  return MOCK_BOOKS.find((book) => book.id === id);
}

// Helper function to get missions by book ID
export function getMissionsByBookId(bookId: string): Mission[] {
  return MOCK_MISSIONS.filter((mission) => mission.book_id === bookId);
}

// Helper function to get mission by ID
export function getMissionById(id: string): Mission | undefined {
  return MOCK_MISSIONS.find((mission) => mission.id === id);
}
