import React from 'react';
import { ProfessionalUser } from '../types';
export const ProfessionalContext = React.createContext<{
  user: ProfessionalUser | null;
  language: string;
  region: string;
  plan: string;
  updateUser: (updates: Partial<ProfessionalUser>) => void;
  updateLanguage: (lang: string) => void;
  updateRegion: (region: string) => void;
}>({
  user: null,
  language: 'en',
  region: 'na',
  plan: 'free',
  updateUser: () => {},
  updateLanguage: () => {},
  updateRegion: () => {},
});