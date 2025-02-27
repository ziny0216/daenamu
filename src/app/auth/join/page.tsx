'use client';

import UserRegisterForm from '@/components/module/User/UserRegisterForm';
import UserLoginForm from '@/components/module/User/UserLoginForm';
import Button from '@/components/common/Button';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from '@/hooks/common/useForm';
import browserClient from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import LoadingButton from '@/components/common/LoadingButton';
import { toast } from 'react-toastify';

export default function Page() {
  const router = useRouter();
  const [joinStep, setJoinStep] = useState<'first' | 'last'>('first');
  const [profileData, setProfileData] = useState<File>();
  const { form, onChange, error, isValid } = useForm(joinStep);
  const handleJoinStep = (step: 'first' | 'last') => {
    setJoinStep(step);
  };

  const getAvatarUrl = async () => {
    if (!profileData) return false;
    const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const { data, error } = await browserClient.storage
      .from('avatars')
      .upload(fileName, profileData);

    if (!data || error) {
      console.error('Upload failed:', error);
      return;
    }

    const {
      data: { publicUrl },
    } = browserClient.storage.from('avatars').getPublicUrl(data.path);

    onChange({
      target: { value: publicUrl, name: 'avatar_url' },
    } as ChangeEvent<HTMLInputElement>);

    return true;
  };
  const handleUserRegister = async (e: FormEvent) => {
    e.preventDefault(); // 기본 form 제출 방지

    const avatar_url = await getAvatarUrl();

    if (!avatar_url) alert('잠시 후 다시 시도 해주세요');

    const { error } = await browserClient.auth.signUp({
      email: form.email as string,
      password: form.password,
      options: {
        data: {
          nickname: form.nickname,
          introduce: form.introduce,
          avatar_url: form.avatar_url,
        },
        emailRedirectTo: `${window.location.origin}/auth/login`,
      },
    });

    if (error) {
      toast(error.message);
    } else {
      router.push('/');
      toast('인증 이메일을 보냈습니다! 이메일을 확인해주세요.');
    }
  };

  return (
    <form onSubmit={handleUserRegister}>
      <h1>회원가입</h1>
      {joinStep === 'first' && (
        <>
          <UserLoginForm
            email={form.email || ''}
            error={error}
            password={form.password}
            onChangeInput={onChange}
          />
          <Button
            disabled={!isValid}
            size={'md'}
            title={'다음'}
            onClick={() => handleJoinStep('last')}
          />
        </>
      )}
      {joinStep === 'last' && (
        <>
          <UserRegisterForm setProfileData={setProfileData} />
          <div className="btn_group full">
            <Button
              size={'md'}
              title={'이전'}
              onClick={() => handleJoinStep('first')}
            />
            <LoadingButton
              disabled={!isValid || !profileData}
              size={'md'}
              title={'회원가입'}
              type="submit"
            />
          </div>
        </>
      )}
    </form>
  );
}
