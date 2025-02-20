import Button from '@/components/common/Button';
import browserClient from '@/utils/supabaseClient';

export default function GoogleLogin() {
  const handleGoogleLogin = async () => {
    await browserClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };
  return <Button onClick={handleGoogleLogin} title={'구글 로그인'} />;
}
