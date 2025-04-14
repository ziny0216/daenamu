'use client';
import styles from '@/components/module/Post/Post.module.css';
import Button from '@/components/common/Button';
import LikeButton from '@/components/module/Post/LikeButton';
import CommentIcon from '@/assets/icons/icon-comment.svg';
import { useRouter } from 'next/navigation';
import browserClient from '@/utils/supabaseClient';
import { toast } from 'react-toastify';
import { PostWithImages, PostWriter } from '@/types/components/post';

export default function PostActionBar({
  post,
  userId,
}: {
  post: PostWithImages & PostWriter;
  userId?: string | null;
}) {
  const router = useRouter();
  const handleToggleLike = async (isLike: boolean) => {
    if (!userId) return;
    if (isLike) {
      const { error } = await browserClient.from('post_likes').insert({
        user_id: userId,
        post_id: post.id,
      });

      if (error) {
        return console.error(error);
      }
      toast('좋아요 했습니다.');
    } else {
      const { error } = await browserClient
        .from('post_likes')
        .delete()
        .eq('user_id', userId)
        .eq('post_id', post.id);
      if (error) {
        return console.error(error);
      }
      toast('좋아요 해제했습니다.');
    }
  };
  return (
    <div className={styles.action_box}>
      <Button
        title={post.cmt_cnt?.toString()}
        icon={<CommentIcon />}
        isIcon
        color={'transparent'}
        onClick={() => router.push(`/post/${post.id}`)}
      />

      <LikeButton
        likeCnt={post.like_cnt}
        likeValue={post.is_like}
        handleToggleLike={handleToggleLike}
      />
    </div>
  );
}
