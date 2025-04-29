import { Tables } from '@/types/database.types';

export interface ProfileProps {
  className?: string;
  size?: 'md' | 'lg';
  is_anonymity?: boolean;
  profile: (Partial<Tables<'users'>> & { user_id?: string | null }) | null;
}

export interface ReportReasonType {
  reason: string;
  reason_memo: string;
}
