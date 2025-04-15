'use client';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { ChangeEvent, useState } from 'react';
import styles from '@/components/module/User/User.module.css';
import Textarea from '@/components/common/TextArea';
import { Tables } from '@/types/database.types';
import browserClient from '@/utils/supabaseClient';
import { toast } from 'react-toastify';

export default function UserInfo({
  form,
  onChange,
  isEdit,
  user,
  setPassword,
  setNewPassword,
}: {
  form: Partial<Tables<'users'>> & { password: string; newPassword: string };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  isEdit: boolean;
  user?: Tables<'users'>;
}) {
  const [isChangePw, setIsChangePw] = useState(false);
  const handleChangePw = async () => {
    if (isChangePw) {
      await updateNewPw();
    } else {
      await changePwCertification();
    }
  };

  const changePwCertification = async () => {
    if (!form.password || !user || !user.email) return;
    const { error } = await browserClient.auth.signInWithPassword({
      email: user.email,
      password: form.password,
    });
    if (error) {
      toast('비밀번호를 확인해주세요!');
      return;
    }
    setIsChangePw(true);
  };

  const updateNewPw = async () => {
    if (!form.newPassword) return;
    const { error } = await browserClient.auth.updateUser({
      password: form.newPassword,
    });
    if (error) {
      toast('다시 시도해주세요!');
      return;
    }
    toast('비밀번호가 변경되었습니다!');
    setPassword('');
    setNewPassword('');
    setIsChangePw(false);
  };
  return (
    <div className={styles.user_form}>
      <Input
        label={'닉네임'}
        id={'nickname'}
        value={form.nickname || ''}
        placeholder={'8자 이하 닉네임'}
        maxLength={8}
        name={'nickname'}
        inputSize={'md'}
        onChange={e => onChange(e)}
      />

      <Textarea
        inputSize={'sm'}
        rows={2}
        value={form.introduce || ''}
        name={'introduce'}
        onChange={e => onChange(e)}
        placeholder="자기소개"
      />
      {isEdit && (
        <div className={styles.pw_box}>
          <div className={styles.user_form}>
            <Input
              inputSize={'md'}
              type={'password'}
              label={'현재 비밀번호'}
              id={'password'}
              name={'password'}
              value={form.password || ''}
              onChange={e => onChange(e)}
            />

            {isChangePw && (
              <Input
                inputSize={'md'}
                type={'password'}
                label={'새로운 비밀번호'}
                name={'newPassword'}
                id={'new_password'}
                value={form.newPassword}
                onChange={e => onChange(e)}
              />
            )}
          </div>
          <div className="btn_group full">
            <Button
              size={'md'}
              title={isChangePw ? '변경된 비밀번호 저장' : '비밀번호 변경'}
              onClick={handleChangePw}
            />
            {isChangePw && (
              <Button size={'md'} title={'취소'} onClick={handleChangePw} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
