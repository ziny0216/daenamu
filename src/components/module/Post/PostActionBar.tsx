'use client';
import styles from '@/components/module/Post/Post.module.css';
import Button from '@/components/common/Button';
import LikeButton from '@/components/module/Post/LikeButton';
import CommentIcon from '@/assets/icons/icon-comment.svg';
import { useRouter } from 'next/navigation';

export default function PostActionBar() {
  const router = useRouter();
  return (
    <div className={styles.action_box}>
      <Button
        icon={<CommentIcon />}
        isIcon
        color={'transparent'}
        onClick={() => router.push('/post/1')}
      />
      <LikeButton />
    </div>
  );
}
