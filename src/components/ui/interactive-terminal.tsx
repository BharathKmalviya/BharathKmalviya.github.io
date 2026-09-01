'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {useSafeReducedMotion} from '@/lib/use-safe-reduced-motion';
import {MatrixRain} from '@/components/ui/matrix-rain';
import {portfolio} from '@/data/portfolio';

type Tone = 'cmd' | 'out' | 'accent' | 'warn' | 'err';
type Line = {id: number; tone: Tone; text: string};

const TONE_CLASS: Record<Tone, string> = {
  cmd: 'text-[var(--terminal-neon)]',
  out: 'text-[var(--text-muted)]',
  accent: 'text-[var(--text)]',
  warn: 'text-[#ffbd2e]',
  err: 'text-[#ff5f56]',
};

/** Commands offered by tab-completion and the hint chips. */
const COMMANDS = [
  'help',
  'whoami',
  'neofetch',
  'projects',
  'experience',
  'skills',
  'stats',
  'contact',
  'social',
  'sudo hire-me',
  'matrix',
  'coffee',
  'ls',
  'pwd',
  'clear',
] as const;

const CHIPS = ['help', 'whoami', 'neofetch', 'projects', 'sudo hire-me', 'matrix'] as const;

const HELP: [string, string][] = [
  ['whoami', 'the short version of me'],
  ['neofetch', 'system card, developer edition'],
  ['projects', 'what I have shipped'],
  ['experience', 'where I have shipped it'],
  ['skills', 'what I build with'],
  ['stats', 'the numbers'],
  ['contact', 'reach me'],
  ['social', 'find me elsewhere'],
  ['sudo hire-me', 'you know you want to'],
  ['matrix', 'follow the white rabbit'],
  ['clear', 'wipe the screen'],
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
}

