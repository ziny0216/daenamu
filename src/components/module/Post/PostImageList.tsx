'use client';
import styles from '@/components/module/Post/Post.module.css';
import { FileData } from '@/types/components/common';
import Button from '@/components/common/Button';
import Image from 'next/image';
import DeleteBtn from '@/assets/icons/icon-circle.svg';

export default function PostImageList({
  files = [],
  onDeleteImg,
}: {
  files?: FileData[];
  onDeleteImg?: (file_seq: number | null, idx: number) => void;
}) {
  return (
    <>
      <ul className={styles.img_list}>
        {files.map((item, index) => (
          <li className={styles.img_box} key={item.file_seq || index}>
            <Button
              className={styles.delete_btn}
              isIcon
              color={'transparent'}
              icon={DeleteBtn}
              onClick={() =>
                onDeleteImg && onDeleteImg(item.file_seq || null, index)
              }
            />
            <Image
              fill
              objectFit={'cover'}
              src={item.new_filepath as string}
              alt={item.org_filename}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
