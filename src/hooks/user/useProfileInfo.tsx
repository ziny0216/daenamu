import browserClient from '@/utils/supabaseClient';
import { useCallback, useEffect, useState } from 'react';
import { Tables } from '@/types/database.types';

export default function useProfileInfo() {
  const supabase = browserClient;

  const [profile, setProfile] = useState<Tables<'users'> | null>(null);

  useEffect(() => {
    //로그인 상태 감지 후 `getProfile()` 실행
    const { data: authListener } = browserClient.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          getProfile(session.user.id);
        } else {
          setProfile(null);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // user.id를 기준으로 프로필 가져오기
  const getProfile = useCallback(
    async (userId: string | undefined) => {
      if (!userId) return;
      try {
        const { data, error, status } = await supabase
          .from('users')
          .select(`*`)
          .eq('id', userId)
          .single();

        if (error && status !== 406) {
          console.error(error.message);
          throw error;
        }
        if (data) {
          setProfile(data);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [supabase],
  );

  return { profile };
}
