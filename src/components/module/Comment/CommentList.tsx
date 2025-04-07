'use client';
import CommentWrite from '@/components/module/Comment/CommentWrite';
import CommentItem from '@/components/module/Comment/CommentItem';
import browserClient from '@/utils/supabaseClient';
import { CommentWriteType } from '@/types/components/comment';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Tables } from '@/types/database.types';
import { PostWriter } from '@/types/components/post';

export default function CommentList({ post_id }: { post_id: string }) {
  const [commentList, setCommentList] = useState<
    (Tables<'comments'> & PostWriter)[]
  >([]);

  const onSubmitComment = async (params: CommentWriteType & PostWriter) => {
    const { comment, user_id, user } = params;
    const { data, error } = await browserClient
      .from('comments')
      .insert({
        comment,
        user_id,
        post_id,
      })
      .select()
      .single();
    if (data) {
      setCommentList(prev => [{ ...data, user }, ...prev]);
      toast('등록되었습니다.');
    }
    if (error) {
      console.error(error);
      toast('댓글 등록이 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await browserClient.rpc('get_comment_with_user');
      if (error) {
        console.error('댓글 가져오기 에러:', error);
        return;
      }
      setCommentList(data as (Tables<'comments'> & PostWriter)[]);
    };
    fetchComments();
  }, []);
  return (
    <>
      <CommentWrite onSubmit={onSubmitComment} />
      {commentList.map(cmt => (
        <CommentItem key={cmt.id} comment={cmt} />
      ))}
    </>
  );
}
