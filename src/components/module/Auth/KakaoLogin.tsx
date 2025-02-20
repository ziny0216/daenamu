import Button from '@/components/common/Button';
import browserClient from '@/utils/supabaseClient';

export default function KakaoLogin() {
  const handleKakaoLogin = async () => {
    await browserClient.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };
  return <Button onClick={handleKakaoLogin} title={'카카오톡 로그인'} />;
}
