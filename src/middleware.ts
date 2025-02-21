import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabaseMiddleware';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    console.log('Redirecting to /home'); // ✅ 이 로그는 찍힐 가능성이 높음
    return NextResponse.redirect(new URL('/home', request.url));
  }
  console.log('updateSession 실행 전'); // ❌ 이 로그는 찍히지 않을 가능성이 높음
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
