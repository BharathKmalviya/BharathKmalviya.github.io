import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Bharath K Malviya',
  description: 'Android developer portfolio',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
