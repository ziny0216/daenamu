'use client';

import Profile from '@/components/module/Profile/Profile';
import PostActionBar from '@/components/module/Post/PostWriteActionBar';
import styles from '@/components/module/Post/Post.module.css';
import Textarea from '@/components/common/TextArea';
import PostImageList from '@/components/module/Post/PostImageList';
import { ChangeEvent, useState } from 'react';

const user = {
  profile_img: 'https://picsum.photos/32/32',
  nickname: '조여진',
  is_anonymity: true,
};
export default function PostWrite() {
  const [postContent, setPostContent] = useState('');
  const handlePostContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };
  return (
    <div className={styles.post_container}>
      <Profile user={user} />
      <Textarea onChange={handlePostContent} placeholder="지금 내 생각은...?" />
      <PostImageList />
      <PostActionBar disabled={!postContent} />
    </div>
  );
}
