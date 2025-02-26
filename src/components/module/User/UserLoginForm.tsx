'use client';
import styles from '@/components/module/User/User.module.css';
import Input from '@/components/common/Input';
import { ChangeEvent } from 'react';

export default function UserLoginForm({
  password,
  email,
  onChangeInput,
  error,
}: {
  password: string;
  email: string;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  error: { email?: string; password?: string };
}) {
  return (
    <div className={styles.form_group}>
      <Input
        id={'user_id'}
        placeholder={'email'}
        name={'email'}
        inputSize={'md'}
        value={email}
        onChange={onChangeInput}
      >
        {error?.email && <p className="guide_text">{error?.email}</p>}
      </Input>

      <Input
        id={'user_pw'}
        placeholder={'Password'}
        name={'password'}
        type={'password'}
        value={password}
        inputSize={'md'}
        onChange={onChangeInput}
      >
        {error?.password && <p className="guide_text">{error?.password}</p>}
      </Input>
    </div>
  );
}
