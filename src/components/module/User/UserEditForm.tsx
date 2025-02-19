'use client';
import UserProfileImage from '@/components/module/User/UserProfileImage';
import styles from '@/components/module/User/User.module.css';
import UserInfo from '@/components/module/User/UseInfo';
import Button from '@/components/common/Button';

export default function UserEditForm() {
  const handleForm = () => {};
  return (
    <div className={styles.form_group}>
      <UserProfileImage />
      <UserInfo isEdit />
      <div className="btn_group full">
        <Button size={'md'} title={'수정'} onClick={() => handleForm} />
        <Button size={'md'} title={'취소'} onClick={() => handleForm} />
      </div>
    </div>
  );
}
