'use client';

import dynamic from 'next/dynamic';

export const MaterialWebDemo = dynamic(
  () => import('@/components/material-web-demo').then((mod) => mod.MaterialWebDemo),
  {ssr: false},
);
