import { useState, useCallback } from 'react';
import { useAuthContext } from '@/context/AuthContext/AuthContext';

export function useUserActions() {
  const { user, signOut } = useAuthContext();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = useCallback(() => {
    setIsUserMenuOpen(prev => !prev);
  }, []);

  const handleFollow = useCallback(async () => {
    if (!user) return;

    // Mock implementation - replace with actual backend call
    console.log('User followed blog:', user.email);
    setIsFollowing(prev => !prev);
  }, [user]);

  return {
    user,
    isFollowing,
    isUserMenuOpen,
    toggleUserMenu,
    handleFollow,
    signOut
  };
}