/**
 * RetroIntroScene Component
 * Main orchestrator for the RPG-style intro sequence
 *
 * BEAT 1: Terminal boot sequence with system checks
 * BEAT 2: Archmage Sasquatch introduction
 * BEAT 3: Apprentice profile initialization
 * BEAT 4: Grimoire system loading
 * BEAT 5: Rune calibration ritual (pass/fail checks)
 * BEAT 6: Final preparation and transition
 */

import { useState, useCallback, useEffect } from 'react';
import { CRTScreen } from './CRTScreen';
import { ASCIIText, StaticNoise } from './ASCIIText';
import { TerminalBox, ProgressBar, CommandLine } from './TerminalBox';
import { WizardPortrait, WizardDialogue } from './WizardPortrait';
import {
  RUNE_GLYPHS,
  generateStaticLine,
} from './asciiArt';
import './RetroIntroScene.css';

type Beat = 1 | 2 | 3 | 4 | 5 | 6 | 7; // 7 = complete/transition

interface RetroIntroSceneProps {
  /** Callback when intro completes and user should transition */
  onComplete?: () => void;
  /** Skip intro animation */
  skip?: boolean;
}

// Timing constants (in ms) - adjusted for readability
const TIMING = {
  bootMessageDelay: 800,      // Time between boot messages
  bootMessageType: 50,        // Typing speed for boot messages
  dialogueSpeed: 55,          // Typing speed for dialogue
  dialoguePause: 2000,        // Pause after each dialogue line
  systemCheckDelay: 1200,     // Time for each system check
  runeCheckDelay: 1500,       // Time between rune checks
  transitionDelay: 2500,      // Final transition delay
  staticBurstDuration: 1200,  // Initial static effect
};

// RPG-style boot messages
const BOOT_MESSAGES = [
  { text: 'ARCANE TERMINAL v3.14.159', status: 'info' },
  { text: 'Initializing mana conduits...', status: 'loading' },
  { text: 'Mana conduits [OK]', status: 'success' },
  { text: 'Loading sigil decoder...', status: 'loading' },
  { text: 'Sigil decoder [OK]', status: 'success' },
  { text: 'Establishing astral link...', status: 'loading' },
  { text: 'Astral link [OK]', status: 'success' },
  { text: 'Decrypting ancient protocols...', status: 'loading' },
  { text: 'Protocols decrypted [OK]', status: 'success' },
  { text: '', status: 'blank' },
  { text: 'SYSTEM READY', status: 'success' },
];

// Sasquatch dialogue - slower paced
const SASQUATCH_INTRO = [
  'Ah... the terminal stirs.',
  '',
  'An apprentice approaches.',
  '',
  'I am Archmage Sasquatch.',
  'Keeper of Algorithms.',
  'Maintainer of the Grand Grimoire.',
  '',
  'The first to merge a spell with zero conflicts.',
];

// System checks for profile
const SYSTEM_CHECKS = [
  { name: 'APPRENTICE_BINDING', display: 'Apprentice Binding Protocol' },
  { name: 'GRIMOIRE_LINK', display: 'Grimoire Link Interface' },
  { name: 'SPELL_COMPILER', display: 'Spell Compilation Engine' },
  { name: 'RUNE_VALIDATOR', display: 'Rune Validation System' },
  { name: 'MANA_FLOW', display: 'Mana Flow Controller' },
];

// Rune calibration items
const RUNE_CALIBRATION = [
  { name: 'SIGIL_ALPHA', display: 'Sigil Alpha' },
  { name: 'SIGIL_BETA', display: 'Sigil Beta' },
  { name: 'SIGIL_GAMMA', display: 'Sigil Gamma' },
  { name: 'SIGIL_DELTA', display: 'Sigil Delta' },
  { name: 'SIGIL_EPSILON', display: 'Sigil Epsilon' },
  { name: 'SIGIL_ZETA', display: 'Sigil Zeta' },
];

