# Firebase Analytics

## Project and reporting

Created on 2026-10-05 using the owner's signed-in Firebase account.

| Resource | Value |
| --- | --- |
| Firebase project | `bharathmalviya-portfolio` |
| Web app | `bharathmalviya.com` |
| App ID | `1:314974376672:web:7cc4806027607a2bb7f685` |
| GA4 property | `557397900` (dedicated portfolio property) |
| Web stream | `16047603910` |
| Measurement ID | `G-B3BJN5MSTS` |

- [Firebase Analytics dashboard](https://console.firebase.google.com/project/bharathmalviya-portfolio/analytics)
- [Google Analytics reports](https://analytics.google.com/analytics/web/#/p557397900/reports/intelligenthome)

Firebase project creation, web registration, Analytics linking, and SDK configuration
were read back successfully. Reported visitor events require deployment and browser
verification; cloud configuration alone does not establish successful ingestion.

Local ESLint, production compilation, TypeScript checking, and static export passed
on 2026-10-05. Exported `index.html`, `CNAME`, and `.nojekyll` are present. Automated
unit/E2E tests run in the pull-request workflow before merge; the manual event
ingestion checks below remain pending. The analytics change follows the normal
feature-branch PR to `master`, then GitHub Pages deployment workflow.

## Implementation

`src/components/firebase-analytics.tsx` initializes Analytics after hydration from
the root layout. `src/lib/firebase-analytics.ts` dynamically imports only Firebase
App and Analytics, checks browser support, and caches initialization so a document
produces one initial page view. The site remains a static Next.js export.

Collection runs only in production builds on `bharathmalviya.com` or
`www.bharathmalviya.com`. Local development, CI, and preview hosts are excluded.
Browsers requesting Do Not Track or Global Privacy Control are also excluded.
SDK failures and ad blockers must not interrupt rendering, copying, or navigation.

| Event | Trigger | Custom parameters |
| --- | --- | --- |
| `page_view` | Initial document load | Sanitized `page_location`, `page_title` |
| `contact_click` | Email/social link in Contact | Fixed `channel` (`email`, `linkedin`, `github`, `x`), `source=contact` |
| `email_copied` | Email copied successfully | None |

Anchor navigation does not generate additional manual page views. Custom events
contain no email addresses, clipboard contents, arbitrary text input, or user
IDs. Page location and referrer exclude query strings and fragments. Google Signals
and advertising personalization signals are disabled in SDK configuration. Standard
Analytics browser/session measurements still apply; this is not a cookieless setup.

The Firebase web configuration is public app metadata, as described in
[Firebase's configuration guidance](https://firebase.google.com/docs/projects/learn-more#config-files-objects).
It is committed so the same configuration reaches GitHub Pages without private
build credentials. Admin keys, service accounts, and OAuth tokens must never be
committed. `.firebaserc` associates CLI commands with this project; hosting remains
GitHub Pages.

## Manual verification after deployment

1. Open the production site in a browser with Analytics allowed and privacy opt-out
   signals disabled. In DevTools Console, run
   `sessionStorage.setItem('portfolio-analytics-debug', 'true')`, then reload.
2. In [Firebase DebugView](https://console.firebase.google.com/project/bharathmalviya-portfolio/analytics/debugview),
   confirm one initial `page_view` for this document. Scroll or use section links and
   confirm they do not produce duplicate manual page views.
3. Copy the contact email and confirm both the normal Copied state and
   `email_copied`. Click the email and social links and confirm their existing
   navigation and `contact_click` with the expected fixed channel/source.
4. Inspect Analytics collect requests: confirm `tid=G-B3BJN5MSTS`, no query/hash
   in page location/referrer, and no email or typed input in custom parameters.
5. Block Analytics requests and confirm the site, copy action, and navigation
   continue working. Check that local development and privacy opt-out browsers
   do not initialize Analytics.
6. Remove debug mode with
   `sessionStorage.removeItem('portfolio-analytics-debug')`, then reload. Check
   Realtime for ordinary visits; aggregated reporting can arrive later.

To break down `contact_click` by channel/source in ordinary reports, register
event-scoped custom dimensions for `channel` and `source` in GA4 Admin → Custom
definitions. DebugView shows these parameters without that reporting setup.

The simulated terminal was removed in the 2026-10-09 presentation change.
Historical events can still have `source=terminal`; new contact interactions use
`source=contact`. The Analytics configuration and privacy gates are unchanged.

Setup follows the official [Firebase Analytics web guide](https://firebase.google.com/docs/analytics/web/get-started).
