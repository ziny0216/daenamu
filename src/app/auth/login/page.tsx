'use client';

import UserLoginForm from '@/components/module/User/UserLoginForm';

import Button from '@/components/common/Button';
import Link from 'next/link';
import GoogleLogin from '@/components/module/Auth/GoogleLogin';
import KakaoLogin from '@/components/module/Auth/KakaoLogin';

export default function Page() {
  const handleRegister = () => {};
  return (
    <>
      <h1>로그인</h1>
      <UserLoginForm />
      <div className="btn_group flex-center">
        <Link href={'/auth/join'}>회원가입</Link> |{' '}
        <Link href={'/auth/find'}>비밀번호찾기</Link>
      </div>
      <Button size={'md'} title={'로그인'} onClick={handleRegister} />
      <div className="btn_group flex-center">
        <GoogleLogin />
        <KakaoLogin />
      </div>
    </>
  );
}
