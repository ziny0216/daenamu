'use client';

import FileInput from '@/components/common/FileInput';
import EditIcon from '@/assets/icons/icon-edit.svg';
import styles from '@/components/module/User/User.module.css';
import Image from 'next/image';
import { useForm } from '@/hooks/common/useForm';
import browserClient from '@/utils/supabaseClient';
import { ChangeEvent } from 'react';
import DefaultPf from '@/assets/icons/default-pf.svg';

export default function UserProfileImage({ isSignup }: { isSignup: boolean }) {
  const { onChange, form } = useForm();

  const handleSignupFile = async (files: File[]) => {
    const file = files[0];
    const fileExt = file.name.split('.').pop();
    const tempFilePath = `temp-folder/${crypto.randomUUID()}.${fileExt}`;

    try {
      // 1step :: Signed URL 생성
      const { data: uploadData, error: uploadError } =
        await browserClient.storage
          .from('temp-folder')
          .createSignedUploadUrl(tempFilePath);

      if (uploadError) {
        console.error('Signed Upload URL 생성 오류:', uploadError);
        return;
      }

      // 2step :: 파일 업로드
      const uploadResponse = await fetch(uploadData.signedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadResponse.ok) {
        console.error('파일 업로드 실패:', uploadResponse);
        return;
      }

      // 3step :: 업로드된 파일의 Signed URL 가져오기 (미리보기용)
      const { data: signedData, error: signedError } =
        await browserClient.storage
          .from('temp-folder')
          .createSignedUrl(tempFilePath, 3600);

      if (signedError) {
        console.error('다운로드용 Signed URL 생성 오류:', signedError);
      } else {
        onChange({
          target: { value: signedData.signedUrl, name: 'avatar_url' },
        } as ChangeEvent<HTMLInputElement>);
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handleEditFile = () => {
    console.log('회원정보 수정시 ');
  };
  return (
    <div className={styles.profile_edit}>
      <div className={styles.img_box}>
        {form?.avatar_url ? (
          <Image
            fill
            sizes="120px"
            style={{ objectFit: 'cover', borderRadius: '50em' }}
            src={form?.avatar_url}
            alt="유저 이미지"
          />
        ) : (
          <DefaultPf width={120} height={120} />
        )}

        <FileInput
          id={'profile_img'}
          handleFileChange={isSignup ? handleSignupFile : handleEditFile}
          icon={EditIcon}
          className={styles.profile_input}
        />
      </div>
    </div>
  );
}
