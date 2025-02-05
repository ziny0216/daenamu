'use client';

import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import styles from '@/components/module/Post/Post.module.css';
import PictureIcon from '@/assets/icons/icon-white-picture.svg';
import { ChangeEvent, useState } from 'react';

export default function PostWriteActionBar() {
  const [isChecked, setIsChecked] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  return (
    <div className={styles.action_box}>
      <Button size={'sm'} isIcon>
        <PictureIcon width={24} height={24} />
      </Button>
      <div className={styles.right_content}>
        <Checkbox
          label={'익명'}
          id={'anonymity'}
          checked={isChecked}
          onChange={onChange}
        />
        <Button disabled size={'sm'} title={'POST'}></Button>
      </div>
    </div>
  );
}
