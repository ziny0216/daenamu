'use client';

import UserLoginForm from '@/components/module/User/UserLoginForm';

import Button from '@/components/common/Button';
import Link from 'next/link';
import GoogleLogin from '@/components/module/Auth/GoogleLogin';
import KakaoLogin from '@/components/module/Auth/KakaoLogin';
import { useForm } from '@/hooks/common/useForm';
import browserClient from '@/utils/supabaseClient';
import { FormEvent } from 'react';

export default function Page() {
  const { form, onChange } = useForm();
  const login = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await browserClient.auth.signInWithPassword({
        email: form.email as string,
        password: form.password,
      });
      if (error) {
        throw new Error(error.message);
      } else {
        console.log('Login 성공:', data);
      }
    } catch (e) {
      console.error('Error Login:', e);
      throw e;
    }
  };
  return (
    <>
      <form onSubmit={login}>
        <h1>로그인</h1>
        <UserLoginForm password={form.password} handlePassword={onChange} />
        <div className="btn_group flex-center">
          <Link href={'/auth/join'}>회원가입</Link> |{' '}
          <Link href={'/auth/find'}>비밀번호찾기</Link>
        </div>
        <Button size={'md'} title={'로그인'} type="submit" />
      </form>
      <div className="btn_group flex-center">
        <GoogleLogin />
        <KakaoLogin />
      </div>
    </>
  );
}
