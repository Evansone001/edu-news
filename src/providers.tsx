"use client";

import { AuthProvider } from '@/context/AuthContext/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
