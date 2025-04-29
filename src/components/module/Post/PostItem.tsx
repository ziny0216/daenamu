import styles from '@/components/module/Post/Post.module.css';
import PostActionBar from '@/components/module/Post/PostActionBar';
import PostImageList from '@/components/module/Post/PostImageList';
import Link from 'next/link';
import { PostWithImages, PostWriter } from '@/types/components/post';
import Profile from '@/components/module/User/Profile';
import Button from '@/components/common/Button';
import MoreIcon from '@/assets/icons/icon-more.svg';
import React from 'react';

export default function PostItem({
  type,
  post,
  viewerId,
  handlePostMore,
}: {
  type: 'list' | 'detail';
  post: PostWithImages & PostWriter;
  viewerId?: string;
  handlePostMore?: (
    e: React.MouseEvent<HTMLButtonElement>,
    post: PostWithImages & PostWriter,
  ) => void;
}) {
  const handleMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    handlePostMore?.(e, post);
  };

  return (
    <div className={styles.post_container}>
      <div className={styles.pf_header}>
        <Profile is_anonymity={post.is_anonymity} profile={post.user} />
        {post.user?.nickname !== '탈퇴한 사용자' && (
          <Button
            className={'tooltip_trigger'}
            onClick={handleMore}
            icon={<MoreIcon />}
            isIcon
            color={'transparent'}
          />
        )}
      </div>
      <div className={styles.post_content}>
        <Link
          href={`/post/${post.id}`}
          className={type === 'list' ? 'ellipse3' : ''}
        >
          {post.content}
        </Link>
      </div>
      {post.images && <PostImageList files={post.images} listType={'list'} />}

      <PostActionBar post={post} userId={viewerId} />
    </div>
  );
}
