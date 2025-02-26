import Button from '@/components/common/Button';
import browserClient from '@/utils/supabaseClient';
import GoogleIcon from '@/assets/icons/icon-google.svg';

export default function GoogleLogin() {
  const handleGoogleLogin = async () => {
    await browserClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };
  return (
    <Button
      size="sm"
      color={'foreground'}
      isIcon
      onClick={handleGoogleLogin}
      icon={<GoogleIcon />}
    />
  );
}