export function InteractiveTerminal() {
  const reduceMotion = useSafeReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const history = useRef<string[]>([]);
  const historyIndex = useRef(-1);

  useEffect(() => {
    logRef.current?.scrollTo({top: logRef.current.scrollHeight});
  }, [lines]);

  const push = useCallback((entries: {tone: Tone; text: string}[]) => {
    setLines((prev) => [...prev, ...entries.map((e) => ({...e, id: nextId.current++}))].slice(-60));
  }, []);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase().replace(/\s+/g, ' ');
      if (!cmd) return;

      setTouched(true);
      if (cmd === 'clear') {
        setLines([]);
        return;
      }

      const echo = {tone: 'cmd' as const, text: raw.trim()};
      const out = (...entries: ([Tone, string] | string)[]) =>
        push([
          echo,
          ...entries.map((e) =>
            typeof e === 'string' ? {tone: 'out' as const, text: e} : {tone: e[0], text: e[1]},
          ),
        ]);

      switch (cmd) {
        case 'help':
        case '?':
        case 'man':
          out(
            ['accent', 'available commands'],
            ...HELP.map(([name, desc]): [Tone, string] => [
              'out',
              `  ${name.padEnd(14)}${desc}`,
            ]),
            ['out', '  tab completes · ↑ ↓ recalls history'],
          );
          break;

        case 'whoami':
          out(
            ['accent', 'bharath malviya — senior android developer, mumbai'],
            '6+ years building apps for people who do not sit at desks:',
            'field sales reps, installers, and cashiers at rush hour.',
            ['warn', "type 'neofetch' for the full card."],
          );
          break;

        case 'neofetch':
          out(
            ['accent', '   ╭──────────╮   guest@bharath'],
            ['accent', '   │  ╱▔▔▔╲   │   ─────────────────'],
            ['accent', `   │ │ ●  ● │  │   role     ${portfolio.role}`],
            ['accent', `   │  ╲▁▁▁╱   │   company  ${portfolio.company}`],
            ['accent', `   │   ▁▁▁▁   │   uptime   6+ years in android`],
            ['accent', `   ╰──────────╯   base     Mumbai, India`],
            ['out', `                   shell    kotlin, compose`],
            ['out', `                   status   open to connect`],
          );
          break;

        case 'projects':
        case 'work':
        case 'ls projects':
          out(
            ['accent', `${portfolio.projects.length} shipped products`],
            ...portfolio.projects.map((p): [Tone, string] => ['out', `  ${p.slug}/`.padEnd(24) + p.summary.slice(0, 46)]),
            ['warn', 'opening ~/featured-work ...'],
          );
          scrollTo('work');
          break;

        case 'experience':
        case 'ls experience':
          out(
            ...portfolio.experience.map((j): [Tone, string] => [
              'out',
              `  ${j.logFile.padEnd(22)}${j.roles[j.roles.length - 1].start} — ${j.roles[0].end}`,
            ]),
            ['warn', 'opening ~/experience ...'],
          );
          scrollTo('experience');
          break;

        case 'skills':
        case 'ls skills':
          out(
            ...portfolio.skillGroups.flatMap((g): [Tone, string][] => [
              ['accent', `  ${g.title}`],
              ['out', `    ${g.chips.join(' · ')}`],
            ]),
          );
          break;

        case 'stats':
          out(
            ...portfolio.stats.map((s): [Tone, string] => [
              'out',
              `  ${s.value.padEnd(6)}${s.label}`,
            ]),
          );
          break;

        case 'contact':
        case 'email':
          out(['accent', `  ${portfolio.email}`], ['warn', 'opening ~/contact ...']);
          scrollTo('contact');
          break;

        case 'social':
        case 'links':
          out(
            ...portfolio.socials.map((s): [Tone, string] => [
              'out',
              `  ${s.label.padEnd(12)}${s.href}`,
            ]),
          );
          break;

        case 'sudo hire-me':
        case 'sudo hire me':
        case 'hire-me':
        case 'hire me':
          out(
            ['out', '[sudo] password for guest: ********'],
            ['accent', 'access granted ✓'],
            ['warn', 'opening mail client ...'],
          );
          window.setTimeout(() => {
            window.location.href = `mailto:${portfolio.email}?subject=Let's work together`;
          }, 900);
          break;

        case 'matrix':
          if (reduceMotion) {
            out(['warn', 'your system prefers reduced motion — the rabbit hole respects that.']);
          } else {
            out(['accent', 'wake up, neo ...']);
            window.setTimeout(() => setShowMatrix(true), 600);
          }
          break;

        case 'coffee':
          out(['warn', 'error 418: i am a teapot'], 'but the code still compiles. ☕');
          break;

        case 'ls':
          out(['accent', '  projects/  experience/  skills/  contact.txt  .secret']);
          break;

        case 'cat .secret':
        case 'cat secret':
        case '.secret':
          out(['accent', 'curiosity: verified ✓'], "you found it. now try 'matrix'.");
          break;

        case 'pwd':
          out('/home/bharath/portfolio');
          break;

        case 'rm -rf /':
          out(['err', 'nice try.'], 'this portfolio is statically generated. it regenerates.');
          break;

        case 'exit':
          out(['warn', "there's no escape from good software."]);
          break;

        default:
          out(['err', `command not found: ${cmd}`], "try 'help' to see what works.");
      }
    },
    [push, reduceMotion],
  );

  const submit = (raw: string) => {
    if (raw.trim()) history.current.push(raw);
    historyIndex.current = -1;
    run(raw);
    setValue('');
  };

  return (
    <div className="console cursor-text px-5 py-4 sm:px-8" onClick={() => inputRef.current?.focus()}>
      {lines.length > 0 ? (
        <div ref={logRef} role="log" aria-live="polite" className="mb-3 max-h-56 overflow-auto">
          {lines.map((line) => (
            <p
              key={line.id}
              className={`text-[0.7rem] leading-relaxed whitespace-pre sm:text-[0.8125rem] ${TONE_CLASS[line.tone]}`}>
              {line.tone === 'cmd' ? `$ ${line.text}` : line.text}
            </p>
          ))}
        </div>
      ) : null}

      <div className={`console__row flex items-center gap-2 ${touched ? '' : 'console__row--idle'}`}>
        <label
          htmlFor="hero-terminal-input"
          className="shrink-0 text-[0.75rem] text-[var(--terminal-neon)] sm:text-[0.8125rem]">
          <span className="sm:hidden">~$</span>
          <span className="hidden sm:inline">guest@portfolio:~$</span>
        </label>
        <input
          ref={inputRef}
          id="hero-terminal-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submit(value);
            } else if (e.key === 'Tab') {
              const partial = value.trim().toLowerCase();
              if (!partial) return;
              const match = COMMANDS.find((c) => c.startsWith(partial));
              if (match) {
                e.preventDefault();
                setValue(match);
              }
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              if (!history.current.length) return;
              historyIndex.current =
                historyIndex.current === -1
                  ? history.current.length - 1
                  : Math.max(0, historyIndex.current - 1);
              setValue(history.current[historyIndex.current]);
            } else if (e.key === 'ArrowDown') {
              e.preventDefault();
              if (historyIndex.current === -1) return;
              historyIndex.current += 1;
              if (historyIndex.current >= history.current.length) {
                historyIndex.current = -1;
                setValue('');
              } else {
                setValue(history.current[historyIndex.current]);
              }
            }
          }}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="send"
          aria-describedby="hero-terminal-hint"
          aria-label="Interactive terminal. Type help and press enter."
          className="w-full min-w-0 border-none bg-transparent text-[0.8125rem] text-[var(--text)] caret-[var(--terminal-neon)] outline-none placeholder:text-[var(--text-muted)]"
          placeholder="this terminal is real — type a command ↵"
        />
      </div>

      <div id="hero-terminal-hint" className="console__hint mt-3">
        <span className="text-[0.65rem] tracking-wider text-[var(--text-muted)] uppercase">try</span>
        {CHIPS.map((cmd) => (
          <button key={cmd} type="button" className="cmd-chip" onClick={() => submit(cmd)}>
            {cmd}
          </button>
        ))}
      </div>

      {showMatrix ? <MatrixRain onDone={() => setShowMatrix(false)} /> : null}
    </div>
  );
}
