'use client';

import CommentItem from '@/components/module/Comment/CommentItem';
import PostItem from '@/components/module/Post/PostItem';
import { useState } from 'react';
import Button from '@/components/common/Button';

export default function Page() {
  const [tab, setTab] = useState('comment');

  const handleTab = (newTab: string) => {
    setTab(newTab);
  };
  return (
    <>
      <div>
        <Button onClick={() => handleTab('comment')} title={'작성한 댓글'} />
        <Button onClick={() => handleTab('post')} title={'좋아요한 글'} />
      </div>
      <div>{tab === 'post' ? <PostItem type={'list'} /> : <CommentItem />}</div>
    </>
  );
}
