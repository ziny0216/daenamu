'use client';
import UserProfileImage from '@/components/module/User/UserProfileImage';
import styles from '@/components/module/User/User.module.css';
import UserInfo from '@/components/module/User/UseInfo';
import Button from '@/components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import browserClient from '@/utils/supabaseClient';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { uploadUserImage } from '@/utils/file/uploadUserImage';
import { useForm } from '@/hooks/common/useForm';
import { setUser } from '@/lib/features/user/userSlice';

export default function UserEditForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.user.users);
  const { form, onChange, setPassword, setNewPassword } = useForm(
    'first',
    userProfile,
  );
  const [profileData, setProfileData] = useState<File>();

  const handleForm = async () => {
    if (profileData) {
      const avatar_url = await uploadUserImage(profileData, onChange);
      if (!avatar_url) {
        alert('잠시 후 다시 시도해주세요.');
        return;
      }
    }

    const { data, error } = await browserClient
      .from('users')
      .update({
        nickname: form.nickname,
        introduce: form.introduce,
        avatar_url: form.avatar_url,
      })
      .eq('id', userProfile.id)
      .select();

    if (error) {
      toast('다시 시도해주세요!');
      return;
    }
    toast('회원 정보 수정이 되었습니다!');
    dispatch(setUser(data[0]));
  };

  return (
    <div className={styles.form_group}>
      <UserProfileImage
        initialProfile={userProfile.avatar_url}
        setProfileData={setProfileData}
      />
      <UserInfo
        form={form}
        onChange={onChange}
        isEdit
        user={userProfile}
        setPassword={setPassword}
        setNewPassword={setNewPassword}
      />
      <div className="btn_group full">
        <Button size={'md'} title={'수정'} onClick={handleForm} />
        <Button size={'md'} title={'취소'} onClick={() => router.back()} />
      </div>
    </div>
  );
}
