'use client';
import UserProfileImage from '@/components/module/User/UserProfileImage';
import styles from '@/components/module/User/User.module.css';
import UserInfo from '@/components/module/User/UseInfo';

export default function UserRegisterForm() {
  return (
    <>
      <div className={styles.form_group}>
        <UserProfileImage />
        <UserInfo isEdit={false} />
      </div>
    </>
  );
}
