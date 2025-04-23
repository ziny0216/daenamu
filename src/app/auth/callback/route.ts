import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabaseServer';

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) return;
    const { data: profile } = await supabase
      .from('users')
      .select('is_delete')
      .eq('id', user.id)
      .single();
    if (profile?.is_delete) {
      await supabase.auth.signOut();
      // 서버에서
      return NextResponse.redirect(
        `${origin}/auth/login?error_code=withdrawal`,
      );
    }

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
};
