'use client';

import UserRegisterForm from '@/components/module/User/UserRegisterForm';
import UserLoginForm from '@/components/module/User/UserLoginForm';
import Button from '@/components/common/Button';
import { FormEvent, useState } from 'react';
import { useForm } from '@/hooks/common/useForm';
import browserClient from '@/utils/supabaseClient';

export default function Page() {
  const [joinStep, setJoinStep] = useState<'first' | 'last'>('first');
  const { form, onChange } = useForm();

  const handleJoinStep = (step: 'first' | 'last') => {
    console.log('폼 상태 확인:', form);

    if (step === 'first' && (!form.email || !form.password)) {
      console.log('이메일 또는 비밀번호가 비어 있음:', form);
      return;
    } else {
      setJoinStep(step);
    }

    if (
      step === 'last' &&
      (!form.nickname || !form.avatar_url || !form.introduce)
    ) {
      console.log('닉네임, 프로필 사진 또는 소개가 비어 있음:', form);
      return;
    } else {
      setJoinStep(step);
    }
  };

  const handleUserRegister = async (e: FormEvent) => {
    e.preventDefault(); // 기본 form 제출 방지

    console.log(form, 'form');
    const { data, error } = await browserClient.auth.signUp({
      email: form.email as string,
      password: form.password,
      options: {
        data: {
          nickname: form.nickname,
          introduce: form.introduce,
          avatar_url: form.avatar_url,
        },
        emailRedirectTo: `http://localhost:3000/auth/login`,
      },
    });

    if (error) {
      console.error('회원가입 실패:', error.message);
    } else {
      console.log('회원가입 성공:', data);
    }
  };
  return (
    <form onSubmit={handleUserRegister}>
      <h1>회원가입</h1>
      {joinStep === 'first' && (
        <>
          <UserLoginForm password={form.password} handlePassword={onChange} />
          <Button
            size={'md'}
            title={'다음'}
            onClick={() => handleJoinStep('last')}
          />
        </>
      )}
      {joinStep === 'last' && (
        <>
          <UserRegisterForm />
          <div className="btn_group full">
            <Button
              size={'md'}
              title={'이전'}
              onClick={() => handleJoinStep('first')}
            />
            <Button size={'md'} title={'회원가입 '} type="submit" />
          </div>
        </>
      )}
    </form>
  );
}
