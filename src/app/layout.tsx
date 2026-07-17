import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import 'material-symbols/outlined.css';
import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';
import {robotoFlex} from './fonts';

export const metadata: Metadata = {
  title: 'Bharath K Malviya',
  description: 'Android developer portfolio',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning className={robotoFlex.variable}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
