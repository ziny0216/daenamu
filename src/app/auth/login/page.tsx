'use client';

import UserLoginForm from '@/components/module/User/UserLoginForm';
import Link from 'next/link';
import GoogleLogin from '@/components/module/Auth/GoogleLogin';
import KakaoLogin from '@/components/module/Auth/KakaoLogin';
import { useForm } from '@/hooks/common/useForm';
import browserClient from '@/utils/supabaseClient';
import { FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import LoadingButton from '@/components/common/LoadingButton';

export default function Page() {
  const { form, onChange, error, isValid } = useForm('first');
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('error_code');
  useEffect(() => {
    if (errorCode === 'otp_expired') {
      console.log(errorCode, 'errorCode');
    }
    if (errorCode === 'withdrawal') {
      toast('탈퇴한 계정입니다.');
    }
  }, [router, errorCode]);
  // 이메일 인증 만료된 사용자 재전송
  const resendEmail = async () => {
    try {
      const { error } = await browserClient.auth.resend({
        type: 'signup',
        email: 'email@example.com',
        options: {
          emailRedirectTo: `${window.location.origin}/auth/login`,
        },
      });
      if (error) {
        toast(error.message);
      } else {
        toast('인증 이메일을 다시보냈습니다.');
      }
    } catch (e) {
      console.error('Error Resend:', e);
      toast('다시 시도 해주세요.');
    }
  };

  // 로그인
  const login = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await browserClient.auth.signInWithPassword({
        email: form.email as string,
        password: form.password,
      });

      if (error) {
        if (error.code === 'invite_not_found') {
          toast('이메일 인증이 만료되었습니다');
          await resendEmail();
        }
        toast(error.message);
      } else {
        const {
          data: { user },
        } = await browserClient.auth.getUser();

        const { data: profile } = await browserClient
          .from('users')
          .select('is_delete')
          .eq('id', user!.id)
          .single();

        if (profile?.is_delete) {
          await browserClient.auth.signOut();
          toast('탈퇴한 계정으로는 로그인할 수 없습니다.');
          router.replace('/auth/login');
          return;
        }

        toast('로그인 성공');
        router.push('/');
      }
    } catch (e) {
      console.error('Error Login:', e);
      toast('다시 시도 해주세요.');
    }
  };

  return (
    <>
      <form onSubmit={login}>
        <h1>로그인</h1>
        <UserLoginForm
          email={form.email || ''}
          password={form.password}
          onChangeInput={onChange}
          error={error}
        />
        <div className="line_group">
          <Link className="line_item" href={'/auth/join'}>
            회원가입
          </Link>
          <Link className="line_item" href={'/auth/reset'}>
            비밀번호를 잊어버리셨나요?
          </Link>
        </div>

        <LoadingButton
          disabled={!isValid}
          size={'md'}
          title={'로그인'}
          type="submit"
        />
      </form>
      <div className="btn_group flex-center">
        <GoogleLogin />
        <KakaoLogin />
      </div>
    </>
  );
}
