'use client';

import {useState} from 'react';
import {copyText} from '@/lib/clipboard';

type CopyEmailButtonProps = {
  email: string;
};

export function CopyEmailButton({email}: CopyEmailButtonProps) {
  const [label, setLabel] = useState('Copy email');
  const [liveMessage, setLiveMessage] = useState('');

  async function handleClick() {
    const result = await copyText(email);
    if (result === 'copied') {
      setLabel('Copied');
      setLiveMessage('Email copied to clipboard');
      window.setTimeout(() => {
        setLabel('Copy email');
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
        {label}
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
