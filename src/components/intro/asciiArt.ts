/**
 * ASCII Art Assets for Retro Terminal Intro
 * Archmage Sasquatch and magical elements
 */

// Archmage Sasquatch - Wizard Avatar (simplified for terminal display)
export const SASQUATCH_AVATAR = `
       ___
      /   \\
     | o o |
     |  >  |
      \\___/
       )|(
      / | \\
     /  |  \\
    /___|___\\
`;

// Sasquatch with hat and beard
export const SASQUATCH_FULL = `
         /\\
        /  \\
       / ** \\
      /______\\
       | o o|
       |  > |
        \\__/
     .-'    '-.
    /  '----'  \\
   |  |      |  |
   |  '------'  |
    \\__________/
`;

// Sasquatch materialization frames (for animation)
export const SASQUATCH_MATERIALIZE_FRAMES = [
  // Frame 0 - scattered particles
  `
    .  *   .
      .  .
   *    .   *
     .    .
  .    *    .
`,
  // Frame 1 - gathering
  `
      ***
     *..*
      ...
     *...*
      ***
`,
  // Frame 2 - forming shape
  `
       ^
      /*\\
     | . |
      \\./
       |
`,
  // Frame 3 - clearer form
  `
      /\\
     /  \\
    | oo |
     \\../
      ||
`,
  // Frame 4 - final form
  `
      /\\
     /  \\
    | oo |
    | >> |
     \\__/
      ||
     /||\\
`,
];

// Wizard Staff
export const STAFF = `
    *
   /|\\
  /_|_\\
    |
    |
    |
    |
`;

// Staff slam animation frames
export const STAFF_SLAM_FRAMES = [
  // Frame 0 - raised
  `
        *
       /|\\
      /_|_\\
        |
        |
`,
  // Frame 1 - mid swing
  `
      *
     /|\\
    /_|_\\
      |
      |
`,
  // Frame 2 - impact
  `
    *
   /|\\
  /_|_\\
    |
----+----
`,
  // Frame 3 - shockwave
  `
    *
   /|\\
  /_|_\\
    |
-=**+**=-
`,
];

// Spellbook closed
export const SPELLBOOK_CLOSED = `
  __________
 /          \\
/____________\\
|  ========  |
|  GRIMOIRE  |
|  ========  |
|____________|
`;

// Spellbook open
export const SPELLBOOK_OPEN = `
 _____   _____
/     \\ /     \\
|     | |     |
|~~~~~| |~~~~~|
|~~~~~| |~~~~~|
|     | |     |
\\_____/ \\_____/
`;

// Spellbook page flip frames
export const SPELLBOOK_FLIP_FRAMES = [
  // Frame 0 - closed
  `
    __________
   /          \\
  /____________\\
  |  GRIMOIRE  |
  |____________|
`,
  // Frame 1 - opening
  `
   ___    ____
  /   \\__/    \\
 |    ||     |
 |~~~~||~~~~~|
 |    ||     |
  \\___/\\____/
`,
  // Frame 2 - open page 1
  `
  ____    ____
 /    \\  /    \\
| BOOK |  PAGE |
|SELECT|   1   |
|~~~~~~| ~~~~~~|
 \\____/  \\____/
`,
  // Frame 3 - page turn mid
  `
  ____  /____
 /    \\/    \\
| BOOK |PAGE |
|SELECT|  2  |
|~~~~~~|~~~~~|
 \\____/ \\___/
`,
  // Frame 4 - page 2
  `
  ____    ____
 /    \\  /    \\
| FIRST|  TEST |
|SPELL |  RUNES|
|~~~~~~| ~~~~~~|
 \\____/  \\____/
`,
];

// Rune symbols
export const RUNES = {
  aligned: '[+]',
  failed: '[X]',
  pending: '[?]',
  active: '[*]',
};

// Individual rune glyphs
export const RUNE_GLYPHS = [
  '*',
  '+',
  '#',
  '@',
  '%',
  '&',
  '^',
  '~',
];

// Progress bar styles
export const PROGRESS_BAR = {
  filled: '\u2588', // Full block
  empty: '\u2591',  // Light shade
  edge_left: '[',
  edge_right: ']',
};

// Static/noise characters for glitch effect
export const STATIC_CHARS = '\u2591\u2592\u2593\u2588\u2580\u2584\u258C\u2590';

// Boot sequence messages
export const BOOT_SEQUENCE = [
  'INITIALIZING ARCANE TERMINAL...',
  'DECRYPTING SIGILS...',
  'LOADING RUNE PATTERNS...',
  'CALIBRATING MANA FLUX...',
  'REACTIVATING RUNES ENGINE v0.1...',
  'ESTABLISHING ASTRAL LINK...',
  'ARCANE TERMINAL READY.',
];

// Sasquatch dialogue lines
export const SASQUATCH_DIALOGUE = {
  greeting: [
    'Ah... an apprentice appears.',
    '',
    'I am Archmage Sasquatch.',
    '',
    'Keeper of Algorithms.',
    'Maintainer of the Grand Grimoire.',
    'The first to merge a spell with zero conflicts.',
  ],
  terminal_ready: [
    'Your arcane terminal is nearly ready.',
    'The Grimoire awaits your command.',
  ],
  spellbook_intro: [
    'Before you lies the Grand Grimoire.',
  ],
  spellbook_broken: [
    'Its spells are broken.',
  ],
  spellbook_unstable: [
    'Its runes... unstable.',
  ],
  spellbook_repair: [
    'And you... will repair it.',
  ],
  runes_message: [
    'The incantations drift out of harmony.',
    'You must restore balance.',
  ],
  prepare_spell: [
    'Apprentice...',
    'Prepare your first Spell Request.',
  ],
  initiate: [
    'INITIATE THE RITUAL...',
  ],
};

// Terminal UI box characters
export const BOX_CHARS = {
  top_left: '+',
  top_right: '+',
  bottom_left: '+',
  bottom_right: '+',
  horizontal: '-',
  vertical: '|',
  // Alternative unicode box drawing
  tl: '\u250C',
  tr: '\u2510',
  bl: '\u2514',
  br: '\u2518',
  h: '\u2500',
  v: '\u2502',
};

// Shockwave frames for transition
export const SHOCKWAVE_FRAMES = [
  `
        *
`,
  `
       ***
`,
  `
      *****
       ***
      *****
`,
  `
     *******
      *****
       ***
      *****
     *******
`,
  `
    *********
     *******
      *****
     *******
    *********
`,
];

// Command prompt cursor
export const CURSOR = {
  block: '\u2588',
  underscore: '_',
  pipe: '|',
};

// Floating stars/particles for background
export const STARS = ['.', '*', '+', '\u00B7'];

// Helper function to generate static line
export function generateStaticLine(length: number): string {
  let line = '';
  for (let i = 0; i < length; i++) {
    line += STATIC_CHARS[Math.floor(Math.random() * STATIC_CHARS.length)];
  }
  return line;
}

// Helper function to generate progress bar
export function generateProgressBar(
  progress: number,
  width: number = 20
): string {
  const filled = Math.floor(progress * width);
  const empty = width - filled;
  return (
    PROGRESS_BAR.edge_left +
    PROGRESS_BAR.filled.repeat(filled) +
    PROGRESS_BAR.empty.repeat(empty) +
    PROGRESS_BAR.edge_right +
    ` ${Math.floor(progress * 100)}%`
  );
}
