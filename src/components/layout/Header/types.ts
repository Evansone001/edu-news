interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export type AuthModalStep = 
  | 'INITIAL' 
  | 'SIGN_IN' 
  | 'SIGN_UP_EMAIL' 
  | 'SIGN_IN_EMAIL';

export type ErrorType = 
  | 'INVALID_CREDENTIALS' 
  | 'EMAIL_IN_USE' 
  | 'WEAK_PASSWORD';

export interface HeaderProps {
  className?: string;
}

export interface AuthFormData {
  email: string;
  password: string;
}

export interface UserMenuProps {
  user: User | null;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

export interface FollowButtonProps {
  isFollowing: boolean;
  onClick: () => void;
  className?: string;
}