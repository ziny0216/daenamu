'use client';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useState } from 'react';
import styles from '@/components/module/User/User.module.css';
import Textarea from '@/components/common/TextArea';
import { useForm } from '@/hooks/common/useForm';

export default function UserInfo({ isEdit = false }: { isEdit: boolean }) {
  const [isChangePw, setIsChangePw] = useState(false);
  const { onChange, form } = useForm('first');
  const handleChangePw = () => {
    setIsChangePw(!isChangePw);
  };

  const onChangePw = () => {};
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
              value={'여진'}
              disabled={isChangePw}
              onChange={onChangePw}
            />
            {isChangePw && (
              <Input
                inputSize={'md'}
                type={'password'}
                label={'비밀번호 확인'}
                id={'password_confirm'}
                value={'여진'}
                onChange={onChangePw}
              />
            )}
          </div>
          <div className="btn_group full">
            <Button
              size={'md'}
              title={'비밀번호 변경'}
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
