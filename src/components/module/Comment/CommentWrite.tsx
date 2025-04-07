'use client';
import styles from '@/components/module/Comment/Comment.module.css';
import Textarea from '@/components/common/TextArea';
import Button from '@/components/common/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Profile from '@/components/module/User/Profile';
import { ChangeEvent, useState } from 'react';
import { CommentWriteType } from '@/types/components/comment';
import { PostWriter } from '@/types/components/post';

export default function CommentWrite({
  onSubmit,
}: {
  onSubmit: (params: CommentWriteType & PostWriter) => void;
}) {
  const userProfile = useSelector((state: RootState) => state.user.users);
  const [comment, setCommentContent] = useState('');
  const handleCommentContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };
  const handleComment = () => {
    const params = {
      comment,
      user_id: userProfile.id,
      user: {
        user_id: userProfile.id,
        nickname: userProfile.nickname,
        avatar_url: userProfile.avatar_url,
      },
    };
    onSubmit(params);
    setCommentContent('');
  };
  return (
    <div className={styles.write_container}>
      <Profile profile={userProfile} is_anonymity={false} />
      <div className={styles.write_content}>
        <Textarea
          rows={2}
          placeholder="댓글을 남겨주세요!"
          value={comment}
          onChange={handleCommentContent}
        />
        <Button
          onClick={handleComment}
          color={'transparent'}
          size={'xs'}
          title={'POST'}
        ></Button>
      </div>
    </div>
  );
}
