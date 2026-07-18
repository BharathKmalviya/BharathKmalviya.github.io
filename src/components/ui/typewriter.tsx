'use client';

import {useEffect, useState} from 'react';
import {useReducedMotion} from 'framer-motion';

type TypewriterProps = {
  lines: string[];
  className?: string;
};

export function Typewriter({lines, className}: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const fullText = lines.join('\n');
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setDisplayed(fullText.slice(0, index));
      if (index >= fullText.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, 32);

    return () => window.clearInterval(id);
  }, [fullText, reduceMotion]);

  const text = reduceMotion ? fullText : displayed;
  const showStaticCursor = Boolean(reduceMotion) || done;

  return (
    <pre
      className={`font-mono-terminal m-0 whitespace-pre-wrap text-left text-[clamp(0.95rem,2.2vw,1.2rem)] leading-[1.7] text-[var(--text)] ${className ?? ''}`}>
      {text}
      <span
        aria-hidden="true"
        className={
          showStaticCursor
            ? 'ml-0.5 inline-block text-[var(--terminal-neon)] opacity-60'
            : 'cursor-blink ml-0.5 inline-block text-[var(--terminal-neon)]'
        }>
        ▌
      </span>
    </pre>
  );
}
