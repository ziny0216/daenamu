'use client';

import Checkbox from '@/components/common/Checkbox';
import styles from '@/components/module/Post/Post.module.css';
import { ChangeEvent } from 'react';
import FileInput from '@/components/common/FileInput';
import PictureIcon from '@/assets/icons/icon-white-picture.svg';
import { FileData } from '@/types/components/common';
import LoadingButton from '@/components/common/LoadingButton';

export default function PostWriteActionBar({
  disabled,
  setProfileData,
  handlePost,
  isChecked,
  onChange,
}: {
  disabled: boolean;
  setProfileData: (file: FileData[]) => void;
  handlePost: () => void;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const handleIsAnonymity = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  const handleFileChange = (files: FileData[]) => {
    setProfileData(files);
  };
  return (
    <div className={styles.action_box}>
      <FileInput
        id={'postImg'}
        icon={<PictureIcon />}
        handleFileChange={handleFileChange}
      />
      <div className={styles.right_content}>
        <Checkbox
          label={'익명'}
          id={'anonymity'}
          checked={isChecked}
          onChange={handleIsAnonymity}
        />
        <LoadingButton
          onClick={handlePost}
          disabled={disabled}
          size={'sm'}
          title={'POST'}
        ></LoadingButton>
      </div>
    </div>
  );
}
