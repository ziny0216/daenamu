'use client';

import FileInput from '@/components/common/FileInput';
import { FileData } from '@/types/components/common';
import EditIcon from '@/assets/icons/icon-edit.svg';
import styles from '@/components/module/User/User.module.css';
import { ChangeEvent } from 'react';
import Image from 'next/image';
import { useForm } from '@/hooks/common/useForm';

export default function UserProfileImage() {
  const { onChange, form } = useForm();
  const handleFileChange = (files: FileData[]) => {
    console.log(files);
    onChange({
      target: { value: files[0].new_filepath, name: 'avatar_url' },
    } as ChangeEvent<HTMLInputElement>);
  };
  return (
    <div className={styles.profile_edit}>
      <div className={styles.img_box}>
        <Image
          fill
          style={{ objectFit: 'cover', borderRadius: '50em' }}
          src={
            form?.avatar_url ? form?.avatar_url : 'https://picsum.photos/32/32'
          }
          alt="유저 이미지"
        />
        <FileInput
          id={'profile_img'}
          handleFileChange={handleFileChange}
          icon={EditIcon}
          className={styles.profile_input}
        />
      </div>
    </div>
  );
}
