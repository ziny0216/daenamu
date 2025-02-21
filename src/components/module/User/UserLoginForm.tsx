'use client';
import styles from '@/components/module/User/User.module.css';
import Input from '@/components/common/Input';
import { useForm } from '@/hooks/common/useForm';
import { ChangeEvent } from 'react';

export default function UserLoginForm({
  password,
  handlePassword,
}: {
  password: string;
  handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const { onChange, form, error } = useForm();
  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    handlePassword(e);
  };

  return (
    <div className={styles.form_group}>
      <Input
        id={'user_id'}
        placeholder={'email'}
        name={'email'}
        inputSize={'md'}
        value={form.email || ''}
        onChange={e => onChange(e)}
      >
        {error?.email && <p className="guide_text">{error?.email}</p>}
      </Input>

      <Input
        id={'user_pw'}
        placeholder={'Password'}
        name={'password'}
        type={'password'}
        value={password || ''}
        inputSize={'md'}
        onChange={onChangePw}
      >
        {error?.password && <p className="guide_text">{error?.password}</p>}
      </Input>
    </div>
  );
}
