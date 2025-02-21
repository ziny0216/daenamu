'use client';

import FileInput from '@/components/common/FileInput';
import { FileData } from '@/types/components/common';
import EditIcon from '@/assets/icons/icon-edit.svg';
import styles from '@/components/module/User/User.module.css';
import { useState } from 'react';
import Image from 'next/image';

export default function UserProfileImage() {
  const [editFile, setEditFile] = useState<FileData | null>(null);
  const handleFileChange = (files: FileData[]) => {
    setEditFile(files[0]);
  };
  return (
    <div className={styles.profile_edit}>
      <div className={styles.img_box}>
        <Image
          fill
          objectFit={'cover'}
          src={
            typeof editFile?.new_filepath === 'string'
              ? editFile.new_filepath
              : 'https://picsum.photos/32/32'
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
