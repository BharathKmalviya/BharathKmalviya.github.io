'use client';

import {CopyEmailButton} from '@/components/ui/copy-email-button';
import {EmailIcon, ExternalLinkIcon, GitHubIcon, LinkedInIcon, TwitterXIcon} from '@/components/icons/social-icons';
import {portfolio} from '@/data/portfolio';
import {trackContactClick, type ContactChannel} from '@/lib/firebase-analytics';

const CHANNEL_BY_LABEL: Record<string, ContactChannel> = {
  LinkedIn: 'linkedin',
  GitHub: 'github',
  'Twitter/X': 'x',
  Email: 'email',
};

const ICON_BY_LABEL = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  'Twitter/X': TwitterXIcon,
  Email: EmailIcon,
} as const;

export function ContactSection() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="section-frame section-frame--wide">
        <p className="section-kicker">05 / Contact</p>
        <h2 id="contact-heading" className="section-title">{portfolio.contactTitle}</h2>
        <p className="max-w-[34rem] font-sans-body leading-relaxed text-[var(--text-muted)]">{portfolio.contactLede}</p>
        <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <a
            id="contact-email"
            href={`mailto:${portfolio.email}`}
            onClick={() => void trackContactClick('email', 'contact')}
            className="contact-email font-sans-body">
            {portfolio.email}
          </a>
          <CopyEmailButton email={portfolio.email} />
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-2">
          {portfolio.socials.map(({href, label}) => {
            const Icon = ICON_BY_LABEL[label as keyof typeof ICON_BY_LABEL];
            if (!Icon) return null;
            const opensNewTab = !href.startsWith('mailto:');
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => {
                    const channel = CHANNEL_BY_LABEL[label];
                    if (channel) void trackContactClick(channel, 'contact');
                  }}
                  target={opensNewTab ? '_blank' : undefined}
                  rel={opensNewTab ? 'noopener noreferrer' : undefined}
                  aria-label={opensNewTab ? `${label} (opens in a new tab)` : label}
                  className="social-link font-sans-body">
                  <Icon />
                  <span>{label}</span>
                  {opensNewTab ? <ExternalLinkIcon /> : null}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
