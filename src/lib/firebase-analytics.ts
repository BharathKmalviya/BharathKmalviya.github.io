import type {Analytics, logEvent as FirebaseLogEvent} from 'firebase/analytics';

// Firebase web configuration identifies the public app; it is not an admin credential.
const firebaseConfig = {
  apiKey: 'AIzaSyARqVJXUpcjwyHwffhd70V42ZQKegf5bFE',
  authDomain: 'bharathmalviya-portfolio.firebaseapp.com',
  projectId: 'bharathmalviya-portfolio',
  messagingSenderId: '314974376672',
  appId: '1:314974376672:web:7cc4806027607a2bb7f685',
  measurementId: 'G-B3BJN5MSTS',
};

type AnalyticsClient = {analytics: Analytics; logEvent: typeof FirebaseLogEvent};
export type ContactChannel = 'email' | 'linkedin' | 'github' | 'x';
export type ContactSource = 'contact';

let clientPromise: Promise<AnalyticsClient | null> | undefined;

function canCollectAnalytics() {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return false;
  const privacyNavigator = navigator as Navigator & {globalPrivacyControl?: boolean};
  return (
    ['bharathmalviya.com', 'www.bharathmalviya.com'].includes(window.location.hostname) &&
    navigator.doNotTrack !== '1' &&
    !privacyNavigator.globalPrivacyControl
  );
}

function withoutQueryOrHash(value: string) {
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`;
  } catch {
    return '';
  }
}

function getClient(): Promise<AnalyticsClient | null> {
  if (!canCollectAnalytics()) return Promise.resolve(null);

  clientPromise ??= (async () => {
    try {
      const [{initializeApp, getApps}, {initializeAnalytics, isSupported, logEvent}] =
        await Promise.all([import('firebase/app'), import('firebase/analytics')]);
      if (!(await isSupported())) return null;

      let debugMode = false;
      try {
        debugMode = sessionStorage.getItem('portfolio-analytics-debug') === 'true';
      } catch {
        // Storage may be unavailable even when the browser supports Analytics.
      }

      const app = getApps().find((app) => app.name === 'portfolio') ??
        initializeApp(firebaseConfig, 'portfolio');
      const pageLocation = withoutQueryOrHash(window.location.href);
      const analytics = initializeAnalytics(app, {
        config: {
          send_page_view: false,
          page_location: pageLocation,
          page_referrer: withoutQueryOrHash(document.referrer),
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
          ...(debugMode ? {debug_mode: true} : {}),
        },
      });

      // One page view per document, including React Strict Mode remounts.
      logEvent(analytics, 'page_view', {
        page_location: pageLocation,
        page_title: document.title,
      });
      return {analytics, logEvent};
    } catch {
      // Analytics is best effort: blockers and network failures must not affect the site.
      return null;
    }
  })();

  return clientPromise;
}

export async function initializeSiteAnalytics() {
  await getClient();
}

export async function trackContactClick(channel: ContactChannel, source: ContactSource) {
  try {
    const client = await getClient();
    client?.logEvent(client.analytics, 'contact_click', {channel, source});
  } catch {
    // Keep navigation independent of analytics delivery.
  }
}

export async function trackEmailCopied() {
  try {
    const client = await getClient();
    client?.logEvent(client.analytics, 'email_copied');
  } catch {
    // A successful copy stays successful even if analytics is blocked.
  }
}
