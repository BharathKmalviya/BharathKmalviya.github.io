import type {Metadata, Viewport} from 'next';
import type {ReactNode} from 'react';
import './globals.css';
import {jetbrainsMono} from './fonts';
import {portfolio} from '@/data/portfolio';

export const viewport: Viewport = {
  themeColor: '#070807',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.siteUrl),
  title: {
    default: portfolio.seo.title,
    template: `%s | ${portfolio.name}`,
  },
  description: portfolio.seo.description,
  keywords: portfolio.seo.keywords,
  authors: [{name: portfolio.name, url: portfolio.siteUrl}],
  creator: portfolio.name,
  applicationName: portfolio.name,
  category: 'technology',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: portfolio.siteUrl,
    siteName: 'bharathmalviya.com',
    title: portfolio.seo.title,
    description: portfolio.seo.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolio.seo.title,
    description: portfolio.seo.description,
    creator: '@BharathKmalviya',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: portfolio.siteUrl,
  },
  other: {
    'format-detection': 'telephone=no',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: portfolio.name,
  jobTitle: portfolio.role,
  description: portfolio.seo.description,
  url: portfolio.siteUrl,
  email: portfolio.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'MagicDecor',
  },
  alumniOf: portfolio.education.map((edu) => ({
    '@type': 'EducationalOrganization',
    name: edu.school,
  })),
  sameAs: portfolio.socials.filter((s) => !s.href.startsWith('mailto:')).map((s) => s.href),
  knowsAbout: [
    'Android',
    'Kotlin',
    'Java',
    'Jetpack Compose',
    'Clean Architecture',
    'MVVM',
    'Dagger Hilt',
    'Room',
    'Firebase',
    'Kotlin Coroutines',
    'Kotlin Flow',
    'StateFlow',
    'WorkManager',
    'Retrofit',
    'offline-first architecture',
    'CI/CD',
    'performance optimization',
  ],
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" className={`dark ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
        {children}
      </body>
    </html>
  );
}
