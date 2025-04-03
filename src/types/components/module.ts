import { Tables } from '@/types/database.types';

export interface ProfileProps {
  className?: string;
  size?: 'md' | 'lg';
  is_anonymity?: boolean;
  profile: Tables<'users'> | null;
  handleUserProfile?: () => void;
}
