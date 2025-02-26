'use client';

import FileInput from '@/components/common/FileInput';
import EditIcon from '@/assets/icons/icon-edit.svg';
import styles from '@/components/module/User/User.module.css';
import Image from 'next/image';
import DefaultPf from '@/assets/icons/default-pf.svg';
import { FileData } from '@/types/components/common';
import { useState } from 'react';

export default function UserProfileImage({
  isSignup,
  setProfileData,
}: {
  isSignup: boolean;
  setProfileData: (file: File) => void;
}) {
  const [preview, setPreview] = useState('');
  const handleSignupFile = (files: FileData[]) => {
    if (!files) return;
    setProfileData(files[0].file);
    setPreview(files[0].filepath);
  };

  const handleEditFile = () => {
    console.log('회원정보 수정시 ');
  };
  return (
    <div className={styles.profile_edit}>
      <div className={styles.img_box}>
        {preview ? (
          <Image
            fill
            sizes="120px"
            style={{ objectFit: 'cover', borderRadius: '50em' }}
            src={preview}
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
