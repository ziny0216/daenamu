import browserClient from '@/utils/supabaseClient';
import { useCallback, useEffect, useState } from 'react';
import { Tables } from '@/types/database.types';

export default function useProfileInfo({
  user_id,
}: {
  user_id: string | undefined;
}) {
  const supabase = browserClient;
  const [profile, setProfile] = useState<Tables<'users'> | null>(null);

  const getProfile = useCallback(async () => {
    if (!user_id) return;

    try {
      const { data, error, status } = await supabase
        .from('users')
        .select(`*`)
        .eq('id', user_id)
        .single();

      if (error && status !== 406) {
        console.error(error.message);
        throw error;
      }
      setProfile(data);
    } catch (e) {
      console.error(e);
    }
  }, [user_id, supabase]);

  useEffect(() => {
    getProfile();
  }, [user_id, getProfile]);

  return { profile };
}
