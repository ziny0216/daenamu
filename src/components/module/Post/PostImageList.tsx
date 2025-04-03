'use client';
import styles from '@/components/module/Post/Post.module.css';
import Button from '@/components/common/Button';
import DeleteBtn from '@/assets/icons/icon-circle.svg';
import { FileData } from '@/types/components/common';
import Image from 'next/image';
import { Tables } from '@/types/database.types';

export default function PostImageList({
  files = [],
  onDeleteImg,
  listType = 'add',
}: {
  files?: FileData[] | Tables<'post_images'>[];
  onDeleteImg?: (idx: number) => void;
  listType: 'list' | 'add';
}) {
  return (
    <>
      <ul className={styles.img_list}>
        {files.map((item, index) => (
          <li className={styles.img_box} key={index}>
            {listType === 'add' && (
              <Button
                className={styles.delete_btn}
                isIcon
                color={'transparent'}
                icon={<DeleteBtn />}
                onClick={() => onDeleteImg && onDeleteImg(index)}
              />
            )}

            {item?.image_url}
            <Image
              sizes="50"
              fill
              style={{ objectFit: 'cover' }}
              src={item?.image_url as string}
              alt={`게시물 이미지 ${index}`}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
