'use client';
import styles from '@/components/module/Post/Post.module.css';
import Button from '@/components/common/Button';
import LikeButton from '@/components/module/Post/LikeButton';
import CommentIcon from '@/assets/icons/icon-comment.svg';

export default function PostActionBar() {
  return (
    <div className={styles.action_box}>
      <Button icon={CommentIcon} isIcon color={'transparent'} />
      <LikeButton />
    </div>
  );
}
