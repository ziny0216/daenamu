import browserClient from '@/utils/supabaseClient';
import KakaoIcon from '@/assets/icons/icon-kakao.svg';
import Button from '@/components/common/Button';

export default function KakaoLogin() {
  const handleKakaoLogin = async () => {
    await browserClient.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };
  return (
    <Button
      onClick={handleKakaoLogin}
      color={'transparent'}
      icon={<KakaoIcon />}
    />
  );
}