export function RetroIntroScene({ onComplete, skip = false }: RetroIntroSceneProps) {
  const [currentBeat, setCurrentBeat] = useState<Beat>(skip ? 7 : 1);
  const [beatStep, setBeatStep] = useState(0);
  const [staticIntensity, setStaticIntensity] = useState(0.08);
  const [glitchChance, setGlitchChance] = useState(0.01);

  // Handle skip
  useEffect(() => {
    if (skip) {
      setCurrentBeat(7);
      onComplete?.();
    }
  }, [skip, onComplete]);

  // Advance to next beat
  const advanceBeat = useCallback(() => {
    setCurrentBeat((prev) => {
      const next = (prev + 1) as Beat;
      setBeatStep(0);
      return next;
    });
  }, []);

  // Advance step within current beat
  const advanceStep = useCallback(() => {
    setBeatStep((prev) => prev + 1);
  }, []);

  // Handle screen power on
  const handlePowerOn = useCallback(() => {
    setStaticIntensity(0.03);
  }, []);

  // Handle final transition
  const handleTransition = useCallback(() => {
    setGlitchChance(0.15);
    setStaticIntensity(0.3);
    setTimeout(() => {
      onComplete?.();
    }, TIMING.transitionDelay);
  }, [onComplete]);

  return (
    <div className="retro-intro">
      <CRTScreen
        powered={true}
        onPowerOn={handlePowerOn}
        staticIntensity={staticIntensity}
        glitchChance={glitchChance}
        glowIntensity="high"
        scanlines={true}
        flicker={true}
        curvature={true}
      >
        <div className="retro-intro__container">
          {/* BEAT 1: Terminal Boot Sequence */}
          {currentBeat === 1 && (
            <Beat1BootSequence
              onComplete={advanceBeat}
              onStepComplete={advanceStep}
              step={beatStep}
            />
          )}

          {/* BEAT 2: Sasquatch Introduction */}
          {currentBeat === 2 && (
            <Beat2SasquatchIntro
              onComplete={advanceBeat}
              onStepComplete={advanceStep}
              step={beatStep}
            />
          )}

          {/* BEAT 3: Profile Initialization */}
          {currentBeat === 3 && (
            <Beat3ProfileInit
              onComplete={advanceBeat}
              onStepComplete={advanceStep}
              step={beatStep}
            />
          )}

          {/* BEAT 4: Grimoire System Loading */}
          {currentBeat === 4 && (
            <Beat4GrimoireLoad
              onComplete={advanceBeat}
              onStepComplete={advanceStep}
              step={beatStep}
            />
          )}

          {/* BEAT 5: Rune Calibration Ritual */}
          {currentBeat === 5 && (
            <Beat5RuneCalibration
              onComplete={advanceBeat}
              onStepComplete={advanceStep}
              step={beatStep}
            />
          )}

          {/* BEAT 6: Final Preparation */}
          {currentBeat === 6 && (
            <Beat6FinalPrep
              onComplete={handleTransition}
              onStepComplete={advanceStep}
              step={beatStep}
            />
          )}

          {/* Beat 7: Transition complete */}
          {currentBeat === 7 && (
            <div className="retro-intro__complete">
              <ASCIIText
                text=">>> ENTERING THE GRIMOIRE..."
                speed={80}
                instant={skip}
              />
            </div>
          )}

          {/* Floating background elements */}
          <FloatingRunes visible={currentBeat >= 3} />
        </div>
      </CRTScreen>
    </div>
  );
}

// ============================================
// BEAT 1: Terminal Boot Sequence
// ============================================

interface BeatProps {
  onComplete: () => void;
  onStepComplete: () => void;
  step: number;
}

