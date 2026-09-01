'use client';

import {useState} from 'react';
import {copyText} from '@/lib/clipboard';

type CopyEmailButtonProps = {
  email: string;
};

export function CopyEmailButton({email}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const [liveMessage, setLiveMessage] = useState('');

  async function handleClick() {
    const result = await copyText(email);
    if (result === 'copied') {
      setCopied(true);
      setLiveMessage('Email copied to clipboard');
      window.setTimeout(() => {
        setCopied(false);
        setLiveMessage('');
      }, 2000);
      return;
    }

    setLiveMessage('Select and copy manually');
    const el = document.getElementById('contact-email');
    if (el) {
      el.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(el);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  return (
    <div className="inline-flex flex-col items-start gap-2">
      <button type="button" className="btn btn-ghost" onClick={handleClick}>
        {copied ? (
          <span className="inline-flex items-center gap-2">
            <span className="check-pop text-[var(--terminal-neon)]" aria-hidden="true">
              ✓
            </span>
            Copied
          </span>
        ) : (
          'Copy email'
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {liveMessage}
      </span>
      {liveMessage === 'Select and copy manually' ? (
        <span className="text-sm text-[var(--terminal-neon)]" aria-hidden="true">
          Select and copy manually
        </span>
      ) : null}
    </div>
  );
}
