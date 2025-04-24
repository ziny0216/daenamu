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
import { clearUser, setUser } from '@/lib/features/user/userSlice';
import { useModal } from '@/hooks/common/useModal';

export default function UserEditForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.user.users);
  const { openConfirmModal } = useModal();
  const { form, onChange, setPassword, setNewPassword } = useForm(
    'first',
    userProfile,
  );
  const [profileData, setProfileData] = useState<File>();
  const handleForm = async () => {
    let avatar_url;
    if (profileData) {
      avatar_url = await uploadUserImage(profileData);
    }

    const { data, error } = await browserClient
      .from('users')
      .update({
        nickname: form.nickname,
        introduce: form.introduce,
        avatar_url,
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

  const confirmWithdrawalUser = () => {
    openConfirmModal({
      modalText: `${userProfile.nickname}님 정말 탈퇴하시겠습니까?🥺`,
      onConfirm: async () => {
        await withdrawalUser();
      },
    });
  };

  const withdrawalUser = async () => {
    const { error } = await browserClient.rpc('delete_account', {
      uid: userProfile.id,
    });

    if (!error) {
      await browserClient.auth.signOut();
      dispatch(clearUser());
      router.replace('/auth/login');
      alert('탈퇴가 완료되었습니다.');
    } else {
      alert('탈퇴 중 오류가 발생했습니다.');
    }
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
        isEdit={userProfile.provider === 'email'}
        user={userProfile}
        setPassword={setPassword}
        setNewPassword={setNewPassword}
      />
      <Button
        size={'xs'}
        color={'decoration'}
        title={'회원 탈퇴'}
        onClick={confirmWithdrawalUser}
      />
      <div className="btn_group full">
        <Button size={'md'} title={'취소'} onClick={() => router.back()} />
        <Button size={'md'} title={'수정'} onClick={handleForm} />
      </div>
    </div>
  );
}
