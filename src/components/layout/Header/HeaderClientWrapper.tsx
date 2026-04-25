'use client';

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Header'), {
  ssr: false,
  loading: () => null
});

export default function HeaderClient() {
  return <Header />;
}
