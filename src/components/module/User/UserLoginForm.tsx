'use client';
import styles from '@/components/module/User/User.module.css';
import Input from '@/components/common/Input';

export default function UserLoginForm() {
  const onChangePw = () => {};

  return (
    <div className={styles.form_group}>
      <Input
        id={'user_id'}
        placeholder={'email'}
        inputSize={'md'}
        onChange={onChangePw}
      />
      <Input
        id={'user_pw'}
        placeholder={'Password'}
        inputSize={'md'}
        onChange={onChangePw}
      />
    </div>
  );
}
