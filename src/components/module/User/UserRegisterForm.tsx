import UserProfileImage from '@/components/module/User/UserProfileImage';
import styles from '@/components/module/User/User.module.css';
import UserInfo from '@/components/module/User/UseInfo';
import { Tables } from '@/types/database.types';
import { ChangeEvent } from 'react';

export default function UserRegisterForm({
  setProfileData,
  form,
  onChange,
  setPassword,
  setNewPassword,
}: {
  setProfileData: (file: File) => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  form: Partial<Tables<'users'>> & { password: string; newPassword: string };
  setPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
}) {
  return (
    <>
      <div className={styles.form_group}>
        <UserProfileImage setProfileData={setProfileData} />
        <UserInfo
          onChange={onChange}
          isEdit={false}
          setPassword={setPassword}
          setNewPassword={setNewPassword}
          form={form}
        />
      </div>
    </>
  );
}
