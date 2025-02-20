'use client';

import UserRegisterForm from '@/components/module/User/UserRegisterForm';
import UserLoginForm from '@/components/module/User/UserLoginForm';
import Button from '@/components/common/Button';
import { useState } from 'react';

export default function Page() {
  const [joinStep, setJoinStep] = useState<'first' | 'last'>('first');
  const handleJoinStep = (step: 'first' | 'last') => {
    setJoinStep(step);
  };

  const handleUserRegister = () => {
    console.log('회원가입 ');
  };
  return (
    <>
      <h1>회원가입</h1>
      {joinStep === 'first' && (
        <>
          <UserLoginForm />
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
          <div className="btn_group">
            <Button
              size={'md'}
              title={'이전'}
              onClick={() => handleJoinStep('first')}
            />
            <Button
              size={'md'}
              title={'회원가입 '}
              onClick={() => handleUserRegister}
            />
          </div>
        </>
      )}
    </>
  );
}
