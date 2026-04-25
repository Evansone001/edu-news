'use client';

import { useRouter } from 'next/navigation';

interface RouterButtonProps {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export default function RouterButton({ onClick, href, children, className }: RouterButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
