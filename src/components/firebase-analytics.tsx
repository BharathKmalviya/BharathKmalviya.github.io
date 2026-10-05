'use client';

import {useEffect} from 'react';
import {initializeSiteAnalytics} from '@/lib/firebase-analytics';

export function FirebaseAnalytics() {
  useEffect(() => {
    void initializeSiteAnalytics();
  }, []);

  return null;
}
