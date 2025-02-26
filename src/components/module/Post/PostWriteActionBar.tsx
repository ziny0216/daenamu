'use client';

import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import styles from '@/components/module/Post/Post.module.css';
import { ChangeEvent, useState } from 'react';
import FileInput from '@/components/common/FileInput';
import PictureIcon from '@/assets/icons/icon-white-picture.svg';
import { FileData } from '@/types/components/common';

export default function PostWriteActionBar({
  disabled,
  setProfileData,
}: {
  disabled: boolean;
  setProfileData: (file: FileData[]) => void;
}) {
  const [isChecked, setIsChecked] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleFileChange = (files: FileData[]) => {
    setProfileData(files);
  };
  return (
    <div className={styles.action_box}>
      <FileInput
        id={'postImg'}
        icon={PictureIcon}
        handleFileChange={handleFileChange}
      />
      <div className={styles.right_content}>
        <Checkbox
          label={'익명'}
          id={'anonymity'}
          checked={isChecked}
          onChange={onChange}
        />
        <Button disabled={disabled} size={'sm'} title={'POST'}></Button>
      </div>
    </div>
  );
}
