'use client';

import React from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const handleFindInput = () => {};
  const handleFindPw = () => {};
  return (
    <>
      <h1> 비밀번호 찾기</h1>
      <Input
        id={'user_id'}
        placeholder={'email'}
        inputSize={'md'}
        onChange={handleFindInput}
      />
      <div className="btn_group full">
        <Button size={'md'} title={'이전'} onClick={() => router.back()} />
        <Button
          size={'md'}
          title={'비밀번호 찾기'}
          onClick={() => handleFindPw}
        />
      </div>
    </>
  );
}
