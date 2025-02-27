'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingButton from '@/components/common/LoadingButton';
import { useForm } from '@/hooks/common/useForm';
import browserClient from '@/utils/supabaseClient';
import UserLoginForm from '@/components/module/User/UserLoginForm';
import { toast } from 'react-toastify';
import { clearUser } from '@/lib/features/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const type = searchParams.get('type');
  const [resetStep, setResetStep] = useState<'request' | 'recovery'>('request');
  const { form, onChange, error, isValid } = useForm(resetStep);

  //비밀번호 이메일 요청 및 재설정
  const resetPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!form.email && resetStep === 'request') return;
      if (!form.password && resetStep === 'recovery') return;

      const request =
        resetStep === 'request'
          ? await browserClient.auth.resetPasswordForEmail(
              form.email as string,
              {
                redirectTo: `${window.location.origin}/auth/reset?type=recovery`,
              },
            )
          : await browserClient.auth.updateUser({ password: form.password });

      const { data, error } = request;

      console.log(data, 'data');
      if (error) {
        console.error('비밀번호 재설정 오류:', error);
        toast(error.message || '비밀번호 재설정 중 문제가 발생했습니다.');
        return;
      }

      if (resetStep === 'request') {
        toast('재설정 이메일을 보냈습니다! 이메일을 확인해주세요.');
      } else if (resetStep === 'recovery') {
        await browserClient.auth.signOut();
        toast('비밀번호 재설정 성공!');
        dispatch(clearUser());
        router.push('/auth/login');
      }
    } catch (err) {
      console.error('비밀번호 재설정 오류:', err);
      toast('다시 시도해주세요.');
    }
  };

  useEffect(() => {
    if (type === 'recovery') {
      setResetStep('recovery');
    }
  }, [type]);

  return (
    <>
      <form onSubmit={resetPassword}>
        <h1> 비밀번호 찾기</h1>
        <UserLoginForm
          isShowId={resetStep === 'request'}
          isShowPassword={resetStep === 'recovery'}
          email={form.email || ''}
          password={form.password}
          onChangeInput={onChange}
          error={error}
        />
        <div className="btn_group full">
          <Button size={'md'} title={'이전'} onClick={() => router.back()} />
          <LoadingButton
            disabled={!isValid}
            size={'md'}
            title={
              resetStep === 'request' ? '비밀번호 초기화' : '비밀번호 재설정'
            }
            type="submit"
          />
        </div>
      </form>
    </>
  );
}
