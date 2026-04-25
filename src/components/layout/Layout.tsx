import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Header/Header'), {
  ssr: false,
  loading: () => <div>Loading header...</div>,
});

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;