function Beat1BootSequence({ onComplete, onStepComplete, step }: BeatProps) {
  const [, setStaticLines] = useState<string[]>([]);
  const [bootMessages, setBootMessages] = useState<{text: string; status: string}[]>([]);

  // Initial static burst
  useEffect(() => {
    if (step === 0) {
      const lines = Array.from({ length: 5 }, () => generateStaticLine(50));
      setStaticLines(lines);
      setTimeout(onStepComplete, TIMING.staticBurstDuration);
    }
  }, [step, onStepComplete]);

  // Boot sequence messages
  useEffect(() => {
    if (step < 1) return;

    const messageIndex = step - 1;
    if (messageIndex < BOOT_MESSAGES.length) {
      const msg = BOOT_MESSAGES[messageIndex];
      const timer = setTimeout(() => {
        setBootMessages((prev) => [...prev, msg]);
        // Vary timing based on message type
        const delay = msg.status === 'blank' ? 400 : TIMING.bootMessageDelay;
        setTimeout(onStepComplete, delay);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setTimeout(onComplete, 1000);
    }
  }, [step, onStepComplete, onComplete]);

  return (
    <div className="beat-boot">
      {/* Initial static */}
      {step === 0 && (
        <div className="beat-boot__static">
          <StaticNoise width={60} height={8} interval={40} />
        </div>
      )}

      {/* Boot messages */}
      <div className="beat-boot__messages">
        {bootMessages.map((msg, i) => (
          <div key={i} className={`beat-boot__message beat-boot__message--${msg.status}`}>
            {msg.text && (
              <ASCIIText
                text={msg.text}
                speed={TIMING.bootMessageType}
                showCursor={i === bootMessages.length - 1}
              />
            )}
            {msg.status === 'blank' && <br />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// BEAT 2: Archmage Sasquatch Introduction
// ============================================

function Beat2SasquatchIntro({ onComplete, onStepComplete, step }: BeatProps) {
  const [showPortrait, setShowPortrait] = useState(false);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(-1);
  const [portraitReady, setPortraitReady] = useState(false);

  // Start materialization
  useEffect(() => {
    if (step === 0) {
      setShowPortrait(true);
    }
  }, [step]);

  // Handle portrait materialization complete
  const handleMaterialize = useCallback(() => {
    setPortraitReady(true);
    // Longer pause after portrait appears before dialogue starts
    setTimeout(onStepComplete, 2000);
  }, [onStepComplete]);

  // Dialogue sequence
  useEffect(() => {
    if (step < 1 || !portraitReady) return;

    const dialogueIndex = step - 1;

    if (dialogueIndex < SASQUATCH_INTRO.length) {
      if (SASQUATCH_INTRO[dialogueIndex] === '') {
        // Empty line = pause (longer for dramatic effect)
        setTimeout(onStepComplete, 1200);
      } else {
        setCurrentDialogueIndex(dialogueIndex);
        const textLength = SASQUATCH_INTRO[dialogueIndex].length;
        // Longer pause between dialogue lines for readability
        setTimeout(onStepComplete, TIMING.dialoguePause + textLength * 55);
      }
    } else {
      // Longer pause before transitioning to next beat
      setTimeout(onComplete, 2500);
    }
  }, [step, portraitReady, onStepComplete, onComplete]);

  return (
    <div className="beat-gonzo">
      {/* RPG-style Wizard Portrait */}
      {showPortrait && (
        <WizardPortrait
          materializing={true}
          onMaterialize={handleMaterialize}
          size="large"
          glow={true}
          animated={portraitReady}
        />
      )}

      {/* Dialogue using WizardDialogue component */}
      {currentDialogueIndex >= 0 && (
        <div className="beat-gonzo__dialogue">
          <WizardDialogue
            key={currentDialogueIndex}
            speaker="SASQUATCH"
            text={SASQUATCH_INTRO[currentDialogueIndex]}
            typing={true}
            speed={TIMING.dialogueSpeed}
            showCursor={true}
          />
        </div>
      )}
    </div>
  );
}

// ============================================
// BEAT 3: Profile Initialization
// ============================================

function Beat3ProfileInit({ onComplete, onStepComplete, step }: BeatProps) {
  const [showTitle, setShowTitle] = useState(false);
  const [systemChecks, setSystemChecks] = useState<{name: string; display: string; status: 'pending' | 'checking' | 'ok' | 'warn'}[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (step === 0) {
      setShowTitle(true);
      // Initialize all checks as pending
      setSystemChecks(SYSTEM_CHECKS.map(c => ({ ...c, status: 'pending' as const })));
      setTimeout(onStepComplete, 1200);
    } else if (step > 0 && step <= SYSTEM_CHECKS.length) {
      const checkIndex = step - 1;
      // Set current check to "checking"
      setSystemChecks(prev => prev.map((c, i) =>
        i === checkIndex ? { ...c, status: 'checking' as const } : c
      ));

      setTimeout(() => {
        // Complete the check
        setSystemChecks(prev => prev.map((c, i) =>
          i === checkIndex ? { ...c, status: 'ok' as const } : c
        ));
        setOverallProgress((step) / SYSTEM_CHECKS.length);
        setTimeout(onStepComplete, 400);
      }, TIMING.systemCheckDelay);
    } else {
      setTimeout(onComplete, 1000);
    }
  }, [step, onStepComplete, onComplete]);

  return (
    <div className="beat-profile">
      {showTitle && (
        <div className="beat-profile__header">
          <ASCIIText
            text="=== INITIALIZING APPRENTICE PROFILE ==="
            speed={40}
            showCursor={false}
          />
        </div>
      )}

      <div className="beat-profile__checks">
        {systemChecks.map((check, i) => (
          <div key={i} className={`system-check system-check--${check.status}`}>
            <span className="system-check__name">{check.display}</span>
            <span className="system-check__dots">
              {'.'.repeat(Math.max(0, 40 - check.display.length))}
            </span>
            <span className="system-check__status">
              {check.status === 'pending' && '[    ]'}
              {check.status === 'checking' && '[....]'}
              {check.status === 'ok' && '[ OK ]'}
              {check.status === 'warn' && '[WARN]'}
            </span>
          </div>
        ))}
      </div>

      {step > 0 && (
        <div className="beat-profile__progress">
          <ProgressBar
            progress={overallProgress}
            width={30}
            label="INIT:"
            animated
          />
        </div>
      )}
    </div>
  );
}

// ============================================
// BEAT 4: Grimoire System Loading
// ============================================

function Beat4GrimoireLoad({ onComplete, onStepComplete, step }: BeatProps) {
  const [showBox, setShowBox] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [showDialogue, setShowDialogue] = useState(false);

  const loadingSteps = [
    'Loading spell indices...',
    'Parsing rune libraries...',
    'Compiling incantation cache...',
    'Validating grimoire checksum...',
    'GRIMOIRE READY',
  ];

  useEffect(() => {
    if (step === 0) {
      setShowBox(true);
      setTimeout(onStepComplete, 1000);
    } else if (step > 0 && step <= loadingSteps.length) {
      setLoadingText(loadingSteps[step - 1]);
      setTimeout(onStepComplete, TIMING.systemCheckDelay);
    } else if (step === loadingSteps.length + 1) {
      setShowDialogue(true);
      setTimeout(onStepComplete, 4000);
    } else {
      setTimeout(onComplete, 800);
    }
  }, [step, onStepComplete, onComplete, loadingSteps.length]);

  return (
    <div className="beat-grimoire">
      {showBox && (
        <TerminalBox
          title="GRIMOIRE SYSTEM"
          width={50}
          animate
          delay={100}
          variant="simple"
          glow
        >
          <div className="grimoire-content">
            <div className="grimoire-status">Status: ACTIVE</div>
            <div className="grimoire-version">Version: ARCANE.2024.XI</div>
            <div className="grimoire-spells">Spells Registered: 0</div>
            <div className="grimoire-loading">
              {loadingText && (
                <ASCIIText
                  text={loadingText}
                  speed={30}
                  showCursor
                />
              )}
            </div>
          </div>
        </TerminalBox>
      )}

      {showDialogue && (
        <div className="beat-grimoire__dialogue">
          <ASCIIText
            text="The Grand Grimoire awaits your first spell."
            speed={TIMING.dialogueSpeed}
            speaker="SASQUATCH: "
            showCursor
          />
        </div>
      )}
    </div>
  );
}

// ============================================
// BEAT 5: Rune Calibration Ritual
// ============================================

function Beat5RuneCalibration({ onComplete, onStepComplete, step }: BeatProps) {
  const [showTitle, setShowTitle] = useState(false);
  const [runes, setRunes] = useState<{name: string; display: string; symbol: string; status: 'pending' | 'testing' | 'pass' | 'fail'}[]>(
    // Initialize with pending runes immediately
    RUNE_CALIBRATION.map((r, i) => ({
      ...r,
      symbol: RUNE_GLYPHS[i] || '*',
      status: 'pending' as const
    }))
  );
  const [showDialogue, setShowDialogue] = useState(false);

  // Calculate counts from runes state (derived state)
  const passCount = runes.filter(r => r.status === 'pass').length;
  const failCount = runes.filter(r => r.status === 'fail').length;

  // Calculate progress based on completed runes (pass or fail status)
  const completedCount = passCount + failCount;
  const overallProgress = completedCount / RUNE_CALIBRATION.length;

  useEffect(() => {
    if (step === 0) {
      setShowTitle(true);
      setTimeout(onStepComplete, 1500);
    } else if (step > 0 && step <= RUNE_CALIBRATION.length * 2) {
      const runeIndex = Math.floor((step - 1) / 2);
      const isTestPhase = (step - 1) % 2 === 0;

      if (isTestPhase) {
        // Testing phase
        setRunes(prev => prev.map((r, i) =>
          i === runeIndex ? { ...r, status: 'testing' as const } : r
        ));
        setTimeout(onStepComplete, 800);
      } else {
        // Result phase - determine pass/fail (65% pass rate)
        const passed = Math.random() > 0.35;
        setRunes(prev => prev.map((r, i) =>
          i === runeIndex ? { ...r, status: passed ? 'pass' as const : 'fail' as const } : r
        ));
        setTimeout(onStepComplete, TIMING.runeCheckDelay);
      }
    } else if (step === RUNE_CALIBRATION.length * 2 + 1) {
      setShowDialogue(true);
      setTimeout(onStepComplete, 4500);
    } else {
      setTimeout(onComplete, 1000);
    }
  }, [step, onStepComplete, onComplete]);

  return (
    <div className="beat-runes">
      {showTitle && (
        <div className="beat-runes__header">
          <ASCIIText
            text="=== RUNE CALIBRATION RITUAL ==="
            speed={40}
            showCursor={false}
          />
        </div>
      )}

      <div className="beat-runes__grid">
        {runes.map((rune, i) => (
          <div key={i} className={`rune-check rune-check--${rune.status}`}>
            <span className="rune-check__symbol">{rune.symbol}</span>
            <span className="rune-check__name">{rune.display}</span>
            <span className="rune-check__status">
              {rune.status === 'pending' && '[------]'}
              {rune.status === 'testing' && '[......] TESTING'}
              {rune.status === 'pass' && '[ALIGNED]'}
              {rune.status === 'fail' && '[FAILED]'}
            </span>
          </div>
        ))}
      </div>

      <div className="beat-runes__summary">
        <ProgressBar
          progress={overallProgress}
          width={25}
          label="CALIBRATION:"
          animated
        />
        <div className="beat-runes__counts">
          <span className="rune-count rune-count--pass">ALIGNED: {passCount}</span>
          <span className="rune-count rune-count--fail">FAILED: {failCount}</span>
        </div>
      </div>

      {showDialogue && (
        <div className="beat-runes__dialogue">
          {failCount > 0 ? (
            <>
              <ASCIIText
                text="The runes drift out of harmony."
                speed={TIMING.dialogueSpeed}
                speaker="SASQUATCH: "
                showCursor={false}
              />
              <ASCIIText
                text="You must restore balance, apprentice."
                speed={TIMING.dialogueSpeed}
                speaker="       "
                delay={2000}
                showCursor
              />
            </>
          ) : (
            <ASCIIText
              text="All runes aligned. Remarkable, apprentice."
              speed={TIMING.dialogueSpeed}
              speaker="SASQUATCH: "
              showCursor
            />
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// BEAT 6: Final Preparation
// ============================================

function Beat6FinalPrep({ onComplete, onStepComplete, step }: BeatProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [showCommand, setShowCommand] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (step === 0) {
      setShowMessage(true);
      setTimeout(onStepComplete, 3500);
    } else if (step === 1) {
      setShowCommand(true);
      setTimeout(onStepComplete, 2000);
    } else if (step === 2) {
      setShowFinal(true);
      setTimeout(onStepComplete, 3000);
    } else {
      setTimeout(onComplete, 500);
    }
  }, [step, onStepComplete, onComplete]);

  return (
    <div className="beat-final">
      {showMessage && (
        <div className="beat-final__message">
          <ASCIIText
            text="The system is prepared."
            speed={TIMING.dialogueSpeed}
            speaker="SASQUATCH: "
            showCursor={false}
          />
          <ASCIIText
            text="Your journey begins now, apprentice."
            speed={TIMING.dialogueSpeed}
            speaker="       "
            delay={1800}
            showCursor={!showCommand}
          />
        </div>
      )}

      {showCommand && (
        <div className="beat-final__command">
          <CommandLine
            prompt="GRIMOIRE>"
            value=""
            showCursor
            blinkCursor
          />
        </div>
      )}

      {showFinal && (
        <div className="beat-final__initiate">
          <ASCIIText
            text=">>> INITIATING ARCANE INTERFACE..."
            speed={60}
            showCursor
            className="initiate-text"
          />
        </div>
      )}
    </div>
  );
}

// ============================================
// Floating Runes Background
// ============================================

interface FloatingRunesProps {
  visible: boolean;
}

function FloatingRunes({ visible }: FloatingRunesProps) {
  if (!visible) return null;

  const runePositions = [
    { x: 8, y: 12, char: '*' },
    { x: 88, y: 18, char: '+' },
    { x: 12, y: 78, char: '*' },
    { x: 92, y: 82, char: '+' },
    { x: 4, y: 42, char: '.' },
    { x: 96, y: 55, char: '.' },
  ];

  return (
    <div className="floating-runes">
      {runePositions.map((pos, i) => (
        <span
          key={i}
          className="floating-runes__rune"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            '--float-delay': `${i * 0.5}s`,
          } as React.CSSProperties}
        >
          {pos.char}
        </span>
      ))}
    </div>
  );
}
