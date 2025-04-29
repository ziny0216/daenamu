import styles from '@/components/module/Comment/Comment.module.css';
import { Tables } from '@/types/database.types';
import { PostWriter } from '@/types/components/post';
import Profile from '@/components/module/User/Profile';
import Button from '@/components/common/Button';
import MoreIcon from '@/assets/icons/icon-more.svg';
import React from 'react';

export default function CommentItem({
  comment,
  handleCmtMore,
}: {
  comment: Tables<'comments'> & PostWriter;
  handleCmtMore?: (
    e: React.MouseEvent<HTMLButtonElement>,
    comment: Tables<'comments'> & PostWriter,
  ) => void;
}) {
  const handleMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleCmtMore?.(e, comment);
  };

  return (
    <div className={styles.comment_container}>
      <div className={styles.pf_header}>
        <Profile profile={comment.user} is_anonymity={false} />
        {comment.user?.nickname !== '탈퇴한 사용자' && (
          <Button
            className={'tooltip_trigger'}
            onClick={handleMore}
            icon={<MoreIcon />}
            isIcon
            color={'transparent'}
          />
        )}
      </div>
      <div className={styles.comment_content}>
        <p className={styles.comment}>{comment.comment}</p>
      </div>
    </div>
  );
}
