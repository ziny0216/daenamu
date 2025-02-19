'use client';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useState } from 'react';
import styles from '@/components/module/User/User.module.css';
import Textarea from '@/components/common/TextArea';

export default function UserInfo({ isEdit = false }: { isEdit: boolean }) {
  const [isChangePw, setIsChangePw] = useState(false);
  const handleChangePw = () => {
    console.log('handleChangePw');
    setIsChangePw(!isChangePw);
  };

  const onChangePw = () => {};
  return (
    <div className={styles.user_form}>
      <Input
        label={'닉네임'}
        id={'nickname'}
        value={'여진'}
        inputSize={'md'}
        onChange={onChangePw}
      />

      <Textarea
        inputSize={'sm'}
        rows={2}
        onChange={onChangePw}
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
