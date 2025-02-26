import UserProfileImage from '@/components/module/User/UserProfileImage';
import styles from '@/components/module/User/User.module.css';
import UserInfo from '@/components/module/User/UseInfo';

export default function UserRegisterForm({
  setProfileData,
}: {
  setProfileData: (file: File) => void;
}) {
  return (
    <>
      <div className={styles.form_group}>
        <UserProfileImage isSignup setProfileData={setProfileData} />
        <UserInfo isEdit={false} />
      </div>
    </>
  );
}
