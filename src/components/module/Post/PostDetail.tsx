'use client';
import PostItem from '@/components/module/Post/PostItem';
import { PostWithImages, PostWriter } from '@/types/components/post';
import CommentList from '@/components/module/Comment/CommentList';
import { useState } from 'react';

export default function PostDetail({
  detail,
  postId,
  userId,
}: {
  detail: PostWithImages & PostWriter;
  postId: string;
  userId?: string;
}) {
  const [commentCount, setCommentCount] = useState(detail.cmt_cnt);
  return (
    <>
      <PostItem
        viewerId={userId}
        type={'detail'}
        post={{ ...detail, cmt_cnt: commentCount }}
      />
      <CommentList postId={postId} setCmtCnt={setCommentCount} />
    </>
  );
}
