# Portfolio presentation

Updated 2026-10-09 in response to the owner's request to remove the generic,
AI-written feel of the site. This is one presentation and copy change. The dark
palette, Android green, JetBrains Mono, native controls, static export, contact
actions, and production Analytics continue to follow the constitution. No
constitution amendment or hosting change is part of this work.

## Presentation

- Put the developer's name, role, and specific Android work first.
- Use numbered project writeups with the product, personal contribution, and
  usage context. Do not present made-up screenshots as evidence.
- Keep the existing dark palette and green accents. Use opaque navigation,
  simple borders, and Inter for long-form reading.
- Describe skills through project work. Tool names appear as plain contextual
  text rather than logo grids or badge collections.
- Render all content immediately. No typewriter, terminal input, blinking
  cursors, simulated file names, floating phones, background orbs, glass panels,
  or scroll-triggered content fades.
- Keep section IDs and navigation destinations stable. Preserve the single
  active-section indicator, touch hover guard, hidden nav scrollbar, visible
  keyboard focus, copy-email fallback, and reduced-motion scrolling.
- Most sections are static React components. Client code is limited to navigation,
  hero scroll buttons, contact actions, clipboard feedback, and Analytics.

## Content rules

`src/data/portfolio.ts` remains the content source. Name the product and explain
what it does, who uses it, and the developer's role. Avoid slogans, inflated
superlatives, and unsubstantiated claims about speed or business results.

Existing names, employment dates, scale figures, and education are retained from
the previous content; this change does not independently verify those facts.
Add public product links or actual screenshots only when their identity and
publication rights are known. The old placeholder SVGs are not rendered.

Do not change frameworks to satisfy a novelty score. Next.js supplies the static
export and SEO metadata; it does not require the old visual style.

## Review and release

Review this presentation locally before proceeding to publication, as required
by constitution Principle II. PR checks still run lint, unit tests, browser
regression tests, and the static export before a merge to `master` deploys Pages.
Terminal-only tests are retired with the removed interaction; existing navigation,
contact, accessibility, content, and responsive coverage remains.

Local checks on 2026-10-09: ESLint, production compilation, TypeScript, static
export, and TypeScript checking of the E2E code passed. The export includes
`index.html`, `CNAME`, `.nojekyll`, `robots.txt`, and `sitemap.xml`. The exported
page contains no simulated commands or placeholder project images. Desktop and
narrow-browser screenshots were reviewed. Unit/E2E suites were not run locally;
CI remains the automated regression gate. The owner's manual checks below and
production Analytics ingestion remain unverified.

Manual review for the owner:

1. At desktop width, read the hero and all four projects. Confirm the role,
   employment dates, contributions, and scale figures are accurate.
2. At 360px and 430px widths, confirm text is readable, the nav is usable, and
   there is no horizontal page scroll.
3. Use See my work, Get in touch, each nav destination, and Back to top. Confirm
   headings remain clear of the sticky nav and the active label follows scrolling.
4. Tab through navigation and Contact. Confirm visible focus, correct social
   destinations, mailto behavior, and Copy email's Copied feedback and reset.
5. Enable reduced motion and confirm the scroll buttons jump directly to their
   destinations. Review with JavaScript disabled: project and experience copy
   should still be present, and the anchor navigation/contact links should work.
6. After deployment, follow `docs/analytics.md` for event-ingestion verification.
