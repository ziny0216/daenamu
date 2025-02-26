'use client';
import styles from '@/components/module/Post/Post.module.css';
import Button from '@/components/common/Button';
import DeleteBtn from '@/assets/icons/icon-circle.svg';
import { FileData } from '@/types/components/common';

export default function PostImageList({
  files = [],
  onDeleteImg,
}: {
  files?: FileData[];
  onDeleteImg?: (idx: number) => void;
}) {
  return (
    <>
      <ul className={styles.img_list}>
        {files.map((item, index) => (
          <li className={styles.img_box} key={index}>
            <Button
              className={styles.delete_btn}
              isIcon
              color={'transparent'}
              icon={<DeleteBtn />}
              onClick={() => onDeleteImg && onDeleteImg(index)}
            />
            {/*<Image*/}
            {/*  fill*/}
            {/*  style={{ objectFit: 'cover' }}*/}
            {/*  src={item. as string}*/}
            {/*  alt={item.org_filename}*/}
            {/*/>*/}
          </li>
        ))}
      </ul>
    </>
  );
}
