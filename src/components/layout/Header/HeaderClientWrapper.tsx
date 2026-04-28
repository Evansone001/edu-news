'use client';

import dynamic from 'next/dynamic';
import { HeaderSkeleton } from './DesktopNavigation';

const Header = dynamic(() => import('./Header'), {
  ssr: true,
  loading: () => <HeaderSkeleton />
});

export default function HeaderClient() {
  return <Header />;
}
